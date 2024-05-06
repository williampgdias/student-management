$(document).ready(function () {
    // DELETE THIS AFTER STARTS
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (currentUser) {
        $('#userName').text(currentUser.name);
    }
    // DELETE THIS AFTER ENDS

    let students = [];

    function errorsMessage(message, targetDiv) {
        $(targetDiv).text(message).show();
    }

    function validateInputFieldsOnKeyUp() {
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
    }

    function addNewStudent() {
        let studentID = $('#floatingId').val();
        let studentName = $('#floatingName').val();
        let studentEmail = $('#floatingEmail').val();
        let studentPpsNumber = $('#floatingPpsNumber').val();

        let newStudent = {
            id: studentID,
            name: studentName,
            email: studentEmail,
            ppsNumber: studentPpsNumber,
        };

        students.push(newStudent);

        students.sort(function (a, b) {
            return a.id - b.id;
        });

        renderStudents();

        $('#floatingId').val('');
        $('#floatingName').val('');
        $('#floatingEmail').val('');
        $('#floatingPpsNumber').val('');
    }

    function renderStudents() {
        const cardStudents = $('.table').children('tbody');

        cardStudents.empty();

        students.forEach(function (student) {
            const studentsIdFormatted =
                student.id.length <= 1
                    ? '00' + student.id
                    : student.id.length <= 2
                    ? '0' + student.id
                    : student.id;

            const html = `
                <tr class="table-hover">
                    <th scope="row">${studentsIdFormatted}</th>
                    <td>${student.name}</td>
                    <td>${student.email}</td>
                    <td>${student.ppsNumber}</td>
                    <td>
                        <span class="content-delete-button">x</span>
                    </td>
                </tr>
            `;

            cardStudents.append(html);
        });
    }

    function handleFormValidation(event) {
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
    }

    function verifyLogin(event) {
        event.preventDefault();

        // Capture form data
        const email = $('#floatingEmail').val();
        const password = $('#floatingPassword').val();

        $.getJSON('../../assets/data/users.json', function (users) {
            let userFound = null;
            for (let i = 0; i < users.length; i++) {
                if (
                    users[i].email === email &&
                    users[i].password === password
                ) {
                    userFound = users[i];
                    break;
                }
            }
            if (userFound) {
                // ERASE THIS AFTER
                localStorage.setItem('currentUser', JSON.stringify(userFound));

                window.location.href = '../../students.html';
            } else {
                alert('User not found. Please, register.');
            }
        });
    }

    validateInputFieldsOnKeyUp();

    errorsMessage('', '.error-message-email');
    errorsMessage('', '.error-message-password');
    errorsMessage('', '.error-message-name');

    $('#addStudentsButton').click(function (event) {
        event.preventDefault();

        addNewStudent();

        $('#floatingId').text('');
    });

    $('#loginForm').submit(handleFormValidation);
    $('#loginForm').submit(verifyLogin);
});
