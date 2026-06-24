// ==========================================================================
// 🐶 GO-FIND-GOLDIE GAME CORE LOGIC (PHASE 3 - 10 STAGES & SCALING DIFFICULTY)
// ==========================================================================

// Sound Synthesis Module (Web Audio API)
const SoundFX = {
  ctx: null,

  init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  },

  playBark() {
    this.init();
    const playSingleBark = (delay, frequency, duration) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      
      osc.frequency.setValueAtTime(frequency, this.ctx.currentTime + delay);
      osc.frequency.exponentialRampToValueAtTime(frequency * 2.2, this.ctx.currentTime + delay + 0.04);
      osc.frequency.exponentialRampToValueAtTime(frequency * 0.7, this.ctx.currentTime + delay + duration);
      
      gain.gain.setValueAtTime(0.25, this.ctx.currentTime + delay);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + delay + duration);
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      
      osc.start(this.ctx.currentTime + delay);
      osc.stop(this.ctx.currentTime + delay + duration + 0.02);
    };

    playSingleBark(0, 160, 0.16);
    playSingleBark(0.18, 170, 0.14);
  },

  playSuccess() {
    this.init();
    const now = this.ctx.currentTime;
    const notes = [261.63, 329.63, 392.00, 523.25, 659.25]; // Cheerful arpeggio
    
    notes.forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = freq;
      
      gain.gain.setValueAtTime(0, now + i * 0.08);
      gain.gain.linearRampToValueAtTime(0.15, now + i * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.005, now + i * 0.08 + 0.35);
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      
      osc.start(now + i * 0.08);
      osc.stop(now + i * 0.08 + 0.4);
    });
  },

  playError() {
    this.init();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(130, this.ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(80, this.ctx.currentTime + 0.22);
    
    gain.gain.setValueAtTime(0.18, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.22);
    
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc.start();
    osc.stop(this.ctx.currentTime + 0.24);
  },

  playHint() {
    this.init();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(520, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(980, this.ctx.currentTime + 0.25);
    
    gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.25);
    
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc.start();
    osc.stop(this.ctx.currentTime + 0.26);
  },

  playGameOver() {
    this.init();
    const now = this.ctx.currentTime;
    const notes = [349.23, 311.13, 293.66, 220.00];
    
    notes.forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.value = freq;
      
      gain.gain.setValueAtTime(0, now + i * 0.15);
      gain.gain.linearRampToValueAtTime(0.15, now + i * 0.15 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.005, now + i * 0.15 + 0.5);
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      
      osc.start(now + i * 0.15);
      osc.stop(now + i * 0.15 + 0.6);
    });
  }
};

