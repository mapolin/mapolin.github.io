var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var angular2_1 = require('angular2/angular2');
var AppComponent = (function () {
    function AppComponent() {
        this.story = [];
        this.TellerText = "\n    /*\n     * Hello there....\n     * I converted Jake Albaugh's script to TypeScript and merged it with angular 2.0...\n     * How cool is that, huh?\n     *\n     * Link to his awesome work: http://codepen.io/jakealbaugh/pen/JoVrdw\n     *\n     * ... lets try it out?\n     *\n     *\n    */\n\n    * {\n        transition: all .5s ease-out;\n        box-sizing: border-box;\n    }\n\n    body {\n        color: #fefefe;\n        background: #000;\n        font-family: Calibri;\n        font-weight: 400;\n        font-size: 16px;\n        width: 100%;\n        height: 100%;\n        min-height: 100%;\n        overflow: hidden;\n    }\n\n    /*\n     * Lets make sure this text doesn't go all over the place, shall we?\n     */\n    .story-teller-view pre {\n        position: absolute;\n        top: 5%;\n        width: 50%;\n        left: 50%;\n        transform: translate(-50%, 0);\n        z-index: 10;\n        max-height: 80%;\n        overflow: auto;\n        margin: 0;\n        padding: 10px;\n        border: 1px solid rgba(255, 255, 255, .3);\n        box-shadow: 1px 1px 3px rgba(255, 255, 255, .2);\n        background-color: #111111;\n    }\n\n    /*\n     * Now that's better, but we will need some additional styling\n     */\n    pre {\n        color: #fefefe;\n        text-shadow: 1px 1px 0px rgba(0, 0, 0, .1);\n    }\n\n    pre em:not(.comment) { font-style: normal; }\n\n    .comment       { color: #75715e; }\n    .selector      { color: #a6da27; }\n    .selector.key  { color: #a6da27; }\n    .selector.int  { color: #a6da27; }\n    .key           { color: #64d9ef; }\n    .int           { color: #fd971c; }\n    .hex           { color: #f92772; }\n    .hex.int       { color: #f92772; }\n    .value         { color: #fefefe; }\n    .var           { color: #66d9e0; }\n    .operator      { color: #f92772; }\n    .string        { color: #d2cc70; }\n    .method        { color: #f9245c; }\n    .run-command   { color: #ae81ff; }\n\n    ~`\n    /*\n     * So far so good... everything is copied from his example.\n     * Since this is an Angular app, \n     * let's write some angular code and see if that works...\n     */\n\n    /* First we will need an element to convert into a component */\n    var section = document.createElement(\"section\");\n        section.classList.add(\"angular-example\");\n\n    document.body.appendChild( section ); ~\n\n    `\n    /* Hmmmm.... there should be a box on the left now... */\n    .story-teller-view pre {\n        right: 3%;\n        left: auto;\n        width: 45%;\n        transform: none;\n    }\n\n    .angular-example {\n        position: absolute;\n        left: 3%;\n        top: 5%;\n        width: 45%;\n        max-height: 80%;\n        height: 80%;\n        padding: 10px;\n        border: 1px solid rgba(255, 255, 255, .3);\n        box-shadow: 1px 1px 3px rgba(255, 255, 255, .2);\n        background-color: #111111;\n    }\n\n    /* \n     * Now that's better.. moving on\n     */\n\n    ~`\n    /* \n     * Let's take the example from Angular's website and try to implement it, ok?\n     * First thing's first, we have to import angular...\n     */\n\n    System.import(\"angular2/angular2\").then(function(obj) {\n        angular = obj;\n\n        /* \n         * The \"angular\" part is quiet easy, just copy-paste from the demo...\n         */\n        function Service() {};\n\n        Service.prototype.greeting = function() {\n            return \"Hello\";\n        };\n\n        var App = angular.\n            Component({\n                selector: \"section\",\n                bindings: [Service]\n            }).\n            View({\n                template: \n                    '<div>{{greeting.text}} world!</div>' +\n                    '<div><input [(ng-model)]=\"greeting.text\" type=\"text\" /></div>',\n                    \n                directives: [angular.FORM_DIRECTIVES]\n            }).\n            Class({\n                constructor: [Service, function App(service) {\n                    this.greeting = {\n                        text: ''\n                    };\n\n                    this.greeting.text = service.greeting();\n                }]\n            });\n\n        angular.bootstrap(App);\n\n    }); ~\n    \n    `\n\n    /* \n     * If everything went well\n     * you should be able to experience the awesomeness of angular's\n     * two-way data binding.\n     */\n\n\n\n    /*\n     * Wanna see something cool? It's the new trend in CSS animations.\n     * Here comes the css\n     */\n\n    .bomb {\n        position: absolute;\n        width: 100%;\n        height: 100%;\n        z-index: 999;\n        background: rgba(0,0,0,.7);\n\n        display: -webkit-box;\n        display: -webkit-flex;\n        display: -ms-flexbox;\n        display: flex;\n\n        -webkit-box-align: center;\n        -webkit-align-items: center;\n        -ms-flex-align: center;\n        align-items: center;\n\n        -webkit-box-pack: center;\n        -webkit-justify-content: center;\n        -ms-flex-pack: center;\n        justify-content: center;\n    }\n    .bomb:after {\n        font-size: 300px;\n        content: \"BOOM! .... CLICK ME\";\n        display: block;\n        color: red;\n        text-align: center;\n        -webkit-animation: explosion 10s linear infinite reverse;\n                animation: explosion 10s linear infinite reverse;\n        -webkit-transition: background, color .1s ease;\n                transition: background, color .1s ease;\n    }\n\n    ~`\n    /* \n     * And now the funky animation CSS...\n     *\n     *\n     *\n     *\n     * I lied... writing it would be extremely boring right now\n     * so instead I included it in the head of our page.\n     * \n     *\n     * Take a look, if you can...\n     *\n     *\n     * So far so good, \n     * lets add that bomb to our dom and see what happens\n     */\n\n    var bomb = document.createElement(\"div\");\n        bomb.classList.add(\"bomb\");\n\n    document.body.appendChild( bomb ); ~\n    `\n\n    ~`\n    /* \n     * Don't worry, to remove the bomb just click it...\n     */\n    \n    var elem = document.querySelector(\".bomb\");\n    \n    elem.addEventListener(\"click\", function() {\n        this.style.display = \"none\";\n    }, false); ~\n\n    `\n\n    /*\n     *\n     *\n     *\n     *\n     *\n     *\n     *\n     *\n     *\n     *\n     *\n     * If you want to contact me, press tilde! \n     */\n    ";
        this.teller = new StoryTeller([this.TellerText], document.querySelector('.story-teller-view'));
        window.onload = this.teller.Run.call(this.teller);
    }
    AppComponent = __decorate([
        angular2_1.Component({
            selector: 'story-teller',
            template: "\n        <div class=\"story-teller-view\"></div>\n    ",
            directives: [angular2_1.FORM_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
})();
angular2_1.bootstrap(AppComponent);
