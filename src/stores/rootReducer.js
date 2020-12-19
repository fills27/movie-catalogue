import { combineReducers } from 'redux'
import { types } from 'stores'
import initialState from './initialState'

const initialReducer = (state = initialState.home, action) => {
  switch(action.type) {
    case types.LOAD_DATA_MOVIE_SUCCESS:
      return {...state, ...action.state, loading: false}
    case types.LOAD_DATA_MOVIE_FAILED:
      return {...state, ...action.state, loading: false}
    default: 
      return state
  }
}

const detailReducer = (state = initialState.detail, action) => {
  switch(action.type) {
    case types.LOAD_DATA_MOVIE_DETAIL_SUCCESS:
      return {...state, ...action.state, 
        movieDetailOpened: state.movieDetailOpened.concat(action.state.movieDetail), 
        loading: false
      }
    case types.LOAD_DATA_MOVIE_DETAIL_OLD_SUCCESS:
      return {...state, ...action.state, loading: false}
    case types.LOAD_DATA_MOVIE_DETAIL_FAILED:
      return {...state, ...action.state, loading: false}
    default: 
      return state
  }
}

const searchNavbarReducer = (state = initialState.searchNavbar, action) => {
  switch(action.type) {
    case types.LOAD_DATA_MOVIE_SEARCH_NAVBAR_SUCCESS:
      return {...state, ...action.state, loading: false}
    case types.RESET_DATA_MOVIE_SEARCH_NAVBAR:
      return {...state, ...action.state}
    case types.LOAD_DATA_MOVIE_SEARCH_NAVBAR_FAILED:
      return {...state, ...action.state, loading: false}
    default: 
      return state
  }
}

const searchReducer = (state = initialState.search, action) => {
  switch(action.type) {
    case types.LOAD_DATA_MOVIE_SEARCH_SUCCESS:
      return {...state, ...action.state, loading: false}
    case types.RESET_DATA_MOVIE_SEARCH:
      return {...state, ...action.state, loading: false}
    case types.LOAD_DATA_MOVIE_SEARCH_FAILED:
      return {...state, ...action.state, loading: false}
    case types.LOAD_DATA_PERSON_SEARCH_SUCCESS:
      return {...state, ...action.state, loading: false}
    case types.LOAD_DATA_PERSON_SEARCH_FAILED:
      return {...state, ...action.state, loading: false}
    case types.RESET_DATA_PERSON_SEARCH:
      return {...state, ...action.state, loading: false}
    case types.CHANGE_PAGE_TO:
      return {...state, ...action.state, loading: false}
    default: 
      return state
  }
}

export default combineReducers({
  initialReducer, 
  detailReducer,
  searchNavbarReducer,
  searchReducer
})
