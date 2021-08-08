// Import controlers
const authController = require('./controllers/authController');
const userController = require('./controllers/userController');
const checkUserFn = require('./middlewares/checkUserFn');
const checkUserFnSolution = require('./middlewares/checkUserFnSolution');
const validatorFn = require('./middlewares/validationFn');
const rateLimitFn = require('./middlewares/rateLimit');

// Match URL's with controllers
exports.appRoute = router => {

    // LOGIN  DONE CHECKED
    router.post('/api/user/login', rateLimitFn.LoginLimit, validatorFn.validateEmail, authController.processLogin);
    // REGISTER   DONE  CHECKED
    router.post('/api/user/register', rateLimitFn.RegisterLimit, validatorFn.validateRegister, authController.processRegister);
    // USER SUBMIT DESIGN   DONE CHECKED
    router.post('/api/user/process-submission', checkUserFnSolution.checkForValidUserRoleUser, validatorFn.validateDesignTitle, userController.processDesignSubmission);
    // ADMIN CHANGE USER ROLE DONE CHECKED
    router.put('/api/user/', checkUserFnSolution.checkForValidAdmin,checkUserFnSolution.checkForValidUserValidRoleId ,userController.processUpdateOneUser);
    // USER UPDATE DESIGN   DONE CHECKED
    router.put('/api/user/design/', checkUserFnSolution.checkForValidUserValidFileId,validatorFn.validateDesignTitle, userController.processUpdateOneDesign);
    // USER SEND INVITATION EMAIL   DONE CHECKED
    router.post('/api/user/processInvitation/',rateLimitFn.InviteFriendLimit, checkUserFnSolution.checkForValidUserRoleUser, validatorFn.validateRecipient, userController.processSendInvitation);
    // USER SEARCH SUBMISSION   DONE CHECKED
    router.get('/api/user/process-search-design/:pagenumber/:search?', checkUserFnSolution.checkForValidUserRoleUser, userController.processGetSubmissionData);
    // ADMIN SEARCH USER   DONE CHECKED
    router.get('/api/user/process-search-user/:pagenumber/:search?', checkUserFnSolution.checkForValidAdmin, userController.processGetUserData);
    // ADMIN SEARCH SUBMISSION BY EMAIL  CHECKED
    router.get('/api/user/process-search-user-design/:pagenumber/:search?', checkUserFnSolution.checkForValidAdmin,userController.processGetSubmissionsbyEmail);
    // ADMIN CHANGE USER ROLE CHECKED
    router.get('/api/user/:recordId', checkUserFnSolution.checkForValidAdmin, userController.processGetOneUserData);
    // USER UPDATE DESIGN CHECKED
    router.get('/api/user/design/:fileId',userController.processGetOneDesignData);

};