// 10 Stages Configurations with target sizes and time limits scaling (increasing difficulty)
const Stages = [
  {
    id: 1,
    name: "강아지 운동장 🐾",
    bg: "assets/background_playground.png",
    timeLimit: 60,
    positions: [
      { top: 62, left: 18, size: 52, rot: 5 },
      { top: 44, left: 74, size: 48, rot: -10 },
      { top: 78, left: 52, size: 58, rot: 0 },
      { top: 28, left: 38, size: 44, rot: 15 },
      { top: 54, left: 86, size: 50, rot: -5 }
    ]
  },
  {
    id: 2,
    name: "서울 명동 거리 🇰🇷",
    bg: "assets/background_myeongdong.png",
    timeLimit: 55,
    positions: [
      { top: 68, left: 14, size: 48, rot: 0 },
      { top: 46, left: 50, size: 42, rot: 8 },
      { top: 82, left: 70, size: 54, rot: -5 },
      { top: 32, left: 26, size: 38, rot: 12 },
      { top: 58, left: 80, size: 46, rot: -12 }
    ]
  },
  {
    id: 3,
    name: "우주선 조종실 🚀",
    bg: "assets/background_spaceship.png",
    timeLimit: 50,
    positions: [
      { top: 60, left: 44, size: 44, rot: 0 },
      { top: 36, left: 70, size: 40, rot: -8 },
      { top: 74, left: 18, size: 50, rot: 15 },
      { top: 46, left: 12, size: 42, rot: -15 },
      { top: 80, left: 78, size: 48, rot: 5 }
    ]
  },
  {
    id: 4,
    name: "제주 유채꽃밭 🌼",
    bg: "assets/background_jeju.png",
    timeLimit: 45,
    positions: [
      { top: 65, left: 24, size: 42, rot: 5 },
      { top: 48, left: 62, size: 40, rot: -8 },
      { top: 75, left: 80, size: 45, rot: 0 },
      { top: 35, left: 45, size: 38, rot: 12 },
      { top: 55, left: 15, size: 42, rot: -5 }
    ]
  },
  {
    id: 5,
    name: "판타지 중세 성 🏰",
    bg: "assets/background_fantasy.png",
    timeLimit: 40,
    positions: [
      { top: 70, left: 48, size: 40, rot: 0 },
      { top: 38, left: 22, size: 38, rot: -10 },
      { top: 78, left: 82, size: 42, rot: 15 },
      { top: 50, left: 75, size: 38, rot: -5 },
      { top: 80, left: 15, size: 40, rot: 8 }
    ]
  },
  {
    id: 6,
    name: "수중 아틀란티스 🧜‍♂️",
    bg: "assets/background_atlantis.png",
    timeLimit: 38,
    positions: [
      { top: 62, left: 24, size: 38, rot: 5 },
      { top: 45, left: 68, size: 36, rot: -10 },
      { top: 78, left: 80, size: 40, rot: 0 },
      { top: 35, left: 45, size: 34, rot: 15 },
      { top: 55, left: 15, size: 38, rot: -5 }
    ]
  },
  {
    id: 7,
    name: "대한민국 국회 🏛️",
    bg: "assets/background_assembly.png",
    timeLimit: 36,
    positions: [
      { top: 70, left: 48, size: 36, rot: 0 },
      { top: 38, left: 22, size: 34, rot: -10 },
      { top: 78, left: 82, size: 38, rot: 15 },
      { top: 50, left: 75, size: 34, rot: -5 },
      { top: 80, left: 15, size: 36, rot: 8 }
    ]
  },
  {
    id: 8,
    name: "스팀펑크 공중도시 ⚙️",
    bg: "assets/background_steampunk.png",
    timeLimit: 34,
    positions: [
      { top: 60, left: 34, size: 34, rot: 10 },
      { top: 48, left: 72, size: 32, rot: -12 },
      { top: 82, left: 55, size: 36, rot: 0 },
      { top: 25, left: 15, size: 32, rot: 8 },
      { top: 70, left: 88, size: 34, rot: -5 }
    ]
  },
  {
    id: 9,
    name: "할로윈 퍼레이드 🎃",
    bg: "assets/background_halloween.png",
    timeLimit: 32,
    positions: [
      { top: 65, left: 18, size: 32, rot: -5 },
      { top: 52, left: 55, size: 30, rot: 12 },
      { top: 80, left: 74, size: 34, rot: 0 },
      { top: 38, left: 85, size: 30, rot: 10 },
      { top: 72, left: 32, size: 32, rot: -15 }
    ]
  },
  {
    id: 10,
    name: "사이버펑크 서울 2099 🌌",
    bg: "assets/background_cyberpunk.png",
    timeLimit: 30,
    positions: [
      { top: 68, left: 42, size: 30, rot: 5 },
      { top: 42, left: 84, size: 28, rot: -10 },
      { top: 78, left: 18, size: 32, rot: 0 },
      { top: 30, left: 52, size: 28, rot: 15 },
      { top: 85, left: 78, size: 30, rot: -8 }
    ]
  },
  {
    id: 11,
    name: "고대 피라미드 내부 🐪",
    bg: "assets/background_pyramid.png",
    timeLimit: 28,
    positions: [
      { top: 55, left: 30, size: 28, rot: 5 },
      { top: 75, left: 60, size: 26, rot: -8 },
      { top: 40, left: 80, size: 28, rot: 15 },
      { top: 85, left: 20, size: 30, rot: -5 },
      { top: 35, left: 45, size: 26, rot: 10 }
    ]
  },
  {
    id: 12,
    name: "북극의 펭귄 마을 ❄️",
    bg: "assets/background_penguin.png",
    timeLimit: 26,
    positions: [
      { top: 60, left: 20, size: 28, rot: -5 },
      { top: 45, left: 70, size: 26, rot: 12 },
      { top: 80, left: 50, size: 30, rot: 0 },
      { top: 35, left: 30, size: 26, rot: 15 },
      { top: 70, left: 85, size: 28, rot: -10 }
    ]
  },
  {
    id: 13,
    name: "장난감 공장 내부 🧸",
    bg: "assets/background_toyfactory.png",
    timeLimit: 25,
    positions: [
      { top: 50, left: 40, size: 26, rot: 8 },
      { top: 75, left: 25, size: 28, rot: -15 },
      { top: 30, left: 60, size: 26, rot: 5 },
      { top: 85, left: 75, size: 28, rot: -5 },
      { top: 45, left: 85, size: 26, rot: 10 }
    ]
  },
  {
    id: 14,
    name: "쥬라기 정글 🦖",
    bg: "assets/background_jurassic.png",
    timeLimit: 24,
    positions: [
      { top: 65, left: 35, size: 26, rot: -10 },
      { top: 40, left: 20, size: 28, rot: 15 },
      { top: 80, left: 70, size: 26, rot: 0 },
      { top: 35, left: 80, size: 26, rot: -5 },
      { top: 55, left: 55, size: 28, rot: 8 }
    ]
  },
  {
    id: 15,
    name: "마법학교 도서관 📚",
    bg: "assets/background_magiclibrary.png",
    timeLimit: 22,
    positions: [
      { top: 70, left: 50, size: 24, rot: 5 },
      { top: 45, left: 30, size: 26, rot: -12 },
      { top: 85, left: 25, size: 26, rot: 15 },
      { top: 30, left: 70, size: 24, rot: -8 },
      { top: 65, left: 85, size: 26, rot: 10 }
    ]
  },
  {
    id: 16,
    name: "도깨비 야시장 🏮",
    bg: "assets/background_nightmarket.png",
    timeLimit: 20,
    positions: [
      { top: 60, left: 45, size: 24, rot: -5 },
      { top: 35, left: 25, size: 24, rot: 10 },
      { top: 75, left: 80, size: 26, rot: 0 },
      { top: 45, left: 85, size: 24, rot: -15 },
      { top: 85, left: 40, size: 26, rot: 8 }
    ]
  },
  {
    id: 17,
    name: "해적선의 보물창고 🏴‍☠️",
    bg: "assets/background_pirate.png",
    timeLimit: 18,
    positions: [
      { top: 65, left: 20, size: 24, rot: 12 },
      { top: 40, left: 55, size: 24, rot: -8 },
      { top: 80, left: 35, size: 26, rot: 5 },
      { top: 30, left: 75, size: 24, rot: 15 },
      { top: 70, left: 85, size: 24, rot: -10 }
    ]
  },
  {
    id: 18,
    name: "달콤한 과자 마을 🍭",
    bg: "assets/background_candy.png",
    timeLimit: 17,
    positions: [
      { top: 55, left: 30, size: 24, rot: -15 },
      { top: 75, left: 65, size: 24, rot: 10 },
      { top: 35, left: 40, size: 22, rot: -5 },
      { top: 85, left: 20, size: 24, rot: 8 },
      { top: 45, left: 80, size: 22, rot: -12 }
    ]
  },
  {
    id: 19,
    name: "하늘을 나는 경주장 🏎️",
    bg: "assets/background_racetrack.png",
    timeLimit: 16,
    positions: [
      { top: 60, left: 50, size: 22, rot: 5 },
      { top: 40, left: 25, size: 24, rot: -10 },
      { top: 80, left: 75, size: 22, rot: 15 },
      { top: 30, left: 60, size: 22, rot: -8 },
      { top: 70, left: 15, size: 24, rot: 12 }
    ]
  },
  {
    id: 20,
    name: "외계인 우주 파티장 👽",
    bg: "assets/background_alien.png",
    timeLimit: 15,
    positions: [
      { top: 65, left: 40, size: 22, rot: -8 },
      { top: 45, left: 75, size: 22, rot: 12 },
      { top: 85, left: 30, size: 22, rot: 0 },
      { top: 75, left: 85, size: 22, rot: 10 }
    ]
  },
  {
    id: 21,
    name: "사이버 닌자 도장 🥷",
    bg: "assets/background_ninja.png",
    timeLimit: 14,
    positions: [
      { top: 55, left: 35, size: 20, rot: -5 },
      { top: 80, left: 65, size: 20, rot: 12 },
      { top: 40, left: 80, size: 18, rot: 0 },
      { top: 85, left: 25, size: 20, rot: 15 },
      { top: 35, left: 20, size: 18, rot: -10 }
    ]
  },
  {
    id: 22,
    name: "심해 잠수함 🌊",
    bg: "assets/background_submarine.png",
    timeLimit: 14,
    positions: [
      { top: 60, left: 25, size: 20, rot: 8 },
      { top: 45, left: 75, size: 18, rot: -12 },
      { top: 80, left: 50, size: 20, rot: 5 },
      { top: 35, left: 40, size: 18, rot: -5 },
      { top: 75, left: 85, size: 20, rot: 10 }
    ]
  },
  {
    id: 23,
    name: "거대 나무집 정글 🌳",
    bg: "assets/background_treehouse.png",
    timeLimit: 13,
    positions: [
      { top: 50, left: 45, size: 18, rot: -10 },
      { top: 75, left: 30, size: 20, rot: 15 },
      { top: 30, left: 65, size: 18, rot: 0 },
      { top: 85, left: 75, size: 20, rot: -5 },
      { top: 45, left: 85, size: 18, rot: 8 }
    ]
  },
  {
    id: 24,
    name: "초콜릿 폭포 공장 🍫",
    bg: "assets/background_chocolate.png",
    timeLimit: 13,
    positions: [
      { top: 65, left: 30, size: 20, rot: 12 },
      { top: 40, left: 25, size: 18, rot: -8 },
      { top: 80, left: 70, size: 20, rot: 5 },
      { top: 35, left: 80, size: 18, rot: 15 },
      { top: 55, left: 60, size: 20, rot: -10 }
    ]
  },
  {
    id: 25,
    name: "구름 위 성곽 ☁️",
    bg: "assets/background_cloud.png",
    timeLimit: 12,
    positions: [
      { top: 70, left: 55, size: 18, rot: -5 },
      { top: 45, left: 35, size: 20, rot: 10 },
      { top: 85, left: 30, size: 18, rot: 0 },
      { top: 30, left: 75, size: 18, rot: -15 },
      { top: 65, left: 85, size: 20, rot: 8 }
    ]
  },
  {
    id: 26,
    name: "거대로봇 고철장 🤖",
    bg: "assets/background_junkyard.png",
    timeLimit: 12,
    positions: [
      { top: 60, left: 40, size: 20, rot: 12 },
      { top: 35, left: 20, size: 18, rot: -8 },
      { top: 75, left: 85, size: 20, rot: 5 },
      { top: 45, left: 80, size: 18, rot: 15 },
      { top: 85, left: 45, size: 20, rot: -10 }
    ]
  },
  {
    id: 27,
    name: "유령의 집 👻",
    bg: "assets/background_haunted.png",
    timeLimit: 11,
    positions: [
      { top: 65, left: 25, size: 18, rot: -5 },
      { top: 40, left: 60, size: 20, rot: 10 },
      { top: 80, left: 30, size: 18, rot: 0 },
      { top: 30, left: 80, size: 18, rot: -15 },
      { top: 70, left: 80, size: 20, rot: 8 }
    ]
  },
  {
    id: 28,
    name: "용암 화산 비밀기지 🌋",
    bg: "assets/background_volcano.png",
    timeLimit: 11,
    positions: [
      { top: 55, left: 35, size: 20, rot: 12 },
      { top: 75, left: 70, size: 18, rot: -8 },
      { top: 35, left: 45, size: 18, rot: 5 },
      { top: 85, left: 25, size: 20, rot: 15 },
      { top: 45, left: 75, size: 18, rot: -10 }
    ]
  },
  {
    id: 29,
    name: "세균 미시세계 🦠",
    bg: "assets/background_micro.png",
    timeLimit: 10,
    positions: [
      { top: 60, left: 55, size: 18, rot: -5 },
      { top: 40, left: 30, size: 18, rot: 10 },
      { top: 80, left: 80, size: 18, rot: 0 },
      { top: 30, left: 65, size: 18, rot: -15 },
      { top: 70, left: 20, size: 18, rot: 8 }
    ]
  },
  {
    id: 30,
    name: "스팀펑크 기관차 🚂",
    bg: "assets/background_train.png",
    timeLimit: 10,
    positions: [
      { top: 65, left: 45, size: 18, rot: 12 },
      { top: 45, left: 80, size: 18, rot: -8 },
      { top: 85, left: 35, size: 18, rot: 5 },
      { top: 35, left: 25, size: 18, rot: 15 },
      { top: 75, left: 80, size: 18, rot: -10 }
    ]
  },
  {
    id: 31,
    name: "거대 개미굴 지하 🐜",
    bg: "assets/background_antcolony.png",
    timeLimit: 9,
    positions: [
      { top: 50, left: 35, size: 18, rot: 15 },
      { top: 75, left: 65, size: 16, rot: -10 },
      { top: 40, left: 80, size: 16, rot: 5 },
      { top: 85, left: 25, size: 18, rot: -15 },
      { top: 35, left: 20, size: 16, rot: 10 }
    ]
  },
  {
    id: 32,
    name: "빛나는 크리스탈 동굴 💎",
    bg: "assets/background_crystal.png",
    timeLimit: 9,
    positions: [
      { top: 60, left: 25, size: 16, rot: -8 },
      { top: 45, left: 75, size: 16, rot: 12 },
      { top: 80, left: 50, size: 18, rot: -5 },
      { top: 35, left: 40, size: 16, rot: 10 },
      { top: 75, left: 85, size: 16, rot: -12 }
    ]
  },
  {
    id: 33,
    name: "연금술 실험실 🧪",
    bg: "assets/background_alchemy.png",
    timeLimit: 8,
    positions: [
      { top: 50, left: 45, size: 16, rot: 10 },
      { top: 75, left: 30, size: 18, rot: -15 },
      { top: 30, left: 65, size: 16, rot: 5 },
      { top: 85, left: 75, size: 16, rot: 15 },
      { top: 45, left: 85, size: 16, rot: -8 }
    ]
  },
  {
    id: 34,
    name: "네온 사이버 펑크 시티 🏙️",
    bg: "assets/background_cybercity.png",
    timeLimit: 8,
    positions: [
      { top: 65, left: 30, size: 16, rot: -12 },
      { top: 40, left: 25, size: 16, rot: 8 },
      { top: 80, left: 70, size: 16, rot: -5 },
      { top: 35, left: 80, size: 16, rot: -15 },
      { top: 55, left: 60, size: 16, rot: 10 }
    ]
  },
  {
    id: 35,
    name: "사막의 오아시스 마을 🐪",
    bg: "assets/background_oasis.png",
    timeLimit: 7,
    positions: [
      { top: 70, left: 55, size: 16, rot: 5 },
      { top: 45, left: 35, size: 16, rot: -10 },
      { top: 85, left: 30, size: 16, rot: 15 },
      { top: 30, left: 75, size: 16, rot: -8 },
      { top: 65, left: 85, size: 16, rot: 12 }
    ]
  },
  {
    id: 36,
    name: "거대 시계탑 내부 ⚙️",
    bg: "assets/background_clockwork.png",
    timeLimit: 7,
    positions: [
      { top: 60, left: 40, size: 16, rot: -12 },
      { top: 35, left: 20, size: 16, rot: 8 },
      { top: 75, left: 85, size: 16, rot: -5 },
      { top: 45, left: 80, size: 16, rot: -15 },
      { top: 85, left: 45, size: 16, rot: 10 }
    ]
  },
  {
    id: 37,
    name: "우주 정거장 식물원 🪐",
    bg: "assets/background_biodome.png",
    timeLimit: 6,
    positions: [
      { top: 65, left: 25, size: 16, rot: 5 },
      { top: 40, left: 60, size: 16, rot: -10 },
      { top: 80, left: 30, size: 14, rot: 15 },
      { top: 30, left: 80, size: 16, rot: -8 },
      { top: 70, left: 80, size: 14, rot: 12 }
    ]
  },
  {
    id: 38,
    name: "책상 위 미니어처 세계 ✏️",
    bg: "assets/background_deskworld.png",
    timeLimit: 6,
    positions: [
      { top: 55, left: 35, size: 16, rot: -12 },
      { top: 75, left: 70, size: 14, rot: 8 },
      { top: 35, left: 45, size: 16, rot: -5 },
      { top: 85, left: 25, size: 14, rot: -15 },
      { top: 45, left: 75, size: 16, rot: 10 }
    ]
  },
  {
    id: 39,
    name: "잠든 드래곤의 둥지 🐉",
    bg: "assets/background_dragon.png",
    timeLimit: 5,
    positions: [
      { top: 60, left: 55, size: 14, rot: 5 },
      { top: 40, left: 30, size: 16, rot: -10 },
      { top: 80, left: 80, size: 14, rot: 15 },
      { top: 30, left: 65, size: 14, rot: -8 },
      { top: 70, left: 20, size: 14, rot: 12 }
    ]
  },
  {
    id: 40,
    name: "평행우주 코어 🌌",
    bg: "assets/background_multiverse.png",
    timeLimit: 5,
    positions: [
      { top: 65, left: 45, size: 14, rot: -12 },
      { top: 45, left: 80, size: 14, rot: 8 },
      { top: 85, left: 35, size: 14, rot: -5 },
      { top: 35, left: 25, size: 14, rot: -15 },
      { top: 75, left: 80, size: 14, rot: 10 }
    ]
  }
];

