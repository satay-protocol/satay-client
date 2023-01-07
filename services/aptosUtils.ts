
import { StructData } from "../types/aptos";



export const structToModule = (struct : StructData) => {
    return struct.account_address + "::" + struct.module_name;
}

export const structToString = (struct : StructData) => {
    return struct.account_address + "::" + struct.module_name + "::" + struct.struct_name;
}

export const getStructFromType = (type: string) : StructData => {
    const account_address = type.slice(0, type.indexOf('::'));
    type = type.slice(type.indexOf('::') + 2);
    const module_name = type.slice(0, type.indexOf('::'));
    type = type.slice(type.indexOf('::') + 2);
    const struct_name = type.slice(0);
    return {
        struct_name,
        account_address,
        module_name
    }
}
