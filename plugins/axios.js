import * as axios from 'axios'

let options = {}
// The server-side needs a full url to work.
if (process.server) {
  options.baseURL = 'http://contenta.local'
}

export default axios.create(options)
