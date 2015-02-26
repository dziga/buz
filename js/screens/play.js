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

        this.handler = me.event.subscribe(me.event.KEYDOWN, function (action, keyCode, edge) {
          if (action === "pause") {
              me.state.isPaused()? me.state.resume(true) : me.state.pause(true);
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
