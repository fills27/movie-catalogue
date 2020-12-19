import React, { useEffect } from 'react'
import {useParams, useLocation} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {actions, types} from 'stores'
import {Container, Input} from 'components'
import {Helpers, Base} from 'utils'
import {IMAGE_URL, LANDSCAPE_IMAGE_BIG, POTRAIT_BIG, POTRAIT} from 'babel-dotenv'
import Styles from './styles'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const Detail = () => {
  const state = useSelector(state => state.detailReducer)
  const {id} = useParams()
  const dispatch = useDispatch()
  const isDataNew = state.movieDetailOpened.length === 0 || 
                    state.movieDetailOpened.filter(any => any.id.toString() === id).length === 0

  if(isDataNew){
    useEffect(() => {
      dispatch(actions.getDataDetail(id, null))
      /* this to reset results */
      dispatch({type: types.RESET_DATA_MOVIE_SEARCH_NAVBAR, state: {results: []}})
    }, [id])
  } else {
    useEffect(() => {
      dispatch(actions.getDataDetail(id, state.movieDetailOpened.find(any => any.id.toString() === id)))
      /* this to reset results */
      dispatch({type: types.RESET_DATA_MOVIE_SEARCH_NAVBAR, state: {results: []}})
    }, [id])
  }
  
  if(state.movieDetail === null){
    return (
      <Container/>
    )
  }

  const creator = ['Director', 'Writer', 'Screenplay']
  
  const creatorInfo = state.movieDetail.credits.crew.filter(any => creator.includes(any.job))
    .reduce((groups, item) => {
    const name = item.name
    if (!groups[name]) {
      groups[name] = []
    }
    groups[name].push(item)
    return groups
  }, {})

  const settings = {
    // dots: true,
    autoplay: false,
    infinite: false,
    slidesToShow: 5,
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

  console.log(state)

  return(
    <Container>
      <div className={Styles.bgDetail(IMAGE_URL + LANDSCAPE_IMAGE_BIG + state.movieDetail.backdrop_path)}>
        <div className={Styles.bgDetailOverlay}>
          <div className={Base.container}>
            <div className={Helpers.mergeCss(Base.row, Base.alignItemsCenter)}>
              <div className={Helpers.mergeCss(Base.col, Base.w3)}>
                <div className={Styles.wrapperImage}>
                  <div className={Styles.wrapperImageChild}>
                    <div>
                      <img className={Base.imgFluid} src={IMAGE_URL + POTRAIT_BIG + state.movieDetail.poster_path}/>
                    </div>
                  </div>
                </div>
              </div>
              <div className={Helpers.mergeCss(Base.col, Base.w9)}>
                <div className={Styles.contentDetail}>
                  {state.movieDetail.vote_average !== 0 &&
                    <span style={{marginTop: '3px'}} className={Helpers.mergeCss(Base.dFlex, Styles.rate, Base.alignItemsCenter)}>
                      <i style={{marginRight: '3px'}} className="la la-star"></i>
                      {state.movieDetail.vote_average}
                    </span>
                  }
                  <h1>
                    {state.movieDetail.title}
                    &nbsp;
                    <span>
                      ({state.movieDetail.release_date.split('-')[0]})
                    </span>
                  </h1>
                  <div className={Styles.detailSummary}>
                    <span>{state.movieDetail.release_date.split('-')[1]}/{state.movieDetail.release_date.split('-')[2]}/{state.movieDetail.release_date.split('-')[2]}</span>
                    <span>&bull;</span>
                    <span>{state.movieDetail.genres.map(any => any.name).join(', ')}</span>
                    <span>&bull;</span>
                    <span>
                    {Math.floor(state.movieDetail.runtime / 60)}h {state.movieDetail.runtime % 60}m
                    </span>
                  </div>
                  <div className={Styles.overview}>
                    <b>
                      Overview
                    </b>
                    <span>
                      {state.movieDetail.overview}
                    </span>
                  </div>
                  <div className={Styles.creator}>
                    {Object.keys(creatorInfo).map(any => {
                      return(
                        <div key={any} className={Base.dInlineBlock}>
                          <b>
                            {any}
                          </b>
                          <span className={Base.dBlock}>
                            {creatorInfo[any].map(item => item.job).join(', ')}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={Helpers.mergeCss(Base.container, Base.paddingTop5, Styles.infoDetail)}>
        <div className={Helpers.mergeCss(Base.row, Base.alignItemsStart)}>
          <div className={Helpers.mergeCss(Base.col, Base.w10)}>
            <h1 className={Base.marginBottom3}>Cast</h1>
            <Slider {...settings}>
              {state.movieDetail.credits.cast.filter(any => any.profile_path !== null).map(any => {
              return(
                <div className={Styles.wrapperSlider} key={any.id} to={`movie/${any.id}`}>                        
                  <div className={Styles.parentSliderItem}>
                    <div>
                      <div className={Helpers.mergeCss(Styles.sliderItem, Base.w100, Base.dInlineFlex)}>
                        <img className={Base.imgFluid} src={IMAGE_URL + POTRAIT + any.profile_path}/>
                      </div>
                      <div className={Styles.contentSlider}>
                        <h3>
                          {any.name}
                        </h3>
                        <span style={{marginTop: '3px'}} className={Helpers.mergeCss(Base.dInlineFlex, Base.alignItemsCenter)}>
                          as {any.character}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </Slider>
          </div>
          <div className={Helpers.mergeCss(Base.col, Styles.infoDetailSummary, Base.w2)}>
            <div className={Base.marginBottom3}>
              <b>
                Status
              </b>
              <span>
                {state.movieDetail.status}
              </span>
            </div>
            <div className={Base.marginBottom3}>
              <b>
                Original Language
              </b>
              <span>
                {state.movieDetail.original_language}
              </span>
            </div>
            <div className={Base.marginBottom3}>
              <b>
                Budget
              </b>
              <span>
                ${state.movieDetail.budget.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </span>
            </div>
            <div className={Base.marginBottom3}>
              <b>
                Revenue
              </b>
              <span>
                ${state.movieDetail.revenue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </span>
            </div>
            <div className={Base.marginBottom3}>
              <b>
                Keywords
              </b>
              {
                state.movieDetail.keywords.map(any => 
                  <span key={any.id}>
                    {any.name}
                  </span>
                )
              }
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default Detail