// Dynamic Map Nodes for 40 stages
const TOTAL_STAGES = 40;
const MapNodePositions = Array.from({ length: TOTAL_STAGES }, (_, i) => {
  const xPattern = [50, 25, 45, 75];
  const left = xPattern[i % 4];
  // Calculate top percentage. Stage 1 is at the bottom (e.g. 95%), Stage 40 is at the top (e.g. 5%)
  const top = 95 - (i * (90 / (TOTAL_STAGES - 1)));
  return { left, top };
});

// Game State
const GameState = {
  currentStageId: 1,
  unlockedStageId: 1,
  isPlaying: false,
  timer: 0,
  timerInterval: null,
  lives: 3,
  hintsLeft: 3,
  zoomLevel: 1.0,
  selectedPosition: null,
  records: {}
};

// Load saved data from localStorage
function loadSavedProgress() {
  const unlocked = localStorage.getItem("goldie_unlocked_stage");
  if (unlocked) {
    GameState.unlockedStageId = parseInt(unlocked);
  }
  const records = localStorage.getItem("goldie_records");
  if (records) {
    GameState.records = JSON.parse(records);
  }
}

// Save progress to localStorage
function saveProgress() {
  localStorage.setItem("goldie_unlocked_stage", GameState.unlockedStageId);
  localStorage.setItem("goldie_records", JSON.stringify(GameState.records));
}

