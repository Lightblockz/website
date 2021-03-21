$("#subscribe-form").submit(function(event){

    $("#submit-btn").attr('disabled', true);
    $("#submit-btn").text('Submitting...');

    // cancels the form submission
    event.preventDefault();
    
    submitForm();
});

function submitForm(){

    // Initiate Variables With Form Content
    var email = $("#email").val();
    var via_phone = $("#via_phone").val();
    var via_email = $("#via_email").val();
    var phone = via_phone == 1 ? $("#phone").val() : null;
    var amount = 20000;

    var data = {
        email,
        phone,
        via_email,
        via_phone
    };
 
    $.ajax({
        type: "POST",
        url: "subscribe.php",
        data: "email=" + email + "&via_email=" + via_email + "&phone=" + phone + "&amount=" + amount + "&via_phone=" + via_phone,
        success : function(text){

            var response = JSON.parse(text);
            const success_message = "Thank you for subscribing to our trade signals. A confirmation email has been sent to your email address";
            const error_message = "There was an error creating your subscription. Please try again";
            var message = response.success ? success_message : error_message;

            console.log(message);

            $("#return-message").empty();
            $("#return-message").text(message);

            $("#submit-btn").attr('disabled', false);
            $("#submit-btn").text('Subscribe');

        },
        error: function (error) {

            console.log(error);

            $("#return-message").empty();
            $("#return-message").text(error);

            $("#submit-btn").attr('disabled', false);
            $("#submit-btn").text('Subscribe');
        }
    });
}


function formSuccess(){
    $( "#msgSubmit" ).removeClass( "hidden" );
}