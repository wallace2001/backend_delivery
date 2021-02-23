require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const loginRouter = require('./router/LoginRoutes');
const aboutRouter = require('./router/AboutRoutes');
const evaluationRotuer = require('./router');
const descriptionRotuer = require('./router/DescriptionRoutes');
const promoRouter = require('./router/PromoRoutes');
const dessertsRouter = require('./router/DessertsRouter');
const contactRouter = require('./router/ContactRouter');
const sokcetIo = require('socket.io');
const http = require('http');


mongoose.set('useCreateIndex', true);
mongoose.connect(process.env.MONGO_URL_ATLAS, {useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false});

const app = express();
const server = http.Server(app);
const io = sokcetIo(server);

app.use((req, res, next) => {
    req.io = io;
    return next();
})

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}));


app.use('/files', express.static(path.resolve(__dirname, ".", "uploads")));
app.use(cors());


app.use('/', loginRouter);
app.use('/about', aboutRouter);
app.use(evaluationRotuer);
app.use('/description', descriptionRotuer);
app.use('/promo', promoRouter);
app.use('/dessert', dessertsRouter);
app.use('/contact', contactRouter);

app.listen(process.env.PORT || 3001, () => console.log('Contectado!'));