// let randomNumber = parseInt(Math.random() * 100 + 30);
let randomNumber = parseInt(Math.random() * 101 + 20); // 20~120
console.log(randomNumber);
// DOM 관련들은 보통 변수명 앞에 $기호를 붙이기도 합니다.
const $submitButton = document.querySelector("#submitButton");
const $userInput = document.querySelector("#guessField");
const $guessSlot = document.querySelector(".guesses");
const $remainingCount = document.querySelector(".lastResult");
const $startOverGame = document.querySelector(".resultParas");
const $guessingResult = document.querySelector(".guessingResult");
const $newGameGuide = document.createElement("p");
const $circleArea = document.querySelector(".circleArea");
const $answerCircleArea = document.querySelector(".answerCircleArea");
const $guessCircleArea = document.querySelector(".guessCircleArea");

let numGuesses = 1;
let playGame = true;

// 게임을 시작하는 부분입니다.
if (playGame) {
  makeAnswerCircle(randomNumber, "answer");
  // 하단주황
  $guessingResult.innerHTML = `<h1>숫자를 입력해 주세요.</h1>`;
  $submitButton.addEventListener("click", function (e) {
    e.preventDefault();
    const guess = parseInt($userInput.value);
    checkGuess(guess);
  });
}

// 정답을 체크하는 부분입니다.
// 제출버튼 $submitButton을 클릭하면 해당 함수가 호출됩니다.
function checkGuess(guess) {
  if (validate(guess)) {
    if (numGuesses === 10 && guess !== randomNumber) {
      // 10번시도 모두 실패
      displayGuesses(guess);
      displayMessage(`패배했습니다! 정답은 ${randomNumber} 였습니다.`);
      endGame();
    } else {
      displayGuesses(guess);
      clearCircle();
      compareGuess(guess);
    }
  }
}

function validate(guess) {
  if (isNaN(guess)) {
    alert("숫자를 입력해 주세요");
    return false;
  } else if (guess < 20) {
    // 20~
    alert("20 이상의 정수를 입력해 주세요");
    return false;
  } else if (guess > 120) {
    // 120~
    alert("120 이하의 정수를 입력해 주세요");
    return false;
  }

  return true;
}

function clearCircle() {
  if ($guessCircleArea.childElementCount >= 1) {
    $guessCircleArea.removeChild($guessCircleArea.firstChild);
  }
}

function compareGuess(guess) {
  if (guess === randomNumber) {
    makeGuessCircle(guess, "guess");
    displayMessage(`정답입니다!`);
    endGame();
  } else if (guess < randomNumber) {
    makeGuessCircle(guess, "guess");
    displayMessage(`너무 낮아요! 다시 도전해 주세요!`);
  } else if (guess > randomNumber) {
    makeGuessCircle(guess, "guess");
    displayMessage(`너무 높아요! 다시 도전해 주세요!`);
  }
}

// 유저가 입력한 input을 보여줍니다.
function displayGuesses(guess) {
  $userInput.value = "";
  $guessSlot.innerHTML += `${guess}  `;
  numGuesses++; // 추측한 횟수
  // 구현 1. 남아있는 숫자를 보여줄 수 있도록 아래의 = 이후를 작성해주세요!
  $remainingCount.innerHTML = `${11 - numGuesses}`;
}

// 유저에게 띄울 메세지를 입력합니다.
function displayMessage(message) {
  // 구현 2. 유저에게 메세지를 보여줄 수 있도록 아래의 영역을 구현해주세요
  $guessingResult.innerHTML = `<h1>${message}</h1>`;
}

function endGame() {
  $userInput.value = "";
  $userInput.setAttribute("disabled", "");
  $submitButton.setAttribute("disabled", "");
  $newGameGuide.classList.add("button");
  $startOverGame.appendChild($newGameGuide);
  playGame = false;
  newGame();
}

function makeAnswerCircle(guess) {
  const CIRCLE_NAME = "answer";
  // 구현3. 유저가 원의 크기로 정답을 유추하기 쉽도록 showCircle 함수를 이용해서 해당 부분을 구현해주세요,
  // showCircle 함수의 "작업"이 끝나면, 해당 div에 원의 이름을 입력해주세요
  showCircle(guess, CIRCLE_NAME, $answerCircleArea).then((div) => {
    div.id = "answerCircle";
    div.append(CIRCLE_NAME);
  });
}

function makeGuessCircle(guess) {
  const CIRCLE_NAME = "guess";
  // 구현3. 유저가 원의 크기로 정답을 유추하기 쉽도록 showCircle 함수를 이용해서 해당 부분을 구현해주세요,
  // showCircle 함수의 "작업"이 끝나면, 해당 div에 원의 이름을 입력해주세요
  showCircle(guess, CIRCLE_NAME, $guessCircleArea).then((div) => {
    div.id = "guessCircle";
    div.append(CIRCLE_NAME);
  });
}

// 원을 그려주는 함수입니다, css로 그려지는 속도를 애니메이션으로 구현되어있으며,
// 원의 크기, 이름, 영역을 받아 해당 영역에 해당 크기로 인자로 받은 이름을 붙여 그려줍니다.
// 해당 함수를 호출하기 위해서, size에는 유저가 추측한 숫자를, 영역과 이름에는 $guessCircleArea 와 같은 값이 들어가야겠죠?
function showCircle(size, circleName, area) {
  const cx = size + 20;
  const cy = size + 20;
  const radius = size + 20;

  let div = document.createElement("div");
  area.appendChild(div);

  div.id = `${circleName}`;
  div.className = "circle";
  div.style.width = 0;
  div.style.height = 0;
  div.style.left = cx + "px";
  div.style.top = cy + "px";

  return new Promise((resolve) => {
    setTimeout(() => {
      div.style.width = radius * 2 + "px";
      div.style.height = radius * 2 + "px";

      div.addEventListener("transitionend", function handler() {
        div.removeEventListener("transitionend", handler);
        resolve(div); //
      });
    }, 0);
  });
}
