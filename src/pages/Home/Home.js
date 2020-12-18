/* eslint-disable */
import React, {Fragment, useEffect} from 'react'
import {useSelector} from 'react-redux'
import {Container, Input} from 'components'
import {Link, useLocation} from 'react-router-dom'
import {Helpers, Base} from 'utils'
import {IMAGE_URL, POTRAIT, LANDSCAPE_IMAGE} from 'babel-dotenv'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Styles from './styles'

const Home = () => {
  const state = useSelector(state => state.initialReducer)
  const allState = useSelector(state => state)

  const dataMovie = [
    {label: "nowPlaying", title: 'Now Playing'}, 
    {label: "upComing", title: 'Upcoming'},
    {label: "topRated", title: 'Top Rated'},
  ]

  /* this is reset state when back to index */
  // const location = useLocation()
  // if(typeof location.state !== "undefined" && location.state.reset){
  //   useEffect(() => {

  //   }, [location])
  // }

  return (
    <Container>
      <div className={Base.container}>
      {
        dataMovie.map(item =>{
          const settings = {
            // dots: true,
            autoplay: false,
            infinite: false,
            slidesToShow: item.label !== 'nowPlaying' ?  5 : 3,
            slidesToScroll: 1,
            arrows: true,
            responsive: [
              {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 5,
                  slidesToScroll: 1,
                }
              },
              {
                breakpoint: 1000,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 1
                }
              },
              {
                breakpoint: 767,
                settings: {
                  slidesToShow: 2.25,
                  slidesToScroll: 1
                }
              }
            ]
          }

          return(
            <Fragment key={item.label}>
              <div className={Base.marginTop4}>
                <h1 className={Styles.topRated}>
                  {item.title}
                </h1>
              </div>
              <div className={Helpers.mergeCss(Base.row, Base.marginTop3)}>
                <div className={Helpers.mergeCss(Base.col, Base.w12)}>
                  <Slider {...settings}>
                    {state[item.label].map(any => {
                      const path = item.label !== 'nowPlaying' ? POTRAIT : LANDSCAPE_IMAGE
                      return(
                        <Link className={Styles.wrapperSlider} key={any.id} to={`movie/${any.id}`}>                        
                          <div className={Styles.parentSliderItem(item.label)}>
                            <div>
                              <div className={Helpers.mergeCss(Styles.sliderItem, Base.w100, Base.dInlineFlex)}>
                                <img className={Base.imgFluid} src={IMAGE_URL + path + any.poster_path}/>
                              </div>
                              {
                                item.label === 'nowPlaying' &&
                                <div className={Styles.contentSlider}>
                                  <h3>
                                    {any.original_title}
                                    &nbsp;
                                    ({any.release_date.split('-')[0]})
                                  </h3>
                                  <span style={{marginTop: '3px'}} className={Helpers.mergeCss(Base.dInlineFlex, Base.alignItemsCenter)}>
                                    <i style={{marginRight: '3px'}} className="la la-star"></i>
                                    {any.vote_average}
                                  </span>
                                </div>
                              }
                            </div>
                          </div>
                        </Link>
                      )
                    })}
                  </Slider>
                </div>
              </div>
            </Fragment>
          )
        })
      }
      </div>
    </Container>
  )
}

export default Home
