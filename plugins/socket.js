import io from 'socket.io-client'

export default (ctx, inject) => {
  io('http://localhost:3111')
  inject('io', io)
}
