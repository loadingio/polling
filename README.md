# @loadingio/polling

Promise based, vanilla JS polling library. Features:

 - Implemented via setTimeout
 - Polling paused when page is not visible ( checked with page visibility api )
 - Promise based ( resolved when polling ends. )
 - Object-aware, can be used in object member function.


## Usage


install via npm:

    npm install --save @loadingio/polling

or include directly the dist file:

    <script src="path/to/polling/index.js"></script>

To periodically invoke a function with certain interval(in millisecond): `polling(function, interval)()` or `polling(interval, function)()`

example:

    poll = polling(function() { console.log("print every 2 seconds."); }, 2000)
    poll();

Return true in your function to stop the polling, which will be used to resolve the pending promise:

    polling(function() {
      if(Math.random() > 0.9) { return "hit!"; }
    }, 1000)()
    .then(function(msg) {
      console.log("message: ", msg);
    })


You can also force it to stop by calling "stop" on the returned object directly:

    var poll = polling(f, 1000);
    poll();
    poll.stop();


It also works as a member function of object:

    var myobj = {
      poll: polling(function() {
        if(this.data == true) {
          return true;
        } else {
          console.log("polling");
        }
        return false;
      },
      data: false
    };
    myobj.poll();


## License

MIT
