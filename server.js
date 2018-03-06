var express = require('express');
var morgan = require('morgan');
var path = require('path');
var pool = require('pg').pool;
var crypto = require('crypto');

var config = {
    user: 'mravigneshwaran',
    database: 'mravigneshwaran',
    host: 'db.imad.hasura-app.io ',
    port: '5432',
    password: process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));

var articles={
    'article-one':{
        title:'Article One | vignesh',
        heading:'Aritcle One',
        date:'Sep 9, 2018',
        content:` <p>This is my first aritcle This is my first aritcle This is my first aritcle This is my first aritcle This is my first aritcle This is my first aritcle This is my first aritcle
                </p>
                <p>This is my first aritcle This is my first aritcle This is my first aritcle This is my first aritcle This is my first aritcle This is my first aritcle This is my first aritcle
                </p>
                <p>This is my first aritcle This is my first aritcle This is my first aritcle This is my first aritcle This is my first aritcle This is my first aritcle This is my first aritcle
                </p>
                
                <input type="submit id="submit_btn value="submit>`
        },
    'article-two':{
            title:'Article Two | vignesh',
            heading:'Aritcle Three',
            date:'Sep 9, 2018',
            content:`
                    <p>This is my Second aritcle 
                    </p>`
        },
    'article-three':{
                title:'Article Three | vignesh',
                heading:'Aritcle Three',
                date:'Sep 9, 2018',
                content:` 
                <p>This is my Third aritcle</p>`
    }
                
};
        

function createTemplate (data) {
    var title = data.title;
    var date = data.date;
    var heading = data.heading;
    var content = data.content;
    var inputbox = data.inputbox;
    
    var htmlTemplate=`
    <html>
    <head>
    <title>
        ${title}
     </title>
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <link href="/ui/style.css" rel="stylesheet" />
    </head>
    <body>
    <div class='container'>
    <div>
    <a href="/">Home</a>
    </div>
    <hr/>
    <h3>
        ${heading}
    </h3>
    <div>
        ${date}
    </div>
    <div>
        ${content}
    </div>
    <div>
        ${inputbox}
    </div>
    </div>
    </body>
    </html>
    `;
    return htmlTemplate;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

function hash(input,salt){
    //How do we create a hash?
    var hashed = crypto.pbkdf2Sync(input,salt,10000,512,'sha512');
    return hased.toString(hex);
}

app.get('/hash/:input', function(req,res){
   var hashedString = hash(req.params.input,'this is some random string') ;
   res.send(hashedString);
});

var pool = new pool(config);
//make db
app.get('/test-db',function(req,res){
    //make a select request
    //return a response with the results
    pool.query('SELECT * from test',function(err,result){
       if(err) {
           res.status(500).send(err.toString());
       }else{
           res.send(JSON.stringify(result));
       }
    });

});

//adding counter
var counter=0; 
app.get('/counter', function(req,res){
   counter = counter + 1;
   res.send(counter.toString());
});

var names=[];
app.get('/submit-name/', function(req,res){ //URL: /submit-name?name=xxxx
    //Get the name from the request
    var name = req.query.name;
    
    names.push(name);
    //JSON: Javascript Object Notation
    res.send(JSON.stringify(names));
});


app.get('/articles/:articalName', function(req,res){
    //articleName ==article-one
    //articles[articalName]=={}content object for articles one
    //extract article name

    pool.query("select * from article where title= $1",[req.params.articleName] , function(err,result){
        if(err){
            res.status(500).send(err.toString());
        }else{
            if(result.rows.length === 0){
                res.status(404).send('Article Not found');
            }else{
                var articleData = result.rows[0];
                res.send(createTemplate(articalData));
            }
        }
    });
    res.send(createTemplate(articleData));
});


app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
