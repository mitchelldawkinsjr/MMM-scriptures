/* Magic Mirror
 * Module: MMM-NFL
 *
 * By fewieden https://github.com/fewieden/MMM-NFL
 * MIT Licensed.
 */
var NodeHelper = require("node_helper");

const request = require('request');

module.exports = NodeHelper.create({

    urls: {
        regular: "http://www.ourmanna.com/verses/api/get/?format=json"
    },

    scripture : 'NONE',

    start: function() {
        console.log("Starting module: " + this.name);
    },

    socketNotificationReceived: function(notification, payload) {
        if(notification === 'CONFIG'){
            this.config = payload;
            this.getData();
        }
    },

    getData: function() {

        request({url: this.urls['regular']}, (error, response, body) =>
        {

        this.scripture = body;

        this.sendSocketNotification("DATA",{scripture:this.scripture});
            return;
        });
    }
});
