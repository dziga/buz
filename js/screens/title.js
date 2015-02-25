game.TitleScreen = me.ScreenObject.extend({
    /**
     *  action to perform on state change
     */
    onResetEvent: function() {
      me.game.world.addChild(
        new me.Sprite (
          0,0,
          me.loader.getImage('maja_title_screen')
        ),
        1
      );

      this.handler = me.event.subscribe(me.event.KEYDOWN, function (action, keyCode, edge) {
        if (action === "click") {
          me.state.change(me.state.PLAY);
        }
      });
    },

    /**
     *  action to perform when leaving this screen (state change)
     */
    onDestroyEvent: function() {
      me.event.unsubscribe(this.handler);
    }
});
