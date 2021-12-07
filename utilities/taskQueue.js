export default class TaskQueue {
  constructor (interval) {
    this.getTime = () => (new Date()).getTime()

    this._tasks = []
    this._interval = interval || 300
    this._lastTime = 0
    this._isWork = false
    this._debug = false
  }

  get debug () {
    return this._debug
  }
  set debug (val) {
    this._debug = val
  }

  addTask (task) {
    this._tasks.unshift(task)

    if (this._tasks.length === 1) {
      const time = this.getTime()

      if (!this._isWork) {
        const diff = time - this._lastTime
        if (diff > this._interval) {
          this.next()
        } else {
          setTimeout(() => {
            this.next()
          }, this._interval - (time - this._lastTime))
        }
      }
    }
  }

  next () {
    const task = this._tasks.pop()
    const start = this.getTime()

    if (this._debug) {
      console.log('TaskQueue: task call', start)
      console.log('TaskQueue: interval', start - this._lastTime)
    }

    this._isWork = true
    task()
      .then(() => {
        this._lastTime = this.getTime()

        if (this._tasks.length > 0) {
          setTimeout(() => {
            this.next()
          }, this._interval)
        } else {
          this._isWork = false
        }
      })
  }

  size () {
    return this._tasks.length
  }
}
