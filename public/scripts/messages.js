$(document).ready(function() {
    
    var userId = 0;
    if(getCookie("userId") != null && getCookie("userId") != "" ){
        userId = getCookie("userId");
    }
    var recipientId = 0;
    if(getCookie("recipientId") != null && getCookie("recipientId") != "" ){
        recipientId = getCookie("recipientId");
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
        $.ajax({
            url: '/rest/api/events',
            type:'POST',
            data:
            {
                deceasedId: userId,  
                recipientId: recipientId,                                               
                messageText: $('#inputMessage').val(),                
                date: $('#inputDate').val(),
                type: $('#inputType').val(),     
                repeat: 0,      
                SMS: $('#inputSMS').val(),      
                email: $('#inputEmail').val(),
                twitter: '@'            
                
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