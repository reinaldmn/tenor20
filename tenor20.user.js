// ==UserScript==
// @name         Roll20 GIF Button with Tenor
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Adds a GIF search button to Roll20 chat using Tenor.
// @author       Your Name
// @match        https://app.roll20.net/editor/
// @grant        GM_xmlhttpRequest
// @require      https://code.jquery.com/jquery-3.6.0.min.js
// ==/UserScript==

(function () {
    'use strict';

    
    // IMPORTANT!!! Replace with your Tenor API key
    const TENOR_API_KEY = "YOUR_TENOR_API_KEY_HERE"; 

    
    // Add the GIF button to the chat interface
    function addGifButton() {
        const chatControls = $('#textchat-input');
        const sendButton = chatControls.find('button:contains("Send")');

        if (!chatControls.find('.gif-btn').length) {
            const gifButton = $('<button>', {
                class: 'btn btn-default gif-btn',
                title: 'Search for GIFs',
                text: 'GIF'
            }).css({
                marginLeft: '5px',
                height: sendButton.outerHeight(),
                padding: '0 10px',
                cursor: 'pointer'
            });

            gifButton.on('click', function (e) {
                e.stopPropagation(); // Prevent triggering the "Send" button behavior
                toggleGifSearchPopup();
            });

            sendButton.after(gifButton);
        }
    }

// Add this function after the 'use strict' statement
function getThemeColors() {
    // Check if body has dark theme class
    const isDarkMode = document.body.classList.contains('dark');
    return {
        background: isDarkMode ? '#1a1a1a' : '#fff',
        text: isDarkMode ? '#ffffff' : '#000000',
        border: isDarkMode ? '#444' : '#ccc',
        inputBackground: isDarkMode ? '#2d2d2d' : '#fff',
        buttonBackground: isDarkMode ? '#383838' : '#f0f0f0'
    };
}
    
function toggleGifSearchPopup() {
    const existingPopup = $('.gif-search-popup');
    if (existingPopup.length) {
        existingPopup.remove();
        return;
    }

    const colors = getThemeColors();
    
    const popup = $('<div>', { class: 'gif-search-popup' }).css({
        position: 'absolute',
        bottom: '60px',
        right: '10px',
        width: '300px',
        height: '400px',
        background: colors.background,
        border: `1px solid ${colors.border}`,
        borderRadius: '5px',
        zIndex: 9999,
        overflow: 'hidden',
        boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
        color: colors.text
    });

    const searchInput = $('<input>', { type: 'text', placeholder: 'Search GIFs...' }).css({
        width: 'calc(100% - 120px)',
        margin: '10px',
        padding: '5px',
        display: 'inline-block',
        background: colors.inputBackground,
        color: colors.text,
        border: `1px solid ${colors.border}`,
        borderRadius: '3px'
    });

    const searchButton = $('<button>', { text: 'Search' }).css({
        display: 'inline-block',
        margin: '10px 10px 10px 0',
        padding: '5px 10px',
        cursor: 'pointer',
        height: '29px',
        background: colors.buttonBackground,
        color: colors.text,
        border: `1px solid ${colors.border}`,
        borderRadius: '3px'
    });

    const loadingIndicator = $('<div>', { text: 'Loading...', class: 'loading-indicator' }).css({
        display: 'none',
        textAlign: 'center',
        marginTop: '10px',
        fontStyle: 'italic',
        color: colors.text
    });

        const popup = $('<div>', { class: 'gif-search-popup' }).css({
            position: 'absolute',
            bottom: '60px',
            right: '10px',
            width: '300px',
            height: '400px',
            background: '#fff',
            border: '1px solid #ccc',
            borderRadius: '5px',
            zIndex: 9999,
            overflow: 'hidden',
            boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
        });

        const searchInput = $('<input>', { type: 'text', placeholder: 'Search GIFs...' }).css({
            width: 'calc(100% - 120px)',
            margin: '10px',
            padding: '5px',
            display: 'inline-block'
        });

        const searchButton = $('<button>', { text: 'Search' }).css({
            display: 'inline-block',
            margin: '10px 10px 10px 0',
            padding: '5px 10px',
            cursor: 'pointer',
            height: '17px',
            border: '1px solid #ccc',
            borderRadius: '5px'
        });

        const loadingIndicator = $('<div>', { text: 'Loading...', class: 'loading-indicator' }).css({
            display: 'none',
            textAlign: 'center',
            marginTop: '10px',
            fontStyle: 'italic',
            color: '#666'
        });

        const gifContainer = $('<div>', { class: 'gif-container' }).css({
            overflowY: 'auto',
            height: 'calc(100% - 100px)',
            padding: '5px'
        });

        popup.append(searchInput, searchButton, loadingIndicator, gifContainer);
        $('body').append(popup);

        // Trigger search on button click
        searchButton.on('click', function () {
            const query = searchInput.val().trim();
            if (query.length > 0) {
                searchGifs(query, gifContainer, loadingIndicator);
            }
        });

        // Trigger search on Enter key
        searchInput.on('keypress', function (e) {
            if (e.which === 13) { // Enter key code
                const query = searchInput.val().trim();
                if (query.length > 0) {
                    searchGifs(query, gifContainer, loadingIndicator);
                }
            }
        });

        // Close popup if clicked outside
        $(document).on('click', function (e) {
            if (!$(e.target).closest('.gif-search-popup, .gif-btn').length) {
                popup.remove();
            }
        });
    }

// Search for GIFs using Tenor API
function searchGifs(query, container, loader) {
    container.empty();
    loader.show();

    const searchUrl = `https://tenor.googleapis.com/v2/search?q=${encodeURIComponent(query)}&key=${TENOR_API_KEY}&limit=10`;

    GM_xmlhttpRequest({
        method: 'GET',
        url: searchUrl,
        onload: function (response) {
            loader.hide();

            const data = JSON.parse(response.responseText);

            if (data.results && data.results.length > 0) {
                data.results.forEach(gif => {
                    const gifUrl = gif.media_formats.gif.url;

                    const gifElement = $('<img>', {
                        src: gif.media_formats.tinygif.url,
                        alt: gif.content_description,
                        title: gif.content_description,
                        css: {
                            width: '100%',
                            marginBottom: '10px',
                            cursor: 'pointer'
                        }
                    });

                    gifElement.on('click', function () {
                        const chatInput = $('#textchat-input textarea');
                        chatInput.val(`${chatInput.val()} [gif](${gifUrl})`);
                        chatInput.focus();
                        $(container).closest('.gif-search-popup').remove(); // Close the popup immediately
                    });

                    container.append(gifElement);
                });
            } else {
                container.append('<p>No GIFs found. Try a different search term.</p>');
            }
        },
        onerror: function () {
            loader.hide();
            container.append('<p>Error loading GIFs. Please try again later.</p>');
        }
    });
}

// Add theme observer
function setupThemeObserver() {
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.target.classList &&
                (mutation.oldValue?.includes('dark') !== mutation.target.classList.contains('dark'))) {
                // Theme has changed, update existing popup if it exists
                const existingPopup = $('.gif-search-popup');
                if (existingPopup.length) {
                    const colors = getThemeColors();
                    existingPopup.css({
                        background: colors.background,
                        border: `1px solid ${colors.border}`,
                        color: colors.text
                    });
                    
                    existingPopup.find('input').css({
                        background: colors.inputBackground,
                        color: colors.text,
                        border: `1px solid ${colors.border}`
                    });
                    
                    existingPopup.find('button').css({
                        background: colors.buttonBackground,
                        color: colors.text,
                        border: `1px solid ${colors.border}`
                    });
                    
                    existingPopup.find('.loading-indicator').css({
                        color: colors.text
                    });
                }
            }
        });
    });

    observer.observe(document.body, {
        attributes: true,
        attributeFilter: ['class'],
        attributeOldValue: true
    });
}

// Initialize the script
$(document).ready(function () {
    addGifButton();
    setupThemeObserver();
});


// Initialize the script
$(document).ready(function () {
    addGifButton();
});
})();
