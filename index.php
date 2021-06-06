<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>KS MEET</title>
    <link rel="stylesheet" href="style.css">
    <script src="https://unpkg.com/peerjs@1.3.1/dist/peerjs.min.js"></script>
</head>
<body>
    <div id='home'>
        <nav id=navbar>
            <img src="logo.png">
        </nav>
        <section id="main">
            <div class="hero">
                <h1>Premium Video Chats. Now free for everyone.</h1>
                <p>We re-engineered the service that we built for secure business meetings, Google Meet, to make it free and available for all.</p>
                <div class="btn-div">
                    <button class="btn" id="create-room">
                        <svg height="472pt" viewBox="0 -87 472 472" width="472pt" xmlns="http://www.w3.org/2000/svg">
                        <path d="m467.101562 26.527344c-3.039062-1.800782-6.796874-1.871094-9.898437-.179688l-108.296875 59.132813v-35.480469c-.03125-27.601562-22.398438-49.96875-50-50h-248.90625c-27.601562.03125-49.96875 22.398438-50 50v197.421875c.03125 27.601563 22.398438 49.96875 50 50h248.90625c27.601562-.03125 49.96875-22.398437 50-50v-34.835937l108.300781 59.132812c3.097657 1.691406 6.859375 1.625 9.894531-.175781 3.039063-1.804688 4.898438-5.074219 4.898438-8.601563v-227.816406c0-3.53125-1.863281-6.796875-4.898438-8.597656zm-138.203124 220.898437c-.015626 16.5625-13.4375 29.980469-30 30h-248.898438c-16.5625-.019531-29.980469-13.4375-30-30v-197.425781c.019531-16.558594 13.4375-29.980469 30-30h248.90625c16.558594.019531 29.980469 13.441406 30 30zm123.101562-1.335937-103.09375-56.289063v-81.535156l103.09375-56.285156zm0 0"/>
                        </svg>
                        Create room
                    </button>
                    <div class="join">
                        <input type="text" name="room-id" id="room-id" placeholder="Enter meeting code">
                        <button class="btn" id="join-room">Join</button>
                    </div>
                </div>
            </div>
            <div class="cover">
                <img src="cover.png">
            </div>
        </section>
        <footer>
            <p>Made with <3 by Kuntal Sarkar</p>
        </footer>
    </div>


    <div id="meeting">
        <a href="#" onclick="sendMsg()">Send Msg</a>
    
        <div class="">
            <div class="receiver">
                <video width="400" id="self-video">
                    <source src="" type="">
                </video>
            </div>

            <div class="sender">
                <video id="remote-video" width="500">
                    <source src="" type="">
                </video>
            </div>
            <div id="meeting-link-container">

            </div>
            <button class="open-chat" id="open-chat"><i class="fab fa-facebook-messenger"></i></button>
            <div class="chat-container" id="chat-container">
                <h2 class="chat-header">Chat</h2>
                <div class="chat-wrapper" id="chat">
                    
                </div>
                <div class="msg-btn">
                    <input type="text" class="msg" id="msg" placeholder="Write your message">
                    <button class="send-msg" id="send-msg"><i class="fas fa-paper-plane"></i></button>
                </div>
            </div>
        </div>
        <div class="call-button">
            <button id="mute-audio"><i class="fas fa-microphone"></i></button>
            <button id="mute-video"><i class="fas fa-video"></i></button>
            <button id="call-end"><i class="fas fa-phone"></i></button>
            <button id="share-screen"><i class="fas fa-desktop"></i></button>
        </div>
    </div>
<script src="https://kit.fontawesome.com/9b92be56de.js" crossorigin="anonymous"></script>
<script src="script.js"></script>
</body>
</html>