$(document).ready(function() {
    var userId = 0;
    var recipientId = 0;
    getUsers();

    function getUsers() {
        if(getCookie("userId") != null && getCookie("userId") != "" ){
            userId = getCookie("userId");
        }else{
            $(location).attr('href', '/signin')
        }
        if(getCookie("recipientId") != null && getCookie("recipientId") != "" ){
            recipientId = getCookie("recipientId");
        }
    }

    function getEventType(typeString) {
        switch (typeString) {
            case "Birthday":
                return 1
            case "Christmas":
                return 2;
            case "Valentines":
                return 3;
            default:
                return 4;
        }
    }
    $('#datePicker').hide();
    $('#timePicker').hide();  
    $('#inputEvent').change(function(){
        if ($(this).val() == "Specific Date" ){
            $('#datebPicker').hide();            
            $('#datePicker').show();
            $('#timePicker').hide();            
        }else if ($(this).val() == "Fixed time after death"){
            $('#datebPicker').hide();            
            $('#datePicker').hide();
            $('#timePicker').show();  
        }else if ($(this).val() == "Birthday"){
            $('#datebPicker').show();
            $('#datePicker').hide();            
            $('#timePicker').hide();  
        }else{
            $('#datebPicker').hide();
            $('#datePicker').hide();
            $('#timePicker').hide();  
        }        
    })



    function getMessages(){
        $.ajax({
            url: '/rest/api/recipients/'+recipientId+'/events',
            type:'GET',
            success: function(data)
            {
                $( "#recipientstable" ).empty();
                
                if(data["set"]["recordset"].length >= 1)
                {                
                    for(var i in data["set"]["recordset"]) {
                        obj= data["set"]["recordset"][i]
                        var date = obj["eventDate"]
                        if(date == "2017-01-01T12:00:00.000Z")
                        {
                            date = obj["minsAfterDeath"] + " Minutes after Death."
                        }
                        rows = "<tr><td>" + obj["messageText"] + "</td><td>" + date + "</td>"+
                        "<td><a class='btn btn-warning btn-sm pull-right messagesbutton' id='edit"+obj["eventId"]+"'data-toggle='modal' data-target='#myModal' >Edit</a>"+
                        "<a class='btn btn-danger btn-sm pull-right messagesbutton' id='delete"+obj["eventId"]+"'>Delete</a></td></tr>";
                        $(rows).appendTo("#recipientstable");
                        $('#delete'+obj['eventId']).unbind().bind('click', (e) => deleteMessage(e.target));
                        $('#edit'+obj['eventId']).unbind().bind('click', (e) => editMessage(e.target));
                        
                    }
                }                  
                else
                {
                    console.log("ERROR NO USER")               
                }             
            }, 
            failure: function(asd){}
        });
    }


    $('.message-submit').click(function()
    {           
        getUsers();
        var evType = getEventType($('#inputEvent').val());
        var date = "2017-01-01T12:00"
        var repeat = 0   
        var mad = 0  
        if(evType == 1)
        {
            date = 	$('#inputbDate').val()
            repeat = 1;
        }
        if(evType == 2)
        {
            date = '2017-12-25T12:00'
            repeat = 1;
        }
        if(evType == 3)
        {
            date = 	'2018-02-14T12:00'
            repeat = 1;            
        }
        if(evType == 4)
        {
            if ($('#inputEvent').val() == "Specific Date" ){
                date = 	$('#inputDate').val()
                repeat = +$('#inputRepeat').is(':checked');     
            }else if ($('#inputEvent').val() == "Fixed time after death"){
                var m = parseInt($('#inputMinutes').val())
                var h = parseInt($('#inputHour').val()) * 60
                var d = parseInt($('#inputDays').val()) * 60 * 24
                console.log(m + "," + d +","+ h)
                mad = m + h + d
            }         
        }
        var url = '/rest/api/events'
        var type = 'POST'
        if(eventId != -1)
        {
            url = '/rest/api/events/' + eventId
            type = 'PATCH'
        }
        $.ajax({
            url: url,
            type: type,
            data:
            {
                deceasedId: userId,  
                recipientId: recipientId,                                               
                messageText: $('#inputMessage').val(),                
                date: date,
                type: evType,     
                repeat: repeat,      
                sms: +$('#inputSMS').is(':checked'),      
                email: +$('#inputEmail').is(':checked'),
                twitter: 0,
                minsAfterDeath: mad
            },
            success: function(data)
            {
                console.log(data)
                if(data["set"]["rowsAffected"] == 1)
                {      
                    getMessages();
                    $("#addRecipForm").trigger('reset'); 
                }                  
                else
                {
                    console.log("ERROR INCORRECTVALUES")               
                }             
            }, 
        });
    }) 

    function deleteMessage(item){
        var url = '/rest/api/events/' + $(item).attr('id').replace("delete", "")
        console.log(url)
        $.ajax({
            url: url,
            type:'DELETE',
            success: function(data)
            {
                console.log(data)
                if(data["set"]["rowsAffected"] == 1)
                {      
                    getMessages();
                }                  
                else
                {
                    console.log("ERROR not deleted")               
                }             
            }, 
        });
    }
    function editMessage(item){
        $.ajax({
            url: '/rest/api/events/' + $(item).attr('id').replace("edit", ""),
            type:'GET',
            success: function(data)
            {
                if(data["set"]["recordset"].length >= 1)
                {                
                    var obj =  data["set"]["recordset"][0];
                    console.log(data["set"]["recordset"][0])
                    date = obj["eventDate"].substring(0,(obj["eventDate"]).length - 8);
                    eventId = obj["eventId"]                   
                    $('#inputDate').val(date)  
                    $('#inputbDate').val(date)                      
                    $('#inputMessage').val(obj["messageText"])  
                    $('#inputSMS').prop('checked', obj["sms"]);
                    $('#inputEmail').prop('checked', obj["email"]);
                    $('#inputRepeat').prop('checked', obj["annualRepeat"]);
                    
                    console.log(date)
                    if(obj["eventTypeId"] == 4)
                    {
                        if(date == "2017-01-01T12:00"){
                            $("#inputEvent").val("Fixed time after death").change()
                            $('#inputMinutes').val(obj["minsAfterDeath"])                      
                        }
                        else 
                        {
                            $("#inputEvent").val("Specific Date").change()
                        }
                    }else{
                        switch(obj["eventTypeId"]){
                        case 1:
                            $("#inputEvent").val("Birthday").change()                       
                        case 2:
                            $("#inputEvent").val("Christmas").change()                       
                        case 3:
                            $("#inputEvent").val("Valentines").change()                      
                        default :
                            $("#inputEvent").val("Birthday").change()                       
                        }
                        
                    } 
                    
                }                  
                else
                {
                    console.log("ERROR NO USER")               
                }             
            }, 
            failure: function(asd){}
        });
    }
        
    getMessages(); 
});