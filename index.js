require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const upload = require('express-fileupload');

const port = process.env.PORT || 3000;
const address = process.env.ADDRESS || 'localhost';

const app = express();

const corsOptions = {
  credentials: true,
  origin: [`http://${address}:${port}`, process.env.FRONTEND_URL],
};
app.use(cookieParser());
app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ limit: '20mb', extended: true }));
app.use(bodyParser.json({ limit: '20mb' }));

app.use(upload());
app.use('/static', express.static('src/public/uploads'));

app.use(express.json());

const trackRouter = require('./src/routes/track.routes');
const groupRouter = require('./src/routes/group.routes');
const artistRouter = require('./src/routes/artist.routes');
const genreRouter = require('./src/routes/genre.routes');
const albumRouter = require('./src/routes/album.routes');
const userRouter = require('./src/routes/user.routes');
const searchRouter = require('./src/routes/search.routes');
const authRouter = require('./src/routes/auth.routes');

app.use('/tracks', trackRouter);
app.use('/groups', groupRouter);
app.use('/artists', artistRouter);
app.use('/genres', genreRouter);
app.use('/albums', albumRouter);
app.use('/users', userRouter);
app.use('/search', searchRouter);
app.use('/', authRouter);

app.listen(port, address, () => {
  console.log(`App listening on port http://${address}:${port}`);
});
