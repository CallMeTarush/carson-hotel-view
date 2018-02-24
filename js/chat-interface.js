window.width = $(window).width();


window.current = '';
window.snap = '';
window.checker = 0;
window.done_id = '';
var hotelDatabase = firebase.database().ref('hotel/1');

$(window).on('load', function () {
    
  init();
  
});


function init() {
  


  hotelDatabase.once('value').then(function(snapshot) {

    
    document.getElementById("roomNumbers").innerHTML='';
    document.getElementById("conversation").innerHTML='';

    snap = snapshot.val();
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
      
      loadTasks(user_details);

      done_id = x;

      

    if(width>=768) {
      $('#chat-selected-1').addClass('selected');
      
    }
    else {
      $('.bhenchod').css('display','none');
    }
      $('#chat-selected-1').addClass('check-selected');
    }

    loadChat(len-1);
    loadIncomplete();

  });

  // console.log("gello");  
}
function loadChat(counter_details) {
  // console.log(width);
  if(width<768) {
    $('.selected').removeClass('selected');
    
    $('#the-left-side').removeClass('col-xs-12');
    $("#the-left-side").css("display", "none"); 
    $('#the-right-side').addClass('col-xs-12');
    $('#the-right-side').css("display","block");
    // console.log("fuck");
    
  }
  else {
    $('.selected').removeClass('selected');
    $('#chat-selected-'+ counter_details).addClass('selected');
  }
  if($('#chat-selected-'+ counter_details).hasClass("new")) {
    $("#chat-selected-"+ counter_details).removeClass("new");
  }

  $('.check-selected').removeClass('check-selected');
  $('#chat-selected-'+ counter_details).addClass('check-selected');
  

    document.getElementById("conversation").innerHTML='';
    
    x = snap.user_list[counter_details];
    
    current = x;
    user_details = snap[x];
    chats = user_details.chats.reception;
    
    // console.log(user_details.room_number);
    document.getElementById("display-room").innerHTML=user_details.room_number;

    for (const j of Object.keys(chats)) {
   
      var chat_timestamp = chats[j].datetime;
      addMessageText(chats[j].message,chat_timestamp,chats[j].sender);      
   
    }

  
  // console.log(current);
  
  scrollDown();

  var Id = $('.choice-selected').attr('id');
  
  if(Id === "incomplete") {
    loadIncomplete();
  }
  if(Id === "complete") {
    loadComplete();
  }
  if(Id === "all") {
    loadAll();
  }

  setTimeout(function(){
    $('.loader').fadeOut();
  }, 200);  
}

function addMessageText(message,timestamp,sender) {

  var myDate = new Date(timestamp);
  
  var formatedTime=myDate.toJSON();
  
  
  var chat_time = formatedTime.substring(11,16);
  var chat_day = formatedTime.substring(8,10);
  var chat_month = formatedTime.substring(5,7);

  // console.log(chat_time,chat_day,chat_month);
  
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
        </div>
        </div>
    </div>`;

  } 
  
  else if(sender == 1) {

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

  
  

  var date = firebase.database.ServerValue.TIMESTAMP;
  var message_send = document.getElementById("comment").value;
  
  if (message_send=="" || message_send==undefined) {
    alert("Please enter a message!");
  }

  else {
    var msgObject = { datetime: date, message: message_send, sender: 1};
    

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
    document.getElementById("comment").value = "";
    scrollDown();
  }

  checker += 1;

}

function scrollDown() {
  var id = "conversation";
  var div = document.getElementById(id);
  $('#' + id).animate({
      scrollTop: div.scrollHeight - div.clientHeight
  }, 500);
}



function backPressed() {
  $('#the-right-side').removeClass('col-xs-12');
  $("#the-right-side").css("display", "none"); 
  $('#the-left-side').addClass('col-xs-12');
  $('#the-left-side').css("display","block");
  
  // console.log("fuck");
}



  // console.log(checker);
  hotelDatabase.on('value', function(snapshot) {
    
    // console.log("value changed");
    // console.log(current);
    // console.log("value changed");
    
    document.getElementById("roomNumbers").innerHTML='';
  
    user_details = snap[current];

    chats_check = user_details.chats.reception;
    old_snap = snap;
    window.snap = snapshot.val();
    user_id_list = snap.user_list;
    len = user_id_list.length;

    // user_details = snap[x];
    // chats = user_details.chats.reception;

    // console.log(chats);

    user_details = snap[current];
    chats = user_details.chats.reception;
  
    
    
    // console.log("chec");
    // console.log(chats);
    // console.log(current);
    
    // console.log(chats_check);
    // console.log("chec");

    // console.log(_.isEqual(chats, chats_check));
    if(_.isEqual(chats, chats_check)) {
      // console.log("here");
    }
    else {
      // console.log("here?");
      document.getElementById("conversation").innerHTML='';
      
      // x = snap.user_list[counter_details];
      
      // current = x;
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

    // console.log('first');
    for (var i = len-1 ; i >= 0 ; i--) {
      
      document.getElementById("roomNumbers").innerHTML+='';

      x = snap.user_list[i];

      user_details = snap[x];      
      chats = user_details.chats.reception;

      old_x = old_snap.user_list[i];
      user_details_old = old_snap[old_x];
      chats_old = user_details_old.chats.reception;



      console.log("check");
      console.log(chats_old);
      console.log(chats);

      if(!(_.isEqual(chats, chats_old))) {
        // console.log(user_details.room_number);  
        document.getElementById("roomNumbers").innerHTML+=`
        <div class="row sideBar-body new" onClick="loadChat(`+i+`)" id="chat-selected-` + i +`">          
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
      
      
    }

    // console.log("second");
    for (var i = len-1 ; i >= 0 ; i--) {
      
      document.getElementById("roomNumbers").innerHTML+='';

      x = snap.user_list[i];

      user_details = snap[x];      
      chats = user_details.chats.reception;

      old_x = old_snap.user_list[i];
      user_details_old = old_snap[old_x];
      chats_old = user_details_old.chats.reception;
      
      if(_.isEqual(chats, chats_old)) {
        // console.log(user_details.room_number);  
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
      
      
    }
    

  });


