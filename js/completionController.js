const currentUrl = new URL(location.href);
const quizIdSearch = currentUrl.searchParams.get("quizid");

const backBtn = document.querySelector("#backBtn");

backBtn.addEventListener("click", () =>{
    window.location = "/QuizApp/gamemodes.html?quizid="+quizIdSearch;
});