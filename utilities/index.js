export const deepClone = (obj) => JSON.parse(JSON.stringify(obj))

export const getRandomItem = items => items[Math.floor(Math.random() * items.length)]

export const delay = (time) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), time)
  })
}

export const fetchJSONP = (unique => url =>
  new Promise((resolve, reject) => {
    // INIT
    let script = document.createElement('script')
    let name = '_jsonp_' + unique++

    if (url.match(/\?/)) url += '&callback=' + name
    else url += '?callback=' + name

    script.src = url
    window[name] = json => {
      resolve(new Response(JSON.stringify(json)))
      script.remove()
      delete window[name]
    }

    script.onerror = err => {
      console.log(err)
      script.remove()
      delete window[name]
      reject(err)
    }

    document.body.appendChild(script)
  })
)(0)

export const fixedEncodeURIComponent = str => encodeURIComponent(str).replace(/[!'()*]/g, c => '%' + c.charCodeAt(0).toString(16))

export default {
  deepClone,
  delay,
  fetchJSONP,
  fixedEncodeURIComponent,
  getRandomItem
}
