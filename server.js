import express from 'express';
import bodyParser from 'body-parser';
import Schema from './data/schema';
import {graphql} from 'graphql';

async function graphQLHandler(req, res) {

  console.log('you in gql handler!');
  const {query, variables = {}} = req.body;
  const result = await graphql(
    Schema,
    query,
    {db: req.db},
    variables
  );
  console.log('server.js : gqlhandler, result', result);
  return res.send(result);
}

let app = express();

app.use(express.static('client'));
app.use(bodyParser.urlencoded());

//let graphQLHandler = Nala(Schema, pgURI);

app.use('/', graphQLHandler);
app.use('/character', function(req,res){
  console.log('Request to character');
});



// app.get('/users', function(req, res) {
//   //console.log(req);
//   //console.log('got get request to users');
//   User
//     .findAll({})
//     .then(function(users) {
//       console.log(users);
//       res.send(users);
//     });
// });

app.get('/friends', function(req, res) {
  console.log(req.query);
  User
    .findOne({where: req.query})
    .then(function (user) {
      console.log('user is', user);
      user
        .getFriends({})
        .then(function(friends) {
          console.log('got friends', friends);
          res.send(friends);
        });
    });
});

app.listen(process.env.PORT || 3000, function(){
  console.log('Server is listening on port 3000');
});

module.exports = app;
