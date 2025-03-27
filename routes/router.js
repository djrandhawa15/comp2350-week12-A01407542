const express = require('express');
const router = express.Router();
const database = require('../databaseConnection');
const User = require('../models/user');
const Pet = require('../models/pet');
const Joi = require("joi");

// Home Page - Display all users
router.get('/', async (req, res) => {
    console.log("Page hit - Home Route");
    try {
        const users = await User.find({})
            .select('first_name last_name email _id')
            .exec();
        res.render('index', { allUsers: users });
    } catch (ex) {
        res.render('error', { message: 'Error retrieving users' });
        console.log("Error:", ex);
    }
});

// Route to populate initial data
router.get('/populateData', async (req, res) => {
    console.log("Populate Data Route");
    try {
        let pet1 = new Pet({ name: "Fido" });
        let pet2 = new Pet({ name: "Rex" });

        await pet1.save();
        await pet2.save();

        let user = new User({
            first_name: "Me",
            last_name: "Awesome",
            email: "a@b.ca",
            password_hash: "thisisnotreallyahash",
            password_salt: "notagreatsalt",
            pets: [pet1._id, pet2._id]
        });

        await user.save();
        console.log("Data populated successfully");

        res.redirect("/");
    } catch (ex) {
        res.render('error', { message: 'Error populating data' });
        console.log("Error:", ex);
    }
});

// Route to display pets for a specific user
router.get('/showPets', async (req, res) => {
    console.log("Page hit - Show Pets");
    try {
        const schema = Joi.string().max(25).required();
        const validationResult = schema.validate(req.query.id);

        if (validationResult.error) {
            throw validationResult.error;
        }

        const userResult = await User.findOne({ _id: req.query.id })
            .select('first_name _id')
            .populate('pets')
            .exec();

        res.render('pet', { userAndPets: userResult });
    } catch (ex) {
        res.render('error', { message: 'Error retrieving pets' });
        console.log("Error:", ex);
    }
});

module.exports = router;
