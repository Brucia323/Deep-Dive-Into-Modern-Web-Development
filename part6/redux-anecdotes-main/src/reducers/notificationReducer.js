const notificationAtStart = null

const initialState = notificationAtStart

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'vote':
      state = `you voted '${action.data}'`
      break
    case 'hide':
      state = null
      break
    case 'create':
      state = action.data
      break
    default:
      break
  }
  return state
}

export const voteNotification = content => {
  return {
    type: 'vote',
    data: content,
  }
}

export const createNotification = notification => {
  return {
    type: 'create',
    data: notification,
  }
}

export const hideNotification = () => {
  return {
    type: 'hide',
  }
}

export default notificationReducer
