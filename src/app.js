/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

/* Required libraries and other files */
var UI = require('ui');
//var Vector2 = require('vector2');
var gps = require('gps');

// Global variable of the timer that is used in tracking
var timer;

/* Main function and intiialization */
var main = new UI.Card({
  title: 'pebBiker',
  icon: 'images/menu_icon.png',
  //subtitle: 'Hello World!',
  body: '\nPress down button to update, select to track'
});

main.show();

main.on('click', 'up', function(e) {
  var menu = new UI.Menu({
    sections: [{
      items: [{
        title: 'pebBiker',
        icon: 'images/menu_icon.png',
        subtitle: 'Can do Menus'
      }, {
        title: 'Second Item',
        subtitle: 'Subtitle Text'
      }]
    }]
  });
  
  menu.on('select', function(e) {
    console.log('Selected item: ' + e.section + ' ' + e.item);
  });
  menu.show();
});

main.on('click', 'down', function(e) {
  clearTimeout(timer);
  main.title("Updating");
  // Get data from watch and update the UI
  gps.getLocation(main);
});

var update = function() {
  main.title("Tracking");
  timer = setTimeout(function() {
    gps.getLocation(main);
    update();
  }, 5000);
};

main.on('click', 'select', function(e) {
  clearTimeout(timer);
  update();
});