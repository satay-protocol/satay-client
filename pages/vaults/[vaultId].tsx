import React from 'react'

import { useRouter } from 'next/router';

import DefaultLayout from '../../layouts/default';
import Vault from '../../components/Vault';

const VaultPage = () => {

    const { query } = useRouter();

    const { vaultId } = query as { vaultId: string };

    return (
        <DefaultLayout>
            <Vault 
                vaultId={vaultId}
            />
        </DefaultLayout>
    )
}

export default VaultPage