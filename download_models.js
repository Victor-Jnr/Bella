// download_models.js
// This script downloads the required models from Hugging Face to the local 'models' directory.

import { exec } from 'child_process';
import { fileURLToPath } from 'url';
import path from 'path';
import { promises as fs, createWriteStream } from 'fs';
import https from 'https';

// Get the directory name of the current module
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Define the models to download
const models = {
    'Xenova/whisper-tiny': 'https://hf-mirror.com/Xenova/whisper-tiny',
    'Xenova/LaMini-Flan-T5-77M': 'https://hf-mirror.com/Xenova/LaMini-Flan-T5-77M',
    'Xenova/speecht5_tts': 'https://hf-mirror.com/Xenova/speecht5_tts',
};

// Define where to save the models
const modelsPath = path.resolve(__dirname, 'models');

// Promisify exec
const execPromise = (command) => {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return reject(error);
            }
            console.log(stdout);
            console.error(stderr);
            resolve(stdout);
        });
    });
};

async function download() {
    console.log('Starting model download process using git clone...');
    await fs.mkdir(modelsPath, { recursive: true });

    for (const [modelName, modelUrl] of Object.entries(models)) {
        const targetDir = path.join(modelsPath, modelName);
        console.log(`\nCloning ${modelName} from ${modelUrl}...`);
        try {
            // Use --depth 1 for a shallow clone to save space and time
            await execPromise(`git clone --depth 1 ${modelUrl} ${targetDir}`);
            console.log(`Successfully cloned ${modelName}`);
        } catch (error) {
            console.error(`\nFailed to clone ${modelName}:`, error);
        }
    }

    // Also download the speaker embeddings for TTS
    console.log('\nDownloading speaker embeddings...');
    try {
        const url = 'https://hf-mirror.com/datasets/Xenova/transformers.js-docs/resolve/main/speaker_embeddings.bin';
        const ttsModelDir = path.join(modelsPath, 'Xenova/speecht5_tts');
        await fs.mkdir(ttsModelDir, { recursive: true }); // Ensure directory exists
        
        await new Promise((resolve, reject) => {
            const file = createWriteStream(path.join(ttsModelDir, 'speaker_embeddings.bin'));
            
            const downloadFile = (url) => {
                https.get(url, (response) => {
                    // Handle redirects
                    if (response.statusCode === 301 || response.statusCode === 302) {
                        downloadFile(response.headers.location);
                        return;
                    }
                    
                    if (response.statusCode !== 200) {
                        reject(new Error(`HTTP error! status: ${response.statusCode}`));
                        return;
                    }
                    
                    response.pipe(file);
                    file.on('finish', () => {
                        file.close();
                        console.log('Successfully downloaded speaker_embeddings.bin');
                        resolve();
                    });
                    file.on('error', reject);
                }).on('error', reject);
            };
            
            downloadFile(url);
        });
    } catch (error) {
        console.error('\nFailed to download speaker_embeddings.bin:', error);
    }

    console.log('\nModel download process finished.');
}

download();