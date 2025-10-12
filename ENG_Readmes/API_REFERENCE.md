# API Reference - Bella AI Digital Companion

## 📚 Overview

This document provides comprehensive API documentation for all components, modules, classes, and interfaces in the Bella project. The codebase is organized into several key modules that work together to create the AI companion experience.

## 🧠 Core AI Module (`core.js`)

### BellaAI Class

The main AI processing class that handles all machine learning operations.

#### Constructor & Initialization

```javascript
class BellaAI {
    static instance = null;
    
    static async getInstance() -> Promise<BellaAI>
}
```

**Singleton Pattern**: Ensures only one instance of BellaAI exists throughout the application lifecycle.

#### Methods

##### `async init()`

Initializes all AI models and prepares the system for operation.

```javascript
async init() -> Promise<void>
```

**Functionality:**
- Loads Whisper ASR model for speech recognition
- Configures tokenizer and model components
- Sets up AI pipeline for processing
- Handles initialization errors gracefully

**Throws:** `Error` if model loading fails

**Example:**
```javascript
try {
    const bella = await BellaAI.getInstance();
    console.log('Bella AI initialized successfully');
} catch (error) {
    console.error('Failed to initialize:', error);
}
```

##### `async listen(audioData)`

Processes audio input and converts speech to text using Whisper ASR.

```javascript
async listen(audioData: ArrayBuffer | Blob) -> Promise<string>
```

**Parameters:**
- `audioData`: Raw audio data in supported format

**Returns:** `Promise<string>` - Transcribed text from speech

**Example:**
```javascript
const transcription = await bellaAI.listen(audioBuffer);
console.log('User said:', transcription);
```

##### `async think(prompt)`

Generates conversational responses using the language model.

```javascript
async think(prompt: string) -> Promise<string>
```

**Parameters:**
- `prompt`: Input text to process

**Returns:** `Promise<string>` - Generated response text

**Configuration Options:**
```javascript
{
    max_new_tokens: 100,    // Maximum response length
    temperature: 0.7,       // Response creativity (0-1)
    top_k: 50,             // Token selection strategy
    do_sample: true        // Enable sampling
}
```

**Example:**
```javascript
const response = await bellaAI.think("Hello, how are you?");
console.log('Bella responds:', response);
```

##### `async speak(text)`

Converts text to speech using SpeechT5 TTS model.

```javascript
async speak(text: string) -> Promise<AudioBuffer>
```

**Parameters:**
- `text`: Text to convert to speech

**Returns:** `Promise<AudioBuffer>` - Generated audio data

**Requirements:**
- Speaker embeddings must be available
- Audio output capabilities

**Example:**
```javascript
const audioData = await bellaAI.speak("Hello there!");
const blob = new Blob([audioData], { type: 'audio/wav' });
// Play audio...
```

### Environment Configuration

Configuration objects for model behavior:

```javascript
env.allowLocalModels = true;        // Enable local model loading
env.useBrowserCache = false;        // Disable browser caching
env.allowRemoteModels = false;      // Disable remote model loading
env.localModelPath = './models/';   // Local model directory
env.backends.onnx.logLevel = 'verbose'; // Logging level
```

## 🎨 UI Controller Module (`script.js`)

### Global Variables

#### DOM Elements
```javascript
const transcriptDiv: HTMLElement        // Speech recognition display
const loadingScreen: HTMLElement        // Initial loading overlay
const video1: HTMLVideoElement          // Primary video element
const video2: HTMLVideoElement          // Secondary video element
const micButton: HTMLButtonElement      // Microphone control button
```

#### State Variables
```javascript
let bellaAI: BellaAI | null            // AI instance reference
let isListening: boolean               // Microphone state
let activeVideo: HTMLVideoElement      // Currently playing video
let inactiveVideo: HTMLVideoElement    // Preloading video
```

### Video Management System

