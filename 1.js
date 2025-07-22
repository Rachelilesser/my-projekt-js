const cardData = [
    { name: 'אריה', image: 'img/אריה.jpg', sound: 'sounds/שאגת אריה Roaring lion [SyP16bkB9ZM] (2).mp3' },
    { name: 'ברווז', image: 'img/ברוז.jpg', sound: 'sounds/ברווז.wav' },
    { name: 'יונה', image: 'img/יונה.jpg', sound: 'sounds/ציפור.mp3' },
    { name: 'כבשה', image: 'img/כבשששה.jpg', sound: 'sounds/כבשה.mp3' },
    { name: 'כלבלב', image: 'img/כלבלב.jpg', sound: 'sounds/1כלב נובח.mp3' },
    { name: 'סוס', image: 'img/סוס.jpg', sound: 'sounds/סוס.wav' },
    { name: 'פרה', image: 'img/פרה.jpg', sound: 'sounds/פרה.wav' },
    { name: 'תרנגולת', image: 'img/תרנגולת.jpg', sound: 'sounds/1תרנגול.mp3' }
];

// יצירת מערך של 16 אובייקטים (זוגות)
const gameCards = [...cardData, ...cardData];

const gameBoard = document.getElementById('game-board');
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

// פונקציית הערבוב
function mix(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}

// שינוי 2: עדכון פונקציית יצירת הלוח
function createBoard() {
    mix(gameCards).forEach(cardInfo => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.name = cardInfo.name; // שומר את השם כדי לבדוק התאמה
        card.dataset.sound = cardInfo.sound; // שומר את נתיב הצליל

        const cardInner = document.createElement('div');
        cardInner.classList.add('card-inner');

        const cardFront = document.createElement('div');
        cardFront.classList.add('card-front');
        cardFront.style.backgroundImage = `url(${cardInfo.image})`;

        const cardBack = document.createElement('div');
        cardBack.classList.add('card-back');

        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        card.appendChild(cardInner);
        gameBoard.appendChild(card);

        card.addEventListener('click', flipCard);
    });
}

// שינוי 3: עדכון פונקציית flipCard להשמעת הצליל
function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.querySelector('.card-inner').classList.add('is-flipped');

    // השמעת צליל הקלף הנוכחי
    const soundPath = this.dataset.sound;
    const soundEffect = new Audio(soundPath);
    soundEffect.play();

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    lockBoard = true;

    checkForMatch();
}

function checkForMatch() {
    // בודק אם השם של הקלפים תואם
    const isMatch = firstCard.dataset.name === secondCard.dataset.name;
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

function unflipCards() {
    setTimeout(() => {
        firstCard.querySelector('.card-inner').classList.remove('is-flipped');
        secondCard.querySelector('.card-inner').classList.remove('is-flipped');
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}
// שינוי 4: הוספת כפתור איפוס המשחק
document.getElementById('reset-button').addEventListener('click', () => {
    // שלב 1: איפוס הטיימר הקיים
    clearInterval(r); // עוצר את הטיימר הנוכחי מלהמשיך לרוץ

    // שלב 2: איפוס הלוח והניקוד
    gameBoard.innerHTML = ''; // מנקה את הלוח
    score = 0; // מאפס את הניקוד
    document.getElementById('score').innerText = 'ניקוד: 0'; // מאפס את תצוגת הניקוד
    
    // שלב 3: איפוס משתני הטיימר
    sec = 1111; // מאפס את המונה
    pel.innerHTML = sec; // מעדכן את התצוגה למספר ההתחלתי
    
    // שלב 4: יצירה והתחלה מחדש של הלוח והטיימר
    createBoard(); // יוצר לוח חדש
    timmer(); // מפעיל מחדש את הטיימר
});
// שינוי 5: הוספת ניקוד
let score = 0;
function updateScore() {
    score += 10; // כל התאמה מוסיפה 10 נקודות
    document.getElementById('score').innerText = ` ניקוד: ${score}`;
}
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    updateScore(); // עדכון הניקוד
    resetBoard();
}
const pel = document.getElementById("el")
let r
let sec = 1111
function timmer() {
    r = setInterval(() => {
        sec--;
        pel.innerHTML = sec
        if (sec <= 0) {
            clearInterval(r)
            document.body.innerHTML = "";
            alert(`    נגמר לך הזמן נסה להכנס שנית. וצברת עד כה ${score} נקודות`);

        }
        function updateScore() {
    score += 10;
    document.getElementById('score').innerText = `ניקוד: ${score}`;
}
        if (score == 80) {
            clearInterval(r);
            alert("ואאוו ניצחת אין עליך")
            
        }

    }, 150);
}
document.addEventListener('DOMContentLoaded', () => {
    createBoard(); // יצירת הלוח עם הקלפים
    timmer(); // התחלת הטיימר
});
// אירוע keydown: איפוס המשחק באמצעות המקש 'R'
document.addEventListener('keydown', (event) => {
    // בודק אם המקש שנלחץ הוא 'r' (קטנה או גדולה)
    if (event.key.toLowerCase() === 'r') {
        // מפעיל את לוגיקת האיפוס של המשחק
        gameBoard.innerHTML = ''; // מנקה את הלוח
        score = 0; // מאפס את הניקוד
        document.getElementById('score').innerText = 'ניקוד: 0'; // מאפס את תצוגת הניקוד
         sec = 1111; // מאפס את המונה
        pel.innerHTML = sec;
        createBoard(); // יוצר לוח חדש
    }
});
