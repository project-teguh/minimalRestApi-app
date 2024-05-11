require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');

//router imports
const router = require('./routes/router');
const userRouter = require('./routes/user.route');

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors({ origin: true, credentials: true }));

sequelize
    .authenticate()
    .then(function(err) {
        console.log('Database connection established successfully');
    })
    .catch(function(err) {
        console.log('Unable to connect to the database:', err);
    });

app.use('/', router);
app.use('/user', userRouter);

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server running at: http://localhost:${PORT}/`);
});
