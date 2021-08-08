var validator = require('validator');

var validatorFn = {

    validateRegister: function(req,res,next){
        // store form input values into variables
        var fullName = req.body.fullName;
        var email = req.body.email;
        var password = req.body.password;

        // username contains only alphabet, spaces, single quote or comma
        ReFullName = new RegExp(`^[a-zA-Z\s,']+$`);

        // password contains at least 1 upper case letter, 1 lower case letter, 1 number and 8/more alphanumeric alphabets
        RePassword = new RegExp(`^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]{8,}$`);

        // return response with status 400 if validation fails
        if (ReFullName.test(fullName) && RePassword.test(password) && validator.isEmail(email)) {
            next();
        } else{
            res.status(400);
            res.send(`{"Message":"Please enter valid details"}`);
        }
    },

    validateEmail: function(req,res,next){
        var email = req.body.email;
        if(validator.isEmail(email)){
            next();
        }else{
            res.status(400);
            res.send(`{"Message":"Please enter a valid email"}`);
        }
    },

    validateRecipient: function(req,res,next){
        var email = req.body.recipientEmail;
        var name = req.body.recipientName;

        // username contains only alphabet, spaces, single quote or comma
        ReName = new RegExp(`^[a-zA-Z\s,']+$`);

        if(validator.isEmail(email) && ReName.test(name)){
            next();
        }else{
            res.status(400);
            res.send(`{"Message":"Please enter a valid details"}`);
        }
    },

    validateDesignTitle: function(req,res,next){
        //console.log("validateDesign called");
        var title = req.body['designTitle'];
        //console.log("title :" + title);

        // title contains only alphabet, spaces, single quote or comma
        ReTitle = new RegExp(`^[a-zA-Z0-9\s,']+$`);
        // console.log(ReTitle.test(title));
        if(ReTitle.test(title)){
            //console.log("title same");
            next();
        }else{
            return res.status(400).send(`{"Message":"Please enter a valid Title"}`);
        }
    },

}

module.exports = validatorFn ;