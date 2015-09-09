//var pushNotification;
 
 // Setup push notifications:
try
{
    var pushNotification = window.plugins.pushNotification;
    if (window.device.platform == 'iOS') {
        // Register for IOS:
        alert("iOS Device");
        pushNotification.register(
            pushSuccessHandler,
            pushErrorHandler, {
                "badge":"true",
                "sound":"true",
                "alert":"true",
                "ecb":"onNotificationAPNS"
            }
        );
  
    }
    else {

    	alert("Device is not an iOS");

    }
}
catch(err)
{
    // For this example, we'll fail silently ...
    console.log(err);
    alert("deviceready error" + err);

}

/**
 * Success handler for when connected to push server
 * @param result
 */
var pushSuccessHandler = function(result)
{
    console.log(result);
    alert("Success" + result);
};
 
/**
 * Error handler for when not connected to push server
 * @param error
 */
var pushErrorHandler = function(error)
{
    console.log(error);
    alert("Error" + result);
};
 
/**
 * Notification from Apple APNS
 * @param e
 */
var onNotificationAPNS = function(e)
{
    // ...
    alert("Notification Received");
};