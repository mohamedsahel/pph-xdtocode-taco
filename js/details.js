/***************
  Render the Measure details
****************/
const layout = select('.layout')
const hero = select('.hero')
const contentWrapper = select('.content')
const contentWrapperChildren = selectAll('.content > *')
const mainContent = select('.main_content')
const measuresLinks = selectAll('.content_measure_link')
const contentDetails = select('.content_details')
const subContentDetailsList = selectAll(
  '.content_measure_details',
  contentDetails
)

// hide all content details after page loading
const hideAll = (list) => {
  list.forEach((subContent) => (subContent.hidden = true))
}
const showAll = (list) => {
  list.forEach((subContent) => (subContent.hidden = false))
}

hideAll(subContentDetailsList)

measuresLinks.forEach((link) => {
  const sectionDetailsId = link.getAttribute('href')
  link.addEventListener('click', (e) => {
    e.preventDefault()

    // hide all content details
    hideAll(subContentDetailsList)

    // change the style of list items
    if (link.classList.contains('current')) return
    measuresLinks.forEach((link) => {
      link.classList.remove('current')
    })
    link.classList.add('current')

    // change image position
    const goBackBtn = select('.go-back', contentDetails)
    const subContentDetails = select(sectionDetailsId, contentDetails)
    const measuresList = select('.content_measures-list')
    const mainImage = select('.content_measure_image', subContentDetails)
    mainImage.hidden = false
    const clonedMainImage = mainImage.cloneNode(true)

    // handle go back button click
    goBackBtn.onclick = () => {
      contentWrapperChildren.forEach((el) => {
        contentWrapper.appendChild(el)
        contentWrapper.classList.remove('full')
      })
      mainContent.appendChild(contentDetails)
      hideAll(subContentDetailsList)
      goBackBtn.hidden = true
      link.classList.remove('current')
      if (measuresList.lastChild.nodeName === 'IMG') {
        measuresList.removeChild(measuresList.lastChild)
      }
      hero.style = ''
    }

    const handleMediaMatch = () => {
      if (!link.classList.contains('current')) return
      if (!subContentDetails) return

      contentWrapper.classList.add('full')
      contentWrapper.textContent = ''
      contentWrapper.appendChild(contentDetails)
      hideAll(subContentDetailsList)
      subContentDetails.hidden = false
      goBackBtn.hidden = false
      mainImage.hidden = false

      scrollTop()
    }

    const handleMediaNotMatch = () => {
      if (!link.classList.contains('current')) return
      if (measuresList.lastChild.nodeName === 'IMG') {
        measuresList.removeChild(measuresList.lastChild)
      }
      contentWrapper.classList.remove('full')

      contentWrapperChildren.forEach((el) => {
        contentWrapper.appendChild(el)
        contentWrapper.classList.remove('full')
      })

      mainContent.appendChild(contentDetails)
      hideAll(subContentDetailsList)
      subContentDetails.hidden = false
      goBackBtn.hidden = true

      if (!subContentDetails) return
      mainImage.hidden = true
      measuresList.appendChild(clonedMainImage)
      detailsOpened = true
    }

    const handleMedia = (x) => {
      if (x.matches) handleMediaMatch()
      else handleMediaNotMatch()
    }
    let media = window.matchMedia('(max-width: 1024px)')
    handleMedia(media)
    media.addListener(handleMedia)
  })
})


/***************
table section
***************/
const togglerOptions = selectAll('.toggler_option')
const optionsFilter = select('.options-filter')

togglerOptions.forEach((option) => {
  if (option.checked && option.getAttribute('id') === 'simple') {
    optionsFilter.hidden = true
  }

  option.addEventListener('click', (e) => {
    if (e.target.getAttribute('id') === 'simple') {
      optionsFilter.hidden = true
    } else {
      optionsFilter.hidden = false
    }
  })
})

/* dropdown */
const dropdownsButtons = selectAll('.dropdown_button')
const dropdownItems = selectAll('.dropdown_item')

dropdownsButtons.forEach((button) => {
  const dropdown = button.closest('.dropdown')
  button.onclick = () => {
    toggleClass('opened', dropdown)
  }
})

dropdownItems.forEach((item) => {
  const dropdown = item.closest('.dropdown')
  item.onclick = () => {
    select('.dropdown_picked-option', dropdown).textContent = item.textContent
    toggleClass('opened', dropdown)
  }
})