#### Video Configuration
```javascript
const videoList: string[] = [
    '视频资源/3D 建模图片制作.mp4',
    '视频资源/jimeng-2025-07-16-1043-笑着优雅的左右摇晃，过一会儿手扶着下巴，保持微笑.mp4',
    '视频资源/jimeng-2025-07-16-4437-比耶，然后微笑着优雅的左右摇晃.mp4',
    '视频资源/生成加油视频.mp4',
    '视频资源/生成跳舞视频.mp4',
    '视频资源/负面/jimeng-2025-07-16-9418-双手叉腰，嘴巴一直在嘟囔，表情微微生气.mp4'
];
```

#### Video Functions

##### `switchVideo()`

Handles smooth transition between video states.

```javascript
function switchVideo() -> void
```

**Algorithm:**
1. Select next video (avoiding repeats)
2. Set source on inactive video element
3. Preload new video content
4. Wait for `canplaythrough` event
5. Play new video and trigger CSS transition
6. Swap active/inactive video references

**Features:**
- Seamless crossfade transitions
- Prevents video repetition
- Handles loading states gracefully

### Speech Recognition System

#### Web Speech API Integration

```javascript
const SpeechRecognition: Constructor = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition: SpeechRecognition | null;
```

#### Recognition Configuration
```javascript
recognition.continuous = true;        // Continuous listening
recognition.lang = 'zh-CN';          // Chinese language
recognition.interimResults = true;    // Show interim results
```

#### Event Handlers

##### `recognition.onresult`

Processes speech recognition results and triggers AI responses.

```javascript
recognition.onresult = async (event: SpeechRecognitionEvent) -> void
```

**Process Flow:**
1. Extract final and interim transcriptions
2. Update UI with recognition results
3. Process final results with BellaAI
4. Generate and display AI response
5. Convert response to speech
6. Play audio output

##### `recognition.onerror`

Handles speech recognition errors.

```javascript
recognition.onerror = (event: SpeechRecognitionErrorEvent) -> void
```

### Microphone Control

#### Button State Management

```javascript
micButton.addEventListener('click', function() -> void)
```

**State Transitions:**
- `isListening: false → true`: Start recognition, show transcript area
- `isListening: true → false`: Stop recognition, hide transcript area

**Visual Feedback:**
- CSS class `is-listening` for active state
- Pulsing animation during recording
- Transcript container visibility

### Loading Screen Management

#### Automatic Hide Sequence

```javascript
setTimeout(() -> void, 1500);  // Fade out timing
setTimeout(() -> void, 500);   // Display none timing
```

**Transition:**
1. Wait 1.5 seconds for initial loading
2. Fade out over 0.5 seconds
3. Set display to none to prevent interaction blocking

## 🎨 Styling System (`style.css`)

### CSS Architecture

#### CSS Custom Properties (Variables)

```css
:root {
    --primary-color: rgba(255, 255, 255, 0.15);
    --border-color: rgba(255, 255, 255, 0.2);
    --backdrop-blur: 10px;
    --transition-speed: 0.2s;
}
```

#### Component Classes

##### Glass-morphism Effects

```css
.mic-button, .transcript-container {
    background: var(--primary-color);
    backdrop-filter: blur(var(--backdrop-blur));
    -webkit-backdrop-filter: blur(var(--backdrop-blur));
    border: 1px solid var(--border-color);
}
```

##### Video Management

```css
.bg-video {
    opacity: 0;
    transition: opacity 0.2s ease-in-out;
}

.bg-video.active {
    opacity: 1;
}
```

##### Responsive Design

```css
@media (max-width: 600px) {
    .mic-button {
        width: 70px;
        height: 70px;
    }
    
    .mic-button i {
        font-size: 30px;
    }
}
```

### Animation Systems

#### Pulse Animation (Listening State)

```css
@keyframes pulse {
    0% { box-shadow: 0 0 0 0 rgba(255, 154, 158, 0.7); }
    70% { box-shadow: 0 0 0 20px rgba(255, 154, 158, 0); }
    100% { box-shadow: 0 0 0 0 rgba(255, 154, 158, 0); }
}

.mic-button.is-listening {
    animation: pulse 1.5s infinite;
}
```

#### Loading Animation

```css
@keyframes pulse-loader {
    0% { transform: scale(1); opacity: 0.8; }
    50% { transform: scale(1.1); opacity: 1; }
    100% { transform: scale(1); opacity: 0.8; }
}
```

