const routes = require("express").Router();

routes.use("/users", require("../routes/users.route"));
routes.use("/auth", require("../routes/auth.route"));
routes.use("/profile", require("../routes/profile.route"));
routes.get("/about", (req, res)=> {
	res.send({
		success: true,
		version: "0.0.1-dev"
	});
});

module.exports = routes;
