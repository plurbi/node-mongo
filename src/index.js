const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');

const dbConfig = require('./db.js');
const app = express();
//connect Db


mongoose.connect(dbConfig.connStrTaskList , { useNewUrlParser: true })
.then(db => console.log('Base conectada'))
.catch(err => console.log('erro al conectar db', err)
);

//settings
app.set('port', process.env.PORT || 1107);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

//middelweres
app.use(morgan('dev'));
app.use(express.urlencoded({ extended : false }));

//routes
app.use('/',require('./routes/TaskRoutes.js'));
app.use('/',require('./routes/HomeRoutes.js'));

//startin server
app.listen(app.get('port'),() => {
    console.log('server MASTER listen, port -> ', app.get('port'));
}) 
