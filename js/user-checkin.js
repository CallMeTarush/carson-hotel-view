$(document).ready(function(){
    $("button").click(function(){
        $.post("http://pgolecha.me:8383/hotel/generate_key",
        {
          "room":$('#room_number').val()
        },
        function(data,status){
            alert("Data: " + data + "\nStatus: " + status);
        });
    });
});
