const nQuizBtn = document.querySelector("#newQuizButton");
const content = document.querySelector(".content");

async function getQuizes() {
    const url = "https://roudes.eu.pythonanywhere.com/getall";
    try {
      const response = await fetch(url);
      if (response.status == 400)
      {
        window.location = "/QuizApp/error.html";
      }
      fetchedData = await response.json();
      return fetchedData;
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
        return null;
    }
}


nQuizBtn.addEventListener("click", () => {
    window.location = "/QuizApp/quizCreator.html?quizid=new";
});

function createQuizButtons(data)
{

    console.log(data)
    for (let i = 0; i < data["data"].length; i++)
    {
        const btn = document.createElement("button");
        btn.textContent = data["data"][i]["name"];
        btn.style.width = "100%";
        btn.style.marginBottom = "10px";
        content.appendChild(btn);
        btn.addEventListener("click", ()=>{
            window.location = "/QuizApp/quizCreator.html?quizid="+data["data"][i]["quizid"];
        });
    }
    
}

getQuizes()
.then(data =>{
    createQuizButtons(data);
})
.catch(error => {console.log("error:",error);});