import { mode } from "@chakra-ui/theme-tools";

import { ComponentStyleConfig } from "@chakra-ui/react";

export const Card : ComponentStyleConfig = {
  baseStyle: (props) => ({
    p: "20px",
    display: "flex",
    flexDirection: "column",
    width: "100%",
    position: "relative",
    minWidth: "0px",
    wordWrap: "break-word",
    bg: mode("#ffffff", "whiteAlpha.50")(props),
    backgroundClip: "border-box",
    rounded:'lg',
    shadow: 'xl'
  }),
};