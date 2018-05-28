//import alert from 'alert-node';
var Js = require("js-alert");
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();
var router = express.Router();
var mysql = require('mysql');
var fs = require('fs');
var session = require('express-session');
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

//session stared here
app.use(session({ secret: 'secret' }));
var sess;
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
    console.log("Server statred on " + app.get('port'));
})

app.post('/admin', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/admin.html'));
})

app.post('/user', function (req, res) {
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
    var sql = "CREATE TABLE  " + date + " (sno INTEGER(255) NOT NULL  AUTO_INCREMENT   , name VARCHAR(30) , gender VARCHAR(6) , wtcat INT(3) , bodywt INT(3)  , eorue VARCHAR(2) , lotno VARCHAR(8)  , state VARCHAR(20) , district VARCHAR(20) , s1 INT(4) ,s1s VARCHAR(4), s2 INT(4) , s2s VARCHAR(4) , s3 INT(4) , s3s VARCHAR(4) , sb INT(4) , b1 INT(4) , b1s VARCHAR(4) , b2 INT(4) , b2s VARCHAR(4) , b3 INT(4) , b3s VARCHAR(4) , st INT(4) , d1 INT(4) , d1s VARCHAR(4) , d2 INT(4) , d2s VARCHAR(4) , d3 INT(4) , d3s VARCHAR(4)   , gt INT(4) , wp FLOAT(8) , rank INT(255) , points INT(255) , PRIMARY KEY (sno , lotno)) ";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table created");
        res.sendFile(path.join(__dirname + '/routes/reg.html'));
    })
})

app.post('/sumroute', function (req, res) {
    res.sendFile(path.join(__dirname + '/routes/sumroute.html'));
})

app.post('/lotnosb', function (req, res) {
    res.sendFile(path.join(__dirname + '/routes/lotnosb.html'));
})

app.post('/reg', function (req, res) {
    var data = require('./date');
    var date = data.date();
    console.log("///////////////////////////");
    console.log(date);

    var name = req.body.name, gender = req.body.gender, wtcat = req.body.wtcat, bodywt = req.body.bodywt, eorue = req.body.eorue, lotno, state = req.body.state, district = req.body.dist, s1 = req.body.s1, b1 = req.body.b1, d1 = req.body.d1;
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
        var sql = "INSERT INTO " + date + "(sno , name  , gender  , wtcat  , bodywt   , eorue  , lotno, state  , district  , s1  ,  b1 , d1) VALUES ('','" + name + "','" + gender + "','" + wtcat + "','" + bodywt + "','" + eorue + "','" + lotno + "','" + state + "','" + district + "','" + s1 + "','" + b1 + "','" + d1 + "')";
        con.query(sql, function (err, result) {
            if (err) throw err;
            else
                console.log("1 Row Added");
            console.log("///////////////////////////");
        });
    });
    res.sendFile(path.join(__dirname + '/routes/reg.html'));
})

app.post('/route', function (req, res) {
    res.sendFile(path.join(__dirname + '/routes/routes.html'));
});

app.post('/sb', function (req, res) {
    // For Table Name
    var lotno = req.body.lotno;
    console.log(lotno);
    req.session.lotno = lotno;
    var data = require('./date');
    var date = data.date();
    console.log(date);
    // var lot = "E661";2
    var sql = "SELECT * FROM  " + date + " where lotno = '" + lotno + "' ";
    con.query(sql, function (err, result) {
        if (err) throw err;
        else
            con.query(sql, function (err, result) {
                if (err) throw err;
                else
                console.log(result);          
                var result = JSON.stringify(result);  
                fs.writeFile('sb.json', result);  
                console.log("The Result is passed to sb.json");
            })
    })

    res.sendFile(path.join(__dirname + '/scoreboard/scoreboardfull.html'));
})


app.get('/d3s',function(req,res){
    var lotno = req.session.lotno;
    var d3s = req.query.d3s;
    console.log(d3s);
    var data = require('./date');
    var date = data.date();
    con.query(" UPDATE " + date + " SET d3s = ?  WHERE  lotno = ? ", [d3s, lotno], function (err, result) {
        if (err) throw err;
        else;
        console.log(" For Lotno " + lotno + "  d3s is " + d3s);
       
    })
    res.sendFile(path.join(__dirname + '/scoreboard/scoreboardfull.html'));
})


