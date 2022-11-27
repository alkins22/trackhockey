
function importData(){

    
    // Get the form
    var uploadedFile = document.getElementById( 'datafile' ).value;

    console.log(uploadedFile);

    var roster = $.csv.toArray(uploadedFile);


    console.log(roster);
}

importData();