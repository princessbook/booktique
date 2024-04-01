import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xs: "375px",
    },
    extend: {
      screens: {
        'layout': {'raw': '(min-width: 375px)'}, // 전체 layout에 xs 사이즈를 적용할 수 있도록 새로운 스크린을 추가합니다.
      },
    },
    colors: {
      mainblue : "#35A5F6",
      subblue: "#59B9FF",
      bookpurble: "#BA61FF",
      bookyellow: "#E9FF8F",
      bookwhite: "#F8F8FD",
    }
  },
  plugins: [],
};
export default config;
