// const form=document.getElementById('form');
// form.addEventListener('submit', function(event) {
//     event.preventDefault();  
   
//      window.location.href = "1.html";
// });


const form = document.getElementById('form');
form.addEventListener('submit', function(event) {
    event.preventDefault();

    // מקבל את האובייקט של הרשימה הנפתחת
    const difficultySelect = document.getElementById('rama');

    // מקבל את הערך שנבחר (1, 2 או 3)
    const selectedValue = difficultySelect.value;
    
    // בודק את הערך שנבחר ומפנה לקובץ המתאים
    if (selectedValue === '1') {
        window.location.href = "1.html";
    } else if (selectedValue === '2') {
        window.location.href = "med.html";
    } else if (selectedValue === '3') {
        window.location.href = "hard.html";
    }
});