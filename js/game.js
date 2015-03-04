
/* Game namespace */
var game = {

    // an object where to store game information
    data : {
        speed : 1,
        hint : true,
        arithmetic : {
            allowed : ["+","-"],
            order : "first",
            expectedResult : -1,
            score : 0
        }
    },

    isAllowedOperation: function(operation) {
      return this.data.arithmetic.allowed.indexOf(operation) != -1;
    },

    toggleOperation: function (op) {
      if (this.isAllowedOperation(op)) {
        if (this.data.arithmetic.allowed.length > 1) {
          this.data.arithmetic.allowed.splice(this.data.arithmetic.allowed.indexOf(op), 1);
        }
      }
      else {
        this.data.arithmetic.allowed.push(op);
      }
    },

    // Run on page load.
    "onload" : function () {
    // Initialize the video.
    if (!me.video.init("screen", me.video.CANVAS, 1280, 800, true, 'auto')) {
        alert("Your browser does not support HTML5 canvas.");
        return;
    }

    // add "#debug" to the URL to enable the debug Panel
    if (document.location.hash === "#debug") {
        window.onReady(function () {
            me.plugin.register.defer(this, me.debug.Panel, "debug", me.input.KEY.V);
        });
    }

    // Initialize the audio.
    me.audio.init("mp3,ogg");

    // Set a callback to run when loading is complete.
    me.loader.onload = this.loaded.bind(this);

    // Load the resources.
    me.loader.preload(game.resources);

    // Initialize melonJS and display a loading screen.
    me.state.change(me.state.LOADING);
},

    // Run on game resources loaded.
    "loaded" : function () {
        me.state.set(me.state.MENU, new game.TitleScreen());
        me.state.set(me.state.PLAY, new game.PlayScreen());

        // add our player entity in the entity pool
        me.pool.register("majaPlayer", game.PlayerEntity);
        me.pool.register("HiveEntity", game.HiveEntity);

        me.input.bindKey(me.input.KEY.LEFT,  "left");
        me.input.bindKey(me.input.KEY.RIGHT, "right");
        me.input.bindKey(me.input.KEY.SPACE, "pause");
        me.input.bindKey(me.input.KEY.M, "mute");
        me.input.bindKey(me.input.KEY.N, "unmute");
        me.input.bindKey(me.input.KEY.UP, "speed-up");
        me.input.bindKey(me.input.KEY.DOWN, "speed-down");
        me.input.bindKey(me.input.KEY.B, "hint");
        me.input.bindKey(me.input.KEY.A, "add");
        me.input.bindKey(me.input.KEY.S, "sub");
        me.input.bindKey(me.input.KEY.D, "mul");
        me.input.bindKey(me.input.KEY.F, "div");
        me.input.bindKey(me.input.KEY.U, "click", true, true);
        me.input.bindPointer(me.input.KEY.U);
        // Start the game.
        me.state.change(me.state.PLAY);
    }
};
