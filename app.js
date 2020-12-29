const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');   // not used yet

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

app.set('view engine', 'ejs');

const dbURI='mongodb+srv://alokeveer2001:alokeveer2001@cluster0.vhxns.mongodb.net/tutorials?retryWrites=true&w=majority';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

app.get('*', checkUser);
app.get('/', (req, res) => res.render('home', {title: 'home'}));
app.use(authRoutes);