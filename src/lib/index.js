(function (win, doc) {
    "use strict";
    function liveMessage(container, options) {
        if (!container) {
            throw 'parent element is null'
        }
        var myParentEle = document.createElement('div');
        myParentEle.className = 'mobile-live-message-box';
        myParentEle.style.width = '100%';
        myParentEle.style.height = '100%';
        myParentEle.style.overflow = 'auto';
        container.appendChild(myParentEle)
        
        var contentBox = document.createElement('div');
        contentBox.className = 'mobile-live-message-content-box';
        myParentEle.appendChild(contentBox);
        this.parentElement = contentBox;
        this.options = {...options};
        this.stopScroll = false;
        myParentEle.addEventListener('touchend', (e) => {
            var bottomLen = Math.abs(myParentEle.scrollTop - (contentBox.offsetHeight - myParentEle.offsetHeight));
            if (bottomLen > 30) {
                console.log('停止自动滚动底部')
                this.stopScroll = true;
                setTimeout(() => {
                    this.stopScroll = false;
                }, 50000)
            } else {
                console.log('开启滚动')
                this.stopScroll = false;
            }
        })
    }

    liveMessage.prototype.send = function (data) {
        var div = document.createElement('div');
        div.className = 'mobile-live-message-item'
        let str = '';
        if (data instanceof Array) {
            for (let index = 0; index < data.length; index++) {
                const mesItem = data[index];
                let content = mesItem.text;
                if (this.options.format) {
                    content = this.options.format(mesItem);
                }
                str += `<div class="mobile-live-message-item-text">${content}</div>`
            }
        } else if (data instanceof Object) {
            let content = data.text;
            if (this.options.format) {
                content = this.options.format(data)
            } 
            str = `<div class="mobile-live-message-item-text">${content}</div>`
        } else {
            str = `<div class="mobile-live-message-item-text">${data || ''}</div>`
        }
        div.innerHTML = str;
        this.parentElement.appendChild(div);
        if (this.stopScroll) {
            return;
        }
        if (div.scrollIntoView) {
            div.scrollIntoView({
                behavior: 'smooth' 
            });
        } else {
            scrollSmoothTo(div.offsetTop, this.parentElement)
        }
    }

    function scrollSmoothTo (position, parentBox) {
        if (!window.requestAnimationFrame) {
            window.requestAnimationFrame = function(callback, element) {
                return setTimeout(callback, 20);
            };
        }
        var scrollTop = parentBox.scrollTop;
        var step = function () {
            var distance = position - scrollTop - parentBox.offsetHeight / 2;
            scrollTop = scrollTop + distance / 10;
            if (Math.abs(distance) < 5) {
                parentBox.scrollTo(0, position);
            } else {
                parentBox.scrollTo(0, scrollTop);
                requestAnimationFrame(step);
            }
        };
        step();
    };
    if (typeof module !== 'undefined' && module.exports) {
      module.exports = liveMessage;
    };
    if (typeof define === 'function') define(function() { 
      return liveMessage; 
    });
    win.liveMessage = liveMessage;
 })(window, document)