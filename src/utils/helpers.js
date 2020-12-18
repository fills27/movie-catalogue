import { css } from '@emotion/css'

function mergeCss(...options) {
  return css`
    ${options.map(option => option)}
  `
}

function checkValueNotBlank(value, text) {
  let isValid
  if(/^\s*$/.test(value)){
    isValid = false
  } else if (/^\d+$/.test(value)) {
    isValid = value > 0
  } else if (/^\s+$/.test(value)) {
    isValid = value.length > 0
  }  else {
    isValid = !!value
  }

  return isValid
}

function addImageProcess(src){
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.onload = () => resolve(image)
    image.onerror = reject
    image.src = src
  })
}

export default {
  mergeCss,
  addImageProcess,
  checkValueNotBlank
}