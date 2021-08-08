const userManager = require('../services/userService');
const fileManager = require('../services/fileService');
const config = require('../config/config');
const jwt = require('jsonwebtoken');

module.exports.checkForValidUserRoleUser = (req, res, next) => {
    //If the token is valid, the logic extracts the user id and the role information.
    //If the role is not user, then response 403 UnAuthorized
    //The user id information is inserted into the request.body.userId

    console.log('http header - user ', req.headers['user']);
    let localUserId = req.headers['user'];
    const authHeader = req.headers['authorization'];
    console.log("authHeader : " + authHeader);
    // check if it is null or undefined , and must contain Bearer
    if (authHeader === null || authHeader === undefined || !authHeader.startsWith("Bearer ")) {
        console.log("req.headers.authorization is undefined");
        res.status(403).send({ message: 'Unauthorised! You are not logged in as user.' });

    } else {
        // Retrieve the authorization header and parse out the
        // JWT using the split function
        console.log("retrieving authorization header");
        let token = authHeader.split(' ')[1];

        console.log('Check for received token from frontend : \n');
        console.log(token);

        jwt.verify(token, config.JWTKey, (err, data) => {
            console.log('data extracted from token \n', data);
            if (err) {
                console.log(err);
                return res.status(403).send({ message: 'Unauthorised access' });
            }
            else {
                // code to check
                // console.log("id = " + JSON.stringify(data.id))
                let decodedUserId = JSON.stringify(data.id);
                console.log("localUserId = " + localUserId);
                console.log("decodedUserId = " + decodedUserId);
                // console.log("isSame = " + (localUserId == decodedUserId));
                if (localUserId == decodedUserId) {
                    console.log("id = " + JSON.parse(decodedUserId));
                    req.body.id = JSON.parse(decodedUserId);
                    console.log(req.body.id);
                    next();

                } else {
                    console.log(err);
                    return res.status(403).send({ message: 'Unauthorised! You are not allowed to access.' })
                }
            }
        })

    }
} //End of checkForValidUserRoleUser

module.exports.checkForValidUserValidRoleId = async (req, res, next) => {
    //console.log('user updated role id in form' + req.body['recordId']);
    //console.log('user updated role id in URL' + req.body['URLRecordId']);
    let recordId = req.body['recordId'];
    let URLRecordId = req.body['URLRecordId'];
    let roleId = req.body['roleId'];

    if (recordId == URLRecordId) {
        try {
            let results = await userManager.getRoleId();
            console.log('Inspect result variable inside getting Role Id code\n', results);
            if (results) {
                console.log("check roleid");
                for (var i = 0; i < results.length; i++) {
                    console.log("result length " + results.length);
                    console.log(results[i].role_id);
                    console.log("Role = " + roleId);
                    if (roleId == results[i].role_id) {
                        next();
                        break;
                    } else if (i == 1) {
                        return res.status(403).send({ message: 'Error! Role updated does not exist' });
                    } else {
                    }
                }

            } else {
                return res.status(403).send({ message: 'Error! Role updated is invalid.' });
            }
        } catch (error) {
            let message = 'Server is unable to process your request.';
            return res.status(500).send({
                message: error
            });
        }
    } else {
        return res.status(403).send({ message: 'Error! User updated are different.' })
    }
} // End of checkForValidUserValidRoleId

module.exports.checkForValidUserValidFileId = (req, res, next) => {
    //console.log('user updated role id in form' + req.body['recordId']);
    //console.log('user updated role id in URL' + req.body['URLRecordId']);
    let fileId = req.body['fileId'];
    let URLFileId = req.body['URLFileId'];
    const authHeader = req.headers['authorization'];
    console.log("authHeader : " + authHeader);
    // check if it is null or undefined , and must contain Bearer
    if (authHeader === null || authHeader === undefined || !authHeader.startsWith("Bearer ")) {
        console.log("req.headers.authorization is undefined");
        res.status(403).send({ message: 'Unauthorised! You are not logged in as user.' });

    } else {
        // Retrieve the authorization header and parse out the
        // JWT using the split function
        let token = authHeader.split(' ')[1];
        console.log('Check for received token from frontend : \n');
        console.log(token);

        jwt.verify(token, config.JWTKey, async (err, data) => {
            console.log('data extracted from token \n', data);
            if (err) {
                console.log(err);
                return res.status(403).send({ message: 'Unauthorised access' });
            }
            else {
                let decodedUserId = JSON.stringify(data.id);
                console.log("decodedUserId = " + decodedUserId);
                let userId = JSON.parse(decodedUserId);
                console.log(userId);

                if (fileId == URLFileId) {
                    try {
                        let results = await fileManager.getFileId(fileId);
                        console.log('Inspect result variable inside getting File Id code\n', results);
                        if (results) {
                            console.log("check created_by_id");
                            console.log(results[0].created_by_id);
                            console.log("? = " + userId);
                            if (userId == results[0].created_by_id) {
                                next();
                            } else {
                                return res.status(403).json({ message: 'Error! File updated is invalid.' });
                            }
                        } else {
                            return res.status(403).json({ message: 'Error! File updated is invalid.' });
                        }
                    } catch (error) {
                        let message = 'Server is unable to process your request.';
                        return res.status(500).json({
                            message: message
                        });
                    }
                } else {
                    console.log(err);
                    return res.status(403).json({ message: 'Error! File updated are different.' })
                }
            }
        })
    }



} // End of checkForValidUserValidFileId

module.exports.checkForValidAdmin = (req, res, next) => {
    console.log('http header - user ', req.headers['user']);
    let localUserId = req.headers['user'];
    const authHeader = req.headers['authorization'];
    console.log("authHeader : " + authHeader);
    // check if it is null or undefined , and must contain Bearer
    if (authHeader === null || authHeader === undefined || !authHeader.startsWith("Bearer ")) {
        console.log("req.headers.authorization is undefined");
        res.status(403).send({ message: 'Unauthorised! You are not logged in as user.' });

    } else {
        // Retrieve the authorization header and parse out the
        // JWT using the split function
        console.log("retrieving authorization header");
        let token = authHeader.split(' ')[1];
        console.log('Check for received token from frontend : \n');
        console.log(token);

        jwt.verify(token, config.JWTKey, async (err, data) => {
            console.log('data extracted from token \n', data);
            if (err) {
                console.log(err);
                return res.status(403).send({ message: 'Unauthorised access' });
            }
            else {
                // code to check
                // console.log("id = " + JSON.stringify(data.id))
                let decodedUserId = JSON.stringify(data.id);
                console.log("localUserId = " + localUserId);
                console.log("decodedUserId = " + decodedUserId);
                // console.log("isSame = " + (localUserId == decodedUserId));
                if (localUserId == decodedUserId) {
                    try {
                        let results = await userManager.getRole(decodedUserId);
                        console.log('Inspect result variable inside getting Role Id code\n', results);
                        if (results) {
                            console.log("check role_name");
                            console.log(results[0].role_name);
                            if (results[0].role_name == "admin") {
                                next();
                            } else {
                                return res.status(403).send({ message: 'Unauthorised access.' });
                            }
                        } else {
                            return res.status(403).send({ message: 'Unauthorised access.' });
                        }
                    } catch (error) {
                        let message = 'Server is unable to process your request.';
                        return res.status(500).send({
                            message: message
                        });
                    }
                } else {
                    console.log(err);
                    return res.status(403).send({ message: 'Unauthorised! You are not allowed to access.' })
                }
            }
        })

    }


} // End of checkForValidAdmin

