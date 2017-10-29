$(document).ready(function() {
    var userId = 0;
    var recipientId = 0;
    getUsers();

    function getUsers() {
        if(getCookie("userId") != null && getCookie("userId") != "" ){
            userId = getCookie("userId");
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


    $('#actionType').change(function(){
        console.log("adasdas");
        if ($(this).val() == "Custom" || $(this).val() == "Birthday"){
            $('#datePicker').show();
        }else{
            $('#datePicker').hide();
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
                        rows = "<tr><td>" + obj["messageText"] + "</td><td>" + obj["eventDate"] + "</td><td>" + 1 +
                        "</td><td><a class='btn btn-success btn-sm pull-right messagesbutton' id='recipient"+obj["recipientId"]+"' href='/messages'>Show</a></td></tr>";
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
        $.ajax({
            url: '/rest/api/events',
            type:'POST',
            data:
            {
                deceasedId: userId,  
                recipientId: recipientId,                                               
                messageText: $('#inputMessage').val(),                
                date: $('#inputDate').val(),
                type: evType,     
                repeat: 0,      
                sms: +$('#inputSMS').is(':checked'),      
                email: +$('#inputEmail').is(':checked'),
                twitter: 0,
                minsAfterDeath: 0
            },
            success: function(data)
            {
                console.log(data)
                if(data["set"]["rowsAffected"] == 1)
                {      
                    getRecipients();
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