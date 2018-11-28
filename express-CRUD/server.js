const express        = require('express');
const app            = express();
const bodyParser     = require('body-parser');
const cors           = require('cors');
const morgan         = require('morgan');
const session        = require('express-session')

require('./db/db');
app.use(session({
  secret: 'AHHHHHHHHHHHHHHHHidontknowwhatimdoing',
  resave: false,
  saveUninitialized: false
}))
const corsOptions = {
  origin: 'https://xkcd-explained.herokuapp.com/',
  credentials: true,
  optionsSuccessStatus: 200 
}
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());



app.use(morgan('short'));


const contributionController = require('./controllers/contributions');


app.use('/contributions', contributionController);


app.listen(process.env.PORT || 9000, () => {
  console.log('listening on port 9000');
});