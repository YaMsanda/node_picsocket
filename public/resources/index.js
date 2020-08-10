var socket = io.connect()

//Socket events
socket.on('new picture', addPic)
socket.on('delete picture', deletePic)

//Append picture function
function addPic(base64Image, id) {
    $('#gallery').append($('<div id="'+id+'"><button id="'+id+'" class="deleteBtn">X</button><img src="' + base64Image + '"/></div>'))
}

function deletePic(id){
    $('#'+id).remove()
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
$(document).on('click', '.deleteBtn', function() {
    console.log(this.id)
    socket.emit('delete picture', this.id)
})