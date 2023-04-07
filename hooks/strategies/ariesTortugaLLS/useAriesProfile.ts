import { useState, useEffect } from 'react';

import useAccountResource from "../../utility/useAccountResource";
import useWallet from "../../utility/useWallet";

import {ARIES_PROFILES_TYPE, PROFILE_NAME} from "./constants";
import {moduleToString, tortugaAriesLLSModule} from "../../../data/modules";

interface AriesProfileSigner {
    key: string,
    value: {
        account: string,
    }
}

interface AriesProfileType {
    profile_signers: {
        data: AriesProfileSigner[]
    }
}

const useAriesProfile = () => {

    const { address, submitTransaction } = useWallet();

    const {
        accountResource: ariesProfile,
        loading,
        error
    } = useAccountResource<AriesProfileType>(address, ARIES_PROFILES_TYPE);

    const [profileHasLlsAccount, setProfileHasLlsAccount] = useState<boolean>(false);

    useEffect(() => {
        if(!ariesProfile) return;
        const profileSigner = ariesProfile.profile_signers.data.find((signer) => signer.key.includes(PROFILE_NAME));
        if(profileSigner) {
            setProfileHasLlsAccount(true);
        }
    }, [ariesProfile])

    const registerProfile = async () => {
        await submitTransaction({
            type: 'entry_function_payload',
            function: `${moduleToString(tortugaAriesLLSModule)}::init_aries_profile`,
            arguments: [
                PROFILE_NAME
            ],
            type_arguments: [],
        }, {
            title: "Aries Profile Created!",
            description: `You have created an Aries Profile`,
        })
    }

    const addLlsSubAccount = async () => {
        await submitTransaction({
            type: 'entry_function_payload',
            function: `${moduleToString(tortugaAriesLLSModule)}::add_aries_subaccount`,
            arguments: [
                PROFILE_NAME
            ],
            type_arguments: [],
        }, {
            title: "Aries Subaccount Created",
            description: `You have created the ${PROFILE_NAME} subaccount on your Aries profile`,
        })
    }

    return {
        ariesProfile,
        loading,
        error,
        registerProfile,
        profileHasLlsAccount,
        addLlsSubAccount
    }
}

export default useAriesProfile;