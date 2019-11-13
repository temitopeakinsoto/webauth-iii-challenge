const router = require('express').Router();
//custom imports
const Users = require('./users-model.js');
const mw = require('../middlewares/middleware');


router.get('/', mw.restricted, (req, res) => {
    Users.find()
      .then(users => {
        res.json(users);
      })
      .catch(err => {
        res.send(err)
      });
 
});

module.exports = router;
