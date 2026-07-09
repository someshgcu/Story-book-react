/* ========================================
   React Adventure - Complete App (8 Scenes)
   ======================================== */

class ReactAdventure {
    constructor() {
        this.currentScene = 0;
        this.totalScenes = 8;
        this.scenes = this.getScenes();
        this.typewriterTimeout = null;
        this.voiceEnabled = false;
        this.synth = window.speechSynthesis;
        this.teacherVoice = null;
        this.studentVoice = null;
        
        this.init();
    }

    getScenes() {
        return [
            // Scene 1: Introduction - Park
            {
                background: 'park',
                dialogues: [
                    { speaker: 'teacher', text: "Hey there! I'm Mr. React, and I'm here to teach you about building amazing websites with React!" },
                    { speaker: 'student', text: "Hi Mr. React! I'm Maya. I've heard React is really cool, but I don't know much about it." },
                    { speaker: 'teacher', text: "Don't worry, Maya! We'll learn together, step by step. React is like building with colorful blocks!" },
                    { speaker: 'student', text: "That sounds fun! What will we learn first?" },
                    { speaker: 'teacher', text: "We'll cover 7 awesome concepts. Ready to start your React adventure?" }
                ],
                demo: 'intro'
            },
            // Scene 2: Event Handling - Classroom
            {
                background: 'classroom',
                dialogues: [
                    { speaker: 'teacher', text: "First, let's learn about Event Handling. It's like pressing a button and something happens!" },
                    { speaker: 'student', text: "Oh! Like when I press the light switch at home and the lights turn on?" },
                    { speaker: 'teacher', text: "Exactly! In React, we use onClick to handle button clicks. Try clicking those buttons above!" }
                ],
                demo: 'event'
            },
            // Scene 3: Forms - Office
            {
                background: 'office',
                dialogues: [
                    { speaker: 'teacher', text: "Now let's learn about Forms! When you fill out a form online, React helps us capture that information." },
                    { speaker: 'student', text: "Like when I sign up for a new game and enter my name and email?" },
                    { speaker: 'teacher', text: "Perfect! We call these 'Controlled Components'. Try filling out the form above!" }
                ],
                demo: 'form'
            },
            // Scene 4: Routing - House
            {
                background: 'house',
                dialogues: [
                    { speaker: 'teacher', text: "Next up is Client-Side Routing. It's like having different rooms in a house without reloading!" },
                    { speaker: 'student', text: "So I can go from the living room to the kitchen without the whole house resetting?" },
                    { speaker: 'teacher', text: "Exactly! React Router makes this magic happen. Try navigating between rooms above!" }
                ],
                demo: 'routing'
            },
            // Scene 5: Context API - Workshop
            {
                background: 'workshop',
                dialogues: [
                    { speaker: 'teacher', text: "Now let's learn about Context API. It's like having a shared backpack that everyone can access!" },
                    { speaker: 'student', text: "So if I put something in the backpack, everyone else can see it too?" },
                    { speaker: 'teacher', text: "Yes! Try typing in Component A and watch Component B update automatically!" }
                ],
                demo: 'context'
            },
            // Scene 6: Components & Props - Design Studio
            {
                background: 'studio',
                dialogues: [
                    { speaker: 'teacher', text: "Time to learn about Components and Props! Components are like reusable building blocks." },
                    { speaker: 'student', text: "So I can create something once and use it many times?" },
                    { speaker: 'teacher', text: "Exactly! And Props are like parameters you pass to components. Try customizing the card above!" }
                ],
                demo: 'components'
            },
            // Scene 7: State Management - Arcade
            {
                background: 'arcade',
                dialogues: [
                    { speaker: 'teacher', text: "Now let's learn about State! State is like a component's memory that can change over time." },
                    { speaker: 'student', text: "Like when I keep score in a game? The number changes but it's still my score!" },
                    { speaker: 'teacher', text: "Perfect analogy! Try the counter above and watch the state update in real-time!" }
                ],
                demo: 'state'
            },
            // Scene 8: React Hooks - Tech Lab
            {
                background: 'techlab',
                dialogues: [
                    { speaker: 'teacher', text: "Finally, let's learn about Hooks! They let you use state and other features in function components." },
                    { speaker: 'student', text: "That sounds complicated... is it hard?" },
                    { speaker: 'teacher', text: "Not at all! useState is the most common hook. Try the examples above to see how it works!" },
                    { speaker: 'student', text: "Wow, I learned so much today! React is really fun!" },
                    { speaker: 'teacher', text: "You did amazing, Maya! You're now a React hero!" }
                ],
                demo: 'hooks'
            }
        ];
    }

