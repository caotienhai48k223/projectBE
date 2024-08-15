// Button Status
const buttonStatus = document.querySelectorAll("[button-status]")
if (buttonStatus.length >0) {
  const url = new URL(window.location.href)

  buttonStatus.forEach(button => {
    button.addEventListener('click',() => {
      const status = button.getAttribute('button-status')

      if (status) {
        url.searchParams.set('availabilityStatus',status)
      } else {
        url.searchParams.delete('availabilityStatus')
      }

      window.location.href=url.href
    })
  })
}
// End Button Status

//From Search
const formSearch = document.querySelector('#form-search')
if (formSearch) {
  const url = new URL(window.location.href)

  formSearch.addEventListener('submit', (e) => {
    e.preventDefault()
    const keyword = e.target.elements.keyword.value 

    if (keyword) {
      url.searchParams.set('keyword', keyword)
    } else {
      url.searchParams.delete('keyword')
    }

    window.location.href=url.href
  })
}
//End Form Search

//Pagination 
const buttonPagination = document.querySelectorAll('[button-pagination]')
if (buttonPagination) {
  const url = new URL(window.location.href)
  
  buttonPagination.forEach(button => {
    button.addEventListener('click', () => {
      const page = button.getAttribute('button-pagination')

      url.searchParams.set('page', page)

      window.location.href = url.href
    })
  })
}
//Pagination End