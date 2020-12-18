import { createStore, applyMiddleware, compose } from 'redux'
import { reducers } from 'stores'
import thunk from 'redux-thunk'
const middleware = [thunk]

const store = createStore(
  reducers,
  compose(applyMiddleware(...middleware))
)

export default store