    init() {
        this.initVoices();
        this.bindEvents();
        this.loadScene(0);
    }

    initVoices() {
        // Load voices
        const loadVoices = () => {
            const voices = this.synth.getVoices();
            
            // Get all english voices to try and ensure distinct voices
            const enVoices = voices.filter(v => v.lang.startsWith('en'));
            
            // Find male voice for teacher (prefer English)
            this.teacherVoice = enVoices.find(v => v.name.toLowerCase().includes('male')) ||
                                enVoices.find(v => v.lang === 'en-GB') ||
                                enVoices[0] || voices[0];
            
            // Find female voice for student (prefer English)
            this.studentVoice = enVoices.find(v => v.name.toLowerCase().includes('female')) ||
                                enVoices.find(v => v.name.includes('Samantha') || v.name.includes('Victoria') || v.name.includes('Zira')) ||
                                enVoices.find(v => v.lang === 'en-US' && v !== this.teacherVoice) ||
                                enVoices.find(v => v !== this.teacherVoice) ||
                                enVoices[0] || voices[0];
        };
        
        loadVoices();
        if (this.synth.onvoiceschanged !== undefined) {
            this.synth.onvoiceschanged = loadVoices;
        }
    }

    speak(text, speaker) {
        return new Promise((resolve) => {
            if (!this.voiceEnabled) {
                setTimeout(resolve, text.length * 50 + 1500);
                return;
            }
            
            // Cancel any ongoing speech
            this.synth.cancel();
            
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.voice = speaker === 'teacher' ? this.teacherVoice : this.studentVoice;
            utterance.rate = 0.85; // Slightly slower to match text
            // Use less extreme pitch shifts to avoid robotic distortion on mobile TTS engines
            utterance.pitch = speaker === 'teacher' ? 0.95 : 1.1;
            utterance.volume = 1;
            
            // Show speaking indicator
            const speakerEl = speaker === 'teacher' ? 
                document.querySelector('.teacher-side') : 
                document.querySelector('.student-side');
            
            utterance.onstart = () => {
                document.getElementById('voice-toggle').classList.add('speaking');
                if (speakerEl) speakerEl.classList.add('speaking');
            };
            
            const cleanup = () => {
                document.getElementById('voice-toggle').classList.remove('speaking');
                if (speakerEl) speakerEl.classList.remove('speaking');
                resolve();
            };
            
            utterance.onend = cleanup;
            utterance.onerror = cleanup;
            
            this.synth.speak(utterance);
        });
    }

    stopSpeaking() {
        this.synth.cancel();
        document.getElementById('voice-toggle').classList.remove('speaking');
        document.querySelectorAll('.actor-side').forEach(el => el.classList.remove('speaking'));
    }

    bindEvents() {
        document.getElementById('start-btn').addEventListener('click', () => this.startStory());
        document.getElementById('prev-btn').addEventListener('click', () => this.prevScene());
        document.getElementById('next-btn').addEventListener('click', () => this.nextScene());
        
        // Voice toggle
        const voiceToggle = document.getElementById('voice-toggle');
        voiceToggle.addEventListener('click', () => {
            this.voiceEnabled = !this.voiceEnabled;
            voiceToggle.classList.toggle('active', this.voiceEnabled);
            
            // Toggle icon visibility
            voiceToggle.querySelector('.voice-on').style.display = this.voiceEnabled ? 'block' : 'none';
            voiceToggle.querySelector('.voice-off').style.display = this.voiceEnabled ? 'none' : 'block';
            
            if (!this.voiceEnabled) {
                this.stopSpeaking();
            }
        });
        
        const restartBtn = document.getElementById('restart-btn');
        if (restartBtn) {
            restartBtn.onclick = (e) => {
                e.preventDefault();
                e.stopPropagation();
                window.location.reload();
                return false;
            };
        }
    }

    startStory() {
        document.getElementById('title-screen').classList.remove('active');
        document.getElementById('story-screen').classList.add('active');
        
        // Auto-enable voice on start (since this is triggered by a click event, browsers allow TTS here)
        this.voiceEnabled = true;
        const voiceToggle = document.getElementById('voice-toggle');
        voiceToggle.classList.add('active');
        voiceToggle.querySelector('.voice-on').style.display = 'block';
        voiceToggle.querySelector('.voice-off').style.display = 'none';
        
        this.loadScene(0);
    }

    loadScene(index) {
        if (index < 0 || index >= this.totalScenes) return;
        
        this.currentScene = index;
        const scene = this.scenes[index];
        
        this.stopSpeaking();
        this.updateProgress();
        this.updateNavigation();
        this.loadBackground(scene.background);
        this.resetCharacters();
        
        document.getElementById('demo-area').classList.remove('visible');
        
        setTimeout(() => this.startDialogues(scene), 500);
    }

