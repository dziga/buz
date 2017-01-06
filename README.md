Buzz - game for kids
-------------------------------------------------------------------------------

Running instances dziga.github.io/buz & https://buz.5apps.com/

## Android version

Coming soon

## Run on server

To build, be sure you have [node](http://nodejs.org) installed. Clone the project:

    git clone git@github.com:dziga/buz.git

Then in the cloned directory, simply run:

    npm install

To build:

    grunt


Running the game:

	grunt connect

And you will have game running on http://localhost:8000


Note that you may have to edit the file `Gruntfile.js` if you need to better dictate the order your files load in. Note how by default the game.js and resources.js are specified in a specific order.

## Contribute

Feel free to submit a pull request.

-------------------------------------------------------------------------------
Powered by melonJS. 
melonJS is licensed under the [MIT License](http://www.opensource.org/licenses/mit-license.php)
