export function state () {
  return {
    authenticated: false,
    user: null,
    task: null,
    tasks: [],
    answers: [],
    scores: []
  }
}

export const mutations = {
  'SET_AUTHENTICATED': (state, val) => {
    state.authenticated = val
  },
  'SET_USER': (state, val) => {
    state.user = val
  },
  'SET_TASK': (state, val) => {
    state.task = val
  },
  'SET_TASKS': (state, val) => {
    state.tasks = val
  },
  'SET_ANSWERS': (state, val) => {
    state.answers = val
  },
  'SET_SCORES': (state, val) => {
    state.scores = val
  }
}

export const getters = {
  auth: state => state.authenticated,
  receivingUserInfo: state => state.receivingUserInfo,
  user: state => state.user,
  task: state => state.task,
  tasks: state => {
    if (state.user) {
      return state.tasks.map(i => {
        const tasks = i.tasks.map(j => {
          const t = JSON.parse(JSON.stringify(j))

          try {
            if (state.answers[i.id] && j && state.answers[i.id][j.id]) {
              t.done = state.answers[i.id][j.id].done
              t.fail = state.answers[i.id][j.id].fail
            }
          } catch (e) {
          }

          return t
        })

        const tt = JSON.parse(JSON.stringify(i))
        tt.tasks = tasks
        return tt
      })
    } else {
      return state.tasks
    }
  },
  scores: state => state.scores
}

export const actions = {
  async getData ({ commit }) {
    commit('SET_TASKS', [])

    const response = await fetch('/api/tasks')

    if (response.ok) {
      const res = await response.json()

      if (res.success) {
        commit('SET_TASKS', res.data)
      }
    }
  },
  async getAnswers ({ commit, state }) {
    commit('SET_ANSWERS', [])

    const response = await fetch(`/api/tasks/answers?user=${state.user.id}`)

    if (response.ok) {
      const res = await response.json()

      if (res.success) {
        commit('SET_ANSWERS', res.data)
      }
    }
  },
  async getScore ({ commit }) {
    commit('SET_SCORES', [])

    const response = await fetch('/api/tasks/score')

    if (response.ok) {
      const res = await response.json()
      if (res.success) {
        commit('SET_SCORES', res.data)
      }
    }
  }
}
