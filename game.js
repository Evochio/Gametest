/* 
  Ways to run:
    * Copy and paste into browser console (simple, but debugging's worse).
    * Copy and paste into an HTML file in a <script> tag.
    * Load with link tag in an HTML file.
*/

var game = {
  
  // GAME DATA
  
  player: {}, // gets initialized in start function


    
  // GAME FUNCTIONS
  
  start: function() {
    /*
     Initializes the player and outputs the first prompt.
     */
    this.player = {
      location: 'start',
      inventory: [],
      points: 0,
      health: 10
    };
    this.prompt();
  },
  

  prompt: function() {
    /*
      Prompts player with current state and things to do.
     */

    // Print a little space
    console.log('\n\n\n\n\n');
    
    var roomObject = this.rooms[this.player.location];

    // Print location
    console.log(this.player.location.toUpperCase(), ':', roomObject.description);
    
	$("body").empty().append($("<div></div>").text(roomObject.description));
	
    // Print inventory
    if(this.player.inventory.length === 0) {
      console.log('You got nothin\'');
    }
    else {
      console.log('You have in your hot little paws:', this.player.inventory.join(', '))
    }
    
    // Print health, points
    console.log('Health:', this.player.health, 'Points:', this.player.points);

    // Show game over, or show where you can go
    if(this.gameIsOver()) {
      console.error('Game over. Type "game.start()" to try again.');
    }
    else {
		var floof;
		if  (roomObject.goesTo.join) { 
		floof = roomObject.goesTo;
		}
		else {
			floof = roomObject.goesTo()
		}
		
      console.log('Nearby places:', floof.join(', '));
      console.debug("Type 'game.goTo('place-name');' and then press enter.");
      console.debug("Player state:", this.player);
    }
  },
  
  

  goTo: function(place) {
    /*
      Player uses this to decide where to go. Input should be a string like 'house' or 'jaws'.
     */
    
    // First do some checks.
    if(this.gameIsOver()) {
      console.log("Start again with a new life, this one ain't working anymore... Type 'game.reset();' and press enter.")
      return;
    }
    
    var roomObject = this.rooms[this.player.location];

    if(_.isArray(roomObject.goesTo) && _.contains(roomObject.goesTo, place)) {
      // user error
      console.log("Uh, you can't go there...");
      return;
    }
    
    newRoom = this.rooms[place];
    if(!newRoom) {
      // programmer error!
      console.error("Shit! The rooms are broken, reality is borked aw damn. Maybe start over... Type 'game.reset();' and press enter.")
      return;
    }
    
    // Okay, pre-flight check complete. Update the state.
    this.player.location = place;
    
    if(newRoom.points) {
      this.player.points += newRoom.points;
    }
    
    if(newRoom.items) {
      this.player.inventory = this.player.inventory.concat(newRoom.items);
    }
    
    if(newRoom.health) {
      this.player.health += newRoom.health;
    }
    
    // Re-prompt user with the new state
    this.prompt();
  },

  
  
  gameIsOver: function() {
    /* 
      The game is over when there's nowhere to go, or you're dead.
      Returns true or false.
     */
    var roomObject = this.rooms[this.player.location];

    // handle undefined property
    if(!roomObject.goesTo)
      return true;

    // handle empty array
    if(roomObject.goesTo.join && !roomObject.goesTo.length)
      return true;

    // handle bleeding all over the place
    if(this.player.health <= 0)
      return true;
    
    // no reason not to keep going!
    return false;
  },

  
  
  reset: function() {
    console.log('Giving it another go, eh?');
    
    this.start();
  }

};