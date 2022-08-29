import React from 'react'

import { NextPage } from 'next'
import DefaultLayout from '../../layouts/default'

import { useRouter } from 'next/router'
import Vault from '../../components/Vault'

const VaultPage : NextPage = () => {

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