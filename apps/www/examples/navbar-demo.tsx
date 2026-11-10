import { Button } from "@/components/ui/button"
import {
  Navbar,
  NavbarActions,
  NavbarBrand,
  NavbarContent,
  NavbarLink,
  NavbarMobileMenu,
  NavbarToggle,
} from "@/components/ui/navbar"

const links = ["Overview", "Customers", "Reports"]

export default function NavbarDemo() {
  return (
    <div className="w-full py-6 pb-48 md:pb-6">
      <Navbar className="static">
        <NavbarBrand href="#">Acme</NavbarBrand>
        <NavbarContent>
          {links.map((link, index) => (
            <NavbarLink key={link} href="#" active={index === 0}>
              {link}
            </NavbarLink>
          ))}
        </NavbarContent>
        <NavbarActions>
          <Button size="sm">Sign in</Button>
          <NavbarToggle />
        </NavbarActions>
        <NavbarMobileMenu>
          {links.map((link) => (
            <NavbarLink key={link} href="#">
              {link}
            </NavbarLink>
          ))}
        </NavbarMobileMenu>
      </Navbar>
    </div>
  )
}
