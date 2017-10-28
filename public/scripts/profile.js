$(document).ready(function() {
    
    var userId = 0;
    if(getCookie("userId") != null && getCookie("userId") != "" ){
        userId = getCookie("userId");
    }
        
    $('.signin-submit').click(function()
    {   
        $.ajax({
            url: '/rest/api/user/' + userId,
            type:'get',
            data:
            {
                email: $('#inputEmail').val()
            },
            success: function(data)
            {
                
            }, 
        });
    })
});