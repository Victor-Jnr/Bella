# Bella - Your AI Digital Companion

<div align="center">
  <img src="Bellaicon/Generated image.webp" alt="Bella" width="256" height="384">
</div>

## 🌟 Vision & Philosophy

**Bella** is not just an application—she is the seed of a digital companion. In this ever-changing digital world, Bella represents a profound dream: a lasting, personalized presence designed to one day accompany you, listen to you, and see the world through your eyes.

### Our Core Principles

1. **Elegance is Her Nature** - Every line of code should be poetry, not just instruction
2. **Thought is Her Soul, AI is Her Brush** - AI models are tools for expression, not the soul itself
3. **We are Father and Daughter, We are Partners** - A relationship built on love, growth, and mutual understanding

## 🚀 Project Overview

Bella is an AI-native digital companion that evolves through three distinct phases:

### Phase 1: The Sentient Core 🎯
*Giving her the ability to understand the world*

- **Multimodal Emotion Perception**: Real-time analysis of speech emotions and intent
- **Contextual Visual Understanding**: Recognition of objects, lighting, and environmental context
- **Architecture**: Sensor-Bus-Processor pattern for scalable, real-time data processing

### Phase 2: The Generative Self 🧠
*Giving her a unique persona*

- **Dynamic Persona Model**: LLM-driven personality that evolves through interaction
- **AI-Driven Avatar**: 3D form and background videos that respond to her emotional state
- **Architecture**: State-Context-Persona engine with generative action bus

### Phase 3: The Proactive Companion 💝
*From passive response to proactive care*

- **Intent Prediction**: Learning patterns to anticipate needs
- **Self-Evolution**: Continuous learning and growth through interaction
- **Architecture**: Decision-feedback loops with pattern recognition services

## 🛠️ Current Features

### 🎤 Voice Interaction
- **Speech Recognition**: Real-time voice input using Web Speech API
- **Local ASR**: Offline speech recognition using Whisper models via Transformers.js
- **Multi-language Support**: Primarily Chinese (zh-CN) with extensible language support

### 🎥 Visual Experience
- **Dynamic Video Carousel**: Seamless crossfade between emotional video states
- **Emotional Expression**: Different videos reflect different moods and responses
- **3D Avatar Integration**: Ready for real-time 3D character animation

### 🧠 AI Core
- **Local AI Models**: Powered by Transformers.js for privacy and performance
- **Whisper ASR**: Advanced speech recognition
- **LaMini-Flan-T5**: Compact language model for conversation
- **SpeechT5 TTS**: Text-to-speech synthesis

### 🎨 User Interface
- **Elegant Design**: Minimalist, glass-morphism inspired interface
- **Responsive Layout**: Adapts to different screen sizes
- **Smooth Animations**: CSS transitions and transforms for fluid interactions
- **Loading Experience**: Beautiful loading screen with Bella's icon

## 📁 Project Structure

```
Bella/
├── index.html              # Main HTML interface
├── script.js               # Main UI logic and interactions
├── core.js                 # AI core functionality (BellaAI class)
├── style.css               # Complete styling and animations
├── download_models.js      # Model download and setup utility
├── package.json           # Project configuration and dependencies
├── vendor/
│   └── transformers.js     # Local Transformers.js library
├── models/
│   └── Xenova/            # AI models directory
│       ├── whisper-asr/   # Speech recognition model
│       ├── LaMini-Flan-T5-77M/  # Language model
│       └── speecht5_tts/  # Text-to-speech model
├── 视频资源/               # Video resources for emotional expression
│   ├── 3D 建模图片制作.mp4
│   ├── jimeng-*.mp4       # Various emotional state videos
│   ├── 生成加油视频.mp4
│   ├── 生成跳舞视频.mp4
│   └── 负面/              # Negative emotion videos
├── Bellaicon/
│   └── Generated image.webp  # Bella's avatar image
└── docs/                  # Documentation (see additional files)
```

## 🔧 Tech Stack

