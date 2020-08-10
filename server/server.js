/* TODO :                           !! enlever éventuels var dans le code !!
 * Suppresion d'image
    * Nouvel évènement socket : delete picture
    * Give pictures Ids ?
 */

/* BONUS :
 * Images en BDD
    * Donner une durée de vie paramétrable aux images
 * Belle IHM
    * Gallery
        * Bouton Delete
        * Animation ?
    * Input
        * Zone glisser-déposer
 */
const path = require('path')
const express = require('express')
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;
let idInc = 0
function getId(){
    idInc++
    return idInc
}

//Path used to serve index.html
const publicPath = path.join(__dirname, '/../public')
app.use('/resources', express.static(__dirname + '/../public/resources'));

//Default route
app.get('/', function (req, res) {
    res.sendFile(publicPath + '/index.html');
});

//Socket handler
io.on('connection', function (socket) {
    socket.on('new picture', function (pic) {
        io.emit('new picture', pic, getId());
    });
    socket.on('delete picture', function (id) {
        console.log(id)
        io.emit('delete picture', id);
    });
});

http.listen(port, () => { console.log(`PicSocket currently running on port: ${port}`) })

/*
Ressources utilisées :
    StackOverflow
    CSS-Tricks.com
    https://github.com/mmarcon/node-chat
*/