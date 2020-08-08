var socket = io.connect()

//Socket event
socket.on('new picture', pic)

//Append picture function
function pic(base64Image) {
    $('#gallery').append($('<img src="' + base64Image + '"/>'))
}

$(function () {
    //Input event
    $('#picfile').bind('change', function (e) {
        for (let i = 0;i<e.originalEvent.target.files.length;i++) {
            var data = e.originalEvent.target.files[i]
            var reader = new FileReader()
            reader.onload = function (evt) {
                socket.emit('new picture', evt.target.result)
            }
            reader.readAsDataURL(data)
        }
    })
})