const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const { PORT } = require('./config');
const userRoutes = require('./routes/userRoutes');

const app = express();

// middleWare
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

app.use('/', userRoutes);

// routes
app.get('/', (req, res) => {
  res.send('Hello World');
});

// 404
app.all('*', (req, res) => {
  res.status(404).json({ error: 'Page not found' });
});
app.listen(PORT, () => console.log('server online on PORT', PORT));
