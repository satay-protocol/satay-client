import { extendTheme } from "@chakra-ui/react";

import components from "./components";

import { colors } from "./color";

import { config } from "./config";

export default extendTheme({
    components,
    colors,
    config
});