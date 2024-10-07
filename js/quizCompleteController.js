const currentUrl = new URL(location.href);
const quizIdSearch = currentUrl.searchParams.get("quizid");
const wrongWordsSearch = currentUrl.searchParams.get("wrong");



var aa = wrongWordsSearch.split("c")

console.log(aa);

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

getQuizData(quizIdSearch)
.then(data =>{
        })
.catch(error => {console.log("error:",error);});