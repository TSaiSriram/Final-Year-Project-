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
