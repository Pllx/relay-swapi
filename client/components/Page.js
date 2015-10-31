var React = require('react');
var $ = require('jQuery');

var SelectedView = require('./SelectedView');
var OptionsView = require('./OptionsView');
var FriendsView = require('./FriendsView');
var Header = require('./Header');
var Footer = require('./Footer');

var Page = React.createClass({

    // Helper methods:
    updateSelected: function(selection) {
      console.log('Ouch!!', selection.name);
      // $.get('/friends', {name: selection.name}, function(friends) {
      //   console.log('received friends', friends);
      //   this.setState({
      //     selected : selection,
      //     friends : friends,
      //   });
      // }.bind(this));

    },

    // Lifecycle methods:
    getInitialState : function() {
      return ({
        selected : {},
        options : [],
        friends : [],
      });
    },

    componentDidMount : function() {
      console.log('in component did mount');
      //get from database
      // $.get('/users', function(users) {
      //   console.log('received users', users);
      //   this.setState({
      //     selected : users[0],
      //     options : users
      //   });
      //
      //   $.get('/friends', {name: users[0].name}, function(friends) {
      //     console.log('received friends', friends);
      //     this.setState({
      //       friends : friends
      //     });
      //   }.bind(this));
      //
      // }.bind(this));
    },

    render : function() {
      //            <OptionsView options={this.state.options} updateSelected={this.updateSelected} />
      return (
        <div id="container" style={styles.page}>

          <Header />
          <div id="navbar"></div>
          <div id="content">
            <br /><br />
            <SelectedView selected={this.state.selected} />
            <br />
            <h3 style={styles.sectionTitle}>Friends</h3>
            <FriendsView friends={this.state.friends} updateSelected={this.updateSelected} />
            <br />
            <h3 style={styles.sectionTitle}>Users</h3>
            <OptionsView options={this.state.options} updateSelected={this.updateSelected} />
          </div>

        </div>
      )
    }
  }
);

var styles = {
  page : {
    backgroundColor : '#151515'
  },
  sectionTitle : {
    color: 'white',
    width: '70%',
    textAlign : 'center',
    margin: '0 auto'
  }

};

module.exports = Page;
