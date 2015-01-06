 game.rooms = {
    /*
     Room objects should have the following properties:
     * goesTo: array of room IDs that can be traveled to
     * items: array of item IDs you pick up when you enter the room
     * points: number of points awarded when you enter the room
     * health: number of HP awarded when you enter the room
     * description: string, which is shown when you enter the room
     */

    'start': {
      goesTo: function(){return ['forest', 'tall-grass']},
      description: "You awake. You struggle to remember where you are.\
	  You fell off your horse and struck your head. Both your horse and pack are gone. You are in a field, the sun his high and hot in the sky."
    },
    'forest': {
      goesTo: ['cave', 'path', 'field'],
      description: "The forest is dense and cool. The tall trees shade the sun. A ",
    },
    'tall-grass': {
      goesTo: ['field'],
      description: "You pace into the tall grass. The grass gets progressively more\
	  difficult to travel through, you cannot see where you are going.  But you suddenly do stumble onto a large branch",
      points: 10,
      items: ['branch']
    },
    'field': {
      goesTo: ['tall-grass', 'forest'],
      description: "You are back at the field where you awoke."
    },
	'cave': {
		goesTo: function() { 
			if (game.player.inventory.indexOf('branch') === -1){
				return ['forest', 'path']
			}
			else {
				return ['forest', 'path', 'branch' ]
			}
		},
		description: "Nothing in here but a slumbering bear. Perhaps you should leave it alone. Or you could try hitting it with something.",
		points: 20
    },
   'branch': {
	   description: "You hit the bear with a stick. It looks peeved. Moments later its back asleep, its belly grumbling contently around its new meal, you."
    },
    'path': {
		goesTo: function() { 
			if (game.player.inventory.indexOf('branch') === -1){
			//	goto (rooms.cave);?
				return ['forest', 'reindeer']
			}
			else {
				return ['forest', 'reindeer', 'branch2' ]
			}
		},
      description: "You walk along the path. It appears to be track seldom trodden by man.\
	  Suddenly a large antlered Reindeer blocks your path ahead. It looks at you. You could pass around it or try hit it with something",
      points: 11
      
    },
	'branch2': {
		goesTo: ['cottage', 'burrow' ],
		description: "You bap the large caribou on the nose. It snorts at you and levels its antlers at you and charges. \
		You end up tangled up in the antlers carried along in its wild charge through the forest",
		items: [-'branch'],  //How do i remove branch? 
		points: 10
	},
	'reindeer': {
		description: "For whatever reason, you decide to press up against the large reindeer in wonder. \
		Unlucky for you, this is a rare predatory caribou and moments later the content and heavy-bellied caribou trots off"
	},
	'cottage': {
	goesTo: function() { 
	
	if (game.player.points > 40) {
		return ['victory',/*
		description: "A large gator, wearing suspenders and a hat lounges in a rocking-chair at the cottage. He inspects you closely for your accumulated points. He deems you worthy"*/]
		 }
	else {
		return ['gatorjaws', /*
		description "A large gator, wearing suspenders and a hat lounges in a rocking-chair at the cottage. He inspects you closely for your accumulated points. He hungrily licks his chops"*/]
		 }
	},
  // description: "A large gator, wearing suspenders and a hat lounges in a rocking-chair at the cottage. He inspects you closely for your accumulated points."
	},
	'victory': {
		description: "You win!"
	},
	'gatorjaws': {
		description: "Not quite victory, but its not a bad place to be. Until the gator swallows. GULP!"
	},
 }
 