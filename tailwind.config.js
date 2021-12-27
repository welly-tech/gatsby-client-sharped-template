module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      white: "#FFFFFF",
      black: "#000000",
      // primary: {
      //   50: "#FFFBEB",
      //   100: "#FEF3C7",
      //   200: "#FDE68A",
      //   300: "#FDDA5A",
      //   400: "#FBC924",
      //   500: "#F5AD0B",
      //   600: "#D99006",
      //   700: "#B47209",
      //   800: "#925A0E",
      //   900: "#783F0F",
      // },
      gray: {
        50: "#fcfcfc",
        100: "#f7f7f7",
        200: "#ebebeb",
        300: "#dbdbdb",
        400: "#b3b3b3",
        500: "#808080",
        600: "#636363",
        700: "#525252",
        800: "#404040",
        900: "#2e2e2e",
      },
    },
    fontFamily: {
      sans: [
        "-apple-system",
        "Noto Sans",
        "Helvetica Neue",
        "Helvetica",
        "Nimbus Sans L",
        "Arial",
        "Liberation Sans",
        "PingFang TC",
        "Hiragino Sans CNS",
        "Noto Sans CJK TC",
        "Source Han Sans TC",
        "Source Han Sans CN",
        "Microsoft JhengHei",
        "Wenquanyi Micro Hei",
        "WenQuanYi Zen Hei",
        "Heiti TC",
        "SimHei",
        "WenQuanYi Zen Hei Sharp",
        "sans-serif",
      ],
    },
  },
  variants: {},
  plugins: [require("@tailwindcss/line-clamp")],
}
