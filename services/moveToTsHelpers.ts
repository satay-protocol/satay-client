import {AtomicTypeTag, StructTag, TypeTag, U8} from "@manahippo/move-to-ts";
import {getStructFromType} from "./aptosUtils";
import {HexString} from "aptos";

export const stringToByteArray = (str: string): U8[] => {
    let myBuffer: U8[] = [];
    const buffer = new Buffer(str, 'utf16le');
    for (let i = 0; i < buffer.length; i++) {
        myBuffer.push(new U8(buffer[i]));
    }
    return myBuffer
}

export const typeStringToTypeTag = (typeString: string): TypeTag => {
    if(Object.values(AtomicTypeTag).includes(typeString as AtomicTypeTag))
    {
        return typeString as AtomicTypeTag;
    }
    let struct = getStructFromType(typeString);
    return new StructTag(
        new HexString(struct.account_address),
        struct.module_name,
        struct.struct_name,
        []
    )
}