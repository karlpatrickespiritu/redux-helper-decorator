
const socketResponseHandlerList = [];
const SUCCESS_CODE = 200;

export const getSocketResponseHandlerList = () => socketResponseHandlerList;

const createSocketResponseHandler = (action, method) => {
  return ({ store, response }) => {
    const { m: message, v: data } = response;
    if (message !== `on${method}`) 
      return;
    const isSuccess = data.code === SUCCESS_CODE;
    const type = `${action.toUpperCase()}_${isSuccess? 'SUCCESS' : 'FAIL'}`
    store.dispatch({
      type,
      data
    })
  }
}

export const emitAction = (action, passPayloadToDispatch) => {
  return (target, name, descriptor) => {
    const original = descriptor.value;
    descriptor.value = (...args) => {

      return (dispatch, getState, { emit }) => {
        const payload = original(...args);
        dispatch({
          type: action.toUpperCase(),
          data: passPayloadToDispatch? payload.v : null
        })
        socketResponseHandlerList.push(createSocketResponseHandler(action, payload.m));
        emit({payload});
      }

    }
    return descriptor;
  }
}