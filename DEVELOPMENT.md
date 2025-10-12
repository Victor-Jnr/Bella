# Bella Development Guide

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Download AI models:**
   ```bash
   npm run download
   ```

3. **Start development server:**
   ```bash
   npm start
   ```

4. **Access Bella:**
   Open http://localhost:8081 in your browser

## Git Workflow

Git commits will be made only when new features are added or verified changes are implemented.

### Basic Git Commands

```bash
# Check status
git status

# Stage all changes
git add .

# Commit with message
git commit -m "feat: your changes description"

# Push to your fork
git push origin main

# Sync with original repository
git fetch upstream
git merge upstream/main
git push origin main
```

## Repository Setup

- **Origin:** Your fork (Victor-Jnr/Bella.git)
- **Upstream:** Original repository (Jackywine/Bella.git)

## Bella's Core Components

### Frontend
- `index.html` - Main interface
- `style.css` - Visual styling
- `script.js` - Main application logic

### AI Core
- `core.js` - AI processing engine
- `models/` - Downloaded AI models (excluded from git)

### Development Tools
- `download_models.js` - Model download script
- `git-workflow.sh` - Git automation script
- `package.json` - Dependencies and scripts

### Video Resources
- `视频资源/` - Bella's video expressions
- Different emotional states and responses

## Notes

- AI models are excluded from git (they're large files)
- Run `npm run download` after cloning to get models
- Use meaningful commit messages following the format:
  - `feat:` for new features
  - `fix:` for bug fixes
  - `docs:` for documentation
  - `style:` for UI/styling changes
  - `refactor:` for code improvements 