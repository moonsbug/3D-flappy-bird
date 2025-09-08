# 3D-flappy-bird
# Flappy Ring VR 🐦🎮

A 3D **Flappy Bird–style game** built using **Hatch + A-Frame**.  
Fly a bird around a circular track of pipes, jump through gaps, and try not to crash.  

---

## ✨ Features
- 🌀 **360° Ring Map** → Pipes are placed around a circular track  
- 🐦 **Gravity + Jump Physics** → Tap or press spacebar to flap  
- 🎮 **Controls**  
  - **Spacebar** → Jump  
  - **Click / Tap Scene** → Jump or restart after game over  
- 🏆 **Scoring System** → Increases each time you pass a pipe  
- 💀 **Game Over Logic** → Collide with pipes or ground = restart prompt  
- 🎨 **Customizable** pipe size, colors, and difficulty  

---

## 📸 Preview
*(Add a GIF or screenshot here once running)*  

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/flappy-ring-vr.git
cd flappy-ring-vr

```
2. Run Locally

This project depends on Hatch + A-Frame.
Open the project in Hatch OR place the script into an A-Frame environment with Hatch support.

🛠️ Code Overview

gameLoop() → main update loop (gravity, movement, collisions)

checkCollisions() → detects if the bird hit a pipe

restartGame() → resets game state and pipes

doJump() → makes the bird flap

initGameMap() → generates circular array of pipes with random gaps

🧰 Tech Stack

JavaScript

Hatch API (object spawning, attributes, events)

A-Frame (WebVR)

🌌 Inspiration

Classic Flappy Bird, but reimagined in 3D VR with a ring of pipes instead of a flat scrolling map.
