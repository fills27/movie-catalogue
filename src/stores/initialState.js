import { Search } from "../pages"

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
    error: '',
    loading: true,
  }
}

export default initialState