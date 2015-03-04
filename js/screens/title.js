game.TitleScreen = me.ScreenObject.extend({
    /**
     *  action to perform on state change
     */
    onResetEvent: function() {
      me.game.world.addChild(
        new me.Sprite (
          0,0,
          me.loader.getImage('background-img')
        ),
        1
      );

      me.game.world.addChild(new (me.GUI_Object.extend ({
        init:function (x, y) {
          var settings = {}
          settings.image = "plus";
          settings.spritewidth = 80;
          settings.spriteheight = 80;
          // super constructor
          this._super(me.GUI_Object, "init", [100, 100, settings]);
          // define the object z order
          this.z = 4;
        },

        onClick:function (event) {
          game.data.speed = 1;
          game.data.hint = true;
          game.data.arithmetic.allowed = ["+","-"];
          me.state.change(me.state.PLAY);
          return false;
        }
      })),2);

      me.game.world.addChild(new (me.GUI_Object.extend ({
        init:function (x, y) {
          var settings = {}
          settings.image = "minus";
          settings.spritewidth = 80;
          settings.spriteheight = 80;
          // super constructor
          this._super(me.GUI_Object, "init", [200, 100, settings]);
          // define the object z order
          this.z = 4;
        },

        onClick:function (event) {
          me.state.change(me.state.PLAY);
          return false;
        }
      })),3);

      me.game.world.addChild(new (me.GUI_Object.extend ({
        init:function (x, y) {
          var settings = {}
          settings.image = "multiply";
          settings.spritewidth = 80;
          settings.spriteheight = 80;
          // super constructor
          this._super(me.GUI_Object, "init", [100, 200, settings]);
          // define the object z order
          this.z = 4;
        },

        onClick:function (event) {
          me.state.change(me.state.PLAY);
          return false;
        }
      })),4);

      me.game.world.addChild(new (me.GUI_Object.extend ({
        init:function (x, y) {
          var settings = {}
          settings.image = "divide";
          settings.spritewidth = 80;
          settings.spriteheight = 80;
          // super constructor
          this._super(me.GUI_Object, "init", [200, 200, settings]);
          // define the object z order
          this.z = 4;
        },

        onClick:function (event) {
          me.state.change(me.state.PLAY);
          return false;
        }
      })),5);
    },

    /**
     *  action to perform when leaving this screen (state change)
     */
    onDestroyEvent: function() {
      // me.event.unsubscribe(this.handler);
    }
});
