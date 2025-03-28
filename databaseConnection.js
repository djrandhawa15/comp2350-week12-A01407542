const database = require("mongoose");
const is_hosted = process.env.IS_HOSTED || false;
const databaseName = "lab_example";
const hostedURI = "mongodb+srv://theMongoAdmin:accidentalLoginSteps@cluster0.4ulcc.mongodb.net/"+databaseName+"?retryWrites=true&w=majority";
const localURI ="mongodb://localhost/"+databaseName+"?authSource=admin&retryWrites=true";
if (is_hosted) {
database.connect(hostedURI, {useNewUrlParser: true, useUnifiedTopology: true});
}
else {
database.connect(localURI, {useNewUrlParser: true, useUnifiedTopology: true});
}
		