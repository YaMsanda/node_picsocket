var socket = io.connect()

//Socket event
socket.on('new picture', pic)

//Append picture function
function pic(base64Image) {
    $('#gallery').append($('<div>'), '<img src="' + base64Image + '"/>')
}

$(function () {
    //Input event
    $('#picfile').bind('change', function (e) {
        var data = e.originalEvent.target.files[0]
        var reader = new FileReader()
        reader.onload = function (evt) {
            socket.emit('new picture', evt.target.result)
        }
        reader.readAsDataURL(data)
    })
})