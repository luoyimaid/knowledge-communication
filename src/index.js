import keyboard from './virtualKeyboard/index.js';
import './virtualKeyboard/index.css';

const root = document.getElementById('root')

let pElement = document.createElement('p');
pElement.innerText = 'put something in textarea: '

let textarea = document.createElement('textarea');
textarea.style = 'position: absolute; top: 130; right: 30; width: 300px;';
textarea.className = 'use_keyboard_input'

// 监听DOM元素加载完成事件DOMContentLoaded，然后初始化键盘事件~
window.addEventListener('DOMContentLoaded', function () {
    keyboard.init();
});
root.appendChild(pElement);
root.appendChild(textarea);