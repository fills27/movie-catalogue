import { ApiMovies, ApiSearch, ApiTv } from 'api'
import { types } from 'stores'
import {Helpers} from 'utils'

const getData = () => {
  return async(dispatch) => {
    let nowPlaying = []
    let upComing = []
    let topRated = []

    let status = ''

    try {

      const getNowPlaying = await ApiMovies.nowPlaying(1)
      const getUpComing = await ApiMovies.upComing(1)
      const getTopRated = await ApiMovies.topRated(1)

      nowPlaying = getNowPlaying.data.results
      upComing = getUpComing.data.results
      topRated = getTopRated.data.results
      status = 'success'

    } catch(e){

      status = 'error'
      console.log(e)
      // dispatch({type: types.LOAD_TOP_RATED_MOVIE_SUCCESS, state: {topRatedError: e}})
    }
    
    if(status === 'success'){
      return dispatch({
        type: types.LOAD_DATA_MOVIE_SUCCESS, 
        state: {
          nowPlaying: nowPlaying,
          upComing: upComing,
          topRated: topRated,
        }
      })
    }

    return dispatch({type: types.LOAD_DATA_MOVIE_FAILED, state: {error: status}})
  }
}

const getDataDetail = (id, existingMovieDetail) => {
  return async(dispatch) => {
    let movieDetail = null
    let status = ''
    if(existingMovieDetail === null){
      try {
        const getDetail = await ApiMovies.detail(id)
        const getKeywords = await ApiMovies.keyword(id)
        movieDetail = {...getDetail.data, keywords: getKeywords.data.keywords}
        status = 'success'
      } catch(e) {
        status = 'error'
        console.log(e)
      }
  
      if(status === 'success'){
        return dispatch({
          type: types.LOAD_DATA_MOVIE_DETAIL_SUCCESS, 
          state: {
            movieId: id,
            movieDetail,
          }
        })
      }
  
      return dispatch({type: types.LOAD_DATA_MOVIE_DETAIL_FAILED, state: {error: status}})
    }

    return dispatch({type: types.LOAD_DATA_MOVIE_DETAIL_OLD_SUCCESS, state: {movieId: id, movieDetail: existingMovieDetail}})
  }
}

const getDataSearchNavbar = (query, params) => {
  return async(dispatch) => {
    let results = []
    let status = ''
    try {
      const getDataSearch = await ApiSearch.multi(query, params.page)
      results = getDataSearch.data.results
      status = 'success'
    } catch(e) {
      status = 'error'
      console.log(e)
    }

    if(status === 'success'){
      return  dispatch({type: 
        types.LOAD_DATA_MOVIE_SEARCH_NAVBAR_SUCCESS, 
        state: {results}
      })
    }

    return dispatch({type: types.LOAD_DATA_MOVIE_SEARCH_NAVBAR_FAILED, state: {error: status}})
  }
}

const getDataSearchPage = (query, params) => {
  return async(dispatch) => {
    let searchResults = []
    let status = ''

    const persons = params.persons
    const years = params.years

    try {
      const getDataSearch = await ApiSearch.multi(query, params.page)
      const newArr = Array.from({ length: getDataSearch.data.total_pages }, (_, i) => i)
      const getAllData = await Promise.all(newArr.map(async(item) => {
        const dataSearch = await ApiSearch.multi(query, item + 1)
        const allData = []
        return await Promise.all(allData.concat(dataSearch.data.results).map(async(yolo) => {
          let credits = {}
          if(yolo.media_type === 'movie'){
            const getDataDetail = await ApiMovies.detail(yolo.id)
            credits = getDataDetail.data.credits
            return {...yolo, credits}
          }else if(yolo.media_type === 'tv'){
            const getDataDetail = await ApiTv.detail(yolo.id)
            credits = getDataDetail.data.credits
            return {...yolo, credits}
          }else{
            return {...yolo, credits}
          }
        }))
      }))

      const set = new Set()
      const mergeAll = [].concat.apply([], getAllData)
      const dataArr = mergeAll.filter((item) => {
        const duplicateId = set.has(item.id)
        set.add(item.id)
        return !duplicateId
      })

      let allData = []

      if(persons.length > 0 && years.length > 0){
        allData = dataArr.filter(any => Object.keys(any.credits).length > 0).filter(any => {
          return any.credits.cast.filter(yolo => 
            persons.filter(item => yolo.name.toLowerCase().includes(item.toLowerCase())).length > 0
          ).length > 0
        }).filter(any => Object.keys(any.credits).length > 0).filter(any => {
          if(any.media_type === 'movie' && any.release_date !== null && any.release_date !== '' && typeof any.release_date !== 'undefined'){
            return years.filter(item => any.release_date.toLowerCase().includes(item)).length > 0
          }else if(any.media_type === 'tv' && any.first_air_date !== null && any.first_air_date !== '' && typeof any.first_air_date !== 'undefined'){
            return years.filter(item => any.first_air_date.toLowerCase().includes(item)).length > 0
          }
        })
      }else if(persons.length > 0){
        allData = dataArr.filter(any => Object.keys(any.credits).length > 0).filter(any => {
          return any.credits.cast.filter(yolo => 
            persons.filter(item => yolo.name.toLowerCase().includes(item.toLowerCase())).length > 0
          ).length > 0
        })
      }else if(years.length > 0){
        allData = dataArr.filter(any => Object.keys(any.credits).length > 0).filter(any => {
          if(any.media_type === 'movie' && any.release_date !== null && any.release_date !== '' && typeof any.release_date !== 'undefined'){
            return years.filter(item => any.release_date.toLowerCase().includes(item)).length > 0
          }else if(any.media_type === 'tv' && any.first_air_date !== null && any.first_air_date !== '' && typeof any.first_air_date !== 'undefined'){
            return years.filter(item => any.first_air_date.toLowerCase().includes(item)).length > 0
          }
        })
      }else{
        allData = dataArr
      }
      searchResults = Helpers.groupArrWithRange(allData, 20)
      status = 'success'
    } catch(e){
      status = 'error'
      console.log(e)
    }

    if(status === 'success'){
      return  dispatch({type: 
        types.LOAD_DATA_MOVIE_SEARCH_SUCCESS, 
        state: {searchResults, page: params.page, actorFilter: persons, yearFilter: years, totalPage: searchResults.length}
      })
    }

    return dispatch({type: types.LOAD_DATA_MOVIE_SEARCH_FAILED, state: {error: status}})
  }
}

const getDataPerson = (query) => {
  return async(dispatch) => {
    let actorFilterOptions = []
    let status = ''
    try {
      const getDataSearch = await ApiSearch.person(query, 1)
      actorFilterOptions = getDataSearch.data.results
      status = 'success'
    } catch(e) {
      status = 'error'
      console.log(e)
    }

    if(status === 'success'){
      return  dispatch({type: 
        types.LOAD_DATA_PERSON_SEARCH_SUCCESS, 
        state: {
          actorFilterOptions
        }
      })
    }

    return dispatch({type: types.LOAD_DATA_PERSON_SEARCH_FAILED, state: {error: status}})
  }
}

const actions = {
  getData,
  getDataDetail,
  getDataSearchNavbar,
  getDataSearchPage,
  getDataPerson
}

export default actions