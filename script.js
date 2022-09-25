const textArea = document.querySelector("#text-area");
const btnPrimary = document.querySelector("#translate");
const clearBtn = document.querySelector("#clear");
const output = document.querySelector("#output-div");
const errorSection = document.querySelector(".section-error");
const url = "https://api.funtranslations.com/translate/yoda.json";

function constructUrlString(text) {
  return `${url}?text=${text}`;
}

btnPrimary.addEventListener("click", getInputData);
clearBtn.addEventListener("click", () => {
  output.innerText = '';
  textArea.value = '';
});
textArea.addEventListener("keypress", hideError);

function hideError() {
  errorSection.innerText = "";
  errorSection.style.display = "none";
}
function getInputData() {
  if (textArea.value === "") {
    showError("Text is required to translate.");
    return;
  }
  getTranslation(constructUrlString(textArea.value));
}

function getTranslation(text) {
  fetch(text)
    .then(function responseHandler(response) {
      return response.json();
    })
    .then(function logJSON(jsonData) {
      if (jsonData.contents) {
        output.innerText = jsonData.contents.translated;
      } else {
        showError(
          "Rate limit of 5 requests per hour exceeded. Please try after sometime."
        );
      }
    })
    .catch(errorHandler);
}

function errorHandler(error) {
  console.error("Error Occured", error);
}

function showError(text) {
  errorSection.innerText = text;
  errorSection.style.display = "block";
  output.innerText = "";
}
