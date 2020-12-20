import React, {useState, useEffect} from 'react'
import {Helpers, Base} from 'utils'
import {actions, types} from 'stores'
import Styles from './styles'
import {Link, useLocation, useHistory} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {IMAGE_URL, POTRAIT, LANDSCAPE_IMAGE} from 'babel-dotenv'
import {Input} from 'components'

const Navbar = ({darkMode, active}) => {
  const state = useSelector(state => state.searchNavbarReducer)
  const [value, setValue] = useState('')
  const location = useLocation()
  const dispatch = useDispatch()
  const history = useHistory()

  const handleInput = (e) => {
    const {value} = e.target
    const enter = (e.keyCode == 10 || e.keyCode == 13) || e.key === "Enter"
    if(Helpers.checkValueNotBlank(value) && !enter){
      dispatch(actions.getDataSearchNavbar(value, {page: 1}))
    } else if(Helpers.checkValueNotBlank(value) && enter){
      dispatch({type: types.RESET_DATA_MOVIE_SEARCH_NAVBAR, state: {results: []}})
      history.push(`/search/${value}?page=1`)
    }else{
      dispatch({type: types.RESET_DATA_MOVIE_SEARCH_NAVBAR, state: {results: []}})
    }
    setValue(value)
  }

  if(!location.pathname.includes('search')){
    useEffect(() => {
       document.getElementById('search-input').addEventListener('keyup', handleInput)
  
      return () => {
        document.getElementById('search-input').removeEventListener('keyup', handleInput)
      }
    }, [handleInput])
  }

  const results = state.results.reduce((groups, item) => {
    const media = item.media_type
    if (!groups[media]) {
      groups[media] = []
    }
    groups[media].push(item)
    return groups
  }, {})

  // console.log(state)
  
  return(
    <nav className={Base.navbar(darkMode)}>
      <div className={Helpers.mergeCss(Styles.container(darkMode), Base.container)}>
        <div>
          <Link to={location.pathname !== '/' ? {pathname: `/`, state: {reset: true}} : `/`}
            className={Helpers.mergeCss(Base.dInlineFlex, Base.alignItemsCenter)}>
            <span className={Styles.tmdbLogo}>
              <b>
                TMDB
              </b>
            </span>
            <b>
              The Movie Database
            </b>
          </Link>
        </div>
        <div>
        </div>
        <div>
          {
            <div style={{position: 'relative'}} className={Helpers.mergeCss(Base.dInlineFlex, Styles.searchNavbar(location.pathname.includes('search')), Base.alignItemsCenter)}>
              <Input 
                id={'search-input'}
                value={value}
                onChange={handleInput}
                className={Styles.customInput(Object.keys(results).length > 0)}
                placeholder="Search Movies"/>
                {Object.keys(results).length > 0 &&
                  <div className={Styles.resultsSearch}>
                    {
                      Object.keys(results).map(any => {
                        return(
                          <div key={any}>
                            {results[any].filter(item => any !== 'person' ? (item.poster_path !== null) : (item.profile_path !== null)).length > 0 &&                          
                              <h4>
                                {any !== 'person' ? any : 'Actor/Actress'}
                              </h4>
                            }
                            {
                              results[any].filter(item => any !== 'person' ? (item.poster_path !== null) : (item.profile_path !== null)).map(item => {
                                const bgPath = any !== 'person' ? item.poster_path : item.profile_path
                                const path = any !== 'person' ? LANDSCAPE_IMAGE : POTRAIT
                                const content = (
                                  <>
                                  <div className={Styles.parentItem(any)}>
                                    <div>
                                      <img className={Base.imgFluid} src={IMAGE_URL + path + bgPath}/>
                                    </div>
                                  </div>
                                  <div className={Styles.wrapper}>
                                    <span className={Base.dBlock}>
                                      {any === 'movie' ? item.original_title : item.name}
                                    </span>
                                    {any === 'person' ? 
                                    <span>
                                      {item.known_for.filter(yolo => yolo.original_title).map(yolo => {
                                        return yolo.original_title
                                        }).join(', ')
                                      }
                                    </span> 
                                    :
                                    <span>
                                      {
                                        any === 'tv' ? typeof item.first_air_date !== 'undefined' &&
                                        <b>
                                          ({item.first_air_date.split('-')[0]})
                                        </b>
                                        :
                                        typeof item.release_date !== 'undefined' &&
                                        <b>
                                          ({item.release_date.split('-')[0]})
                                        </b>
                                      }
                                      {item.vote_average !== 0 &&
                                        <>
                                          <b style={{marginLeft: '3px', marginRight: '3px'}}>
                                            &bull;
                                          </b>
                                          <b className={Helpers.mergeCss(Base.dInlineFlex, Base.alignItemsCenter)}>
                                            <i style={{marginRight: '3px'}} className="la la-star"></i>
                                            {item.vote_average}
                                          </b>
                                        </>
                                      }
                                    </span>
                                    }
                                  </div>
                                  </>
                                )
                                
                                return any === 'movie' ?
                                <Link to={{pathname:`/movie/${item.id}`, state:{resetSearch: true}}} key={item.id} className={Styles.itemResult}>
                                  {content}
                                </Link>
                                :
                                <div key={item.id} className={Styles.itemResult}>
                                  {content}
                                </div>
                              }).slice(0, 3)
                            }
                          </div>
                        )
                      })
                    }
                  </div>
                }
            </div>
          }
        </div>
      </div>
    </nav>
  )
}
export default Navbar