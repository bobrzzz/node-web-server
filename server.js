const express = require('express');
const hbs = require('hbs');
const fs = require('fs')

let app = express();

app.set('view engine', 'hbs');

hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getFullYear', ()=>new Date().getFullYear())


hbs.registerHelper('screamIt', (text)=>text.toUpperCase())

app.use(express.static(__dirname + '/public'));

app.use((req, res, next)=>{
    let now = new Date().toString();
    let log = `${now} ${req.method}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err)=>{
        console.log('kek')
    })
    next();
})


app.use((req, res, next)=>{
    res.render('maintenance.hbs', {
        pageTitle: 'Page title',
       
        message: 'kek cheburek'
    });
})

app.get('/', (req, res) => {
    res.render('index.hbs', {
        pageTitle: 'Page title',
       
        message: 'kek cheburek'
    });
});


app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'Abourt  '
    });
})

app.get('/bad', (req, res) => {
    res.send({
        error: 'kek no workl'
    })
})

app.listen(3000, ()=>{
    console.log('server is up')
});