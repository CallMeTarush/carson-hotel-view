
window.current = '';
var hotelDatabase = firebase.database().ref('hotel/1');

function init() {
  

  hotelDatabase.once('value').then(function(snapshot) {

    document.getElementById("roomNumbers").innerHTML='';
    document.getElementById("conversation").innerHTML='';

    window.snap = snapshot.val();
    user_id_list = snap.user_list;
    len = user_id_list.length;

    
    for (var i = len-1 ; i >= 0 ; i--) {
        
      x = snap.user_list[i];
      user_details = snap[x];
      chats = user_details.chats.reception;
      
      document.getElementById("roomNumbers").innerHTML+=`
      <div class="row sideBar-body" onClick="loadChat(`+i+`)" id="chat-selected-` + i +`">          
        <div class="col-sm-9 col-xs-9 sideBar-main">
          <div class="row">
            <div class="col-sm-8 col-xs-8 sideBar-name">
              <span class="name-meta">
                ` + user_details.room_number + `
              </span>
            </div>
            
          </div>
        </div>
      </div>`;
      
      if(i==len-1) {
        for (const j of Object.keys(chats)) {
          
          var chat_timestamp = chats[j].datetime;
          addMessageText(chats[j].message,chat_timestamp,chats[j].sender);

        } 
        document.getElementById("display-room").innerHTML=user_details.room_number;
        scrollDown();
      }  
      
      $('#chat-selected-1').addClass('selected');

    }

    current = x;
  });

  


  console.log("gello");
  
}
function loadChat(counter_details) {
  
  $('.selected').removeClass('selected');
  $('#chat-selected-'+ counter_details).addClass('selected');

  document.getElementById("conversation").innerHTML='';
  
  x = snap.user_list[counter_details];
  
  current = x;
  user_details = snap[x];
  chats = user_details.chats.reception;
  
  console.log(user_details.room_number);
  document.getElementById("display-room").innerHTML=user_details.room_number;

  for (const j of Object.keys(chats)) {
    var chat_timestamp = chats[j].datetime;
    
    addMessageText(chats[j].message,chat_timestamp,chats[j].sender);
    
  }

  
  scrollDown();

  
}

function addMessageText(message,timestamp,sender) {

  var chat_time = timestamp.substring(11,16);
  var chat_day = timestamp.substring(8,10);
  var chat_month = timestamp.substring(5,7);

  if(sender == 0) {
    
    document.getElementById("conversation").innerHTML+=`
    <div class="row message-body" style="margin-top:10px !important;">
        <div class="col-sm-12 message-main-receiver">
        <div class="receiver">
            <div class="message-text">
            `+ message +`
            </div>
            <span class="message-time pull-right">
            `+ chat_day + '/' + chat_month + ' ' + `<b>` + chat_time +`</b>
            </span>
        </div>0
        </div>
    </div>`;

  } 
  else {

    document.getElementById("conversation").innerHTML+=`
    <div class="row message-body">
        <div class="col-sm-12 message-main-sender">
        <div class="sender">
            <div class="message-text">
              ` + message + `
            </div>
            <span class="message-time pull-right">
            `+ chat_day + '/' + chat_month + ' ' + `<b>` + chat_time +`</b>
            </span>
        </div>
        </div>
      </div>`;

    }
}

function sendMessage() {

  // console.log(current);

  

  var d = new Date();
  var date = d.toISOString();
  var message_send = document.getElementById("comment").value;
  
  if (message_send=="" || message_send==undefined) {
    alert("Please enter a message!");
  }

  else {
    var msgObject = { datetime: date, message: message_send, sender: 1};
    // console.log(msgObject,current);
    
    firebase.database().ref('/hotel/1/'+ current +'/chats/reception/').push(msgObject);

    user_details_reload = snap[current];
    chats= user_details_reload.chats.reception;

    
    
    document.getElementById("conversation").innerHTML='';
    // console.log(chats);

    for (const j of Object.keys(chats)) {

      // console.log(chats[j].message);
      var chat_timestamp = chats[j].datetime;
      addMessageText(chats[j].message,chat_timestamp,chats[j].sender);

    }

    scrollDown();
  }
  

}

function scrollDown() {
  var id = "conversation";
  var div = document.getElementById(id);
  $('#' + id).animate({
      scrollTop: div.scrollHeight - div.clientHeight
  }, 500);
}

init();





hotelDatabase.on('value', function(snapshot) {
    document.getElementById("roomNumbers").innerHTML='';
    
    window.snap = snapshot.val();
    user_id_list = snap.user_list;
    len = user_id_list.length;

    
    for (var i = len-1 ; i >= 0 ; i--) {
      
      document.getElementById("roomNumbers").innerHTML+='';

      x = snap.user_list[i];
      user_details = snap[x];
      chats = user_details.chats.reception;
      
      document.getElementById("roomNumbers").innerHTML+=`
      <div class="row sideBar-body" onClick="loadChat(`+i+`)" id="chat-selected-` + i +`">          
        <div class="col-sm-9 col-xs-9 sideBar-main">
          <div class="row">
            <div class="col-sm-8 col-xs-8 sideBar-name">
              <span class="name-meta">
                ` + user_details.room_number + `
              </span>
            </div>
            
          </div>
        </div>
      </div>`;
        
    }
});

