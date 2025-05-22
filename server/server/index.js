const express = require('express');
const cors = require('cors');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use('/api/tasks', taskRoutes);

app.get('/', (req, res) => {
    res.send('Api is running');
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
