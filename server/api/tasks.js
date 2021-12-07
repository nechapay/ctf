const path = require('path')
const mongodb = require('mongodb')
const Router = require('express')
const router = new Router()

router.get('/categories', async (req, res) => {
  const store = req.app.get('store')

  const user = await store.collection('ctf_users').findOne({
    name: req.body.login
  })
  if (user) {
    if (user.password === req.body.password + '_$1') {
      return res.json({
        success: true,
        data: {
          name: user.name
        }
      })
    }
  }

  return res.status(401).json({
    success: false
  })
})

router.get('/score', async (req, res) => {
  const store = req.app.get('store')

  const score = (await store.collection('ctf_users').find({}).toArray()).map(i => ({
    id: i._id,
    name: i.name,
    score: i.score || 0,
    tasks: i.tasks || []
  }))

  const score2 = await store.collection('ctf_user_tasks').find({}).toArray()

  for (const ss of score) {
    const s = score2.find(j => {
      return j.user === ss.id.toString()
    })

    if (s) {
      ss.score = s.score
    }
  }

  return res.json({
    success: true,
    data: score
  })
})

router.get('/get-file', async (req, res) => {
  const store = req.app.get('store')

  const task = await store.collection('ctf_tasks').findOne({
    id: +req.query.cat
  })
  const t = task.tasks.find(i => {
    return i.id === +req.query.id
  })
  if (t) {
    return res.sendFile(path.resolve(__dirname, '..', '..', 'templates', t.path))
  } else {
    return res.status(404).json({
      success: false
    })
  }
})

router.get('/', async (req, res) => {
  const store = req.app.get('store')

  const tasks = await store.collection('ctf_tasks').find({}).toArray()
  return res.json({
    success: true,
    data: tasks.map(i => {
      let tm = JSON.parse(JSON.stringify(i))
      tm.tasks = tm.tasks.map(j => {
        let t = JSON.parse(JSON.stringify(j))
        delete t.answer
        return t
      })
      return tm
    })
  })
})

router.get('/answers', async (req, res) => {
  const store = req.app.get('store')

  const data = await store.collection('ctf_user_tasks').findOne({
    user: req.query.user
  })

  return res.json({
    success: true,
    data
  })
})

