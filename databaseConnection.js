const mongoose = require("mongoose");

const is_hosted = process.env.IS_HOSTED || false;

const databaseName = "lab_example";

const hostedURI = "mongodb://theMongoAdmin:accidentalLoginSteps@cluster0-shard-00-00.6brbu.mongodb.net:27017,cluster0-shard-00-01.6brbu.mongodb.net:27017,cluster0-shard-00-02.6brbu.mongodb.net:27017/" + databaseName + "?ssl=true&authSource=admin&retryWrites=true&w=majority";

const localURI = "mongodb://localhost/" + databaseName + "?authSource=admin&retryWrites=true";

if (is_hosted) {
    mongoose.connect(hostedURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
} else {
    mongoose.connect(localURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
}

module.exports = mongoose;
