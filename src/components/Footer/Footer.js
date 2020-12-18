import React from 'react'
import {Helpers, Base} from 'utils'

const Footer = ({children}) => (
  <div style={{fontSize: '16px', color: 'white', fontWeight: 'bold', textAlign: 'center'}} 
    className={Helpers.mergeCss(Base.marginTop5, Base.paddingTop2, Base.paddingBottom3)}>
    Made with ✨🌈 by Syafil.
  </div>
)

export default Footer