// Initialize application on load
window.addEventListener("DOMContentLoaded", () => {
  loadSavedProgress();
  setupUI();
  setupPanning();
});

// Setup UI event handlers
function setupUI() {
  // Navigation
  document.getElementById("btn-start-game").addEventListener("click", () => {
    SoundFX.init();
    GameState.lives = 3;
    GameState.hintsLeft = 3;
    showView("map-view");
    renderStageMap();
    
    // Auto scroll map container to the bottom so user starts at Stage 1
    setTimeout(() => {
      const wrapper = document.querySelector(".map-viewport-wrapper");
      wrapper.scrollTop = wrapper.scrollHeight;
    }, 50);
  });

  document.getElementById("btn-map-back").addEventListener("click", () => {
    showView("home-view");
  });

  document.getElementById("btn-game-back").addEventListener("click", () => {
    exitGame();
    showView("map-view");
    renderStageMap();
  });

  // Zoom Controls
  document.getElementById("zoom-in").addEventListener("click", () => adjustZoom(0.25));
  document.getElementById("zoom-out").addEventListener("click", () => adjustZoom(-0.25));

  // Hint button
  document.getElementById("hint-btn").addEventListener("click", triggerHint);

  // Modals
  document.getElementById("btn-success-action").addEventListener("click", handleSuccessModalAction);
  document.getElementById("btn-fail-action").addEventListener("click", handleFailModalAction);
}

