const s = document.querySelector("#colorModeSwitch");

var darkModeOn = false;

s.addEventListener("click", () =>{
    loadTheme(!darkModeOn)
    darkModeOn = !darkModeOn;
});

function loadTheme(isDark)
{
    if(isDark)
    {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = "css/dark.css";

        unloadTheme("css/light.css")

        // Append the link element to the head
        document.head.appendChild(link);
    }
    else 
    {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = "css/light.css";
        unloadTheme("css/dark.css")
        console.log(isDark)
        // Append the link element to the head
        document.head.appendChild(link);

    }
}
function unloadTheme(url) {
    const links = document.querySelectorAll('link[rel="stylesheet"]');
  
    links.forEach(link => {
      if (link.href === url) {
        link.parentNode.removeChild(link);
      }
    });
  }

  loadTheme(darkModeOn)