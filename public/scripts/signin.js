$(document).ready(function() {

    if(getCookie("userId") != null && getCookie("userId") != "" ){
        $(location).attr('href', '/')
        //todo add warning saying you are logged in        
    }
        
    $('.signin-submit').click(function()
    {   
        $.ajax({
            url: '/rest/api/login',
            type:'POST',
            data:
            {
                email: $('#inputEmail').val()
            },
            success: function(data)
            {
                if(data["set"]["recordset"].length >= 1 && ('#inputPassword').length >= 8)
                {                
                    console.log(data["set"]["recordset"][0]["deceasedId"])
                    var userId = data["set"]["recordset"][0]["deceasedId"]
                    setCookie("userId", userId)                    
                    $(location).attr('href', '/')
                }                  
                else
                {
                    console.log("ERROR NO USER")               
                }             
            }, 
        });
    })

    $('.register-submit').click(function()
    {   
        $.ajax({
            url: '/rest/api/deceased',
            type:'POST',
            data:
            {
                firstName: $('#inputFirstName').val(),
                lastName: $('#inputLastName').val(),
                email: $('#inputEmailReg').val(),                
                phone: $('#inputNumber').val()
                
            },
            success: function(data)
            {
                console.log("adasda");
                if(data["set"]["recordset"].length >= 1)
                {                
                    console.log(data["set"]["recordset"][0]["deceasedId"])
                    var userId = data["set"]["recordset"][0]["deceasedId"]
                    document.cookie = "userId=" + userId + "; path=/";
                    $(location).attr('href', '/')
                }                  
                else
                {
                    console.log("ERROR INCORRECTVALUES")               
                }             
            }, 
        });
    })       

});