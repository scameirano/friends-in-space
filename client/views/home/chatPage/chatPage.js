//Messages = new Mongo.Collection("messages");
Rooms = new Mongo.Collection("rooms");
Messages = new Mongo.Collection("msg");

//if (Meteor.isClient) {

  Accounts.ui.config({
    passwordSignupFields: 'USERNAME_ONLY'
  });

  Meteor.subscribe("rooms");
  Meteor.subscribe("msg");
  Session.setDefault("roomname", "Meteor");

  Template.input.events({
    'click .sendMsg': function(e) {
       _sendMessage();
    },
    'keyup #msg': function(e) {
      if (e.type == "keyup" && e.which == 13) {
        _sendMessage();
      }
    }
  });

  _sendMessage = function() {
    var el = document.getElementById("msg");
    var c = {user: Meteor.user().username, msg: el.value, ts: new Date(), room: Session.get("roomname")};
    console.log(JSON.stringify(c));
    Messages.insert({user: Meteor.user().username, msg: el.value, ts: new Date(), room: Session.get("roomname")});
    el.value = "";
    el.focus();
  };

  Template.messages.helpers({
    messages: function() {
      return Messages.find({room: Session.get("roomname")});
    },
    roomname: function() {
      return Session.get("roomname");
    }
  });
  
  Template.message.helpers({
    timestamp: function() {
      return this.ts.toLocaleString();
    }
  });

  Template.rooms.events({
    'click li': function(e) {
      Session.set("roomname", e.target.innerText);
    }
  });
  
  Template.rooms.helpers({
    rooms: function() {
      return Rooms.find();
    }
  });
  
  Template.room.helpers({
    roomstyle: function() {
      return Session.equals("roomname", this.roomname) ? "font-weight: bold" : "";
    }
  });

  Template.chat.helpers({
    release: function() {
      return Meteor.release;
    }
  });
//}

/*if (Meteor.isServer) {
  Meteor.startup(function () {
    Messages.remove({});
    Rooms.remove({});
    if (Rooms.find().count() === 0) {
      ["Meteor", "JavaScript", "Reactive", "MongoDB"].forEach(function(r) {
        Rooms.insert({roomname: r});
      });
    }
  });
  
  Rooms.deny({
    insert: function (userId, doc) {
      return true;
    },
    update: function (userId, doc, fieldNames, modifier) {
      return true;
    },
    remove: function (userId, doc) {
      return true;
    }
  });
  Messages.deny({
    insert: function (userId, doc) {
      return (userId === null);
    },
    update: function (userId, doc, fieldNames, modifier) {
      return true;
    },
    remove: function (userId, doc) {
      return true;
    }
  });
  Messages.allow({
    insert: function (userId, doc) {
      return (userId !== null);
    }
  });
  
  Meteor.publish("rooms", function () {
    return Rooms.find();
  });
  Meteor.publish("messages", function () {
    return Messages.find({}, {sort: {ts: -1}});
  });
}*/