// View switcher
function showView(viewId) {
  document.querySelectorAll(".view").forEach(v => v.classList.remove("active"));
  document.getElementById(viewId).classList.add("active");
}

// Render Stage Map Screen (Winding Serpentine Map Nodes)
function renderStageMap() {
  const grid = document.querySelector(".stages-grid");
  grid.innerHTML = "";

  Stages.forEach((stage, idx) => {
    const isUnlocked = stage.id <= GameState.unlockedStageId;
    const isCompleted = GameState.records[stage.id] !== undefined;
    
    let statusClass = "locked";
    if (isCompleted) statusClass = "completed";
    else if (isUnlocked) statusClass = "unlocked";

    const node = document.createElement("div");
    node.className = `stage-node ${statusClass}`;
    
    // Position node absolutely using MapNodePositions percentages
    const pos = MapNodePositions[idx];
    node.style.left = `${pos.left}%`;
    node.style.top = `${pos.top}%`;
    
    const recordText = isCompleted ? `⏱️ 최고: ${GameState.records[stage.id]}초` : "";
    
    node.innerHTML = `
      <div class="stage-circle">${stage.id}</div>
      <div class="stage-info">
        <div class="stage-number">Stage ${stage.id}</div>
        <div class="stage-name">${stage.name}</div>
        <div class="stage-record">${recordText}</div>
      </div>
    `;

    if (isUnlocked) {
      node.addEventListener("click", () => {
        startStage(stage.id);
      });
    }
    grid.appendChild(node);
  });
}

