const mongoose = require('mongoose');
const express = require('express');
const cors = require("cors");
const bcrypt = require('bcrypt');

const app = express();

// Połączenie z MongoDB
mongoose.connect('mongodb://localhost:27017/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to test database');
}).catch((err) => {
    console.log('Error connecting to database', err);
});

// Schemat użytkownika
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

// Przed zapisem użytkownika, hasło będzie haszowane
UserSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

const User = mongoose.model('users', UserSchema);

// Middleware
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000'
}));

// Endpoint - sprawdzenie, czy serwer działa
app.get("/", (req, resp) => {
    resp.send("App is working");
});

// Endpoint - rejestracja użytkownika
app.post("/register", async (req, resp) => {
    try {
        const { name, email, password } = req.body;

        // Sprawdzanie, czy użytkownik już istnieje
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return resp.status(400).send("User already registered");
        }

        const user = new User({ name, email, password });
        let result = await user.save();
        if (result) {
            // Usuwanie hasła z odpowiedzi
            delete result.password;
            resp.status(201).send(result);
        }
    } catch (e) {
        console.log(e);
        resp.status(500).send({ message: "Something went wrong", error: e.message });
    }
});

// Uruchomienie serwera
app.listen(5000, () => {
    console.log("App is running on port 5000");
});
