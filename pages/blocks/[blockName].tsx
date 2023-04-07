import React from 'react'

import DefaultLayout from '../../layouts/default';

import BlockComponent from "../../components/BlockPage";

import { useRouter } from 'next/router';

import { NextPage } from 'next'

const BlockPage : NextPage = () => {

    const { query } = useRouter();

    const { blockName } = query as { blockName: string };

    return (
        <DefaultLayout>
            <BlockComponent
                blockName={blockName}
            />
        </DefaultLayout>
    )
}

export default BlockPage;