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
