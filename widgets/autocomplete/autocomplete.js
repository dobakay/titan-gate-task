var autocomplete = (function($) {
    var self = {
        _autocompleteElement: null,
        _input: null,
        _dataList: null,
        _focus: null
    };

    self.init = function (id, dataList) {
        // append html to element
        self._autocompleteElement = $('#' + id);
        self._autocompleteElement.load("./widgets/autocomplete/autocomplete.html", function () {
            instantiateInnerVariables(dataList);
            attachHandlers();
        });
    };

    function instantiateInnerVariables(dataList) {
        self._input = self._autocompleteElement.find('#autocomplete-input');
        self._dropdown = self._autocompleteElement.find('#autocomplete-items');
        self._dataList = dataList;

        populateDropdown();
        self._dropdown.hide();
    }

    function attachHandlers() {
        // add event listener for keypress of the input
        self._input.on('input', populateDropdown);
        self._input.on('keydown', navigateThroughDropdown);
        $(document).on('click', documentClickCheck);
    }

    function populateDropdown() {
        closeDropdown();
        for (i = 0; i < self._dataList.length; i++) {
            if (self._dataList[i].substr(0, self._input.val().length).toUpperCase() == self._input.val().toUpperCase()) {
                var match = $('<div></div>');
                var matchContents = "<strong>" + self._dataList[i].substr(0, self._input.val().length) + "</strong>";
                matchContents += self._dataList[i].substr(self._input.val().length);
                match.html(matchContents);
                match.on('click', function (e) {
                    insertAutocompleteValue(e.originalEvent.target.innerText);
                });
                self._dropdown.append(match);

                //highlight first match and set focus
                if (!self._focus || self._focus.length === 0) {
                    self._focus = match.addClass('autocomplete-active');
                }
            }
        }
        openDropdown();
    };

    function navigateThroughDropdown(e) {
        if (e.keyCode == 40) {
            /*arrow DOWN key is pressed*/
            setSuggestionFocus(true);
        } else if (e.keyCode == 38) {
            /*arrow UP key is pressed*/
            setSuggestionFocus(false);
        } else if (e.keyCode == 13) {
            /*ENTER key is pressed*/
            e.preventDefault();
            insertAutocompleteValue(self._focus[0].innerText);
        }
    };

    function setSuggestionFocus(navigateFlag) {
        if(navigateFlag) { // going down the list
            if(self._focus.next().length) { // check if suggestion is at start of list
                self._focus.removeClass('autocomplete-active');
                self._focus = self._focus.next();
                self._focus.addClass('autocomplete-active');
                animateScroll(navigateFlag);
            }
        } else if(!navigateFlag &&
            typeof navigateFlag != 'undefined' &&
            navigateFlag !== null) { // going up the list

            if (self._focus.prev().length) { // check if suggestion is at end of list
                self._focus.removeClass('autocomplete-active');
                self._focus = self._focus.prev();
                self._focus.addClass('autocomplete-active');
                animateScroll(navigateFlag);
            }
        }
    };

    function animateScroll(navigateFlag) {
        //scrolling only if needed
        if(navigateFlag) {
            var dropdownBottom = self._dropdown.offset().top + self._dropdown.height();
            if(dropdownBottom < self._focus.offset().top) {
                self._dropdown.animate({
                    scrollTop: self._focus.offset().top
                }, 300);
            }
        } else if (!navigateFlag &&
            typeof navigateFlag != 'undefined' &&
            navigateFlag !== null) {
            if(self._dropdown.offset().top > self._focus.offset().top) {
                self._dropdown.animate({
                    scrollTop: self._focus.offset().top
                }, 300);
            }
        }
    }

    function insertAutocompleteValue(value) {
        self._input.val(value);
        closeDropdown();
    };

    function closeDropdown() {
        self._dropdown.hide();
        self._dropdown.empty();
        self._focus = null;
    };

    function openDropdown() {
        self._dropdown.show();
    }

    function documentClickCheck(e) {
        if(e.target !== self._input.parent()[0]) {
            closeDropdown();
        }
    }

    return self;
})(jQuery);