const select = (selector, parent) => {
  if (parent) return parent.querySelector(selector)
  return document.querySelector(selector)
}

const selectAll = (selector, parent) => {
  if (parent) return parent.querySelectorAll(selector)
  return document.querySelectorAll(selector)
}

const getStyle = (element, property) => {
  const styles = getComputedStyle(element)
  const value = styles.getPropertyValue(property)
  return value.split('px').join('')
}

const toggleClass = (className, element) => {
  if(element.classList.contains(className)) {
    element.classList.remove(className)
  } else {
    element.classList.add(className)
  }
}

const scrollTop = (withAnimation) => {
  window.scrollTo({
    top: 0,
    behavior: withAnimation && 'smooth'
  })
}

const scrollBottom = (withAnimation) => {
  window.scrollTo({
    top: 10000,
    behavior: withAnimation && 'smooth'
  })
}


checkPostcode = (value) => {
  const regExp = /^[1-9][0-9]{3} ?(?!sa|sd|ss)[a-z]{2}$/i
  if (regExp.test(value)) return true
  else return false
}


window.onload = () => {
  select('.loader').classList.add('hidden')
}
