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

/* table */
const table = select('table.species-table')
const months = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D']

// render the table top header
function renderTableHeader() {
  // table top
  const tableTop = document.createElement('tr')
  const Kleur = document.createElement('th')
  Kleur.setAttribute('colspan', '2')
  Kleur.classList.add('right')
  Kleur.textContent = 'Kleur'

  const Bloeiperiode = document.createElement('th')
  Bloeiperiode.textContent = 'Bloeiperiode'

  tableTop.appendChild(Kleur)
  tableTop.appendChild(Bloeiperiode)

  table.appendChild(tableTop)


  // table monthes
  const tableMonths = document.createElement('tr')

  const emptyCol = document.createElement('td')
  emptyCol.setAttribute('colspan', '2')

  const monthsCol = document.createElement('td')
  const monthsDiv = document.createElement('div')
  monthsDiv.classList.add('months')

  months.forEach(month => {
    const monthBox = document.createElement('span')
    monthBox.classList.add('month-box')
    monthBox.classList.add('letter')
    monthBox.textContent = month

    monthsDiv.appendChild(monthBox)
  })

  monthsCol.appendChild(monthsDiv)

  tableMonths.appendChild(emptyCol)
  tableMonths.appendChild(monthsCol)

  table.appendChild(tableMonths)
}
renderTableHeader()

// render table function based on params
function renderTableData(params) {
  const pre = select(`.table-data[data-table="${params}"]`)
  const tableArray = JSON.parse(pre.textContent)

  // remove old table content
  table.textContent = ''

  tableArray.forEach(obj => {
    const specieRow = document.createElement('tr')
    // specie link column
    const specieLinkCol = document.createElement('td')
    const specieLink = document.createElement('a')
    specieLink.setAttribute('href', obj.link)
    specieLink.textContent = obj.specie

    specieLinkCol.appendChild(specieLink)

    // specie color box
    const colorCol = document.createElement('td')
    const colorBox = document.createElement('span')
    colorBox.classList.add('specie_color-box')
    colorBox.style = `background-color: ${obj.color}`

    colorCol.appendChild(colorBox)

    // species months
    const monthsCol = document.createElement('td')
    const monthsDiv = document.createElement('div')
    monthsDiv.classList.add('months')
    months.forEach(month => {
      const monthBox = document.createElement('span')
      monthBox.classList.add('month-box')

      monthsDiv.appendChild(monthBox)
    })

    const monthBoxes = selectAll('span.month-box', monthsDiv)

    obj.months.forEach(month => {
      monthBoxes[month - 1].classList.add('filled')
    })

    monthsCol.appendChild(monthsDiv)


    // append children to specie
    specieRow.appendChild(specieLinkCol)
    specieRow.appendChild(colorCol)
    specieRow.appendChild(monthsCol)

    table.appendChild(specieRow)
  })
}
renderTableData('1')

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

    renderTableData(item.getAttribute('data-table'))
  }
})
