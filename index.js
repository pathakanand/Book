const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const Book = require('./models/book');
const authRoutes = require("./routes/authRoutes");
const passport = require('passport');
const LocalStrategy = require('passport-local');
const session = require('express-session');
const User = require('./models/user');
const app = express();

app.set('view engine','ejs');
app.use(express.urlencoded({extended:false}))

let configSession = {
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}

app.use(session(configSession));

app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

passport.use(new LocalStrategy(User.authenticate()));

app.use((req,res,next)=>{
    res.locals.currentUser = req.user;
    next();
})

mongoose.connect('mongodb://localhost:27017/book')
    .then(()=>{
        console.log("DB Connected");
    })

app.use(authRoutes);
app.get('/',async (req,res)=>{
    const books = await Book.find({});
    console.log(books);
    res.render('books/Allbooks', {books});
})

app.get('/book/new',(req,res)=>{
    res.render('books/new');
})

app.post('/book/new', async (req, res)=>{
    console.log(req.body);
    const {name,img,price,author,genre} = req.body;
    await Book.create({name,img,price,author,genre});
    res.redirect('/');
})

app.get('/book/:id', async (req,res)=>{
    let {id} = req.params;
    let foundbook = await Book.findOne({_id:id});
    res.render('books/show',{foundbook});
})

app.get('/book/:id/edit',async (req,res)=>{
    const {id} = req.params;
    const fndbook = await Book.findOne({_id:id});
    console.log(fndbook);
    res.render('books/edit',{fndbook});
})

app.post('/book/:id/edit', async (req,res)=>{
    const {id} = req.params;
    const {name,img,price,author,genre} = req.body;
    await Book.updateOne({_id:id},{name,img,price,author,genre});
    res.redirect('/');
})

app.post('/book/delete/:id', async (req,res)=>{
    const {id} = req.params;
    await Book.deleteOne({_id:id});
    res.redirect('/');
})

app.listen(3300, ()=>{
    console.log("http://localhost:"+3300);
})