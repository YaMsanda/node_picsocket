/////////////Enlever les var
const path = require('path')
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;
const { appendFileSync } = require('fs')

const publicPath = path.join(__dirname, '/public')

app.get('/', function(req, res) {
    res.sendFile(publicPath + '/index.html');
});

io.on('connection', function(socket) {
    socket.on('chat message', function(msg) {
        io.emit('chat message', msg);
    });
});


http.listen(port, () => { console.log(`PicSocket currently running on port: ${port}`) })