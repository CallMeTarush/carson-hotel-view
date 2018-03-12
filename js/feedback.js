var sum;
var feedbackResponse;

$(document).ready(function(){
    $('.grow').css("transform","scale(1.2)");

    setTimeout(function(){ 
      $('.grow').css("transform","scale(1)");
    }, 500);
    
    setTimeout(function(){ 
      $('.grow').css("transform","scale(1.2)");
    }, 1000);

    setTimeout(function(){ 
      $('.grow').css("transform","scale(1)");
    }, 1500);

    setTimeout(function(){ 
      $('.grow').css("transform","scale(1.2)");
    }, 2000);
    
    getFeedback();

});

function getFeedback() {
    $.get("http://139.59.13.33:8383/hotel/feedbackresponse", function(data, status){
        
        console.log(data);
        feedbackResponse = data;
        var checker=0;
        for (const j of Object.keys(feedbackResponse)) {
            
            checker++;
            
            if(checker<=7) {
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
            else {
                console.log("done lolz");
            }
        }

        setTimeout(function(){
            $('.loader').fadeOut();
        }, 200);

    });
}

function loadOverlay(user_id) {
    
    console.log("open");
    console.log("lmao12");
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
    console.log("lmao");
    console.log(feedbackResponse);
    
    for(const j of Object.keys(feedbackResponse)) {
        console.log(j);
        for(var counter=0; counter < 7; ++counter) {
            console.log(feedbackResponse[j].ratings[counter]);
            console.log("updated");
            document.getElementById("table-2").innerHTML+=`
            <tr>
                <td>`+feedbackResponse[j].ratings[counter].question+`</td>
                <td>`+feedbackResponse[j].ratings[counter].rating+`</td>
            </tr>
            `;
        }
        console.log(feedbackResponse[j].ratings);
        
    }
}
