
 game.PlayerEntity = me.Entity.extend({

     init:function (x, y, settings) {
        // call the constructor
        this._super(me.Entity, 'init', [x, y , settings]);

        // set the default horizontal & vertical speed (accel vector)
        this.body.setVelocity(9, 0);

        // ensure the player is updated even when outside of the viewport
        this.alwaysUpdate = true;
        this.arithmetic = [];

        this.arithmetic.isFirstNumber = true;
        this.arithmetic.isSecondNumber = false;
        this.arithmetic.isThirdNumber = false;
        this.arithmetic.order = "first";
        this.pos.mouse = -1;

        // define a basic walking animation (using all frames)
        // this.renderable.addAnimation("walk",  [0, 1, 2, 3, 4, 5, 6, 7]);
        // define a standing animation (using the first frame)
        this.renderable.addAnimation("stand",  [0]);
        // set the standing animation as default
        this.renderable.setCurrentAnimation("stand");
    },

     update : function (dt) {
        this.body.setVelocity(game.data.speed * 3, 0);
        if (me.input.isKeyPressed('left')) {
          this.renderable.flipX(true);
          // update the entity velocity
          this.body.vel.x -= this.body.accel.x * me.timer.tick;
          // change to the walking animation
          // if (!this.renderable.isCurrentAnimation("walk")) {
          //   this.renderable.setCurrentAnimation("walk");
          // }
        } else if (me.input.isKeyPressed('right')) {
            this.renderable.flipX(false);
            // update the entity velocity
            this.body.vel.x += this.body.accel.x * me.timer.tick;
            // change to the walking animation
            // if (!this.renderable.isCurrentAnimation("walk")) {
            //   this.renderable.setCurrentAnimation("walk");
            // }
        } else if (me.input.isKeyPressed('click')) {
          this.pos.mouse = Math.round(me.input.mouse.pos.x, 0);
          if ((this.pos.mouse - this.pos.x) < 0) {
              this.renderable.flipX(true);
              this.body.vel.x -= this.body.accel.x * me.timer.tick;
          } else {
              this.renderable.flipX(false);
              this.body.vel.x += this.body.accel.x * me.timer.tick;
          }
        } else if ((this.pos.mouse - this.pos.x) > -5 * game.data.speed && 5 * game.data.speed > (this.pos.mouse - this.pos.x)) {
            this.body.vel.x = 0;
            this.pos.mouse = -1;
        } else if (this.pos.mouse == -1) {
            this.body.vel.x = 0;
        }

        this.body.update(dt);

        me.collision.check(this);

        // return true if we moved or if the renderable was updated
        return (this._super(me.Entity, 'update', [dt]) || this.body.vel.x !== 0);
    },

     onCollision : function (response, other) {
        return true;
    }
});

game.HiveEntity = me.CollectableEntity.extend({
  init: function(x, y, settings) {
    this._super(me.CollectableEntity, 'init', [x, y , settings]);

    this.renderable.addAnimation("spin",  [0, 1, 2, 3, 4, 5, 6, 7]);
    this.renderable.setCurrentAnimation("spin");
    this.body.setVelocity(0, 3);
    this.alwaysUpdate = true;
    this.arithmetic = [];
    this.arithmetic.value = (1).random(11);
    this.font = new me.BitmapFont("32x32_font", 32);
},

update : function (dt) {
  this.body.setVelocity(0, game.data.speed);
  this.body.vel.y += this.body.accel.y * me.timer.tick;
  if (this.pos.y > me.game.world.height) {
      this.pos.y = this.hiveRestartPositionY();
      this.arithmetic.value = this.getArithmeticValue(game.data.arithmetic.order, game.data.arithmetic.expectedResult);
  }

  // change color of hive
  if (game.data.hint && this.arithmetic.value === game.data.arithmetic.expectedResult) {
    this.renderable.image = me.loader.getImage("hive-hint");
  }
  else {
    this.renderable.image = me.loader.getImage("hive");
  }

  this.body.update(dt);
  return this._super(me.Entity, 'update', [dt]) || this.body.vel.y !==0;
},

draw: function (renderer) {
    this.font.draw(renderer, this.arithmetic.value, this.pos.x, this.pos.y - this.height-10);
    this._super(me.Entity, 'draw', [renderer]);
},

onCollision : function (response, other) {
    this.pos.y = this.hiveRestartPositionY();

    switch(game.data.arithmetic.order) {
        case "first":
          me.audio.play("blob");
          game.data.arithmetic.firstNumber = this.arithmetic.value;
          game.data.arithmetic.score = game.data.arithmetic.firstNumber;
          game.data.arithmetic.order = "operation";
        break;
        case "operation":
          if (game.isAllowedOperation(this.arithmetic.value)) {
            me.audio.play("blob");
            game.data.arithmetic.operation = this.arithmetic.value;
            game.data.arithmetic.score += game.data.arithmetic.operation;
            game.data.arithmetic.order = "second";
          }
          else {
            me.audio.play("woosh");
          }
        break;
        case "second":
          if (!game.isAllowedOperation(this.arithmetic.value)) {
            me.audio.play("blob");
            game.data.arithmetic.secondNumber = this.arithmetic.value;
            game.data.arithmetic.order = "result";
            game.data.arithmetic.score += game.data.arithmetic.secondNumber + "=";

            game.data.arithmetic.expectedResult = applyOperation[game.data.arithmetic.operation](
              game.data.arithmetic.firstNumber, game.data.arithmetic.secondNumber);
          }
          else {
            me.audio.play("woosh");
          }
        break;
        case "result":
            game.data.arithmetic.result = this.arithmetic.value;
            if (game.data.arithmetic.result == game.data.arithmetic.expectedResult) {
              me.audio.play("applause");
              game.data.arithmetic.expectedResult = -1;
            }
            else {
              me.audio.play("fail");
            }
            game.data.arithmetic.order = "first";
            game.data.arithmetic.score += game.data.arithmetic.result;
        break;
        default:
            game.data.arithmetic.order = "first";
    }

    this.arithmetic.value = this.getArithmeticValue(game.data.arithmetic.order, game.data.arithmetic.expectedResult);
    return false;
},

hiveRestartPositionY: function() {
    return (-20).random(-100);
},

getArithmeticValue: function(order, expectedResult) {
    if (order == "operation") {
      return game.data.arithmetic.allowed[(0).random(game.data.arithmetic.allowed.length)];
    }
    else if (order == "second" && game.data.arithmetic.operation == "-") {
        return (1).random(game.data.arithmetic.firstNumber);
    }
    else if (order == "second" && game.data.arithmetic.operation == "/") {
        var divisibleNums = [];
        for (i = 0; i < game.data.arithmetic.firstNumber; i++) {
          if (game.data.arithmetic.firstNumber % i === 0 || i === 1)
            divisibleNums.push(i);
        }
        return divisibleNums[(0).random(divisibleNums.length)];
    }
    else if (order == "result") {
        if (((1).random(4) % 3) == 0 ) {
            return game.data.arithmetic.expectedResult;
        }

    }
    return (1).random(20);
}
});

var applyOperation = {
    '+': function (x, y) { return x + y },
    '-': function (x, y) { return x - y },
    '*': function (x, y) { return x * y },
    '/': function (x, y) { return x / y }
};