function checkEnter() {
  var key = window.event.keyCode;

  if (key === 13) {
      sendMessage();
      return false;
  }
  else {
      return true;
  }

}

function loadTasks(user_details) {
  console.log("sup?");
  console.log(user_details);
}



function markDone(request,stamp,x,done_id) {

  console.log(x);
  
  console.log(done_id);
  
  

  stamp = Number(stamp);
  
  firebase.database().ref('hotel/1/' + done_id + '/chats/reception/' + x ).set({
    datetime: stamp,
    message: request,
    sender : 3
  });
  console.log("done?");

  console.log(request,stamp);

  var Id = $('.choice-selected').attr('id');
  console.log 
  if(Id === "incomplete") {
    loadIncomplete();
  }
  if(Id === "complete") {
    loadComplete();
  }
  if(Id === "all") {
    loadAll();
  }
  
}

function loadIncomplete() {
  console.log("inc");
  document.getElementById("tasks").innerHTML = ``;

  $('.choice-selected').removeClass('choice-selected');
  $('#incomplete').addClass('choice-selected');

  user_id_list = snap.user_list;
  len = user_id_list.length;

  for (var i = len-1 ; i >= 0 ; i--) {
      
    x = snap.user_list[i];
    user_details = snap[x];
    chats = user_details.chats.reception;

  
    for (const j of Object.keys(chats)) {
   
      if(chats[j].sender==2) {

        var task = { 
          name:"Tarush", 
          room_number:50, 
          request:"Shampoo Quantity : 1 , Name : Towel Quantity : 0 , Name : Hair dryer Quantity : 1 , Name : Spoon Quantity : 0 ,",
          additional_comments:"Sup",
          date_time:"07:46 PM 23/02/2018"
        };

        var chat_timestamp = chats[j].datetime;
        var myDate = new Date(chat_timestamp);
        var formatedTime=myDate.toJSON();
          
        var chat_time = formatedTime.substring(11,16);
        var chat_day = formatedTime.substring(8,10);
        var chat_month = formatedTime.substring(5,7);

        document.getElementById("tasks").innerHTML += `
        <div class="task col-sm-10 col-sm-offset-1">
            <div class="row task-body col-sm-10 col-sm-offset-1">
                <div class="task-room">
                  ` + task.room_number + `            
                </div>
                <div class="task-request">
                ` + task.request + `
                </div>
                <div class="task-time">
                `+ chat_day + '/' + chat_month + ' ' + `<b>` + chat_time +`</b>
                </div>
            </div>
            <div class="row col-sm-2 col-sm-offset-1 text-center done" style="border: solid; margin-top: 5px;" onclick="markDone('`+task.request+`','`+chat_timestamp+`','`+ j +`','` + done_id + `')">
              Mark as Done
            </div>
            <div class="row col-sm-2 incompleted-task" style="margin-right: 5px; float:right;">
              Incomplete
            </div>
        </div>
        `;
      }
      
    }
    

  }
  if(document.getElementById("tasks").innerHTML === '')
  {
    document.getElementById("tasks").innerHTML = '<center><b>No Pending Tasks!</b></center>';
  }
}

