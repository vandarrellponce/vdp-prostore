import Axios from 'axios'

const getAppConfig = () => async (dispatch, getState) => {
  try {
    const appConfig = (await Axios.get(`/api/appconfig/`)).data

    // DISPATCH AND SAVE TO LOCAL STORAGE
    dispatch({ type: 'APPCONFIG_GET_SUCCESS', payload: appConfig })
  } catch (error) {
    console.log(error)
  }
}

export default getAppConfig
