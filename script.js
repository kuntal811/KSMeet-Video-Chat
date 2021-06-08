
let dataConnection;
let rooomId;
let peer;
let localStream;
let selfStream;
let remoteStreamTest;
let streamSetting = {
                        video: {
                            width:  640,
                            height: 360,
                            },
                        audio:{
                                echoCancellation: true,
                                noiseSuppression: true,

                            },
                    }
var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

//local video
function setLocalVideo(){
    if(getUserMedia ){
        getUserMedia(
            {
                video: {width:640,height:360},
                audio: false,
            },
            function(stream){
                selfStream = stream;
                var video = document.querySelector('#self-video');
                video.srcObject = selfStream;
                video.onloadedmetadata = function(e){
                    video.play();
                }
            },  
            function(err){
                console.log(err);
            }
        );
    }else{
        console.log("getuserMedia not supported ");
    }
}

document.getElementById('create-room').addEventListener('click',function(){
    /*
    var roomId = document.getElementById('room-id').value;
    if(roomId == "" || roomId == " "){
        alert('please enter room no');
        return;
    }
    */
    document.getElementById('create-room').children[1].classList.add("fas","fa-circle-notch","fa-spin");
   //createCanvas();
   roomId = randomAlpha(3)+"-"+randomAlpha(3);
    //create peer with id
    peer = new Peer(roomId);

    peer.on('open',function(id){
        console.log("peer id: "+id);
        //alert(id);
        if(getUserMedia ){
            getUserMedia(
                streamSetting,
                function(stream){
                    localStream = stream;
                    setLocalVideo();
                    document.getElementById('meeting-id').value = roomId;
                    createCanvas();
                    document.getElementById('create-room').children[1].classList.remove("fas","fa-circle-notch","fa-spin");

                },  
                function(err){
                    console.log(err);
                }
            );
        }else{
            console.log("getuserMedia not supported ");
        }

    });
    peer.on('call',function(data){
        document.getElementById('show-msg').style.display="none";
        data.answer(localStream);
        data.on('stream',function(remoteStream){
         var video =  document.querySelector("#remote-video");
         remoteStreamTest = remoteStream;
         remoteStream.getTracks()[0].onmute = function(){
             alert("muted");
         }
         video.srcObject = remoteStream;
         video.play();
      });
     });

    peer.on('connection',function(data){
        console.log("connected with sender");
        dataConnection = data;

        data.on('data',function(data){
            console.log("server: "+data);
            let html = '<p class="remote-msg"><span>'+data+'</span></p>';
            document.getElementById('chat').innerHTML += html;
            scrollBottom();
            
        });

    });
    peer.on('disconnected', function() {
        window.location.reload();
    });


});




//join
document.getElementById('join-room').addEventListener('click',function(){
    var roomId = document.getElementById('room-id').value;
    if(roomId == "" || roomId == " "){
        alert('please enter room no');
        return;
    }
    document.getElementById('join-room').children[0].classList.add("fas","fa-circle-notch","fa-spin");

    peer = new Peer();

    peer.on('open',function(id){

        dataConnection = peer.connect(roomId);
        dataConnection.on('data',function(data){
            console.log("user: "+data);
            let html = '<p class="remote-msg"><span>'+data+'</span></p>';
            document.getElementById('chat').innerHTML += html;
            scrollBottom();
        });



        if(getUserMedia){
            getUserMedia(
                streamSetting,
                function(stream){
                    localStream = stream;
                    setLocalVideo();
                    document.getElementById('show-msg').innerHTML = "Connecting . .";
                    createCanvas();
                    document.getElementById('join-room').children[0].classList.remove("fas","fa-circle-notch","fa-spin");

                    var call = peer.call(roomId,localStream);
                    call.on('stream',function(stream){
                        document.getElementById('show-msg').innerHTML = "";
                        var video =  document.querySelector("#remote-video");
                        video.srcObject = stream;
                        video.play();
                    });
                },
                function(err){
                    console.log(err);
                }
            );
        }else{
            console.log("getuserMedia not supported ");
        }
    });

    peer.on('disconnected', function() {
        console.log("disconnected ");
        peer.destroy();
    });
    
});


