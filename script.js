//
//DATES
//

//compose data format for full today date
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1;
var yyyy = today.getFullYear();
 if(dd<10){
        dd='0'+dd
    }
    if(mm<10){
        mm='0'+mm
    }

//function for adding, removing days - to work across months and years
Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

var date = new Date();

//composing today+7
var ddPlus7 = date.addDays(7);
var dd7 = ddPlus7.getDate();
var mm7 = ddPlus7.getMonth()+1;
var yyyy7 = ddPlus7.getFullYear();

if(dd7<10){
       dd7='0'+dd7
   }
   if(mm7<10){
       mm7='0'+mm7
   }

//composing today-7
var ddMinus7 = date.addDays(-7);
var ddM7 = ddMinus7.getDate();
var mmM7 = ddMinus7.getMonth()+1;
var yyyyM7 = ddMinus7.getFullYear();

if(ddM7<10){
          ddM7='0'+ddM7
      }
  if(mmM7<10){
          mmM7='0'+mmM7
      }

//taking all dates together
var maxDate = yyyy7+'-'+mm7+'-'+dd7;
var fullDate = yyyy+'-'+mm+'-'+dd;
var minDate = yyyyM7+'-'+mmM7+'-'+ddM7;


//setting attributes of data form input
document.getElementById("date").setAttribute("min", minDate);
document.getElementById("date").setAttribute("max", maxDate);

//
//FUNTIONS TO STORE SELECTED MOVIE, TIME AND DATE IN LOCALSTORAGE
//

//store movie
function storeMovie(){
    var inputMovie= document.getElementById("movie");
    localStorage.setItem("movie", inputMovie.value);
  }

var storedMovie = localStorage.getItem("movie");

//store date
function storeDate(){
    var inputDate= document.getElementById("date");
    localStorage.setItem("date", inputDate.value);
  }

var storedDate = localStorage.getItem("date");

//store time
function storeTime(){
    var inputTime= document.getElementById("time");
    localStorage.setItem("time", inputTime.value);
  }


var storedTime = localStorage.getItem("time");

//storing ID of time - 24h format of selected time - for comparing later
function storeTimeId(){
    var a = parseInt(localStorage.getItem('time'))
    if(a<10){
      a+=12
    }
    return a
}

//getting current selected date from localstorage
function takeOutTime(){
  return document.getElementById("date").value;
}

//setting text according to chosen time and date - it its already gone, then it will write "was"

function willWas(){
    if (fullDate > takeOutTime() || (fullDate == takeOutTime() && new Date().getHours() >= storeTimeId())){
      var a = "was"
  }else{
      var a = "will be"
  }
  return a
}

//getting values from LS
function getSavedValue  (v){
  if (!localStorage.getItem(v)) {
      return "";
    }
      return localStorage.getItem(v);
}

//setting values from LS, that after refresh it will be still chosen
document.getElementById("movie").value = getSavedValue("movie");
document.getElementById("date").value = getSavedValue("date");
document.getElementById("time").value = getSavedValue("time");

//composing info text above seats table
document.getElementById('info').innerHTML = "You selected "+ storedMovie + " which "+willWas()+" played " +storedDate+ " at "+storedTime;

//
//SEATS TABLE AND ITS FEATURES
//ALL THE LOGIC BEHIND LS
//

//saving cells into variable
var c = document.querySelectorAll("td")

//assigning click funtion to every cell of the main table, when you click on empty cell,
//color appears, when BOOKED color appears, user cant click and change it anymore

function toAllCells(){
  for (var i = 3; i < 103; i++) {
    c[i].addEventListener('click', function(){ //the variable c[i] will change according to active ID on the table
      if(willWas() == "will be"){
      if (this.style.backgroundColor == "rgb(244, 91, 105)") {
        //
      }else if(this.style.backgroundColor == ""){
        this.style.backgroundColor = '#028090'
      }else{
        if(this.style.backgroundColor == "rgb(2, 128, 144)"){
          for (var j = 0; j < 200; j++) {
            if (localStorage.getItem('try'+j) != null){
            var a = JSON.parse(localStorage.getItem('try'+j))
            if((this.innerHTML == a.seat) && (mainTable.id == a.table)){
              localStorage.removeItem("try"+j)
      }
    }
  }
}        this.style.backgroundColor = ""
}
}})}}

//function which hides RESERVE button(button1), SEATS table(table1), SEATS color guide(table0) and INFO(info)
//until you choose some combination of available movie, seats and time
//it also shows alert (alert) - changes it content - to alert user that he needs to chose something to continue

function hideTheTable(){
    if(!localStorage.getItem('hideTableFlag')){
      document.getElementsByTagName('table')[0].style.visibility = "hidden"
      document.getElementsByTagName('table')[1].style.visibility = "hidden"
      document.getElementsByTagName('button')[0].style.visibility = "hidden"
      document.getElementById('screen').style.visibility = "hidden"
      document.getElementsByTagName('hr')[0].style.visibility = "hidden"


      if(!document.getElementById('movie').value == "" && !document.getElementById('date').value == "" && !document.getElementById('time').value == ""){
        localStorage.setItem('hideTableFlag', true);
        document.getElementsByTagName('table')[0].style.visibility = "visible"
        document.getElementsByTagName('table')[1].style.visibility = "visible"
        document.getElementsByTagName('button')[0].style.visibility = "visible"
        document.getElementById('screen').style.visibility = "visible"
        document.getElementsByTagName('hr')[0].style.visibility = "visible"
        localStorage.removeItem('alert');
        localStorage.setItem('dontAlert', true);

    }
}
//this could make an alert, when there was a button to proceed in choosing seats
//decided to not apply this due to UX/UI

        // if(!localStorage.getItem('alert') && !localStorage.getItem('dontAlert')){
        //       localStorage.setItem('alert', true)
        // }else if (!localStorage.getItem('dontAlert')){
        //       document.getElementById('alert').innerHTML = 'Choose some session please'
        //       document.getElementById('alert').style.color = 'red'
        //       document.getElementById('alert').style.fontSize = '25px';
        //
        //
        //     }
}


