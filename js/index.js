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
// const form = document.querySelector('.search_form')
// const form_step_1 = form.querySelectorAll('.form_step')[0]
// const form_step_2 = form.querySelectorAll('.form_step')[1]
// const form_step_3 = form.querySelectorAll('.form_step')[2]

// // postcode input
// const postcode_input = form_step_1.querySelector('#postcode')
// const postcode_button = form_step_1.querySelector('.next')

// const activateButton = (button) => {
//   button.disabled = false
// }

// const desactivateButton = (button) => {
//   button.disabled = true
// }

// const checkPostcode = (value) => {
//   const regExp = /^[1-9][0-9]{3} ?(?!sa|sd|ss)[a-z]{2}$/i

//   if (regExp.test(value)) return true
//   else return false
// }

// const handlePostcodeInput = (e) => {
//   const value = e.target.value
//   if (value.length >= 4) {
//     activateButton(postcode_button)
//   } else {
//     desactivateButton(postcode_button)
//   }
// }

// const handlePostcodeNext = (e) => {
//   e.preventDefault()
//   if (checkPostcode(postcode_input.value)) {
//     form_step_1.classList.add('passed')
//     form_step_2.classList.remove('hidden')
//     const picked_value_element = form_step_1.querySelector(
//       '.step_picked-value span'
//     )
//     const picked_option = form_step_1.querySelector('input')
//     picked_value_element.textContent = picked_option.value.toUpperCase()
//   } else {
//     form_step_1.classList.add('error')
//   }
// }

// postcode_button.addEventListener('click', handlePostcodeNext)
// postcode_input.addEventListener('input', handlePostcodeInput)

// // second/third steps
// const second_step_options = form_step_2.querySelectorAll('input')
// const third_step_options = form_step_3.querySelectorAll('input')
// const second_step_next = form_step_2.querySelector('.next')
// const submit_button = form_step_3.querySelector('button[type=submit]')

// second_step_options.forEach((option) => {
//   option.addEventListener('click', (e) => {
//     activateButton(second_step_next)
//   })
// })

// const handleSecondNext = (e) => {
//   e.preventDefault()
//   form_step_2.classList.add('passed')
//   form_step_2.classList.remove('hidden')
//   form_step_3.classList.remove('hidden')
//   const picked_value_element = form_step_2.querySelector(
//     '.step_picked-value span'
//   )
//   const picked_option = form_step_2.querySelector(
//     'input[name="type_terrein"]:checked'
//   )
//   picked_value_element.textContent = picked_option.value
// }

// second_step_next.addEventListener('click', handleSecondNext)

// third_step_options.forEach((option) => {
//   option.addEventListener('click', () => {
//     activateButton(submit_button)
//   })
// })

// /* edit icons logic */
// const edit_icons = form.querySelectorAll('.step_edit-icon')
// edit_icons.forEach((icon) => {
//   icon.addEventListener('click', (e) => {
//     e.target.closest('.form_step').classList.remove('passed')
//   })
// })

// /**************
// Previous Search Params
// **************/
// const search_params = JSON.parse(localStorage.getItem('search_params'))

// if (search_params && search_params.postcode) {
//   form.classList.add('opened')
//   postcode_input.value = search_params['postcode']
//   const chosen_option_2 = form_step_2.querySelector(
//     `input[type='radio'][value='${search_params['type_terrein']}']`
//   )
//   const chosen_option_3 = form_step_3.querySelector(
//     `input[type='radio'][value='${search_params['situatie']}']`
//   )

//   chosen_option_2.checked = true
//   chosen_option_3.checked = true
//   submit_button.disabled = false

//   localStorage.removeItem('search_params')

//   postcode_input.addEventListener('input', () => {
//     if (checkPostcode(postcode_input.value)) {
//       activateButton(submit_button)
//     } else {
//       desactivateButton(submit_button)
//     }
//   })
// }
