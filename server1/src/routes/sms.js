const router = require('express').Router();


router.route('/send').post((req,res)=>{



    const accountSid='';
    
    
    const authToken='';
    console.log(accountSid)
    
    const client = require('twilio')(accountSid, authToken);
    
    const {to,body} = req.body
    
    client.messages.create({
        body:body,
        from:'',
        to:to,
    })
    
    
    .then((message)=> console.log('the message has send with id:'+message))
    .catch((err)=>console.log(err));
    console.log(to)
    })
    module.exports = router;