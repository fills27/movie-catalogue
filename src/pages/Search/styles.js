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

export default{
  customInput,
  title,
  form,
  parentItem,
  itemResult
}