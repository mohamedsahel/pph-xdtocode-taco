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


/*******************************
  Search Form
********************************/
const searchForm = new Form(select('.search_form'))
searchForm.render()
