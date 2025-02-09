let progress = 0;

function checkAnswers() {
    var q1 = document.querySelector('input[name="q1"]:checked');
    var q2 = document.querySelector('input[name="q2"]:checked');
    var q3 = document.querySelector('input[name="q3"]:checked');

    if (!q1 || !q2 || !q3) {
        alert("Por favor, responda todas as perguntas!");
        return;
    }

    var correctQ1 = "09/12/2024";  
    var correctQ2 = "Mor";  
    var correctQ3 = "pracinha";  

    if (q1.value === correctQ1) {
        document.getElementById("text1").style.display = "block";
        updateHeart(33);
    }

    if (q2.value === correctQ2) {
        document.getElementById("text2").style.display = "block";
        updateHeart(66);
    }

    if (q3.value === correctQ3) {
        document.getElementById("text3").style.display = "block";
        updateHeart(100);
    }

    if (progress === 100) {
        explodeHeart();
    }
}

function updateHeart(value) {
    if (progress < value) {
        progress = value;
        document.getElementById("progress").innerText = progress + "%";
    }
}

function explodeHeart() {
    document.getElementById("heart").classList.add("full");
    setTimeout(() => {
        document.getElementById("heart").style.display = "none";
        document.getElementById("progress").style.display = "none";
        document.getElementById("finalMessage").style.display = "block";
        document.getElementById("loveSong").play();
    }, 500);
}

document.addEventListener("DOMContentLoaded", function () {
    const questions = document.querySelectorAll(".question");
    const progressBar = document.querySelector(".progress-bar");
    const heart = document.querySelector(".heart-container");
    const finalMessage = document.getElementById("finalMessage");
    let correctAnswers = 0;
    const totalQuestions = document.querySelectorAll("input[data-correct='true']").length;
    
    function updateProgress() {
        let progress = (correctAnswers / totalQuestions) * 100;
        progressBar.style.width = progress + "%";
        
        if (progress === 100) {
            heart.style.animation = "explode 1s forwards";
            setTimeout(() => {
                finalMessage.style.display = "block";
                playMusic();
            }, 1000);
        }
    }
    
    function playMusic() {
        let audio = new Audio("https://ia903106.us.archive.org/7/items/edsheeranphotographofficialmusicvideo_201912/Ed%20Sheeran%20-%20Photograph%20%28Official%20Music%20Video%29.mp3"); // Adicione o arquivo de música adequado
        audio.play();
    }
    
    document.querySelectorAll("input[type=radio]").forEach((input) => {
        input.addEventListener("change", function () {
            if (this.dataset.correct === "true" && !this.classList.contains("answered")) {
                correctAnswers++;
                this.classList.add("answered");
                updateProgress();
            }
        });
    });
});