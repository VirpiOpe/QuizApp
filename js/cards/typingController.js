const progressHeader = document.querySelector("#progressHeader");

const submitButton = document.querySelector(".submitButton");

const wordHeader = document.querySelector(".wordHeader");
const wordInput = document.querySelector(".wordInput");
const wordInputDiv = document.querySelector(".inputContainer");
const rightWordContainer = document.querySelector(".rightWordContainer");
const rightWordText = document.querySelector(".rightWordText");
const swapLangBtn = document.querySelector(".swapLangBtn");

const backButton = document.querySelector(".backButton");

const currentUrl = new URL(location.href);
const quizIdSearch = currentUrl.searchParams.get("quizid");

var fullJson;

var lang = 0;

var currentWord = 0;
var quizLength = 0;
var words1;
var words2;
var submitState = 0; //0 is not submitted 1 is ready to continue

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
      fullJson = fetchedData;
      console.log(quizLength)
      console.log(fetchedData);
      return fetchedData;
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
        return null;
    }
}

backButton.addEventListener("click", ()=>{window.location="/gamemodes.html?quizid="+quizIdSearch;})

swapLangBtn.addEventListener("click", () =>{
    if (lang == 0)
    {
        lang = 1;
        wordHeader.textContent = words2[currentWord];
        wordInput.placeholder = "Kirjoita " + fullJson.lang1;
    }
    else
    {
        lang = 0;
        wordHeader.textContent = words1[currentWord];
        wordInput.placeholder = "Kirjoita " + fullJson.lang2;
    }
});

submitButton.addEventListener("click", () =>{
    if (submitState == 0)
    {
        if (lang == 0 && wordInput.value == words2[currentWord])
        {
            applyRightStyle();
        }
        else if (lang == 1 && wordInput.value == words1[currentWord])
        {
            applyRightStyle();
        }
        else
        {
            applyWrongStyle();
            if (lang == 0)
            {
                rightWordText.textContent = words2[currentWord];
            }
            else
            {
                rightWordText.textContent = words1[currentWord];
            }
            
            
            rightWordContainer.style.visibility = "visible";
        
        }
        submitButton.textContent = "Seuraava";
        submitState = 1;
    }
    else
    {
        if (currentWord < quizLength-1)
        {
            wordInputDiv.classList.add("animate");
            setTimeout(()=>{wordInputDiv.classList.remove("animate");},1000);
            rightWordContainer.style.visibility = "hidden";
            currentWord += 1;
            submitState = 0;
            wordInput.value = "";
            applyNormalStyle();
            progressHeader.textContent = 1 +currentWord + "/" + quizLength;
            if (lang == 0)
            {
                wordHeader.textContent = words1[currentWord];
            }
            else
            {
                wordHeader.textContent = words2[currentWord];
            }
        }
        else
        {
            window.location = "/completion.html?quizid="+quizIdSearch;
        }
        
    }
});

function applyNormalStyle()
{
    submitButton.classList.remove("wrongWord");
    wordHeader.classList.remove("wrongWord");
    wordInput.classList.remove("wrongWord");
    wordInputDiv.classList.remove("wrongWord");
    submitButton.classList.remove("rightWord");
    wordHeader.classList.remove("rightWord");
    wordInput.classList.remove("rightWord");
    wordInputDiv.classList.remove("rightWord");
}

function applyWrongStyle()
{
    submitButton.classList.add("wrongWord");
    wordHeader.classList.add("wrongWord");
    wordInput.classList.add("wrongWord");
    wordInputDiv.classList.add("wrongWord");
}
function applyRightStyle()
{
    submitButton.classList.add("rightWord");
    wordHeader.classList.add("rightWord");
    wordInput.classList.add("rightWord");
    wordInputDiv.classList.add("rightWord");
}

getQuizData(quizIdSearch)
.then(data =>{
    if (lang == 0)
    {
        wordHeader.textContent = words1[currentWord];
    }
    else
    {
        wordHeader.textContent = words2[currentWord];
    }
    
    
    progressHeader.textContent = 1 +currentWord + "/" + quizLength;
})
.catch(error => {console.log("error:",error);});