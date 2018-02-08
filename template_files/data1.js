

var meeting = {name:"", date:"", creator:"", stime:"HH:MM", etime:"HH:MM", timeSlots:[]};

var data;
var creator = "";
var event_name = "";
var date = "";
var stime = "";
var etime = "";


function exportData()
{
    console.log(driver.meetings.join(','));
    console.log(driver.numMeetings);
    console.log(driver.meetings[0].creator);
    console.log(driver.meetings[0].name);
}

function eventSubmit()
{
    populateData();
    tryCreate();
}

function populateData()
{
    data = document.forms["eventMaker"];

    creator = data["admin"].value;
    event_name = data["event"].value;
    date = data["date"].value;
    stime = data["stime"].value;
    etime = data["etime"].value;
}


//CREATION CONSTRAINTS
function checkDate()
{
    console.log("Entered CheckDate()");
    console.log(date);
    console.log(date.slice(5,7) + "/" + date.slice(8,10));
    if(date.slice(5,7) == 01 && date.slice(8,10) == 01)
    {
        alert("No meetings permitted to be scheduled on New Year's Day.");
        return (false);
    }
    if(date.slice(5,7) == 07 && date.slice(8,10) == 04)
    {
        alert("No meetings permitted to be scheduled on Independence Day.");
        return (false);
    }
    if(date.slice(5,7) == 12 && date.slice(8,10) == 25)
    {
        alert("No meetings permitted to be scheduled on Christmas Day.");
        return (false);
    }
    console.log("Date does not violate holiday constraints *DBG");
    return (true);
}

function checkTime() // where time is HH:MM && time1 is begin, time2 is end
{
    //Check for timeslot compliance.

    console.log("Entered checkTime()");
    //this means they are attempting to request a time from the next day which is disallowed.
    if(etime < stime)
    {
        alert("Meeting may not extend into next calendar day.");
        console.log("User attempted to set end time for calendar day that is not same as start time calendar day.");
        return (false);
    }
    return (true);
}

//DUPLICATE CHECK

//this will check for duplicate persons when the event is created. Will have to
//code another way to account for this for other cases.
function dupPersons()
{
    console.log("entered dupPersons(data1.js:78)");
    if(driver.numPersons == 0) return (false);
    for(i = 0; i < driver.numPersons; i++)
    {
        if(driver.knownPersons[i].firstname == creator)
        {
            console.log("Person already exists, not adding to knownPersons[] *DBG");
            return(true);
        }
        else
        {
            console.log("New person does not exist, new person created.");
            return (false);
        }
    }
}
function dupMeet()
{
    for(i = 0; i < driver.numMeetings; i++)
    {
        if(driver.meetings[i].event_name == name && driver.meetings[i].date == date && driver.meetings[i].creator == creator)
        {
            alert("This event has already been created!");
            console.log("Duplicat event detected *DBG");
            return(true);
        }
        else
        {
            console.log("Passed duplicate meeting check.");
            return(false);
        }
    }
}

function tryCreate()
{
    if(!checkDate())
    {
        alert("Please fix date error(s) and resubmit.");
        console.log("Date constraints failed *DBG");
        return (false);
    }
    else if(!checkTime())
    {
        alert("Please fix timer error(s) and resubmit.");
        console.log("Time constraints failed *DBG");
        return (false);
    }
    else if(dupMeet())
    {
        alert("Meeting already exists, unable to create duplicate.");
        console.log("Event not created.");
    }
    else
    {
        console.log("Attempting to call driver.addMeeting()");
        driver.addMeeting();
        console.log(driver.meetings[0].name);
        console.log(driver.meetings[0].date);
        console.log(driver.meetings[0].stime);
        console.log(driver.meetings[0].etime);
        /*
        console.log("Attempting driver.meetings.push()");
        console.log("current number of meetings: " + driver.numMeetings);
        driver.meetings.push(meeting = {name:, date:date, creator:creator, stime:stime, etime:etime});
        driver.numMeetings++;
        console.log("driver.numMeetings incremented. New numMeetings: " + driver.numMeetings);
        console.log(driver.meetings[0].name);
        console.log(driver.meetings[0].date);
        console.log(driver.meetings[0].stime);
        console.log(driver.meetings[0].etime);
        return (true);*/
    }
}




/*
class Rect
{
    constructor(x,y)
    {
        this.xyz = stuff;
        this.sdfsdf = asdfsadf;
    }
}


var rect1 = new Rect();
*/


//driver stuff
/*
function instantDriver()
{
    var driver =
    {
        meetings    : [],
        numMeetings : 0,
        knownPersons: [],
        numPersons  : 0,
        addMeeting  : function()
        {
            var meeting =
            {
                 name:event_name,
                 date:date,
                 creator:creator,
                 stime:stime,
                 etime:etime,
                 timeSlots:[],
                 numTimeSlots:0,
                 attendees:[],
                 numAttend:1
            };

            var timeslot =
            {
                tsStime:"12:00",
                tsEtime:"12:20",
                attendees:[],//if person is in this array, they are available for this timeslot in the meeting
                numAttendees:0
            };

            this.meetings.push(meeting);

            this.numMeetings++;
            console.log("Perparing to enter dupPersons(html:45)");
            console.log(dupPersons());
            if(!dupPersons())
            {
             //creates a person for the driver's knownPersons array.
             var person =
             {
                 firstname:creator,
                 lastname:""
                 console.log(creator);
             };

             this.knownPersons.push(person);
             console.log(person.name + "Added to persons[] *DBG");
             this.knownPersons++;
            }


            var startHr = Number(stime.slice(0, 2));
            var startMin = Number(stime.slice(3, 5));
            var endHr = Number(stime.slice(0, 2));
            var endMin = Number(stime.slice(3, 5));
            var deltaHr = endHr - startHr;
            var deltaMin = endMin - startMin;
            var totalMins = deltaMin + (deltaHr * 60);
            var numTimeslots = totalMins / 20;


        }
    }
    console.log("driver instantiated. *DBG");
    return(true);
}
*/