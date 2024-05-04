$(document).ready(function () {
    const inputs = $('.form-floating');

    let emailError = $('.error-message-email');
    let passwordError = $('.error-message-password');
    let nameError = $('.error-message-name');

    emailError.hide();
    passwordError.hide();
    nameError.hide();

    $('.needs-validation').submit(function (event) {
        // Condition to Email Error
        if ($('#floatingEmail').val() == '') {
            emailError.show();
            event.preventDefault();
        }

        // Condition to Name Error
        if ($('#floatingInput').val() == '') {
            nameError.show();
            event.preventDefault();
        }

        // Condition to Password Error
        if ($('#floatingPassword').val() == '') {
            passwordError.show();
            event.preventDefault();
        }

        $('#floatingEmail').keyup(function () {
            emailError.hide();
        });

        $('#floatingInput').keyup(function () {
            nameError.hide();
        });

        $('#floatingPassword').keyup(function () {
            passwordError.hide();
        });
    });
});
