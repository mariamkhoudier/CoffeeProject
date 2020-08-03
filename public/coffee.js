
function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

async function showInfoFrom(url) {
  //document.getElementById("pageInfo").innerHTML;
  document.getElementById("pageInfo").style.backgroundColor = getRandomColor();
  document.getElementById("pageInfo").animate([
    // keyframes
    { transform: 'translateY(-100px)' },
    { transform: 'translateY(0px)' }
  ], {
    // timing options
    duration: 500,
    iterations: 1
  });
  var reponse = await fetch(url);
  document.getElementById("pageInfo").innerHTML = await reponse.text();
}

showInfoFrom("goole.com");

function whenClick(boxName, event) {
  event.currentTarget.style.transition="all .5s";
  event.currentTarget.style.transform="rotate(0deg)";
  event.currentTarget.style.backgroundColor = getRandomColor();
  [...event.currentTarget.parentElement.children].forEach(element => {
    if(element.id != event.currentTarget.id && element.id !="pageInfo") {
    element.style.display = 'none'//
    }
  });

  showInfoFrom(boxName);
}

whenClick();




console.log(... ["Wael","Emara"]);
console.log(["Wael","Emara"]);