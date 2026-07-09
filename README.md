# React Adventure - Interactive Storybook

An interactive storybook application that teaches React concepts through a fun, engaging adventure with two characters: Mr. React (the teacher) and Maya (the student).

## 🎯 Features

- **Interactive Learning**: Hands-on demos for each React concept
- **Beautiful Design**: Realistic, friendly visual style with smooth animations
- **Sound Effects**: Audio feedback for interactions
- **Responsive**: Works on desktop and tablet devices
- **5 Learning Scenes**:
  1. The Meeting - Introduction to React
  2. Event Handling - Interactive buttons and lights
  3. Forms in React - Controlled components
  4. Client-Side Routing - Navigation without page reloads
  5. Context API - Global state management

## 🚀 Live Demo

[View Live Demo](https://yourusername.github.io/react-adventure-storybook/)

## 🛠️ Technologies Used

- HTML5
- CSS3 (with animations)
- JavaScript (ES6+)
- GSAP (for advanced animations)
- Web Audio API (for sound effects)
- 3D Character Models (GLB format)

## 📁 Project Structure

```
react-adventure-storybook/
├── index.html              # Main entry point
├── css/
│   ├── style.css           # Main styles
│   ├── scenes.css          # Scene-specific styles
│   └── animations.css      # Animation keyframes
├── js/
│   ├── app.js              # Main application logic
│   ├── scenes.js           # Scene management
│   ├── audio.js            # Sound effects manager
│   └── demos.js            # Interactive demo logic
├── assets/
│   ├── characters/         # 3D character models
│   ├── backgrounds/        # Scene backgrounds
│   ├── icons/              # UI elements
│   └── sounds/             # Sound effects
└── README.md               # Project documentation
```

## 🎮 How to Use

1. **Navigation**: Use the Next/Back buttons or arrow keys
2. **Continue**: Click anywhere on the scene to continue dialogue
3. **Interact**: Try the interactive demos in each scene
4. **Sound**: Press 'M' to toggle sound effects
5. **Restart**: Press 'Escape' to restart the story

## 🎨 Customization

### Changing Characters
Replace the GLB files in `assets/characters/` with your own 3D character models.

### Modifying Dialogues
Edit the dialogues array in `js/scenes.js` to customize the conversation.

### Adding New Scenes
1. Add a new scene div in `index.html`
2. Add scene data in `js/scenes.js`
3. Add scene-specific styles in `css/scenes.css`

## 🚀 Deployment to GitHub Pages

1. Create a new repository on GitHub
2. Push your code to the repository
3. Go to Settings > Pages
4. Select "Deploy from a branch"
5. Choose the `main` branch
6. Click Save

Your site will be available at: `https://yourusername.github.io/repository-name/`

## 🎯 Learning Objectives

By the end of this storybook, learners will understand:

- **Event Handling**: How to respond to user interactions
- **Forms in React**: Managing form data with controlled components
- **Client-Side Routing**: Navigation without page reloads
- **Context API**: Sharing state between components without prop drilling

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

---

**Made with ❤️ for learning React**