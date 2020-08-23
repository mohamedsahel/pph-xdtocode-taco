const select = (selector, parent) => {
  if (parent) return parent.querySelector(selector)
  return document.querySelector(selector)
}

const selectAll = (selector, parent) => {
  if (parent) return parent.querySelectorAll(selector)
  return document.querySelectorAll(selector)
}

const getStyle = (element, property) => {
  const carouselStyles = getComputedStyle(element)
  const carouselWidth = carouselStyles.getPropertyValue(property)
  return carouselWidth.split('px').join('')
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

window.onload = () => {
  select('.loader').classList.add('hidden')
}