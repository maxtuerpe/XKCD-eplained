const express        = require('express');
const app            = express();
const path           = require('path')
const bodyParser     = require('body-parser');
const cors           = require('cors');
const morgan         = require('morgan');
const session        = require('express-session')
require('dotenv').config();

require('./db/db');
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
const corsOptions = {
  origin: process.env.REACT_APP_ADDRESS,
  credentials: true,
  optionsSuccessStatus: 200 
}
app.use(cors({corsOptions}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());



app.use(morgan('short'));


const contributionController = require('./controllers/contributions');



app.use('/api/v1/contributions', contributionController);
app.get('*', (req,res) =>{
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});




app.listen(process.env.PORT || 9000, () => {
  console.log('listening on port 9000');
});