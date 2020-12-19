import {css} from '@emotion/css'

const customInput = css`
  width: 100% !important;
  background: #fff !important;
  border: 1px solid #fff !important;
`

const title = css`
  h1{
    color: #fff;
  }
`

const form = css`
  h2{
    color: #fff;
  }
  h4{
    color: #fff;
    font-size: 18px;
    text-transform: capitalize;
    margin-bottom: 10px;
  }
  h5{
    color: #fff;
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 20px;
    margin-right: 15px;
  }
  h6{
    color: #fff;
    font-size: 16px;
    font-weight: bold;
    margin-right: 15px;
  }
`

const parentItem = (type) => {
  const typeStyle = type === 'person' ? 
  `
    object-fit: cover;
    object-position: center;
  `
  : 
  `
    object-fit: cover;
    object-position: center;
  `

  return css`
  padding: 5px;
  border-radius: 2px;
  background: rgba(255, 255, 255, 0.6);
  > div{
    width: 100%;
    padding-bottom: 175%;
    height: 0px;
    border-radius: 2px;
    overflow: hidden;
    position: relative;
    > div{
      width: 100%;
      display: inline-block;
      position: relative;
      img{
        width: 100%;
        margin: 0px;
        object-fit: cover;
        height: auto;
      }
    }
  }
  `
}

const itemResult = css`
  width: 234px;
  display: inline-block;
  padding-right: 15px;
  margin-bottom: 20px;
  > div{
    > div{
      > div{
        &:last-of-type{
          padding: 10px;
        }
      }
    }
  }
  span{
    color: #000;
    font-weight:bold;
    &:first-of-type{
      display: -webkit-box !important;
      -webkit-box-orient: vertical !important;
      -webkit-line-clamp: 1 !important;
      overflow: hidden !important;
    }
    &:last-of-type{
      color: rgba(0,0,0,0.5);
      display: -webkit-box !important;
      -webkit-box-orient: vertical !important;
      -webkit-line-clamp: 1 !important;
      overflow: hidden !important;
    }
  }
`

const filter = css`
  padding: 3px 6px;
  border-radius: 2px;
  background: rgba(255, 255, 255, 0.4);
  display: inline-flex;
  align-items: center;
  color: #fff;
  margin-right: 10px;
  font-weight: bold;
  b{
    background: #000;
    color: #fff;
    background: #000;
    color: #fff;
    margin-left: 10px;
    border-radius: 50%;
    font-size: 10px;
    padding: 2px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    i{
      font-weight: bold;
      position:relative;
    }
  }
`

const pagination = (active) => {
    const activeStyle = active ? `
      background: #000;
    `
    :
    `
      background: rgba(255, 255, 255, 0.4);
    `
    return css`
      ${activeStyle};
      cursor: pointer;
      color: #fff;
      font-weight: bold;
      margin-right: 10px;
      width: 20px;
      height: 20px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      font-size: 11px;
      margin-bottom: 5px;
  `
}

const inputPeople = css`
  position: relative;
`

const customInputPeople = (exist) => {
  const existStyle = exist ? `
    border-bottom-left-radius: 0px !important;
    border-bottom-right-radius: 0px !important;
  `
  :
  `
    border-bottom-left-radius: 6px !important;
    border-bottom-right-radius: 6px !important;
  `
  return css`
    ${existStyle}
    width: 100% !important;
    background: #fff !important;
    border: 1px solid #fff !important;
  `
}

const customInputYear = (exist) => {
  const existStyle = exist ? `
    border-bottom-left-radius: 0px !important;
    border-bottom-right-radius: 0px !important;
  `
  :
  `
    border-bottom-left-radius: 6px !important;
    border-bottom-right-radius: 6px !important;
  `
  return css`
    ${existStyle}
    width: 100% !important;
    background: #fff !important;
    border: 1px solid #fff !important;
  `
}

const resultPeople = css`
  width: 100%;
  position: absolute;
  min-height: 85px;
  background: #fff;
  border-bottom-left-radius: 6px !important;
  border-bottom-right-radius: 6px !important;
  z-index: 1;
  overflow: hidden;
`

const resultYear = css`
  width: 100%;
  position: absolute;
  min-height: 27px;
  background: #fff;
  border-bottom-left-radius: 6px !important;
  border-bottom-right-radius: 6px !important;
  z-index: 1;
  overflow: hidden;
`

const actorItem = css`
  display: flex;
  align-items: flex-start;
  padding: 5px;
  cursor: pointer;
  img{
    border-radius: 2px;
    width: 50px;
    height: 75px;
    object-fit: cover;
    background: linear-gradient(#02a9da, #022540);
    padding: 2px;
  }
  > div{
    margin-left: 10px;
    b{
      display: block;
    }
    span{
      color: rgba(0,0,0,0.5);
    }
  }
`

export default{
  customInput,
  title,
  form,
  parentItem,
  itemResult,
  filter,
  pagination,
  inputPeople,
  customInputPeople,
  resultPeople,
  resultYear,
  actorItem,
  customInputYear
}