// Start Stage Game Loop
function startStage(stageId) {
  const stage = Stages.find(s => s.id === stageId);
  if (!stage) return;

  GameState.currentStageId = stageId;
  GameState.isPlaying = true;
  GameState.timer = stage.timeLimit;
  GameState.zoomLevel = 1.0;

  // Choose a random position candidate
  const rIndex = Math.floor(Math.random() * stage.positions.length);
  GameState.selectedPosition = stage.positions[rIndex];

  // Update HUD values
  updateHUD();
  
  // Render Board
  const canvasContainer = document.getElementById("canvas-container");
  canvasContainer.innerHTML = "";
  canvasContainer.style.transform = `scale(1.0)`;

  // Add Background Image
  const bgImg = document.createElement("img");
  bgImg.src = stage.bg;
  bgImg.className = "game-bg-image";
  bgImg.alt = stage.name;
  
  // Create Target overlay container
  const targetOverlay = document.createElement("div");
  targetOverlay.className = "target-dog-overlay";
  targetOverlay.style.top = `${GameState.selectedPosition.top}%`;
  targetOverlay.style.left = `${GameState.selectedPosition.left}%`;
  targetOverlay.style.width = `${GameState.selectedPosition.size}px`;
  targetOverlay.style.height = `${GameState.selectedPosition.size}px`;
  targetOverlay.style.transform = `translate(-50%, -50%) rotate(${GameState.selectedPosition.rot}deg)`;
  
  // target dog image inside overlay
  const goldieImg = document.createElement("img");
  goldieImg.src = "assets/goldie_sprite.png";
  goldieImg.className = "target-dog-image";
  targetOverlay.appendChild(goldieImg);

  targetOverlay.addEventListener("click", (e) => {
    e.stopPropagation();
    handleTargetFound();
  });

  canvasContainer.appendChild(bgImg);
  canvasContainer.appendChild(targetOverlay);

  bgImg.addEventListener("mousedown", handleBackgroundClick);

  showView("game-view");
  
  // Center viewport on load
  setTimeout(() => {
    const viewport = document.getElementById("game-viewport");
    viewport.scrollLeft = (canvasContainer.offsetWidth - viewport.clientWidth) / 2;
    viewport.scrollTop = (canvasContainer.offsetHeight - viewport.clientHeight) / 2;
  }, 100);

  // Start Timer Interval
  clearInterval(GameState.timerInterval);
  GameState.timerInterval = setInterval(() => {
    GameState.timer--;
    updateHUD();
    
    if (GameState.timer <= 0) {
      GameState.lives--;
      updateHUD();
      if (GameState.lives <= 0) {
        handleGameOver("시간 초과! 하트를 모두 소진했습니다! 💔");
      } else {
        handleGameOver("시간 초과! ⏱️ (하트 1개 감소)");
      }
    }
  }, 1000);
}

