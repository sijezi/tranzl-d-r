var mongoose = require("mongoose");
var profileSchema = new mongoose.Schema({
	name: String,
	availablity: String,
	language: String,
	profession: String,
	specialty: String,
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: "String"
	}

});

module.exports = mongoose.model("Profile", profileSchema);
