/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
      ],
  theme: {
    extend: {
        width:{
            '2' : '2px',
            '434' : '434px',
            '484' : '484px',
            '940' : '940px',
            '1177' : '1177px',
            '1440' : '1440px',
            '1464' : '1464px',
            '1920' : '1920px'
        },

        height:{
            '2px' : '2px',
            '46' : '46px',
            '72' : '72px',
            '120' : '120px',
            '240' : '240px',
            '192' : '192px',
            '312' : '312px',
            '373' : '373px',
            '448' : '448px',
            '576' : '576px',
            '625' : '625px',
            '696' : '696px',
            '820' : '820px',
            '893' : '893px',
            '960' : '960px',
            '1177' : '1177px',
            '1272' : '1272px',
            '1392' : '1392px',
            '1460' : '1460px',
            '2039' : '2039px',
            '2493' : '2493px',
            '2613' : '2613px',
            '2569' : '2569px',
            '2617' : '2617px',
            '3000' : '3000px',
            '3768' : '3768px'
        },

        margin:{
            '120' : '120px',
            '148' : '148px',
            '240' : '240px',
            '420' : '420px',
            '468' : '468px',
            '478' : '478px',
            '484' : '484px',
            'inter' : '72px'
        },

        borderWidth: {
            '1' : '1px',
            '20' : '20px',
            '420' : '420px',
            '484' : '484px'
        },

        colors:{
            'bannerColor' : '#F4F1E9'
        },
        fontFamily: {
            sans: [ 'Pretendard-Regular', "LINESeedKR-Bd", "Arita-dotum-Medium", "Arial", "sans-serif"], 
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
