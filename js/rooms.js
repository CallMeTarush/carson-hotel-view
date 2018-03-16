    var rooms; 

$(document).ready(function(){
    getRooms();   

    $('.grow').css("transform","scale(1.2)");

    setTimeout(function(){ 
      $('.grow').css("transform","scale(1)");
    }, 500);
    
    setTimeout(function(){ 
      $('.grow').css("transform","scale(1.2)");
    }, 1000);

    setTimeout(function(){ 
      $('.grow').css("transform","scale(1)");
    }, 1500);

    setTimeout(function(){ 
      $('.grow').css("transform","scale(1.2)");
    }, 2000);

});

function getRooms() {
    
    $.get("http://139.59.13.33:8383/hotel/view_rooms",function(data,status) {
        
        rooms = data.rooms;        

        for (i = 0; i < rooms.length; i++) {
            
            var index = i;
            var roomno = rooms[i].room;
            var markup = "<tr ><td onclick='openRoomDetails(" + i + ")' >" + ((index) + (1)) + "</td><td onclick='openRoomDetails(" + i + ")' >" + roomno + "</td><td class='text-right'><button onClick='deleteRoom(`" + rooms[i].key + "`)'><span class='glyphicon glyphicon-remove'></span></button></td></tr>";
            
            $("#roomTable").append(markup);
    
        }        

    });


    setTimeout(function(){
        $('.loader').fadeOut();
    }, 200);
    
}

function closeOverlay() {
    $('#roomDeets').css("display","none");
}

function openRoomDetails(i) {
    
    console.log(rooms[i]);
    $('#roomDeets').css("display","block");


    var roomno = rooms[i].room;
    var markup = "<tr><td>" + rooms[i].key + "</td><td>" + rooms[i].room + "</td><td>" + rooms[i].name + "</td><td>" + rooms[i].mobile + "</td></tr>";
    
    $("#big-table-3").append(markup);

}

function deleteRoom(click_index){
    var roomObj = new Object();

    console.log(click_index);
    roomObj.key = click_index;
    
    console.log(roomObj);
    roomObj = JSON.stringify(roomObj);
    console.log(roomObj);

    
    
    $.ajax({
        url: 'http://139.59.13.33:8383/hotel/delete_key',
        type: 'DELETE',
        data: roomObj,
        dataType: 'json',               
        success: function(result) { 

            console.log("lmao");
            $("#roomTable").remove(); 
            getRooms(); 
            

            setTimeout(function(){  document.location.reload(); }, 1000);

        },
        error: function(result){ alert("error!") }
    });
    
}

function checkin() {
    loadOverlay();
}
function addRoom() {

    var roomNumber = document.getElementById("roomnumber").value;
    var mobile = document.getElementById("mobile").value;
    var name = document.getElementById("name").value;
    var roomObj = new Object();

    roomObj.room = roomNumber;
    roomObj.mobile = mobile;
    roomObj.name = name;
  
    console.log(roomObj);
    roomObj = JSON.stringify(roomObj);
    console.log(roomObj);
    $.ajax({
  
            url: 'http://139.59.13.33:8383/hotel/generate_key',
  
            type: 'POST',
  
            dataType: 'json',
  
            data: roomObj,
  
            success: function (data, textStatus, xhr) {
              
                console.log("Posted!");
                $("table tbody").remove(); 
                getRooms();
              
            },
            error: function (xhr, textStatus, errorThrown) {
  
                console.log('Error in Operation');
  
            }
    });

}


function loadOverlay() {
    
    console.log("open");
    console.log("lmao12");

    $('#overlay').addClass("animated fadeIn");
    $('#overlay').css("display","block");

}
function closeOverlay() {

    console.log("close");
    
    $('#overlay').addClass("animated fadeOut");

}

