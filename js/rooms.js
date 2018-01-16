
var rooms; 

$(document).ready(function(){
    
    $.get("http://pgolecha.me:8383/hotel/view_rooms",function(data,status) {
                rooms = data.rooms;
                 for (i = 0; i < rooms.length; i++) {
            var index = i;
            var roomno = rooms[i].room;
            var markup = "<tr><td>" + index + "</td><td>" + roomno + "</td><td><button onClick='deleteRoom(" + index + ")'><span class='glyphicon glyphicon-remove'></span></button></td></tr>";
            $("table tbody").append(markup);        
        }
            });

       

    
});

function deleteRoom(click_index){
    console.log(click_index);
    $.ajax({
        url: 'http://pgolecha.me:8383/hotel/delete_key',
        type: 'DELETE',
        data: {
            "room": rooms[click_index]
        },
        contentType:'application/json',  
        dataType: 'text',               
        success: function(result) {alert("deleted!")},
        error: function(result){"error!"}
    });
}

function checkin() {
    var lolz = $('#roomNo');
    var data_to_send = { 
        'room':lolz.val()
    };
    console.log(data_to_send);
    $.ajax({
        type: 'POST',
        url: 'http://pgolecha.me:8383/hotel/generate_key',
        data: JSON.stringify(data_to_send),
        dataType: "json",
        success: function(msg){
            alert(msg);
        }
    });
}
