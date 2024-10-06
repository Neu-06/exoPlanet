
const divOptions = document.querySelector("#optionss");

document.addEventListener("click", function (event) {
    if(event.target.matches(".bi-list") && divOptions.classList.contains("invisible")){
        divOptions.classList.remove("invisible");
    }
    else {
        if (
            !divOptions.classList.contains("invisible") &&
            !event.target.matches(".nav-li") &&
            !event.target.matches(".navv")&&
            !event.target.matches("#optionss")&&
            !event.target.matches(".nav-a")
        ) {
          divOptions.classList.add("invisible");
        }
      }
});


function checkScreenWidth() {

    if (window.matchMedia("(max-width: 780px)").matches) {
        divOptions.classList.remove("options"); 
    } else {
        divOptions.classList.add("options");
    }
}

checkScreenWidth();

window.addEventListener("resize", checkScreenWidth);

