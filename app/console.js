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
var ConsoleComponent = (function () {
    function ConsoleComponent() {
        document.addEventListener('keyup', function (event) {
            if (event.keyCode == 192) {
                document.querySelector('.console').classList.toggle('active');
            }
        }, false);
    }
    ConsoleComponent = __decorate([
        angular2_1.Component({
            selector: 'console',
            template: "\n        <p>ways to contact me:</p>\n        <p>email -> <a href=\"mailto:mapanogg@gmail.com\">mapanogg@gmail.com</a> or <a href=\"mailto:martin.atzinov@gmail.com\">martin.atzinov@gmail.com</a></p>\n        <p>linkedin -> <a href=\"http://bg.linkedin.com/in/martinatzinov\">bg.linkedin.com/in/martinatzinov</a> <span class=\"cursor\"></span></p>\n    "
        }), 
        __metadata('design:paramtypes', [])
    ], ConsoleComponent);
    return ConsoleComponent;
})();
angular2_1.bootstrap(ConsoleComponent);
