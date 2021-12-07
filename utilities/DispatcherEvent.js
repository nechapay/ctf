class DispatcherEvent {
  constructor (eventName) {
    this.eventName = eventName
    this.callbacks = []
  }

  registerCallback (callback) {
    this.callbacks.push(callback)
  }

  unregisterCallback (callback) {
    this.callbacks = this.callbacks.filter(c => c !== callback)
  }

  fire (data) {
    const callbacks = this.callbacks.slice(0)
    callbacks.forEach(callback => {
      callback(data)
    })
  }
}

export default DispatcherEvent