router.post('/answer', async (req, res) => {
  const store = req.app.get('store')
  const cat = parseInt(req.body.category)
  const taskId = parseInt(req.body.task)

  const user = await store.collection('ctf_users').findOne({
    _id: new mongodb.ObjectID(req.body.user)
  })

  let tasks = await store.collection('ctf_user_tasks').findOne({
    user: req.body.user
  })

  if (!user) {
    return res.status(404).json({
      success: false,
      error: 'User not found'
    })
  }

  const catTask = await store.collection('ctf_tasks').findOne({
    id: cat
  })

  if (!catTask) {
    return res.status(404).json({
      success: false,
      error: 'Category not found'
    })
  }

  const task = catTask.tasks.find(i => i.id === taskId)

  if (!task) {
    return res.status(404).json({
      success: false,
      error: 'Task not found'
    })
  }

  // if (tasks) {
  //   if (tasks[cat] === undefined) {
  //     tasks[cat] = { [taskId]: {} }
  //   }
  //
  //   if (tasks[cat][taskId] === undefined) {
  //     tasks[cat][taskId] = {}
  //   }
  //
  //   if (tasks[cat][taskId].done) {
  //     console.log('already done')
  //     return res.json({
  //       success: true,
  //       isTrue: true
  //     })
  //   }
  //
  //   if (tasks[cat][taskId].fail === true) {
  //     console.log('already fail')
  //     return res.json({
  //       success: true,
  //       isTrue: false
  //     })
  //   }
  //
  //   if (tasks[cat][taskId].done === undefined || tasks[cat][taskId].done === null) {
  //     if (task.tryCount !== undefined) {
  //       if (tasks[cat][taskId].tryCount === undefined) tasks[cat][taskId].tryCount = 0
  //
  //       if (tasks[cat][taskId].tryCount < task.tryCount) {
  //         tasks[cat][taskId].tryCount++
  //
  //         const result = checkAnswers(task.answer, req.body.answer)
  //
  //         if (result) {
  //           tasks[cat][taskId].done = true
  //           if (tasks.score === undefined) tasks.score = 0
  //
  //           tasks.score += task.score
  //           tasks.updatedAt = new Date()
  //           emitSuccess()
  //         } else {
  //           if (tasks[cat][taskId].tryCount === task.tryCount) {
  //             tasks[cat][taskId].done = false
  //             tasks[cat][taskId].fail = true
  //           }
  //         }
  //
  //         await store.collection('ctf_user_tasks').updateOne({
  //           user: req.body.user
  //         }, {
  //           $set: {
  //             [cat]: tasks[cat]
  //           }
  //         })
  //
  //         return res.json({
  //           success: true,
  //           isTrue: false
  //         })
  //       }
  //     } else {
  //       const result = checkAnswers(task.answer, req.body.answer)
  //
  //       if (result) {
  //         tasks[cat][taskId].done = true
  //         if (tasks.score === undefined) tasks.score = 0
  //
  //         // tasks.score += task.score
  //         emitSuccess(req)
  //       }
  //
  //       const obj = {
  //         [cat]: tasks[cat],
  //         score: tasks.score + task.score
  //       }
  //       await store.collection('ctf_user_tasks').updateOne({
  //         user: req.body.user
  //       }, {
  //         $set: obj
  //       })
  //
  //       return res.json({
  //         success: true,
  //         isTrue: tasks[cat][taskId].done
  //       })
  //     }
  //   }
  // } else {
  //   if (task.tryCount !== undefined) {
  //     const r = {
  //       tryCount: 1
  //     }
  //     const result = checkAnswers(task.answer, req.body.answer)
  //
  //     if (result) {
  //       r.done = true
  //       emitSuccess()
  //     } else {
  //       if (r.tryCount === task.tryCount) {
  //         r.done = false
  //         r.fail = true
  //       }
  //     }
  //
  //     const obj = {
  //       user: req.body.user,
  //       score: task.score,
  //       [cat]: {
  //         [taskId]: r
  //       }
  //     }
  //     await store.collection('ctf_user_tasks').insertOne(obj)
  //
  //     return res.json({
  //       success: true,
  //       isTrue: r.done
  //     })
  //   } else {
  //     const r = {}
  //     const result = checkAnswers(task.answer, req.body.answer)
  //
  //     if (result) {
  //       r.done = true
  //       r.score += task.score
  //       r.updatedAt = new Date()
  //       emitSuccess(req)
  //     }
  //
  //     const obj = {
  //       user: req.body.user,
  //       score: task.score,
  //       [cat]: {
  //         [taskId]: r
  //       }
  //     }
  //     await store.collection('ctf_user_tasks').insertOne(obj)
  //
  //     return res.json({
  //       success: true,
  //       isTrue: r.done
  //     })
  //   }
  // }
  // let obj = {}
  // let insert = false

  if (!tasks) {
    await store.collection('ctf_user_tasks').insertOne({
      user: req.body.user,
      score: 0
    })

    tasks = await store.collection('ctf_user_tasks').findOne({
      user: req.body.user
    })
  }

  if (tasks[cat] === undefined) {
    tasks[cat] = { [taskId]: {} }
  } else {
    if (tasks[cat][taskId] === undefined) {
      tasks[cat][taskId] = {}
    }
  }

  if (tasks.score === undefined) {
    tasks.score = 0
  }

  if (tasks[cat][taskId].done) {
    console.log('already done')
    return res.json({
      success: true,
      isTrue: true
    })
  }

  if (tasks[cat][taskId].fail) {
    console.log('already fail')
    return res.json({
      success: true,
      isTrue: false
    })
  }

  if (tasks[cat][taskId].done === undefined) {
    if (task.tryCount !== undefined) {
      if (tasks[cat][taskId].tryCount === undefined) tasks[cat][taskId].tryCount = 0

      tasks[cat][taskId].tryCount++

      const result = checkAnswers(task.answer, req.body.answer)

      if (result) {
        tasks[cat][taskId].done = true
        tasks.score = tasks.score + task.score
        emitSuccess(req)
      } else {
        if (tasks[cat][taskId].tryCount === task.tryCount) {
          tasks[cat][taskId].done = false
          tasks[cat][taskId].fail = true
        }
      }

      tasks.updatedAt = new Date()

      const obj = {
        [cat]: tasks[cat],
        score: tasks.score
      }
      await store.collection('ctf_user_tasks').updateOne({
        user: req.body.user
      }, {
        $set: obj
      })

      return res.json({
        success: true,
        isTrue: result
      })
    } else {
      const result = checkAnswers(task.answer, req.body.answer)

      if (result) {
        tasks[cat][taskId].done = true
        tasks.score = tasks.score + task.score
        emitSuccess(req)
      }

      tasks.updatedAt = new Date()

      const obj = {
        [cat]: tasks[cat],
        score: tasks.score
      }
      await store.collection('ctf_user_tasks').updateOne({
        user: req.body.user
      }, {
        $set: obj
      })

      return res.json({
        success: true,
        isTrue: result
      })
    }
  }

  return res.json({
    success: true,
    isTrue: true
  })
})

function checkAnswers (right, test) {
  let t = test.toLowerCase().split(',').map(i => i.trim())
  t = t.sort()

  let r = right.toLowerCase().split(',').map(i => i.trim())
  r = r.sort()

  console.log('answer', r.join(''), 'test', t.join(''))
  return r.join('') === t.join('')
}

function emitSuccess (req) {
  req.app.get('io').emit('updateTable')
}

module.exports = router
