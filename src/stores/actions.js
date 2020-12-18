import { ApiMovies, ApiSearch } from 'api'
import { types } from 'stores'

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
    try {
      const getDataSearch = await ApiSearch.multi(query, params.page)
      searchResults = getDataSearch.data.results
      const newArr = Array.from({ length: getDataSearch.data.total_pages }, (_, i) => i)
      const getAllData = await Promise.all(newArr.map(async(item) => {
        const dataSearch = await ApiSearch.multi(query, item + 1)
        const allData = []
        return allData.concat(dataSearch.data.results)
      }))
      const combineAllData = [].concat.apply([], getAllData)
      status = 'success'
    } catch(e){
      status = 'error'
      console.log(e)
    }

    if(status === 'success'){
      return  dispatch({type: 
        types.LOAD_DATA_MOVIE_SEARCH_SUCCESS, 
        state: {searchResults}
      })
    }

    return dispatch({type: types.LOAD_DATA_MOVIE_SEARCH_FAILED, state: {error: status}})
  }
}

const actions = {
  getData,
  getDataDetail,
  getDataSearchNavbar,
  getDataSearchPage
}

export default actions