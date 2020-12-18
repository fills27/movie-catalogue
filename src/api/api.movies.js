import base from './api.base'
import { API_KEY } from 'babel-dotenv'

const topRated = (page) => base.get(`/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`)
const upComing = (page) => base.get(`/movie/upcoming?api_key=${API_KEY}&language=en-US&page=${page}`)
const nowPlaying = (page) => base.get(`/movie/now_playing?api_key=${API_KEY}&language=en-US&page=${page}`)
const detail = (id) => base.get(`/movie/${id}?api_key=${API_KEY}&language=en-US&append_to_response=credits`)
const keyword = (id) => base.get(`/movie/${id}/keywords?api_key=${API_KEY}`)

const ApiMovies = {
  topRated,
  upComing,
  nowPlaying,
  detail,
  keyword
}

export default ApiMovies
