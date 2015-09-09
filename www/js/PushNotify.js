// SET UP PUSH NOTIFICATIONS
  var addCallback = function addCallback(key, callback) {
    if (window.pushCallbacks === undefined) {
        window.pushCallbacks = {}
    }
    window.pushCallbacks[key] = callback;
  };


  var pushNotification;
  pushNotification = window.plugins.pushNotification;

  if ( device.platform == 'android' || device.platform == 'Android' ) {
    pushNotification.register(
      successHandler,
      errorHandler, {
        "senderID":"<xxxxx>",
        "ecb":"onNotificationGCM"
      }
    );
  }
  else {
    pushNotification.register(
      tokenHandler,
      errorHandler, {
        "badge":"true",
        "sound":"true",
        "alert":"true",
        "ecb":"pushCallbacks.onNotificationAPN"
      }
    );
  }

  // result contains any message sent from the plugin call
  function successHandler (result) {
    console.log('result = ' + result);
    navigator.notification.alert(
      result,
      onConfirm,
      '<title of app>',
      'Dismiss'
    );
  }

  // result contains any error description text returned from the plugin call
  function errorHandler (error) {
    console.log('error = ' + error);
  }

  function tokenHandler (result) {

    var uuid = device.uuid;
    var platform = device.platform;
    console.log(platform);
    if (platform == 'iOS'){
      var os = 'ios';
    } else {
      var os = 'android';
    }
    hash = result+'<title of app>';
    hash = md5(hash);
    var xmlHttp = null;

    xmlHttp = new XMLHttpRequest();

    var url = '<title of app>/?token='+result+'&id='+uuid+'&hash='+hash+'&os='+os;
    console.log('URL IS: '+url);

    xmlHttp.open( "GET", url, false );

    xmlHttp.send( null );
    console.log(xmlHttp.responseText);
    addCallback('onNotificationAPN', onNotificationAPN);
    return xmlHttp.responseText;

  }

  // iOS
  function onNotificationAPN (event) {
    if ( event.alert ) {
      navigator.notification.alert(event.alert);
    }

    if ( event.sound ) {
        var snd = new Media(event.sound);
        snd.play();
    }

    if ( event.badge ) {
      pushNotification.setApplicationIconBadgeNumber(successHandler, errorHandler, event.badge);
    }

  }

  function receivedEvent(id) {
    navigator.notification.alert(
      id,
      onConfirm,
      '<title of app>',
      'Dismiss'
    );
  }

  function onConfirm(buttonIndex,id) {
  }