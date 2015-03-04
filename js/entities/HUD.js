/**
 * a HUD container and child items
 */

game.HUD = game.HUD || {};


game.HUD.Container = me.Container.extend({

    init: function() {
        // call the constructor
        this._super(me.Container, 'init');

        // persistent across level change
        this.isPersistent = true;

        // make sure we use screen coordinates
        this.floating = true;

        // make sure our object is always draw first
        this.z = Infinity;

        // give a name
        this.name = "HUD";

        // add our child score object at the top left corner
        this.addChild(new game.HUD.ScoreItem(5, 80));
    }
});


/**
 * a basic HUD item to display score
 */
game.HUD.ScoreItem = me.Renderable.extend({

    init: function(x, y) {

        // call the parent constructor
        // (size does not matter here)
        this._super(me.Renderable, 'init', [x, y, 10, 10]);

        // local copy of the global score
        this.arithmetic = [];
        this.arithmetic.score = -1;
        this.font = new me.BitmapFont("32x32_font", 32);
    },

    update : function () {
        if (this.arithmetic.score !== game.data.arithmetic.score) {
            this.arithmetic.score = game.data.arithmetic.score;
            return true;
        }
        return false;
    },

    /**
     * draw the score
     */
    draw : function (renderer) {
        this.font.draw (renderer, game.data.arithmetic.score, this.pos.x, this.pos.y);
    }

});

var Pause = me.GUI_Object.extend({
  init:function (x, y) {
    var settings = {}
    settings.image = "pause";
    settings.spritewidth = 80;
    settings.spriteheight = 80;
    // super constructor
    this._super(me.GUI_Object, "init", [x, y, settings]);
    // define the object z order
    this.z = 4;
  },

  onClick:function (event) {
    me.state.isPaused()? me.state.resume(true) : me.state.pause(true);
    return false;
  }
});

var Speaker = me.GUI_Object.extend({
  init:function (x, y) {
    var settings = {}
    settings.image = "speaker";
    settings.spritewidth = 80;
    settings.spriteheight = 80;
    // super constructor
    this._super(me.GUI_Object, "init", [x, y, settings]);
    // define the object z order
    this.z = 4;
    this.muted = false;
  },

  onClick:function (event) {
    if (!this.muted) {
      me.audio.muteAll();
      this.muted = true;
      this.image = me.loader.getImage("speaker");
    }
    else {
      me.audio.unmuteAll();
      this.muted = false;
      this.image = me.loader.getImage("speaker");
    }
    return false;
  }
});

var SpeedUp = me.GUI_Object.extend({
  init:function (x, y) {
    var settings = {}
    settings.image = "speed-up";
    settings.spritewidth = 80;
    settings.spriteheight = 80;
    // super constructor
    this._super(me.GUI_Object, "init", [x, y, settings]);
    // define the object z order
    this.z = 4;
  },

  onClick:function (event) {
    if (game.data.speed < 100)
      game.data.speed ++;
    return false;
  }
});

var SpeedDown = me.GUI_Object.extend({
  init:function (x, y) {
    var settings = {}
    settings.image = "speed-down";
    settings.spritewidth = 80;
    settings.spriteheight = 80;
    // super constructor
    this._super(me.GUI_Object, "init", [x, y, settings]);
    // define the object z order
    this.z = 4;
  },

  onClick:function (event) {
    if (game.data.speed > 1)
      game.data.speed --;
    return false;
  }
});

var Hint = me.GUI_Object.extend({
  init:function (x, y) {
    var settings = {}
    settings.image = "hint";
    settings.spritewidth = 80;
    settings.spriteheight = 80;
    // super constructor
    this._super(me.GUI_Object, "init", [x, y, settings]);
    // define the object z order
    this.z = 4;
  },

  onClick:function (event) {
    if (game.data.hint) {
      game.data.hint = false;
    }
    else {
      game.data.hint = true;
    }
    return false;
  }
});

var Plus = me.GUI_Object.extend({
  init:function (x, y) {
    var settings = {}
    settings.image = "plus";
    settings.spritewidth = 80;
    settings.spriteheight = 80;
    // super constructor
    this._super(me.GUI_Object, "init", [x, y, settings]);
    // define the object z order
    this.z = 4;
  },

  onClick:function (event) {
    game.toggleOperation("+");
    return false;
  }
});

var Minus = me.GUI_Object.extend({
  init:function (x, y) {
    var settings = {}
    settings.image = "minus";
    settings.spritewidth = 80;
    settings.spriteheight = 80;
    // super constructor
    this._super(me.GUI_Object, "init", [x, y, settings]);
    // define the object z order
    this.z = 4;
  },

  onClick:function (event) {
    game.toggleOperation("-");
    return false;
  }
});

var Multiply = me.GUI_Object.extend({
  init:function (x, y) {
    var settings = {}
    settings.image = "multiply";
    settings.spritewidth = 80;
    settings.spriteheight = 80;
    // super constructor
    this._super(me.GUI_Object, "init", [x, y, settings]);
    // define the object z order
    this.z = 4;
  },

  onClick:function (event) {
    game.toggleOperation("*");
    return false;
  }
});

var Divide = me.GUI_Object.extend({
  init:function (x, y) {
    var settings = {}
    settings.image = "divide";
    settings.spritewidth = 80;
    settings.spriteheight = 80;
    // super constructor
    this._super(me.GUI_Object, "init", [x, y, settings]);
    // define the object z order
    this.z = 4;
  },

  onClick:function (event) {
    game.toggleOperation("/");
    return false;
  }
});
