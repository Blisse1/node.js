const express = require("express");
const router = express.Router();

router.route("/")
    .get()
    .post()
    .put()
    .delete();

router.route("/:id")
    .get((req, res) => {
        res.json({"id": req.params.id});
    });

module.exports = router;

