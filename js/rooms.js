$(document).ready(function(){
    
    $.get("http://pgolecha.me:8383/hotel/view_rooms", function(data, status){
        alert("Data: " + data + "\nStatus: " + status);
    });

        
    $("button").click(function(){
        $.delete("http://pgolecha.me:8383/hotel/delete_key",
        {
          "room":$('#room_number').val()
        },
        function(data,status){
            alert("Data: " + data + "\nStatus: " + status);
        });
    });
});
