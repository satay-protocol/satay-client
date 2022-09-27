import { extendTheme } from "@chakra-ui/react";

import { CardComponent } from "./additions/card";

import { colors } from "./color";

export default extendTheme({
    ...CardComponent,
    colors,
});