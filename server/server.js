/* TODO :                           !! enlever éventuels var dans le code !!
 * Input multiple images
 * Suppresion d'image
    * Nouvel évènement socket : delete picture
    * Give pictures Ids ?
 */

/* BONUS :
 * Images en BDD
    * Donner une durée de vie paramétrable aux images
 * Belle IHM
    * Header
    * Gallery
        * Grille
        * Bouton Delete
        * Animation ?
    * Input
        * Zone glisser-déposer
    * Redirect Github ??
 */
const path = require('path')
const express = require('express')
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

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
        io.emit('new picture', pic);
    });
});

http.listen(port, () => { console.log(`PicSocket currently running on port: ${port}`) })