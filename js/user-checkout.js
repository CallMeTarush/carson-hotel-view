$(document).ready(function(){
    $("button").click(function(){
    	alert("sure?");
		$.ajax({
		    url: "http://pgolecha.me:8383/hotel/delete_key",
		    type: 'DELETE',
		    success: function(result) {
		    	alert("success");
		    }
		});
    });
});
