//jshint esversion: 6

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/signup.html');
});

app.post('/', function(req, res) {
  var firstName = req.body.fname;
  var lastName = req.body.lname;
  var email = req.body.email;

  var data = {
    members: [
      {
        email_address: email,
        status: 'subscribed',
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };
  var jsonData = JSON.stringify(data);

  // console.log(firstName, lastName, email);

  var options = {
    url: 'https://us20.api.mailchimp.com/3.0/lists/b8c292d8e1',
    method: 'POST',
    headers: {
      Authorization: 'lyndon1 12453365229e5c520ded58580bb1526a-us20'
    },
    body: jsonData
  };

  request(options, function(error, response, body) {
    if (error) {
      // console.log(error);
      // res.send('There was an error with signing up, please try again');
      res.sendFile(__dirname + '/failure.html');
    } else {
      // console.log(response.statusCode);
      if (response.statusCode === 200) {
        res.sendFile(__dirname + '/success.html');
      } else {
        res.sendFile(__dirname + '/failure.html');
      }
    }
  });
});

app.post('/failure', function(req, res) {
  res.redirect('/');
});

app.listen(process.env.PORT || 3000, function() {
  console.log('Server is runing on port 3000.');
});

//  12453365229e5c520ded58580bb1526a-us20
// id b8c292d8e1

//todo  https://stormy-beach-32188.herokuapp.com/