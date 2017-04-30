var mongoose = require("mongoose");
var profileSchema = new mongoose.Schema({
	name: String,
	availablity: String,
	languages: String,
	biography: String,
	// image: String,
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: "String"
	}

});

module.exports = mongoose.model("Profile", profileSchema);
