import React, {Fragment, useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Container, Input} from 'components'
import {Link, useLocation, useParams, useHistory} from 'react-router-dom'
import {Helpers, Base} from 'utils'
import { useDebounce } from 'use-debounce'
import {actions} from 'stores'
import {IMAGE_URL, POTRAIT, LANDSCAPE_IMAGE} from 'babel-dotenv'
import Styles from './styles'

const Search = () => {
  const state = useSelector(state => state.searchReducer)
  const {keyword} = useParams()
  const [term, setTerm] = useState(keyword)
  const [newTerm] = useDebounce(term, 2000)
  const [people, setPeople] = useState('')
  const [year, setYear] = useState('')

  const location = useLocation()
  const dispatch = useDispatch()
  const history = useHistory()
  const query = new URLSearchParams(location.search)
  const page = query.get('page')
  const persons = query.get('persons')
  const years = query.get('years')
  
  useEffect(() => {
    if(Helpers.checkValueNotBlank(newTerm)){
      dispatch(actions.getDataSearchPage(newTerm, {page, persons, years}))
      if(persons !== null){
        history.push(`/search/${newTerm}?page=${page}&persons=${persons}`)
      }else if(years !== null){
        history.push(`/search/${newTerm}?page=${page}&years=${years}`)
      }else if(page !== null && persons !== null){
        history.push(`/search/${newTerm}?page=${page}&persons=${persons}&years=${years}`)
      }else{
        history.push(`/search/${newTerm}?page=${page}`)
      }
    }else{
      // dispatch({type: types.RESET_DATA_MOVIE_SEARCH, state: {results: []}})
    }
    
  }, [newTerm])
  
  const searchResults = state.searchResults.reduce((groups, item) => {
    const media = item.media_type
    if (!groups[media]) {
      groups[media] = []
    }
    groups[media].push(item)
    return groups
  }, {})

  // console.log(newTerm)

  console.log(state)
  
  return(
    <Container>
      <div className={Helpers.mergeCss(Base.container, Base.marginTop5)}>
        <div className={Helpers.mergeCss(Base.row, Styles.title)}>
          <div className={Helpers.mergeCss(Base.col, Base.w12)}>
            <h1>
              Find movies, Tv shows, and more...
            </h1>
          </div>
        </div>
        <div className={Helpers.mergeCss(Base.row, Base.marginTop3, Styles.form)}>
          <div className={Helpers.mergeCss(Base.col, Base.w8)}>
            <h2 className={Base.marginBottom2}>
              Search          
            </h2>
            <Input 
              id={'search-input-page'}
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              className={Styles.customInput}
              placeholder="Search Movies"/>
          </div>
          <div className={Helpers.mergeCss(Base.col, Base.w4)}>
            <h2 className={Base.marginBottom2}>
              Filter          
            </h2>
            <div className={Helpers.mergeCss(Base.row)}>
              <div className={Helpers.mergeCss(Base.col, Base.w6)}>
                <Input
                  value={people}
                  onChange={(e) => setPeople(e.target.value)}
                  className={Styles.customInput}
                  placeholder="Actor/Actress"/>
              </div>
              <div className={Helpers.mergeCss(Base.col, Base.w6)}>
                <Input
                  type={'number'}
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className={Styles.customInput}
                  placeholder="Year"/>
              </div>
            </div>
          </div>
        </div>
        <div className={Helpers.mergeCss(Base.row, Base.marginTop3, Styles.form)}>
          <div className={Helpers.mergeCss(Base.col, Base.w12)}>
            {Object.keys(searchResults).length > 0 &&
              <div className={Styles.resultsSearch}>
              {
                Object.keys(searchResults).map(any => {
                  return(
                    <div key={any}>
                      {searchResults[any].filter(item => any !== 'person' ? (item.poster_path !== null) : (item.profile_path !== null)).length > 0 &&                          
                        <h4>
                          {any !== 'person' ? any : 'Actor/Actress'}
                        </h4>
                      }
                      {
                        searchResults[any].filter(item => any !== 'person' ? (item.poster_path !== null) : (item.profile_path !== null)).map(item => {
                          const bgPath = any !== 'person' ? item.poster_path : item.profile_path
                          const path = any !== 'person' ? LANDSCAPE_IMAGE : POTRAIT
                          const content = (
                            <>
                            <div className={Styles.parentItem(any)}>
                              <div>
                                <div>
                                  <img className={Base.imgFluid} src={IMAGE_URL + POTRAIT + bgPath}/>
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
                              </div>
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
                        })}
                      </div>
                    )
                  })
                }
              </div>
            }
          </div>
        </div>
      </div>
    </Container>
  )
}

export default Search