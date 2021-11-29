const express = require('express');
const connectDB = require('./config/db');
const app = express();
const morgan = require('morgan');
const cors = require('cors')

connectDB();

app.use(morgan('dev'));
// Init Middleware
app.use(express.json({ limit: '50mb', extended: false }));
app.use(cors())

app.use('/api/uploads', express.static('uploads'))
app.use('/api/uploads/musicians', express.static('uploads/musicians'))

app.use('/api/musicians', require('./routes/musician.js'));


// set static folder
app.use(express.static('frontend/build'));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
})

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => { console.log('server started on port' + PORT) });


module.exports = server;