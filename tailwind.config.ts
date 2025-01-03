import type { Config } from 'tailwindcss';

import { inputSliderUtilities, scrollbarUtilities } from './plugins';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        monitor: '1920px',
        desktop: '1440px',
        laptop: '1024px',
        tablet: '768px',
        's-tablet': '576px',
        screen480: '480px',
        mobile: '430px',
        screen640: '640px',
      },
      colors: {
        bg: '#FFFFFF',
        subColor1: '#FFDBA5',
        subColor2: '#FFB186',
        brown: '#643927',
        brown1: '#966E5D',
        brown2: '#BCA79E',
        brown3: '#DDCFC4',
        brown4: '#FFF7F1',
        brown5: '#FFFEFB',
        brown6: '#F5EDE6',
        brown7: '#EEE2D8',
        'dark-brown': '#241F1D',
        point: '#FF7759',
        point1: '#FF5F3C',
        'hover-outline': '#FFFBF8',
        'active-fill': '#4C2A1C',
        'active-outline': '#F7E9DE',
        focus: '#EFCBA1',
        'bg-beige': '#FCF7E7',
        'bg-orange': '#FFD7C6',
      },
      fontSize: {
        Head1: ['3rem', { fontWeight: 700 }],
        Head2: ['2rem', { fontWeight: 600 }],
        Head3: ['1.5rem', { fontWeight: 600 }],
        SubTitle1: ['1.25rem', { fontWeight: 600 }],
        SubTitle2: ['1.125rem', { fontWeight: 600 }],
        SubTitle3: ['1rem', { fontWeight: 600 }],
        P1: ['1.25rem', { fontWeight: 400 }],
        P2: ['1.125rem', { fontWeight: 400 }],
        P3: ['1rem', { fontWeight: 400 }],
        Span1: ['0.875rem', { fontWeight: 400 }],
        Span2: ['0.75rem', { fontWeight: 400 }],
        SpanMid1: ['0.875rem', { fontWeight: 500 }],
        SpanMid2: ['0.75rem', { fontWeight: 500 }],
      },
      fontFamily: {
        'Noto-Sans-KR': ['Noto Sans KR', 'sans-serif'],
        'Myanmar-Khyay': ['Myanmar Khyay', 'sans-serif'],
      },
      lineHeight: {
        150: '1.5',
      },
      borderWidth: {
        DEFAULT: '1px',
        '0': '0',
        '0.5': '0.5px',
        '2': '2px',
        '3': '3px',
        '4': '4px',
        '6': '6px',
        '8': '8px',
      },
      boxShadow: {
        avatar: 'rgba(0, 0, 0, 0.25) 0px 0px 4px 0px',
        dropdown: 'rgba(0, 0, 0, 0.25) 0px 0px 4px 0px',
        'avatar-active': 'rgba(0, 0, 0, 0.3) 0px 0px 4px 3px',
        badge: 'rgba(0, 0, 0, 0.16) 0px 0px 8px 0px',
        card: 'rgba(0, 0, 0, 0.12) 0px 4px 12px 0px',
      },
      dropShadow: {
        icon: '0px 0px 2px rgba(0, 0, 0, 0.5)',
      },
    },
  },

  plugins: [inputSliderUtilities, scrollbarUtilities],
  safelist: [
    {
      pattern:
        /(!?)(bg|text|fill|stroke)-(bg|subColor1|subColor2|brown|brown1|brown2|brown3|brown4|brown5|point)/,
      variants: ['hover', '[&_path]'],
    },
    // ! translate safelist
    ...[...Array(30).keys()].flatMap(i => [
      `-translate-x-[${i * 100}%]`,
      `translate-y-[${i * 100}%]`,
    ]),
  ],
} satisfies Config;
