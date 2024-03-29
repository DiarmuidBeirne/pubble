

var TurnNumber = 0;
var listOfpubNames = [];
var todaysPub;
var pubInputField;
var copyText;


window.onload = function startGame(){
   
    //generate todays pub from list TODO
    //todaysPub = Math.floor(Math.random() * pubs.length);
    todaysPub = 0;
    document.getElementById("pubPhoto").src = pubs[todaysPub].photo;
    pubInputField = document.getElementById("pubGuess");
    console.log("empty: " + pubInputField);
   
}

// pubInputField.addEventListener("keyup", function(event) {
//   // Number 13 is the "Enter" key on the keyboard
//   if (event.keyCode === 13) {
//     // Cancel the default action, if needed
//     event.preventDefault();
//     // Trigger the button element with a click
//     //document.getElementById("myBtn").click();
//     console.log("Enter Pressed!!")
//   }
// });

function autocomplete(inp) {
   
   for(i = 0; i < pubs.length; i++)
   {
        for(y = 0; y < pubs[i].names.length; y++){
            
            listOfpubNames.push(pubs[i].names[y]);
        }
   }
   console.log("List of Pub NAmes:");
   console.log(listOfpubNames);
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < listOfpubNames.length; i++) {
          /*check if the item starts with the same letters as the text field value:*/
          if (listOfpubNames[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            /*create a DIV element for each matching element:*/
            b = document.createElement("DIV");
            /*make the matching letters bold:*/
            b.innerHTML = "<strong>" + listOfpubNames[i].substr(0, val.length) + "</strong>";
            b.innerHTML += listOfpubNames[i].substr(val.length);
            /*insert a input field that will hold the current array item's value:*/
            b.innerHTML += "<input type='hidden' value='" + listOfpubNames[i] + "'>";
            /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function(e) {
                /*insert the value for the autocomplete text field:*/
                inp.value = this.getElementsByTagName("input")[0].value;
                /*close the list of autocompleted values,
                (or any other open lists of autocompleted values:*/
                closeAllLists();
            });
            a.appendChild(b);
          }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
          /*If the arrow DOWN key is pressed,
          increase the currentFocus variable:*/
          currentFocus++;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 38) { //up
          /*If the arrow UP key is pressed,
          decrease the currentFocus variable:*/
          currentFocus--;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 13) {
          /*If the ENTER key is pressed, prevent the form from being submitted,*/
          e.preventDefault();
          if (currentFocus > -1) {
            /*and simulate a click on the "active" item:*/
            if (x) x[currentFocus].click();
          }
        }
    });
    function addActive(x) {
      /*a function to classify an item as "active":*/
      if (!x) return false;
      /*start by removing the "active" class on all items:*/
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      /*add class "autocomplete-active":*/
      x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
      /*a function to remove the "active" class from all autocomplete items:*/
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    function closeAllLists(elmnt) {
      /*close all autocomplete lists in the document,
      except the one passed as an argument:*/
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
  }

  function onSubmit(event) {
    var guess = document.getElementById("pubGuess").value;
    //get the value submited

    var validGuess = false;
    var pubArrayLocation = 0;
    for(i = 0; i < pubs.length; i++)
   {
        for(y = 0; y < pubs[i].names.length; y++){
            if (guess == pubs[i].names[y]){
                validGuess = true;
                pubArrayLocation = i;
            }
            

        }
   }



document.getElementById("pubGuess").value = "";    //reset the guess value in the form.
if(validGuess == false){return false}; //validate the guess is a pub from the list of pubs.
    
    TurnNumber++; //increase the turnnumber with every go.
    var distance = getDistance(pubs[todaysPub].lat, pubs[todaysPub].long, pubs[pubArrayLocation].lat, pubs[pubArrayLocation].long)
    distance = Math.round(distance * 100 ) / 100;
    var units;
    if (distance < 1){
        distance = distance * 1000;
        units = "meters";
    }
    else
    {
        units = "km";
    }
    var tableRowID = "guess" + TurnNumber;
    var row = document.getElementById(tableRowID);
    // row.innerHTML = guess + " -  Distance: " + distance + " " + units;
    var icon = '<img src="pics/rejected.png" width="22" height="22" class="d-inline-block align-top" alt="">'
    if (pubs[todaysPub].lat == pubs[pubArrayLocation].lat && pubs[todaysPub].long == pubs[pubArrayLocation].long)
    {
      icon = '<img src="pics/placeholder.png" width="22" height="22" class="d-inline-block align-top" alt="">'

    }
    row.innerHTML = '<td colspan="5" class="pub-table-row">' + guess + '</td><td class="pub-table-row">' + icon + '</td><td colspan="2 class="pub-table-row">' + distance + " " + units + '</td> ';
    




    if (pubs[todaysPub].lat == pubs[pubArrayLocation].lat && pubs[todaysPub].long == pubs[pubArrayLocation].long)
    {
      var turnWord = " goes";
      if(TurnNumber == 1){turnWord = " go"};
      copyText = "I guessed today's Pub in " + TurnNumber + turnWord + "\nTry Pubble at https://pubble-game.herokuapp.com" 
      document.getElementById("aboveShareButton").innerHTML= "You got todays Pub in " + TurnNumber + turnWord;
        TurnNumber = 0;
        var winnerAlert = document.getElementById("winAlert");
        winnerAlert.style.display = "block";
        document.getElementById("inputDiv").style.display = "none";
       

    }
    if (TurnNumber == 5)
{
    
    var failAlert = document.getElementById("failAlert");
    var displayCorrectAnswer = document.getElementById("correctAnswer");
    failAlert.style.display = "block";
    displayCorrectAnswer.innerHTML = "Todays Pub was " + pubs[todaysPub].names[0];
    document.getElementById("inputDiv").style.display = "none";


    }
    
    
  }

  function copyStatusToClipboard()

  {
    console.log("button clicked ");
    navigator.clipboard.writeText(copyText).then(() => {
      // Alert the user that the action took place.
      // Nobody likes hidden stuff being done under the hood!
      alert("Copied: \n" + copyText + "\nTo your clipboard");
    });
  }
      


  function getDistance(lat1, lon1, lat2, lon2) 
    {
      var R = 6371; // km
      var dLat = toRad(lat2-lat1);
      var dLon = toRad(lon2-lon1);
      var lat1 = toRad(lat1);
      var lat2 = toRad(lat2);

      var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      var d = R * c;
      return d;
    }

    // Converts numeric degrees to radians
    function toRad(Value) 
    {
        return Value * Math.PI / 180;
    }