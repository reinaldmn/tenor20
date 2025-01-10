// ==UserScript==
// @name         Roll20 GIF Button with Tenor
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Adds a GIF search button to Roll20 chat using Tenor.
// @author       Your Name
// @match        https://app.roll20.net/editor/*
// @match        https://roll20.net/editor/*
// @match        https://app.roll20.net/editor
// @match        https://roll20.net/editor
// @grant        GM_xmlhttpRequest
// @require      https://code.jquery.com/jquery-3.6.0.min.js
// ==/UserScript==

/* global $, GM_xmlhttpRequest */
(function ($) {
    'use strict';

    const TENOR_API_KEY = "AIzaSyBTkzaOvxfD1sWCoLvcwwqch7vAYI4hQJY";

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
                e.stopPropagation();
                toggleGifSearchPopup();
            });

            sendButton.after(gifButton);
        }
    }

    function toggleGifSearchPopup() {
        const existingPopup = $('.gif-search-popup');
        if (existingPopup.length) {
            existingPopup.remove();
            return;
        }

        const popup = $('<div>', { class: 'gif-search-popup' }).css({
            position: 'absolute',
            bottom: '60px',
            right: '10px',
            width: '400px', // Changed from 600px
            height: '400px',
            background: '#2c2c2c',
            border: '1px solid #444',
            borderRadius: '5px',
            zIndex: 9999,
            overflow: 'hidden',
            boxShadow: '0 2px 10px rgba(0,0,0,0.4)',
            color: '#ffffff'
        });

        const searchInput = $('<input>', {
            type: 'text',
            placeholder: 'Search GIFs...',
            class: 'gif-search-input'
        }).css({
            width: 'calc(100% - 120px)',
            margin: '10px',
            padding: '5px',
            display: 'inline-block',
            background: '#383838',
            color: '#ffffff',
            border: '1px solid #444',
            borderRadius: '3px'
        });

        const searchButton = $('<button>', {
            text: 'Search',
            class: 'gif-search-button'
        }).css({
            display: 'inline-block',
            margin: '10px 10px 10px 0',
            padding: '5px 10px',
            cursor: 'pointer',
            height: '29px',
            background: '#404040',
            color: '#ffffff',
            border: '1px solid #444',
            borderRadius: '3px'
        });

        const loadingIndicator = $('<div>', {
            text: 'Loading...',
            class: 'loading-indicator'
        }).css({
            display: 'none',
            textAlign: 'center',
            marginTop: '10px',
            fontStyle: 'italic',
            color: '#ffffff'
        });

        const gifContainer = $('<div>', { class: 'gif-container' }).css({
            overflowY: 'auto',
            height: 'calc(100% - 100px)',
            padding: '5px',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '5px',
            color: '#ffffff'
        });

        popup.append(searchInput, searchButton, loadingIndicator, gifContainer);
        $('body').append(popup);

        searchButton.on('click', function () {
            const query = searchInput.val().trim();
            if (query.length > 0) {
                searchGifs(query, gifContainer, loadingIndicator);
            }
        });

        searchInput.on('keypress', function (e) {
            if (e.which === 13) {
                const query = searchInput.val().trim();
                if (query.length > 0) {
                    searchGifs(query, gifContainer, loadingIndicator);
                }
            }
        });

        $(document).on('click', function (e) {
            if (!$(e.target).closest('.gif-search-popup, .gif-btn').length) {
                popup.remove();
            }
        });
    }

    function searchGifs(query, container, loader) {
        container.empty();
        loader.show();

        const searchUrl = `https://tenor.googleapis.com/v2/search?q=${encodeURIComponent(query)}&key=${TENOR_API_KEY}&limit=24`;

        GM_xmlhttpRequest({
            method: 'GET',
            url: searchUrl,
            onload: function (response) {
                loader.hide();
                const data = JSON.parse(response.responseText);

                if (data.results && data.results.length > 0) {
                    data.results.forEach(gif => {
                        const gifUrl = gif.media_formats.gif.url;
                        const gifElement = $('<div>').css({
                            width: '100%',
                            position: 'relative',
                            paddingBottom: '75%', // Changed from 100%
                            overflow: 'hidden'
                        });

                        const img = $('<img>', {
                            src: gif.media_formats.tinygif.url,
                            alt: gif.content_description,
                            title: gif.content_description
                        }).css({
                            position: 'absolute',
                            top: '0',
                            left: '0',
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            cursor: 'pointer'
                        });

                        gifElement.append(img);

                        img.on('click', function () {
                            const chatInput = $('#textchat-input textarea');
                            chatInput.val(`${chatInput.val()} [gif](${gifUrl})`);
                            chatInput.focus();
                            $(container).closest('.gif-search-popup').remove();
                        });

                        container.append(gifElement);
                    });
                } else {
                    container.append($('<p>').text('No GIFs found. Try a different search term.').css('color', '#ffffff'));
                }
            },
            onerror: function () {
                loader.hide();
                container.append($('<p>').text('Error loading GIFs. Please try again later.').css('color', '#ffffff'));
            }
        });
    }

    function initializeScript() {
        if ($('#textchat-input').length) {
            addGifButton();
        } else {
            setTimeout(initializeScript, 1000);
        }
    }

    $(document).ready(initializeScript);
})(window.jQuery);
