import axios from 'axios'
import { API_URL } from 'babel-dotenv'

const base = axios.create({baseURL: API_URL})

export default base
