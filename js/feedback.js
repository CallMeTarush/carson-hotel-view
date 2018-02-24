$.get("http://139.59.13.33:8383/hotel/feedbackresponse", function(data, status){
    
    feedbackResponse = data.ratings;    
    console.log(feedbackResponse);

    for (const j of Object.keys(feedbackResponse)) {
        
        console.log(feedbackResponse[j].user);
        document.getElementById("table").innerHTML+=`
        <tr onclick="loadOverlay(` + feedbackResponse[j].user + `)" >
            <td>
            ` + feedbackResponse[j].user + `
            </td>
            <td>
            ` + feedbackResponse[j].question + `
            </td>
            <td>
            ` + feedbackResponse[j].rating + `
            </td>
        </tr>
        `
    }


});

function loadOverlay(user_id) {
    
    console.log(user_id);
    loadTable(user_id);

    document.getElementById("table-2").innerHTML+=``;


    $('#overlay').addClass("animated fadeIn");
    $('#overlay').css("display","block");

}
function closeOverlay() {

    console.log("close");
    document.location.reload();
    $('#overlay').addClass("animated fadeOut");
    // setTimeout(
    //     function(){
            
    //         document.location.reload();
    //     }, 1000);
}

function loadTable(user_id) {
    
    $.get("http://139.59.13.33:8383/hotel/feedbackresponse", function(data, status){
    
        feedbackResponse = data.ratings;    
        
        for (const j of Object.keys(feedbackResponse)) {
            
            document.getElementById("table-2").innerHTML+=`
            <tr onclick="loadOverlay()" >
                <td>
                ` + feedbackResponse[j].user + `
                </td>
                <td>
                ` + feedbackResponse[j].question + `
                </td>
                <td>
                ` + feedbackResponse[j].rating + `
                </td>
            </tr>
            `
        }

    });

}