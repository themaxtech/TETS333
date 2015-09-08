 if (device.platform == 'android' || device.platform == 'Android') {
pushNotification.register(pushSuccessHandler, pushErrorHandler,{"senderID":"12345678901","ecb":"onNotificationGCM"});
} else {
pushNotification.register(pushTokenHandler, pushErrorHandler,{"badge":"true","sound":"true","alert":"true","ecb":"onNotificationAPN"});
}

function pushSuccessHandler(result) {
alert('result = ' + result);
}
function pushErrorHandler(error) {
alert('error = ' + error);
}
function pushTokenHandler(result) {
alert('iOS device token = ' + result);
}
