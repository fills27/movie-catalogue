import {css} from '@emotion/css'

const hamburgerMenu = (darkMode) => {
  return css`
    width: 35px;
    height: 35px;
    background: #f3f3f4;
    border-radius: 50%;
    margin-right: 15px;
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    &:after{
      content: '';
      position:relative;
      width: 20px;
      height: 2px;
      background: #3f3f40;
      margin-top: 7px;
      display: inline-flex;
      right: 25%;
      border-radius: 3px;
    }
    &:before{
      content: '';
      position:relative;
      width: 20px;
      height: 2px;
      background: #3f3f40;
      margin-bottom: 7px;
      display: inline-flex;
      left: 25%;
      border-radius: 3px;
    }
  `
}

const container = (darkMode) => {
  return css`
    display: flex!important;
    flex-basis: auto;
    flex-grow: 1;
    align-items: center;
    > div{
      display: flex;
      flex-direction: row;
      &:nth-child(2){
        font-size: 18px;
        font-weight: bold;
      }
      &:nth-child(1){
        margin-right: auto;
        > a {
          text-decoration: none;
          > b{
            font-size: 18px;
            margin-left: 15px;
            color:#000000;
            text-decoration: none;
          }
        }
      }
      &:nth-child(3){
        font-size: 18px;
        font-weight: bold;
        margin-left: auto;
        width: 132px;
        text-align: right;
        justify-content: flex-end;
      }
    }
  `
}

const tmdbLogo = css`
  background: #022540;
  padding: 6px 12px;
  border-radius: 3px;
  b{
    font-size: 20px;
    font-weight: bold;
    background: -webkit-linear-gradient(0deg, #8ecea2, #02a9da); 
    -webkit-background-clip: text; 
    -webkit-text-fill-color: transparent;
  }
`

const resultsSearch = css`
  position: absolute;
  width: 100%;
  min-height: 300px;
  overflow: hidden;
  top: 35px;
  background: #f3f3f4;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: start;
  text-align: left;
  > div{
    width: 100%;
    text-transform: capitalize;
    h4{
      padding: 6px 10px;
    }
  }
`

const customInput = (exist) => {
  const existStyle = exist ? `
    border-bottom-left-radius: 0px !important;
    border-bottom-right-radius: 0px !important;
  `:
  `
    border-bottom-left-radius: 6px !important;
    border-bottom-right-radius: 6px !important;
  `
  return css`
    ${existStyle}
  `
}

const itemResult = css`
  display: flex;
  align-items: flex-start;
  padding: 2px 10px;
  text-decoration: none;
  padding-top: 6px;
  &:hover{
    background: #fff;
  }
  > div{
    &:last-of-type{
      margin-left: 10px;
      font-size: 14px;
      > span{
        &:first-of-type{
          overflow: hidden !important;
          display: -webkit-box !important;
          -webkit-box-orient: vertical !important;
          -webkit-line-clamp: 2 !important;
          color: #000;
        }
        &:last-of-type{
          margin-top: 5px;
          display: inline-block;
          font-weight: normal;
          color: rgba(0,0,0,0.5);
          overflow: hidden !important;
          display: -webkit-box !important;
          -webkit-box-orient: vertical !important;
          -webkit-line-clamp: 2 !important;
          b{
            font-weight: normal;
          }
        }
      }
    }
  }
`

const parentItem = (type) => {
  const typeStyle = type === 'person' ? 
  `
    width: 50px;
    max-width: unset;
    object-fit: cover;
    object-position: center;
    height: 75px;
  `
  : 
  `
    width: 100px;
    max-width: unset;
    object-fit: cover;
    object-position: center;
    height: 60px;
  `

  return css`
    img{
      padding: 2px;
      border-radius: 2px;
      background: linear-gradient(#02a9da, #022540);
      ${typeStyle}
    }
    > div{
      
    }
  `
}

export default {
  hamburgerMenu,
  container,
  tmdbLogo,
  resultsSearch,
  customInput,
  itemResult,
  parentItem
}