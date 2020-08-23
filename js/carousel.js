const Carousel = function ({
  container,
  slidesWrapper,
  leftArrow,
  rightArrow,
}) {
  this.container = container
  this.slidesWrapper = slidesWrapper
  this.leftArrow = leftArrow
  this.rightArrow = rightArrow
  this.lastSlide = this.slidesWrapper.lastElementChild
  this.firstSlide = this.slidesWrapper.firstElementChild
  this.slidesCount = this.slidesWrapper.childElementCount

  this.slideWidth = getStyle(this.container, 'width')
  this.currentWrapperRight = getStyle(this.slidesWrapper, 'right')
  this.slideFrom
  this.canSlide = true // to prevent sliding while sliding
  this.currentSlide = 0

  this.slideCarousel = (dir, withTransition) => {
    this.slideFrom = dir
    const dirSign = dir === 'left' ? -1 : 1
    this.currentSlide += dirSign
    const newcurrentWrapperRight =
      +this.currentWrapperRight + +this.slideWidth * dirSign

    if (withTransition) {
      this.slidesWrapper.style.transition = 'all 0.2s ease-in-out'
    }

    this.slidesWrapper.style.right = newcurrentWrapperRight + 'px'
    this.currentWrapperRight = newcurrentWrapperRight
  }

  // when transition end
  this.handleTransitionEnd = () => {
    this.canSlide = true
    this.slidesWrapper.style.transition = 'none'

    if (this.currentSlide === this.slidesCount + 1) {
      this.slidesWrapper.style.right = this.slideWidth + 'px'
      this.currentWrapperRight = this.slideWidth
      this.currentSlide = 1
    } else if (this.currentSlide === 0) {
      const distance = this.slidesCount * this.slideWidth
      this.slidesWrapper.style.right = distance + 'px'
      this.currentWrapperRight = distance
      this.currentSlide = this.slidesCount
    }
  }

  // Rendr method
  this.render = () => {
    this.slidesWrapper.prepend(this.lastSlide.cloneNode(true))
    this.slidesWrapper.append(this.firstSlide.cloneNode(true))
    this.slideCarousel('right')

    leftArrow.addEventListener('click', (e) => {
      if (this.canSlide) {
        this.slideCarousel('left', true)
      }
    })

    rightArrow.addEventListener('click', (e) => {
      if (this.canSlide) {
        this.slideCarousel('right', true)
      }
    })

    this.slidesWrapper.addEventListener('transitionend', this.handleTransitionEnd)
    this.slidesWrapper.addEventListener('transitionstart', () => {
      this.canSlide = false
    })

    window.addEventListener('resize', () => {
      this.slideWidth = getStyle(this.container, 'width')
      this.currentWrapperRight = this.slideWidth * this.currentSlide
      this.slidesWrapper.style.right =
        this.slideWidth * this.currentSlide + 'px'
    })
  }
}
