import {Module} from "../types/aptos";

export const tortugaBlocksModule: Module = {
    account_address: "0xe3eaddfcc4d7436d26fef92ee39685ef176e3513dc736d116129ce055c07afac",
    module_name: "tortuga_blocks"
}

export const dittoBlocksModule: Module = {
    account_address: "0xe3eaddfcc4d7436d26fef92ee39685ef176e3513dc736d116129ce055c07afac",
    module_name: "ditto_blocks"
}

export const tortugaAriesLLSModule: Module = {
    account_address: "0x895cff28180ccdd3746a22a5e8ff929060d4ae58510a97662d90339100ed75c7",
    module_name: "tortuga_aries_lls",
}

export const ariesBlocksModule: Module = {
    account_address: "0xe3eaddfcc4d7436d26fef92ee39685ef176e3513dc736d116129ce055c07afac",
    module_name: "aries_blocks"
}

export const moduleToString = (module: Module) => `${module.account_address}::${module.module_name}`