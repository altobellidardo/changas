/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        brand1: '#073B3A',
        brand2: '#095545',
        brand3: '#0B6E4F',
        brand4: '#0A7F4C',
        brand5: '#098F48',
        brand6: '#08A045',
        brand7: '#6BBF59',
        brand8: '#F5F5F5'
      }
    }
  },
  plugins: []
}
