$(document).ready(function () {
    const inputs = $('.form-floating');

    function errorsMessage(message, targetDiv) {
        $(targetDiv).text(message).show();
    }

    errorsMessage('', '.error-message-email');
    errorsMessage('', '.error-message-password');
    errorsMessage('', '.error-message-name');

    $('#floatingEmail').keyup(function () {
        let specialChar = '@';
        let emailValue = $(this).val();

        if (emailValue.indexOf(specialChar) !== -1) {
            errorsMessage('', '.error-message-email');
        } else {
            errorsMessage(
                'Please, enter a valid email address containing "@"',
                '.error-message-email'
            );
        }
    });

    $('#floatingInput').keyup(function () {
        errorsMessage('', '.error-message-name');
    });

    $('#floatingPassword').keyup(function () {
        errorsMessage('', '.error-message-password');
    });

    $('.needs-validation').submit(function (event) {
        // Condition to Email Error
        if ($('#floatingEmail').val() == '') {
            errorsMessage(
                'Please, enter a valid email',
                '.error-message-email'
            );
            event.preventDefault();
        }

        // Condition to Name Error
        if ($('#floatingInput').val() == '') {
            errorsMessage('Please, enter a valid name', '.error-message-name');
            event.preventDefault();
        }

        // Condition to Password Error
        if ($('#floatingPassword').val() == '') {
            errorsMessage(
                'Please, enter a valid password',
                '.error-message-password'
            );
            event.preventDefault();
        }
    });
});
