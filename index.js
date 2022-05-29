const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');

const port = 3000
var path = require('path');
const app = express();

var login = "admin";
var password = "12345"

app.use(session({
    secret: 'b5146669-ae1e-4193-bc71-1197e6f1dc17'
}));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use('/public', express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, '/views'));


app.post('/', (req, res) => {
    if (req.body.password == password && req.body.login == login) {
        req.session.login = login;
        res.render('logado', {login: login});
    } else {
        res.render('index');
    }


})

app.get('/', (req, res) => {
    if (req.session.login) {
        res.render('logado');   
    } else {
        res.render('index');
    }

});

app.listen(port, () => {
    console.log('servidor rodando');
})