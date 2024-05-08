$(document).ready(function () {
    // DELETE THIS AFTER STARTS
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (currentUser) {
        $('#userName').text(currentUser.name);
    }
    // DELETE THIS AFTER ENDS

    let students = [];

    /**
     * Function to create the logic for error message and use in different
     * parts of the project.
     */
    function errorsMessage(message, targetDiv) {
        $(targetDiv).text(message).show();
    }

    /**
     * Function to hide the error message when the User start to typing something.
     * Also, show another error if the User doesn't write the '@'.
     * Only hide if the User press this special char.
     */
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

    /**
     * Function to add a new student to a existent array.
     */
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

    /**
     * Function to render the new student and create a new table row for the User
     */
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

    /**
     *
     * Function that show the message if the User doesn't put any
     * information in the input fields.
     */
    function handleFormValidation() {
        // Condition to Email Error
        if ($('#floatingEmail').val() == '') {
            errorsMessage(
                'Please, enter a valid email',
                '.error-message-email'
            );
        }

        // Condition to Name Error
        if ($('#floatingInput').val() == '') {
            errorsMessage('Please, enter a valid name', '.error-message-name');
        }

        // Condition to Password Error
        if ($('#floatingPassword').val() == '') {
            errorsMessage(
                'Please, enter a valid password',
                '.error-message-password'
            );
        }
    }

    /**
     * Function to verify if the User is register yet.
     * If is true, the User is send to the students page.
     * If not, it show a message that saying he is not register yet.
     */
    function verifyLogin(event) {
        event.preventDefault();

        // Capture form data
        const email = $('#floatingEmail').val();
        const password = $('#floatingPassword').val();

        if (!email || !password) {
            if (!email) {
                errorsMessage(
                    'Please, enter your email',
                    '.error-message-email'
                );
            } else if (!password) {
                errorsMessage(
                    'Please, enter your password',
                    '.error-message-email'
                );
            }
            return;
        }

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
                localStorage.setItem('currentUser', JSON.stringify(userFound)); // ERASE THIS AFTER

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

    // Event listener to add the Students
    $('#addStudentsButton').click(function (event) {
        event.preventDefault();

        addNewStudent();

        $('#floatingId').text('');
    });

    // Event listener to register a new User
    $('#registerForm').submit(function (event) {
        event.preventDefault();

        handleFormValidation();

        // const name = $('#floatingInput').val();
        // const email = $('#floatingEmail').val();
        // const password = $('#floatingPassword').val();

        const newUser = {
            name: $('#floatingInput').val(),
            email: $('#floatingEmail').val(),
            password: $('#floatingPassword').val(),
        };

        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser),
        })
            .then((response) => response.json())
            .then((data) => console.log(data))
            .catch((error) => console.error('Error:', error));

        // $.getJSON('../../assets/data/users.json', function (users) {
        //     users.push(newUser);

        //     const jsonData = JSON.stringify(users);

        //     $.ajax({
        //         url: '../../assets/data/users.json',
        //         type: 'POST',
        //         contentType: 'application/json',
        //         data: jsonData,
        //         success: function () {
        //             alert('Done!');
        //         },
        //         error: function () {
        //             alert('Error!');
        //         },
        //     });

        //     console.log(users);
        // });
    });

    $('#loginForm').submit(handleFormValidation);
    $('#loginForm').submit(verifyLogin);
});
