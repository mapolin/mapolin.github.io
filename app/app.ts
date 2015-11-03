import {Component, bootstrap, FORM_DIRECTIVES} from 'angular2/angular2';

@Component({
    selector: 'story-teller',
    template: `
        <div class="story-teller-view"></div>
    `,
    directives: [FORM_DIRECTIVES]
})

class AppComponent {
    public teller: any;
    public story: Array<any> = [];
        
    private TellerText: any = `
    /*
     * Hello there....
     * I converted Jake Albaugh's script to TypeScript and merged it with angular 2.0...
     * How cool is that, huh?
     *
     * Link to his awesome work: http://codepen.io/jakealbaugh/pen/JoVrdw
     *
     * ... lets try it out?
     *
     *
    */

    * {
        transition: all .5s ease-out;
        box-sizing: border-box;
    }

    body {
        color: #fefefe;
        background: #000;
        font-family: Calibri;
        font-weight: 400;
        font-size: 16px;
        width: 100%;
        height: 100%;
        min-height: 100%;
        overflow: hidden;
    }

    /*
     * Lets make sure this text doesn't go all over the place, shall we?
     */
    .story-teller-view pre {
        position: absolute;
        top: 5%;
        width: 50%;
        left: 50%;
        transform: translate(-50%, 0);
        z-index: 10;
        max-height: 80%;
        overflow: auto;
        margin: 0;
        padding: 10px;
        border: 1px solid rgba(255, 255, 255, .3);
        box-shadow: 1px 1px 3px rgba(255, 255, 255, .2);
        background-color: #111111;
    }

    /*
     * Now that's better, but we will need some additional styling
     */
    pre {
        color: #fefefe;
        text-shadow: 1px 1px 0px rgba(0, 0, 0, .1);
    }

    pre em:not(.comment) { font-style: normal; }

    .comment       { color: #75715e; }
    .selector      { color: #a6da27; }
    .selector.key  { color: #a6da27; }
    .selector.int  { color: #a6da27; }
    .key           { color: #64d9ef; }
    .int           { color: #fd971c; }
    .hex           { color: #f92772; }
    .hex.int       { color: #f92772; }
    .value         { color: #fefefe; }
    .var           { color: #66d9e0; }
    .operator      { color: #f92772; }
    .string        { color: #d2cc70; }
    .method        { color: #f9245c; }
    .run-command   { color: #ae81ff; }

    ~\`
    /*
     * So far so good... everything is copied from his example.
     * Since this is an Angular app, 
     * let's write some angular code and see if that works...
     */

    /* First we will need an element to convert into a component */
    var section = document.createElement("section");
        section.classList.add("angular-example");

    document.body.appendChild( section ); ~

    \`
    /* Hmmmm.... there should be a box on the left now... */
    .story-teller-view pre {
        right: 3%;
        left: auto;
        width: 45%;
        transform: none;
    }

    .angular-example {
        position: absolute;
        left: 3%;
        top: 5%;
        width: 45%;
        max-height: 80%;
        height: 80%;
        padding: 10px;
        border: 1px solid rgba(255, 255, 255, .3);
        box-shadow: 1px 1px 3px rgba(255, 255, 255, .2);
        background-color: #111111;
    }

    /* 
     * Now that's better.. moving on
     */

    ~\`
    /* 
     * Let's take the example from Angular's website and try to implement it, ok?
     * First thing's first, we have to import angular...
     */

    System.import("angular2/angular2").then(function(obj) {
        angular = obj;

        /* 
         * The "angular" part is quiet easy, just copy-paste from the demo...
         */
        function Service() {};

        Service.prototype.greeting = function() {
            return "Hello";
        };

        var App = angular.
            Component({
                selector: "section",
                bindings: [Service]
            }).
            View({
                template: 
                    '<div>{{greeting.text}} world!</div>' +
                    '<div><input [(ng-model)]="greeting.text" type="text" /></div>',
                    
                directives: [angular.FORM_DIRECTIVES]
            }).
            Class({
                constructor: [Service, function App(service) {
                    this.greeting = {
                        text: ''
                    };

                    this.greeting.text = service.greeting();
                }]
            });

        angular.bootstrap(App);

    }); ~
    
    \`

    /* 
     * If everything went well
     * you should be able to experience the awesomeness of angular's
     * two-way data binding.
     */



    /*
     * Wanna see something cool? It's the new trend in CSS animations.
     * Here comes the css
     */

    .bomb {
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 999;
        background: rgba(0,0,0,.7);

        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;

        -webkit-box-align: center;
        -webkit-align-items: center;
        -ms-flex-align: center;
        align-items: center;

        -webkit-box-pack: center;
        -webkit-justify-content: center;
        -ms-flex-pack: center;
        justify-content: center;
    }
    .bomb:after {
        font-size: 300px;
        content: "BOOM! .... CLICK ME";
        display: block;
        color: red;
        text-align: center;
        -webkit-animation: explosion 10s linear infinite reverse;
                animation: explosion 10s linear infinite reverse;
        -webkit-transition: background, color .1s ease;
                transition: background, color .1s ease;
    }

    ~\`
    /* 
     * And now the funky animation CSS...
     *
     *
     *
     *
     * I lied... writing it would be extremely boring right now
     * so instead I included it in the head of our page.
     * 
     *
     * Take a look, if you can...
     *
     *
     * So far so good, 
     * lets add that bomb to our dom and see what happens
     */

    var bomb = document.createElement("div");
        bomb.classList.add("bomb");

    document.body.appendChild( bomb ); ~
    \`

    ~\`
    /* 
     * Don't worry, to remove the bomb just click it...
     */
    
    var elem = document.querySelector(".bomb");
    
    elem.addEventListener("click", function() {
        this.style.display = "none";
    }, false); ~

    \`

    /*
     *
     *
     *
     *
     *
     *
     *
     *
     *
     *
     *
     * If you want to contact me, press tilde! 
     */
    `;

    constructor() {
        this.teller = new StoryTeller([this.TellerText], document.querySelector('.story-teller-view'));

        window.onload = this.teller.Run.call(this.teller);
    }
}
bootstrap(AppComponent);