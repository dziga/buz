game.PlayScreen = me.ScreenObject.extend({
    /**
     *  action to perform on state change
     */
     onResetEvent: function() {
        // reset the score
        game.data.score = 0;

        me.levelDirector.loadLevel("arithmethic_level");
        me.audio.playTrack("background", 0.3);

        // add our HUD to the game world
        this.HUD = new game.HUD.Container();
        me.game.world.addChild(this.HUD);

        me.game.world.addChild(new Pause(me.game.world.width - 100, 20));
        me.game.world.addChild(new Speaker(me.game.world.width - 100, 120));
        me.game.world.addChild(new SpeedUp(me.game.world.width - 100, 220));
        me.game.world.addChild(new SpeedDown(me.game.world.width - 100, 320));
        me.game.world.addChild(new Hint(me.game.world.width - 100, 420));
        me.game.world.addChild(new Plus(me.game.world.width - 100, 520));
        me.game.world.addChild(new Minus(me.game.world.width - 100, 620));


        this.handler = me.event.subscribe(me.event.KEYDOWN, function (action, keyCode, edge) {
          if (action === "pause") {
              me.state.isPaused()? me.state.resume(true) : me.state.pause(true);
          }
          if (action === "mute") {
            me.audio.muteAll();
          }
          else if (action === "unmute") {
            me.audio.unmuteAll();
          }
          if (action === "speed-up") {
            if (game.data.speed < 100)
              game.data.speed ++;
          }
          else if (action === "speed-down") {
            if (game.data.speed > 1)
              game.data.speed --;
          }
          if (action === "hint") {
            if (game.data.hint) {
              game.data.hint = false;
            }
            else {
              game.data.hint = true;
            }
          }
          if (action === "add") {
            game.toggleOperation("+");
          }
          if (action === "sub") {
            game.toggleOperation("-");
          }
          if (action === "mul") {
            game.toggleOperation("*");
          }
          if (action === "div") {
            game.toggleOperation("/");
          }

        });
    },

    /**
     *  action to perform when leaving this screen (state change)
     */
     onDestroyEvent: function() {
        // remove the HUD from the game world
        me.game.world.removeChild(this.HUD);
    }
});
