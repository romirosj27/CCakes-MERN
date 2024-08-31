import React, { useEffect, useRef } from 'react';
import './styles.css';
import confetti from 'canvas-confetti';
import cakePic from './picture cake.png'; 
import candlePic from './candle 4.png';

function Birthday() {
  const canvasRef = useRef(null);
  const balloonsRef = useRef(null);
  const candlesRef = useRef(null);
  let candlesBlownOut = useRef(false); // Using useRef to maintain state across re-renders
  let audioStream = useRef(null); // Ref to hold the audio stream

  useEffect(() => {
    // Setup canvas for fireworks
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let fireworksArray = [];
    let particles = [];

    const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

    class Firework {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.isBlown = false;
        this.radius = 2;
        this.color = `hsl(${random(0, 360)}, 100%, 60%)`;
        this.velocity = {
          x: Math.sin(random(-10, 10) * Math.PI / 180) * 2,
          y: random(-22, -18),
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
          y: Math.sin(angle) * speed,
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

    const loop = () => {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      fireworksArray.forEach((firework, index) => firework.update(index));
      fireworksArray.forEach(firework => firework.draw());
      particles = particles.filter(particle => particle.alpha > 0);
      particles.forEach(particle => particle.update());
      particles.forEach(particle => particle.draw());

      if (random(0, 100) < 2 && !candlesBlownOut.current) {
        let x = random(canvas.width * 0.1, canvas.width * 0.9);
        fireworksArray.push(new Firework(x, canvas.height));
      }
      if (!candlesBlownOut.current) {
        requestAnimationFrame(loop);
      }
    };

    const startConfetti = () => {
      (function frame() {
        if (!candlesBlownOut.current) {
          confetti({
            particleCount: 5,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
          });
          confetti({
            particleCount: 5,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
          });
          requestAnimationFrame(frame);
        }
      })();
    };

    const createBalloons = () => {
      const balloonsContainer = balloonsRef.current;
      for (let i = 0; i < 10; i++) {
        const balloon = document.createElement('div');
        balloon.className = 'balloon';
        balloon.style.left = `${Math.random() * 80}%`;
        balloon.style.animationDelay = `${Math.random() * 5}s`;

        balloon.addEventListener('click', () => {
          balloon.classList.add('popped');
        });

        balloonsContainer.appendChild(balloon);
      }
    };

    const createCandles = () => {
      const candlesContainer = candlesRef.current;
      const numCandles = 4; 
      for (let i = 0; i < numCandles; i++) {
        const candle = document.createElement('div');
        candle.className = 'candle';

        const candleImage = document.createElement('img');
        candleImage.src = candlePic; // Correctly set the image source
        candleImage.alt = "Candle";

        const flame = document.createElement('div');
        flame.className = 'flame';

        candle.appendChild(flame);
        candle.appendChild(candleImage);
        candlesContainer.appendChild(candle);
      }
    };

    const startFireworks = () => {
      loop();
    };

    window.onload = () => {
      startConfetti();
      startFireworks();
      createBalloons();
      createCandles();
    };

  }, []);

  const startBlowing = () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
        audioStream.current = stream; // Save the stream to the ref
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
            stopAllAnimations();
          } else {
            requestAnimationFrame(blowCandles);
          }
        };
        blowCandles();
      });
    }
  };

  const stopAllAnimations = () => {
    // Hide flames and add smoke
    const flames = document.querySelectorAll('.flame');
    flames.forEach(flame => {
      flame.style.display = 'none';
      const smoke = document.createElement('div');
      smoke.className = 'smoke';
      flame.parentElement.appendChild(smoke);
    });

    // Stop confetti and fireworks
    candlesBlownOut.current = true;

    // Stop balloons
    const balloonsContainer = balloonsRef.current;
    if (balloonsContainer) {
      balloonsContainer.innerHTML = ''; // Clear the balloons
    }

    // Stop listening to the microphone
    if (audioStream.current) {
      audioStream.current.getTracks().forEach(track => track.stop());
      audioStream.current = null; // Clear the stream reference
    }

    // Hide cake popup and canvas after a delay
    setTimeout(() => {
      document.getElementById('cake-popup').style.display = 'none';
      document.getElementById('mainCanvas').style.display = 'none';
    }, 3000);
  };

  return (
    <div>
      <div className="confetti"></div>
      <div ref={balloonsRef} className="balloons"></div>
      <canvas ref={canvasRef} id="mainCanvas"></canvas>

      <div id="cake-popup" className="popup">
        <div className="cake">
          <img src={cakePic} alt="Cake" className="cake-img" />
          <div ref={candlesRef} className="candles">
            {/* Candles will be dynamically added here */}
          </div>
        </div>
        <button onClick={startBlowing}>Blow Out Candles</button>
      </div>

      <section className="birthday-letter">
        <h1>Happy Birthday!</h1>
        <p>Dear Mum,</p>
        <p>Happy Birthday to the most incredible and loving mother in the world! On this special day, I want you to know just how much you mean to me. Your love, kindness, and strength have shaped me into who I am today, and I am endlessly grateful for everything you do.

This year, I wanted to do something extra special for you. I’ve created a website to showcase all the wonderful cakes you’ve made over the years. Your talent and creativity have brought so much joy to everyone, and now the world can see just how extraordinary your cakes truly are. Each one tells a story of your love and dedication, and I’m so proud to share your beautiful work.

I hope this website brings a smile to your face and shows you just how much your hard work and passion are appreciated. You are an inspiration, and I am so lucky to have you as my mum.

Wishing you a birthday filled with love, happiness, and all the cake you can enjoy! Here’s to many more years of baking brilliance and cherished memories.</p>
      </section>
    </div>
  );
}

export default Birthday;
