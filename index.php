<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>KS MEET</title>
    <script src="https://unpkg.com/peerjs@1.3.1/dist/peerjs.min.js"></script>
</head>
<body>
    <form action="#">
        <input type="text" name="room-id" id="room-id">
    </form>
        <a href="#" name="create-room" id="create-room">Create room</a>
        <a href="#" name="join-room" id="join-room">Join room</a>
        <pre id="msg"></pre>
        <a href="#" onclick="sendMsg()">Send Msg</a>
    
    <div class="" style="display: flex;">
        <div class="receiver">
            <h1>You</h1>
            <video width="400" id="self-video">
                <source src="" type="">
            </video>
        </div>

        <div class="sender">
            <h1>Remote</h1>
            <video id="remote-video" width="500">
                <source src="" type="">
            </video>
        </div>
    </div>


<script src="script.js"></script>
</body>
</html>