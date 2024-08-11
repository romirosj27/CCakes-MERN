// Fireworks and confetti effects using external libraries
function startConfetti() {
    (function frame() {
        confetti({
            particleCount: 5,
            angle: 60,
            spread: 55,
            origin: { x: 0 }
        });
        confetti({
            particleCount: 5,
            angle: 120,
            spread: 55,
            origin: { x: 1 }
        });

        if (!candlesBlownOut) {
            requestAnimationFrame(frame);
        }
    })();
}

function startFireworks() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    fireworksArray.forEach((firework, index) => firework.update(index));
    fireworksArray.forEach(firework => firework.draw());
    particles = particles.filter(particle => particle.alpha > 0);
    particles.forEach(particle => particle.update());
    particles.forEach(particle => particle.draw());

    if (random(0, 100) < 2 && !candlesBlownOut) {
        let x = random(canvas.width * 0.1, canvas.width * 0.9);
        fireworksArray.push(new Firework(x, canvas.height));
    }
    const stopFireworks = setInterval(() => {
        if (candlesBlownOut) {
            clearInterval(stopFireworks);
        }
    }, 100);
}

function createBalloons() {
    const balloonsContainer = document.querySelector('.balloons');
    for (let i = 0; i < 10; i++) {
        const balloon = document.createElement('div');
        balloon.className = 'balloon';
        balloon.style.left = `${Math.random() * 80}%`;
        balloon.style.animationDelay = `${Math.random() * 5}s`;

        // Add event listener for popping the balloon
        balloon.addEventListener('click', () => {
            console.log('Balloon clicked'); // Debugging line
            balloon.classList.add('popped');
        });
        
        balloonsContainer.appendChild(balloon);
    }
    const stopBalloons = setInterval(() => {
        if (candlesBlownOut) {
            balloonsContainer.innerHTML = '';
            clearInterval(stopBalloons);
        }
    }, 100);
}

let candlesBlownOut = false;

function createCandles() {
    const candlesContainer = document.querySelector('.candles');
    const numCandles = 4; // Or dynamically set the number of candles as needed
    for (let i = 0; i < numCandles; i++) {
        const candle = document.createElement('div');
        candle.className = 'candle';
        const candleImage = document.createElement('img');
        candleImage.src = "candle 4.png"; // Path to the candle image
        candleImage.alt = "Candle";
        
        const flame = document.createElement('div');
        flame.className = 'flame';

        candle.appendChild(flame);
        candle.appendChild(candleImage);
        candlesContainer.appendChild(candle);
    }
}

function startBlowing() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const microphone = audioContext.createMediaStreamSource(stream);
            const analyser = audioContext.createAnalyser();
            microphone.connect(analyser);
            analyser.fftSize = 256;
            const bufferLength = analyser.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);

            const blowCandles = () => {
                analyser.getByteFrequencyData(dataArray);
                const averageVolume = dataArray.reduce((a, b) => a + b, 0) / bufferLength;
                
                if (averageVolume > 50) {
                    const flames = document.querySelectorAll('.flame');
                    flames.forEach(flame => {
                        flame.style.display = 'none';
                        const smoke = document.createElement('div');
                        smoke.className = 'smoke';
                        flame.parentElement.appendChild(smoke);
                    });
                    candlesBlownOut = true;
                    stream.getTracks().forEach(track => track.stop());

                    // Delay hiding the popup and canvas to allow the smoke effect to appear
                    setTimeout(() => {
                        document.getElementById('cake-popup').style.display = 'none';
                        document.getElementById('mainCanvas').style.display = 'none';
                    }, 3000); // Adjust the delay (in milliseconds) as needed
                } else {
                    requestAnimationFrame(blowCandles);
                }
            };

            blowCandles();
        });
    }
}

function autoBlowOutCandles() {
    const flames = document.querySelectorAll('.flame');
    flames.forEach(flame => {
        flame.style.display = 'none';
        const smoke = document.createElement('div');
        smoke.className = 'smoke';
        flame.parentElement.appendChild(smoke);
    });
    candlesBlownOut = true;

    // Delay hiding the popup and canvas to allow the smoke effect to appear
    setTimeout(() => {
        document.getElementById('cake-popup').style.display = 'none';
        document.getElementById('mainCanvas').style.display = 'none';
    }, 3000); // Adjust the delay (in milliseconds) as needed
}

window.onload = () => {
    startConfetti();
    loop();
    startFireworks();
    createBalloons();
    createCandles();
};

var canvas = document.querySelector('#mainCanvas');
var ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var fireworksArray = [];
var particles = [];

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

class Firework {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.isBlown = false;
        this.radius = 2;
        this.color = `hsl(${random(0, 360)}, 100%, 60%)`;
        this.velocity = {
            x: Math.sin(random(-10, 10) * Math.PI / 180) * 2,
            y: random(-22, -18)
        };
        this.maxHeight = random(canvas.height * 0.2, canvas.height * 0.4);
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update(index) {
        if (!this.isBlown) {
            this.x += this.velocity.x;
            this.y += this.velocity.y;
            this.velocity.y += 0.3;
        }

        if (this.y <= this.maxHeight) {
            this.isBlown = true;
            this.burst();
            fireworksArray.splice(index, 1);
        }
    }

    burst() {
        let count = 70;
        for (let i = 0; i < count; i++) {
            let angle = Math.random() * Math.PI * 2;
            let speed = random(3, 5);
            particles.push(new Particle(this.x, this.y, angle, speed, this.color));
        }
    }
}

class Particle {
    constructor(x, y, angle, speed, color) {
        this.x = x;
        this.y = y;
        this.radius = random(1, 3);
        this.color = color;
        this.velocity = {
            x: Math.cos(angle) * speed,
            y: Math.sin(angle) * speed
        };
        this.alpha = 1;
        this.friction = 0.98;
        this.gravity = 0.04;
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
    }

    update() {
        this.velocity.x *= this.friction;
        this.velocity.y *= this.friction;
        this.velocity.y += this.gravity;
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.alpha -= 0.01;
    }
}

function loop() {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    fireworksArray.forEach((firework, index) => firework.update(index));
    fireworksArray.forEach(firework => firework.draw());
    particles = particles.filter(particle => particle.alpha > 0);
    particles.forEach(particle => particle.update());
    particles.forEach(particle => particle.draw());

    if (random(0, 100) < 2 && !candlesBlownOut) {
        let x = random(canvas.width * 0.1, canvas.width * 0.9);
        fireworksArray.push(new Firework(x, canvas.height));
    }
    requestAnimationFrame(loop);
}
