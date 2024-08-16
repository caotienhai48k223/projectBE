// Change Status 
const buttonChangeStatus = document.querySelectorAll('[button-change-status]')

if (buttonChangeStatus.length > 0) {
  const formChangeStatus = document.querySelector('#form-change-status')
  const pathChangeStatus = formChangeStatus.getAttribute('data-path')
  buttonChangeStatus.forEach(button => {
    button.addEventListener('click', () => {
      const statusCurrent = button.getAttribute('data-status')
      const idCurrent = button.getAttribute('data-id')

      let statusChange = statusCurrent == "In Stock" ? "Low Stock" : "In Stock"

      const action = pathChangeStatus + `/${statusChange}/${idCurrent}?_method=PATCH`
      formChangeStatus.action = action

      formChangeStatus.submit()
    })
  })
}
// End Change Status 