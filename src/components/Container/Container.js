import React from 'react'
import {Helpers, Base} from 'utils'
import {Navbar, Footer} from 'components'

const Container = ({children}) => (
  <>
    <Navbar/>
    {children}
    <Footer/>
  </>
)

export default Container