    loadBackground(type) {
        const container = document.getElementById('scene-container');
        
        const backgrounds = {
            // Scene 1: Sunny Park - Beautiful Nature Scene
            park: `
                <div class="scene-bg park-bg">
                    <div class="sun"></div>
                    <div class="cloud cloud-1"></div>
                    <div class="cloud cloud-2"></div>
                    <div class="birds">
                        <div class="bird bird-1"></div>
                        <div class="bird bird-2"></div>
                        <div class="bird bird-3"></div>
                    </div>
                    <div class="tree tree-1"><div class="tree-top"></div><div class="tree-trunk"></div></div>
                    <div class="tree tree-2"><div class="tree-top"></div><div class="tree-trunk"></div></div>
                    <div class="tree tree-3"><div class="tree-top"></div><div class="tree-trunk"></div></div>
                    <div class="tree tree-4"><div class="tree-top"></div><div class="tree-trunk"></div></div>
                    <div class="flowers">
                        <div class="flower flower-1"></div>
                        <div class="flower flower-2"></div>
                        <div class="flower flower-3"></div>
                        <div class="flower flower-4"></div>
                        <div class="flower flower-5"></div>
                    </div>
                    <div class="grass"></div>
                </div>
            `,
            // Scene 2: Classroom - Modern Learning Space
            classroom: `
                <div class="scene-bg classroom-bg">
                    <div class="window window-1"></div>
                    <div class="window window-2"></div>
                    <div class="chalkboard">
                        <div class="chalk-text">Event Handling</div>
                    </div>
                    <div class="bookshelf"></div>
                    <div class="clock"></div>
                    <div class="desk"></div>
                </div>
            `,
            // Scene 3: Office - Professional Workspace
            office: `
                <div class="scene-bg office-bg">
                    <div class="office-floor"></div>
                    <div class="office-window"></div>
                    <div class="office-plant"></div>
                    <div class="desk-chair"></div>
                </div>
            `,
            // Scene 4: House - Cozy Home Exterior
            house: `
                <div class="scene-bg house-bg">
                    <div class="house-body">
                        <div class="house-door"></div>
                        <div class="house-window-1"></div>
                        <div class="house-window-2"></div>
                    </div>
                    <div class="house-roof"></div>
                    <div class="fence">
                        <div class="fence-post"></div>
                        <div class="fence-post"></div>
                        <div class="fence-post"></div>
                    </div>
                    <div class="mailbox"></div>
                    <div class="house-grass"></div>
                </div>
            `,
            // Scene 5: Workshop - Creative Maker Space
            workshop: `
                <div class="scene-bg workshop-bg">
                    <div class="workshop-floor"></div>
                    <div class="pegboard"></div>
                    <div class="workbench"></div>
                    <div class="tool tool-1"></div>
                    <div class="tool tool-2"></div>
                    <div class="gear gear-1"></div>
                    <div class="gear gear-2"></div>
                </div>
            `,
            // Scene 6: Design Studio - Creative Space
            studio: `
                <div class="scene-bg studio-bg">
                    <div class="studio-floor"></div>
                    <div class="easel"></div>
                    <div class="palette"></div>
                    <div class="paintbrush"></div>
                    <div class="paint-tube tube-1"></div>
                    <div class="paint-tube tube-2"></div>
                    <div class="paint-tube tube-3"></div>
                    <div class="color-swatch swatch-1"></div>
                    <div class="color-swatch swatch-2"></div>
                    <div class="color-swatch swatch-3"></div>
                </div>
            `,
            // Scene 7: Arcade - Retro Gaming Paradise
            arcade: `
                <div class="scene-bg arcade-bg">
                    <div class="arcade-floor"></div>
                    <div class="arcade-machine machine-1"></div>
                    <div class="arcade-machine machine-2"></div>
                    <div class="neon-sign"></div>
                    <div class="pixel pixel-1"></div>
                    <div class="pixel pixel-2"></div>
                    <div class="pixel pixel-3"></div>
                    <div class="pixel pixel-4"></div>
                </div>
            `,
            // Scene 8: Tech Lab - Futuristic Innovation
            techlab: `
                <div class="scene-bg techlab-bg">
                    <div class="techlab-floor"></div>
                    <div class="screen screen-1"></div>
                    <div class="screen screen-2"></div>
                    <div class="circuit circuit-1"></div>
                    <div class="circuit circuit-2"></div>
                    <div class="hologram"></div>
                    <div class="data-stream"></div>
                </div>
            `
        };
        
        container.innerHTML = backgrounds[type] || backgrounds.park;
    }

