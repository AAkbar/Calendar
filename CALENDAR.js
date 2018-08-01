const CALENDAR = function IIFE($){
//    variables
    var date = new Date();
    var dayOfMonth = date.getDate();
    var year = date.getFullYear();
    var month = date.getMonth();
    var dayOfWeek = date.getDay();
    var numOfDays = new Date(year, month + 1, 0).getDate();
    var firstDay = new Date(year, month, 1).getDay();
    var days = ["Sun" ,"Mon", "Tue", "Wed", "Thr", "Fri", "Sat"];
    var monthNames = ["Jan", "Feb", "Mar", "April", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var counter = 1;
    var mandatoryMonth = month;
    //    DOM varibales
    var cal = $("#Calendar");
    var head = $("#dds"); 
    var next = $("#gth");
    var previous = $("#lth");
    var reset = $("#rst");
    var nextDate = $("#nextDate");
    var previousDate = $("#previousDate");
    

    //    API OBJECT
    var objCal = { 
        createCalendar: function(){

            dispCalendar();
            highlightTheDate();

            //    EventHandlers
            $(next).on("click", nxtMonth);
            $(previous).on("click", prvMonth);
            $(nextDate).on("click", nextDatefunc);
            $(previousDate).on("click", previousDatefunc);
            $(reset).on("click", resetCal);
        }
    };


    return objCal;

//************************************
//    Function-Declarations Goes Here 
//************************************

//    Calendar view
    function dispCalendar(){

        createRows();
        //  HEAD OF CALENDAR   
        $(head).text(monthNames[month] + " " + year);
    }
    function nxtMonth(){
        date.setMonth(Number(date.getMonth()) + 1);
        date.setDate(1);
        restCode();
    }
    function prvMonth(){
        date.setMonth(Number(date.getMonth()) - 1);
        date.setDate(1);
        restCode();
    }
    function nextDatefunc(){
        date.setDate(date.getDate() + 1);
        restCode();
    }
    function previousDatefunc(){
        date.setDate(date.getDate() - 1);
        restCode();
    }
    function resetCal(){
        date = new Date();
        restCode();
    }
    function restCode(){
        dayOfMonth = date.getDate();
        year = date.getFullYear();
        month = date.getMonth();
        dayOfWeek = date.getDay();
        numOfDays = new Date(year, month + 1, 0).getDate();
        firstDay = new Date(year, month, 1).getDay();
        if(mandatoryMonth != month){
            toggleVisibility();
            mandatoryMonth = month;
            setTimeout(function(){
                nullifyTable();
                createRows();
                $(head).text((monthNames[month] + " " + year));
                highlightTheDate();
            }, 500)
        }else{
            nullifyTable();
            createRows();
            $(head).text((monthNames[month] + " " + year));
            highlightTheDate();
        }
    }
    function highlightTheDate(){
        var td = $("td");

        $.each(td, function(ind, ele, arr) {
            if($(ele).text() == dayOfMonth){
                $(ele).css({background: "green"});
            
            }
        });
      
    }
    function nullifyTable(){
        $(cal).html(" ");
    }
    //    rowCreation
    function createRows(){
        var tr = document.createElement("tr");
        var td;

        //      creating daysOfWeek
        for(let i = 0; i < 7; i++){
            td = document.createElement("td");
            $(td).html(days[i]);
            $(tr).append(td);
        }
        $(cal).append(tr);

        tr = document.createElement("tr");

        //      creating empty spaces
        for(var i = 0; i < 7; i++){
            if(i === firstDay){
                break;
            }
            td = document.createElement("td");
            $(td).text(" ");  
            $(tr).append(td);
        }

        //        Numbering the calendar the first row
        for(; i < 7; i++){
            td = document.createElement("td");
            $(td).text(counter);  
            $(tr).append(td);
            counter++;
        }
        $(cal).append(tr);

        //        Creating the rest of calendar
        for(let i = 2; i < 7; i++){
            tr = document.createElement("tr");
            for(let i = 0; i < 7; i++){
                td = document.createElement("td");
                $(td).text(counter);  
                $(tr).append(td);
                counter++; 
                if(counter > numOfDays){
                    break;
                }
            }
            $(cal).append(tr);
            if(counter > numOfDays){
                    break;
            }
        }
        counter = 1;
    }
    function toggleVisibility(){
        $(cal).clearQueue().fadeToggle(500);
        $(cal).fadeToggle(500, function(){
            $(this).show().css("opacity", "1");
        });
        
    }
}(jQuery);
// IIFE closes Here

//ExecuteAbleCodes
CALENDAR.createCalendar();




















