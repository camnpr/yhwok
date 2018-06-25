'use strict'

module.exports = {
  '/hello'(req, res) {
      res.send(`hello ${Math.random()}`)
  },
  '/list'(req, res) {
      res.send('1111111')
  },
  '/user': {
      name: 'test',
      age: 20
  },
  '/api/*': 'http://www.example.com'
}