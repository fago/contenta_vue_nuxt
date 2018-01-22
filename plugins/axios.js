import * as axios from 'axios'

let options = {}

options.baseURL = 'http://contenta.local'

export default axios.create(options)
