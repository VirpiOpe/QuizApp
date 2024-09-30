const cBtn1 = document.querySelector("#choice1");
const cBtn2 = document.querySelector("#choice2");
const cBtn3 = document.querySelector("#choice3");
const cBtn4 = document.querySelector("#choice4");
const progressHeader = document.querySelector("#progressHeader");
const wordHeader = document.querySelector(".wordHeader");
const choiceDiv = document.querySelector(".choiceContainer");
const choiceButtons = document.querySelector(".choiceButtons");
const swapLangBtn = document.querySelector(".swapLangBtn");

const backButton = document.querySelector(".backButton");
backButton.addEventListener("click", ()=>{window.location="/gamemodes.html?quizid="+quizIdSearch;})

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
    if (rightWord == 0)
    {
        handleNextWord();
    }
    else
    {
        applyWrongStyle();
    }
});
cBtn2.addEventListener("click", () =>{
    if (rightWord == 1)
    {
        handleNextWord();
    }
    else
    {
        applyWrongStyle();
    }
});
cBtn3.addEventListener("click", () =>{
    if (rightWord == 2)
    {
        handleNextWord();
    }
    else
    {
        applyWrongStyle();
    }
});
cBtn4.addEventListener("click", () =>{
    if (rightWord == 3)
    {
        handleNextWord();
    }
    else
    {
        applyWrongStyle();
    }
});

function handleNextWord()
{
    if(currentWord >= quizLength-1)
    {
        window.location = "/completion.html?quizid="+quizIdSearch;
    }
    applyRightStyle();
    setTimeout(() => { 
        currentWord++;
        shuffleWords();
        choiceDiv.classList.add("animate");
        applyNormalStyle();
        choiceDiv.addEventListener("animationend", (e) =>{
            
            choiceDiv.classList.remove("animate");
            console.log("removed anim")
            
        });
    }, 2000);
    
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

