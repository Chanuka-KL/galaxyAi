const express = require('express');
const brain = require('brain.js');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3000;

// Load training data
const rawData = fs.readFileSync('brain_train_data.json');
const trainingData = JSON.parse(rawData);

const net = new brain.recurrent.LSTM();
net.train(trainingData, { iterations: 100 });

app.get('/api', (req, res) => {
    const query = req.query.query;
    if (!query) return res.json({ status: false, message: "No query provided." });

    const reply = net.run(query);
    res.json({ status: true, result: reply });
});

app.listen(port, () => {
    console.log(`AI API running on port ${port}`);
});
