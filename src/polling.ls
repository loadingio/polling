(->
  vh = -> if (pool.visible = !document.hidden) => pool.list.map -> it!
  pool = do
    inited: false
    visible: if document? => !document.hidden else true
    list: []

  polling = (f, d = 1000) ->
    if document? and !vh.inited => document.addEventListener(\visibilitychange, vh, false)
    pool.inited = true
    l = {}
    func = (...args) ->
      if l.res => return Promise.reject new Error("polling function re-entry blocked")
      p = new Promise (res, rej) ~>
        l <<< {res, rej, on: true}
        pool.list.push l.run = run = ~> 
          ret = f.apply @, args
          if ret => return func.stop ret
          if pool.visible and l.on => l.h = setTimeout run, d
        run! # or, setTimeout(run, d) if we want to delay execution
    func.stop = (p) ->
      clearTimeout(l.h)
      if pool.list.indexOf(l.run) >= 0 => pool.list.splice(pool.list.indexOf(l.run), 1)
      res = l.res
      l <<< res: null, rej: null, on: false, run: null
      return res p
    func

  if module? => module.exports = polling
  if window? => window.polling = polling

)!

# sample code
# a = do
#   c: 0
#   b: polling ->
#     console.log Date.now!, @c
#     if (@c++) > 10 => return @c
# a.b!then -> console.log "stopped. return value: ", it
