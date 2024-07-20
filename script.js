
function saveScores() {
    localStorage.setItem('humanScore', yourScore.textContent);
    localStorage.setItem('computerScore', computerScore.textContent);
}


function loadScores() {
    const savedHumanScore = localStorage.getItem('humanScore');
    const savedComputerScore = localStorage.getItem('computerScore');

    if (savedHumanScore !== null) {
        yourScore.textContent = savedHumanScore;
    }
    if (savedComputerScore !== null) {
        computerScore.textContent = savedComputerScore;
    }
}

window.onload = loadScores;

let rulesBtn = document.getElementsByClassName('rules-btn')[0];
let rulesBox = document.getElementsByClassName('rules')[0];
let closeBtn = document.getElementsByClassName('close')[0];
rulesBtn.addEventListener('click', () => {
    if (rulesBox.style.display === 'none' || rulesBox.style.display === '') {
        rulesBox.style.display = 'block';
    }

});
closeBtn.addEventListener('click', () => {
    rulesBox.style.display = 'none';
});
let gameResult = document.getElementById('display');
let imageArray = document.getElementsByClassName('img');
let gameDiv = document.getElementById('game-result-1');
let iframe = document.getElementById('game-iframe');
let tie = document.getElementById('tie');
let win = document.getElementById('win');
let lost = document.getElementById('lost');
let yourScore = document.querySelectorAll('h1')[1];
let computerScore = document.querySelectorAll('h1')[0];
let celebContainer = document.getElementById('celeb-cont');
let score = document.getElementById('score-id');


for (let image of imageArray) {
    image.addEventListener('click', (event) => {
        gameResult.innerHTML = ''; 
        comResult.innerHTML = ''; 

        let displayElement = document.createElement('div');
       
        gameResult.appendChild(displayElement);

        let imgSrc = event.target.src;
        let img1 = document.createElement('img');
        img1.setAttribute('src', imgSrc);
       
        if (imgSrc.includes("fist")) {
            displayElement.classList.add('fist-1');
        }
        else if (imgSrc.includes("hand")) {
            displayElement.classList.add("hand-1");
        }
        else if (imgSrc.includes("scissor")) {
            displayElement.classList.add("scissor-1");
        }
        displayElement.appendChild(img1);

        let comImageSrc = getRandomImage(); 

        let comImage = document.createElement('img');
        comImage.setAttribute('src', comImageSrc);
        comResult.appendChild(comImage);
        if (comImageSrc.includes("fist")) {
            comResult.classList.add('fist-1');
        }
        else if (comImageSrc.includes("hand")) {
            comResult.classList.add("hand-1");
        }
        else if (comImageSrc.includes("scissor")) {
            comResult.classList.add("scissor-1");
        }

        gameDiv.classList.add('hidden');
        iframe.classList.remove('hidden');

        tie.classList.add('hidden');
        win.classList.add('hidden');
        lost.classList.add('hidden');
        let userImageFilename = imgSrc.split('/').pop();
        let comImageFilename = comImageSrc.split('/').pop();

        let existingNextBtn = document.querySelector('.next-btn');
        if (existingNextBtn) {
            existingNextBtn.remove();
        }

        

        if (userImageFilename === comImageFilename) {
            console.log('Result: Tie');
            tie.classList.remove('hidden');
        } else {
           
            if (
                (userImageFilename.includes("fist") && comImageFilename.includes("scissor")) ||
                (userImageFilename.includes("scissor") && comImageFilename.includes("hand")) ||
                (userImageFilename.includes("hand") && comImageFilename.includes("fist"))
            ) {
                console.log('Result: Win');
                win.classList.remove('hidden');
                let rnBtn = document.getElementById('rn-btn');
                let nextBtn = document.createElement('div');
                nextBtn.classList.add('next-btn');
                let contentHead = document.createElement('h2');
                contentHead.innerText = "NEXT";
                rnBtn.appendChild(nextBtn);
                nextBtn.appendChild(contentHead);
                nextBtn.addEventListener('click', () => {
                    score.classList.add('hidden');
                    gameDiv.classList.add('hidden');
                    iframe.classList.add('hidden');
                    celebContainer.classList.add('display-it');
                    nextBtn.classList.add('hidden');
                    

                })

                yourScore.textContent = parseInt(yourScore.textContent) + 1;
                saveScores();
                for(let i = 1; i <= 3; i++){
                    let circleWin = document.createElement('div');
                    circleWin.classList.add('winner-circle-1', `circle-1-${i}`);
                    displayElement.appendChild(circleWin);
                }

            } else {
                console.log('Result: Lost');
                lost.classList.remove('hidden');
                computerScore.textContent = parseInt(computerScore.textContent) + 1;
                saveScores();
                for (let i = 1; i <= 3; i++) {
                    let circle = document.createElement('div');
                    circle.classList.add('winner-circle', `circle-${i}`);
                    comResult.appendChild(circle);
    
                }
            }
          
           

        }

    });
}
function playAgain() {

    gameDiv.classList.remove('hidden');
    iframe.classList.add('hidden');
    comResult.classList.remove('hand-1');
    comResult.classList.remove('scissor-1');
    comResult.classList.remove('fist-1');


}
function playAgainFresh() {
    celebContainer.classList.remove('display-it');
    score.classList.remove('hidden');
    gameDiv.classList.remove('hidden');
}



let comResult = document.getElementById('com-result');
let imageCArray = [
    'image/hand.png',
    'image/scissor.png',
    'image/fist.png'
];

function getRandomImage() {
    let num = Math.floor(Math.random() * 3);
    return imageCArray[num];
}

