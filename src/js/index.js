const state = {
  tempInput: "",
  firstInput: "",
  secondInput: "",
  operation: "",
};

function checkInputLength(input) {
  let checkLength = false;

  if (input.length < 3) {
    checkLength = true;
  }

  return checkLength;
}

function isRightInput(input) {
  let rightInput = false;

  if (input[0] !== "0") {
    rightInput = true;
  }

  return rightInput;
}

function onClickedDigit() {
  const digits = document.getElementsByClassName("digit");
  let input = "";

  for (let digit of digits) {
    digit.addEventListener("click", () => {
      const total = document.getElementById("total");

      if (isRightInput(input) && checkInputLength(input)) {
        input += digit.innerText;
      } else if (!isRightInput(input)) {
        input = digit.innerText;
      }
      total.innerText = input;
      state.tempInput = input;
    });
  }
}

function calculation(operation, firstInput, operator) {
  if (operation.innerText !== "=") {
    state.operation = operator;
    firstInput = state.tempInput;
  }

  return firstInput;
}

function onClickedEqual() {
  const operation = document.getElementsByClassName("operation")[4];
  const total = document.getElementById("total");

  operation.addEventListener("click", () => {
    if (state.operation === "X") {
      state.operation = "*";
    }
    let result = parseInt(
      eval(state.firstInput + state.operation + state.secondInput)
    );

    total.innerText = result;
  });
}

function onClickedOperation() {
  const operations = document.getElementsByClassName("operation");
  let firstInput = "";
  let secondInput = "";
  onClickedDigit();

  for (let operation of operations) {
    operation.addEventListener("click", () => {
      let operator = operation.innerText;
      firstInput = calculation(operation, firstInput, operator);
      state.firstInput = firstInput;

      onClickedDigit();
      secondInput = state.tempInput;
      state.secondInput = secondInput;
    });
  }

  onClickedEqual();
}

new onClickedOperation();
