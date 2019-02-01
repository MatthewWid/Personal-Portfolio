const router = require("express").Router();

router.get("/", (req, res) => {
	res.render("home", {
		title: "Home"
	});
});

router.get("/contact", (req, res) => {
	res.render("contact", {
		title: "Contact"
	});
});

module.exports = router;
