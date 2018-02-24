var sum;
var feedbackResponse;
$.get("http://139.59.13.33:8383/hotel/feedbackresponse", function(data, status){
    
    console.log(data);
    feedbackResponse = data;
    for (const j of Object.keys(feedbackResponse)) {
        
        sum=0;

        console.log(feedbackResponse[j]);
        for (x in feedbackResponse[j].ratings) {
            sum+=Number(feedbackResponse[j].ratings[x].rating);
        }
        console.log(sum);
        average = sum/feedbackResponse[j].ratings.length;
        average = average.toFixed(1);
        console.log(average);

        document.getElementById("table").innerHTML+=`
        <tr onclick="loadOverlay(` + feedbackResponse[j].user + `)" >
            <td>
            ` + feedbackResponse[j].room + `
            </td>
            <td>
            ` + feedbackResponse[j].comment + `
            </td>
            <td>
            ` + average + `
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
    
    console.log(feedbackResponse);

}