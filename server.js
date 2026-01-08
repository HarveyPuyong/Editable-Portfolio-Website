require('dotenv').config();

const Express = require('express');
const app = Express();
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const {logger} =  require('./middlewares/log-events');
const errorHandler = require('./middlewares/error-handler');
const credentials = require('./middlewares/credentials');
const corsOptions = require('./config/cors-option');
const dbConn = require('./config/DB-config');
const PORT = process.env.PORT || 4500;

dbConn.connectDB();

app.use(logger);

app.use(credentials);

app.use(cors(corsOptions));

app.use(Express.json());

app.use(cookieParser());

app.use(Express.static(path.join(__dirname, 'frontend')));

// app.use('/uploads', Express.static(path.join(__dirname, 'uploads')));

app.get('/', (req, res) => {
  return res.redirect('main-page.html');
});

app.use(errorHandler);

mongoose.connection.once('open', () => {
  console.log(`Connected to MongoDB database: ${mongoose.connection.name}`);
  app.listen(PORT, () => console.log(`Server is listen to port: http://localhost:${PORT}`));
});
