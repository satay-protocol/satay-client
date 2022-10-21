import { ComponentStyleConfig } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
const Card : ComponentStyleConfig = {
  baseStyle: {
    p: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent:'center',
    width: "100%",
    position: "relative",
    minWidth: "0px",
    wordWrap: "break-word",
    bg: mode("#ffffff", "navy.800"),
    backgroundClip: "border-box",
    rounded:'lg',
    shadow: 'xl'
  },
};

export const CardComponent = {
  components: {
    Card,
  },
};