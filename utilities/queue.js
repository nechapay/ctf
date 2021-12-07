export class Queue {
  constructor () {
    this._data = []
    this._hooks = {
      enqueue: []
    }

    this._hook = async (name) => {
      for (let h of this._hooks[name]) {
        await h()
      }
    }
  }

  addHook (event, func) {
    if (this._hooks[event]) {
      this._hooks[event].push(func)
    }
  }

  enqueue (data) {
    this._data.unshift(data)
    this._hook('enqueue')
  }

  dequeue () {
    return this._data.pop()
  }

  first () {
    return this._data[this._data.length - 1]
  }

  last () {
    return this._data[0]
  }

  size () {
    return this._data.length
  }
}
