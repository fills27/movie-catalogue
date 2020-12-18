import {css} from '@emotion/css'

const topRated = css`
  color: #fff;
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

const parentSliderItem = (label) => {

  const labelStyle = label !== 'nowPlaying' ?
  `padding-bottom: 130%;`
  :
  `padding-bottom: 72%;`

  return css`
    padding: 5px;
    border-radius: 2px;
    background: rgba(255, 255, 255, 0.6);
    > div{
      width: 100%;
      ${labelStyle}
      height: 0px;
      border-radius: 2px;
      overflow: hidden;
      position: relative;
    }
  `
}

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
  }
`

const contentSlider = css`
  padding: 10px;
`

export default{
  sliderItem,
  parentSliderItem,
  topRated,
  wrapperSlider,
  contentSlider
}