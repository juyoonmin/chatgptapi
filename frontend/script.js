const chatBox = document.querySelector('.chat-box');
let userMessages = [];
let assistantMessages = [];

const sendMessage = async () => {
    const chatInput = document.querySelector('.chat-input input');
    const chatMessage = document.createElement('div');
    chatMessage.classList.add('chat-message');
    chatMessage.innerHTML = `
    <p>${chatInput.value}</p>
  `;
    chatBox.appendChild(chatMessage);

    //userMessage 메시지 추가
    userMessages.push(chatInput.value)
    chatInput.value = '';

    const response = await fetch('http://localhost:3000/fortune', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userMessages: userMessages,
            assistantMessages: assistantMessages,
        })
    });

    const data = await response.json();
    //assistantMessage 메시지 추가
    assistantMessages.push(data.assistant)

    const astrologerMessage = document.createElement('div');
    astrologerMessage.classList.add('chat-message');
    astrologerMessage.innerHTML = `
    <p class='assistant'>${data.assistant}</p>
  `;
    chatBox.appendChild(astrologerMessage);
};

document.querySelector('.chat-input button').addEventListener('click', sendMessage);