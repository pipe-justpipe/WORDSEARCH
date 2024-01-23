//===== variable Declaration ========
const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById("result");
const sound = document.getElementById("sound");
const btn = document.getElementById("search-btn");
const resetBtn = document.getElementById("reset-btn");
const enterWord = document.getElementById("input-word");

resetBtn.addEventListener("click", () => {
  document.getElementById("input-word").value = "";
  result.innerHTML = "";
});

// ======== function to fetch the words from the API=======
function fetchWord() {
  let inpWord = document.getElementById("input-word").value;
  fetch(`${url}${inpWord}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      result.innerHTML = "";
      let addedWords = [];
      data.forEach((word) => {
        if (!addedWords.includes(word.word)) {
          let wordHtml = `
            <div class="word">
              <h3>${word.word}</h3>
              <button onclick="playSound('${word.phonetics[0].audio}')">
                <i class="fas fa-volume-up" style="color:#f1a566; margin-right:20px;"></i>
              </button>
            </div>`;
          let meaningsHtml = "";
          word.meanings.forEach((meaning) => {
            meaningsHtml += `
              <div class="details">
                <p>${meaning.partOfSpeech}</p>
                <p>/${word.phonetic}/</p>
              </div>`;
            meaning.definitions.forEach((definition) => {
              meaningsHtml += `
                <p class="word-meaning">${definition.definition}</p>
                <p class="word-example">${definition.example || ""}</p>`;
            });
          });
          result.innerHTML += wordHtml + meaningsHtml;
          addedWords.push(word.word);
        }
      });
    })
    .catch(() => {
      result.innerHTML = `<h3 class="error">Couldn't Find The Word</h3>`;
    });
}

// ======== To get result by clicking on search button ========
btn.addEventListener("click", fetchWord);

// ======= To get result by clicking enter key =======
enterWord.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    fetchWord();
  }
});

// ========= To play the audio ========
function playSound(audioSrc) {
  sound.setAttribute("src", audioSrc);
  sound.play();
}
