
class Form {
  constructor (form) {
    this.form = form,
    this.formStorage
  }

  getField = (num) => {
    const outputObj = {
      field: this.form.querySelectorAll('.form_step')[num],
    }
    const input = outputObj.field.querySelector('input')
    const name = input.getAttribute('name')
    const value = this.form.elements[name].value

    return {
      ...outputObj,
      sumbit: outputObj.field.querySelector('.next'),
      name,
      value,
      input,
      pickedValueSpan: outputObj.field.querySelector('.step_picked-value span'),
      edit: outputObj.field.querySelector('.step_edit-icon')
    }
  }

  checkPostcode = (value) => {
    const regExp = /^[1-9][0-9]{3} ?(?!sa|sd|ss)[a-z]{2}$/i
    if (regExp.test(value)) return true
    else return false
  }

  isReadyToSumbit = () => {
    const valide_1 = this.checkPostcode(this.form.elements[this.getField(0).name].value)
    const valide_2 = !!this.form.elements[this.getField(1).name].value
    const valide_3 = !!this.form.elements[this.getField(2).name].value

    return valide_1 && valide_2 && valide_3
  }

  render = () => {
    this.formStorage = JSON.parse(localStorage.getItem('search_params'))

    for(let i = 0; i <= 2; i++) {

      // hide second field based on postcode fiedl status
      if (i === 1 && !this.checkPostcode(this.getField(0).value)) {
        this.getField(1).field.classList.add('hidden')
      }

      // hide last field based on previous fiedl status
      if(i === 2 && !this.getField(1).value) {
        this.getField(2).field.classList.add('hidden')
      }

      // handle local storage params
      if (this.formStorage) {
        this.form.classList.add('opened')
        const fieldName = this.getField(i).name
        const formElement = this.form.elements[fieldName]
        formElement.value = this.formStorage[fieldName]
      }


      // handle input change event
      this.getField(i).field.addEventListener('input', (e) => {

        // disable and enable form sumbit button based on the changed value
        if(this.isReadyToSumbit()) this.getField(2).sumbit.disabled = false
        else this.getField(2).sumbit.disabled = true

        const value = e.target.value
        let canNext = false

        if(this.getField(i).name === 'postcode') {
          if(this.checkPostcode(e.target.value)) {
            this.getField(i).field.classList.remove('error')
          }
          canNext = value.length >= 4

        } else if (this.getField(i).name === 'situatie') [
          canNext = !!value && this.isReadyToSumbit()
        ]
        else {
          canNext = !!value
        }

        if(canNext) {
          this.getField(i).sumbit.disabled = false
        } else {
          this.getField(i).sumbit.disabled = true
        }
      })

      // handle next buttons click
      this.getField(i).sumbit.addEventListener('click', e => {
        const fieldValue = this.getField(i).value

        if(this.getField(i).input.getAttribute('id') === 'postcode') {
          if(!this.checkPostcode(fieldValue)) {
            this.getField(i).field.classList.add('error')
          } else {
            this.getField(i).field.classList.add('passed')
            this.getField(i).pickedValueSpan.textContent = fieldValue.toUpperCase()

            this.getField(i + 1).field.classList.remove('hidden')
          }

        } else {
          this.getField(i).field.classList.add('passed')
          this.getField(i).pickedValueSpan.textContent = fieldValue

          if(i < 2) {
            this.getField(i + 1).field.classList.remove('hidden')
          }
        }

      })

      // input edit click
      this.getField(i).edit.addEventListener('click', () => {
        this.getField(i).field.classList.remove('passed')
        this.getField(i).field.classList.add('editing')
      })

    }

    localStorage.removeItem('search_params')

    //
    if(this.isReadyToSumbit()) this.getField(2).sumbit.disabled = false
    else this.getField(2).sumbit.disabled = true

    /* handle form submit */
    this.form.addEventListener('submit', e => {
      // e.preventDefault()
      this.form.classList.add('submitting')
    })
  }
}