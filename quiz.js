const arrayOfQuestions = [];
let score = 0;

class questionAndAnswers {
  constructor(question, correctAnswer, ...options) {
    this.question = question;
    this.correctAnswer = correctAnswer;
    this.options = [...options];
  }
}

function questionConstructor(question, correctAnswer, ...options) {
  arrayOfQuestions.push(new questionAndAnswers(question, correctAnswer, ...options));
}

function showQuestion() {
  console.log(arrayOfQuestions[0].question);
  arrayOfQuestions[0].options.forEach(option => console.log(option));
}

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

function promptForAnswer() {
 return new Promise((resolve, reject) => {
    readline.question('your response: ', response => {
      resolve(response);
    });
 });
}

function evaluate(answer) {
  if (answer === arrayOfQuestions[0].correctAnswer) score++;
}

// implementation:

questionConstructor(
  'what does html stand for?', '0',
  '0) hyper text markup language',
  '1) hyper textual markup language',
  '2) hyper text modal language'
);

questionConstructor(
  'what does css stand for?', '1',
  '0) computerized stylesheets',
  '1) cascading stylesheets',
  '2) comma-separated stylesheets'
);

questionConstructor(
  'true or false: javascript a typed language.', '1',
  '0) true',
  '1) false'
);

(async function quiz() {
  if (!arrayOfQuestions.length) {
    console.log(`your score: ${score}`);
    readline.close();
  } else {
    showQuestion();
    const answer = await promptForAnswer();
    evaluate(answer);
    arrayOfQuestions.shift();
    return quiz();
  }
})();
