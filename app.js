const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const passport = require('passport');
require('./passport/passport')(passport);

const { port } = require('./configs/general');

const authRoute = require('./routes/authRoute');
const boardRoute = require('./routes/boardRoute');
const teamRoute = require('./routes/teamRoute');
const userRoute = require('./routes/userRoute');

let app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoute);
app.use('/api/board', boardRoute);
app.use('/api/team', teamRoute);
app.use('/api/user', userRoute)

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    detail: err
  });
});

app.listen(port, () => console.log('server is runnning on port ' + port))