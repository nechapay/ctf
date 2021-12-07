const Router = require('express')
const router = new Router()

router.post('/login', async (req, res) => {
  const store = req.app.get('store')

  const user = await store.collection('ctf_users').findOne({
    name: req.body.login
  })

  if (user) {
    if (user.password === req.body.password + '_$1') {
      return res.json({
        success: true,
        data: {
          name: user.name,
          id: user._id
        }
      })
    }
  }

  return res.status(401).json({
    success: false
  })
})

module.exports = router
