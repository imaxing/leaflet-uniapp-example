// tailwindcss-miniprogram-preset 适合那种 webpack 无法触及的场景

// 基础配置，无需任何preset
// https://github.com/sonofmagic/weapp-tailwindcss-webpack-plugin/blob/main/demo/uni-app/tailwind.config.js
/** @type {import('@types/tailwindcss/tailwind-config').TailwindConfig} */
module.exports = {
  mode: 'jit',
  purge: {
    content: ['public/index.html', './src/**/*.{vue,nvue,js,ts,jsx,tsx,wxml,nvue}']
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      extend: {
        boxShadow: { debug: '0 0 0 1px red', border: '0 0 0 1rpx #eaeaea' }
      }
    }
  },
  variants: {},
  plugins: [require('tailwindcss-safe-area')],
  corePlugins: {
    preflight: false
  }
}
