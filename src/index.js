const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();

const con = require('./db.Config.js');
//connect Db

mongoose.connect(con.connStrMdbNode, { useNewUrlParser: true })
.then(db => console.log('Base conectada'))
.catch(err => console.log('erro al conectar db', err)
);

//settings
app.set('port', process.env.PORT || 1107);
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');
 app.use(express.static(path.join(__dirname, 'public')));


//middelweres
app.use(morgan('dev'));
app.use(express.json())
// app.use(express.urlencoded({ extended : false }));
//routes
app.use('/api/tasks',require('./routes/Task.routes.js'));
app.use('/',require('./routes/Home.routes.js'));

//startin server
app.listen(app.get('port'),() => {
    console.log('server listen MASTER-REACT , port -> ', app.get('port'));
}) 
