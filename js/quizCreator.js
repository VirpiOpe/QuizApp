const quizWordInputDivTemplate = `
            <input style="font-size: 30px;width: 40%; height: 35px;" placeholder="Sana"/>
            <input style="font-size: 30px;width: 40%; height: 35px; margin-right: 7%;" placeholder="Määritelmä"/>
            <button class="removeAddWordDivButton" style="position: absolute; height: 100%;right: 0px"><span class="material-symbols-outlined">
                delete
                </span></button>
        `;

const addQuestionButton = document.querySelector("#addQuestionButton");
const page = document.querySelector(".content");
const publishQuizButton = document.querySelector(".publishQuizButton");
const quizNameInput = document.querySelector("#quizNameInput");
const quizLangSelect1 = document.querySelector("#quizLangSelect1");
const quizLangSelect2 = document.querySelector("#quizLangSelect2")
const pwI = document.querySelector("#pwI");
publishQuizButton.addEventListener("click", createQuiz)

const currentUrl = new URL(location.href);
const quizIdSearch = currentUrl.searchParams.get("quizid");

const back = document.querySelector(".backButton");
const linkh = document.querySelector(".linkH");
linkh.textContent = "https://virpiope.github.io/QuizApp/gamemodes.html?quizid="+quizIdSearch;
back.addEventListener("click", ()=>{window.location="/QuizApp/adminDashboard.html"});

async function getQuizData(quizId) {
    const url = "https://roudes.eu.pythonanywhere.com/getquiz?quizid=" + quizId;
    try {
      const response = await fetch(url);
      if (response.status == 400)
      {
        window.location = "/QuizApp/quizCreator.html?quizid=new";
      }
      fetchedData = await response.json();
      return fetchedData;
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
        return null;
    }
}


if (quizIdSearch == "new")
{
    console.log("New quiz");
}
else
{
    
    console.log("Fetching quiz with id" + quizIdSearch);
    getQuizData(quizIdSearch)
    .then(data => {
        quizNameInput.value = data.name;
        quizLangSelect1.value = data.lang1;
        quizLangSelect2.value = data.lang2;
        for (let i = 0; i < data.words1.length; i++)
        {
            const templateDiv = document.createElement("div");
            templateDiv.innerHTML = quizWordInputDivTemplate.trim();
            templateDiv.classList.add("quizWordsInputDiv");
            page.appendChild(templateDiv);
            document.querySelectorAll(".removeAddWordDivButton").forEach(btn =>{
                btn.removeEventListener("click", removeAddWordDivButtonClick);
                btn.addEventListener("click", removeAddWordDivButtonClick);
            });
            templateDiv.childNodes[0].value = data.words1[i];
            templateDiv.childNodes[2].value = data.words2[i];
        }
    })
    .catch(error => {
        console.error("error:",error)        
    }); 
}

addQuestionButton.addEventListener("click", () => {
    const templateDiv = document.createElement("div");
    templateDiv.innerHTML = quizWordInputDivTemplate.trim();
    templateDiv.classList.add("quizWordsInputDiv");
    page.appendChild(templateDiv);
    document.querySelectorAll(".removeAddWordDivButton").forEach(btn =>{
        btn.removeEventListener("click", removeAddWordDivButtonClick);
        btn.addEventListener("click", removeAddWordDivButtonClick);
});
});

function removeAddWordDivButtonClick(e)
{
    const parent = e.target.parentElement;
    if(parent.tagName == "DIV")
    {
        parent.remove();
    }
    else if (parent.tagName == "BUTTON")
    {
        parent.parentElement.remove();
    } 
}


function createQuiz(e)
{
    if (quizLangSelect1.value != "" && quizLangSelect2.value != "")
    {
        if (quizNameInput.value != "")
        {
            var quizJson = {
                name : quizNameInput.value,
                lang1 : quizLangSelect1.value,
                lang2 : quizLangSelect2.value,
                words1 : [
        
                ],
                words2 : [
        
                ]
            }
            document.querySelectorAll(".quizWordsInputDiv").forEach(div =>{
                div.childNodes[0].value;
                quizJson.words1.push(div.childNodes[0].value);
                quizJson.words2.push(div.childNodes[2].value);
            });
            sendQuiz(quizJson);
        }   
        else
        {
            console.log("set quiz name");
        }
    }
    else
    {
        console.log("Select language")
    }

}

function sendQuiz(quizJson)
{
    let quizId;
    if (quizIdSearch == "new")
    {
        quizId = Math.floor(Math.random() * 1000000000);
    }
    else
    {
        quizId = quizIdSearch;
    }
    
    // The URL of your server endpoint
    const url = 'https://roudes.eu.pythonanywhere.com/createquiz';

    // The data you want to send in JSON format
    const data = {
        qId : quizId,
        isPrivate : false,
        quizName : quizJson.name,
        quizData : JSON.stringify(quizJson),
        auth : pwI.value
    };

    console.log(data.quizData)
    fetch(url, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) 
    })
    .then(data => {
        console.log('Success:', data); 
        
        window.location = "/QuizApp/quizCreator.html?quizid="+quizId;
    })
    .catch(error => {
        console.error('Error:', error); 
    });

}
