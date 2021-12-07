import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export function state () {
  return {
    initialized: false,
    initializedError: false,
    supportBrowser: true,
    dataSaving: false,
    dataSaved: false,
    statuses: {},
    filesCount: false,
    processedFile: null,
    searching: false,
    errors: []
  }
}

export const getters = {
  initialized: state => state.initialized,
  initError: state => state.initializedError,
  supportBrowser: state => state.supportBrowser
}

export const mutations = {
  SET_INITIALIZED: (state, val) => {
    state.initialized = val
  },
  SET_INITIALIZED_ERROR: (state, val) => {
    state.initializedError = val
  },
  SET_ERROR: (state, val) => {
    state.error = val
  },
  SET_SUPPORT_BROWSER: (state, val) => {
    state.supportBrowser = val
  },
  SET_HAS_EXTENSION: (state, val) => {
    state.hasExtension = val
  },
  SET_DATA_SAVING: (state, val) => {
    state.dataSaving = val
  },
  SET_DATA_SAVED: (state, val) => {
    state.dataSaved = val
  },
  SET_STATUSES: (state, val) => {
    state.statuses = val
  },
  SET_FILES_COUNT: (state, val) => {
    state.filesCount = val
  },
  SET_PROCESSED_FILE: (state, val) => {
    state.processedFile = val
  },
  SET_SEARCHING: (state, val) => {
    state.searching = val
  }
}

export const actions = {
  checkBrowser ({ commit }) {
    let supported = false

    try {
      supported = 'serviceWorker' in navigator && !!new ReadableStream() && !!new WritableStream()
    } catch (err) {}

    commit('SET_SUPPORT_BROWSER', supported)

    return supported
  },
  checkExtension ({ state, commit }) {
    // eslint-disable-next-line no-undef
    if (typeof chrome !== 'undefined' && 'runtime' in chrome) {
      // eslint-disable-next-line no-undef
      chrome.runtime.sendMessage(state.extensionId, { message: 'version' },
        (reply) => {
          if (reply) {
            if (reply.version) {
              if (reply.version >= 1) {
                commit('SET_HAS_EXTENSION', true)
              }
            }
          } else {
            commit('SET_HAS_EXTENSION', false)
          }
        })
    }
  },
  init ({ commit, getters, state }) {
    return new Promise((resolve, reject) => {
      if (state.hasExtension || !state.supportBrowser) {
        commit('SET_INITIALIZED', true)
        return resolve()
      }

      window.vkAsyncInit = () => {
        VK.init({ // eslint-disable-line no-undef
          apiId: state.apiId
        })

        commit('SET_INITIALIZED', true)
        resolve()
      }

      setTimeout(() => {
        const script = document.querySelector('[src="https://vk.com/js/api/openapi.js?151"]')
        if (script) script.remove()

        const el = document.createElement('script')
        el.type = 'text/javascript'
        el.src = 'https://vk.com/js/api/openapi.js?151'
        el.async = true
        document.getElementsByTagName('body')[0].appendChild(el)
      }, 0)

      setTimeout(() => {
        if (!getters.initialized) {
          commit('SET_INITIALIZED_ERROR', true)
          reject(new Error('Not initialized'))
        }
      }, 5000)
    })
  },
  startSave ({ commit, getters }) {
    let result = {}
    const items = getters['menu/items']

    for (const i of Object.keys(items)) {
      if (items[i].checked) {
        result[items[i].title] = { status: 'waiting' }
      }
    }

    commit('SET_STATUSES', result)
  }
}
