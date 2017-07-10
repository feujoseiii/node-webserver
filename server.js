const express = require('express');
const hbs = require('hbs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
  var now = new Date().toString();
  console.log(`${now}: ${req.method} ${req.url}`);
  next();
});

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  res.send({
    name: 'jose',
    likes: ['code','games'],
    age: 20
  });
});

app.get('/projects', (req,res) => {
  res.render('about.hbs', {
    pageTitle: 'Project Title'
  });
});

app.get('/about', (req,res) => {
  res.render('about.hbs', {
    pageTitle: 'about page'
  });
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