## 🔧 Model Management (`download_models.js`)

### Configuration

#### Model Definitions
```javascript
const models: Record<string, string> = {
    'Xenova/whisper-tiny': 'https://hf-mirror.com/Xenova/whisper-tiny',
    'Xenova/LaMini-Flan-T5-77M': 'https://hf-mirror.com/Xenova/LaMini-Flan-T5-77M',
    'Xenova/speecht5_tts': 'https://hf-mirror.com/Xenova/speecht5_tts'
};
```

#### Path Configuration
```javascript
const modelsPath: string = path.resolve(__dirname, 'models');
```

### Functions

#### `execPromise(command)`

Promisified version of child_process.exec for async/await usage.

```javascript
const execPromise = (command: string) -> Promise<string>
```

#### `download()`

Main download orchestration function.

```javascript
async function download() -> Promise<void>
```

**Process:**
1. Create models directory
2. Clone each model repository
3. Download speaker embeddings
4. Handle errors gracefully

## 📱 HTML Structure (`index.html`)

### Document Structure

#### Meta Configuration
```html
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Voice Assistant</title>
```

#### External Dependencies
```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
```

#### Component Hierarchy

```html
<body>
    <div id="loading-screen">...</div>
    <div class="video-container">
        <video class="bg-video active" id="video1">...</video>
        <video class="bg-video" id="video2">...</video>
    </div>
    <div class="content-overlay">
        <div class="transcript-container">
            <p id="transcript"></p>
        </div>
        <footer class="bottom-bar">
            <button class="mic-button" id="mic-button">...</button>
        </footer>
    </div>
    <script type="module" src="script.js"></script>
</body>
```

## 📦 Dependencies (`package.json`)

### Production Dependencies

#### @xenova/transformers
```json
"@xenova/transformers": "^2.17.2"
```
**Purpose:** Local AI model execution in browser
**Features:** ONNX runtime, model loading, inference pipelines

### Development Dependencies

#### http-server
```json
"http-server": "^14.1.1"
```
**Purpose:** Local development server with CORS support
**Configuration:** Custom headers for SharedArrayBuffer support

#### serve
```json
"serve": "^14.2.4"
```
**Purpose:** Alternative static file server
**Usage:** Backup option for development

### Scripts

```json
{
    "start": "http-server -p 8081 -c-1 --cors --headers='{\"Cross-Origin-Opener-Policy\": \"same-origin\", \"Cross-Origin-Embedder-Policy\": \"require-corp\"}'",
    "download": "node download_models.js"
}
```

## 🔌 Browser APIs

### Web Speech API

#### SpeechRecognition Interface
```typescript
interface SpeechRecognition extends EventTarget {
    continuous: boolean;
    lang: string;
    interimResults: boolean;
    start(): void;
    stop(): void;
    onresult: (event: SpeechRecognitionEvent) -> void;
    onerror: (event: SpeechRecognitionErrorEvent) -> void;
}
```

### MediaDevices API

#### Microphone Access
```javascript
navigator.mediaDevices.getUserMedia({ audio: true })
```

### Web Audio API

#### Audio Context
```javascript
const audioContext = new AudioContext();
```

## 🚀 Performance Considerations

### Memory Management

- **Singleton Pattern**: Prevents multiple AI model instances
- **Event Cleanup**: Removes event listeners after use
- **Video Preloading**: Optimizes transition performance

### Loading Optimization

- **Progressive Loading**: UI loads before AI models
- **Lazy Model Loading**: Models load only when needed
- **Browser Caching**: Leverages browser cache for repeated loads

### Error Handling

- **Graceful Degradation**: App continues without AI if models fail
- **User Feedback**: Clear error messages and loading states
- **Retry Mechanisms**: Automatic retries for transient failures

## 🔒 Security Features

### Local Processing
- All AI operations happen locally
- No data transmitted to external servers
- Privacy-preserving architecture

### CORS Configuration
- Proper headers for SharedArrayBuffer
- Cross-origin isolation policies
- Secure contexts for production

---

*This API reference covers all major components and interfaces. For implementation examples and best practices, see the [Development Guide](DEVELOPMENT_GUIDE.md).* 