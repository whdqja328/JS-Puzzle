"use strict";
const container = document.querySelector('.image_container');
const startButton = document.querySelector('.game_start');
const gameText = document.querySelector('.game_text');
const playTime = document.querySelector('.play_time');
const cheat = document.querySelector('.cheat')
const tileCount = 16;

let tiles = [];
const dragged = {
    el: null,
    class: null,
    index: null,
}
let isPlaying = false;
let timeInterval = null;
let time = 0;

const checkStatus = ()=>{
    const currentList = [...container.children];
    const unMatchedList = currentList.filter((child, index) => Number(child.getAttribute('data-index')) !== index)
    if(unMatchedList.length === 0){
        gameText.style.display = 'block';
        isPlaying = false;
        clearInterval(timeInterval);
    }
}

// 초기상태
const setGame = () => {
    isPlaying = true;
    time = 0;
    container.innerHTML = '';
    gameText.getElementsByClassName.display = 'none';
    clearInterval(timeInterval);

    timeInterval = setInterval(()=>{
        playTime.innerText = time;
        time++;
    },1000)


    tiles = createImageTiles();
    shuffle(tiles).forEach(tile => container.appendChild(tile))
    setTimeout(() => {
        container.innerHTML = '';
        shuffle(tiles).forEach(tile => container.appendChild(tile))
    }, 5000)
}

// 퍼즐조각 생성
const createImageTiles = () => {
    const tempArray = [];
    Array(tileCount).fill().forEach((_, i) => {
        const li = document.createElement('li');
        li.setAttribute('data-index', i);
        li.setAttribute('draggable', 'true');
        li.classList.add(`list${i}`);
        container.appendChild(li);
        tempArray.push(li);

        cheat.addEventListener('click',()=>{
            li.innerText = `${i+1}`;
        })
    })
    return tempArray;
}

// 셔플
const shuffle = (arr) => {
    let index = arr.length - 1;
    while (index > 0) {
        const randomIndex = Math.floor(Math.random() * (index + 1));
        [arr[index], arr[randomIndex]] = [arr[randomIndex], arr[index]]
        index--;
    }
    return arr;
}

// 이벤트
container.addEventListener('dragstart', e => {
    if(!isPlaying) return;
    const obj = e.target;
    dragged.el = obj;
    dragged.class = obj.className;
    dragged.index = [...obj.parentNode.children].indexOf(obj);
})

container.addEventListener('dragover', e => {
    e.preventDefault();
})

container.addEventListener('drop', e => {
    const obj = e.target;
    if (obj.className !== dragged.class) {
        let originPlace;
        let isLast = false;

        if (dragged.el.nextSibling) {
            originPlace = dragged.el.nextSibling;
        } else {
            originPlace = dragged.el.previousSibling;
            isLast = true;
        }
        const droppedIndex = [...obj.parentNode.children].indexOf(obj);
        dragged.index > droppedIndex ? obj.before(dragged.el) : obj.after(dragged.el)
        isLast ? originPlace.after(obj) : originPlace.before(obj)
    }
    checkStatus();
})

startButton.addEventListener('click',()=>{
    setGame();
})


