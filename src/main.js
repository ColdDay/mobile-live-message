import './css/index.css';
import liveMessage from './lib/index.js';
import FaceIcon from './images/face.png';
import RocketIcon from './images/rocket.png';
import FlowerIcon from './images/flower.png';

var parentBox = document.querySelector('.message-area');
var Mes = new liveMessage(parentBox, {
    format: function(mesItem) {
        if (mesItem.type === 'rocket') {
            return `<img src="${RocketIcon}" class="icon icon-rocket"/><span>${mesItem.text}</span>`
        } else if (mesItem.type === 'flower') {
            return `<img src="${FlowerIcon}" class="icon icon-flower"/><span>${mesItem.text}</span><img src="${FlowerIcon}" class="icon icon-flower"/>`
        } else if (mesItem.type === 'face') {
            return `<img src="${FaceIcon}" class="icon icon-face"/><span>${mesItem.text}</span>`
        }
        
    }
});
function loop() {
    var data = [
        {
            type: 'face',
            text: '笑一个，大兄弟'
        },
        {
            type: 'flower',
            text: '鲜花送上'
        },
        {
            type: 'rocket',
            text: '小火箭飞一个'
        }
    ]
    var random = Math.random();
    if (random > 0.7) {
        data = [
            {
                type: 'face',
                text: '笑一个，大兄弟'
            },
            {
                type: 'flower',
                text: '鲜花送上'
            },
            {
                type: 'rocket',
                text: '小火箭飞一个'
            }
        ]
    } else if (random > 0.5){
        data = [
            {
                type: 'face',
                text: '笑一个，大兄弟'
            },
            {
                type: 'rocket',
                text: '小火箭飞一个'
            }
        ]
    } else if (random > 0.3){
        data = [
            {
                type: 'rocket',
                text: '小火箭飞一个'
            }
        ]
    } else {
        data = [
            {
                type: 'face',
                text: '笑一个，大兄弟'
            }
        ]
    }
    Mes.send(data);
    setTimeout(function() {
        loop()
    }, 3000)
}
loop();
document.querySelector('.send-btn').addEventListener('click', function() {
    var text = document.querySelector('.send-input').value;
    Mes.send(text);
})