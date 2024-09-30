const card = document.querySelector(".flippableCard");
const back = document.querySelector(".backButton");
const progressHeader = document.querySelector("#progressHeader");

const buttonNext = document.querySelector("#buttonNext");
const buttonPrev = document.querySelector("#buttonPrev");

const currentUrl = new URL(location.href);
const quizIdSearch = currentUrl.searchParams.get("quizid");

var cardSide = 0;

var quizLength = 0;
var currentCard = 0;
var words1;
var words2;


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
      console.log(quizLength)
      console.log(fetchedData);
      return fetchedData;
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
        return null;
    }
}

back.addEventListener("click", () => {
    window.location = "/gamemodes.html?quizid="+quizIdSearch; 
});

buttonNext.addEventListener("click", () =>{
    if (currentCard < quizLength -1)
    {
        currentCard++;
        card.childNodes[0].textContent = words1[currentCard];
        cardSide = 0;
        card.classList.add("animate");
        setTimeout(()=>{card.classList.remove("animate");},1000);
        
    }
    progressHeader.textContent = 1 +currentCard + "/" + quizLength;
});
buttonPrev.addEventListener("click", () =>{
    if (currentCard > 0)
    {
        currentCard--;
        card.childNodes[0].textContent = words1[currentCard];
        cardSide = 0;  
        card.classList.add("animateBack");
        setTimeout(()=>{card.classList.remove("animateBack");},1000);
    }
    progressHeader.textContent = 1 +currentCard + "/" + quizLength;
});

card.addEventListener("click", () =>{
    card.classList.add('cardFlipTrigger');
    
    if (cardSide == 0)
    {
        card.childNodes[0].textContent = words2[currentCard];
        cardSide = 1;
    }
    else
    {
        card.childNodes[0].textContent = words1[currentCard];
        cardSide = 0;
    }
    console.log(cardSide)
  });
    card.addEventListener('animationend', () => {
        card.classList.remove('cardFlipTrigger');
});

getQuizData(quizIdSearch)
.then(data =>{
        card.childNodes[0].textContent = words1[currentCard];
        progressHeader.textContent = 1 +currentCard + "/" + quizLength;
    })
.catch(error => {console.log("error:",error);});

