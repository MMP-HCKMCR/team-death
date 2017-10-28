$(document).ready(function() 
{

    if (getCookie("userId") != null && getCookie("userId") != "" ){
        $('#profile').append("<a href='/profile'> Profile </a>");        
        $('#signinout').append("<a id='signoutnow'> Sign Out </a>");
    }else{
        $('#signinout').append("<a href='/signin'> Sign in </a>");
    }

    $('#signoutnow').click(function() {
        document.cookie = 'userId=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        location.reload();        
    })    
});

function getCookie(cookiename) 
{
// Get name followed by anything except a semicolon
var cookiestring=RegExp(""+cookiename+"[^;]+").exec(document.cookie);
// Return everything after the equal sign, or an empty string if the cookie name not found
return decodeURIComponent(!!cookiestring ? cookiestring.toString().replace(/^[^=]+./,"") : "");
}

function setCookie(cookiename, val)
{
    document.cookie = cookiename + "=" + val + "; path=/";
}
