const CLIENT_ID = 'YOUR_CHANNEL_ID'; // Ersetze 'YOUR_CHANNEL_ID' mit deiner tatsächlichen Channel ID

const drone = new Scaledrone(CLIENT_ID, {
    data: { name: "Anonymous" } // Optional: Benutzerdaten, die gesendet werden sollen
});

const room = drone.subscribe('observable-room');

room.on('open', error => {
    if (error) {
        return console.error(error);
    }
    console.log('Connected to room');
});

room.on('members', members => {
    console.log('MEMBERS', members);
});

room.on('member_join', member => {
    console.log('MEMBER JOIN', member);
});

room.on('member_leave', member => {
    console.log('MEMBER LEAVE', member);
});

room.on('data', (message, member) => {
    if (member) {
        addMessageToChat(member.clientData.name + ': ' + message);
    } else {
        addMessageToChat('Server: ' + message);
    }
});

document.getElementById('sendMessageButton').addEventListener('click', () => {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value;
    drone.publish({
        room: 'observable-room',
        message
    });
    messageInput.value = '';
});

function addMessageToChat(message) {
    const chat = document.getElementById('chat');
    const msgElem = document.createElement('div');
    msgElem.textContent = message;
    chat.appendChild(msgElem);
}
