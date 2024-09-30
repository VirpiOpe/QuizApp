const nQuizBtn = document.querySelector("#newQuizButton");

nQuizBtn.addEventListener("click", () => {
    window.location = "/quizCreator.html?quizid=new";
});