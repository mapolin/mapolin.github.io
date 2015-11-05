var StoryTeller = (function () {
    function StoryTeller(_codes, container) {
        this.openInteger = false;
        this.openComment = false;
        this.openString = false;
        this.prevAsterisk = false;
        this.prevSlash = false;
        this.__js = false;
        this.elements = {
            style: '',
            script: '',
            code: ''
        };
        this.writing_rate = 16;
        this._id = Math.abs(Date.now() * Math.random());
        if (!container) {
            container = document.getElementsByTagName('body')[0];
        }
        this.$body = container;
        this.elements.style = 'style-elem-' + this._id;
        this.elements.script = 'script-elem-' + this._id;
        this.elements.code = 'code-elem-' + this._id;
        this._codes = _codes;
        this.buildMarkup();
        this.getMarkup();
    }
    Object.defineProperty(StoryTeller.prototype, "codes", {
        get: function () {
            return this._codes;
        },
        set: function (codes) {
            if (codes.length > 0) {
                this._codes = codes;
            }
        },
        enumerable: true,
        configurable: true
    });
    StoryTeller.prototype.reset = function () {
        this.$style_elem.innerHTML = '';
        this.$code_pre.innerHTML = '';
        this.$script_area.innerHTML = '';
    };
    StoryTeller.prototype.Run = function () {
        this.reset();
        this.writeChars(this._codes[0], 0, this.writing_rate);
    };
    StoryTeller.prototype.buildMarkup = function () {
        var _style_elem = this.createElement("style", this.elements.style);
        var _code_pre = this.createElement("pre", this.elements.code);
        var _script_area = this.createElement("div", this.elements.script);
        this.$body.appendChild(_style_elem);
        this.$body.appendChild(_code_pre);
        this.$body.appendChild(_script_area);
    };
    StoryTeller.prototype.getMarkup = function () {
        this.$style_elem = document.getElementById(this.elements.style);
        this.$code_pre = document.getElementById(this.elements.code);
        this.$script_area = document.getElementById(this.elements.script);
    };
    StoryTeller.prototype.createElement = function (tag, id) {
        if (id === void 0) { id = ''; }
        var el;
        el = document.createElement(tag);
        if (id) {
            el.id = id;
        }
        return el;
    };
    StoryTeller.prototype.scriptSyntax = function (string, which) {
        var s;
        if (this.openInteger && !which.match(/[0-9\.]/) && !this.openString && !this.openComment) {
            s = string.replace(/([0-9\.]*)$/, "<em class=\"int\">$1</em>" + which);
        }
        else if (which === '*' && !this.openComment && this.prevSlash) {
            this.openComment = true;
            s = string + which;
        }
        else if (which === '/' && this.openComment && this.prevAsterisk) {
            this.openComment = false;
            s = string.replace(/(\/[^(\/)]*\*)$/, "<em class=\"comment\">$1/</em>");
        }
        else if (which === 'r' && !this.openComment && string.match(/[\n ]va$/)) {
            s = string.replace(/va$/, "<em class=\"var\">var</em>");
        }
        else if (which.match(/[\!\=\-\?]$/) && !this.openString && !this.openComment) {
            s = string + "<em class=\"operator\">" + which + "</em>";
        }
        else if (which === "(" && !this.openString && !this.openComment) {
            s = string.replace(/(\.)?(?:([^\.\n]*))$/, "$1<em class=\"method\">$2</em>(");
        }
        else if (which === '"' && !this.openComment) {
            s = this.openString ? string.replace(/(\"[^"\\]*(?:\\.[^"\\]*)*)$/, "<em class=\"string\">$1\"</em>") : string + which;
        }
        else if (which === "~" && !this.openComment) {
            s = string + "<em class=\"run-command\">" + which + "</em>";
        }
        else {
            s = string + which;
        }
        return s;
    };
    StoryTeller.prototype.styleSyntax = function (string, which) {
        var crazy_reghex, preformatted_string, s;
        if (this.openInteger && !which.match(/[0-9\.\%pxems]/) && !this.openString && !this.openComment) {
            preformatted_string = string.replace(/([0-9\.\%pxems]*)$/, "<em class=\"int\">$1</em>");
        }
        else {
            preformatted_string = string;
        }
        if (which === '*' && !this.openComment && this.prevSlash) {
            this.openComment = true;
            s = preformatted_string + which;
        }
        else if (which === '/' && this.openComment && this.prevAsterisk) {
            this.openComment = false;
            s = preformatted_string.replace(/(\/[^(\/)]*\*)$/, "<em class=\"comment\">$1/</em>");
        }
        else if (which === ':') {
            s = preformatted_string.replace(/([a-zA-Z- ^\n]*)$/, '<em class="key">$1</em>:');
        }
        else if (which === ';') {
            crazy_reghex = /((#[0-9a-zA-Z]{6})|#(([0-9a-zA-Z]|\<em class\=\"int\"\>|\<\/em\>){12,14}|([0-9a-zA-Z]|\<em class\=\"int\"\>|\<\/em\>){8,10}))$/;
            if (preformatted_string.match(crazy_reghex)) {
                s = preformatted_string.replace(crazy_reghex, '<em class="hex">$1</em>;');
            }
            else {
                s = preformatted_string.replace(/([^:]*)$/, '<em class="value">$1</em>;');
            }
        }
        else if (which === '{') {
            s = preformatted_string.replace(/(.*)$/, '<em class="selector">$1</em>{');
        }
        else {
            s = preformatted_string + which;
        }
        return s;
    };
    StoryTeller.prototype.writeChar = function (which) {
        var char, code_html, prior_block_match, prior_comment_match, script_tag;
        if (which === "`") {
            which = "";
            this.__js = !this.__js;
        }
        if (this.__js) {
            if (which === "~" && !this.openComment) {
                script_tag = this.createElement("script");
                prior_comment_match = /(?:\*\/([^\~]*))$/;
                prior_block_match = /([^~]*)$/;
                if (this._code_block.match(prior_comment_match)) {
                    script_tag.innerHTML = this._code_block.match(prior_comment_match)[0].replace("*/", "") + "\n\n";
                }
                else {
                    script_tag.innerHTML = this._code_block.match(prior_block_match)[0] + "\n\n";
                }
                this.$script_area.innerHTML = "";
                this.$script_area.appendChild(script_tag);
            }
            char = which;
            code_html = this.scriptSyntax(this.$code_pre.innerHTML, char);
        }
        else {
            char = which === "~" ? "" : which;
            this.$style_elem.innerHTML += char;
            code_html = this.styleSyntax(this.$code_pre.innerHTML, char);
        }
        this.prevAsterisk = which === "*";
        this.prevSlash = (which === "/") && !this.openComment;
        this.openInteger = which.match(/[0-9]/) || (this.openInteger && which.match(/[\.\%pxems]/)) ? true : false;
        if (which === '"') {
            this.openString = !this.openString;
        }
        this._code_block += which;
        return this.$code_pre.innerHTML = code_html;
    };
    StoryTeller.prototype.writeChars = function (message, index, interval) {
        var _self = this;
        if (index < message.length) {
            if (!interval)
                interval = this.writing_rate;
            this.$code_pre.scrollTop = this.$code_pre.scrollHeight;
            this.writeChar(message[index++]);
            return setTimeout((function () {
                return _self.writeChars(message, index, interval);
            }), interval);
        }
    };
    return StoryTeller;
})();
