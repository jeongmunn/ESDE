const rateLimit=require('express-rate-limit')
var rateLimitFn = {

 LoginLimit : rateLimit({
    max: 3,// limit each IP to 3 max requests per windowsMS
    windowMs: 1000*60, // 1 min
    message: 'Too many requests' ,// message to send
    
}),



RegisterLimit : rateLimit({
    max: 5,// limit each IP to 5 max requests per windowsMS
    windowMs: 1000*60*60, // 1 Hour
    message: 'Too many requests' ,// message to send
    
}),

InviteFriendLimit : rateLimit({
    max: 5,// limit each IP to 5 max requests per windowsMS
    windowMs: 1000*60*60, // 1 Hour
    message: 'Too many requests' ,// message to send
    
})



}

module.exports = rateLimitFn;
