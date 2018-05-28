app.get('/s1s',function(req,res){
    var lotno = req.session.lotno;
    var s1s = req.query.s1s;
    console.log(s1s);
    var data = require('./date');
    var date = data.date();
    con.query(" UPDATE " + date + " SET s1s = ?  WHERE  lotno = ? ", [s1s, lotno], function (err, result) {
        if (err) throw err;
        else;
        console.log(" For Lotno " + lotno + "  s1s is " + s1s);
       
    })
    res.sendFile(path.join(__dirname + '/scoreboard/scoreboardfull.html'));
})
app.get('/s2s',function(req,res){
    var lotno = req.session.lotno;
    var s2s = req.query.s2s;
    console.log(s2s);
    var data = require('./date');
    var date = data.date();
    con.query(" UPDATE " + date + " SET s2s = ?  WHERE  lotno = ? ", [s2s, lotno], function (err, result) {
        if (err) throw err;
        else;
        console.log(" For Lotno " + lotno + "  s2s is " + s2s);
       
    })
    res.sendFile(path.join(__dirname + '/scoreboard/scoreboardfull.html'));
})

app.get('/s3s',function(req,res){
    var lotno = req.session.lotno;
    var s3s = req.query.s3s;
    console.log(s3s);
    var data = require('./date');
    var date = data.date();
    con.query(" UPDATE " + date + " SET s3s = ?  WHERE  lotno = ? ", [s3s, lotno], function (err, result) {
        if (err) throw err;
        else;
        console.log(" For Lotno " + lotno + "  s3s is " + s3s);
       
    })
    res.sendFile(path.join(__dirname + '/scoreboard/scoreboardfull.html'));
})

app.get('/b1s',function(req,res){
    var lotno = req.session.lotno;
    var b1s = req.query.b1s;
    console.log(b1s);
    var data = require('./date');
    var date = data.date();
    con.query(" UPDATE " + date + " SET b1s = ?  WHERE  lotno = ? ", [b1s, lotno], function (err, result) {
        if (err) throw err;
        else;
        console.log(" For Lotno " + lotno + "  b1s is " + b1s);
       
    })
    res.sendFile(path.join(__dirname + '/scoreboard/scoreboardfull.html'));
})

app.get('/b2s',function(req,res){
    var lotno = req.session.lotno;
    var b2s = req.query.b2s;
    console.log(b2s);
    var data = require('./date');
    var date = data.date();
    con.query(" UPDATE " + date + " SET b2s = ?  WHERE  lotno = ? ", [b2s, lotno], function (err, result) {
        if (err) throw err;
        else;
        console.log(" For Lotno " + lotno + "  b2s is " + b2s);
       
    })
    res.sendFile(path.join(__dirname + '/scoreboard/scoreboardfull.html'));
})

app.get('/b3s',function(req,res){
    var lotno = req.session.lotno;
    var b3s = req.query.b3s;
    console.log(b3s);
    var data = require('./date');
    var date = data.date();
    con.query(" UPDATE " + date + " SET b3s = ?  WHERE  lotno = ? ", [b3s, lotno], function (err, result) {
        if (err) throw err;
        else;
        console.log(" For Lotno " + lotno + "  b3s is " + b3s);
       
    })
    res.sendFile(path.join(__dirname + '/scoreboard/scoreboardfull.html'));
})

app.get('/d1s',function(req,res){
    var lotno = req.session.lotno;
    var d1s = req.query.d1s;
    console.log(d1s);
    var data = require('./date');
    var date = data.date();
    con.query(" UPDATE " + date + " SET d1s = ?  WHERE  lotno = ? ", [d1s, lotno], function (err, result) {
        if (err) throw err;
        else;
        console.log(" For Lotno " + lotno + "  d1s is " + d1s);
       
    })
    res.sendFile(path.join(__dirname + '/scoreboard/scoreboardfull.html'));
})

app.get('/d2s',function(req,res){
    var lotno = req.session.lotno;
    var d2s = req.query.d2s;
    console.log(d2s);
    var data = require('./date');
    var date = data.date();
    con.query(" UPDATE " + date + " SET d2s = ?  WHERE  lotno = ? ", [d2s, lotno], function (err, result) {
        if (err) throw err;
        else;
        console.log(" For Lotno " + lotno + "  d2s is " + d2s);
       
    })
    res.sendFile(path.join(__dirname + '/scoreboard/scoreboardfull.html'));
})
