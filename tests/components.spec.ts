import { expect, test, type Locator, type Page } from "@playwright/test"

const sidebarSelector = '[data-slot="sidebar"]'
const triggerSelector = '[data-slot="sidebar-trigger"]'

async function expectNoHorizontalOverflow(page: Page) {
  await expect.poll(() => page.evaluate(() => (
    document.documentElement.scrollWidth - window.innerWidth
  ))).toBeLessThanOrEqual(1)
}

async function expectCenteredIcons(sidebar: Locator) {
  await expect.poll(async () => sidebar.evaluate((element) => {
    const sidebarBox = element.getBoundingClientRect()
    const center = sidebarBox.left + sidebarBox.width / 2
    const icons = [...element.querySelectorAll('[data-slot="sidebar-menu-button"] > svg')]
    return Math.max(...icons.map((icon) => {
      const box = icon.getBoundingClientRect()
      return Math.abs(box.left + box.width / 2 - center)
    }))
  })).toBeLessThanOrEqual(1.5)
}

for (const width of [1280, 1024, 768]) {
  test(`sidebar collapse keeps icons centered and content contained at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 })
    await page.goto("/dashboard")
    const sidebar = page.locator(sidebarSelector)
    await expect(sidebar).toHaveAttribute("data-collapsed", "false")
    await expect.poll(async () => (await sidebar.boundingBox())?.width ?? 0).toBeGreaterThan(200)
    await expectNoHorizontalOverflow(page)

    await page.locator(triggerSelector).click()
    await expect(sidebar).toHaveAttribute("data-collapsed", "true")
    await expect.poll(async () => (await sidebar.boundingBox())?.width ?? 1000).toBeLessThan(100)
    await expectCenteredIcons(sidebar)
    await expect(sidebar.getByRole("button", { name: "Overview" })).toBeVisible()
    await expectNoHorizontalOverflow(page)

    await page.locator(triggerSelector).click()
    await expect(sidebar).toHaveAttribute("data-collapsed", "false")
    await expect.poll(async () => (await sidebar.boundingBox())?.width ?? 0).toBeGreaterThan(200)
    await expectNoHorizontalOverflow(page)
  })
}

test("mobile sidebar stays expanded, traps focus, dismisses and preserves desktop collapse", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 })
  await page.goto("/dashboard")
  await page.locator(triggerSelector).click()
  await expect(page.locator(sidebarSelector)).toHaveAttribute("data-collapsed", "true")

  await page.setViewportSize({ width: 375, height: 667 })
  await expect(page.locator(`${sidebarSelector}:visible`)).toHaveCount(0)
  await page.locator(triggerSelector).focus()
  await page.keyboard.press("Tab")
  await expect.poll(() => page.evaluate(() => Boolean(
    document.activeElement?.closest('[data-slot="sidebar"]')
  ))).toBe(false)

  const trigger = page.locator(triggerSelector)
  await trigger.click()
  const sidebar = page.locator(`${sidebarSelector}:visible`)
  await expect(sidebar).toBeVisible()
  await expect(page.getByRole("dialog")).toBeVisible()
  await expect.poll(async () => (await sidebar.boundingBox())?.width ?? 0).toBeGreaterThan(200)
  const overviewLabel = sidebar.locator('[data-slot="sidebar-menu-button"] > span').first()
  await expect.poll(async () => (await overviewLabel.boundingBox())?.width ?? 0).toBeGreaterThan(30)
  await expectNoHorizontalOverflow(page)

  const focusable = sidebar.locator('a[href], button:not([disabled]), [tabindex="0"]')
  await focusable.last().focus()
  await page.keyboard.press("Tab")
  await expect(focusable.first()).toBeFocused()
  await page.keyboard.press("Shift+Tab")
  await expect(focusable.last()).toBeFocused()

  await page.keyboard.press("Escape")
  await expect(page.locator(`${sidebarSelector}:visible`)).toHaveCount(0)
  await expect(trigger).toBeFocused()

  await trigger.click()
  await expect(page.getByRole("dialog")).toBeVisible()
  await page.locator('[data-slot="sidebar-overlay"]').click({ position: { x: 365, y: 100 } })
  await expect(page.locator(`${sidebarSelector}:visible`)).toHaveCount(0)
  await expect(trigger).toBeFocused()

  await page.setViewportSize({ width: 1280, height: 800 })
  await expect(page.locator(sidebarSelector)).toHaveAttribute("data-collapsed", "true")
  await expectCenteredIcons(page.locator(sidebarSelector))
})

test("sidebar demo stays inside its preview when expanded and collapsed", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 })
  await page.goto("/docs/components/sidebar")
  const preview = page.getByRole("tabpanel", { name: "Preview" })
  const wrapper = preview.locator('[data-slot="sidebar-wrapper"]')
  const sidebar = wrapper.locator(sidebarSelector)
  await expect(wrapper).toBeVisible()

  for (const collapsed of [false, true]) {
    if (collapsed) await wrapper.locator(triggerSelector).click()
    await expect(sidebar).toHaveAttribute("data-collapsed", String(collapsed))
    if (collapsed) await expectCenteredIcons(sidebar)
    await expect.poll(async () => {
      const container = await wrapper.boundingBox()
      const panel = await sidebar.boundingBox()
      if (!container || !panel) return false
      return panel.x >= container.x - 1 && panel.x + panel.width <= container.x + container.width + 1
        && panel.y >= container.y - 1 && panel.y + panel.height <= container.y + container.height + 1
        && container.height < 600
    }).toBe(true)
    await expectNoHorizontalOverflow(page)
  }
})

test("accordion supports keyboard navigation and disclosure", async ({ page }) => {
  await page.goto("/docs/components/accordion")
  const preview = page.getByRole("tabpanel", { name: "Preview" })
  const triggers = preview.locator('[data-slot="accordion-trigger"]')
  await expect(triggers).toHaveCount(3)
  await triggers.first().focus()
  await page.keyboard.press("ArrowDown")
  await expect(triggers.nth(1)).toBeFocused()
  await page.keyboard.press("Enter")
  await expect(triggers.nth(1)).toHaveAttribute("aria-expanded", "true")
  await page.keyboard.press("Enter")
  await expect(triggers.nth(1)).toHaveAttribute("aria-expanded", "false")
})

test("breadcrumb identifies the current page without making it a link", async ({ page }) => {
  await page.goto("/docs/components/breadcrumb")
  const breadcrumb = page.getByRole("tabpanel", { name: "Preview" }).locator('[data-slot="breadcrumb"]')
  await expect(breadcrumb).toHaveAttribute("aria-label", /breadcrumb/i)
  const current = breadcrumb.locator('[aria-current="page"]')
  await expect(current).toHaveCount(1)
  await expect(current).not.toHaveAttribute("href")
  await expect(breadcrumb.getByRole("link").first()).toHaveAttribute("href", /.+/)
})

test("pagination exposes its current page and usable navigation links on mobile", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 })
  await page.goto("/docs/components/pagination")
  const pagination = page.getByRole("tabpanel", { name: "Preview" }).locator('[data-slot="pagination"]')
  await expect(pagination).toHaveAttribute("aria-label", /pagination/i)
  await expect(pagination.locator('[aria-current="page"]')).toHaveCount(1)
  await expect(pagination.getByRole("link", { name: /previous/i })).toHaveAttribute("href", /.+/)
  await expect(pagination.getByRole("link", { name: /next/i })).toHaveAttribute("href", /.+/)
  await pagination.getByRole("link", { name: /next/i }).click()
  await expect(pagination.getByRole("link", { name: "Page 3", exact: true })).toHaveAttribute("aria-current", "page")
  await pagination.getByRole("link", { name: "Page 1", exact: true }).click()
  await expect(pagination.locator('[aria-disabled="true"]')).toHaveAttribute("tabindex", "-1")
  await expectNoHorizontalOverflow(page)
})

test("mobile navbar menu is contained and closes on Escape, outside click and resize", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 })
  await page.goto("/docs/components/navbar")
  const preview = page.getByRole("tabpanel", { name: "Preview" })
  const toggle = preview.locator('[data-slot="navbar-toggle"]')
  const menu = preview.locator('[data-slot="navbar-mobile-menu"]')
  await expect(toggle).toHaveAttribute("type", "button")
  await toggle.click()
  await expect(toggle).toHaveAttribute("aria-expanded", "true")
  await expect(menu.getByRole("link", { name: "Reports" })).toBeVisible()
  const bounds = await preview.boundingBox()
  const lastLink = await menu.getByRole("link", { name: "Reports" }).boundingBox()
  expect(bounds && lastLink && lastLink.y + lastLink.height <= bounds.y + bounds.height).toBeTruthy()
  await page.keyboard.press("Escape")
  await expect(menu).toHaveCount(0)
  await expect(toggle).toBeFocused()
  await toggle.click()
  await page.getByRole("heading", { name: "Navbar", exact: true }).click()
  await expect(menu).toHaveCount(0)
  await toggle.click()
  await page.setViewportSize({ width: 1024, height: 768 })
  await expect(menu).toHaveCount(0)
  await page.setViewportSize({ width: 375, height: 667 })
  await expect(toggle).toHaveAttribute("aria-expanded", "false")
  await expectNoHorizontalOverflow(page)
})

test("dialog content stays reachable in a short mobile viewport", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 250 })
  await page.goto("/docs/components/dialog")
  await page.getByRole("tabpanel", { name: "Preview" }).getByRole("button", { name: "Invite member" }).click()
  const dialog = page.getByRole("dialog")
  await expect(dialog).toBeVisible()
  await expect.poll(async () => {
    const box = await dialog.boundingBox()
    return !!box && box.y >= 15 && box.y + box.height <= 235
  }).toBe(true)
  await dialog.getByRole("button", { name: "Cancel" }).click()
  await expect(dialog).toHaveCount(0)
})

test("progress fill uses the supplied maximum", async ({ page }) => {
  await page.goto("/docs/components/progress")
  const progress = page.getByRole("tabpanel", { name: "Preview" }).getByRole("progressbar", { name: "Storage" })
  await expect(progress).toHaveAttribute("aria-valuemax", "200")
  await expect(progress).toHaveAttribute("aria-valuenow", "136")
  const percentage = await progress.evaluate((element) => {
    const indicator = element.querySelector('[data-slot="progress-indicator"]')!
    const track = element.getBoundingClientRect()
    const fill = indicator.getBoundingClientRect()
    return (fill.right - track.left) / track.width
  })
  expect(percentage).toBeCloseTo(0.68, 2)
})

test("radio group supports keyboard selection and skips disabled options", async ({ page }) => {
  await page.goto("/docs/components/radio-group")
  const group = page.getByRole("radiogroup", { name: "Billing plan" })
  const starter = group.getByRole("radio", { name: "Starter", exact: true })
  const growth = group.getByRole("radio", { name: "Growth", exact: true })
  await expect(growth).toBeChecked()
  await expect(group.getByRole("radio", { name: "Enterprise", exact: true })).toBeDisabled()
  await growth.focus()
  await page.keyboard.down("ArrowDown")
  try {
    await expect(starter).toBeFocused()
    await expect(starter).toBeChecked()
  } finally {
    await page.keyboard.up("ArrowDown")
  }
  await expect(growth).not.toBeChecked()
})

test("slider updates controlled values and range thumbs by keyboard", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 })
  await page.goto("/docs/components/slider")
  const preview = page.getByRole("tabpanel", { name: "Preview" })
  const volume = preview.getByRole("slider", { name: "Volume", exact: true })
  await expect(volume).toHaveAttribute("aria-valuenow", "60")
  await volume.focus()
  await page.keyboard.press("ArrowRight")
  await expect(volume).toHaveAttribute("aria-valuenow", "61")
  const minimum = preview.getByRole("slider", { name: "Minimum budget", exact: true })
  const maximum = preview.getByRole("slider", { name: "Maximum budget", exact: true })
  await minimum.focus()
  await page.keyboard.press("ArrowRight")
  await expect(minimum).toHaveAttribute("aria-valuenow", "25")
  await expect(maximum).toHaveAttribute("aria-valuenow", "80")
  await expect(preview.getByRole("slider", { name: "Disabled slider" })).toHaveAttribute("data-disabled", "")
  await expectNoHorizontalOverflow(page)
})

test("popover fits a mobile viewport, focuses its form and restores focus", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 400 })
  await page.goto("/docs/components/popover")
  const trigger = page.getByRole("tabpanel", { name: "Preview" }).getByRole("button", { name: "Workspace settings" })
  await trigger.click()
  const panel = page.getByRole("dialog", { name: "Workspace settings" })
  await expect(panel.getByRole("textbox", { name: "Workspace name" })).toBeFocused()
  await expect.poll(async () => {
    const box = await panel.boundingBox()
    return !!box && box.x >= 7 && box.y >= 7 && box.x + box.width <= 368 && box.y + box.height <= 393
  }).toBe(true)
  await page.keyboard.press("Escape")
  await expect(panel).toHaveCount(0)
  await expect(trigger).toBeFocused()
  await trigger.click()
  await panel.getByRole("button", { name: "Done", exact: true }).click()
  await expect(panel).toHaveCount(0)
  await expect(trigger).toBeFocused()
})

test("collapsible reveals controlled content by keyboard without mobile overflow", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 667 })
  await page.goto("/docs/components/collapsible")
  const preview = page.getByRole("tabpanel", { name: "Preview" })
  const trigger = preview.getByRole("button", { name: "Toggle project milestones" })
  await expect(trigger).toHaveAttribute("aria-expanded", "false")
  await trigger.focus()
  await page.keyboard.press("Enter")
  await expect(trigger).toHaveAttribute("aria-expanded", "true")
  await expect(preview.getByText("Launch checklist", { exact: true })).toBeVisible()
  await expectNoHorizontalOverflow(page)
  await page.keyboard.press("Space")
  await expect(trigger).toHaveAttribute("aria-expanded", "false")
  await expect(preview.getByText("Launch checklist", { exact: true })).not.toBeVisible()
})

test("toggle exposes pressed states and respects disabled controls", async ({ page }) => {
  await page.goto("/docs/components/toggle")
  const preview = page.getByRole("tabpanel", { name: "Preview" })
  const bold = preview.getByRole("button", { name: "Bold", exact: true })
  await expect(bold).toHaveAttribute("aria-pressed", "true")
  await bold.focus()
  await page.keyboard.press("Space")
  await expect(bold).toHaveAttribute("aria-pressed", "false")
  await expect(preview.getByRole("button", { name: "Read only", exact: true })).toBeDisabled()
})

test("toggle groups support single and multiple selections with keyboard navigation", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 })
  await page.goto("/docs/components/toggle-group")
  const preview = page.getByRole("tabpanel", { name: "Preview" })
  const alignment = preview.getByRole("radiogroup", { name: "Text alignment", exact: true })
  const left = alignment.getByRole("radio", { name: "Align left" })
  const center = alignment.getByRole("radio", { name: "Align center" })
  await expect(left).toBeChecked()
  await left.focus()
  await page.keyboard.press("ArrowRight")
  await expect(center).toBeFocused()
  await page.keyboard.press("Space")
  await expect(center).toBeChecked()
  await expect(left).not.toBeChecked()
  const styles = preview.getByRole("toolbar", { name: "Text styles", exact: true })
  await styles.getByRole("button", { name: "Italic", exact: true }).click()
  await expect(styles.getByRole("button", { name: "Bold", exact: true })).toHaveAttribute("aria-pressed", "true")
  await expect(styles.getByRole("button", { name: "Italic", exact: true })).toHaveAttribute("aria-pressed", "true")
  await expect(styles.getByRole("button", { name: "List", exact: true })).toBeDisabled()
  await expectNoHorizontalOverflow(page)
})
