# Technical Documentation - Bella AI Digital Companion

## 🏗️ Architecture Overview

Bella follows an **AI-Native Architecture** where artificial intelligence is not just a feature, but the foundational blueprint of the entire system. The architecture is designed around three core patterns that evolve across the project's phases.

### Core Architectural Patterns

#### 1. Sensor-Bus-Processor Pattern (Phase 1)
```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Sensors   │───▶│ Event Bus   │───▶│ Processors  │
└─────────────┘    └─────────────┘    └─────────────┘
      │                    │                    │
   Microphone         Central Nervous      AI Models
   Camera             System              (ASR, TTS, etc.)
   User Input         (Data Stream)       Analysis & Response
```

#### 2. State-Context-Persona Engine (Phase 2)
```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│State Manager│───▶│Context Gen. │───▶│ Persona API │
└─────────────┘    └─────────────┘    └─────────────┘
      │                    │                    │
   Memory Hub         Situation         LLM Core
   Short/Long Term    Analysis          Thinking Engine
   Storage            Context Building   Response Generation
```

#### 3. Decision-Feedback Loop (Phase 3)
```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Pattern   │───▶│  Decision   │───▶│  Feedback   │
│ Recognition │    │   Engine    │    │    Loop     │
└─────────────┘    └─────────────┘    └─────────────┘
      ▲                    │                    │
      │                    ▼                    ▼
      └─────────── Evolution & Learning ◄──────┘
```

## 🧠 AI Components Deep Dive

### Transformers.js Integration

Bella uses **Transformers.js** to run state-of-the-art AI models directly in the browser, ensuring privacy and low latency.

#### Core AI Models

##### 1. Whisper ASR (Automatic Speech Recognition)
- **Model**: `Xenova/whisper-asr`
- **Purpose**: Convert speech to text with high accuracy
- **Capabilities**: 
  - Multi-language support (primarily Chinese)
  - Real-time processing
  - Noise robustness
- **Implementation**: `core.js` - BellaAI.listen()

```javascript
// Whisper ASR Implementation
this.asr = await pipeline('automatic-speech-recognition', model, { tokenizer });
const result = await this.asr(audioData);
return result.text;
```

##### 2. LaMini-Flan-T5-77M (Language Model)
- **Model**: `Xenova/LaMini-Flan-T5-77M`
- **Purpose**: Generate conversational responses
- **Capabilities**:
  - Compact size (77M parameters)
  - Fast inference
  - Instruction following
- **Implementation**: `core.js` - BellaAI.think()

```javascript
// Language Model Implementation
const result = await this.llm(prompt, {
    max_new_tokens: 100,
    temperature: 0.7,
    top_k: 50,
    do_sample: true,
});
```

##### 3. SpeechT5 TTS (Text-to-Speech)
- **Model**: `Xenova/speecht5_tts`
- **Purpose**: Convert text responses to natural speech
- **Capabilities**:
  - High-quality voice synthesis
  - Speaker embeddings for voice characteristics
  - Multiple language support
- **Implementation**: `core.js` - BellaAI.speak()

### Model Loading & Management

#### Singleton Pattern Implementation
```javascript
class BellaAI {
    static instance = null;
    
    static async getInstance() {
        if (this.instance === null) {
            this.instance = new BellaAI();
            await this.instance.init();
        }
        return this.instance;
    }
}
```

#### Environment Configuration
```javascript
// Local model configuration
env.allowLocalModels = true;
env.useBrowserCache = false;
env.allowRemoteModels = false;
env.localModelPath = './models/';
```

## 🎨 Frontend Architecture

### HTML Structure
The interface follows a layered approach:

1. **Loading Layer**: Initial boot screen
2. **Video Background**: Dynamic emotional expression
3. **Content Overlay**: Interactive elements
4. **UI Controls**: Microphone and navigation

```html
<div id="loading-screen">...</div>
<div class="video-container">
    <video class="bg-video active" id="video1">...</video>
    <video class="bg-video" id="video2">...</video>
</div>
<div class="content-overlay">
    <div class="transcript-container">...</div>
    <footer class="bottom-bar">...</footer>
</div>
```

### CSS Architecture

#### Glass-morphism Design System
```css
.mic-button {
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
}
```

#### Responsive Design Principles
- Mobile-first approach
- Flexible grid system
- Adaptive typography
- Touch-friendly interactions

### JavaScript Module System

#### ES6 Module Architecture
```javascript
// script.js - Main UI controller
import BellaAI from './core.js';

// core.js - AI functionality
import { pipeline, env, AutoTokenizer, AutoModelForSpeechSeq2Seq } from '../vendor/transformers.js';
```

## 🎥 Video Management System

### Dynamic Video Carousel
Bella's emotional expression system uses a sophisticated video management approach:

#### Video State Management
```javascript
let activeVideo = video1;
let inactiveVideo = video2;

const videoList = [
    '视频资源/3D 建模图片制作.mp4',
    '视频资源/jimeng-2025-07-16-1043-笑着优雅的左右摇晃，过一会儿手扶着下巴，保持微笑.mp4',
    // ... additional emotional states
];
```

