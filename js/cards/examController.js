const submitButton = document.querySelector(".submitBtn");

const currentUrl = new URL(location.href);
const quizIdSearch = currentUrl.searchParams.get("quizid");
const overviewDiv = document.querySelector(".overview");
overviewDiv.style.visibility = "hidden";

var words1;
var words2;

var wordIds = [];

var questionDivs = []

var lang = 1;
var fetchedData;

submitButton.addEventListener("click", () =>{
    checkAnswers();
});

const backButton = document.querySelector(".backButton");
backButton.addEventListener("click", ()=>{window.location="/gamemodes.html?quizid="+quizIdSearch;})

async function getQuizData(quizId) {
    const url = "https://roudes.eu.pythonanywhere.com/getquiz?quizid=" + quizId;
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

function createWordInput(wordIndex)
{
    const content = document.querySelector(".content");
    let wordInputCode;
    let wordDiv = document.createElement('div');
    let pHolder = "error";
    if(lang == 0)
    {
        pHolder = "Kirjoita kielellä " +fetchedData.lang2;
    }
    else
    {
        pHolder = "Kirjoita kielellä " +fetchedData.lang1;
    }
    if(lang == 0)
    {
        wordInputCode = `
            <h1 class="wordHeader">${words1[wordIndex]}</h1>
            <input class="wordInput" id="WI${wordIndex}" placeholder="${pHolder}"/>
            <h1 class="correctText"></h1>
        `;
        wordDiv.dataset.correctAnswer = words2[wordIndex];
    }
    else
    {
        wordInputCode = `
            <h1 class="wordHeader">${words2[wordIndex]}</h1>
            <input class="wordInput" placeholder="${pHolder}"/>
            <h1 class="correctText"></h1>

        `;
        wordDiv.dataset.correctAnswer = words1[wordIndex];
    }
        wordDiv.classList.add("wordDiv");
        wordDiv.innerHTML = wordInputCode; 
        content.appendChild(wordDiv);
        questionDivs.push(wordDiv);
        wordDiv.dataset.elType = "type";
}
function createMultichoice(wordIndex)
{
    const content = document.querySelector(".content");
    let multichoiceCode;
    if(lang == 0)
    {
        multichoiceCode = `
        <div class="upperContainerC">
            <h1 class="wordHeader">a car, a vehicle</h1>  
            <h1 class="cWord"></h1> 
        </div>  
        <div class="choiceButtons">
            <button id="choice1" class="choiceButton">Choice</button>
            <button id="choice2" class="choiceButton">Choice</button>
            <button id="choice3" class="choiceButton">Choice</button>
            <button id="choice4" class="choiceButton">Choice</button>
        </div>`
    }
    else
    {
        multichoiceCode = `
        <div class="upperContainerC">
            <h1 class="wordHeader">a car, a vehicle</h1>  
            <h1 class="cWord"></h1> 
        </div> 
        <div class="choiceButtons">
            <button id="choice1" class="choiceButton">Choice</button>
            <button id="choice2" class="choiceButton">Choice</button>
            <button id="choice3" class="choiceButton">Choice</button>
            <button id="choice4" class="choiceButton">Choice</button>
        </div>`
    }
    let wordDiv = document.createElement('div');
    wordDiv.classList.add("choiceDiv");
    wordDiv.innerHTML = multichoiceCode; 
    content.appendChild(wordDiv);
    shuffleWords(wordIndex, wordDiv);
    questionDivs.push(wordDiv);
    wordDiv.dataset.elType = "choice";
    wordDiv.dataset.currentlySelected = 111;
    if(lang == 0)
    {
        wordDiv.dataset.correctAnswerStr = words2[wordIndex];
    }
    else
    {
        wordDiv.dataset.correctAnswerStr = words1[wordIndex];
    }
}

function createQuizElements(questionAmount ,useWrite, useMultichoice)
{
    var res = []
    for (let i = 0; i < questionAmount; i++)
    {
        var rand = Math.floor(Math.random() * quizLength);
        while (res.includes(words1[rand]))
        {
            rand = Math.floor(Math.random() * quizLength);
        }
        res.push(words1[rand]);
        wordIds.push(rand);
        var randGMode = Math.round(Math.random());
        if (randGMode == 0)
        {
            createMultichoice(rand);
        }
        else
        {
            createWordInput(rand);
        }
        
    }
    //console.log(res);
}
function createOverviewChart(correct, wrong)
{
    const ctx = document.getElementById('overviewChart');

  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['Oikein', 'Väärin'],
      datasets: [{
        label: 'kysymystä',
        data: [correct,wrong],
        borderWidth: 1,
        backgroundColor: [
            '#6aad40',
            '#ad4040'   // Red // Yellow
               // Green // Purple
        ],
      }]
    },
  });
}
function checkAnswers()
{
    let correct = 0;
    let corrects = []
    for (let i = 0; i<questionDivs.length; i++)
    {
        
        //console.log(questionDivs[i].dataset.correctAnswer);
        if(questionDivs[i].dataset.elType == "choice")
        {
            if(questionDivs[i].dataset.currentlySelected == questionDivs[i].dataset.correctAnswer)
            {
                correct += 1;
                questionDivs[i].style.border = "3px solid #42a000";
            }
            else
            {
                questionDivs[i].style.border = "3px solid red";
                questionDivs[i].childNodes[1].childNodes[3].textContent = questionDivs[i].dataset.correctAnswerStr; 
            }
        }
        else if(questionDivs[i].dataset.elType == "type")
        {
            if(questionDivs[i].childNodes[3].value == questionDivs[i].dataset.correctAnswer)
            {
                correct += 1;
                questionDivs[i].style.border = "3px solid #42a000";
            }
            else
            {
                questionDivs[i].style.border = "3px solid red";
                questionDivs[i].childNodes[5].textContent = questionDivs[i].dataset.correctAnswer;
            }
        }
        
        /*
        
        if (el[i].value == words1[wordIds[i]] && lang == 1)
        {
            correct += 1;
            questionBlocks[i].style.border = "2px solid green";
        }
        else if (el[i].value == words2[wordIds[i]] && lang == 0)
        {
            correct += 1;
            questionBlocks[i].style.border = "2px solid green";
        }
        else
        {
            questionBlocks[i].style.border = "2px solid red";
            if (lang == 1)
            {
                questionBlocks[i].childNodes[5].textContent = words1[wordIds[i]];
            }
            else
            {
                questionBlocks[i].childNodes[5].textContent = words2[wordIds[i]];
            }
            
        }*/
    }
    console.log("You got " + correct)
    document.querySelector(".content").classList.add("topMargin");
    overviewDiv.style.visibility = "visible";
    createOverviewChart(correct, questionDivs.length - correct);
    submitButton.disabled = true;
}


