const router = require("express").Router();
//custom imports
const Users = require("./users-model.js");
const mw = require("../middlewares/middleware");

router.get("/", mw.restricted, (req, res) => {
  const department = req.decodedToken.department;
  Users.findByDepartment({ department })
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.send(err);
    });
});

module.exports = router;
