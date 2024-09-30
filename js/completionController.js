const currentUrl = new URL(location.href);
const quizIdSearch = currentUrl.searchParams.get("quizid");

const backBtn = document.querySelector("#backBtn");

backBtn.addEventListener("click", () =>{
    window.location = "/gamemodes.html?quizid="+quizIdSearch;
});