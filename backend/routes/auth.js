const express=require('express');
const User = require('../models/User');
const router=express.Router();
const { body, validationResult } = require('express-validator');
const { json } = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET='TOM$123';

// create a user using: POST "/api/auth/createuser". no login required
router.post('/createuser', 
[
    body('name','enter valid name').isLength({ min: 3 }),
    body('email','enter valid email').isEmail(),
    body('password','password must be atleast 5 character').isLength({ min: 5 })
], 
async (req,res)=>{
    // if there are errors, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      // check whether the user with this email exists already
      let user=await User.findOne({email: req.body.email});
      if (user) {
        return res.status(400).json({error:"sorry a user with this email already exists"});
      }
      // salt
      const salt=await bcrypt.genSalt(10);
      const secPass=await bcrypt.hash(req.body.password, salt);
      // create a new user
      user=await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass
      });
      const data={
        user:{
          id: user.id
        }
      }
      const authToken=jwt.sign(data,JWT_SECRET);
      // console.log(jwtData);
      res.json(authToken)
    } catch (error) {
      console.error(error.message);
      res.status(500).send("some error occured");
    }
})

module.exports=router;