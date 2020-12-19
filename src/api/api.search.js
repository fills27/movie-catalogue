import base from './api.base'
import { API_KEY } from 'babel-dotenv'

const multi = (query, page) => base.get(`/search/multi?api_key=${API_KEY}&query=${query}&language=en-US&append_to_response=credits&page=${page}&include_adult=false`)
const person = (query, page) => base.get(`/search/person?api_key=${API_KEY}&query=${query}&language=en-US`)

const ApiSearch = {
  multi,
  person,
}

export default ApiSearch