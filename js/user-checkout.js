$(document).ready(function(){
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
