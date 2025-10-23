const mongoose = require('mongoose');
const express = require('express');
const cors = require("cors");
const bcrypt = require('bcrypt');

const app = express();

mongoose.connect('mongodb://localhost:27017/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to test database');
}).catch((err) => {
    console.log('Error connecting to database', err);
});

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

UserSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

const User = mongoose.model('users', UserSchema);

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000'
}));

app.get("/", (req, resp) => {
    resp.send("App is working");
});

app.post("/register", async (req, resp) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return resp.status(400).send("User already registered");
        }

        const user = new User({ name, email, password });
        let result = await user.save();
        if (result) {
            delete result.password;
            resp.status(201).send(result);
        }
    } catch (e) {
        console.log(e);
        resp.status(500).send({ message: "Something went wrong", error: e.message });
    }
});

app.listen(5000, () => {
    console.log("App is running on port 5000");
});
