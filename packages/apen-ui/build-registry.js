const fs = require('fs');
const path = require('path');

const registry = [
  {
    name: "button",
    dependencies: ["@radix-ui/react-slot", "class-variance-authority", "clsx", "tailwind-merge"],
    files: [
      {
        name: "button.tsx",
        content: fs.readFileSync(path.join(__dirname, 'src/ui/button.tsx'), 'utf8')
      }
    ]
  }
];

// Output this to your public docs directory so it's hosted publicly
fs.writeFileSync(
  path.join(__dirname, '../../apps/www/public/registry.json'), 
  JSON.stringify(registry, null, 2)
);