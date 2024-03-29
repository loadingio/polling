(function(){
  var vh, pool, polling;
  vh = function(){
    if (pool.visible = !document.hidden) {
      return pool.list.map(function(it){
        return it();
      });
    }
  };
  pool = {
    inited: false,
    visible: typeof document != 'undefined' && document !== null ? !document.hidden : true,
    list: []
  };
  polling = function(f, d){
    var ref$, l, func;
    d == null && (d = 1000);
    if (typeof f === 'number') {
      ref$ = [d, f], f = ref$[0], d = ref$[1];
    }
    if ((typeof document != 'undefined' && document !== null) && !vh.inited) {
      document.addEventListener('visibilitychange', vh, false);
    }
    pool.inited = true;
    l = {};
    func = function(){
      var args, res$, i$, to$, p, this$ = this;
      res$ = [];
      for (i$ = 0, to$ = arguments.length; i$ < to$; ++i$) {
        res$.push(arguments[i$]);
      }
      args = res$;
      if (l.res) {
        return Promise.reject(new Error("polling function re-entry blocked"));
      }
      return p = new Promise(function(res, rej){
        var run;
        l.res = res;
        l.rej = rej;
        l.on = true;
        pool.list.push(l.run = run = function(){
          var ret;
          ret = f.apply(this$, args);
          if (ret) {
            return func.stop(ret);
          }
          if (pool.visible && l.on) {
            return l.h = setTimeout(run, d);
          }
        });
        return run();
      });
    };
    func.stop = function(p){
      var res;
      clearTimeout(l.h);
      if (pool.list.indexOf(l.run) >= 0) {
        pool.list.splice(pool.list.indexOf(l.run), 1);
      }
      res = l.res;
      l.res = null;
      l.rej = null;
      l.on = false;
      l.run = null;
      return res(p);
    };
    return func;
  };
  if (typeof module != 'undefined' && module !== null) {
    module.exports = polling;
  } else if (typeof window != 'undefined' && window !== null) {
    window.polling = polling;
  }
}).call(this);
