var $currentDay = $("#currentDay");
var $timeBlocks = $(".by-the-hour");
var $scheduleArea = $(".schedule");

var toDoItems = [];
 
var currentDate = moment().format("dddd, MMMM Do");
var currentHour = moment().format("H");

//setup an array of objects if you dont have a toDo setup
function initializeSchedule(){
//  console.log(toDoItems);

//for each hour block
  $timeBlocks.each(function(){
    var $thisBlock = $(this);
    var thisBlockHr = parseInt($thisBlock.attr("each-hour"));

    var todoObj = {
      hour: thisBlockHr,
      text: "",
    }
    toDoItems.push(todoObj);
  });

  //save the array of objects to local storage by stringifying it first
  localStorage.setItem("todos", JSON.stringify(toDoItems));
  //console.log(toDoItems);
}

//format timeblock colors depending on time
function setUpTimeBlocks(){
    $timeBlocks.each(function(){
      var $thisBlock = $(this);
      var thisBlockHr = parseInt($thisBlock.attr("each-hour"));

      if (thisBlockHr == currentHour) {
        $thisBlock.addClass("present").removeClass("past future");
      }
      if (thisBlockHr < currentHour) {
        $thisBlock.addClass("past").removeClass("present future");
      }
      if (thisBlockHr > currentHour) {
        $thisBlock.addClass("future").removeClass("past present");
      }
    });
}

function renderSchedule(){
  
  toDoItems = localStorage.getItem("todos");
  toDoItems = JSON.parse(toDoItems);

  //make a variable where [each-hour={hour}] then plug it in to the selector $('[each-hour={hour}')
  for (var i = 0; i < toDoItems.length; i++){
    var itemHour = toDoItems[i].hour;
    var itemText = toDoItems[i].text; 
   
    $("[each-hour=" + itemHour + "]").children("textarea").val(itemText);
  }

  console.log(toDoItems);
}

function saveHandler(){
  var $thisBlock = $(this).parent();

  var hourToUpdate = $(this).parent().attr("each-hour");
  var itemToAdd = (($(this).parent()).children("textarea")).val();

  //see which item we need to update based on the hour of the button clicked matching
  for (var j = 0; j < toDoItems.length; j++){
    if (toDoItems[j].hour == hourToUpdate){
      //set its text to what was added to textarea
      toDoItems[j].text = itemToAdd;
    }
  }
  localStorage.setItem("todos", JSON.stringify(toDoItems));
  renderSchedule();
}

// when the document loads
$(document).ready(function(){

  //format the timeblocks based on time
  setUpTimeBlocks();
  //if there's nothing for the toDos in local storage
  if(!localStorage.getItem("todos")){
    //start loading the array of objects
    initializeSchedule();
  }

  //display current date
  $currentDay.text(currentDate);

  renderSchedule();
  //save text, when a toDo item save button is clicked
  $scheduleArea.on("click", "button", saveHandler);
  
});
