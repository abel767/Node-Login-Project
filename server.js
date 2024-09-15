const express = require('express');
const app = express();
const hbs = require('hbs'); // hbs is initialised
const session = require('express-session'); // express session for clearing the token(back adikumbol login pageil pokathe irikan)
const nocache = require('nocache');


app.use(express.static('public')); // static file storing in public 
app.set('view engine', 'hbs'); // setting view engine as hbs

app.use(express.json()) // for getting the data as js object (for showing data in console)
app.use(express.urlencoded({extended: true})) // both for json 

app.use(nocache())


app.use(session({ //  for session initialize 
    secret: 'keyboard cat',
    resave: false, 
    saveUninitialized: false, 
  }))


// setting the email and password for login 
const email = "abel@gmail.com"
const password = '123'

app.get('/',(req,res)=>{
    if(req.session.email){  // checking the session username and the input username same or not 
        res.render('home',{email: req.session.email})
    }else{
        if(req.session.passwordWrong){
            res.render('loginPage',{msg:'Oops! Wrong Info '})
            req.session.passwordWrong = false;
        }else{
            res.render('loginPage')
        }
        
    }
    
})

app.post('/verify',(req,res)=>{  // the email and password from the  form using post method 
    console.log(req.body); // to show the data (email and password) in console 

    // verify the email and password 
    if(req.body.email === email && req.body.password === password){
        req.session.email = req.body.email // storing username to session
        res.redirect('/home'); // rendering the home
    }else{
        req.session.passwordWrong = true;
        res.redirect('/')
    }
       
})


app.get('/home',(req,res)=>{
    if(req.session.email){
        res.render('home',{email: req.session.email})
    }else{
        if(req.session.passwordWrong){
            res.render('loginPage',{msg:'Oops! Wrong Info'})
            req.session.passwordWrong = false;
        } else{
            res.render('loginPage');
        }
    }
})

// logout route

app.get('/logout', (req,res)=>{
    req.session.destroy(); // distroying the user data so user have to login again
    res.render('loginPage',{msg: ` You’ve Signed Off `})
})

app.listen(3000,()=>{
    console.log('server is running on http://localhost:3000');
})