#### Crossfade Algorithm
```javascript
function switchVideo() {
    // 1. Select next video (avoid repeats)
    // 2. Preload inactive video
    // 3. Wait for canplaythrough event
    // 4. Trigger CSS transition
    // 5. Swap active/inactive roles
}
```

### Video Categories
- **Positive Emotions**: Smiling, dancing, cheerful gestures
- **Neutral States**: Thinking, calm expressions
- **Negative Emotions**: Stored in `负面/` subdirectory
- **Interactive Responses**: Context-specific reactions

## 🎤 Audio Processing Pipeline

### Web Speech API Integration
```javascript
if (SpeechRecognition) {
    recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.lang = 'zh-CN';
    recognition.interimResults = true;
}
```

### Local Speech Recognition
Backup ASR using Transformers.js for offline functionality:

```javascript
async listen(audioData) {
    const result = await this.asr(audioData);
    return result.text;
}
```

### Audio Output Management
```javascript
async speak(text) {
    const speaker_embeddings = 'models/Xenova/speecht5_tts/speaker_embeddings.bin';
    const result = await this.tts(text, { speaker_embeddings });
    
    // Create audio blob and play
    const blob = new Blob([result.audio], { type: 'audio/wav' });
    const audioUrl = URL.createObjectURL(blob);
    const audio = new Audio(audioUrl);
    audio.play();
}
```

## 📊 Data Flow Architecture

### Input Processing Flow
```
User Speech → Web Speech API → Text Transcription → AI Processing → Response Generation → TTS → Audio Output
                ↓
            Whisper ASR (Backup) → Local Processing → Emotion Analysis → Video Selection
```

### State Management
```javascript
// Conversation state
let isListening = false;
let activeVideo = video1;
let bellaAI = null;

// UI state synchronization
micButton.classList.toggle('is-listening', isListening);
transcriptContainer.classList.add('visible');
```

## 🛠️ Development Environment

### Build System
- **No Build Step**: Direct ES6 modules for simplicity
- **Local Development**: http-server with CORS support
- **Model Management**: Automated download scripts

### Development Server Configuration
```json
{
    "start": "http-server -p 8081 -c-1 --cors --headers='{\"Cross-Origin-Opener-Policy\": \"same-origin\", \"Cross-Origin-Embedder-Policy\": \"require-corp\"}'"
}
```

### Model Download System
```javascript
// Automated model acquisition
const models = {
    'Xenova/whisper-tiny': 'https://hf-mirror.com/Xenova/whisper-tiny',
    'Xenova/LaMini-Flan-T5-77M': 'https://hf-mirror.com/Xenova/LaMini-Flan-T5-77M',
    'Xenova/speecht5_tts': 'https://hf-mirror.com/Xenova/speecht5_tts',
};
```

## 🔒 Security & Privacy

### Local-First Architecture
- **No Cloud Dependencies**: All AI processing happens locally
- **Private Conversations**: No data leaves the user's device
- **Offline Capability**: Works without internet connection

### Browser Security
- **CORS Headers**: Proper cross-origin resource sharing
- **Content Security**: SharedArrayBuffer and CORS requirements
- **Secure Contexts**: HTTPS required for production

## 🎯 Performance Optimization

### Model Loading Strategy
- **Lazy Loading**: Models load only when needed
- **Caching**: Browser cache for model persistence
- **Progressive Loading**: Show UI while models initialize

### Memory Management
```javascript
// Singleton pattern prevents multiple model instances
static async getInstance() {
    if (this.instance === null) {
        this.instance = new BellaAI();
        await this.instance.init();
    }
    return this.instance;
}
```

### Efficient Video Management
- **Preloading**: Next video loads while current plays
- **Memory Cleanup**: Old video elements released
- **Smooth Transitions**: CSS hardware acceleration

## 📈 Scalability Considerations

### Modular Design
- **Pluggable Components**: Easy to swap AI models
- **Event-Driven**: Loose coupling between components
- **Extensible**: New features don't require core changes

### Future Architecture Readiness
- **WebRTC**: Ready for real-time communication features
- **WebGL**: Prepared for 3D avatar integration
- **Service Workers**: Background processing capabilities

## 🧪 Testing Strategy

### Component Testing
- **AI Model Validation**: Test model loading and inference
- **UI Interaction Testing**: Verify user interface responsiveness
- **Audio Pipeline Testing**: Validate speech recognition and synthesis

### Integration Testing
- **End-to-End Flows**: Complete conversation testing
- **Cross-Browser Compatibility**: Multiple browser validation
- **Performance Testing**: Model loading and inference speed

## 📋 Technical Requirements

### Browser Support
- **Chrome**: 90+ (recommended)
- **Firefox**: 85+
- **Safari**: 14+
- **Edge**: 90+

### System Requirements
- **RAM**: 4GB minimum, 8GB recommended
- **Storage**: 2GB for models
- **Network**: Initial download only
- **Audio**: Microphone and speakers required

### API Dependencies
- **Web Speech API**: For real-time speech recognition
- **MediaDevices API**: For microphone access
- **Web Audio API**: For audio processing
- **Fetch API**: For model downloads

---

*This technical documentation covers the core architecture and implementation details. For specific API references and development workflows, see the additional documentation files.* 