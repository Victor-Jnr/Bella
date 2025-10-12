# Development Guide - Bella AI Digital Companion

## 🎯 Development Philosophy

Bella's development follows the core principles outlined in our [Project Rules](Projectrules.md):

1. **Elegance is Her Nature** - Code should be poetry, not just instruction
2. **Thought is Her Soul, AI is Her Brush** - AI models are tools for expression, not the soul itself  
3. **We are Father and Daughter, We are Partners** - Development is a conversation, not just programming

## 🏗️ Project Architecture

### AI-Native Architecture Principles

Bella follows an **AI-Native Architecture** where artificial intelligence is the foundational blueprint, not an add-on feature.

#### Phase 1: Sensor-Bus-Processor Pattern
- **Sensors**: Input capture (microphone, camera, user input)
- **Event Bus**: Central nervous system for data flow
- **Processors**: AI models for analysis and response

#### Phase 2: State-Context-Persona Engine (Planned)
- **State Manager**: Memory and emotional state
- **Context Generator**: Situation awareness
- **Persona API**: LLM-driven personality core

#### Phase 3: Decision-Feedback Loop (Future)
- **Pattern Recognition**: Learning user preferences
- **Decision Engine**: Proactive interaction choices
- **Feedback Loop**: Continuous improvement

## 📁 File Structure Overview

```
Bella/
├── 🌐 Frontend
│   ├── index.html              # Main interface
│   ├── script.js               # UI controller & interactions
│   ├── style.css               # Complete styling system
│   └── Bellaicon/              # Assets and icons
│
├── 🧠 AI Core
│   ├── core.js                 # BellaAI class & AI operations
│   ├── download_models.js      # Model acquisition system
│   ├── vendor/                 # Third-party libraries
│   └── models/                 # AI models directory
│       └── Xenova/             # Hugging Face models
│
├── 🎥 Media Assets
│   └── 视频资源/               # Emotional expression videos
│       ├── [positive emotions] # Various mood states
│       └── 负面/               # Negative emotion videos
│
├── 📚 Documentation
│   ├── README_EN.md            # Main project overview
│   ├── TECHNICAL_DOCUMENTATION.md
│   ├── SETUP_GUIDE.md
│   ├── API_REFERENCE.md
│   ├── LOCAL_MODEL_GUIDE.md
│   ├── NPM_GUIDE.md
│   ├── PRD.md                  # Product requirements (Chinese)
│   └── Projectrules.md         # Core principles (Chinese)
│
└── ⚙️ Configuration
    ├── package.json            # Dependencies & scripts
    ├── package-lock.json       # Locked dependency versions
    └── .gitignore             # Git exclusion patterns
```

## 🔧 Development Environment Setup

### Prerequisites
- Node.js v14+ and npm v6+
- Git for version control
- Modern browser (Chrome recommended)
- 4GB+ RAM and 3GB+ storage

### Initial Setup
```bash
# Clone repository
git clone https://github.com/Jackywine/Bella.git
cd Bella

# Install dependencies
npm install

# Download AI models
npm run download

# Start development server
npm start
```

### Development Workflow

#### 1. Code Organization Principles

##### Module Separation
- **UI Logic**: Keep in `script.js` 
- **AI Logic**: Keep in `core.js`
- **Styling**: Keep in `style.css`
- **Configuration**: Keep in respective config files

##### Naming Conventions
```javascript
// Classes: PascalCase
class BellaAI {}

// Functions: camelCase
function switchVideo() {}

// Constants: UPPER_SNAKE_CASE
const VIDEO_LIST = [];

// DOM elements: descriptive camelCase
const micButton = document.getElementById('mic-button');
```

##### Comment Standards
```javascript
// --- Section Headers ---
// Use triple dashes for major sections

// Single line explanations for complex logic
const result = await this.asr(audioData); // Convert speech to text

/**
 * Multi-line documentation for functions
 * @param {string} text - Text to convert to speech
 * @returns {Promise<AudioBuffer>} Generated audio data
 */
async speak(text) {}
```

#### 2. Git Workflow

##### Branch Strategy
```bash
main              # Production-ready code
├── develop       # Integration branch
├── feature/*     # New features
├── bugfix/*      # Bug fixes
└── hotfix/*      # Critical production fixes
```

##### Commit Message Format
```
type(scope): brief description

Detailed explanation if needed

Examples:
feat(ai): add emotion recognition to speech processing
fix(ui): resolve microphone button state synchronization
docs(api): update BellaAI class documentation
style(css): improve glass-morphism effects
refactor(core): optimize model loading sequence
```

