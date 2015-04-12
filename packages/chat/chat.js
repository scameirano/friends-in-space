// Write your package code here!
Messages = new Mongo.Collection("msg");
Rooms = new Mongo.Collection("rooms");


if (Meteor.isServer) {
  Meteor.startup(function () {
    Messages.remove({});
    Rooms.remove({});
    if (Rooms.find().count() === 0) {
      ["Meteor", "JavaScript", "Reactive", "MongoDB", "Sere's Topic"].forEach(function(r) {
        Rooms.insert({roomname: r});
        Messages.insert({"msg":"LAtest from Server","ts":"2015-04-12T07:13:13.691Z","room":"Reactive"});
 
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
  /*Messages.deny({
    update: function (userId, doc, fieldNames, modifier) {
      return true;
    },
    remove: function (userId, doc) {
      return true;
    }
  });*/
  Messages.allow({
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
  
  Meteor.publish("rooms", function () {
    return Rooms.find();
  });
  Meteor.publish("msg", function () {
    return Messages.find({});
  });
}