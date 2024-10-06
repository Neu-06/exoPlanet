// Cargar preguntas desde el archivo JSON
fetch('/games/quiz/js/cuestionario.json')
  .then(response => response.json())
  .then(data => {
    const questions = data.questions;
    startQuiz(questions);  // Iniciar el quiz con las preguntas cargadas
  })
  .catch(error => {
    console.error('Error al cargar el archivo JSON:', error);
  });

let currentQuestionIndex = 0;
let shuffledQuestions;
let totalQuestions = 10;
let selectedAnswer = null;

function startQuiz(questions) {
    shuffledQuestions = shuffleQuestions(questions);  // Barajar preguntas
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function shuffleQuestions(questions) {
    return questions.sort(() => Math.random() - 0.5);
}

function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);  // Barajar respuestas
}

// Mostrar la pregunta actual
function showQuestion(question) {
    document.getElementById('question-text').textContent = question.question;

    // Barajar respuestas
    const shuffledAnswers = shuffleArray(question.answers);

    // Actualizar los botones de respuestas
    shuffledAnswers.forEach((answer, index) => {
        const answerButton = document.getElementById('answer' + (index + 1));
        answerButton.textContent = answer.text;
        answerButton.dataset.correct = answer.correct;  // Guardar si es correcta o no
        answerButton.disabled = false;  // Habilitar los botones
        answerButton.style.borderColor = "transparent";  // Resetear el borde
    });

    // Desactivar el botón de "Siguiente" hasta que se seleccione una respuesta
    document.querySelector('.next-btn').disabled = true;
}

// Verificar la respuesta seleccionada
function checkAnswer(selectedButton) {
    const correct = selectedButton.dataset.correct === "true";
    const buttons = document.querySelectorAll('.answer-btn');

    // Deshabilitar todos los botones para que no se puedan seleccionar más respuestas
    buttons.forEach(button => button.disabled = true);

    // Resaltar la respuesta correcta e incorrecta
    buttons.forEach(button => {
        if (button.dataset.correct === "true") {
            button.style.borderColor = "green";  // Respuesta correcta
        } else if (button === selectedButton && !correct) {
            button.style.borderColor = "red";  // Respuesta incorrecta
        }
    });

    // Habilitar el botón "Siguiente" después de seleccionar una respuesta
    document.querySelector('.next-btn').disabled = false;
}

// Avanzar a la siguiente pregunta
function nextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex >= shuffledQuestions.length) {
        // Redirige a la página de felicitaciones
        window.location.href = "/games/quiz/felicidades.html"; // Asegúrate de que la ruta sea correcta
        return;  // Final del quiz
    }

     // Actualizar el contador de preguntas
     document.getElementById('question-counter').textContent = currentQuestionIndex + 1;  // Actualiza el número de pregunta

    // Mostrar la siguiente pregunta
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}
