import Sequelize from 'sequelize';

import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLString,
  GraphQLList
} from 'graphql';

let pgURI = 'postgres://localhost/starwars';
let sequelize = new Sequelize(pgURI);

let User = sequelize.define('users', {
  name : {type : Sequelize.STRING},
  species : {type : Sequelize.STRING},
  gender : {type : Sequelize.STRING},
  birthyear : {type : Sequelize.STRING},
  homeworld : {type : Sequelize.STRING}
});

User.sync();
User.belongsToMany(User, {through: 'friends_table', as: 'friends'});

let userType = new GraphQLObjectType({
    name: 'user', //TODO: Force user to give same name as table name
    description: 'this is the user type',
    fields : ()=>({
      'name' : {type: GraphQLString},
      'species' : {type: GraphQLString},
      'gender' : {type: GraphQLString},
      'birthyear' : {type: GraphQLString},
      'homeworld' : {type: GraphQLString},
      'friends' : {
        type: new GraphQLList(userType),
        description: 'Returns friends of the user. Returns empty array if user has no friends',
      }
    })
});

let Query = new GraphQLObjectType({
  name: 'query',
  description: 'this is the root query',
  fields: {
    //TODO:
    // Currently a dummy to make compilable. Make a useful function
    // e.g. introspect available queries
    // Needs to take in userType, blogpostType etc
    // so it is connected to schema
    presetFunctions:{type: userType},
    getUser:{
      type: userType,
      description: 'get user object',
      args: {
        name:{type: GraphQLString}
      },
      resolve: (root, args/*{name}*/) => {
        console.log('GetUserQuery got args: ', args);
        // return {
        //   name : 'Bobo',
        //   age: 23
        // }
        User
          .findOne({where: args})
          .then(function(user) {
            console.log('getUser found', user);
          });
      }
    },
    getUsers:{
      type: new GraphQLList(userType),
      description: 'get user object',
      args: {
        name:{type: GraphQLString}
      },
      resolve: (root, args) => {
        console.log('GetUsersQuery got args: ', args);
        return User
          .findAll()
          .then(function(users) {
            console.log('getUsers found', users);
            return users;
          });
        // return {
        //   name : 'Bobo',
        //   age: 23
        // }
      }
    },
  }
});

let Mutation = new GraphQLObjectType({
  name: 'mutation',
  description: 'this is the root mutation',
  fields: {
    presentMutator:{type: userType},
  }
});

let schema = new GraphQLSchema({
   query : Query,
   mutation : Mutation
});

module.exports = schema;
