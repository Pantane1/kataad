// Extension file contents for download
export const extensionFiles = {
  'manifest.json': `{
  "manifest_version": 3,
  "name": "KataAd",
  "version": "1.0.0",
  "description": "Fast, lightweight ad blocker built by Pantane.",
  "author": "Pantane",
  
  "permissions": [
    "declarativeNetRequest",
    "storage",
    "tabs"
  ],
  
  "declarative_net_request": {
    "rule_resources": [{
      "id": "ruleset_1",
      "enabled": true,
      "path": "rules.json"
    }]
  },
  
  "action": {
    "default_popup": "popup.html",
    "default_icon": {
      "16": "icons/icon16.png",
      "48": "icons/icon48.png",
      "128": "icons/icon128.png"
    }
  },
  
  "background": {
    "service_worker": "background.js"
  },
  
  "icons": {
    "16": "icons/icon16.png",
    "48": "icons/icon48.png",
    "128": "icons/icon128.png"
  }
}`,

  'rules.json': `[
  {
    "id": 1,
    "priority": 1,
    "action": { "type": "block" },
    "condition": {
      "urlFilter": "*://pagead2.googlesyndication.com/*",
      "resourceTypes": ["script", "image", "sub_frame", "xmlhttprequest"]
    }
  },
  {
    "id": 2,
    "priority": 1,
    "action": { "type": "block" },
    "condition": {
      "urlFilter": "*://googleads.g.doubleclick.net/*",
      "resourceTypes": ["script", "image", "sub_frame", "xmlhttprequest"]
    }
  },
  {
    "id": 3,
    "priority": 1,
    "action": { "type": "block" },
    "condition": {
      "urlFilter": "*://adservice.google.com/*",
      "resourceTypes": ["script", "image", "sub_frame", "xmlhttprequest"]
    }
  },
  {
    "id": 4,
    "priority": 1,
    "action": { "type": "block" },
    "condition": {
      "urlFilter": "*://www.googleadservices.com/*",
      "resourceTypes": ["script", "image", "sub_frame", "xmlhttprequest"]
    }
  },
  {
    "id": 10,
    "priority": 1,
    "action": { "type": "block" },
    "condition": {
      "urlFilter": "*://www.facebook.com/tr/*",
      "resourceTypes": ["script", "image", "xmlhttprequest"]
    }
  },
  {
    "id": 11,
    "priority": 1,
    "action": { "type": "block" },
    "condition": {
      "urlFilter": "*://connect.facebook.net/*/fbevents.js",
      "resourceTypes": ["script"]
    }
  },
  {
    "id": 20,
    "priority": 2,
    "action": { "type": "block" },
    "condition": {
      "urlFilter": "*://cdn.taboola.com/*",
      "resourceTypes": ["script", "image", "sub_frame"]
    }
  },
  {
    "id": 21,
    "priority": 2,
    "action": { "type": "block" },
    "condition": {
      "urlFilter": "*://widgets.outbrain.com/*",
      "resourceTypes": ["script", "image", "sub_frame"]
    }
  },
  {
    "id": 22,
    "priority": 2,
    "action": { "type": "block" },
    "condition": {
      "urlFilter": "*://trc.taboola.com/*",
      "resourceTypes": ["script", "image", "xmlhttprequest"]
    }
  },
  {
    "id": 30,
    "priority": 3,
    "action": { "type": "block" },
    "condition": {
      "urlFilter": "*://bat.bing.com/*",
      "resourceTypes": ["script", "image", "xmlhttprequest"]
    }
  },
  {
    "id": 31,
    "priority": 3,
    "action": { "type": "block" },
    "condition": {
      "urlFilter": "*://ad.doubleclick.net/*",
      "resourceTypes": ["script", "image", "sub_frame", "xmlhttprequest"]
    }
  },
  {
    "id": 32,
    "priority": 3,
    "action": { "type": "block" },
    "condition": {
      "urlFilter": "*://stats.g.doubleclick.net/*",
      "resourceTypes": ["script", "image", "xmlhttprequest"]
    }
  },
  {
    "id": 40,
    "priority": 4,
    "action": { "type": "block" },
    "condition": {
      "urlFilter": "*://popads.net/*",
      "resourceTypes": ["script", "sub_frame", "main_frame"]
    }
  },
  {
    "id": 41,
    "priority": 4,
    "action": { "type": "block" },
    "condition": {
      "urlFilter": "*://popcash.net/*",
      "resourceTypes": ["script", "sub_frame", "main_frame"]
    }
  },
  {
    "id": 50,
    "priority": 5,
    "action": { "type": "block" },
    "condition": {
      "urlFilter": "||ads.*",
      "resourceTypes": ["script", "image", "sub_frame"]
    }
  },
  {
    "id": 51,
    "priority": 5,
    "action": { "type": "block" },
    "condition": {
      "urlFilter": "||adserver.*",
      "resourceTypes": ["script", "image", "sub_frame"]
    }
  }
]`,

  'background.js': `/**
 * KataAd Background Service Worker
 * Handles extension state and blocked request counting
 * Author: Pantane
 */

let blockedCount = 0;

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ 
    enabled: true,
    blockedCount: 0
  });
  console.log('KataAd installed successfully');
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'getState') {
    chrome.storage.local.get(['enabled', 'blockedCount'], (result) => {
      sendResponse({
        enabled: result.enabled ?? true,
        blockedCount: result.blockedCount ?? 0
      });
    });
    return true;
  }
  
  if (message.action === 'toggleState') {
    chrome.storage.local.get(['enabled'], (result) => {
      const newState = !result.enabled;
      chrome.storage.local.set({ enabled: newState });
      
      chrome.declarativeNetRequest.updateEnabledRulesets({
        enableRulesetIds: newState ? ['ruleset_1'] : [],
        disableRulesetIds: newState ? [] : ['ruleset_1']
      });
      
      sendResponse({ enabled: newState });
    });
    return true;
  }
  
  if (message.action === 'resetCount') {
    blockedCount = 0;
    chrome.storage.local.set({ blockedCount: 0 });
    sendResponse({ success: true });
    return true;
  }
});

chrome.declarativeNetRequest.onRuleMatchedDebug?.addListener((info) => {
  blockedCount++;
  chrome.storage.local.set({ blockedCount });
});

setInterval(async () => {
  try {
    const rules = await chrome.declarativeNetRequest.getMatchedRules();
    if (rules.rulesMatchedInfo) {
      const newCount = rules.rulesMatchedInfo.length;
      if (newCount > blockedCount) {
        blockedCount = newCount;
        chrome.storage.local.set({ blockedCount });
      }
    }
  } catch (e) {}
}, 5000);`,

  'popup.html': `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>KataAd</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      width: 280px;
      padding: 20px;
      font-family: 'Segoe UI', system-ui, sans-serif;
      background: linear-gradient(180deg, #0a0f1c 0%, #060a14 100%);
      color: #e2e8f0;
    }
    .header { display: flex; align-items: center; gap: 12px; margin-bottom: 20px; }
    .logo {
      width: 40px; height: 40px;
      background: linear-gradient(135deg, #00d9ff, #00a3cc);
      border-radius: 10px;
      display: flex; align-items: center; justify-content: center;
      font-weight: bold; color: #0a0f1c; font-size: 18px;
    }
    .title {
      font-size: 20px; font-weight: 700;
      background: linear-gradient(135deg, #00d9ff, #00a3cc);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    }
    .subtitle { font-size: 11px; color: #64748b; }
    .status-card {
      background: rgba(15, 23, 42, 0.8);
      border: 1px solid rgba(0, 217, 255, 0.2);
      border-radius: 12px; padding: 16px; margin-bottom: 16px;
    }
    .status-row { display: flex; justify-content: space-between; align-items: center; }
    .status-label { font-size: 13px; color: #94a3b8; }
    .status-value { font-size: 14px; font-weight: 600; display: flex; align-items: center; gap: 6px; }
    .status-dot { width: 8px; height: 8px; border-radius: 50%; background: #22c55e; }
    .status-dot.disabled { background: #ef4444; }
    .stats-card {
      background: rgba(15, 23, 42, 0.8);
      border: 1px solid rgba(0, 217, 255, 0.1);
      border-radius: 12px; padding: 16px; text-align: center; margin-bottom: 16px;
    }
    .stats-number { font-size: 32px; font-weight: 700; color: #00d9ff; line-height: 1; }
    .stats-label { font-size: 12px; color: #64748b; margin-top: 4px; }
    .toggle-btn {
      width: 100%; padding: 12px; border: none; border-radius: 10px;
      font-size: 14px; font-weight: 600; cursor: pointer; transition: all 0.2s;
    }
    .toggle-btn.enabled {
      background: linear-gradient(135deg, #00d9ff, #00a3cc); color: #0a0f1c;
    }
    .toggle-btn.enabled:hover { transform: scale(1.02); box-shadow: 0 4px 20px rgba(0, 217, 255, 0.3); }
    .toggle-btn.disabled { background: rgba(239, 68, 68, 0.2); color: #ef4444; border: 1px solid rgba(239, 68, 68, 0.3); }
    .toggle-btn.disabled:hover { background: rgba(239, 68, 68, 0.3); }
    .footer { margin-top: 16px; text-align: center; font-size: 11px; color: #475569; }
    .footer a { color: #00d9ff; text-decoration: none; }
  </style>
</head>
<body>
  <div class="header">
    <div class="logo">K</div>
    <div>
      <div class="title">KataAd</div>
      <div class="subtitle">Block noise. Keep control.</div>
    </div>
  </div>
  <div class="status-card">
    <div class="status-row">
      <span class="status-label">Status</span>
      <span class="status-value">
        <span class="status-dot" id="statusDot"></span>
        <span id="statusText">Enabled</span>
      </span>
    </div>
  </div>
  <div class="stats-card">
    <div class="stats-number" id="blockedCount">0</div>
    <div class="stats-label">Ads Blocked This Session</div>
  </div>
  <button class="toggle-btn enabled" id="toggleBtn">🛡️ Protection Active</button>
  <div class="footer">Built by <a href="#">Pantane</a></div>
  <script src="popup.js"></script>
</body>
</html>`,

  'popup.js': `/**
 * KataAd Popup Script
 * Handles UI updates and communication with background
 * Author: Pantane
 */

document.addEventListener('DOMContentLoaded', () => {
  const statusDot = document.getElementById('statusDot');
  const statusText = document.getElementById('statusText');
  const blockedCount = document.getElementById('blockedCount');
  const toggleBtn = document.getElementById('toggleBtn');

  function updateUI(state) {
    if (state.enabled) {
      statusDot.classList.remove('disabled');
      statusText.textContent = 'Enabled';
      toggleBtn.className = 'toggle-btn enabled';
      toggleBtn.textContent = '🛡️ Protection Active';
    } else {
      statusDot.classList.add('disabled');
      statusText.textContent = 'Disabled';
      toggleBtn.className = 'toggle-btn disabled';
      toggleBtn.textContent = '⚠️ Enable Protection';
    }
    blockedCount.textContent = state.blockedCount.toLocaleString();
  }

  chrome.runtime.sendMessage({ action: 'getState' }, updateUI);

  toggleBtn.addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'toggleState' }, (response) => {
      chrome.runtime.sendMessage({ action: 'getState' }, updateUI);
    });
  });

  setInterval(() => {
    chrome.runtime.sendMessage({ action: 'getState' }, updateUI);
  }, 1000);
});`
};

