const chatBox = document.querySelector('.chat-box');
let userMessages = [];
let assistantMessages = [];
let myDateTime = ''

function load() {
  document.getElementById('loader').style.display = "block";
}

function start(){
  const date = document.getElementById('date').value;
  const time = document.getElementById('time').value;
  if(date ===''){
      alert('날짜를 입력해주세요');
      return;
  }
  if(time ===''){
      alert('시간을 입력해주세요');
      return;
  }
  myDateTime = date + time;

  document.getElementById('datetime').style.display = 'none';
  document.getElementById('chat').style.display = 'block';
}

function restart() {
    userMessages = [];
    assistantMessages = [];
    chatBox.innerHTML = '';
}



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

    const response = await fetch('https://so0z3zwn9a.execute-api.ap-southeast-2.amazonaws.com/prod/fortune', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            myDateTime: myDateTime,
            userMessages: userMessages,
            assistantMessages: assistantMessages,
        })
    });

    const data = await response.json();
    //data가 온 이후에 로딩이 사라짐
    document.getElementById('loader').style.display = "none";
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