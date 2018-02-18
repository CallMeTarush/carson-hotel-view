// $(".heading-compose").click(function() {
//   $(".side-two").css({
//     "left": "0"
//   });
// });

// $(".newMessage-back").click(function() {
//   $(".side-two").css({
//     "left": "-100%"
//   });
// });

// var type_of_hotel_user = "reception";

var hotelDatabase = firebase.database().ref('hotel/1');
hotelDatabase.on('value', function(snapshot) {

  window.snap = snapshot.val();
  // console.log(snap);
  user_id_list = snap.user_list;
  len = user_id_list.length;

  
  for (var i = len-1 ; i >= 0 ; i--) {
      
    x = snap.user_list[i];
    user_details = snap[x];

    var latest_timestamp = user_details.chats.reception[user_details.chats.reception.length-1].datetime;
    var latest_time = latest_timestamp.substring(11,16);


    if(i==len-1) {
        
        document.getElementById("roomNumbers").innerHTML+=`
        <div class="row sideBar-body selected" onClick="loadChat(`+i+`)" id="chat-selected-` + i +`">          
          <div class="col-sm-9 col-xs-9 sideBar-main">
            <div class="row">
              <div class="col-sm-8 col-xs-8 sideBar-name">
                <span class="name-meta">
                  ` + user_details.room_number + `
                </span>
              </div>
              <div class="col-sm-4 col-xs-4 pull-right sideBar-time">
                <span class="time-meta pull-right">
                  ` + latest_time + `
                </span>
              </div>
            </div>
          </div>
        </div>`;            
    }
    else {
    document.getElementById("roomNumbers").innerHTML+=`
    <div class="row sideBar-body" onClick="loadChat(`+i+`)" id="chat-selected-` + i +`">          
      <div class="col-sm-9 col-xs-9 sideBar-main">
        <div class="row">
          <div class="col-sm-8 col-xs-8 sideBar-name">
            <span class="name-meta">
              ` + user_details.room_number + `
            </span>
          </div>
          <div class="col-sm-4 col-xs-4 pull-right sideBar-time">
            <span class="time-meta pull-right">
              ` + latest_time + `
            </span>
          </div>
        </div>
      </div>
    </div>`;
    }
    

    chats = user_details.chats.reception;
    console.log(chats);
    
    if(i==len-1) {
      for (var j = 0, len_2 = chats.length; j < len_2; j++) {

        var chat_timestamp = chats[j].datetime;
        var chat_time = chat_timestamp.substring(11,16);

        if(chats[j].sender == 0) {
          document.getElementById("conversation").innerHTML+=`
          <div class="row message-body" style="margin-top:10px !important;">
            <div class="col-sm-12 message-main-receiver">
              <div class="receiver">
                <div class="message-text">
                `+ chats[j].message +`
                </div>
                <span class="message-time pull-right">
                `+ chat_time +`
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
                    ` + chats[j].message + `
                </div>
                <span class="message-time pull-right">
                  `+ chat_time +`
                </span>
              </div>
            </div>
          </div>`;
        }
      }
    }  
  }

    
});

function loadChat(counter_details) {

    $('.selected').removeClass('selected');
    $('#chat-selected-'+ counter_details).addClass('selected');

    document.getElementById("conversation").innerHTML='';
    
    x = snap.user_list[counter_details];
    user_details = snap[x];
    chats = user_details.chats.reception;
    
    
    for (var j = 0, len_2 = chats.length; j < len_2; j++) {
      var chat_timestamp = chats[j].datetime;
      var chat_time = chat_timestamp.substring(11,16);

    

        if(chats[j].sender == 0) {
    
            document.getElementById("conversation").innerHTML+=`
            <div class="row message-body" style="margin-top:10px !important;">
                <div class="col-sm-12 message-main-receiver">
                <div class="receiver">
                    <div class="message-text">
                    `+ chats[j].message +`
                    </div>
                    <span class="message-time pull-right">
                    `+ chat_time +`
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
                        ` + chats[j].message + `
                    </div>
                    <span class="message-time pull-right">
                    `+ chat_time +`
                    </span>
                </div>
                </div>
            </div>`;
        }
    }
}

