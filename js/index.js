
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

const form = select('.search_form')
let formStorage

const getField = (num) => {
  const outputObj = {
    field: form.querySelectorAll('.form_step')[num],
  }
  const input = outputObj.field.querySelector('input')
  const name = input.getAttribute('name')
  const value = form.elements[name].value

  return {
    ...outputObj,
    submit: outputObj.field.querySelector('.next'),
    name,
    value,
    input,
    pickedValueSpan: outputObj.field.querySelector('.step_picked-value span'),
    edit: outputObj.field.querySelector('.step_edit-icon')
  }
}

let currentField = getField(0)


const checkPostcode = (value) => {
  const regExp = /^[1-9][0-9]{3} ?(?!sa|sd|ss)[a-z]{2}$/i
  if (regExp.test(value)) return true
  else return false
}

const isReadyToSubmit = () => {
  const valide_1 = checkPostcode(form.elements[getField(0).name].value)
  const valide_2 = !!form.elements[getField(1).name].value
  const valide_3 = !!form.elements[getField(2).name].value

  return valide_1 && valide_2 && valide_3
}



formStorage = JSON.parse(localStorage.getItem('search_params'))

for(let i = 0; i <= 2; i++) {

  // hide second field based on postcode fiedl status
  if (i === 1 && !checkPostcode(getField(0).value)) {
    getField(1).field.classList.add('hidden')
  }

  // hide last field based on previous fiedl status
  if(i === 2 && !getField(1).value) {
    getField(2).field.classList.add('hidden')
  }

  // handle local storage params
  if (formStorage) {
    form.classList.add('opened')
    const fieldName = getField(i).name
    const formElement = form.elements[fieldName]
    formElement.value = formStorage[fieldName]
  }


  // handle input change event
  getField(i).field.addEventListener('input', (e) => {
    // set current edited field
    currentField = getField(i)

    // disable and enable form sumbit button based on the changed value
    if(isReadyToSubmit()) getField(2).submit.disabled = false
    else getField(2).submit.disabled = true

    const value = e.target.value
    let canNext = false

    if(getField(i).name === 'postcode') {
      if(checkPostcode(e.target.value)) {
        getField(i).field.classList.remove('error')
      }
      canNext = value.length >= 4

    } else if (getField(i).name === 'situatie') [
      canNext = !!value && isReadyToSubmit()
    ]
    else {
      canNext = !!value
    }

    if(canNext) {
      getField(i).submit.disabled = false
    } else {
      getField(i).submit.disabled = true
    }
  })

  // handle next buttons click
  getField(i).submit.addEventListener('click', e => {
    const fieldValue = getField(i).value

    if(getField(i).input.getAttribute('id') === 'postcode') {
      if(!checkPostcode(fieldValue)) {
        getField(i).field.classList.add('error')
      } else {
        getField(i).field.classList.add('passed')
        getField(i).pickedValueSpan.textContent = fieldValue.toUpperCase()

        getField(i + 1).field.classList.remove('hidden')

        // scroll to element
        getField(i + 1).field.scrollIntoView({
          behavior: "smooth",
          block: "center"
        })
      }

    } else {
      getField(i).field.classList.add('passed')
      getField(i).pickedValueSpan.textContent = fieldValue

      if(i < 2) {
        getField(i + 1).field.classList.remove('hidden')

        // scroll to element
        getField(i + 1).field.scrollIntoView({
          behavior: "smooth",
          block: "center"
        })
      }
    }

  })

  // input edit click
  getField(i).edit.addEventListener('click', () => {
    getField(i).field.classList.remove('passed')
    getField(i).field.classList.add('editing')
  })

}

localStorage.removeItem('search_params')

//
if(isReadyToSubmit()) getField(2).submit.disabled = false
else getField(2).submit.disabled = true


/* handle form submit */
form.addEventListener('keypress', e => {
  if(e.keyCode === 13) {
    currentField.submit.dispatchEvent(new Event('click'))
  }
})

/* handle form submit */
form.addEventListener('submit', e => {
  form.classList.add('submitting')
})