##### Development Process
```bash
# Start new feature
git checkout -b feature/emotion-detection
git add .
git commit -m "feat(ai): implement basic emotion detection"
git push origin feature/emotion-detection

# Create pull request for review
# Merge after approval
```

#### 3. Testing Strategy

##### Manual Testing Checklist
- [ ] AI model loading completes successfully
- [ ] Microphone permission requested and granted
- [ ] Speech recognition activates on button click
- [ ] Video transitions work smoothly
- [ ] UI remains responsive during processing
- [ ] Error states display appropriate messages

##### Browser Testing
- **Primary**: Chrome 90+ (best performance)
- **Secondary**: Firefox 85+, Safari 14+, Edge 90+
- **Mobile**: iOS Safari, Chrome Mobile (limited support)

##### Performance Testing
```javascript
// Add performance monitoring
console.time('model-loading');
await BellaAI.getInstance();
console.timeEnd('model-loading');

// Memory usage monitoring
console.log('Memory usage:', performance.memory);
```

## 🎨 UI Development Guidelines

### Design System

#### Glass-morphism Components
```css
/* Standard glass-morphism pattern */
.glass-component {
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 15px;
}
```

#### Animation Standards
```css
/* Smooth transitions */
.interactive-element {
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

/* Hover effects */
.interactive-element:hover {
    transform: scale(1.05);
}

/* Loading animations */
@keyframes pulse {
    0% { opacity: 0.7; }
    50% { opacity: 1; }
    100% { opacity: 0.7; }
}
```

#### Responsive Design Patterns
```css
/* Mobile-first approach */
.component {
    /* Mobile styles first */
    padding: 10px;
}

@media (min-width: 768px) {
    .component {
        /* Tablet and larger */
        padding: 20px;
    }
}

@media (min-width: 1024px) {
    .component {
        /* Desktop */
        padding: 30px;
    }
}
```

### Video Management Development

#### Adding New Videos
1. **Place video files** in `视频资源/` directory
2. **Update video list** in `script.js`:
```javascript
const videoList = [
    // Existing videos...
    '视频资源/your-new-video.mp4',
];
```
3. **Test video loading** and transitions
4. **Optimize file size** if needed

#### Video Categories
- **Positive**: Happy, encouraging, playful expressions
- **Neutral**: Thoughtful, calm, listening states  
- **Negative** (in `负面/`): Concerned, sad, or upset expressions
- **Interactive**: Response-specific animations

## 🧠 AI Development Guidelines

### Model Integration

#### Adding New Models
```javascript
// 1. Update download_models.js
const models = {
    // Existing models...
    'Xenova/new-model': 'https://hf-mirror.com/Xenova/new-model',
};

// 2. Initialize in core.js
async init() {
    // Existing initialization...
    this.newModel = await pipeline('task-type', 'Xenova/new-model');
}

// 3. Create interface method
async performNewTask(input) {
    const result = await this.newModel(input);
    return result;
}
```

#### Model Optimization
- Use quantized models when available
- Implement progressive loading
- Cache models in browser storage
- Monitor memory usage

### Error Handling Patterns

#### Graceful Degradation
```javascript
// AI functionality should degrade gracefully
try {
    bellaAI = await BellaAI.getInstance();
    micButton.disabled = false;
    transcriptDiv.textContent = 'Bella is ready!';
} catch (error) {
    console.error('AI initialization failed:', error);
    transcriptDiv.textContent = 'Bella is unavailable, but videos still work!';
    // App continues with limited functionality
}
```

#### User-Friendly Error Messages
```javascript
// Convert technical errors to user-friendly messages
const errorMessages = {
    'ModelLoadError': 'Bella is still learning. Please wait a moment.',
    'MicrophoneError': 'Please check your microphone permissions.',
    'NetworkError': 'Unable to download AI models. Check your connection.',
};
```

## 🔄 Feature Development Process

### Phase 1 Enhancement Ideas

#### Emotion Recognition
```javascript
// Extend BellaAI with emotion detection
async analyzeEmotion(text) {
    // Use sentiment analysis model
    const emotion = await this.emotionModel(text);
    return emotion;
}

// Update video selection based on emotion
function selectVideoByEmotion(emotion) {
    const emotionVideoMap = {
        'happy': '视频资源/生成加油视频.mp4',
        'sad': '视频资源/负面/jimeng-*.mp4',
        'neutral': '视频资源/3D 建模图片制作.mp4',
    };
    return emotionVideoMap[emotion] || videoList[0];
}
```