app.get('/s2d', function (req, res) {
    // For s2
    var lotno = req.session.lotno;
    var s2 = req.query.s2;
    var data = require('./date');
    var date = data.date();
    con.query(" UPDATE " + date + " SET s2 = ?  WHERE  lotno = ? ", [s2, lotno], function (err, result) {
        if (err) throw err;
        else;
        console.log(" For Lotno " + lotno + "  S2 is " + s2);
        res.sendFile(path.join(__dirname + '/scoreboard/scoreboardfull.html'));
    })

})

app.get('/s2d', function (req, res) {
    // For s2
    var lotno = req.session.lotno;
    var s2 = req.query.s2;
    var data = require('./date');
    var date = data.date();
    con.query(" UPDATE " + date + " SET s2 = ?  WHERE  lotno = ? ", [s2, lotno], function (err, result) {
        if (err) throw err;
        else;
        console.log(" For Lotno " + lotno + "  s2 is " + s2);
        res.sendFile(path.join(__dirname + '/scoreboard/scoreboardfull.html'));
    })
})

app.get('/s3d', function (req, res) {
    // For s3
    var lotno = req.session.lotno;
    var s3 = req.query.s3;
    var data = require('./date');
    var date = data.date();
    con.query(" UPDATE " + date + " SET s3 = ?  WHERE  lotno = ? ", [s3, lotno], function (err, result) {
        if (err) throw err;
        else;
        console.log(" For Lotno " + lotno + "  s3 is " + s3);
        res.sendFile(path.join(__dirname + '/scoreboard/scoreboardfull.html'));
    })

})

app.get('/b2d', function (req, res) {
    // For b2
    var lotno = req.session.lotno;
    var b2 = req.query.b2;
    var data = require('./date');
    var date = data.date();
    con.query(" UPDATE " + date + " SET b2 = ?  WHERE  lotno = ? ", [b2, lotno], function (err, result) {
        if (err) throw err;
        else;
        console.log(" For Lotno " + lotno + "  b2 is " + b2);
        res.sendFile(path.join(__dirname + '/scoreboard/scoreboardfull.html'));
    })

})

app.get('/b3d', function (req, res) {
    // For b3
    var lotno = req.session.lotno;
    var b3 = req.query.b3;
    var data = require('./date');
    var date = data.date();
    con.query(" UPDATE " + date + " SET b3 = ?  WHERE  lotno = ? ", [b3, lotno], function (err, result) {
        if (err) throw err;
        else;
        console.log(" For Lotno " + lotno + "  b3 is " + b3);
        res.sendFile(path.join(__dirname + '/scoreboard/scoreboardfull.html'));
    })

})

app.get('/d2d', function (req, res) {
    // For d2
    var lotno = req.session.lotno;
    var d2 = req.query.d2;
    var data = require('./date');
    var date = data.date();
    con.query(" UPDATE " + date + " SET d2 = ?  WHERE  lotno = ? ", [d2, lotno], function (err, result) {
        if (err) throw err;
        else;
        console.log(" For Lotno " + lotno + "  d2 is " + d2);
        res.sendFile(path.join(__dirname + '/scoreboard/scoreboardfull.html'));
    })
})

app.get('/d3d', function (req, res) {
    // For d3
    var lotno = req.session.lotno;
    var d3 = req.query.d3;
    var data = require('./date');
    var date = data.date();
    con.query(" UPDATE " + date + " SET d3 = ?  WHERE  lotno = ? ", [d3, lotno], function (err, result) {
        if (err) throw err;
        else;
        console.log(" For Lotno " + lotno + "  d3 is " + d3);
        res.sendFile(path.join(__dirname + '/scoreboard/scoreboardfull.html'));
    })

})

app.post('/sum', function (req, res) {

    var data = require('./date');
    var date = data.date();
    console.log(date);
    //For Wtcat
    wtcat = req.body.wtcat;

    var gender = req.body.gender, eorue = req.body.eorue;
    var sql = "SELECT *  FROM " + date + " WHERE gender = '" + gender + "' AND eorue = '" + eorue + "' AND wtcat = '" + wtcat + "' ";
    con.query(sql, function (err, result) {
        if (err) throw err;
        else
            //res.send(result);
            var result = JSON.stringify(result);
        console.log(result);
        // res.send(result);
        res.sendFile(path.join(__dirname + '/summary/summary.html'));
    })
})  