const express = require('express');
const dotenv = require('dotenv');
const { processWarehouseDB } = require('./warehouse_data');
const { processDeliveryDB } = require('./delivery_data');
const { processDB } = require('./user_data');

dotenv.config();

const app = express();
app.use(express.json());

app.post('/register', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await processDB(email, password);
        res.status(201).json({ message: 'User registered successfully', userId: user.userId });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.post('/add-warehouses', async (req, res) => {
    try {
        await processWarehouseDB();
        res.status(201).json({ message: 'Warehouses added successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.post('/add-deliveries', async (req, res) => {
    try {
        await processDeliveryDB();
        res.status(201).json({ message: 'Deliveries added successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});