//alerts user that he chose past or ongoing session
function alert(){
  if (willWas() == "was" && document.getElementById('info').innerHTML.length > 47) {
    document.getElementById('info1').innerHTML = "You can't book past or ongoing sessions"
    document.getElementById('info1').style.color = 'red'
    document.getElementById('info1').style.fontSize = '25px';
  }
}

//when you choose some seats and reserve them, it saves the reserved ones to the localstorage
function saveRed(){
  for (var i = 3; i < 103; i++) {
    var trySeat = c[i].innerHTML
    if(c[i].style.backgroundColor == '#028090'){

  }
    for (var j = 0; j < localStorage.length+1; j++) {
      if((localStorage.getItem('try'+j)) != null){
      if ((JSON.parse(localStorage.getItem('try'+j)).seat == trySeat) && (mainTable.id == JSON.parse(localStorage.getItem('try'+j)).table)){
        localStorage.setItem("try"+j, JSON.stringify({
          table: mainTable.id,
          seat: c[i].innerHTML,
          color: "rgb(244, 91, 105)"
        }))

    }

    }
  }
}
}

//saving all tables into variable, saving main one into variable
var tableId = document.getElementsByTagName('table')
var mainTable = tableId[1]


//when you click on the cell this saves the click into localstorage, when you refresh it holds the chosen seats,
//its also needed to have this function to "recolor" them to BOOKED

function clickAndSave(){
  for (var i = 3; i < 103; i++) {
    c[i].addEventListener('click', function(){
      if(this.style.backgroundColor != ""){
      localStorage.setItem("try"+(localStorage.length+1), JSON.stringify({ //here instead of table 1 would be cureently active table ID - which somehow will be generated from sumbit above
          table: mainTable.id,
          seat: this.innerHTML,
          color: this.style.backgroundColor
      }));
  }})
}
}


//list I save already selected seats
var newColor = [];

//function pushing already selected seats into list
function pushingIn(){
  for (var i = 1; i <= localStorage.length; i++) {
    if (localStorage.getItem('try'+i) != null){
        var push = JSON.parse(localStorage.getItem("try"+i));
        newColor.push(push);
      }else{
          //
      }

}}

//this function is assigning color to correct combination of movie, time and date and correct seat
//taking items from the list and comparing them to active items

function gettingOut(){
  for (var i = 0; i < newColor.length; i++) {
  var trySeat = newColor[i].seat

  for (var j = 3; j < 103; j++) {
      if ((c[j].innerHTML == trySeat) && (mainTable.id == newColor[i].table)){
        c[j].style.backgroundColor = newColor[i].color
  }

}}}

//
//
// DATE, TIME, MOVIE LOCAL STORAGE...
//
//


//this function makes combination item in LS
//combination consists of storedMovie,storedDate and storedTime

function makeId(){
  if(storedDate != null){
    if (dontCopy()) {
      localStorage.setItem("combination"+(localStorage.length+1), JSON.stringify({
          movie: storedMovie,
          date: storedDate,
          time: storedTime
      }));
    }
}}

//this function makes copy of currently active combination to test it with other items
function duplicityItem(){
  if(storedDate != null){
  localStorage.setItem("test", JSON.stringify({
      movie: storedMovie,
      date: storedDate,
      time: storedTime
  }));
}}


//this function sets new number every time
function setId(){
  var a = localStorage.length+1
  return a
  }


//this function copies the copied item and return it
function takeId(){
  var a = []
  for (var i = 0; i <= localStorage.length; i++) {
      if (localStorage.getItem('copiedItem'+i) != null){
         a.push(JSON.parse(localStorage.getItem('copiedItem'+i)))
      }
  }
  return a
}

//if copiedItem matches the currently active it return its ID
function testId(){
  for (var i = 0; i < takeId().length; i++) {
    if(takeId()[i].movie == storedMovie && takeId()[i].date == storedDate && takeId()[i].time == storedTime){
      var actualId = takeId()[i].id
    }
  }
  return actualId
}


//changes table1 id according to testID()
//it can then load colors and items based on combination of items

function changeTableId(){
  document.getElementById('table1').id = testId();
}


//if there is combination on that position and it was not ever used, it copies the item and sets ID to the - setId()
function copyItem(){
  for (var i = 0; i <= localStorage.length; i++) {
    if (localStorage.getItem('combination'+i) != null && dontCopy()){
      localStorage.setItem("copiedItem"+(localStorage.length+1), JSON.stringify({ //here instead of table 1 would be cureently active table ID - which somehow will be generated from sumbit above
          movie: storedMovie,
          date: storedDate,
          time: storedTime,
          id: setId()
      }))
      }
  }
}


//check if currently active combination matches any combination saved into LS
function dontCopy(){
  for (var i = 0; i < localStorage.length; i++) {
    if(localStorage.getItem('combination'+i) == localStorage.getItem("test")){
      return false
    }
  }
  return true
}

//code is built to belong on lenght of this property, but I decided to hide this text, becouse of UX/UI - not necessary, redundant
document.getElementById('info').style.visibility = "hidden"


toAllCells();

clickAndSave();

hideTheTable();

alert();

pushingIn();

makeId();

duplicityItem();

makeId();

copyItem();

changeTableId();

gettingOut();
