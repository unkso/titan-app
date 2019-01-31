import { createGlobalStyle } from 'styled-components';
import { createTypography } from 'titan/lib/styles/typography';

function convertThemeToString(theme) {
  const { fontFamily, fontSize, lineHeight, ...elements } = theme.typography;

  let themeStr = `
    html, body {
      color: ${theme.palette.text.main};
      font-family: ${fontFamily};
      font-size: ${fontSize};
      line-height: ${lineHeight};
    }
  `;

  for (let tag in elements) {
    let propertiesStr = '';
    for (let property in elements[tag]) {
      const propRegex = /([A-Z]+)/g;
      const normalizedPropName = property.replace(propRegex, '-$1').toLowerCase();
      propertiesStr += `${normalizedPropName}: ${elements[tag][property]};`;
    }

    themeStr += `${tag} { ${propertiesStr} }`;
  }

  return themeStr;
}

export function createGlobalStyles(theme) {
  theme.typography = createTypography(theme.typography);
  return createGlobalStyle`
    ${convertThemeToString(theme)}
  `;
}