function randomAlpha(length) {
    var result           = [];
    var characters       = 'abcdefghijklmnopqrstuvwxyz';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result.push(characters.charAt(Math.floor(Math.random() * 
 charactersLength)));
   }
   return result.join('');
}


function createCanvas(){
    document.getElementById('home').style.display="none";
    document.getElementById('meeting').style.display="block";
}
function destroyCanvas(){
    document.getElementById('meeting').style.display="none";
    document.getElementById('home').style.display="block";
}

//######################
//Send message function
document.getElementById('send-msg').addEventListener('click',function(){
    let msg = document.getElementById('msg').value;
    dataConnection.send(msg);
    let html = '<p class="self-msg"><span>'+msg+'</span></p>';
    document.getElementById('chat').innerHTML += html;
    scrollBottom();
    document.getElementById('msg').value="";

});

document.getElementById('mute-audio').addEventListener('click',function(){
    if(localStream.getAudioTracks()[0]['enabled']){
        localStream.getAudioTracks()[0]['enabled'] =false;
        let elm = document.getElementById('mute-audio').children[0];
        elm.classList.remove('fa-microphone');
        elm.classList.add('fa-microphone-slash');
    }else{
        let elm = document.getElementById('mute-audio').children[0];
        localStream.getAudioTracks()[0]['enabled'] =true;
        elm.classList.remove('fa-microphone-slash');
        elm.classList.add('fa-microphone');
    } 
});


document.getElementById('mute-video').addEventListener('click',function(){
    if(localStream.getVideoTracks()[0]['enabled']){
        localStream.getVideoTracks()[0]['enabled'] =false;
        let elm = document.getElementById('mute-video').children[0];
        elm.classList.remove('fa-video');
        elm.classList.add('fa-video-slash');

    }else{
        localStream.getVideoTracks()[0]['enabled'] =true;
        let elm = document.getElementById('mute-video').children[0];
        elm.classList.remove('fa-video-slash');
        elm.classList.add('fa-video');
    } 
});

document.getElementById('call-end').addEventListener('click',function(){
    if(confirm("Are you sure to end the meet ?")){
        localStream.getTracks().forEach((track)=>{track.stop()});
        selfStream.getTracks().forEach((track)=>{track.stop()});
        peer.disconnect();
        destroyCanvas();
    }

});
document.getElementById('share-screen').addEventListener('click',function(){
    getUserMedia = navigator.getDisplayMedia;

});

document.getElementById('open-chat').addEventListener('click',function(e){
    let elm = document.getElementById('chat-container');
    if(elm.style.display == "none"){
        elm.style.display="block";
        document.getElementById('open-chat').children[0].classList.remove('fab','fa-facebook-messenger');
        document.getElementById('open-chat').children[0].classList.add('fas','fa-times');
    }else{
        elm.style.display="none";
        document.getElementById('open-chat').children[0].classList.remove('fas','fa-times');
        document.getElementById('open-chat').children[0].classList.add('fab','fa-facebook-messenger');
    }


});

document.querySelector('.copy-meeting-id').children[1].addEventListener('click',function(){
    let text = document.getElementById("meeting-id");
    text.select();
    text.setSelectionRange(0,999999);
    document.execCommand('copy');
    document.getElementById('coppied-msg').innerText="Meeting id coppied";
    setTimeout(function(){
        document.getElementById('coppied-msg').innerText="";
    },3000);
})




function scrollBottom(){
    let elm = document.getElementById('chat');
    if((elm.scrollTop + elm.clientHeight) != elm.scrollHeight){
        elm.scrollTop = elm.scrollHeight;
    }
}
//##########################
