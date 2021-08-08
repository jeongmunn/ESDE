let $updateUserFormContainer = $('#updateUserFormContainer');
if ($updateUserFormContainer.length != 0) {
        // // add this to better prevent BROKEN AUTHENTICATION
        // if(localStorage.getItem('token') == null){
        //     window.location.replace('../home.html');
        // }
    console.log('Update User form is detected. Binding event handling logic to form elements.');
    //If the jQuery object which represents the form element exists,
    //the following code will create a method to submit user role data
    //to server-side api when the #submitButton element fires the click event.
    $('#submitButton').on('click', function(event) {
        event.preventDefault();
        const baseUrl = 'https://35.168.145.194:5000';
        //Collect role id value from the input element, roleIdInput
        let roleId = $('#roleIdInput').val();
        //Obtain user id from local storage
        let userId = localStorage.getItem('user_id');
        //There is a hidden textbox input, userRecordIdInput
        let recordId = $('#userRecordIdInput').val();
        // added
        let token = localStorage.getItem('token');
        // obtain recordId from URL to double check
        let URL = window.location.href;
        let URLRecordId = URL.substring(URL.lastIndexOf('=') + 1);
        let webFormData = new FormData();
        webFormData.append('roleId', roleId);
        webFormData.append('recordId', recordId);
        // added
        webFormData.append('URLRecordId', URLRecordId);

        axios({
                method: 'put',
                url: baseUrl + '/api/user/',
                data: webFormData,
                headers: { 
                    'authorization': 'Bearer ' + token,
                    'Content-Type': 'multipart/form-data', 
                    'user': userId,}
            })
            .then(function(response) {
                new Noty({
                    type: 'success',
                    layout: 'topCenter',
                    theme: 'sunset',
                    timeout: '5000',
                    text: 'User role has changed.',
                }).show();
            })
            .catch(function(response) {
                //Handle error
                //console.dir(response);
                new Noty({
                    type: 'error',
                    layout: 'topCenter',
                    theme: 'sunset',
                    timeout: '6000',
                    text: 'Unable to update.',
                }).show();

            });
    });
    $('#backButton').on("click", function(e) {
        e.preventDefault();
        window.history.back();
    });

    function getOneUser() {
        console.log("getOneUser function is called.");
        const baseUrl = 'https://35.168.145.194:5000';
        var query = window.location.search.substring(1);
        let arrayData = query.split("=");
        let recordIdToSearchUserRecord = arrayData[1];
        let userId = localStorage.getItem('user_id');
        // added
        let token = localStorage.getItem('token');
        axios({
                headers: {
                    'user': userId,
                    'authorization': 'Bearer ' + token,
                },
                method: 'get',
                url: baseUrl + '/api/user/' + recordIdToSearchUserRecord,
            })
            .then(function(response) {
                //Using the following to inspect the response.data data structure
                //before deciding the code which dynamically populate the elements with data.
                console.dir(response.data);
                const record = response.data.userdata;
                $('#fullNameOutput').text(record.fullname);
                $('#emailOutput').text(record.email);
                $('#userRecordIdInput').val(record.user_id);
                $('#roleIdInput').val(record.role_id);

            })
            .catch(function(response) {
                //Handle error
                //console.dir(response);
                new Noty({
                    type: 'error',
                    timeout: '6000',
                    layout: 'topCenter',
                    theme: 'sunset',
                    text: 'Unable retrieve user data',
                }).show();
            });

    } //End of getOneUser
    //Call getOneUser function to do a GET HTTP request on an API to retrieve one user record
    getOneUser();
} //End of checking for $updateUserFormContainer jQuery object