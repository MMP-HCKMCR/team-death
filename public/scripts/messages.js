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
                        rows = "<tr><td>" + obj["messageText"] + "</td><td>" + date + "</td></tr>";
                        $(rows).appendTo("#recipientstable");
                        // $('#recipient'+obj['recipientId']).unbind().bind('click', (e) => showMessages(e.target));
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

        $.ajax({
            url: '/rest/api/events',
            type:'POST',
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
    getMessages(); 
});