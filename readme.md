## 移动端直播消息组件
[在线体验](https://www.mofazhuan.com/595.html)

### 安装插件
```
//npm
npm i mobile-live-message --save;
//cdn
<script src="./src/lib/index.js"></script>

```

### 初始化插件
```
var parentBox = document.querySelector('#container')
var Mes = new liveMessage(parentBox,{})
```
### 发送单条消息
```
var mesStr = '你好';
var mesObj = {
    text: '你好'
}
Mes.send(mesStr);
Mes.send(mesObj);
```
消息如果是对象的格式，插件默认会读取```text```字段内容。
### 发送多条消息
```
var mesArrayStr = ['你好','你好'];
var mesArrayObj = [
    {
        text: '你好'
    },
    {
        text: '你好'
    }
]
Mes.send(mesArrayStr);
Mes.send(mesArrayObj);
```

### 消息自定义
初始化插件的时候可以传入```fotmat```参数，如下
```
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
 var data = [
            {
                type: 'rocket',
                text: '小火箭飞一个'
            }
        ]
Mes.send(data);
```
然后你需要在插件外面写你的消息样式，插件不会做样式上的干预,因为这里的样式五花八门，没法统一。