function loadAll() {

  console.log("com");
  document.getElementById("tasks").innerHTML = ``;

  $('.choice-selected').removeClass('choice-selected');
  $('#all').addClass('choice-selected');

  user_id_list = snap.user_list;
  len = user_id_list.length;

  for (var i = len-1 ; i >= 0 ; i--) {
      
    x = snap.user_list[i];
    user_details = snap[x];
    chats = user_details.chats.reception;
  
    for (const j of Object.keys(chats)) {
   
      if(chats[j].sender==3) {

        console.log(chats[j]);

        var task = { 
          name:"Tarush", 
          room_number:50, 
          request:"Shampoo Quantity : 1 , Name : Towel Quantity : 0 , Name : Hair dryer Quantity : 1 , Name : Spoon Quantity : 0 ,",
          additional_comments:"Sup",
          date_time:"07:46 PM 23/02/2018"
        };

        var chat_timestamp = chats[j].datetime;
        var myDate = new Date(chat_timestamp);
        var formatedTime=myDate.toJSON();


          
        var chat_time = formatedTime.substring(11,16);
        var chat_day = formatedTime.substring(8,10);
        var chat_month = formatedTime.substring(5,7);

        console.log("hello?");
        

        document.getElementById("tasks").innerHTML += `
        <div class="task col-sm-10 col-sm-offset-1">
          
            <div class="row task-body col-sm-10 col-sm-offset-1">
              
                <div class="task-room">
                  ` + task.room_number + `            
                </div>

                <div class="task-request">
                ` + task.request + `
                </div>

                <div class="task-time">
                `+ chat_day + '/' + chat_month + ' ' + `<b>` + chat_time +`</b>

                </div>
  
            </div>

            <div class="row col-sm-2 completed-task" style="margin-right: 5px; float:right;">
              Complete
            </div>


        </div>
        `;
        

      }
      if(chats[j].sender==2) {

        var task = { 
          name:"Tarush", 
          room_number:50, 
          request:"Shampoo Quantity : 1 , Name : Towel Quantity : 0 , Name : Hair dryer Quantity : 1 , Name : Spoon Quantity : 0 ,",
          additional_comments:"Sup",
          date_time:"07:46 PM 23/02/2018"
        };

        var chat_timestamp = chats[j].datetime;
        var myDate = new Date(chat_timestamp);
        var formatedTime=myDate.toJSON();
          
        var chat_time = formatedTime.substring(11,16);
        var chat_day = formatedTime.substring(8,10);
        var chat_month = formatedTime.substring(5,7);

        document.getElementById("tasks").innerHTML += `
        <div class="task col-sm-10 col-sm-offset-1">
            <div class="row task-body col-sm-10 col-sm-offset-1">
                <div class="task-room">
                  ` + task.room_number + `            
                </div>
                <div class="task-request">
                ` + task.request + `
                </div>
                <div class="task-time">
                `+ chat_day + '/' + chat_month + ' ' + `<b>` + chat_time +`</b>
                </div>
            </div>
            <div class="row col-sm-2 col-sm-offset-1 text-center done" style="border: solid; margin-top: 5px;" onclick="markDone('`+task.request+`','`+chat_timestamp+`','`+ j +`','` + done_id + `')">
              Mark as Done
            </div>
            <div class="row col-sm-2 incompleted-task" style="margin-right: 5px; float:right;">
              Incomplete
            </div>
        </div>
        `;
      }
      
    }

  }
  if(document.getElementById("tasks").innerHTML === '')
  {
    document.getElementById("tasks").innerHTML = '<center><b>No Tasks!</b></center>';
  }
}

function loadComplete() {

  console.log("all");
  document.getElementById("tasks").innerHTML = ``;

  $('.choice-selected').removeClass('choice-selected');
  $('#complete').addClass('choice-selected');

  user_id_list = snap.user_list;
  len = user_id_list.length;

  for (var i = len-1 ; i >= 0 ; i--) {
      
    x = snap.user_list[i];
    user_details = snap[x];
    chats = user_details.chats.reception;
  
    for (const j of Object.keys(chats)) {
   
      if(chats[j].sender==3) {

        console.log(chats[j]);

        var task = { 
          name:"Tarush", 
          room_number:50, 
          request:"Shampoo Quantity : 1 , Name : Towel Quantity : 0 , Name : Hair dryer Quantity : 1 , Name : Spoon Quantity : 0 ,",
          additional_comments:"Sup",
          date_time:"07:46 PM 23/02/2018"
        };

        var chat_timestamp = chats[j].datetime;
        var myDate = new Date(chat_timestamp);
        var formatedTime=myDate.toJSON();
          
        var chat_time = formatedTime.substring(11,16);
        var chat_day = formatedTime.substring(8,10);
        var chat_month = formatedTime.substring(5,7);

        console.log("hello?");
      
        
        document.getElementById("tasks").innerHTML += `
        <div class="task col-sm-10 col-sm-offset-1">          
            <div class="row task-body col-sm-10 col-sm-offset-1">              
                <div class="task-room">
                  ` + task.room_number + `            
                </div>
                <div class="task-request">
                ` + task.request + `
                </div>
                <div class="task-time">
                `+ chat_day + '/' + chat_month + ' ' + `<b>` + chat_time +`</b>
                </div>  
            </div>
            
            <div class="row col-sm-2 completed-task" style="margin-right: 5px; float:right;">
              Complete
            </div>
        </div>
        `;      
      }      
    }
  }
  
  if(document.getElementById("tasks").innerHTML === '')
  {
    document.getElementById("tasks").innerHTML = '<center><b>No Tasks!</b></center>';
  }

}
