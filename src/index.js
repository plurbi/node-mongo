const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();
//connect Db
mongoose.connect('mongodb://plurbi:plurbi1@ds157493.mlab.com:57493/mdb-node', { useNewUrlParser: true })
.then(db => console.log('Base conectada'))
.catch(err => console.log('erro al conectar db', err)
);



//settings
app.set('port', process.env.PORT || 1107);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


//middelweres
app.use(morgan('dev'));
app.use(express.urlencoded({ extended : false }));

//routes
app.use('/',require('./routes/routes.js'));

//startin server
app.listen(app.get('port'),() => {
    console.log('server listen', process.env.PORT);
}) 