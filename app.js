require('dotenv').config()
const express = require("express");
const app = express();
const mongoose=require('mongoose')
const PORT=process.env.PORT ||4000;
const path=require('path')
const ejs=require('ejs')
const expressLayout=require('express-ejs-layouts');
const exp = require("constants");
const session=require('express-session')
const flash = require("express-flash");
const MongoDbStore = require('connect-mongo');
const passport =require('passport')
const Emitter = require('events')


mongoose.connect(process.env.MONGO_CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify: true,
    // useCreateIndex: true
});
const connection = mongoose.connection;

connection.once('open', () => {
    console.log("database connected successfully...");
}).on('error', (error) => {
    console.warn('Warning', error);
});

// Session store
// let mongoStore = new MongoDbStore({
//     mongooseConnection: connection,
//     collection: 'sessions'
// })

// Event emitter
const eventEmitter = new Emitter()
app.set('eventEmitter', eventEmitter)

//session store
app.use(session({
    secret:process.env.COOKIE_SECRET,
    resave:false,
    store:MongoDbStore.create({
        mongoUrl: process.env.MONGO_CONNECTION_URL,
        // client:connection.getClient()
    }),
    saveUninitialized:false,
    cookie:{maxAge:1000*60*60*24} //24hr
}))

//passport config
const passportInit = require('./src/config/passport')
passportInit(passport)
app.use(passport.initialize())
app.use(passport.session())

app.use(flash())
app.use(express.static('public'));
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use((req,res,next)=>{
    res.locals.session=req.session
    res.locals.user=req.user
    console.log(req.user);
    next()
}) 
// app.use(expressLayout) 
app.set('views', path.join(__dirname, 'resources/views'))
app.set('view engine', 'ejs')

require('./routes/web')(app)

const server=app.listen(PORT,()=>{
    console.log(`server listening on ${PORT}`);
})
const io = require('socket.io')(server)
io.on('connection', (socket) => {
    // Join
    socket.on('join', (orderId) => {
        socket.join(orderId)
    })
})

eventEmitter.on('orderUpdated', (data) => {
    io.to(`order_${data.id}`).emit('orderUpdated', data)
})

eventEmitter.on('orderPlaced', (data) => {
    io.to('adminRoom').emit('orderPlaced', data)
})

