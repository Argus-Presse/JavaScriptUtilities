/*
 * Plugin Name: Lightbox
 * Version: 0.3
 * Plugin URL: https://github.com/Darklg/JavaScriptUtilities
 * JavaScriptUtilities Lightbox may be freely distributed under the MIT license.
 * Required: Vanilla Events, Vanilla Selectors, Vanilla Classes
 */

var vanillaLightbox = function(settings) {
    var self = this;
    self.els = {
        box: false,
        filter: false,
        content: false
    };
    self.defaultSettings = {};
    self.init = function(settings) {
        self.getSettings(settings);
        self.setElements();
        self.setEvents();
    };
    self.setElements = function() {
        var els = self.els;
        // Create box
        els.box = document.createElement("div")
            .addClass('lightbox')
            .addClass('fluid-lightbox')
            .addClass('lb-is-hidden');
        // Create filter
        els.filter = document.createElement("div")
            .addClass('lightbox-filter');
        els.box.appendChild(els.filter);
        // Create content
        els.content = document.createElement("div")
            .addClass('lightbox-content');
        els.box.appendChild(els.content);
        // Inject lightbox
        document.body.appendChild(els.box);
    };
    self.setEvents = function() {
        var keyPressed;
        self.els.filter.addEvent('click', self.close);
        window.addEvent(window, 'keydown', function(e) {
            // Close on echap
            keyPressed = e.keyCode ? e.keyCode : e.charCode;
            if (keyPressed === 27) {
                self.close();
            }
        });
    };
    self.setCloseBtn = function() {
        var btns = self.els.content.getElementsByClassName('btn-close');
        for (var btn in btns) {
            if (typeof btns[btn] == 'object' && 'addEvent' in btns[btn]) {
                btns[btn].addEvent('click', self.close);
            }
        }
    };
    self.setContent = function(content) {
        self.els.content.innerHTML = content;
        self.setCloseBtn();
    };
    self.open = function() {
        self.els.box.removeClass('lb-is-hidden');
    };
    self.close = function(e) {
        if (e) {
            window.eventPreventDefault(e);
        }
        self.els.box.addClass('lb-is-hidden');
    };
    self.init(settings);
    return self;
};

vanillaLightbox.prototype.getSettings = function(settings) {
    var self = this;
    self.settings = {};
    // Set default values
    for (var attr in self.defaultSettings) {
        if (self.defaultSettings.hasOwnProperty(attr)) {
            self.settings[attr] = self.defaultSettings[attr];
        }
    }
    // Set new values
    for (var attr2 in settings) {
        if (self.settings.hasOwnProperty(attr2)) {
            self.settings[attr2] = settings[attr2];
        }
    }
};