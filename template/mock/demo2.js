'use strict'

module.exports = {
  '/ok'(req, res) {
      res.send(`OK ${Math.random()}`)
  },
  '/new'(req, res) {
      res.send('new10110101010101010101')
  },
  '/old1': {
      name: 'test',
      age: 101
  },
  '/api/*': 'http://www.example.com'
}