$(document).ready(function(){
    
    $.get("http://pgolecha.me:8383/hotel/view_rooms", function(data, status){
        alert("Data: " + data + "\nStatus: " + status);
    });

    rooms = data.rooms;

    for (i = 0; i < rooms.length; i++) {
        var index = i;
        var roomno = rooms[i];
        var markup = "<tr><td>" + index + "</td><td>" + roomno + "</td><td><span class='glyphicon glyphicon-remove'></span></td></tr>";
        $("table tbody").append(markup);
    
    }   

    $('#thetable').find('tr').click( function(){
        click_index = ($(this).index()+1);
        $.delete("http://pgolecha.me:8383/hotel/delete_key",
        {
          "room": rooms[click_index]
        },
        function(data,status){
            alert("Data: " + data + "\nStatus: " + status);
        });
    });
});
