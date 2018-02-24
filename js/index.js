$(window).on('load', function () {
    
    setTimeout(function(){
        $('.loader').fadeOut();
    }, 200);
});

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
