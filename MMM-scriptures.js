/* Magic Mirror
 * Module: MMM-scriptures
 *
 * MIT Licensed.
 */


Module.register("MMM-scriptures",{

   // Default module config.
    defaults: {
        text: "Daily Scripture"
    },
    	// Define required scripts.
    getScripts: function() {
        return ["moment.js"];
    },

    socketNotificationReceived: function (notification, payload) {
        if (notification === "DATA") {
            var bible = JSON.parse(payload.scripture);
            var version = bible.verse.details.version;
            var book = bible.verse.details.reference;
            var text =  bible.verse.details.text;
            this.scripture = book + ' ' + text + '<small>(' + version + ')</small>';
            this.updateDom(1000)
        }
    },

    start : function() {
        Log.info("Starting module: " + this.name);
        this.sendSocketNotification("CONFIG", this.config);
    },

    // Override dom generator.
    getDom: function() {
        var wrapper = document.createElement("div");
        if ( this.scripture != undefined) {
            wrapper.innerHTML = this.scripture;
        } else {
            wrapper.innerHTML = 'Loading your daily inspiration .....'
        }
        return wrapper;
    }

});
