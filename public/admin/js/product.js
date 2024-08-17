// Change Status
const buttonChangeStatus = document.querySelectorAll("[button-change-status]");

if (buttonChangeStatus.length > 0) {
  const formChangeStatus = document.querySelector("#form-change-status");
  const pathChangeStatus = formChangeStatus.getAttribute("data-path");
  buttonChangeStatus.forEach((button) => {
    button.addEventListener("click", () => {
      const statusCurrent = button.getAttribute("data-status");
      const idCurrent = button.getAttribute("data-id");

      let statusChange = statusCurrent == "In Stock" ? "Low Stock" : "In Stock";

      const action =
        pathChangeStatus + `/${statusChange}/${idCurrent}?_method=PATCH`;
      formChangeStatus.action = action;

      formChangeStatus.submit();
    });
  });
}
// End Change Status

// Delete Item
const buttonDelete = document.querySelectorAll("[button-delete]");
if (buttonDelete.length > 0) {
  const formDeleteItem = document.querySelector("#form-delete-item");
  const pathDelete = formDeleteItem.getAttribute("data-path");
  buttonDelete.forEach((button) => {
    button.addEventListener("click", () => {
      const isConfirm = confirm("Delete Product?");
      if (isConfirm) {
        const id = button.getAttribute("data-id");
        const action = pathDelete + `/${id}?_method=DELETE`;
        formDeleteItem.action = action;
        formDeleteItem.submit();
      }
    });
  });
}
// End Delete Item

// Restore Item
const buttonRestore = document.querySelectorAll("[button-restore]");
if (buttonRestore.length > 0) {
  const formRestoreItem = document.querySelector("#form-restore-item");
  const pathRestoreItem = formRestoreItem.getAttribute("data-path");
  buttonRestore.forEach((button) => {
    button.addEventListener("click", () => {
      const isConfirm = confirm("Restore Product?");
      if (isConfirm) {
        const id = button.getAttribute("data-id");
        const action = pathRestoreItem + `/${id}?_method=PATCH`;
        formRestoreItem.action = action;
        formRestoreItem.submit();
      }
    });
  });
}
// End Restore Item

// Permanently Delete
const buttonDeletePermanent = document.querySelectorAll(
  "[button-delete-permanent]"
);
if (buttonDeletePermanent.length > 0) {
  const formDeletePermanentItem = document.querySelector(
    "#form-delete-permanent-item"
  );
  const pathDeletePermanent = formDeletePermanentItem.getAttribute("data-path");
  buttonDeletePermanent.forEach((button) => {
    button.addEventListener("click", () => {
      const isConfirm = confirm("Delete Product Permanent?");
      if (isConfirm) {
        const id = button.getAttribute("data-id");
        const action = pathDeletePermanent + `/${id}?_method=DELETE`;
        formDeletePermanentItem.action = action;
        formDeletePermanentItem.submit();
      }
    });
  });
}
//End Permanently Delete
