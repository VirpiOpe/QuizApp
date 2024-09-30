const cardContainer = document.querySelector(".cardContainer");

const currentUrl = new URL(location.href);
const quizIdSearch = currentUrl.searchParams.get("quizid");

const backButton = document.querySelector(".backButton");
backButton.addEventListener("click", ()=>{window.location="/gamemodes.html?quizid="+quizIdSearch;})

var quizLength = 0;
var currentCard = 0;
var words1;
var words2;
var cardStage = 0;
var firstLang;
var firstIndex;
var secondIndex;
var fEl;
var sEl;
var validAmount = 0;

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

for(let i = 0; i < 20; i++)
{
    const element = document.createElement("div");
    element.classList.add("matchCard");
    element.setAttribute("id", "card"+i);
    element.addEventListener("click", () =>
    {
        if (element.dataset.canClick == "true")
        {
            if (cardStage == 0)
            {
                fEl = element;
                element.classList.add('cardFlipTrigger');
            setTimeout(() => {
                element.classList.remove('cardFlipTrigger');
            }, 300);
            
                element.innerText = element.dataset.realText || 'VIRHE';
                firstLang = getLang(element.textContent);
                console.log(firstLang)
                if (firstLang == 0)
                {
                    firstIndex = words1.indexOf(element.textContent);
                }
                else
                {
                    firstIndex = words2.indexOf(element.textContent);
                }
                cardStage = 1;
            }
            else if (cardStage == 1)
            {
                sEl = element;
                element.classList.add('cardFlipTrigger');
            setTimeout(() => {
                element.classList.remove('cardFlipTrigger');
            }, 300);
            
                element.innerText = element.dataset.realText || 'VIRHE';
                var secondLang = getLang(element.textContent);
                console.log(secondLang)
                if (secondLang == 0)
                {
                    secondIndex = words1.indexOf(element.textContent);
                }
                else
                {
                    secondIndex = words2.indexOf(element.textContent);
                }
                if (firstLang == 0 && secondLang == 1)
                {
                    if (firstIndex == secondIndex)
                    {
                        valid(fEl, sEl);
                    }
                    else
                    {
                        notValid(fEl, sEl);
                    }
                }
                else if (firstLang == 1 && secondLang == 0)
                {
                    if (firstIndex == secondIndex)
                    {
                        valid(fEl, sEl);
                    }
                    else
                    {
                        notValid(fEl, sEl);
                    }
                }
                else
                {
                    notValid(fEl, sEl);
                }
            } 
        }
        
    });
    cardContainer.appendChild(element);
}

function valid(first, second)
{
    console.log("done")
    first.classList.add("rightChoice");
    second.classList.add("rightChoice");

    first.dataset.canClick = "false";
    second.dataset.canClick = "false";

    validAmount += 1;
            
    cardStage = 0;

    if(validAmount >= 10)
    {
        setTimeout(()=>{window.location="/error.html"},1000);
    }
}

function notValid(first, second)
{
    setTimeout(() => {
        second.classList.add('cardFlipTrigger');
        first.classList.add('cardFlipTrigger');
        first.innerText = " ";
        second.innerText = " ";
        
        setTimeout(() => {
            first.classList.remove('cardFlipTrigger');
        }, 300);
        
        setTimeout(() => {
            second.classList.remove('cardFlipTrigger');
        }, 300);
    }, 1000) 
    cardStage = 0;
}

function getLang(word)
{
    let index = words1.indexOf(word);
    let index2 = words2.indexOf(word);
    if (index == -1)
    {
        return 1;
    }
    return 0;
}

function getLangIndex(word)
{
    let index = words1.indexOf(word);
    let index2 = words2.indexOf(word);
    if (index == -1)
    {
        return index2;
    }
    else if (index2 == -1)
    {
        return index;
    }
}

function shuffleCards()
{
    var res = []
    for (let i = 0; i < 10; i++)
    {
        var rand = Math.floor(Math.random() * quizLength);
        while (res.includes(words1[rand]))
        {
            rand = Math.floor(Math.random() * quizLength);
        }
        res.push(words1[rand])
        var rand2 = Math.floor(Math.random() * 20);
        var el = document.getElementById("card" +rand2);
        while (el.textContent != "")
        {
            rand2 = Math.floor(Math.random() * 20);
            el = document.getElementById("card" +rand2);
        }
        el.dataset.realText = words1[rand];
        el.innerText = " ";
        el.dataset.canClick = "true";
        while (el.textContent != "")
        {
            rand2 = Math.floor(Math.random() * 20);
            el = document.getElementById("card" +rand2);
        }
        el.dataset.realText = words2[rand];
        el.innerText = " ";
        el.dataset.canClick = "true";
    }
}

getQuizData(quizIdSearch)
.then(data =>{
    shuffleCards();
    })
.catch(error => {console.log("error:",error);});

