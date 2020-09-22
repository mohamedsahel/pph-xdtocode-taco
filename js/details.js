
function getMeasureContent(_fgr, _infopagina, _titel) {
  url = 'teksten.aspx?fgr=' + _fgr + '&infopagina=' + _infopagina + '&titel=' + _titel;
  jQuery.get(url, function (data) {
      document.getElementById('measure_content').innerHTML = data;
      document.getElementById('measure_image').hidden = false;
      runDetailsLayoutLogic()
      runTableSectionLogic()
  });
}


runDetailsLayoutLogic()
runTableSectionLogic()


function runDetailsLayoutLogic() {

  const backBtnHtml = `
    <div class="go-back" hidden>
      <input type="checkbox" class="section_title_input" />
      <div class="sm-box section_dropdown">
        <img src="./assets/arrow.svg" alt="arrow" />
      </div>
      <label class="section_title">
        Naar overzicht
      </label>
    </div>
  `

  const detailsContainerHtml = `
    <div class="content_measure_details" id="measure_content">
    </div>
  `

  const mainContent = select('.content')
  const contentDetails = select('.content_details')
  const backBtn = select('.go-back', contentDetails)

  // open the first section of the content details
  const firstBulletInput = select('input#section_1', contentDetails)
  firstBulletInput.checked = true


  const isMedium = window.matchMedia('(max-width: 1024px)')

  isMedium.onchange = e => {
    handleDetailsLayout()
  }

  handleDetailsLayout()



  function handleDetailsLayout() {
    const measureContent = select('#measure_content')
    if(measureContent.childElementCount <= 0) return

    if(isMedium.matches) {
      backBtn.hidden = false
      contentDetails.classList.add('full-width')
      mainContent.style = `
        height: 0px;
        overflow: hidden;
      `
      scrollTop()

      backBtn.addEventListener('click', () => {
        contentDetails.classList.remove('full-width')
        contentDetails.innerHTML = backBtnHtml + detailsContainerHtml
        mainContent.style = `
          height: auto;
          overflow: auto;
        `
        scrollBottom()
      })
    } else {
      contentDetails.classList.remove('full-width')
      backBtn.hidden = true
      mainContent.style = `
        height: auto;
        overflow: auto;
      `
    }
  }
}



function runTableSectionLogic() {


  const togglerOptions = selectAll('.toggler_option')
  const optionsFilter = select('.options-filter')
  let currentTable = 't-e'

  togglerOptions.forEach((option) => {
    if (option.checked && option.getAttribute('id') === 'simple') {
      optionsFilter.hidden = true
    }

    option.addEventListener('click', (e) => {
      if (e.target.getAttribute('id') === 'simple') {
        optionsFilter.hidden = true
        renderTableData('t-e', true)
      } else {
        optionsFilter.hidden = false
        if(currentTable === 't-e') renderTableData('t-am')
        else renderTableData(currentTable)

      }
    })
  })



  /* table */
  const table = select('table.species-table')
  const tableBody = select('tbody', table)
  const tableHead = select('thead', table)
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

    tableHead.appendChild(tableTop)


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

    tableHead.appendChild(tableMonths)
  }
  renderTableHeader()

  // render table function based on param
  function renderTableData(code, changeCurrent) {
    const pre = select(`.table-data[data-table-code="${code}"]`)
    const tableArray = JSON.parse(pre.textContent)

    if(!changeCurrent) {
      currentTable = code
    }

    // remove old table content
    tableBody.textContent = ''

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

      tableBody.appendChild(specieRow)
    })
  }
  renderTableData('t-e')

  /* dropdown */
  const dropdowns = selectAll('.dropdown')
  const dropdownsButtons = selectAll('.dropdown_button')
  const dropdownItems = selectAll('.dropdown_item')
  let dropdown_1_key = 'a'
  let dropdown_2_key = 'm'

  // open the dropdown
  dropdownsButtons.forEach((button) => {
    const dropdown = button.closest('.dropdown')
    button.onclick = (e) => {
      e.stopPropagation()
      dropdowns.forEach(dropdown => dropdown.classList.remove('opened'))
      toggleClass('opened', dropdown)
    }
  })

  window.onclick = () => {
    dropdowns.forEach(dropdown => dropdown.classList.remove('opened'))
  }


  dropdownItems.forEach(item => {
    item.onclick = e => {
      const dropdown = item.closest('.dropdown')

      if(dropdowns[0] === dropdown) {
        dropdown_1_key = item.getAttribute('data-key')

      } else {
        dropdown_2_key = item.getAttribute('data-key')

      }

      select('.dropdown_picked-option', dropdown).textContent = item.textContent
      toggleClass('opened', dropdown)

      renderTableData(`t-${dropdown_1_key}${dropdown_2_key}`)
    }
  })
}
