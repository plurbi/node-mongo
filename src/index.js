const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();
//connect Db
var connectionString = 'mongodb://plurbi:plurbi1@ds045087.mlab.com:45087/nodoose-tasklist';
var connectionStringPROD = 'mongodb://plurbi:plurbi1@ds157493.mlab.com:57493/mdb-node';

mongoose.connect(connectionString, { useNewUrlParser: true })
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
    console.log('server listen MASTER-REACT , port -> ', app.get('port'));
}) 
