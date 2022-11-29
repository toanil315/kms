import { css, Theme } from "@emotion/react";

const globalStyles = (theme: Theme) => css`
  html,
  body,
  div,
  span,
  applet,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  abbr,
  acronym,
  address,
  big,
  cite,
  code,
  del,
  dfn,
  em,
  img,
  ins,
  kbd,
  q,
  s,
  samp,
  small,
  strike,
  strong,
  sub,
  sup,
  tt,
  var,
  b,
  u,
  i,
  center,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  embed,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  menu,
  nav,
  output,
  ruby,
  section,
  summary,
  time,
  mark,
  audio,
  video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section {
    display: block;
  }
  body {
    line-height: 1;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  ol,
  ul {
    list-style: none;
  }
  blockquote,
  q {
    quotes: none;
  }
  blockquote:before,
  blockquote:after,
  q:before,
  q:after {
    content: "";
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  /* total width */
  ::-webkit-scrollbar {
    background-color: red;
    width: 9px;
    height: 9px;
  }
  /* background of the scrollbar except button or resizer */
  ::-webkit-scrollbar-track {
    background-color: #f5f5f5;
  }
  ::-webkit-scrollbar-track:hover {
    background-color: #f4f4f4;
  }
  /* scrollbar itself */
  ::-webkit-scrollbar-thumb {
    background-color: #a0a0a5;
    border-radius: 16px;
    z-index: 1000;
    /*     border:5px solid #a0a0a5 */
  }
  ::-webkit-scrollbar-thumb:hover {
    background-color: #a0a0a5;
    /*     border:1px solid #a0a0a5 */
  }
  /* set button(top and bottom of the scrollbar) */
  ::-webkit-scrollbar-button {
    display: none;
  }
  html {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  html body {
    font-family: "Montserrat", sans-serif;
  }
  body {
    font-size: ${theme.fontSizes.base};
    font-weight: ${theme.fontWeights.regular};
    color: #333333;
  }
  * {
    box-sizing: border-box;
  }
  img {
    max-width: 100%;
    vertical-align: middle;
  }
  a {
    text-decoration: none;
    transition: 0.4s;
    &:hover {
      opacity: 0.8;
    }
  }
  button,
  input {
    outline: none;
    border: 0;
    &:focus {
      outline: none;
    }
  }
  iframe {
    border: 0;
    width: 100%;
  }
  /* atomic class define */
  .cursor-pointer {
    cursor: pointer;
  }
  .relative {
    position: relative;
  }

  // ANTD CUSTOM GLOBAL
  li.ant-picker-time-panel-cell-disabled {
    .ant-picker-time-panel-cell-inner {
      pointer-events: none !important;
    }
  }
`;

export default globalStyles;
