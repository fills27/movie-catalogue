import React, {Fragment, useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Container, Input} from 'components'
import {Link, useLocation, useParams, useHistory} from 'react-router-dom'
import {Helpers, Base} from 'utils'
import { useDebounce } from 'use-debounce'
import {actions, types} from 'stores'
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

  const newPersons = persons === null ? [] : persons.split(',')
  const newYears = years === null ? [] : years.split(',')

  const handleInput = (e) => {
    const {value} = e.target
    if(Helpers.checkValueNotBlank(value)){
      dispatch(actions.getDataPerson(value))
    }else{
      dispatch({type: types.RESET_DATA_PERSON_SEARCH, state: {actorFilterOptions: []}})
    }
    
    setPeople(value)
  }

  useEffect(() => {
    if(Helpers.checkValueNotBlank(newTerm)){
      pushUrl(actions.getDataSearchPage(newTerm, {page, persons: newPersons, years: newYears}), {page, persons, years})
    }else{
      dispatch({type: types.RESET_DATA_MOVIE_SEARCH, state: {searchResults: [], totalPage: 0}})
    }

    document.getElementById('search-input-people').addEventListener('keyup', handleInput)

    return () => {
      document.getElementById('search-input-people').removeEventListener('keyup', handleInput)
    }
  }, [newTerm])
  
  const searchResults = typeof state.searchResults[state.page - 1] !== 'undefined' ? 
    state.searchResults[state.page - 1].reduce((groups, item) => {
      const media = item.media_type
      if (!groups[media]) {
        groups[media] = []
      }
      groups[media].push(item)
      return groups
    }, {}) : []

  const clearFilter = (value, type) => () => {
    const typeDataArr = type === 'persons' ? newPersons.filter(any => any !== value) : 
    newYears.filter(any => any !== value)
    const typeDataStr = typeDataArr.map(any => any).join(',') === '' ? null : typeDataArr.map(any => any).join(',')
    const typeAction = type === 'persons' ? {page, persons: typeDataArr, years: newYears} : 
      {page, persons: newPersons, years: typeDataArr}
    const params = type === 'persons' ? {page, persons: typeDataStr, years} : {page, persons, years: typeDataStr}
    pushUrl(actions.getDataSearchPage(newTerm, typeAction), params)
  }

  const addFilter = (value, type) => () => {
    const typeDataArr = type === 'persons' ? 
    newPersons.filter(any => any === value.toString().toLowerCase()).length > 0 ? newPersons : newPersons.concat(value.toString().toLowerCase()) : 
    newYears.filter(any => any === value.toString().toLowerCase()).length > 0 ? newYears :  newYears.concat(value.toString().toLowerCase())
    const typeDataStr = typeDataArr.map(any => any).join(',') === '' ? null : typeDataArr.map(any => any).join(',')
    debugger
    const typeAction = type === 'persons' ? {page, persons: typeDataArr, years: newYears} : 
      {page, persons: newPersons, years: typeDataArr}
    const params = type === 'persons' ? {page, persons: typeDataStr, years} : {page, persons, years: typeDataStr}
    pushUrl(actions.getDataSearchPage(newTerm, typeAction), params)
    dispatch({type: types.RESET_DATA_PERSON_SEARCH, state: {actorFilterOptions: []}})

    if(type === 'persons'){
      setPeople('')
    }else{
      setYear('')
    }
  }
  
  const pushUrl = (newActions, params) => {

    dispatch(newActions)

    if(params.persons !== null && params.years !== null){
      history.push(`/search/${term}?page=${params.page}&persons=${params.persons}&years=${params.years}`)
    }else if(params.years !== null){
      history.push(`/search/${term}?page=${params.page}&years=${params.years}`)
    }else if(params.persons !== null){
      history.push(`/search/${term}?page=${params.page}&persons=${params.persons}`)
    }else{
      history.push(`/search/${term}?page=${params.page}`)
    }
  }

  const changePageTo = (thepage) => () => {
    pushUrl({type: types.CHANGE_PAGE_TO, state: {page: thepage.toString()}}, {page: thepage, persons, years})
  }

  // console.log(newTerm)
  const pagination = Array.from({ length: state.totalPage }, (_, i) => i)
  
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
          <div className={Helpers.mergeCss(Base.col, Base.w7)}>
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
          <div className={Helpers.mergeCss(Base.col, Base.w5)}>
            <h2 className={Base.marginBottom2}>
              Filter          
            </h2>
            <div className={Helpers.mergeCss(Base.row)}>
              <div className={Helpers.mergeCss(Base.col, Base.w7)}>
                <div className={Styles.inputPeople}>
                  <Input
                    id={'search-input-people'}
                    value={people}
                    onChange={handleInput}
                    className={Styles.customInputPeople(
                        state.actorFilterOptions.filter(any => any.profile_path !== null)
                        .filter(any => !newPersons.includes(any.name.toLowerCase())).length > 0
                      )}
                    placeholder="Actor/Actress"/>
                    {
                      state.actorFilterOptions.filter(any => any.profile_path !== null)
                      .filter(any => !newPersons.includes(any.name.toLowerCase())).length > 0 && 
                      (
                        <div className={Styles.resultPeople}>
                          {state.actorFilterOptions.filter(any => any.profile_path !== null)
                            .filter(any => !newPersons.includes(any.name.toLowerCase()))
                            .map(any => {
                            return(
                              <div onClick={addFilter(any.name, 'persons')} key={any.id} className={Styles.actorItem}>
                                <img src={IMAGE_URL + POTRAIT + any.profile_path}/>
                                <div>
                                  <b>{any.name}</b>
                                  <span>
                                    {any.known_for_department}
                                  </span>
                                </div>
                              </div>
                            )
                          }).slice(0, 5)}
                        </div>
                      )
                    }
                </div>
              </div>
              <div className={Helpers.mergeCss(Base.col, Base.w5)}>
                <div className={Styles.inputPeople}>
                  <Input
                    id={'search-input-year'}
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className={Styles.customInputYear(
                      state.yearFilterOptions.filter(any => any.includes(year)).length > 0 
                      && (year !== '')
                    )}
                    placeholder="Year"/>
                    {
                      state.yearFilterOptions.filter(any => any.includes(year)).length > 0 && 
                      (year !== '') &&
                      <div className={Styles.resultYear}>
                        {
                          state.yearFilterOptions.filter(any => any.includes(year)).map(any => {
                            return(
                              <div onClick={addFilter(any, 'years')} key={any} 
                                className={Styles.actorItem}>
                                <div>
                                  <b>{any}</b>
                                </div>
                              </div>
                            )
                          }).slice(0, 10)
                        }
                      </div>
                    }
                  </div>
              </div>
            </div>
          </div>
        </div>
        <div className={Helpers.mergeCss(Base.row, Base.marginTop3, Styles.form)}>
          <div className={Helpers.mergeCss(Base.col, Base.w12)}>
            <div className={Base.row}>
              <div className={Helpers.mergeCss(Base.col, Base.w12)}>
                {
                  state.actorFilter.length > 0 &&
                  <>
                  <h5 className={Base.dInlineBlock}>
                    Filter by actor/actress
                  </h5>
                  {
                    state.actorFilter.map(item => {
                      return <span key={item} className={Styles.filter}>
                        {item}
                        <b onClick={clearFilter(item, 'persons')}>
                          <i className="la la-times"></i>
                        </b>
                      </span>
                    })
                  }
                  </>
                }
                {
                  state.yearFilter.length > 0 &&
                  <>
                  <h5 className={Base.dInlineBlock}>
                    Filter by year
                  </h5>
                  {
                    state.yearFilter.map(item => {
                      return <span key={item} className={Styles.filter}>
                        {item}
                        <b onClick={clearFilter(item, 'years')}>
                          <i className="la la-times"></i>
                        </b>
                      </span>
                    })
                  }
                  </>
                }
              </div>
              {
                pagination.length > 1 && (
                <div className={Helpers.mergeCss(Base.col, Base.marginBottom4, Base.w12)}>
                  <h6 className={Base.dInlineBlock}>
                    Page
                  </h6>
                  {pagination.map(any =>{
                    const thepage = any + 1
                    return(
                      <span onClick={changePageTo(thepage)} key={thepage} className={Styles.pagination(thepage.toString() === state.page)}>
                        {thepage}
                      </span>
                    )
                  })}
                </div>
                ) 
              }
              
            </div>
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