    resetCharacters() {
        document.getElementById('teacher-bubble').classList.remove('visible');
        document.getElementById('student-bubble').classList.remove('visible');
        document.getElementById('teacher-text').textContent = '';
        document.getElementById('student-text').textContent = '';
    }

    async startDialogues(scene) {
        const currentId = Math.random();
        this.currentDialogueId = currentId;
        
        for (const dialogue of scene.dialogues) {
            if (this.currentDialogueId !== currentId) return;
            
            await this.showDialogue(dialogue);
            
            // Small pause between speakers
            if (this.currentDialogueId === currentId) {
                await new Promise(r => setTimeout(r, 800));
            }
        }
        
        if (this.currentDialogueId === currentId && scene.demo) {
            // Wait slightly before showing the demo
            await new Promise(r => setTimeout(r, 600));
            if (this.currentDialogueId === currentId) {
                this.showDemo(scene.demo);
            }
        }
    }

    showDialogue(dialogue) {
        const bubbleId = dialogue.speaker === 'teacher' ? 'teacher-bubble' : 'student-bubble';
        const textId = dialogue.speaker === 'teacher' ? 'teacher-text' : 'student-text';
        const otherId = dialogue.speaker === 'teacher' ? 'student-bubble' : 'teacher-bubble';
        
        document.getElementById(otherId).classList.remove('visible');
        document.getElementById(bubbleId).classList.add('visible');
        this.typewriter(document.getElementById(textId), dialogue.text);
        
        // Voice over (returns Promise that resolves when done)
        return this.speak(dialogue.text, dialogue.speaker);
    }

