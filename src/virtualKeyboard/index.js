// 创建keyboard
const keyboard = {
    // 元素给这里塞
    element: {
        main: null,
        keysContainer: null,
        key: []
    },

    eventHandlers: {
        oninput: null,
        onclose: null
    },

    properties: {
        value: '',
        capslock: false
    },

    // 初始化执行方法，创建元素
    init() {
        // create main element
        this.element.main = document.createElement('div');
        this.element.keysContainer = document.createElement('div');

        // setup main element
        this.element.main.classList.add('keyboard', 'keyboard_hidden');
        this.element.keysContainer.classList.add('keyboard_keys');
        this.element.keysContainer.appendChild(this._createKeys());

        this.element.keys = this.element.keysContainer.querySelectorAll('.keyboard_key');

        // add to DOM
        this.element.main.appendChild(this.element.keysContainer);
        document.body.appendChild(this.element.main);

        // automactically use keyboards in elements with .use_keyboard_input
        document.querySelectorAll('.use_keyboard_input').forEach(element => {
            element.addEventListener('focus', () => {
                this.open(element.value, currentValue => {
                    console.log(currentValue);
                    element.value = currentValue;
                });
            });
        });

    },

    // 创建键盘的button元素，初始化时注入
    _createKeys() {
        const fragment = document.createDocumentFragment();
        const keyLayout = [
            '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'backspace',
            'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p',
            'caps', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'enter',
            'done', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '?', 
            'space'
        ];

        // create html for icon
        const createIconElement = (iconName) => {
            return `<i class="material-icons">${iconName}</i>`
        }

        keyLayout.forEach(key => {
            const keyElement = document.createElement('button');
            const insertLineBreake = ['backspace', 'p', 'enter', '?'].indexOf(key) !== -1;

            // add atribute/class
            keyElement.setAttribute('type', 'button');
            keyElement.classList.add('keyboard_key');

            // 处理特殊键
            switch(key) {
                case 'backspace':
                    keyElement.classList.add('keyboard_key_wide');
                    keyElement.innerHTML = createIconElement('backspaces');
                    keyElement.addEventListener('click', () => {
                        this.properties.value =
                            this.properties.value.toString(0, this.properties.value.length - 1);
                        this._triggerEvent('oninput');
                    });
                    break;
                case 'space':
                    keyElement.classList.add('keyboard_key_extra_wide');
                    keyElement.innerHTML = createIconElement('space_bar');
                    keyElement.addEventListener('click', () => {
                        this.properties.value += ' ';
                        this._triggerEvent('oninput');
                    });
                    break;
                case 'caps':
                    keyElement.classList.add('keyboard_key_wide', 'keyboard_key_activable');
                    keyElement.innerHTML = createIconElement('keyboard_capslock');
                    keyElement.addEventListener('click', () => {
                        this._toggleCapsLock();
                        // if keyboard_key_active exited，delete it，otherwise, add it
                        keyElement.classList.toggle('keyboard_key_active', this.properties.capslock);
                    });
                    break;
                case 'enter':
                    keyElement.classList.add('keyboard_key_wide');
                    keyElement.innerHTML = createIconElement('keyboard_return');
                    keyElement.addEventListener('click', () => {
                        this.properties.value += '\n';
                        this._triggerEvent('oninput');
                    });
                    break;
                case 'done':
                    keyElement.classList.add('keyboard_key_wide', 'keyboard_key_dark');
                    keyElement.innerHTML = createIconElement('check_circle');
                    keyElement.addEventListener('click', () => {
                        this.close();
                        this._triggerEvent('onclose');
                    });
                    break;
                default:
                    keyElement.textContent = key.toLocaleLowerCase();
                    keyElement.addEventListener('click', () => {
                        this.properties.value += this.properties.capslock ? key.toUpperCase() : key.toLocaleLowerCase();
                        this._triggerEvent('oninput');
                    });
                    break;
            }
            fragment.appendChild(keyElement);

            if (insertLineBreake) {
                fragment.appendChild(document.createElement('br'));
            }
        });
        return fragment;
    },

    // oninput & onclose 执行方法
    _triggerEvent(eventName) {
        console.log('event triggered, event name: ' + eventName);
        if (typeof this.eventHandlers[eventName] == 'function') {
            this.eventHandlers[eventName](this.properties.value);
        }
    },

    // 大小写键盘的切换方法
    _toggleCapsLock() {
        console.log('caps lock toggled!');
        this.properties.capslock = !this.properties.capslock;

        for(key of this.element.keys) {
            if(key.childElementCount === 0) {
                key.textContent = this.properties.capslock
                    ? key.textContent.toUpperCase()
                    : key.textContent.toLocaleLowerCase();
            }
        }
    },

    // 打开键盘，在光标聚焦到textarea的时候调用
    open(initialValue, oninput, onclose) {
        this.properties.value = initialValue || '';
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.element.main.classList.remove('keyboard_hidden');
    },

    // 关闭键盘，在点击关闭按钮的时候调用
    close(oninput, onclose) {
        this.properties.value = '';
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.element.main.classList.add('keyboard_hidden')
    }
};

export default keyboard;
