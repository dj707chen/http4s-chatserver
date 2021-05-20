var chatMulti = {}; // Namespace

chatMulti.createWs = function(user) {
	"use strict";
    // copied from chat.js connect()
    var url = new URL('/ws/' + user, 'ws://localhost:8080');
    var ws = new WebSocket(url.href);
    ws.onopen = function(evt) {
        console.log(user + ' - Connection established');
    };

    ws.onclose = function(evt) {
        console.log(user + ' - Disconnected from server');
    };

    ws.onmessage = function(evt) {
        // KeepAlive messages have no content
        if (evt.data !== '') {
            console.log(user + ' - ' + evt.data);
        }
        else {
            console.debug(user + ' - KeepAlive received');
        }
    };

    ws.onerror = function(evt) {
        console.log(  user + ' - There was a communications error, check the console for details');
        console.error(user + ' - WebSocket Error', evt)
    }
	return ws
};

// Called from chat.js line 64 after chat.connect()
chatMulti.createWsList = function(userBase) {
    var grp = userBase + Math.floor(Date.now() % 1000);

    chatMulti.wsList = []
    for (idx=0; idx<10; idx++) {
      chatMulti.wsList[idx] = chatMulti.createWs(grp + '_' + idx)
    }
}
