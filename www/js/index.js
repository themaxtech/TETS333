var pushNotification;
 
 // Setup push notifications:
try
{
    pushNotification = window.plugins.pushNotification;
    if ( device.platform == 'android' || device.platform == 'Android' || device.platform == "amazon-fireos" ){
    pushNotification.register(
    pushSuccessHandler,
    pushErrorHandler,
    {
        "senderID":"replace_with_sender_id",
        "ecb":"onNotification"
    });
	} else if ( device.platform == 'blackberry10'){
	    pushNotification.register(
	    pushSuccessHandler,
	    pushErrorHandler,
	    {
	        invokeTargetId : "replace_with_invoke_target_id",
	        appId: "replace_with_app_id",
	        ppgUrl:"replace_with_ppg_url", //remove for BES pushes
	        ecb: "pushNotificationHandler",
	        simChangeCallback: replace_with_simChange_callback,
	        pushTransportReadyCallback: replace_with_pushTransportReady_callback,
	        launchApplicationOnPush: true
	    });
	} else {
	    pushNotification.register(
	    tokenHandler,
	    pushErrorHandler,
	    {
	        "badge":"true",
	        "sound":"true",
	        "alert":"true",
	        "ecb":"onNotificationAPNS"
	    });
	}

}
catch(err)
{
    // For this example, we'll fail silently ...
    console.log(err);
    alert("deviceready error -->" + err);

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