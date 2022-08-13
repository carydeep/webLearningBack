const { search } = require("../controllers/searchController")

const router = require("express").Router()

router.get("/:search", search)

module.exports = router