// Update HUD elements
function updateHUD() {
  const stage = Stages.find(s => s.id === GameState.currentStageId);
  document.getElementById("hud-stage-name").textContent = stage.name;
  
  const timerVal = document.getElementById("timer-val");
  timerVal.textContent = `${GameState.timer}초`;
  if (GameState.timer <= 10) {
    timerVal.classList.add("warning");
  } else {
    timerVal.classList.remove("warning");
  }

  // Render Hearts
  const heartsContainer = document.getElementById("hearts-container");
  heartsContainer.innerHTML = "";
  for (let i = 1; i <= 3; i++) {
    const heart = document.createElement("span");
    heart.className = `heart ${i > GameState.lives ? "lost" : ""}`;
    heart.textContent = "❤️";
    heartsContainer.appendChild(heart);
  }

  // Hint Button
  const hintBtn = document.getElementById("hint-btn");
  if (GameState.hintsLeft > 0) {
    hintBtn.classList.remove("disabled");
    hintBtn.innerHTML = `🔍 힌트 (${GameState.hintsLeft})`;
  } else {
    hintBtn.classList.add("disabled");
    hintBtn.innerHTML = `🔍 힌트 없음`;
  }
}

// Handle Click on Wrong Location
function handleBackgroundClick(e) {
  if (!GameState.isPlaying) return;

  const container = document.getElementById("canvas-container");
  const rect = container.getBoundingClientRect();
  
  const clickX = (e.clientX - rect.left) / GameState.zoomLevel;
  const clickY = (e.clientY - rect.top) / GameState.zoomLevel;

  const ripple = document.createElement("div");
  ripple.className = "wrong-click-indicator";
  ripple.style.left = `${clickX}px`;
  ripple.style.top = `${clickY}px`;
  container.appendChild(ripple);
  
  setTimeout(() => ripple.remove(), 800);

  const flash = document.createElement("div");
  flash.className = "flash-danger";
  document.getElementById("game-view").appendChild(flash);
  setTimeout(() => flash.remove(), 300);

  GameState.lives--;
  SoundFX.playError();
  updateHUD();

  if (GameState.lives <= 0) {
    handleGameOver("하트를 모두 소진했습니다! 💔");
  }
}

// Handle Target Found Event
function handleTargetFound() {
  if (!GameState.isPlaying) return;
  GameState.isPlaying = false;
  clearInterval(GameState.timerInterval);

  SoundFX.playBark();
  SoundFX.playSuccess();

  const target = document.querySelector(".target-dog-overlay");
  target.style.transform = `translate(-50%, -50%) scale(1.8)`;
  target.style.zIndex = "100";

  const stage = Stages.find(s => s.id === GameState.currentStageId);
  const timeSpent = stage.timeLimit - GameState.timer;

  let newRecord = false;
  if (GameState.records[stage.id] === undefined || timeSpent < GameState.records[stage.id]) {
    GameState.records[stage.id] = timeSpent;
    newRecord = true;
  }

  if (GameState.currentStageId === GameState.unlockedStageId && GameState.unlockedStageId < Stages.length) {
    GameState.unlockedStageId = GameState.currentStageId + 1;
  }

  saveProgress();

  setTimeout(() => {
    showSuccessModal(timeSpent, newRecord);
  }, 1200);
}

// Trigger Hint Button
function triggerHint() {
  if (GameState.hintsLeft <= 0 || !GameState.isPlaying) return;
  GameState.hintsLeft--;
  SoundFX.playHint();
  updateHUD();

  const container = document.getElementById("canvas-container");
  
  const ring = document.createElement("div");
  ring.className = "hint-indicator-ring";
  ring.style.left = `${GameState.selectedPosition.left}%`;
  ring.style.top = `${GameState.selectedPosition.top}%`;
  
  // Hint ring radius decreases for higher stages to keep it challenging
  const stage = Stages.find(s => s.id === GameState.currentStageId);
  const hintRadius = Math.max(80, 150 - (stage.id * 8)); // 150px down to 80px
  ring.style.width = `${hintRadius * 2}px`;
  ring.style.height = `${hintRadius * 2}px`;
  container.appendChild(ring);

  const viewport = document.getElementById("game-viewport");
  const targetX = (container.offsetWidth * (GameState.selectedPosition.left / 100));
  const targetY = (container.offsetHeight * (GameState.selectedPosition.top / 100));
  
  viewport.scrollTo({
    left: targetX - viewport.clientWidth / 2,
    top: targetY - viewport.clientHeight / 2,
    behavior: 'smooth'
  });

  setTimeout(() => {
    ring.remove();
  }, 4000);
}

