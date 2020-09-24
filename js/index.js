
/*******************************
  Spotlight Carousel
********************************/
const imagesCarousel = new Carousel({
  container: select('.carousel'),
  slidesWrapper: select('.carousel_slides'),
  leftArrow: select('[data-dir="left"]'),
  rightArrow: select('[data-dir="right"]'),
})

imagesCarousel.render()


