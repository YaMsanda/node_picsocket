let socket = io.connect()

//Socket events
socket.on('new picture', addPic)
socket.on('delete picture', deletePic)

//Append picture function
function addPic(base64Image, id) {
    $('#gallery').append($('<div id="' + id + '" class="container"><div class="overlay overlayFade"><button id="' + id + '" class="deleteBtn">X</button></div><img src="' + base64Image + '"/></div>')).fadeIn(2000)
}
//Delete picture from html function
function deletePic(id) {
    $('#' + id).remove().fadeOut(5000)
}

$(function () {
    //Input picture event
    $('#picfile').bind('change', function (e) {
        for (let i = 0; i < e.originalEvent.target.files.length; i++) {
            let data = e.originalEvent.target.files[i]
            let reader = new FileReader()
            reader.onload = function (evt) {
                socket.emit('new picture', evt.target.result)
            }
            reader.readAsDataURL(data)
        }
    })

})
//Click on delete button event
$(document).on('click', '.deleteBtn', function () {
    socket.emit('delete picture', this.id)
})

//Drag and drop animation - Drag In
$(document).on('dragenter', '#picfile', function () {
    $(this)
        .css({ 'background-color': 'rgba(235, 235, 235, 0.5)' })
        .find("p").show();
});
//Drag and drop animation - Drag Out
$(document).on('dragleave', '#picfile', function () {
    $(this)
        .css({ 'background-color': '' })
        .find("p").hide();
});