// Generate icon SVG as data URL
export const generateIconSvg = (size: number): string => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
    <defs>
      <linearGradient id="shieldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#00d9ff"/>
        <stop offset="100%" stop-color="#00a3cc"/>
      </linearGradient>
      <linearGradient id="innerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0f172a"/>
        <stop offset="100%" stop-color="#0a0f1c"/>
      </linearGradient>
    </defs>
    <path d="${size === 16 
      ? 'M8 1 L14 3.2 L14 7.2 C14 11.2 10.4 14.4 8 15.2 C5.6 14.4 2 11.2 2 7.2 L2 3.2 Z'
      : size === 48 
        ? 'M24 3 L42 9 L42 21.6 C42 33.6 31.2 43.2 24 45.6 C16.8 43.2 6 33.6 6 21.6 L6 9 Z'
        : 'M64 8 L112 24 L112 57.6 C112 89.6 83.2 115.2 64 121.6 C44.8 115.2 16 89.6 16 57.6 L16 24 Z'
    }" fill="url(#shieldGradient)"/>
    <path d="${size === 16 
      ? 'M8 2.5 L12.5 4.1 L12.5 7.2 C12.5 10.4 9.8 13 8 13.7 C6.2 13 3.5 10.4 3.5 7.2 L3.5 4.1 Z'
      : size === 48 
        ? 'M24 7.5 L37.5 12.3 L37.5 21.6 C37.5 31.2 29.4 39 24 41.1 C18.6 39 10.5 31.2 10.5 21.6 L10.5 12.3 Z'
        : 'M64 20 L100 32.8 L100 57.6 C100 83.2 78.4 104 64 109.6 C49.6 104 28 83.2 28 57.6 L28 32.8 Z'
    }" fill="url(#innerGradient)"/>
    <text x="50%" y="${size === 16 ? '62%' : '58%'}" text-anchor="middle" dominant-baseline="middle" 
          font-family="Arial, sans-serif" font-weight="bold" 
          font-size="${size === 16 ? 7 : size === 48 ? 20 : 48}" fill="url(#shieldGradient)">K</text>
  </svg>`;
  return `data:image/svg+xml;base64,${btoa(svg)}`;
};

// Convert SVG to PNG using canvas
export const svgToPng = async (svgDataUrl: string, size: number): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Could not get canvas context'));
        return;
      }
      ctx.drawImage(img, 0, 0, size, size);
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error('Could not create blob'));
        }
      }, 'image/png');
    };
    img.onerror = reject;
    img.src = svgDataUrl;
  });
};