getQuizData(quizIdSearch)
.then(data =>{
    createQuizElements(10, false, false);
    })
.catch(error => {console.log("error:",error);});

function applySelectedStyle(choiceContainer, index)
{
    const cBtn1 = choiceContainer.childNodes[3].childNodes[1];
    const cBtn2 = choiceContainer.childNodes[3].childNodes[3];
    const cBtn3 = choiceContainer.childNodes[3].childNodes[5];
    const cBtn4 = choiceContainer.childNodes[3].childNodes[7];
    cBtn1.classList.remove("choiceButtonSelected");
    cBtn2.classList.remove("choiceButtonSelected");
    cBtn3.classList.remove("choiceButtonSelected");
    cBtn4.classList.remove("choiceButtonSelected");
    if(index ==0){cBtn1.classList.add("choiceButtonSelected");}
    if(index ==1){cBtn2.classList.add("choiceButtonSelected");}
    if(index ==2){cBtn3.classList.add("choiceButtonSelected");}
    if(index ==3){cBtn4.classList.add("choiceButtonSelected");}
}

function shuffleWords(wordIndex, choiceContainer)
{
    const cBtn1 = choiceContainer.childNodes[3].childNodes[1];
    const cBtn2 = choiceContainer.childNodes[3].childNodes[3];
    const cBtn3 = choiceContainer.childNodes[3].childNodes[5];
    const cBtn4 = choiceContainer.childNodes[3].childNodes[7];
    wordHeader = choiceContainer.childNodes[1].childNodes[1];
    cBtn1.addEventListener("click", () =>{choiceContainer.dataset.currentlySelected = 0;applySelectedStyle(choiceContainer,0);});
    cBtn2.addEventListener("click", () =>{choiceContainer.dataset.currentlySelected = 1;applySelectedStyle(choiceContainer,1);});
    cBtn3.addEventListener("click", () =>{choiceContainer.dataset.currentlySelected = 2;applySelectedStyle(choiceContainer,2);});
    cBtn4.addEventListener("click", () =>{choiceContainer.dataset.currentlySelected = 3;applySelectedStyle(choiceContainer,3);});
    var choiceContainer = choiceContainer;
    if (lang == 1)
    {
        wordHeader.textContent = words2[wordIndex];
        var reservedWords = []
        let knownIndex = wordIndex;
        reservedWords.push(words1[knownIndex]);
        let randomNumSlot = Math.floor(Math.random() *4);
        rightWord = randomNumSlot;
        choiceContainer.dataset.correctAnswer = randomNumSlot;
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
        wordHeader.textContent = words1[wordIndex];
        
        var reservedWords = []
        let knownIndex = wordIndex;
        reservedWords.push(words2[knownIndex]);
        let randomNumSlot = Math.floor(Math.random() *4);
        rightWord = randomNumSlot;
        choiceContainer.dataset.correctAnswer = randomNumSlot;
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
