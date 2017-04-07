var express = require("express"),
    http = require("http"),
    math = require("mathjs"),
    app = express()
    
app.use(express.urlencoded());
app.use(express.cookieParser());
http.createServer(app).listen(8080);

var topHtml = "<html><body>";
var formHtml = "<form action='/eval' method='post'>Expression: <input type='text' name='expression'><br><input type='submit' value='Submit' name='action'><input type='submit' value='Clear' name='action'></form>";
var bottomHtml = "</body></html>";

app.get("*", function (req, res) {
    res.send(topHtml + (req.cookies['history'] != null ? req.cookies['history'] : "") + "<hr>" + formHtml + bottomHtml);
});

app.post("/eval", function (req, res) {
    
    var newcookieval = (req.cookies['history'] != null || req.cookies['history'] == "" ? req.cookies['history'] + "<br/>": "");
    
    if(req.body.action == "Submit"){
        newcookieval += req.body.expression + "=" + math.eval(req.body.expression);
    }else{
        newcookieval = "";
    }
    
    res.cookie('history', newcookieval, { maxAge: 2147483647, httpOnly: true });
    
    res.send(topHtml + newcookieval + "<hr>" + formHtml + bottomHtml);
});
