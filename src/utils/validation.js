/* eslint-disable */
const letter = /[a-zA-Z]/;
const number = /[0-9]/;

function emailPattern(value){
  const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  if (pattern.test(String(value).toLowerCase())) {
    return true
  }
  return false
}

function usernamePattern(value){
  const pattern = /^[a-zA-Z0-9_]{5,}[a-zA-Z]+[0-9]*$/
  if (pattern.test(String(value).toLowerCase())) {
    return true
  }
  return false
}

function passwordPattern(value){
  if(!(value.length < 4 || !letter.test(value) || !number.test(value))){
    return true
  }
  return false
}

export default {
  emailPattern,
  usernamePattern,
  passwordPattern,
}
