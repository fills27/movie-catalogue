import {Helpers} from 'utils'
const currentYear = (new Date()).getFullYear()

const initialState = {
  home: {
    nowPlaying: [],
    upComing: [],
    topRated: [],
    error: '',
    loading: true,
  },
  detail: {
    error: '',
    loading: true,
    movieDetail: null,
    movieId: '',
    movieDetailOpened: []
  },
  searchNavbar: {
    results: [],
    error: '',
    loading: true,
  },
  search:{
    searchResults: [],
    actorFilter: [],
    yearFilter: [],
    totalPage : 0,
    actorFilterOptions: [],
    yearFilterOptions: Helpers.rangeYear(currentYear, currentYear - 120, -1),
    page: 1,
    error: '',
    loading: true,
  }
}

export default initialState