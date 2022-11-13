declare module "@emotion/react" {
  export interface Theme {
    colors: {
      transparent: string;
      primary: string;
      secondary: string;
      danger: string;
      text: string;
      textLight: string;
      gray: string;
      lightGray: string;
      boxShadowPrimary: string;
      boxShadowDanger: string;
      yellow: string;
    };
    fontSizes: any;
    fontWeights: any;
    lineHeights: any;
    zIndices: any;
    shadows: any;
    radii: any;
  }
}

const colors = {
  transparent: "transparent",
  primary: "#32c5ff",
  secondary: "#edf9fc",
  danger: "#ff4e4e",
  text: "#1E2731",
  textLight: "#93A0B0",
  gray: "#8492A6",
  lightGray: "#ced4db",
  boxShadowPrimary: "rgba(50, 197, 255, 0.5)",
  boxShadowDanger: "rgba(255, 78, 78, 0.5)",
  yellow: "#FFC525",
};

const fontSizes = {
  xs: "12px",
  sm: "14px",
  base: "16px",
  md: "18px",
  lg: "20px",
  xl: "24px",
  xxl: "32px",
  xxxl: "40px",
};

const fontWeights = {
  regular: 400,
  medium: 500,
  bold: 600,
  extraBold: 700,
};

const lineHeights = {
  small: "18px",
  normal: "21px",
  large: "24px",
  xl: "30px",
};

const zIndices = {
  base: 1,
  dropdown: 10,
  backdrop: 50,
  modal: 100,
};

const shadows = {
  box: "0px 2px 2px rgba(48, 48, 48, 0.25)",
};

const radii = {
  base: "4px",
  md: "8px",
  large: "12px",
  rounded: "50%",
};

const breakpoints = ["40em", "52em", "64em", "80em"];

export default {
  colors,
  fontSizes,
  fontWeights,
  lineHeights,
  zIndices,
  shadows,
  radii,
  breakpoints,
};
