$(document).ready(function(){
    $("button").click(function(){
        $.post("http://pgolecha.me:8383/hotel/login",
        {
          "username":$('#hotel_username').val(),
          "password":$('#password').val()
        },
        function(data,status){
            alert("Data: " + data + "\nStatus: " + status);
        });
    });
});
