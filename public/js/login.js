// login event handler
$("#login-button").on("click", function (e) {
    e.preventDefault()
    loginUser()

});

// login functionality
function loginUser() {

    let loginInfo = getInputs()

    if (typeof loginInfo === "object") {
        $.ajax({
            type: "Post",
            url: "/login",
            data: loginInfo,
            dataType: "json",
            success: function (response) {
                response = JSON.parse(response)
                console.log("success: ", response.msg);
                console.log($(".response-message").text(response.msg))
                window.localStorage.setItem("username", [loginInfo.username])

                setTimeout(() => {
                    window.location.replace(`/profile/${response.uid}`)
                }, 1500)
            },
            error: (err) => {
                let msg = JSON.parse(err.responseJSON).msg
                console.log("error: ", err);
                console.log($(".response-message").text(msg))
            }
        })
    }
}

function getInputs() {
    // console.log("validate inputs:", validateInputs());
    if (validateInputs()) {
        return {
            username: $("#username-value").val(),
            password: $("#password-value").val()
        }
    }
}

function validateInputs() {
    $("#username-value").removeClass('border-red-500')
    $("#password-value").removeClass('border-red-500')
    $(".error-text").removeClass('opacity-100')
    $(".error-text").removeClass('opacity-100')
    $("[for='username']").removeClass('text-red-500')
    $("[for='password']").removeClass('text-red-500')

    if ($("#username-value").val().trim() === "") {
        $("#username-value").addClass('border-red-500')
        $("[id='username-value'] + .error-text").addClass('opacity-100')
        $("[for='username']").addClass('text-red-500')
    }
    if ($("#password-value").val().trim() === "") {
        $("#password-value").addClass('border-red-500')
        $("[id='password-value'] + .error-text").addClass('opacity-100')
        $("[for='password']").addClass('text-red-500')
    }
    return $("#username-value").val().trim() !== "" && $("#password-value").val().trim() !== "" ? true : false

}