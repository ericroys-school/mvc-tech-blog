/**
 * convenience funtion to get element by id
 * @param String id - a dom element id
 * @returns - dom element
 */
export function getElement(id) {
  if (!id) throw "Missing an id";
  return document.getElementById(id);
}

/**
 * convenience function to get value of an element
 * @param String id - id of dom input element
 * @returns value of input
 */
export function getValue(id) {
  if (!id) throw "Missing an id";
  return getElement(id).value;
}

/**
 * 
 * @param String id element id
 * @param String attr - name of the attribute to retrieve
 * @returns 
 */
export function getAttr(id, attr){
  if(!id || !attr) throw "Id and attr are required"
  let e = getElement(id);
  return e.getAttribute(attr)
}

function setText(msg, style){
  console.log(JSON.stringify(msg))
  let err = getElement('error-msg');
  err.innerHTML = msg;
  err.setAttribute('class', style);
}
export function setError(msg){
  setText(msg, "alert alert-danger");    
}

export function setMessage(msg){
  setText(msg, "alert alert-light");
}

export function resetError(){
  let err = getElement('error-msg');
  err.innerHTML = "";
  err.removeAttribute('class');
}
