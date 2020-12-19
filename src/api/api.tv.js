import base from './api.base'
import { API_KEY } from 'babel-dotenv'

const detail = (id) => base.get(`/tv/${id}?api_key=${API_KEY}&language=en-US&append_to_response=credits`)

const ApiTv = {
  detail,
}

export default ApiTv
