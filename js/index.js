//Event fired when page is loaded
document.addEventListener('DOMContentLoaded', function () {
    setDefaultValue()
}, false);

//Set default values if specified in URL
function setDefaultValue() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    document.getElementById('bot_token').value = urlParams.get('bot_token')
    document.getElementById('bot_chat_id').value = urlParams.get('bot_chat_id')
    document.getElementById('bot_message').value = urlParams.get('bot_message')
}

//Send message through Telegram Bot
function send() {

    //Read input value
    let bot_token = document.getElementById('bot_token').value
    let bot_chat_id = document.getElementById('bot_chat_id').value
    let bot_message = document.getElementById('bot_message').value

    //Replace space with +
    bot_message = bot_message.replace(" ", "+")

    //Create url
    let bot_request_url = 'https://api.telegram.org/bot' + bot_token + '/sendMessage?chat_id=' + bot_chat_id + '&text=' + bot_message;

    //Send request
    fetch(bot_request_url)
        .then(response => response.json())
        .then(data => console.log(data));
}

function viewReceived() {

    //Create url
    let bot_token = document.getElementById('bot_token').value
    let bot_request_url = 'https://api.telegram.org/bot' + bot_token + '/getUpdates';

    //Send request
    fetch(bot_request_url)
        .then(response => {
            return response.json()
        })
        .then(data => {

            console.log(data)

            //Clear previous messages
            const myNode = document.getElementById("ReceivedMessages");
            while (myNode.firstChild) {
                myNode.removeChild(myNode.lastChild);
            }

            /*//Add title
            var label = document.createElement("b");
            label.innerHTML = "Received Messages";
            label.class = "label"
            document.getElementById("ReceivedMessages").appendChild(label);*/

            //Add new messages
            for (var i = 0; i < data.result.length; i++) {

                var chat = document.createElement("P");
                chat.innerHTML += " Chat ID: " + data.result[i].message.chat.id;
                chat.innerHTML += " Date: " + new Date(data.result[i].message.date * 1000).toLocaleDateString("it-IT");
                chat.innerHTML += " " + new Date(data.result[i].message.date * 1000).toLocaleTimeString("it-IT");
                chat.innerHTML += " Name: " + data.result[i].message.chat.first_name;
                chat.innerHTML += " Message: " + data.result[i].message.text;
                chat.id = "chat"
                document.getElementById("ReceivedMessages").appendChild(chat);
            }

        })
        .catch(err => {

            var chat = document.createElement("P");
            chat.innerHTML = " Error! Check your Token / Chat ID / Network Connection. "
            chat.id = "chat"
            document.getElementById("ReceivedMessages").appendChild(chat);

        })

}