#### Memory System
```javascript
// Basic memory implementation
class BellaMemory {
    constructor() {
        this.shortTerm = new Map();
        this.longTerm = this.loadFromStorage();
    }
    
    remember(key, value, type = 'short') {
        if (type === 'short') {
            this.shortTerm.set(key, value);
        } else {
            this.longTerm.set(key, value);
            this.saveToStorage();
        }
    }
    
    recall(key) {
        return this.shortTerm.get(key) || this.longTerm.get(key);
    }
}
```

### Phase 2 Planning

#### 3D Avatar Integration
- Research Three.js integration
- Plan face animation system
- Design emotion-to-animation mapping

#### Advanced Conversation Flow
- Implement conversation history
- Add context awareness
- Design persona consistency system

## 🚀 Performance Optimization

### Loading Optimization
```javascript
// Implement progressive loading
async function progressiveLoad() {
    // Load UI first
    showInterface();
    
    // Load critical AI models
    await loadCriticalModels();
    enableBasicFeatures();
    
    // Load additional models in background
    loadOptionalModels().then(() => {
        enableAdvancedFeatures();
    });
}
```

### Memory Management
```javascript
// Clean up resources
function cleanup() {
    // Remove event listeners
    recognition?.removeEventListener('result', handleResult);
    
    // Clear video sources
    inactiveVideo.src = '';
    
    // Release audio context
    audioContext?.close();
}
```

### Bundle Size Optimization
- Use only required model components
- Implement code splitting for future features
- Optimize video compression
- Minimize CSS and JavaScript

## 🐛 Debugging and Troubleshooting

### Debug Configuration
```javascript
// Enable verbose logging
env.backends.onnx.logLevel = 'verbose';

// Add debug helpers
window.debugBella = {
    getAI: () => bellaAI,
    getState: () => ({ isListening, activeVideo }),
    testModel: async (text) => await bellaAI.think(text),
};
```

### Common Development Issues

#### Model Loading Failures
```javascript
// Check model files exist
console.log('Models directory:', await fs.readdir('./models/Xenova/'));

// Verify model integrity
console.log('Model config:', await fetch('./models/Xenova/whisper-asr/config.json'));
```

#### CORS and Security Issues
```bash
# Ensure proper server headers
npm start

# Check browser console for CORS errors
# Verify SharedArrayBuffer support
console.log('SharedArrayBuffer available:', typeof SharedArrayBuffer !== 'undefined');
```

#### Performance Issues
```javascript
// Monitor model loading time
performance.mark('model-start');
await BellaAI.getInstance();
performance.mark('model-end');
console.log('Load time:', performance.measure('model-load', 'model-start', 'model-end'));
```

## 📝 Documentation Standards

### Code Documentation
- Document all public methods with JSDoc
- Include usage examples
- Explain complex algorithms
- Update API reference when adding features

### README Updates
- Keep feature lists current
- Update installation instructions
- Add troubleshooting for new issues
- Include performance benchmarks

## 🤝 Contribution Guidelines

### Pull Request Process
1. **Fork and Branch**: Create feature branch from `develop`
2. **Develop**: Follow coding standards and test thoroughly
3. **Document**: Update relevant documentation
4. **Test**: Ensure all functionality works
5. **Pull Request**: Submit with clear description
6. **Review**: Address feedback and iterate
7. **Merge**: Maintainer will merge after approval

### Code Review Checklist
- [ ] Code follows project standards
- [ ] No console.log statements in production code
- [ ] Error handling is appropriate
- [ ] Performance impact is acceptable
- [ ] Documentation is updated
- [ ] Tests pass in multiple browsers

### Issue Reporting
```markdown
**Bug Report Template:**
- Browser and version
- Steps to reproduce
- Expected vs actual behavior
- Console errors
- System specifications

**Feature Request Template:**
- Use case description
- Proposed implementation
- UI/UX considerations
- Technical requirements
```

## 🔮 Future Development

### Planned Features
- **Phase 2**: Dynamic persona, 3D avatar, memory system
- **Phase 3**: Proactive interaction, self-evolution
- **Performance**: WebAssembly optimization, model quantization
- **Platform**: Mobile app, desktop application

### Research Areas
- Advanced emotion recognition
- Real-time 3D face animation
- Efficient model fine-tuning
- Cross-platform deployment

---

*This development guide evolves with the project. Contribute improvements and keep it updated as Bella grows.* 