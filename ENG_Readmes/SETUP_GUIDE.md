# Setup Guide - Bella AI Digital Companion

## 📋 Prerequisites

Before setting up Bella, ensure your system meets the following requirements:

### System Requirements

#### Minimum Requirements
- **Operating System**: Windows 10, macOS 10.15, or Ubuntu 18.04+
- **RAM**: 4GB (8GB recommended for smooth operation)
- **Storage**: 3GB free space (2GB for models + 1GB for project)
- **Network**: Stable internet connection for initial setup
- **Browser**: Chrome 90+, Firefox 85+, Safari 14+, or Edge 90+

#### Recommended Requirements
- **RAM**: 8GB or more
- **Storage**: SSD with 5GB free space
- **Browser**: Latest Chrome (best performance)
- **Audio**: High-quality microphone and speakers/headphones

### Required Software

#### 1. Node.js and npm
Bella requires Node.js v14 or higher for development server and model management.

**Download and Install:**
- Visit [nodejs.org](https://nodejs.org/)
- Download the LTS version
- Follow installation instructions for your OS

**Verify Installation:**
```bash
node --version  # Should show v14.0.0 or higher
npm --version   # Should show 6.0.0 or higher
```

#### 2. Git (Optional but Recommended)
For cloning the repository and version control.

**Download and Install:**
- Visit [git-scm.com](https://git-scm.com/)
- Download for your platform
- Follow installation instructions

**Verify Installation:**
```bash
git --version  # Should show version information
```

## 🚀 Installation Methods

### Method 1: Git Clone (Recommended)

1. **Clone the Repository**
```bash
git clone https://github.com/Jackywine/Bella.git
cd Bella
```

2. **Install Dependencies**
```bash
npm install
```

3. **Download AI Models**
```bash
npm run download
```

4. **Start Development Server**
```bash
npm start
```

5. **Open in Browser**
Navigate to `http://localhost:8081`

### Method 2: Download ZIP

1. **Download Project**
   - Go to [GitHub Repository](https://github.com/Jackywine/Bella)
   - Click "Code" → "Download ZIP"
   - Extract to desired location

2. **Open Terminal in Project Directory**
```bash
cd path/to/extracted/Bella
```

3. **Follow Steps 2-5 from Method 1**

### Method 3: Manual Setup

If automated model download fails, follow these steps:

1. **Install Dependencies**
```bash
npm install
```

2. **Create Models Directory**
```bash
mkdir -p models/Xenova
```

3. **Download Models Manually**
See [Manual Model Setup](#manual-model-setup) section below.

## 🤖 AI Model Setup

### Automatic Model Download

The project includes an automated model download script:

```bash
npm run download
```

This script downloads three essential models:
- **Whisper ASR**: Speech recognition
- **LaMini-Flan-T5-77M**: Language understanding
- **SpeechT5 TTS**: Text-to-speech synthesis

### Manual Model Setup

If automatic download fails, manually download models:

#### 1. Whisper ASR Model
```bash
cd models
git clone --depth 1 https://huggingface.co/Xenova/whisper-asr Xenova/whisper-asr
```

#### 2. Language Model
```bash
git clone --depth 1 https://huggingface.co/Xenova/LaMini-Flan-T5-77M Xenova/LaMini-Flan-T5-77M
```

#### 3. TTS Model
```bash
git clone --depth 1 https://huggingface.co/Xenova/speecht5_tts Xenova/speecht5_tts
```

#### 4. Speaker Embeddings
```bash
cd Xenova/speecht5_tts
curl -O https://huggingface.co/datasets/Xenova/transformers.js-docs/resolve/main/speaker_embeddings.bin
```

### Model Directory Structure

After setup, your models directory should look like:
```
models/
└── Xenova/
    ├── whisper-asr/
    │   ├── config.json
    │   ├── generation_config.json
    │   ├── preprocessor_config.json
    │   ├── tokenizer.json
    │   ├── tokenizer_config.json
    │   └── onnx/
    ├── LaMini-Flan-T5-77M/
    │   ├── config.json
    │   ├── generation_config.json
    │   ├── tokenizer.json
    │   ├── tokenizer_config.json
    │   └── onnx/
    └── speecht5_tts/
        ├── config.json
        ├── generation_config.json
        ├── preprocessor_config.json
        ├── speaker_embeddings.bin
        └── onnx/
```

## 🌐 Browser Configuration

### Chrome (Recommended)
1. **Enable Experimental Features** (if needed)
   - Navigate to `chrome://flags/`
   - Search for "SharedArrayBuffer"
   - Enable if disabled

2. **Allow Microphone Access**
   - Click the microphone icon in address bar
   - Select "Always allow"

### Firefox
1. **Enable SharedArrayBuffer**
   - Type `about:config` in address bar
   - Search for `javascript.options.shared_memory`
   - Set to `true`

2. **CORS Configuration**
   - Firefox may require additional CORS headers
   - Use Chrome for best experience

### Safari
1. **Enable Experimental Features**
   - Safari → Preferences → Advanced
   - Check "Show Develop menu"
   - Develop → Experimental Features → Enable relevant features

### HTTPS Requirements
For production deployment, HTTPS is required due to:
- Web Speech API security requirements
- SharedArrayBuffer CORS policies
- Microphone access permissions

## 🔧 Development Server Configuration

### Default Configuration
The project includes optimized server settings:

```json
{
  "start": "http-server -p 8081 -c-1 --cors --headers='{\"Cross-Origin-Opener-Policy\": \"same-origin\", \"Cross-Origin-Embedder-Policy\": \"require-corp\"}'"
}
```

### Custom Configuration

#### Change Port
```bash
npx http-server -p 3000 -c-1 --cors --headers='{"Cross-Origin-Opener-Policy": "same-origin", "Cross-Origin-Embedder-Policy": "require-corp"}'
```

#### Enable SSL (for production testing)
```bash
npx http-server -p 8081 -S -c-1 --cors --headers='{"Cross-Origin-Opener-Policy": "same-origin", "Cross-Origin-Embedder-Policy": "require-corp"}'
```

### Alternative Servers

#### Using serve
```bash
npx serve -p 8081 -s
```

#### Using Python (simple alternative)
```bash
python -m http.server 8081
```

## 🛠️ Environment Variables

Create a `.env` file in the project root for custom configuration:

```env
# Server Configuration
PORT=8081
HOST=localhost

# Model Configuration
MODEL_PATH=./models/
USE_LOCAL_MODELS=true
ENABLE_REMOTE_MODELS=false

# Debug Settings
DEBUG_MODE=false
VERBOSE_LOGGING=false
```

## 🎵 Audio Configuration

### Microphone Setup

#### Windows
1. **Check Microphone**
   - Settings → System → Sound
   - Test microphone input levels
   - Ensure proper permissions

#### macOS
1. **Privacy Settings**
   - System Preferences → Security & Privacy → Privacy
   - Select "Microphone"
   - Ensure browser has permission

#### Linux
1. **Check Audio System**
```bash
arecord -l  # List audio devices
alsamixer   # Adjust levels
```

### Audio Quality Settings

For best results:
- Use a quality external microphone
- Minimize background noise
- Speak clearly and at normal pace
- Maintain consistent distance from microphone

## 🐛 Troubleshooting

### Common Issues

#### 1. Models Won't Download
**Problem**: `npm run download` fails

**Solutions**:
- Check internet connection
- Use manual model setup
- Try different mirror: `https://hf-mirror.com/`
- Verify git installation

#### 2. Browser Won't Load Models
**Problem**: "Failed to load model" errors

**Solutions**:
- Clear browser cache
- Check browser console for errors
- Verify model files exist in `models/` directory
- Try incognito/private browsing mode

#### 3. Microphone Not Working
**Problem**: Speech recognition not responding

**Solutions**:
- Grant microphone permissions
- Check browser compatibility
- Test microphone in other applications
- Try different browser

#### 4. CORS Errors
**Problem**: Cross-origin resource sharing errors

**Solutions**:
- Use provided server configuration
- Don't open `index.html` directly in browser
- Ensure proper headers in server setup

#### 5. SharedArrayBuffer Errors
**Problem**: "SharedArrayBuffer is not defined"

**Solutions**:
- Use Chrome with proper headers
- Enable experimental features
- Serve over HTTPS in production
- Check browser compatibility

### Performance Issues

#### Slow Model Loading
- **Cause**: Large model files, slow storage
- **Solution**: Use SSD, close other applications, wait patiently

#### High Memory Usage
- **Cause**: Multiple models loaded simultaneously
- **Solution**: Close other browser tabs, increase RAM

#### Audio Lag
- **Cause**: Processing delays, browser limitations
- **Solution**: Use Chrome, reduce background processes

### Debug Mode

Enable verbose logging for troubleshooting:

```javascript
// In core.js, add:
env.backends.onnx.logLevel = 'verbose';

// In script.js, add:
console.log('Debug info:', { bellaAI, isListening, activeVideo });
```

## 📊 Verification Steps

### 1. Basic Installation Check
```bash
# Verify Node.js
node --version

# Verify npm packages
npm list

# Check project structure
ls -la
```

### 2. Model Verification
```bash
# Check model files
ls -la models/Xenova/*/

# Verify file sizes (should be substantial)
du -sh models/Xenova/*
```

### 3. Server Test
```bash
# Start server
npm start

# Check server response
curl http://localhost:8081
```

### 4. Browser Test
1. Open `http://localhost:8081`
2. Check browser console for errors
3. Test microphone permission
4. Verify video playback
5. Test speech recognition

## 🚢 Production Deployment

### Build Preparation
1. **Optimize Models**: Ensure only required models are included
2. **Minimize Assets**: Compress video files if needed
3. **HTTPS Setup**: Configure SSL certificates
4. **CORS Headers**: Maintain required headers

### Deployment Options

#### Static Hosting (Vercel, Netlify)
```bash
# Build for static hosting
npm run build  # If build script exists
```

#### Docker Deployment
```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8081
CMD ["npm", "start"]
```

#### CDN Considerations
- Host large model files on CDN
- Implement progressive loading
- Consider regional distribution

## 🔒 Security Considerations

### Local Development
- Server runs on localhost only
- No external network access required
- All processing happens locally

### Production Deployment
- Use HTTPS for all features
- Implement Content Security Policy
- Regular security updates
- Monitor for vulnerabilities

---

**Troubleshooting Help**: If you encounter issues not covered here, please check our [GitHub Issues](https://github.com/Jackywine/Bella/issues) or create a new issue with detailed error information. 