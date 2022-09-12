const express=require('express');
const User = require('../models/User');
const router=express.Router();
const { body, validationResult } = require('express-validator');

// create a user using: POST "/api/auth/". doesn't require Auth
router.post('/', 
[
    body('name','enter valid name').isLength({ min: 3 }),
    body('email','enter valid email').isEmail(),
    body('password','password must be atleast 5 character').isLength({ min: 5 })
], 
(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    }).then(user => res.json(user))
    .catch(err=>{
      console.log(err),
      res.json({error:'please enter a unique email',message: err.message})
    });
})

module.exports=router;