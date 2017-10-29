$(document).ready(function() {
    
    var userId = 0;
    if(getCookie("userId") != null && getCookie("userId") != "" ){
        userId = getCookie("userId");
    }
    
    // $.get("/rest/api/deceased/"+userId+"/recipients", function(data, status){
    //     if(data["set"]["recordsets"].length >= 1)
    //     {                
    //         for(var i in data["set"]["recordset"]) {
    //             obj= data["set"]["recordset"][i]
    //             rows = "<tr><td>" + obj["firstName"] + " " + obj["lastName"] + "</td><td>" + obj["phone"] + "</td><td>" + 1 +
    //              "</td><td><a class='btn btn-success btn-sm pull-right messagesbutton' id='recipient"+obj["recipientId"]+"' href='/messages'>Show</a></td></tr>";
    //             $(rows).appendTo("#recipientstable");
    //             $('#recipient'+obj['recipientId']).unbind().bind('click', (e) => showMessages(e.target));
    //         }
    //     }                  
    //     else
    //     {
    //         console.log("ERROR NO USER")               
    //     }     
    // });

    function showMessages(item){
        setCookie('recipientId', $(item).attr('id').replace("recipient", ""))
    }

    function getRecipients(){
        $.ajax({
            url: '/rest/api/deceased/'+userId+'/recipients',
            type:'GET',
            success: function(data)
            {
                $( "#recipientstable" ).empty();
                
                if(data["set"]["recordset"].length >= 1)
                {                
                    for(var i in data["set"]["recordset"]) {
                        obj= data["set"]["recordset"][i]
                        rows = "<tr><td>" + obj["firstName"] + " " + obj["lastName"] + "</td><td>" + obj["phone"] + "</td><td>" + 1 +
                        "</td><td><a class='btn btn-success btn-sm pull-right messagesbutton' id='recipient"+obj["recipientId"]+"' href='/messages'>Show</a></td></tr>";
                        $(rows).appendTo("#recipientstable");
                        $('#recipient'+obj['recipientId']).unbind().bind('click', (e) => showMessages(e.target));
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


    $('.recipient-submit').click(function()
    {   
        $.ajax({
            url: '/rest/api/recipients',
            type:'POST',
            data:
            {
                deceasedId: userId,                                
                email: $('#inputEmail').val(),                
                firstName: $('#inputFirstName').val(),
                lastName: $('#inputLastName').val(),
                recipientNickName: $('#inputEmailReg').val(),                
                senderNickName: $('#inputEmailReg').val(),                                
                phone: $('#inputNumber').val(),
                twitter: $('#inputTwitter').val()
                
                
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
    getRecipients(); 
});