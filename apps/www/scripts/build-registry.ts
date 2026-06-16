import fs from "fs";
import path from "path";

const REGISTRY_PATH = path.join(process.cwd(), "../../packages/apen-ui/src/ui");
const OUTPUT_DIR = path.join(process.cwd(), "src/__registry__");
const OUTPUT_FILE = path.join(OUTPUT_DIR, "components.ts");

try {
  const files = fs.readdirSync(REGISTRY_PATH);
  let registryIndexContent = `export const registry: Record<string, any> = {\n`;

  files.forEach((file) => {
    if (file.endsWith(".tsx")) {
      const componentName = file.replace(".tsx", "");
      const rawContent = fs.readFileSync(path.join(REGISTRY_PATH, file), "utf8");
      
      registryIndexContent += `  "${componentName}": {
    component: () => import("@/registry/ui/${componentName}"),
    raw: ${JSON.stringify(rawContent)}
  },\n`;
    }
  });

  registryIndexContent += `};\n`;

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }
  
  fs.writeFileSync(OUTPUT_FILE, registryIndexContent);
  console.log("✅ Documentation component registry map compiled successfully!");
} catch (error) {
  console.error("❌ Failed to compile component registry map:", error);
}