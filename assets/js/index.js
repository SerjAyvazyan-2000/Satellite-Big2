const burger = document.querySelector('.burger');
const menu = document.querySelector('.menu');
const header = document.querySelector('.header');
const menuBg = document.querySelector('.menu-bg');
const headerBody = document.querySelector('.header-body');



document.addEventListener('DOMContentLoaded', function () {
    burger.addEventListener("click", function (e) {
        if (menu.classList.contains('active')) {
            closeMenu();
        } else {
            openMenu();
        }
    });
    menuBg.addEventListener("click", function (e) {
        if (menu.classList.contains('active')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    function openMenu() {
        menu.classList.add('active');
        burger.classList.add('active');
        header.classList.add('active');
        menuBg.classList.add('active');
        headerBody.classList.add('active');


    }

    function closeMenu() {
        menu.classList.remove('active');
        burger.classList.remove('active');
        header.classList.remove('active');
        menuBg.classList.remove('active');
        headerBody.classList.remove('active');

    }


});

window.addEventListener('scroll', function() {
    const headerTop = document.querySelector('.header')


    if (window.scrollY > 0) {
        headerTop.classList.add('moved');

    } else {
        headerTop.classList.remove('moved');

    }
});





document.addEventListener("DOMContentLoaded", function () {
    const button = document.querySelector('.reviews-btn');
    const reviewsList = document.querySelector('.reviews-list');

    button.addEventListener('click', function() {
        reviewsList.classList.toggle('active');
    });
});



function toggleActiveState(item) {
    const allItems = document.querySelectorAll('.often-asks-item');

    allItems.forEach(otherItem => {
        if (otherItem !== item) {
            otherItem.classList.remove('active');
        }
    });

    item.classList.toggle('active');
}

document.querySelectorAll('.often-asks-item').forEach(item => {
    item.addEventListener('click', () => toggleActiveState(item));
    const icon = item.querySelector('.asks-list-icon');
    icon.addEventListener('click', (event) => {
        event.stopPropagation();
        toggleActiveState(item);
    });
});


document.querySelectorAll('.hero-video-block').forEach(block => {
    const gif = block.getAttribute('data-gif');
    const defaultImage = block.getAttribute('data-img');

    function playGif() {
        if (block) {
            block.style.backgroundImage = `url('${gif}')`;
            block.classList.add('active');
        }

    }

    function endGif() {
        block.classList.remove('active');
        block.style.backgroundImage = `url('${defaultImage}')`;

    }

    block.addEventListener('mouseenter', playGif);
    block.addEventListener('mouseleave', endGif);

});

document.querySelectorAll('.video-block').forEach(block => {
    const gif = block.getAttribute('data-gif');
    const defaultImage = block.getAttribute('data-img');

    function playGif() {
        if (block) {
            block.style.backgroundImage = `url('${gif}')`;
            block.classList.add('active');
        }

    }

    function endGif() {
        block.classList.remove('active');
        block.style.backgroundImage = `url('${defaultImage}')`;

    }

    block.addEventListener('mouseenter', playGif);
    block.addEventListener('mouseleave', endGif);

});



document.addEventListener("DOMContentLoaded", function () {
    const button = document.querySelector('.reviews-btn');
    const reviewsList = document.querySelector('.reviews-list');

    button.addEventListener('click', function() {
        reviewsList.classList.toggle('active');
    });
});


document.addEventListener("DOMContentLoaded", () => {
    const button = document.querySelector(".reviews-btn");
    const row2 = document.querySelectorAll(".reviews-row-2");
    const row3 = document.querySelectorAll(".reviews-row-3");
    let clickCount = 0;

    button.addEventListener("click", () => {
        clickCount++;

        if (clickCount === 1) {
            row2.forEach(row => row.classList.add("active"));
        } else if (clickCount === 2) {
            row3.forEach(row => row.classList.add("active"));
            button.classList.add("active");
            button.querySelector("span").textContent = "Свернуть";
        } else {

            row2.forEach(row => row.classList.remove("active"));
            row3.forEach(row => row.classList.remove("active"));
            button.classList.remove("active");
            button.querySelector("span").textContent = "Показать еще";
            clickCount = 0;
        }
    });
});



const canvas = document.getElementById("wave");
const ctx = canvas.getContext("2d");

// Resize canvas to fill the container
function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
}
resizeCanvas();
if(window.innerWidth > 768){
    window.addEventListener("resize", resizeCanvas);

}

// Line settings
const lineCount = 50; // Number of lines
const lineSpacing = 15; // Space between lines
const lineWidth = 2; // Width of each line
const maxAmplitude = 150; // Maximum deviation for the central line

// Animation variables
let offsets = Array(lineCount).fill(0).map(() => Math.random() * Math.PI * 2);
const speed = 0.05; // Speed of movement

function drawGradientLine() {
    const gradient = ctx.createLinearGradient(0, canvas.height / 2, canvas.width, canvas.height / 2);
    gradient.addColorStop(0, "rgba(255, 255, 255, 0.3)"); // Semi-transparent white
    gradient.addColorStop(0.5, "rgba(255, 255, 255, 1)"); // Full white in the center
    gradient.addColorStop(1, "rgba(255, 255, 255, 0.3)"); // Semi-transparent white

    ctx.beginPath();
    ctx.moveTo(0, canvas.height / 2);
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 2; // Adjust width for visibility
    ctx.stroke();
}

function drawLines() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawGradientLine(); // Draw the static gradient line

    const centerY = canvas.height / 2;
    const centerX = canvas.width / 2;

    for (let i = 0; i < lineCount; i++) {
        const x = i * lineSpacing + (canvas.width / 2 - (lineCount * lineSpacing) / 2);
        const distanceFromCenter = Math.abs(centerX - x);
        const normalizedDistance = 1 - distanceFromCenter / centerX; // 1 near center, 0 near edges
        const lineAmplitude = maxAmplitude * normalizedDistance; // Scale height based on distance
        const offset = offsets[i];
        const deviation = Math.sin(offset) * lineAmplitude;

        const alpha = Math.abs(deviation) / maxAmplitude; // Alpha based on deviation

        const gradient = ctx.createLinearGradient(x, centerY, x, centerY + deviation);
        gradient.addColorStop(0, `rgba(255, 255, 255, 1)`); // Solid white at the center
        gradient.addColorStop(1, `rgba(255, 255, 255, ${0.3 + 0.7 * alpha})`); // Adjusted transparency

        ctx.beginPath();
        ctx.moveTo(x, centerY);
        ctx.lineTo(x, centerY + deviation);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = lineWidth;
        ctx.stroke();
    }
}

function animate() {
    offsets = offsets.map(offset => offset + speed);
    drawLines();
    requestAnimationFrame(animate);
}

animate();
