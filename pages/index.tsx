
import type { NextPage } from 'next'

import {library} from '@fortawesome/fontawesome-svg-core';
import {fab} from '@fortawesome/free-brands-svg-icons';
import {far} from '@fortawesome/free-regular-svg-icons';
import {fas} from '@fortawesome/free-solid-svg-icons'

import React from 'react'
import Main from '../layouts/Main'
import { NextSeo } from 'next-seo';

library.add(fab,far,fas);

const Home: NextPage = () => {
  return (  
    <> 
      <Main/>
    </>

     
  )
}


export default Home
