"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.callGetFunction = void 0;
const SUPPORTED_NETWORKS = [
    'testnet',
    'mainnet',
    'devnet'
];
const callGetFunction = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch('https://composer.sentio.xyz/api/call_function', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
    });
    const returnData = yield response.json();
    return returnData;
});
exports.callGetFunction = callGetFunction;
