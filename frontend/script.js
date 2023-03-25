const chatBox = document.querySelector('.chat-box');

const sendMessage = async () => {
    const chatInput = document.querySelector('.chat-input input');
    const chatMessage = document.createElement('div');
    chatMessage.classList.add('chat-message');
    chatMessage.innerHTML = `
    <p>${chatInput.value}</p>
  `;
    chatBox.appendChild(chatMessage);
    chatInput.value = '';

    const response = await fetch('http://localhost:3000/fortune', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            message: chatInput.value
        })
    });

    const data = await response.json();

    const astrologerMessage = document.createElement('div');
    astrologerMessage.classList.add('chat-message');
    astrologerMessage.innerHTML = `
    <p class='assistant'>${data.assistant}</p>
  `;
    chatBox.appendChild(astrologerMessage);
};

document.querySelector('.chat-input button').addEventListener('click', sendMessage);