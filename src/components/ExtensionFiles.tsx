import React, { useState } from 'react';
import { FileJson, FileCode, FileText, ChevronDown, ChevronRight, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

const files = [
  {
    name: "manifest.json",
    icon: FileJson,
    language: "json",
    content: `{
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
  },
  {
    name: "rules.json",
    icon: FileJson,
    language: "json",
    content: `[
  // ==========================================
  // GOOGLE ADS & DOUBLECLICK
  // Priority 1: Highest priority for major ad networks
  // ==========================================
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
  
  // ==========================================
  // FACEBOOK ADS & TRACKING
  // Priority 1: Block Facebook advertising pixels
  // ==========================================
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
  
  // ==========================================
  // CONTENT RECOMMENDATION NETWORKS
  // Priority 2: Block Taboola, Outbrain, etc.
  // ==========================================
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
  
  // ==========================================
  // TRACKING PIXELS & ANALYTICS (except first-party)
  // Priority 3: Block common third-party trackers
  // ==========================================
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
  
  // ==========================================
  // POP-UP & REDIRECT ADS
  // Priority 4: Block common pop-up ad networks
  // ==========================================
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
  
  // ==========================================
  // GENERIC AD PATTERNS
  // Priority 5: Catch-all patterns for common ad URLs
  // ==========================================
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
  },
  {
    name: "background.js",
    icon: FileCode,
    language: "javascript",
    content: `/**
 * KataAd Background Service Worker
 * Handles extension state and blocked request counting
 * Author: Pantane
 */

// Track blocked requests per session
let blockedCount = 0;

// Initialize extension state on install
chrome.runtime.onInstalled.addListener(() => {
  // Set default state: enabled
  chrome.storage.local.set({ 
    enabled: true,
    blockedCount: 0
  });
  
  console.log('KataAd installed successfully');
});

// Listen for messages from popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'getState') {
    // Return current state to popup
    chrome.storage.local.get(['enabled', 'blockedCount'], (result) => {
      sendResponse({
        enabled: result.enabled ?? true,
        blockedCount: result.blockedCount ?? 0
      });
    });
    return true; // Keep channel open for async response
  }
  
  if (message.action === 'toggleState') {
    // Toggle extension enabled/disabled
    chrome.storage.local.get(['enabled'], (result) => {
      const newState = !result.enabled;
      chrome.storage.local.set({ enabled: newState });
      
      // Enable or disable the ruleset
      chrome.declarativeNetRequest.updateEnabledRulesets({
        enableRulesetIds: newState ? ['ruleset_1'] : [],
        disableRulesetIds: newState ? [] : ['ruleset_1']
      });
      
      sendResponse({ enabled: newState });
    });
    return true;
  }
  
  if (message.action === 'resetCount') {
    // Reset blocked count
    blockedCount = 0;
    chrome.storage.local.set({ blockedCount: 0 });
    sendResponse({ success: true });
    return true;
  }
});

// Track blocked requests (MV3 compatible way)
// Note: declarativeNetRequest doesn't provide per-request callbacks in MV3
// We use the matched rules count instead
chrome.declarativeNetRequest.onRuleMatchedDebug?.addListener((info) => {
  blockedCount++;
  chrome.storage.local.set({ blockedCount });
});

// Fallback: Update count periodically from matched rules
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
  } catch (e) {
    // API may not be available in all contexts
  }
}, 5000);`,
  },
  {
    name: "popup.html",
    icon: FileText,
    language: "html",
    content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>KataAd</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      width: 280px;
      padding: 20px;
      font-family: 'Segoe UI', system-ui, sans-serif;
      background: linear-gradient(180deg, #0a0f1c 0%, #060a14 100%);
      color: #e2e8f0;
    }
    
    .header {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 20px;
    }
    
    .logo {
      width: 40px;
      height: 40px;
      background: linear-gradient(135deg, #00d9ff, #00a3cc);
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      color: #0a0f1c;
      font-size: 18px;
    }
    
    .title {
      font-size: 20px;
      font-weight: 700;
      background: linear-gradient(135deg, #00d9ff, #00a3cc);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    
    .subtitle {
      font-size: 11px;
      color: #64748b;
    }
    
    .status-card {
      background: rgba(15, 23, 42, 0.8);
      border: 1px solid rgba(0, 217, 255, 0.2);
      border-radius: 12px;
      padding: 16px;
      margin-bottom: 16px;
    }
    
    .status-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .status-label {
      font-size: 13px;
      color: #94a3b8;
    }
    
    .status-value {
      font-size: 14px;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    
    .status-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #22c55e;
    }
    
    .status-dot.disabled {
      background: #ef4444;
    }
    
    .stats-card {
      background: rgba(15, 23, 42, 0.8);
      border: 1px solid rgba(0, 217, 255, 0.1);
      border-radius: 12px;
      padding: 16px;
      text-align: center;
      margin-bottom: 16px;
    }
    
    .stats-number {
      font-size: 32px;
      font-weight: 700;
      color: #00d9ff;
      line-height: 1;
    }
    
    .stats-label {
      font-size: 12px;
      color: #64748b;
      margin-top: 4px;
    }
    
    .toggle-btn {
      width: 100%;
      padding: 12px;
      border: none;
      border-radius: 10px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
    }
    
    .toggle-btn.enabled {
      background: linear-gradient(135deg, #00d9ff, #00a3cc);
      color: #0a0f1c;
    }
    
    .toggle-btn.enabled:hover {
      transform: scale(1.02);
      box-shadow: 0 4px 20px rgba(0, 217, 255, 0.3);
    }
    
    .toggle-btn.disabled {
      background: rgba(239, 68, 68, 0.2);
      color: #ef4444;
      border: 1px solid rgba(239, 68, 68, 0.3);
    }
    
    .toggle-btn.disabled:hover {
      background: rgba(239, 68, 68, 0.3);
    }
    
    .footer {
      margin-top: 16px;
      text-align: center;
      font-size: 11px;
      color: #475569;
    }
    
    .footer a {
      color: #00d9ff;
      text-decoration: none;
    }
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
    <div class="stats-label">Ads blocked this session</div>
  </div>
  
  <button class="toggle-btn enabled" id="toggleBtn">
    Disable Blocking
  </button>
  
  <div class="footer">
    Made with ♥ by <a href="#">Pantane</a>
  </div>
  
  <script src="popup.js"></script>
</body>
</html>`,
  },
  {
    name: "popup.js",
    icon: FileCode,
    language: "javascript",
    content: `/**
 * KataAd Popup Script
 * Handles UI interactions and state management
 * Author: Pantane
 */

// DOM Elements
const statusDot = document.getElementById('statusDot');
const statusText = document.getElementById('statusText');
const blockedCountEl = document.getElementById('blockedCount');
const toggleBtn = document.getElementById('toggleBtn');

// Current state
let isEnabled = true;

/**
 * Update UI to reflect current state
 * @param {boolean} enabled - Whether blocking is enabled
 * @param {number} count - Number of blocked requests
 */
function updateUI(enabled, count) {
  isEnabled = enabled;
  
  // Update status indicator
  statusDot.classList.toggle('disabled', !enabled);
  statusText.textContent = enabled ? 'Enabled' : 'Disabled';
  
  // Update blocked count
  blockedCountEl.textContent = count.toLocaleString();
  
  // Update toggle button
  toggleBtn.textContent = enabled ? 'Disable Blocking' : 'Enable Blocking';
  toggleBtn.classList.toggle('enabled', enabled);
  toggleBtn.classList.toggle('disabled', !enabled);
}

/**
 * Get current state from background script
 */
function getState() {
  chrome.runtime.sendMessage({ action: 'getState' }, (response) => {
    if (response) {
      updateUI(response.enabled, response.blockedCount);
    }
  });
}

/**
 * Toggle extension state
 */
function toggleState() {
  chrome.runtime.sendMessage({ action: 'toggleState' }, (response) => {
    if (response) {
      updateUI(response.enabled, parseInt(blockedCountEl.textContent.replace(/,/g, '')));
    }
  });
}

// Event listeners
toggleBtn.addEventListener('click', toggleState);

// Initialize on popup open
getState();

// Poll for updated blocked count
setInterval(getState, 2000);`,
  },
];

const ExtensionFiles: React.FC = () => {
  const [expandedFile, setExpandedFile] = useState<string | null>("manifest.json");
  const [copiedFile, setCopiedFile] = useState<string | null>(null);

  const copyToClipboard = async (content: string, fileName: string) => {
    await navigator.clipboard.writeText(content);
    setCopiedFile(fileName);
    setTimeout(() => setCopiedFile(null), 2000);
  };

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="container relative z-10 px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">
            Extension <span className="text-gradient">Source Code</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Clean, commented, and ready to use. All files you need for the extension.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {files.map((file) => (
            <div
              key={file.name}
              className="glass-card rounded-xl overflow-hidden opacity-0 animate-fade-in"
              style={{ animationDelay: '0.2s' }}
            >
              <button
                onClick={() => setExpandedFile(expandedFile === file.name ? null : file.name)}
                className="w-full flex items-center justify-between p-4 hover:bg-secondary/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <file.icon className="w-5 h-5 text-primary" />
                  <span className="font-mono font-medium">{file.name}</span>
                </div>
                {expandedFile === file.name ? (
                  <ChevronDown className="w-5 h-5 text-muted-foreground" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                )}
              </button>

              {expandedFile === file.name && (
                <div className="border-t border-border">
                  <div className="flex items-center justify-between px-4 py-2 bg-secondary/20">
                    <span className="text-sm text-muted-foreground">{file.language}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(file.content, file.name)}
                      className="gap-2"
                    >
                      {copiedFile === file.name ? (
                        <>
                          <Check className="w-4 h-4" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          Copy
                        </>
                      )}
                    </Button>
                  </div>
                  <pre className="p-4 overflow-x-auto text-sm">
                    <code className="text-foreground/90 font-mono whitespace-pre">
                      {file.content}
                    </code>
                  </pre>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Icons note */}
        <div className="mt-8 max-w-4xl mx-auto glass-card rounded-xl p-6">
          <h4 className="font-bold mb-2">📁 Icons Required</h4>
          <p className="text-muted-foreground text-sm">
            Create an <code className="text-primary">icons/</code> folder with icon16.png, icon48.png, and icon128.png. 
            Use any shield or ad-block themed icon in cyan/teal colors to match the branding.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ExtensionFiles;
