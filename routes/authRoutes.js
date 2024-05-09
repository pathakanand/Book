const express = require('express');
const User = require('../models/user');
const passport = require('passport');

const router = express.Router()

router.get('/register', (req,res)=>{
    res.render('auth/signup');
})

router.post('/register',async (req,res)=>{
    let{username, email, password,age,gender,phonenumber} = req.body;
    let newUsr = new User({username, email,age,gender,phonenumber});
    let nayabanda = await User.register(newUsr, password)
    console.log(nayabanda)
    res.redirect('/login');
})

router.get('/login', (req,res)=>{
    res.render('auth/login')
})

router.post('/login', 
    passport.authenticate('local',
    {    
        failureRedirect: '/login'
    }),
    function(req,res){
        console.log(req.user, "new");
        res.redirect('/')
    }
);

router.get('/logout', (req, res) => {
    req.logout(() => {}); // Provide an empty callback function
    res.redirect('/');
});

module.exports = router;