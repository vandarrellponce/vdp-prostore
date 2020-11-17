const appReducer = (state = { appConfig: {} }, action) => {
  switch (action.type) {
    case 'APPCONFIG_GET_SUCCESS': {
      const appConfig = action.payload

      return {
        ...state,
        appConfig
      }
    }

    default:
      return state
  }
}

export default appReducer
