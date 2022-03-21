import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import thunk from 'redux-thunk'

const reducer = combineReducers({
  anecdote: anecdoteReducer,
  notification: notificationReducer,
})

const store = createStore(
  reducer,
  composeWithDevTools(),
  applyMiddleware(thunk)
)

export default store