// Adjust Canvas Zoom
function adjustZoom(amount) {
  let newZoom = GameState.zoomLevel + amount;
  if (newZoom < 0.5) newZoom = 0.5;
  if (newZoom > 2.5) newZoom = 2.5;

  GameState.zoomLevel = newZoom;
  const canvasContainer = document.getElementById("canvas-container");
  canvasContainer.style.transform = `scale(${GameState.zoomLevel})`;
}

// Panning Mechanics for Game Board
function setupPanning() {
  const viewport = document.getElementById("game-viewport");
  let isDown = false;
  let startX, startY, scrollLeft, scrollTop;

  viewport.addEventListener('mousedown', (e) => {
    if (e.target.className !== "game-bg-image" && e.target.id !== "game-viewport") return;
    
    isDown = true;
    startX = e.pageX - viewport.offsetLeft;
    startY = e.pageY - viewport.offsetTop;
    scrollLeft = viewport.scrollLeft;
    scrollTop = viewport.scrollTop;
  });

  viewport.addEventListener('mouseleave', () => { isDown = false; });
  viewport.addEventListener('mouseup', () => { isDown = false; });

  viewport.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - viewport.offsetLeft;
    const y = e.pageY - viewport.offsetTop;
    const walkX = (x - startX) * 1.5; 
    const walkY = (y - startY) * 1.5;
    viewport.scrollLeft = scrollLeft - walkX;
    viewport.scrollTop = scrollTop - walkY;
  });

  // Mobile Touch Support
  viewport.addEventListener('touchstart', (e) => {
    if (e.target.className !== "game-bg-image" && e.target.id !== "game-viewport") return;
    isDown = true;
    startX = e.touches[0].pageX - viewport.offsetLeft;
    startY = e.touches[0].pageY - viewport.offsetTop;
    scrollLeft = viewport.scrollLeft;
    scrollTop = viewport.scrollTop;
  });

  viewport.addEventListener('touchend', () => { isDown = false; });

  viewport.addEventListener('touchmove', (e) => {
    if (!isDown) return;
    const x = e.touches[0].pageX - viewport.offsetLeft;
    const y = e.touches[0].pageY - viewport.offsetTop;
    const walkX = (x - startX) * 1.5;
    const walkY = (y - startY) * 1.5;
    viewport.scrollLeft = scrollLeft - walkX;
    viewport.scrollTop = scrollTop - walkY;
  });
}

// Exit and Clean Game Loop
function exitGame() {
  GameState.isPlaying = false;
  clearInterval(GameState.timerInterval);
}

// Game Over Logic
function handleGameOver(reason) {
  GameState.isPlaying = false;
  clearInterval(GameState.timerInterval);
  SoundFX.playGameOver();

  const modal = document.getElementById("fail-modal");
  document.getElementById("fail-reason").textContent = reason;
  
  const failBtn = document.getElementById("btn-fail-action");
  if (GameState.lives <= 0) {
    failBtn.innerHTML = "메인 메뉴로 돌아가기 🏠";
  } else {
    failBtn.innerHTML = "다시 도전하기 🔄 (남은 하트: " + GameState.lives + ")";
  }
  
  modal.classList.add("active");
}

// Show Success Modal
function showSuccessModal(timeSpent, isNewRecord) {
  const modal = document.getElementById("success-modal");
  document.getElementById("success-time").textContent = `${timeSpent}초`;
  
  const recordNotice = document.getElementById("new-record-notice");
  if (isNewRecord) {
    recordNotice.style.display = "block";
  } else {
    recordNotice.style.display = "none";
  }

  const nextBtn = document.getElementById("btn-success-action");
  if (GameState.currentStageId < Stages.length) {
    nextBtn.textContent = "다음 스테이지 도전! ➡️";
  } else {
    nextBtn.textContent = "메인 맵으로 가기 🗺️";
  }

  modal.classList.add("active");
}

// Success Modal Action
function handleSuccessModalAction() {
  document.getElementById("success-modal").classList.remove("active");
  if (GameState.currentStageId < Stages.length) {
    startStage(GameState.currentStageId + 1);
  } else {
    showView("map-view");
    renderStageMap();
    
    // Auto scroll map to bottom on return to map
    setTimeout(() => {
      const wrapper = document.querySelector(".map-viewport-wrapper");
      wrapper.scrollTop = wrapper.scrollHeight;
    }, 50);
  }
}

// Fail Modal Action
function handleFailModalAction() {
  document.getElementById("fail-modal").classList.remove("active");
  if (GameState.lives <= 0) {
    showView("home-view");
  } else {
    startStage(GameState.currentStageId); // Retry
  }
}
