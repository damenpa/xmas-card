// Configuration
const TOTAL_CLICKS_REQUIRED = 20;
let clickCount = 0;
let isOpened = false;

// Initialize the scene
function init() {
    createStars();
    createSnowflakes();
    setupGiftBox();
}

// Create twinkling stars
function createStars() {
    const starsContainer = document.getElementById('starsContainer');
    const starCount = 100;

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';

        // Random position
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 70 + '%';

        // Random size
        const size = Math.random() * 3 + 1;
        star.style.width = size + 'px';
        star.style.height = size + 'px';

        // Random animation delay
        star.style.animationDelay = Math.random() * 3 + 's';
        star.style.animationDuration = (Math.random() * 2 + 2) + 's';

        starsContainer.appendChild(star);
    }
}

// Create falling snowflakes
function createSnowflakes() {
    const snowContainer = document.getElementById('snowContainer');
    const snowflakeCount = 50;

    for (let i = 0; i < snowflakeCount; i++) {
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        snowflake.textContent = '❄';

        // Random position
        snowflake.style.left = Math.random() * 100 + '%';

        // Random size
        const size = Math.random() * 0.5 + 0.5;
        snowflake.style.fontSize = size + 'em';

        // Random animation duration and delay
        snowflake.style.animationDuration = (Math.random() * 3 + 5) + 's';
        snowflake.style.animationDelay = Math.random() * 5 + 's';

        snowContainer.appendChild(snowflake);
    }
}

// Setup gift box interaction
function setupGiftBox() {
    const giftBox = document.getElementById('giftBox');
    const clickCounter = document.getElementById('clickCounter');
    const clicksRemaining = document.getElementById('clicksRemaining');

    giftBox.addEventListener('click', function () {
        if (isOpened) return;

        clickCount++;
        const remaining = TOTAL_CLICKS_REQUIRED - clickCount;
        clicksRemaining.textContent = remaining;

        // Add shake animation
        giftBox.classList.add('shake');
        setTimeout(() => giftBox.classList.remove('shake'), 300);

        // Update counter text
        if (remaining === 1) {
            clickCounter.innerHTML = '<span id="clicksRemaining">1</span> more click!';
        } else if (remaining > 0) {
            clickCounter.innerHTML = '<span id="clicksRemaining">' + remaining + '</span> clicks to open!';
        }

        // Check if ready to open
        if (clickCount >= TOTAL_CLICKS_REQUIRED) {
            openGift();
        }
    });
}

// Open the gift and show fireworks
function openGift() {
    isOpened = true;
    const boxLid = document.getElementById('boxLid');
    const giftBox = document.getElementById('giftBox');
    const clickCounter = document.getElementById('clickCounter');
    const message = document.getElementById('message');

    // Hide counter
    clickCounter.style.opacity = '0';

    // Open the lid
    boxLid.classList.add('opening');

    // Start fireworks after a short delay
    setTimeout(() => {
        launchFireworks();

        // Hide gift box
        giftBox.style.transition = 'opacity 0.5s ease';
        giftBox.style.opacity = '0';

        // Show message
        setTimeout(() => {
            message.classList.add('show');
        }, 500);
    }, 500);
}

// Launch fireworks
function launchFireworks() {
    const fireworksContainer = document.getElementById('fireworksContainer');
    // Festive Christmas Colors: Red, Green, Gold, Silver, White
    const colors = ['#ff0000', '#00ff00', '#ffd700', '#c0c0c0', '#ffffff', '#ff1493'];

    // Launch multiple waves of fireworks
    for (let wave = 0; wave < 8; wave++) {
        setTimeout(() => {
            // Random number of rockets per wave
            const rockets = Math.floor(Math.random() * 3) + 2;
            for (let i = 0; i < rockets; i++) {
                setTimeout(() => {
                    createFirework(fireworksContainer, colors);
                }, i * 200);
            }
        }, wave * 800);
    }
}

// Create a single firework
function createFirework(container, colors) {
    const color = colors[Math.floor(Math.random() * colors.length)];
    const startX = Math.random() * window.innerWidth;
    const startY = window.innerHeight;
    const endY = Math.random() * (window.innerHeight * 0.3) + (window.innerHeight * 0.2);

    // Create rocket
    const rocket = document.createElement('div');
    rocket.style.position = 'absolute';
    rocket.style.left = startX + 'px';
    rocket.style.top = startY + 'px';
    rocket.style.width = '3px';
    rocket.style.height = '3px';
    rocket.style.background = color;
    rocket.style.borderRadius = '50%';
    rocket.style.transition = 'top 0.8s ease-out';
    container.appendChild(rocket);

    // Launch rocket
    setTimeout(() => {
        rocket.style.top = endY + 'px';
    }, 10);

    // Explode
    setTimeout(() => {
        rocket.remove();
        createExplosion(container, startX, endY, color);
    }, 800);
}

// Create explosion effect
function createExplosion(container, x, y, color) {
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'firework';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.background = color;
        particle.style.boxShadow = `0 0 10px ${color}`;

        // Random direction
        const angle = (Math.PI * 2 * i) / particleCount;
        const velocity = Math.random() * 100 + 50;
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity;

        particle.style.setProperty('--tx', tx + 'px');
        particle.style.setProperty('--ty', ty + 'px');

        container.appendChild(particle);

        // Remove particle after animation
        setTimeout(() => {
            particle.remove();
        }, 1000);
    }

    // Add sound effect (visual feedback)
    createFlash(container, x, y, color);
}

// Create flash effect for explosion
function createFlash(container, x, y, color) {
    const flash = document.createElement('div');
    flash.style.position = 'absolute';
    flash.style.left = x + 'px';
    flash.style.top = y + 'px';
    flash.style.width = '100px';
    flash.style.height = '100px';
    flash.style.background = color;
    flash.style.borderRadius = '50%';
    flash.style.transform = 'translate(-50%, -50%)';
    flash.style.opacity = '0.8';
    flash.style.filter = 'blur(20px)';
    flash.style.transition = 'all 0.5s ease-out';
    flash.style.pointerEvents = 'none';

    container.appendChild(flash);

    setTimeout(() => {
        flash.style.opacity = '0';
        flash.style.transform = 'translate(-50%, -50%) scale(2)';
    }, 10);

    setTimeout(() => {
        flash.remove();
    }, 500);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init);
