const db = require("../database/db-config.js");

module.exports = {
  add,
  find,
  findBy,
  findById,
  findByDepartment
};

function find() {
  return db("users").select("id", "username");
}

function findBy(filter) {
  return db("users")
    .where(filter);
}

function findByDepartment(filter) {
    return db("users").select('id', 'username', 'department')
      .where(filter);
  }

async function add(user) {
  const [id] = await db("users").insert(user);

  return findById(id);
}

function findById(id) {
  return db("users").select('id', 'username', 'department')
    .where({ id })
    .first();
}
