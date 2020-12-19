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

function groupArrWithRange(arr, range) {
  let i = 0
  let a = 1
  const data = []
  do {
    data.push(arr.slice((i++ * range), (a++ * range)))
  } while (i < Math.ceil(arr.length / range))

  return data
}

function rangeYear(start, stop, step){
  return Array.from({ length: (stop - start) / step + 1}, (_, i) => (start + (i * step)).toString())
}

export default {
  mergeCss,
  addImageProcess,
  checkValueNotBlank,
  groupArrWithRange,
  rangeYear
}