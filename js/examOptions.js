const currentUrl = new URL(location.href);
const quizIdSearch = currentUrl.searchParams.get("quizid");

const btn1 = document.querySelector(".startButton");
const s1 = document.querySelector("#quizModuleSelect");
const s2 = document.querySelector("#quizLangSelect");

btn1.addEventListener("click", () =>{
    window.location = "/QuizApp/exam.html?quizid="+quizIdSearch+"&l="+s2.value + "&ag="+s1.value
});