var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();
var router = express.Router();
var mysql = require('mysql');
var cookieParser = require('cookie-parser');
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "secret",
    database: "pldb"
});
con.connect(function (err) {
    if (err) throw err;
    console.log("Connected To database pldb");
})
app.set('port', 8080);
//app.use(cookieParser());

//Static Def
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
    console.log(req.method, req.url);
    next();
});


//Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(app.get('port'), function () {
    console.log("Server statred on port 8080");
})

app.get('/admin', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/admin.html'));
})

app.get('/user', function (req, res) {
    res.sendFile(path.join(__dirname + '/routes/user.html'));
})

//router.use('/', router);
app.post('/login', function (req, res) {
    var email = req.body.email;
    var pass = req.body.password;
    var admin = '', password = '';
    var sql = "select * from admin";
    con.query(sql, function (err, result, fields) {
        if (err) throw err;
        admin = result[0].name;
        password = result[0].pass;
        if ((admin == email) && (password == pass)) {
            console.log("Youre Admin !!!");
            //app.route('/routes/routes.html');
            //app.use(express.static(path.join(__dirname, 'public/admin.html')));
            res.sendFile(path.join(__dirname + '/routes/reg.html'));// Admin can access next page
        } else {
            console.log("Youre not admin");
            res.sendFile(path.join(__dirname + '/public/admin.html'));// Admin can access next page
        }
    })
})

app.post('/nt', function (req, res) {
    var data = require('./date');
    var date = data.date();
    console.log(date);
    //var sql = "DROP TABLE Date_18_03_2018";
    var sql = "CREATE TABLE  " + date + " (sno INTEGER(255) NOT NULL  AUTO_INCREMENT   , name VARCHAR(30) , gender VARCHAR(6) , image BLOB , wtcat INT(3) , bodywt INT(3)  , eorue VARCHAR(2) , lotno VARCHAR(8)  , state VARCHAR(20) , district VARCHAR(20) , s1 INT(4) ,s1s VARCHAR(4), s2 INT(4) , s2s VARCHAR(4) , s3 INT(4) , s3s VARCHAR(4) , sb INT(4) , b1 INT(4) , b1s VARCHAR(4) , b2 INT(4) , b2s VARCHAR(4) , b3 INT(4) , b3s VARCHAR(4) , st INT(4) , d1 INT(4) , d1s VARCHAR(4) , d2 INT(4) , d2s VARCHAR(4) , d3 INT(4) , d3s VARCHAR(4)   , gt INT(4) , wp FLOAT(8) , rank INT(255) , PRIMARY KEY (sno , lotno)) ";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table created");
        res.sendFile(path.join(__dirname + '/routes/reg.html'));
    })
})

app.get('/sumroute', function (req, res) {
    res.sendFile(path.join(__dirname + '/routes/sumroute.html'));
})

app.get('/lotnosb', function (req, res) {
    res.sendFile(path.join(__dirname + '/routes/lotnosb.html'));
})


app.get('/reg', function (req, res) {
    var data = require('./date');
    var date = data.date();
    console.log("///////////////////////////");
    console.log(date);

    var name = req.query.name, gender = req.query.gender, wtcat = req.query.wtcat, bodywt = req.query.bodywt, eorue = req.query.eorue, lotno, state = req.query.state, district = req.query.dist, s1 = req.query.s1, b1 = req.query.b1, d1 = req.query.d1;
    var gsno = "SELECT * FROM " + date;
    console.log(wtcat);
    console.log(bodywt);
    con.query(gsno, function (err, result, feilds) {
        if (err) throw err;
        else
            var i = "1";
        var sno = "1";

        for (; i = result.length;) {
            sno = result[i - 1].sno;
            sno++;
            console.log(sno);
            break;
        }
        lotno = eorue + wtcat + sno;
        console.log(lotno);
        console.log(name);
        var sql = "INSERT INTO " + date + "(sno , name  , gender  , image , wtcat  , bodywt   , eorue  , lotno, state  , district  , s1  ,  b1 , d1) VALUES ('','" + name + "','" + gender + "','','" + wtcat + "','" + bodywt + "','" + eorue + "','" + lotno + "','" + state + "','" + district + "','" + s1 + "','" + b1 + "','" + d1 + "')";
        con.query(sql, function (err, result) {
            if (err) throw err;
            else
                console.log("1 Row Added");
            console.log("///////////////////////////");
        });
    });
    res.sendFile(path.join(__dirname + '/routes/reg.html'));
})

app.get('/route', function (req, res) {
    res.sendFile(path.join(__dirname + '/routes/routes.html'));
});

app.get('/sb', function (req, res) {
    // For Table Name
    var lotno = req.query.lotno;
    console.log(lotno);
    var data = require('./date');
    var date = data.date();
    console.log(date);

    // var lot = "E661";
    var sql = "SELECT * FROM  " + date + " where lotno = '" + lotno + "' ";

    con.query(sql, function (err, result, feild) {
        if (err) throw err;
        else
            //console.log(result[0].name, result[0].image, result[0].gender, result[0].state, result[0].district, result[0].wtcat, result[0].bodywt);
            //var data = ["s2", "s3", "b2", "b3", "d2", "d3"];

            con.query(sql, function (err, result) {
                if (err) throw err;
                else
                    console.log("Data Taken From Box");
            })
    })
    res.sendFile(path.join(__dirname + '/scoreboard/scoreboardfull.html'));

})

app.post('/sum', function (req, res) {

    var data = require('./date');
    var date = data.date();
    console.log(date);

    //sample wt
    wtcat = req.query.wtcat;
    //For Selectin of Query

    var gender = req.query.gender, eorue = req.query.eorue;
    var sql = "SELECT *  FROM " + date + " WHERE gender = '" + gender + "' AND eorue = '" + eorue + "' AND wtcat = '" + wtcat + "' ";
    con.query(sql, function (err, result) {
        if (err) throw err;
        else

            //res.send(result);
            var result = JSON.stringify(result);
        console.log(result);
        //res.send(result);
        res.sendFile(path.join(__dirname + '/summary/summary.html?' + result));
    })
})