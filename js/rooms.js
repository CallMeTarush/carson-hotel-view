$(document).ready(function(){
    
    $.get("http://pgolecha.me:8383/hotel/view_rooms", function(data, status){
        alert("Data: " + data + "\nStatus: " + status);
    });

    rooms = data.rooms;

    for (i = 0; i < rooms.length; i++) {
        var index = i;
        var roomno = rooms[i];
        var markup = "<tr><td>" + index + "</td><td>" + roomno + "</td><td><button onClick='deleteRoom(" + index + ")'><span class='glyphicon glyphicon-remove'></span></button></td></tr>";
        $("table tbody").append(markup);
    
    }   

    
});

function deleteRoom(click_index){
        
    $.delete("http://pgolecha.me:8383/hotel/delete_key",
    {
      "room": rooms[click_index]
    },
    function(data,status){
        alert("Data: " + data + "\nStatus: " + status);
    });
}

function checkin() {
    alert("Im here")
    var lolz = $('#roomNo');

    $.ajax({
        type: 'POST',
        // make sure you respect the same origin policy with this url:
        // http://en.wikipedia.org/wiki/Same_origin_policy
        url: 'http://pgolecha.me:8383/hotel/generate_key',
        data: { 
            'room': '123', 
        },
        success: function(msg){
            alert(msg);
        }
    });
}
