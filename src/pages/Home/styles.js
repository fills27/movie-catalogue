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

const hero = (url) => {
  return css`
    background-size: cover;
    background-repeat: no-repeat;
    background-image: url(${url});
    background-position: right -300px top;
    width: 100%;
  `
}

const overlayhero = css`
  padding-top: 100px;
  padding-bottom: 50px;
  background: linear-gradient(to right, rgba(2, 37, 64, 1.00) 300px, rgba(2, 37, 64, 0.64) 100%);
  height: 500px;
  h1{
    font-size: 30px;
    color: #fff;
    margin-bottom: 30px;
  }
  b{
    color: #fff;
    display: block;
    margin-bottom: 10px;
    font-size: 18px;
  }
  a{
    margin-top: 20px;
    color: #fff;
    font-size: 18px;
    display: inline-block;
  }
`

const rating = css`
  font-size: 22px;
  color: #fff;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`

const overview = css`
  font-size: 18px;
  color: rgba(255,255,255, 0.4);
  display: block;
`

export default{
  sliderItem,
  parentSliderItem,
  topRated,
  wrapperSlider,
  contentSlider,
  hero,
  overlayhero,
  rating,
  overview
}