let audioContext;
let audioBuffer;
let bgAudio;

// Load and setup audio
async function initAudio() {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    try {
        const response = await fetch('public/drip.mp3');
        const arrayBuffer = await response.arrayBuffer();
        audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    } catch (error) {
        console.error('Error loading audio:', error);
    }
}

function playDripSound() {
    if (!audioContext || !audioBuffer) return;

    const source = audioContext.createBufferSource();
    source.buffer = audioBuffer;

    const randomPitch = 0.5 + Math.random();
    source.playbackRate.value = randomPitch;

    source.connect(audioContext.destination);
    source.start(0);
}

function scheduleNextDrip() {
    const delay = Math.random() * 40000 + 10000;
    setTimeout(() => {
        playDripSound();
        scheduleNextDrip();
    }, delay);
}

function initBackgroundMusic() {
    bgAudio = document.getElementById('bgAudio');
    if (bgAudio) {
        bgAudio.volume = 0.3; // Set background music volume
    }
}

export { initAudio, scheduleNextDrip, initBackgroundMusic };