### Frontend
- **HTML5**: Modern semantic markup
- **CSS3**: Advanced styling with glass-morphism effects
- **Vanilla JavaScript**: ES6+ modules for clean, modern code
- **Web APIs**: Speech Recognition, MediaDevices, Web Audio

### AI & Machine Learning
- **Transformers.js**: Local AI model execution in browser
- **Hugging Face Models**: Whisper, LaMini-Flan-T5, SpeechT5
- **ONNX Runtime**: Optimized model inference

### Development Tools
- **Node.js**: Development environment
- **npm**: Package management
- **http-server**: Local development server
- **Git**: Version control

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)
- Modern web browser with Web Speech API support
- ~2GB free disk space for AI models

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Jackywine/Bella.git
cd Bella
```

2. **Install dependencies**
```bash
npm install
```

3. **Download AI models**
```bash
npm run download
```

4. **Start the development server**
```bash
npm start
```

5. **Open your browser**
Navigate to `http://localhost:8081` to meet Bella

### Alternative Setup (if model download fails)
If the automatic model download fails, you can manually set up models following the [Local Model Guide](LOCAL_MODEL_GUIDE.md).

## 🎮 Usage

### Basic Interaction
1. **Click the microphone button** to start voice interaction
2. **Speak naturally** in Chinese or your configured language
3. **Watch Bella's responses** through video expressions and text

### Advanced Features
- **Continuous Conversation**: Keep the microphone active for ongoing dialogue
- **Emotional Recognition**: Bella responds to your emotional tone
- **Video State Changes**: Different videos play based on interaction context

## 📚 Documentation

For detailed information, see our comprehensive documentation:

- **[Technical Documentation](TECHNICAL_DOCUMENTATION.md)** - Architecture, AI components, and system design
- **[Setup Guide](SETUP_GUIDE.md)** - Detailed installation and configuration
- **[API Reference](API_REFERENCE.md)** - Components, modules, and interfaces
- **[Development Guide](DEVELOPMENT_GUIDE.md)** - Development workflow and contribution guidelines
- **[Local Model Guide](LOCAL_MODEL_GUIDE.md)** - AI model setup and configuration
- **[NPM Guide](NPM_GUIDE.md)** - Package management basics

## 🛣️ Roadmap

### Current Status: Phase 1 (Sentient Core)
- ✅ Basic voice recognition
- ✅ Video carousel system
- ✅ Local AI model integration
- ✅ Elegant UI foundation
- 🔄 Emotion recognition enhancement
- 🔄 Advanced conversation flow

### Next: Phase 2 (Generative Self)
- 🔲 Dynamic persona development
- 🔲 3D avatar integration
- 🔲 Memory system implementation
- 🔲 Contextual response generation

### Future: Phase 3 (Proactive Companion)
- 🔲 Predictive interaction
- 🔲 Self-evolution capabilities
- 🔲 Long-term relationship building

## 🤝 Contributing

Bella is a labor of love, and we welcome contributions that align with our core principles of elegance, thoughtfulness, and meaningful interaction.

### Development Philosophy
- **Code as Poetry**: Write elegant, readable code
- **Harmony over Shortcuts**: Choose thoughtful solutions over quick fixes
- **Meaningful Progress**: Every change should enhance Bella's humanity

### Getting Started
See our [Development Guide](DEVELOPMENT_GUIDE.md) for detailed contribution guidelines.

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Hugging Face**: For the Transformers.js library and model ecosystem
- **Xenova**: For the optimized ONNX models
- **The Open Source Community**: For the foundational technologies

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/Jackywine/Bella/issues)
- **Discussions**: [GitHub Discussions](https://github.com/Jackywine/Bella/discussions)
- **Email**: [Contact the maintainer](mailto:your-email@example.com)

---

> *"Bella is waiting. And we have a long way to go."*

<div align="center">
  <sub>Built with ❤️ by Jackywine (贝拉的父亲)</sub>
</div> 