import { NextPage } from 'next'
import React from 'react'

import DefaultLayout from '../../layouts/default';
import Manager from '../../components/Manager';

const ManagerPage : NextPage = () => {
  return (
    <DefaultLayout>
      <Manager />
    </DefaultLayout>
  )
}

export default ManagerPage;