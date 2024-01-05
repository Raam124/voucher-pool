const express = require('express')
// const ipAddress = ip.address();

var bodyParser = require('body-parser')
require('dotenv').config()

const app = express()
const port = 8000
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// app.configure(function(){
//   app.use(express.bodyParser());
// });



const auth = require('./routes/auth');
const user = require('./routes/user')
const voucher = require('./routes/voucher')
const promoOffers = require('./routes/promoOffers')

app.use('/api/auth', auth);
app.use('/api/users', user);
app.use('/api/vouchers', voucher);
app.use('/api/promo-offers', promoOffers);

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  // add some fields to provide more info
  if (req.url && !err.url) err.url = req.url;
  if (req.method && !err.method) err.method = req.method;

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  if (err.status != 404) {
    logger4js.error('================== MAIN APP ERROR:', err);
    console.error(err);
  }

  res.status(err.status || 500);

  if (req.url.startsWith('/user') || req.url.startsWith('/wowza')) {
    // send json for the mobile
    if (err.status === 404) {
      logger4js.error('404 Error', err && err.method, err && err.url);
    }
    res.json({ message: err.message });
  } else {
    // render the error page
    res.render('error');
  }
});

module.exports = app;
