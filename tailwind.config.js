/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
      ],
  theme: {
    extend: {
        colors:{
            'bannerColor' : '#F4F1E9'
        },
        fontFamily: {
            sans: ["Arita-dotum-Medium", "Arial", "sans-serif"], 
            // sans가 제일 기본 상속 폰트이므로 전체 폰트바꾸려면 sans재지정후 맨앞에 원하는 폰트 넣기
          
            arita: ["Arita-dotum-Medium", "sans-serif"],
        },
        backgroundImage:{
            'ratingBackground' : "url('../public/img/ratingbanner.png')"
        }
    },
  },
  plugins: [
    require("daisyui")
],
    daisyui: {
    themes: ["lofi"],
  },
}
