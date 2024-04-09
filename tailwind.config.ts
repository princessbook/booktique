import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    './src/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    screens: {
      xs: '375px'
    },
    extend: {
      screens: {
        layout: { raw: '(min-width: 375px)' } // 전체 layout에 xs 사이즈를 적용할 수 있도록 새로운 스크린을 추가합니다.
      },
      colors: {
        mainblue: '#35A5F6',
        subblue: '#59B9FF',
        bookpurble: '#BA61FF',
        bookyellow: '#E9FF8F',
        bookwhite: '#F8F8FD',
        lime: '#CFFF45',
        /////////
        primary400: '#59B9FF',
        primary500: '#35A5F6',
        primary600: '#269AED',
        primary700: '#2086D0',
        secondary500: '#E9FF8F',
        secondary600: '#D8FA8E',
        secondary700: '#CFFF45',
        grayBg: '#EDEEF2',
        grayBgLight: '#F6F7F9',
        fontGrayBlue: '#8A9DB3',
        fontGrayLight: '#B3C1CC',
        darkTag: '#1E303C',
        lineGray: '#DBEBEB',
        lineGray30: '#DBEBEB',
        lineGray60: '#DBEBEB',
        fontTitle: '#292929',
        fontBlack: '#3F3E4E',
        fontGray: '#939393',
        fontGray30: '#3F3E4E',
        fontGray60: '#3F3E4E',
        fontWhite: '#FFFFFF',
        profileGray: '#E6EEF3',
        errorRed: '#FF645A',
        successGreen: '#00DA71',
        fontTab: '#3A3B42'
      },
      fontFamily: {
        wanted: ['WantedSans', 'sans-serif']
      }
    }
    // extend안으로
  },
  plugins: []
};
export default config;
