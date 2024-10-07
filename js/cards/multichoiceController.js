const cBtn1 = document.querySelector("#choice1");
const cBtn2 = document.querySelector("#choice2");
const cBtn3 = document.querySelector("#choice3");
const cBtn4 = document.querySelector("#choice4");
const progressHeader = document.querySelector("#progressHeader");
const wordHeader = document.querySelector(".wordHeader");
const choiceDiv = document.querySelector(".choiceContainer");
const choiceButtons = document.querySelector(".choiceButtons");
const swapLangBtn = document.querySelector(".swapLangBtn");
const submitButton = document.querySelector("#submitButton");

const backButton = document.querySelector(".backButton");
backButton.addEventListener("click", ()=>{window.location="/QuizApp/gamemodes.html?quizid="+quizIdSearch;})

const currentUrl = new URL(location.href);
const quizIdSearch = currentUrl.searchParams.get("quizid");


var quizLength = 0;
var currentWord = 0;
var words1;
var words2;
var fullJson;
var usedRandoms = [];
var rightWord;
var lang = 0;
var currentlySelected = -1;
var state = 0

async function getQuizData(quizId) {
    const url = "https://roudes.eu.pythonanywhere.com/getquiz?quizid=" + quizId;
    try {
      const response = await fetch(url);
      if (response.status == 400)
      {
        window.location = "/QuizApp/error.html";
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

submitButton.addEventListener("click", () =>{
    if (state == 0)
    {
        checkWord();
        submitButton.textContent = "Seuraava";
        state = 1;
    }
    else if(state == 1)
    {
        handleNextWord();
        state = 0;
    }
    
});

swapLangBtn.addEventListener("click", () =>{
    if (lang == 0)
    {
        lang = 1;
        wordHeader.textContent = words2[currentWord];
        console.log(currentWord);
        shuffleWords();
    }
    else
    {
        lang = 0;
        wordHeader.textContent = words1[currentWord];
        shuffleWords();
    }
});

cBtn1.addEventListener("click", () =>{
    cBtn1.classList.add("selected");
    currentlySelected = 0;
});
cBtn2.addEventListener("click", () =>{
    cBtn2.classList.add("selected");
    currentlySelected = 1;

});
cBtn3.addEventListener("click", () =>{
    cBtn3.classList.add("selected");
    currentlySelected = 2;

});
cBtn4.addEventListener("click", () =>{
    cBtn4.classList.add("selected");
    currentlySelected = 3;

});

function checkWord()
{
    if (rightWord == currentlySelected)
    {
        applyRightStyle();
    }
    else
    {
        applyWrongStyle();
    }
}

function handleNextWord()
{
    if(currentWord >= quizLength-1)
    {
        window.location = "/QuizApp/completion.html?quizid="+quizIdSearch;
    }
    setTimeout(() => { 
        currentWord++;
        shuffleWords();
        choiceDiv.classList.add("animate");
        applyNormalStyle();
        choiceDiv.addEventListener("animationend", (e) =>{
            
            choiceDiv.classList.remove("animate");
            console.log("removed anim");
            cBtn1.classList.remove("selected");
            cBtn2.classList.remove("selected");
            cBtn3.classList.remove("selected");
            cBtn4.classList.remove("selected");
            
        });
    }, 300);
    
}

function applyWrongStyle()
{
    cBtn1.classList.add("wrongWord");
    cBtn2.classList.add("wrongWord");
    cBtn3.classList.add("wrongWord");
    cBtn4.classList.add("wrongWord");
    wordHeader.classList.add("wrongWord");
    choiceDiv.classList.add("wrongWord");
}

function applyRightStyle()
{
    cBtn1.classList.add("rightWord");
    cBtn2.classList.add("rightWord");
    cBtn3.classList.add("rightWord");
    cBtn4.classList.add("rightWord");
    wordHeader.classList.add("rightWord");
    choiceDiv.classList.add("rightWord");
}

function applyNormalStyle()
{
    cBtn1.classList.remove("rightWord");
    cBtn2.classList.remove("rightWord");
    cBtn3.classList.remove("rightWord");
    cBtn4.classList.remove("rightWord");
    wordHeader.classList.remove("rightWord");
    choiceDiv.classList.remove("rightWord");
    cBtn1.classList.remove("wrongWord");
    cBtn2.classList.remove("wrongWord");
    cBtn3.classList.remove("wrongWord");
    cBtn4.classList.remove("wrongWord");
    wordHeader.classList.remove("wrongWord");
    choiceDiv.classList.remove("wrongWord");
}

function shuffleWords()
{
    cBtn1.textContent = "Choice";
    cBtn2.textContent = "Choice";
    cBtn3.textContent = "Choice";
    cBtn4.textContent = "Choice";
    if (lang == 1)
    {
        wordHeader.textContent = words2[currentWord];
        var reservedWords = []
        let knownIndex = currentWord;
        reservedWords.push(words1[knownIndex]);
        let randomNumSlot = Math.floor(Math.random() *4);
        rightWord = randomNumSlot;
        if (randomNumSlot == 0)
        {
            cBtn1.textContent = words1[knownIndex];
        }
        else if (randomNumSlot == 1)
        {
            cBtn2.textContent = words1[knownIndex];
        }
        else if (randomNumSlot == 2)
        {
            cBtn3.textContent = words1[knownIndex];
        }
        else if (randomNumSlot == 3)
        {
            cBtn4.textContent = words1[knownIndex];
        }
        for (let i = 0; i < 3; i++)
        {
            let randomNum = Math.floor(Math.random() *quizLength);
            while (reservedWords.includes(words1[randomNum]))
            {
                randomNum = Math.floor(Math.random() *quizLength);
                
            }
            reservedWords.push(words1[randomNum])

            for (let j = 0; j < 4; j++)
            {
                if (j == 0)
                {
                    if (cBtn1.textContent == "Choice")
                    {
                        cBtn1.textContent = words1[randomNum];
                        break;
                    }
                }
                else if (j == 1)
                {
                    if (cBtn2.textContent == "Choice")
                    {
                        cBtn2.textContent = words1[randomNum];
                        break;
                    }
                }
                else if (j == 2)
                {
                    if (cBtn3.textContent == "Choice")
                    {
                        cBtn3.textContent = words1[randomNum];
                        break;
                    }
                }
                else if (j == 3)
                {
                    if (cBtn4.textContent == "Choice")
                    {
                        cBtn4.textContent = words1[randomNum];
                        break;
                    }
                }
            }
        }
    }
    else if(lang == 0)
    {
        wordHeader.textContent = words1[currentWord];
        var reservedWords = []
        let knownIndex = currentWord;
        reservedWords.push(words2[knownIndex]);
        let randomNumSlot = Math.floor(Math.random() *4);
        rightWord = randomNumSlot;
        if (randomNumSlot == 0)
        {
            cBtn1.textContent = words2[knownIndex];
        }
        else if (randomNumSlot == 1)
        {
            cBtn2.textContent = words2[knownIndex];
        }
        else if (randomNumSlot == 2)
        {
            cBtn3.textContent = words2[knownIndex];
        }
        else if (randomNumSlot == 3)
        {
            cBtn4.textContent = words2[knownIndex];
        }
        for (let i = 0; i < 3; i++)
        {
            let randomNum = Math.floor(Math.random() *quizLength);
            while (reservedWords.includes(words2[randomNum]))
            {
                randomNum = Math.floor(Math.random() *quizLength);
                
            }
            reservedWords.push(words2[randomNum])

            for (let j = 0; j < 4; j++)
            {
                if (j == 0)
                {
                    if (cBtn1.textContent == "Choice")
                    {
                        cBtn1.textContent = words2[randomNum];
                        break;
                    }
                }
                else if (j == 1)
                {
                    if (cBtn2.textContent == "Choice")
                    {
                        cBtn2.textContent = words2[randomNum];
                        break;
                    }
                }
                else if (j == 2)
                {
                    if (cBtn3.textContent == "Choice")
                    {
                        cBtn3.textContent = words2[randomNum];
                        break;
                    }
                }
                else if (j == 3)
                {
                    if (cBtn4.textContent == "Choice")
                    {
                        cBtn4.textContent = words2[randomNum];
                        break;
                    }
                }
            }
        }
    } 

}

getQuizData(quizIdSearch)
.then(data =>{
    shuffleWords()
    console.log(rightWord)
    if (lang == 0)
    {
        wordHeader.textContent = words1[currentWord];
    }
    else
    {
        wordHeader.textContent = words2[currentWord];
    }
})
.catch(error => {console.log("error:",error);});

