// apps/web/tailwind.config.js
module.exports = {
  // 1. Ensure darkMode is set to 'class'
  darkMode: 'class', 
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    // 2. CRITICAL: This path must point to where your UI package source sits
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx}", 
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          900: '#171717',
          950: '#0a0a0a', // Or your Gemini Black #131314
        }
      }
    }
  }
}