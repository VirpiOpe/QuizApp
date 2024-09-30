const cardsBtn = document.querySelector("#gamemodeCardButton");
const typeBtn = document.querySelector("#gamemodeTypeButton");
const multichoiceBtn = document.querySelector("#gamemodeMultichoiceButton");
const matchBtn = document.querySelector("#gamemodeMatchButton");
const examBtn = document.querySelector("#gamemodeExamButton");
const quizNameHeader = document.querySelector(".quizNameHeader");

const currentUrl = new URL(location.href);
const quizIdSearch = currentUrl.searchParams.get("quizid");

async function getQuizData(quizId) {
    const url = "http://127.0.0.1:5000/getquiz?quizid=" + quizId;
    try {
      const response = await fetch(url);
      if (response.status == 400)
      {
        window.location = "/error.html";
      }
      fetchedData = await response.json();
      words1 = fetchedData.words1;
      words2 = fetchedData.words2;
      quizLength = words1.length;
      
      return fetchedData;
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
        return null;
    }
}

cardsBtn.addEventListener("click", () =>{
    document.location = "/cards.html?quizid="+quizIdSearch;
});
typeBtn.addEventListener("click", () =>{
    document.location = "/typing.html?quizid="+quizIdSearch;
});
multichoiceBtn.addEventListener("click", () =>{
    document.location = "/multichoice.html?quizid="+quizIdSearch;
});
matchBtn.addEventListener("click", () =>{
    document.location = "/match.html?quizid="+quizIdSearch;
});
examBtn.addEventListener("click", () =>{
    document.location = "/exam.html?quizid="+quizIdSearch;
});

getQuizData(quizIdSearch)
.then(data =>{
    quizNameHeader.textContent = data.name;
})
.catch(error => {console.log("error:",error);});
