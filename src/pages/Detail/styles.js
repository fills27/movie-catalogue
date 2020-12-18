import {css} from '@emotion/css'

const bgDetail = (url) => {
  return css`
    background-size: cover;
    background-repeat: no-repeat;
    background-image: url(${url});
    background-position: right -200px top;
    width: 100%;
  `
}

const bgDetailOverlay = css`
  padding-top: 50px;
  padding-bottom: 75px;
  background: linear-gradient(to right, rgba(2, 37, 64, 1.00) 100px, rgba(2, 37, 64, 0.64) 100%);
`

const wrapperImage = css`
  padding: 5px;
  border-radius: 2px;
  background: rgba(255, 255, 255, 0.6);
`

const wrapperImageChild = css`
  width: 100%;
  padding-bottom: 143%;
  height: 0px;
  border-radius: 2px;
  overflow: hidden;
  position: relative;
  > div{
    position: relative;
    display: inline-flex;
  }
`

const contentDetail = css`
  width: 100%;
  h1{
    color: #fff;
    font-size: 2.2rem;
    font-weight: bold;
    span{
      font-weight: normal;
      color: rgba(255, 255, 255, 0.4);
    }
  }
`

const detailSummary = css`
  margin-top: 10px;
  span{
    color: rgba(255, 255, 255, 1);
    font-size: 18px;
    &:nth-child(2), &:nth-child(4){
      margin-left: 4px;
      margin-right: 4px;
    }
  }
`

const overview = css`
  font-size: 18px;
  margin-top: 30px;
  b{
    color: #fff;
    display: block;
    margin-bottom: 10px;
  }
  span{
    color: rgba(255, 255, 255, 0.4);
  }
`

const creator = css`
  font-size: 18px;
  margin-top: 30px;
  > div{
    margin-right: 20px;
  }
  b{
    color: #fff;
    display: inline-block;
    margin-bottom: 10px;
  }
  span{
    color: rgba(255, 255, 255, 0.4);
  }
`

const rate = css`
  color: #fff;
  font-size: 22px;
  margin-bottom: 20px;
`

const infoDetail = css`
  h1{
    color: #fff;
  }
`

const sliderItem = css`
  display: inline-block !important;
  position: relative !important;
  img{
    width: 100%;
    margin: 0px;
    object-fit: cover;
    height: auto;
  }
`

const parentSliderItem = css`
  padding: 5px;
  border-radius: 2px;
  background: rgba(255, 255, 255, 0.6);
  > div{
    width: 100%;
    padding-bottom: 185%;
    height: 0px;
    border-radius: 2px;
    overflow: hidden;
    position: relative;
  }
`

const wrapperSlider = css`
  padding-right: 20px;
  text-decoration: none;
  h3{
    margin-top: 0px;
    color: #000;
    font-weight: bold;
    overflow: hidden !important;
    display: -webkit-box !important;
    -webkit-box-orient: vertical !important;
    -webkit-line-clamp: 1 !important;
  }
  span{
    color: rgba(0,0,0,0.5);
    font-weight: bold;
    overflow: hidden !important;
    display: -webkit-box !important;
    -webkit-box-orient: vertical !important;
    -webkit-line-clamp: 1 !important;
  }
`

const contentSlider = css`
  padding: 10px;
`

const infoDetailSummary = css`
  font-size: 18px;
  b{
    display: block;
    color: #fff;
  }
  span{
    color: rgba(255, 255, 255, 0.6);
  }

  > div{
    &:last-of-type{
      b{
        margin-bottom: 5px;
      }
      span{
        display: inline-block;
        color: rgb(255, 255, 255);
        background: rgba(255, 255, 255, 0.4);
        padding: 3px 6px;
        border-radius: 2px;
        font-weight: bold;
        font-size: 14px;
        margin-right: 5px;
        margin-bottom: 5px;
      }
    }
  }
`

export default{
  bgDetail,
  bgDetailOverlay,
  wrapperImage,
  wrapperImageChild,
  contentDetail,
  detailSummary,
  overview,
  creator,
  rate,
  infoDetail,
  sliderItem,
  contentSlider,
  wrapperSlider,
  parentSliderItem,
  infoDetailSummary
}