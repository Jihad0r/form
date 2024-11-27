document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".form");
  const inputs = form.querySelectorAll(
    "input[type='text'], input[type='email'], input[name=queryType], input[type='checkbox'], textarea"
  );
  const queryTypeInputs = form.querySelectorAll(".radio div div");

  queryTypeInputs.forEach((radio) => {
    radio.addEventListener("click", (e) => {
      const input = e.target.querySelector("input[type='radio']");
      const parent = input.parentElement;
      // console.log(parent.nextElementSibling);
      console.log(parent.parentNode);
      if (!parent.classList.contains("checked")) {
        input.checked = true;
        Array.from(input.parentElement.parentElement.childNodes).forEach(
          (child) => {
            if (child.nodeType === Node.ELEMENT_NODE) {
              child.classList.remove("checked");
            }
          }
        );

        parent.classList.add("checked");
      }
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    let isValid = true;
    inputs.forEach((input) => {
      const warning = input.parentElement.querySelector(".warn");

      if (["text", "email", "textarea"].includes(input.type)) {
        if (input.value.trim() === "") {
          input.style.borderColor = "#f65555";
          warning.style.display = "inline";
          isValid = false;
        } else {
          input.style.borderCol__or = "unset";
          warning.style.display = "none";
        }
      }

      inputs.forEach((input) => {
        const warning =
          input.parentElement.parentElement.querySelector(".warn");
        if (["checkbox"].includes(input.type)) {
          if (input.checked) {
            warning.style.display = "none";
          } else {
            warning.style.display = "inline";
            isValid = false;
          }
        }
      });
      const queryTypeChecked = form.querySelector(
        "input[name='queryType']:checked"
      );
      const queryTypeWarning = document.querySelector(".queryTypeWarning");
      if (!queryTypeChecked) {
        queryTypeWarning.style.display = "inline";
        isValid = false;
      } else {
        queryTypeWarning.style.display = "none";
      }
      if (!isValid) {
        event.preventDefault();
      }
    });
  });
});
