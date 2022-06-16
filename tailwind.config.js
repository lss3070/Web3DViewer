module.exports = {
  darkMode:['class', '[data-mode="dark"]'],
  //이 부분 추가
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
    theme: {
      //기본 폰트로 사용할 폰트들 기본설정해줌.
      extend: {},
    },
    plugins: [],
  };