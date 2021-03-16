// signup event handler
$("#signup-button").on("click", function (e) {
    e.preventDefault()
    signupUser()
    console.log("clicked signup");
});


// signup functionality
function signupUser() {

    let signupInfo = getInputs()
    console.log(signupInfo);

    if (typeof signupInfo === "object") {
        $.ajax({
            type: "Post",
            url: "/signup",
            data: signupInfo,
            dataType: "json",
            success: function (response) {
                console.log("success: ", response.msg);
                console.log($(".response-message").text(response.msg))

                setTimeout(() => {
                    window.location.replace("/login")
                }, 1500)
            },
            error: (err) => {
                let msg = err.responseJSON.msg
                console.log("error: ", msg);
                console.log($(".response-message").text(msg))
            }
        })
    }
}

function getInputs() {

    if (validateInputs()) {
        return {
            username: $(`[name="username"]`).val().trim(),
            password: $(`[name="password"]`).val().trim(),
            email: $(`[name="email"]`).val().trim(),
            gender: $(`[name='gender']`).val().trim(),
            isLoggedIn: "false"
        }
    }
}

function validateInputs() {

    // borders reset
    $(`[name="username"]`).removeClass('border-red-500')
    $(`[name="password"]`).removeClass('border-red-500')
    $(`[name="email"]`).removeClass('border-red-500')
    $(`[name="gender"]`).removeClass('border-red-500')

    // labels reset
    $("[for='username']").removeClass('text-red-500')
    $("[for='password']").removeClass('text-red-500')
    $("[for='email']").removeClass('text-red-500')

    // error texts reset
    $(".error-text").removeClass('opacity-100')

    //gender reset
    $(`[name="gender"]`).removeClass('text-red-500')

    if ($(`[name="username"]`).val().trim() === "") {
        $(`[name="username"]`).addClass('border-red-500')
        $("[name='username'] + .error-text").addClass('opacity-100')
        $("[for='username']").addClass('text-red-500')
    }
    if ($(`[name="password"]`).val().trim() === "") {
        $(`[name="password"]`).addClass('border-red-500')
        $("[name='password'] + .error-text").addClass('opacity-100')
        $("[for='password']").addClass('text-red-500')
    }
    if ($(`[name="email"]`).val().trim() === "") {
        $(`[name="email"]`).addClass('border-red-500')
        $("[name='email'] + .error-text").addClass('opacity-100')
        $("[for='email']").addClass('text-red-500')
    }
    if ($(`[name="gender"]`).val().trim() === "") {
        $(`[name="gender"]`).addClass('text-red-500')
        $(`[name="gender"]`).addClass('border-red-500')
    }



    return $(`[name="username"]`).val().trim() !== "" &&
        $(`[name="password"]`).val().trim() !== "" &&
        $(`[name="email"]`).val().trim() !== "" &&
        $(`[name="gender"]`).val().trim() !== "" ? true : false

}