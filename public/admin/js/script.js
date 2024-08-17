// Button Status
const buttonStatus = document.querySelectorAll("[button-status]");
if (buttonStatus.length > 0) {
  const url = new URL(window.location.href);

  buttonStatus.forEach((button) => {
    button.addEventListener("click", () => {
      const status = button.getAttribute("button-status");

      if (status) {
        url.searchParams.set("availabilityStatus", status);
      } else {
        url.searchParams.delete("availabilityStatus");
      }

      window.location.href = url.href;
    });
  });
}
// End Button Status

//From Search
const formSearch = document.querySelector("#form-search");
if (formSearch) {
  const url = new URL(window.location.href);

  formSearch.addEventListener("submit", (e) => {
    e.preventDefault();
    const keyword = e.target.elements.keyword.value;

    if (keyword) {
      url.searchParams.set("keyword", keyword);
    } else {
      url.searchParams.delete("keyword");
    }

    window.location.href = url.href;
  });
}
//End Form Search

//Pagination
const buttonPagination = document.querySelectorAll("[button-pagination]");
if (buttonPagination) {
  const url = new URL(window.location.href);

  buttonPagination.forEach((button) => {
    button.addEventListener("click", () => {
      const page = button.getAttribute("button-pagination");

      url.searchParams.set("page", page);

      window.location.href = url.href;
    });
  });
}
//Pagination End

//Checkbox Multi
const checkboxMulti = document.querySelector("[checkbox-multi]");
if (checkboxMulti) {
  const inputCheckAll = checkboxMulti.querySelector("input[name='checkall']");
  const inputsId = checkboxMulti.querySelectorAll("input[name='id']");

  inputCheckAll.addEventListener("click", () => {
    if (inputCheckAll.checked) {
      inputsId.forEach((input) => {
        input.checked = true;
      });
    } else {
      inputsId.forEach((input) => {
        input.checked = false;
      });
    }
  });

  inputsId.forEach((input) => {
    input.addEventListener("click", () => {
      const countChecked = checkboxMulti.querySelectorAll(
        "input[name='id']:checked"
      ).length;

      if (countChecked == inputsId.length) {
        inputCheckAll.checked = true;
      } else {
        inputCheckAll.checked = false;
      }
    });
  });
}
//End Checkbox Multi

//Form Change Multi
const formChangeMulti = document.querySelector("[form-change-multi]");
if (formChangeMulti) {
  formChangeMulti.addEventListener("submit", (e) => {
    e.preventDefault();

    if (e.target.elements.type.value == "--Choose Action--") {
      alert("Vui lòng chọn hành động");
      return;
    } else {
      const checkboxMulti = document.querySelector("[checkbox-multi]");
      const inputsChecked = checkboxMulti.querySelectorAll(
        "input[name='id']:checked"
      );

      if (inputsChecked.length > 0) {
        const typeChange = e.target.elements.type.value;
        if (typeChange == "delete-all") {
          const isConfirm = confirm("Delete All Product?");
          if (!isConfirm) {
            return;
          }
        }

        if (typeChange == "restore-all") {
          const isConfirm = confirm("Restore All Product?");
          if (!isConfirm) {
            return;
          }
        }

        let ids = [];
        const inputIds = formChangeMulti.querySelector("input[name='ids']");
        inputsChecked.forEach((input) => {
          const id = input.value;
          ids.push(id);
        });
        inputIds.value = ids.join(", ");
        formChangeMulti.submit();
      } else {
        alert("Vui lòng chọn ít nhất một bản ghi!");
      }
    }
  });
}
//End Form Change Multi
