type ColorMode = 'light' | 'dark';

const colorModeValue = (mode: ColorMode, light: string, dark: string) => {
    return mode === 'light' ? light : dark;
}

export const whiteAlpha = (alpha: number) => `rgba(255, 255, 255, ${alpha})`;
export const blackAlpha = (alpha: number) => `rgba(0, 0, 0, ${alpha})`;

export const bridgeTheme = (colorMode: ColorMode) => ({
    breakpoints: {
      keys: ['xs', 'sm', 'md', 'lg', 'xl'],
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1536,
      },
      unit: 'px',
    },
    palette: {
      mode: colorMode,
      primary: {
        main: colorModeValue(colorMode, '#ad8c40', '#edce65'),
        contrastText: colorModeValue(colorMode, '#FFFFFF', '#000000')
      },
      secondary: {
        main: '#2E3231',
        light: '#363A39',
        contrastText: '#FFFFFF',
      },
      info: {
        main: '#4CB3D4',
      },
      success: {
        main: '#2DD8A7',
      },
      error: {
        main: '#F44336',
      },
      warning: {
        main: '#ED8B00',
      },
      text: {
        primary: colorModeValue(colorMode, '#000', '#FFF'),
        secondary: colorModeValue(colorMode, blackAlpha(0.7), whiteAlpha(0.7)),
      },
      divider: colorModeValue(colorMode, blackAlpha(0.3), whiteAlpha(0.3)),
      background: {
        paper: colorModeValue(colorMode, whiteAlpha(1), '#1A1E1D'),
        default: 'transparent',
      },
    },
    shape: {
      borderRadius: 16,
    },
    typography: {
      fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
    },
    components: {
        MuiSelect: {
            root: {
                background: 'red'
            }
        },
    }
  });