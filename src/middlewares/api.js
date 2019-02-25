export default (store) => (next) => (action) => {
  const { callAPI, payload, method } = action
  if (!callAPI) 
    return next(action)
  if (!method || method === 'get')
    fetch(callAPI)
      .then((res) => res.json())
      .then((response) => next({ ...action, response }))
  else{
    let xhr = new XMLHttpRequest();
    if (payload.id)
      xhr.open(method, callAPI+'/'+payload.id, true)
    else
      xhr.open(method, callAPI) 
    xhr.setRequestHeader('Content-Type', 'application/json;charset=utf-8');
    xhr.onreadystatechange = function() {
      if (xhr.readyState !== 4) 
        return;
      if (xhr.status !== 200) {
        console.log( xhr.status + ': ' + xhr.statusText + '('+xhr.errors+')');
      } else {
        if (method === 'post')
          payload.id = JSON.parse(xhr.response).id;
        return next(action);
      }
    }
    xhr.send(JSON.stringify(payload))
  }
}