// ==UserScript==
// @name         YouTube Music Library -> Playlists (Violentmonkey Fix)
// @namespace    http://tampermonkey.net/
// @version      2.0
// @description  Force redirects /library to /library/playlists on YouTube Music
// @author       Senior Solution Architect
// @match        https://music.youtube.com/*
// @run-at       document-end
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function checkAndRedirect() {
        // Check if we are exactly on the library landing page
        if (location.pathname === '/library' || location.pathname === '/library/') {
            // Use replace() to avoid messing up your Back button history
            location.replace('/library/playlists');
        }
    }

    // 1. Listen for YouTube's internal navigation event (Best method for YTM)
    window.addEventListener('yt-navigate-finish', checkAndRedirect);

    // 2. Listen for standard browser history changes (Back/Forward buttons)
    window.addEventListener('popstate', checkAndRedirect);

    // 3. Fallback Interval (The "Hammer")
    // Checks every 500ms to catch any edge cases where events fail.
    setInterval(checkAndRedirect, 500);

    // 4. Initial check
    checkAndRedirect();

})();
