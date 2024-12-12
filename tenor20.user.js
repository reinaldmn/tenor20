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

    const TENOR_API_KEY = "YOUR_TENOR_API_KEY_HERE"; // Replace with your Tenor API key

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

    // Toggle the GIF search popup
    function toggleGifSearchPopup() {
        const existingPopup = $('.gif-search-popup');
        if (existingPopup.length) {
            existingPopup.remove(); // Close the popup if it's already open
            return;
        }

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

    // Initialize the script
    $(document).ready(function () {
        addGifButton();
    });
})();
