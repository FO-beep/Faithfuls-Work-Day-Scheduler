// Variables named

var currentDate;
var currentTime;
var savedPlans;
var storedPlans;


var currentContainer;
var scheduleText = "";
var scheduleTime = "";


var plannedList = [];


// This section adds a Current Date and Time to the top of the Page Clock format is H

$(window).on("load", function () {
    currentDate = moment().format("dddd MMM Do YYYY, h:mm a");
    $("#currentDay").append(currentDate);
    currentTime = moment().format("H");

    function renderPlans() {
        savedPlans = JSON.parse(localStorage.getItem("plans"));
        if (savedPlans !== null) {
            for (i = 0; i < savedPlans.length; i++) {
                storedPlans = savedPlans[i];
                details = storedPlans.details;
                timeIndex = storedPlans.time;
                timeIndex = timeIndex.replace(":00", '');
                if (details !== null) {
                    $("#" + timeIndex).children('div').children('div').children('textarea').val(details);
                }
            }
        }
    }
    //This function allows the User's Input to be populated with the stored Data
    renderPlans();

    for (i = 0; i <= 23; i++) {
        CurrentContainer = i;
        if (currentTime == i) {
            $('#' + CurrentContainer).addClass("present");
            $('#' + CurrentContainer).children('div').children('div').children("textarea").addClass("present");
        }
        else if (currentTime > i) {
            $('#' + CurrentContainer).addClass("past");
            $('#' + CurrentContainer).children('div').children('div').children("textarea").addClass("past");
        }
        else {
            $('#' + CurrentContainer).addClass("future");
            $('#' + CurrentContainer).children('div').children('div').children("textarea").addClass("future");
        }
    }
})



$(".saveBtn").click(function () {
    scheduleText = $(this).parent('div').children('div').children('textarea').val();
    scheduleTime = $(this).parent('div').parent().attr("id");
    plans = {
        time: scheduleTime,
        details: scheduleText
    }
    plannedList = JSON.parse(localStorage.getItem("plans"));
    if (plannedList === null) {
        localStorage.setItem('plans', JSON.stringify([{ time: scheduleTime, details: scheduleText }]));
    }
    else {
        plannedList.push(plans);
        localStorage.setItem("plans", JSON.stringify(plannedList));

    }
    $(this).parent('div').children('div').children('textarea').replaceWith($('<textarea>' + scheduleText.addClass("textarea") + '</textarea>'));
})

//Clear buttin inorder to clear the local storage and refresh the page
$("#clear").click(function () {
    localStorage.clear();
    location.reload()
});






























