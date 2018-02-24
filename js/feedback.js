$.get("http://139.59.13.33:8383/hotel/feedbackresponse", function(data, status){
    
    feedbackResponse = data.ratings;    
    console.log(feedbackResponse);

    for (const j of Object.keys(feedbackResponse)) {
        
        console.log(feedbackResponse[j].user);
        document.getElementById("table").innerHTML+=`
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