    typewriter(element, text) {
        if (this.typewriterTimeout) clearTimeout(this.typewriterTimeout);
        
        element.textContent = '';
        let i = 0;
        
        const type = () => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                // Synced speed (50ms)
                this.typewriterTimeout = setTimeout(type, 50);
            }
        };
        type();
    }

    showDemo(type) {
        const demoArea = document.getElementById('demo-area');
        demoArea.innerHTML = this.getDemoHTML(type);
        demoArea.classList.add('visible');
        this.initDemo(type);
    }

    getDemoHTML(type) {
        switch(type) {
            case 'intro':
                return `
                    <div class="demo-title">Ready to begin?</div>
                    <div style="display: flex; justify-content: center; gap: 20px; margin-top: 15px;">
                        <button class="nav-btn primary" id="intro-yes-btn" style="padding: 10px 30px;">Yes, let's go!</button>
                        <button class="nav-btn" id="intro-no-btn" style="padding: 10px 30px;">Not yet</button>
                    </div>
                `;
            case 'event':
                return `
                    <div class="demo-title">Try It Yourself!</div>
                    <div class="lights-container">
                        <div class="light-item">
                            <div class="light-bulb" id="light1"></div>
                            <button class="light-btn" data-light="1">Click Me!</button>
                        </div>
                        <div class="light-item">
                            <div class="light-bulb" id="light2"></div>
                            <button class="light-btn" data-light="2">Click Me!</button>
                        </div>
                        <div class="light-item">
                            <div class="light-bulb" id="light3"></div>
                            <button class="light-btn" data-light="3">Click Me!</button>
                        </div>
                    </div>
                    <div class="code-box"><code>&lt;button onClick={handleClick}&gt;
  Click Me!
&lt;/button&gt;</code></div>
                    <div class="success-message" id="event-success">
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="white"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                        You handled the event!
                    </div>
                `;
            case 'form':
                return `
                    <div class="demo-title">Fill Out the Form!</div>
                    <div class="form-demo-content">
                        <div class="form-side">
                            <label>Name:</label>
                            <input type="text" id="form-name" placeholder="Enter your name">
                            <label>Email:</label>
                            <input type="email" id="form-email" placeholder="Enter your email">
                            <label>Message:</label>
                            <textarea id="form-message" placeholder="Write something..."></textarea>
                            <button class="submit-btn" id="submit-form">Submit</button>
                        </div>
                        <div class="state-side">
                            <h4>Live State:</h4>
                            <div class="state-item"><span class="state-key">name:</span> <span class="state-value" id="state-name">""</span></div>
                            <div class="state-item"><span class="state-key">email:</span> <span class="state-value" id="state-email">""</span></div>
                            <div class="state-item"><span class="state-key">message:</span> <span class="state-value" id="state-message">""</span></div>
                        </div>
                    </div>
                    <div class="success-message" id="form-success">
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="white"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                        Form submitted successfully!
                    </div>
                `;
            case 'routing':
                return `
                    <div class="demo-title">Navigate the House!</div>
                    <div class="routing-content">
                        <div class="rooms-nav">
                            <div class="room-btn active" data-room="living">
                                <svg viewBox="0 0 24 24" width="35" height="35" fill="none" stroke="#4A90D9" stroke-width="2"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 0 0 1 1h3m10-11l2 2m-2-2v10a1 1 0 0 1-1 1h-3m-4 0h4"/></svg>
                                <div class="room-name">Living Room</div>
                            </div>
                            <div class="room-btn" data-room="kitchen">
                                <svg viewBox="0 0 24 24" width="35" height="35" fill="none" stroke="#4A90D9" stroke-width="2"><path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8zM6 1v3M10 1v3M14 1v3"/></svg>
                                <div class="room-name">Kitchen</div>
                            </div>
                            <div class="room-btn" data-room="bedroom">
                                <svg viewBox="0 0 24 24" width="35" height="35" fill="none" stroke="#4A90D9" stroke-width="2"><path d="M2 4v16M2 8h20M22 4v16M6 8v4a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V8M6 12v4M18 12v4"/></svg>
                                <div class="room-name">Bedroom</div>
                            </div>
                        </div>
                        <div class="room-display" id="room-display">
                            <h3>Living Room</h3>
                            <p>Welcome to the living room! This is where families gather and watch TV together.</p>
                        </div>
                        <div class="url-bar">
                            <span class="url-label">URL:</span>
                            <span class="url-value" id="url-display">/living-room</span>
                        </div>
                    </div>
                    <div class="success-message" id="routing-success">
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="white"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                        You navigated without reloading!
                    </div>
                `;
            case 'context':
                return `
                    <div class="demo-title">Share Data with Context!</div>
                    <div class="context-content">
                        <div class="context-visual">
                            <div class="component-box">
                                <h4>Component A</h4>
                                <input type="text" id="context-input" placeholder="Type something...">
                            </div>
                            <div class="context-box">
                                <svg viewBox="0 0 24 24" width="35" height="35" fill="none" stroke="white" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
                                <div style="margin-top:6px">Context</div>
                            </div>
                            <div class="component-box">
                                <h4>Component B</h4>
                                <div class="component-display" id="context-display">Shared data</div>
                            </div>
                        </div>
                    </div>
                    <div class="success-message" id="context-success">
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="white"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                        Data shared without prop drilling!
                    </div>
                `;
            case 'components':
                return `
                    <div class="demo-title">Build a Profile Card!</div>
                    <div class="components-demo">
                        <div class="card-controls">
                            <label>Name:</label>
                            <input type="text" id="card-name" placeholder="Enter name" value="Maya">
                            <label>Role:</label>
                            <select id="card-role">
                                <option value="Student">Student</option>
                                <option value="Developer">Developer</option>
                                <option value="Designer">Designer</option>
                            </select>
                            <label>Color:</label>
                            <div class="color-options">
                                <button class="color-btn active" data-color="#4A90D9" style="background:#4A90D9"></button>
                                <button class="color-btn" data-color="#FF69B4" style="background:#FF69B4"></button>
                                <button class="color-btn" data-color="#4CAF50" style="background:#4CAF50"></button>
                                <button class="color-btn" data-color="#FF9800" style="background:#FF9800"></button>
                            </div>
                        </div>
                        <div class="card-preview">
                            <div class="profile-card" id="profile-card">
                                <div class="card-avatar" id="card-avatar">
                                    <svg viewBox="0 0 24 24" width="40" height="40" fill="white"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                                </div>
                                <div class="card-name" id="card-name-display">Maya</div>
                                <div class="card-role" id="card-role-display">Student</div>
                            </div>
                        </div>
                    </div>
                    <div class="code-box"><code>function ProfileCard({ name, role, color }) {
  return (
    &lt;div className="card" style={{background: color}}&gt;
      &lt;h3&gt;{name}&lt;/h3&gt;
      &lt;p&gt;{role}&lt;/p&gt;
    &lt;/div&gt;
  );
}</code></div>
                    <div class="success-message" id="components-success">
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="white"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                        Component customized with props!
                    </div>
                `;
            case 'state':
                return `
                    <div class="demo-title">Interactive Counter!</div>
                    <div class="state-demo">
                        <div class="counter-section">
                            <button class="counter-btn minus" id="counter-minus">
                                <svg viewBox="0 0 24 24" width="24" height="24" fill="white"><path d="M19 13H5v-2h14v2z"/></svg>
                            </button>
                            <div class="counter-value" id="counter-value">0</div>
                            <button class="counter-btn plus" id="counter-plus">
                                <svg viewBox="0 0 24 24" width="24" height="24" fill="white"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
                            </button>
                        </div>
                        <div class="state-visualization">
                            <h4>State Visualization:</h4>
                            <div class="state-bar">
                                <div class="state-fill" id="state-fill" style="width: 50%"></div>
                            </div>
                            <div class="state-info">
                                <span>count: <strong id="state-count">0</strong></span>
                                <span>double: <strong id="state-double">0</strong></span>
                            </div>
                        </div>
                    </div>
                    <div class="code-box"><code>const [count, setCount] = useState(0);

&lt;button onClick={() => setCount(count - 1)}&gt;−&lt;/button&gt;
&lt;span&gt;{count}&lt;/span&gt;
&lt;button onClick={() => setCount(count + 1)}&gt;+&lt;/button&gt;</code></div>
                    <div class="success-message" id="state-success">
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="white"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                        State updated successfully!
                    </div>
                `;
            case 'hooks':
                return `
                    <div class="demo-title">React Hooks in Action!</div>
                    <div class="hooks-demo">
                        <div class="hook-tabs">
                            <button class="hook-tab active" data-hook="useState">useState</button>
                            <button class="hook-tab" data-hook="useEffect">useEffect</button>
                            <button class="hook-tab" data-hook="useRef">useRef</button>
                        </div>
                        <div class="hook-content" id="hook-content">
                            <div class="hook-example" id="hook-useState">
                                <h4>useState Hook</h4>
                                <p>Manages state in function components</p>
                                <div class="hook-demo-box">
                                    <input type="text" id="hook-input" placeholder="Type something...">
                                    <div class="hook-output" id="hook-output">Output appears here</div>
                                </div>
                            </div>
                            <div class="hook-example hidden" id="hook-useEffect">
                                <h4>useEffect Hook</h4>
                                <p>Runs code after render (side effects)</p>
                                <div class="hook-demo-box">
                                    <div class="timer-display" id="timer-display">0 seconds</div>
                                    <button class="timer-btn" id="timer-btn">Start Timer</button>
                                </div>
                            </div>
                            <div class="hook-example hidden" id="hook-useRef">
                                <h4>useRef Hook</h4>
                                <p>Access DOM elements directly</p>
                                <div class="hook-demo-box">
                                    <input type="text" id="ref-input" placeholder="Click button to focus">
                                    <button class="focus-btn" id="focus-btn">Focus Input</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="code-box"><code>import { useState, useEffect, useRef } from 'react';

function MyComponent() {
  const [name, setName] = useState('');
  const inputRef = useRef(null);
  
  useEffect(() => {
    document.title = name;
  }, [name]);
  
  return &lt;input ref={inputRef} /&gt;;
}</code></div>
                    <div class="success-message" id="hooks-success">
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="white"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                        Hook demonstrated successfully!
                    </div>
                `;
        }
    }

    initDemo(type) {
        if (type === 'intro') this.initIntroDemo();
        if (type === 'event') this.initEventDemo();
        if (type === 'form') this.initFormDemo();
        if (type === 'routing') this.initRoutingDemo();
        if (type === 'context') this.initContextDemo();
        if (type === 'components') this.initComponentsDemo();
        if (type === 'state') this.initStateDemo();
        if (type === 'hooks') this.initHooksDemo();
    }

    initIntroDemo() {
        document.getElementById('intro-yes-btn').addEventListener('click', () => {
            this.celebrate("Awesome!");
            setTimeout(() => this.nextScene(), 1500);
        });
        document.getElementById('intro-no-btn').addEventListener('click', () => {
            document.getElementById('student-bubble').classList.remove('visible');
            document.getElementById('teacher-bubble').classList.add('visible');
            const text = "Take your time! The adventure will wait.";
            this.typewriter(document.getElementById('teacher-text'), text);
            this.speak(text, 'teacher');
        });
    }

    initEventDemo() {
        let clicked = 0;
        document.querySelectorAll('.light-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.getElementById(`light${btn.dataset.light}`).classList.toggle('on');
                clicked++;
                if (clicked >= 3) {
                    document.getElementById('event-success').classList.add('visible');
                    this.celebrate('Wow, I did it!');
                }
            });
        });
    }

    initFormDemo() {
        ['name', 'email', 'message'].forEach(field => {
            document.getElementById(`form-${field}`).addEventListener('input', (e) => {
                document.getElementById(`state-${field}`).textContent = `"${e.target.value}"`;
            });
        });
        document.getElementById('submit-form').addEventListener('click', () => {
            if (document.getElementById('form-name').value && document.getElementById('form-email').value) {
                document.getElementById('form-success').classList.add('visible');
                this.celebrate('This is so cool!');
            }
        });
    }

    initRoutingDemo() {
        const rooms = {
            living: { name: 'Living Room', content: 'Welcome to the living room! This is where families gather and watch TV together.' },
            kitchen: { name: 'Kitchen', content: 'The kitchen is where we cook delicious meals!' },
            bedroom: { name: 'Bedroom', content: 'This is my cozy bedroom where I sleep and do homework.' }
        };
        let visited = new Set(['living']);
        document.querySelectorAll('.room-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const roomId = btn.dataset.room;
                document.querySelectorAll('.room-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                document.getElementById('room-display').innerHTML = `<h3>${rooms[roomId].name}</h3><p>${rooms[roomId].content}</p>`;
                document.getElementById('url-display').textContent = `/${roomId === 'living' ? 'living-room' : roomId}`;
                visited.add(roomId);
                if (visited.size >= 3) {
                    document.getElementById('routing-success').classList.add('visible');
                    this.celebrate('Amazing, no reload!');
                }
            });
        });
    }

    initContextDemo() {
        const input = document.getElementById('context-input');
        const display = document.getElementById('context-display');
        input.addEventListener('input', (e) => {
            display.textContent = e.target.value || 'Shared data';
            display.style.background = e.target.value ? '#E8F5E9' : '#FCE4EC';
        });
        input.addEventListener('blur', () => {
            if (input.value) {
                document.getElementById('context-success').classList.add('visible');
                this.celebrate('Magic, right?');
            }
        });
    }

    initComponentsDemo() {
        const nameInput = document.getElementById('card-name');
        const roleSelect = document.getElementById('card-role');
        const nameDisplay = document.getElementById('card-name-display');
        const roleDisplay = document.getElementById('card-role-display');
        const avatar = document.getElementById('card-avatar');
        
        nameInput.addEventListener('input', (e) => {
            nameDisplay.textContent = e.target.value || 'Your Name';
        });
        
        roleSelect.addEventListener('change', (e) => {
            roleDisplay.textContent = e.target.value;
        });
        
        let colorChanged = false;
        document.querySelectorAll('.color-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.color-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                avatar.style.background = btn.dataset.color;
                if (!colorChanged) {
                    document.getElementById('components-success').classList.add('visible');
                    this.celebrate('I love this card!');
                    colorChanged = true;
                }
            });
        });
    }

    initStateDemo() {
        let count = 0;
        let celebrated = false;
        const valueEl = document.getElementById('counter-value');
        const fillEl = document.getElementById('state-fill');
        const countEl = document.getElementById('state-count');
        const doubleEl = document.getElementById('state-double');
        
        const updateDisplay = () => {
            valueEl.textContent = count;
            countEl.textContent = count;
            doubleEl.textContent = count * 2;
            fillEl.style.width = `${50 + count * 5}%`;
            
            if (count !== 0 && !celebrated) {
                document.getElementById('state-success').classList.add('visible');
                this.celebrate('State is updating!');
                celebrated = true;
            }
        };
        
        document.getElementById('counter-plus').addEventListener('click', () => {
            count++;
            updateDisplay();
        });
        
        document.getElementById('counter-minus').addEventListener('click', () => {
            count--;
            updateDisplay();
        });
    }

    initHooksDemo() {
        let hooksCelebrated = false;
        
        // Tab switching
        document.querySelectorAll('.hook-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                document.querySelectorAll('.hook-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                
                document.querySelectorAll('.hook-example').forEach(ex => ex.classList.add('hidden'));
                document.getElementById(`hook-${tab.dataset.hook}`).classList.remove('hidden');
            });
        });
        
        // useState demo
        const hookInput = document.getElementById('hook-input');
        const hookOutput = document.getElementById('hook-output');
        hookInput.addEventListener('input', (e) => {
            hookOutput.textContent = e.target.value || 'Output appears here';
            if (!hooksCelebrated && e.target.value.length > 3) {
                document.getElementById('hooks-success').classList.add('visible');
                this.celebrate('Hooks are awesome!');
                hooksCelebrated = true;
            }
        });
        
        // useEffect demo
        let timerInterval;
        let seconds = 0;
        const timerDisplay = document.getElementById('timer-display');
        const timerBtn = document.getElementById('timer-btn');
        
        timerBtn.addEventListener('click', () => {
            if (timerInterval) {
                clearInterval(timerInterval);
                timerInterval = null;
                timerBtn.textContent = 'Start Timer';
            } else {
                timerBtn.textContent = 'Stop Timer';
                timerInterval = setInterval(() => {
                    seconds++;
                    timerDisplay.textContent = `${seconds} seconds`;
                }, 1000);
            }
        });
        
        // useRef demo
        const refInput = document.getElementById('ref-input');
        document.getElementById('focus-btn').addEventListener('click', () => {
            refInput.focus();
            refInput.style.borderColor = '#4A90D9';
            setTimeout(() => refInput.style.borderColor = '#E0E0E0', 1000);
        });
    }

    updateProgress() {
        document.getElementById('progress-fill').style.width = `${((this.currentScene + 1) / this.totalScenes) * 100}%`;
        
        document.querySelectorAll('.dot').forEach((dot, i) => {
            dot.classList.remove('active', 'completed');
            if (i === this.currentScene) dot.classList.add('active');
            else if (i < this.currentScene) dot.classList.add('completed');
        });
        
        document.getElementById('current').textContent = this.currentScene + 1;
    }

    updateNavigation() {
        document.getElementById('prev-btn').disabled = this.currentScene === 0;
        
        if (this.currentScene === this.totalScenes - 1) {
            document.getElementById('next-btn').innerHTML = `
                Complete
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20 6L9 17l-5-5"/>
                </svg>
            `;
        } else {
            document.getElementById('next-btn').innerHTML = `
                Next
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M9 18l6-6-6-6"/>
                </svg>
            `;
        }
    }

    nextScene() {
        if (this.currentScene < this.totalScenes - 1) {
            this.loadScene(this.currentScene + 1);
        } else {
            this.showCompletion();
        }
    }

    prevScene() {
        if (this.currentScene > 0) {
            this.loadScene(this.currentScene - 1);
        }
    }

    showCompletion() {
        document.getElementById('story-screen').classList.remove('active');
        document.getElementById('completion-screen').classList.add('active');
    }

    celebrate(text) {
        // Create confetti
        this.createConfetti();
        
        // Show celebration bubble above student
        this.showCelebrationBubble(text);
        
        // Show celebration text
        this.showCelebrationText(text);
    }

    createConfetti() {
        // Create confetti container
        let container = document.querySelector('.confetti-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'confetti-container';
            document.body.appendChild(container);
        }
        
        const colors = ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#FF69B4'];
        const shapes = ['circle', 'square'];
        
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.className = `confetti ${shapes[Math.floor(Math.random() * shapes.length)]}`;
                confetti.style.left = `${Math.random() * 100}%`;
                confetti.style.top = '-20px';
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.animation = `confettiFall ${2 + Math.random() * 2}s ease-out forwards`;
                confetti.style.animationDelay = `${Math.random() * 0.3}s`;
                container.appendChild(confetti);
                
                setTimeout(() => confetti.remove(), 4000);
            }, i * 30);
        }
        
        // Also create burst confetti from center
        for (let i = 0; i < 20; i++) {
            const burst = document.createElement('div');
            burst.className = 'confetti circle';
            burst.style.left = '50%';
            burst.style.top = '50%';
            burst.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            
            const angle = (i / 20) * Math.PI * 2;
            const distance = 100 + Math.random() * 150;
            const tx = Math.cos(angle) * distance;
            const ty = Math.sin(angle) * distance;
            
            burst.style.setProperty('--tx', `${tx}px`);
            burst.style.setProperty('--ty', `${ty}px`);
            burst.style.animation = 'confettiBurst 1s ease-out forwards';
            
            container.appendChild(burst);
            setTimeout(() => burst.remove(), 1500);
        }
    }

    showCelebrationBubble(text) {
        const studentSide = document.querySelector('.student-side');
        if (!studentSide) return;
        
        // Remove existing celebration bubble
        const existing = studentSide.querySelector('.celebration-bubble');
        if (existing) existing.remove();
        
        const bubble = document.createElement('div');
        bubble.className = 'celebration-bubble';
        bubble.textContent = text;
        studentSide.appendChild(bubble);
        
        setTimeout(() => bubble.classList.add('show'), 50);
        setTimeout(() => {
            bubble.classList.remove('show');
            setTimeout(() => bubble.remove(), 500);
        }, 2500);
    }

    showCelebrationText(text) {
        // Remove existing celebration text
        const existing = document.querySelector('.celebration-text');
        if (existing) existing.remove();
        
        const celebration = document.createElement('div');
        celebration.className = 'celebration-text';
        celebration.textContent = text;
        document.body.appendChild(celebration);
        
        setTimeout(() => celebration.classList.add('show'), 50);
        setTimeout(() => {
            celebration.remove();
        }, 2000);
    }

    restart() {
        window.location.reload();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ReactAdventure();
});