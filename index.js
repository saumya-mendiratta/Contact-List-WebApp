const { profile } = require('console');
const { response } = require('express');
const express = require('express');
const { homedir } = require('os');

const path = require('path');
const port =8000;

//For requiring mongoose database
const db = require('./config/mongoose');

//For requiring contact.js file
const Contact =require('./models/contact');

const app = express();

// ---For using middleware Parser----
// Parser: Takes data input from browser and gives it to request
app.use(express.urlencoded());

app.use(express.static('assests'));


//Creating Middleware1
// app.use( function(req , res , next){

//     // console.log("middleware 1 called");
//     req.myName =" saummya";
//     next();
// });



//Creating Middleware2
// app.use(function(req, res , next){

//     // console.log("middleware 2 called");
//     console.log('from mw2', req.myName);
//     next();
// });



// --------Setting up EJS--------
app.set('view engine','ejs');
// --------Setting path in views folder--------
app.set('views', path.join(__dirname,'views'));


// ------Contact List-----------
var contactList =[
        // {
        //     name:"Saumya",
        //     phone:"9871535223"
        // },
        // {
        //     name:"Stark",
        //     phone:"9871555223"
        // },
        // {
        //     name:"Ninja",
        //     phone:"9871785223"
        // }
]



// -----------For home.ejs-------------
app.get('/', function(req, res){

    // console.log(req);
    // console.log(__dirname);
    // res.send("<h1>cool, It is running</h1>");


    // -----for testinf middlwares---
    // console.log('from get', req.myName);


    // ------Rendering the home html from views-------
    // return res.render('home', 
    // {
    //     title : "My Contact List",
    //     contact_list : contactList
    // });


    //After attaching database to it
    Contact.find({} , function(err,contacts){

        if(err){
            console.log("Error in fetching contact");
            return;
        }

        return res.render('home', 
        {
            title : "My Contact List",
            contact_list : contacts
        });

    });

});


// ----------For profile.ejs--------------
app.get('/practice', function(req, res){

    return res.render('practice',{
        title:"Let us play with ejs"
    });
});



// ---------For Creating Contact in List dynamically-------
app.post('/create-contact', function(req, res){

    // console.log(req.body);
    // console.log(req.body.name);
    // console.log(req.body.phone);
    // return res.redirect('/practice');

    //Commenting because now we are using database
    // contactList.push({
    //     name: req.body.name,
    //     phone:req.body.phone
    // });
    
    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    } , function(err , newContact){

        if(err){
        console.log("There's and error in creating contact");
        return;
        }

        console.log("*******", newContact);
        return res.redirect('back');
    });

     // returning back so that page refreshes to show new data
    // return res.redirect('/');
});


// -----For deleting contact--------
app.get('/delete-contact', function(req , res) {
    
    // -----WITHOUT DATABSE------
    // console.log(req.query);
    // let phone = req.query.phone;
    // // ----Finding index matching the query---
    // let contactIndex = contactList.findIndex(contact => contact.phone== phone);
    // if(contactIndex!=-1){
    //     contactList.splice(contactIndex , 1);
    // }
    // // returning back so that page refreshes to show new data
    // return res.redirect('back');


    // --------WITH DATABASE-------

    let id = req.query.id;

    Contact.findByIdAndDelete(id , function(err){
        if(err){
            console.log("Error in deleting");
            return ;
        }

        return res.redirect ('back');
    });

});



app.listen(port , function(err){

    if(err){
        console.log("error in running the server",err);
    }

    console.log("Yup my Express server is running on port: ", port);

});