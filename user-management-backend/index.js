const express = require('express');
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('./Routes/userRoutes');
const errorHandler = require('./Middleware/errorHandler');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Backend running on http://localhost:${PORT}`));