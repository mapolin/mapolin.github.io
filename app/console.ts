import {Component, bootstrap} from 'angular2/angular2';

@Component({
    selector: 'console',
    template: `
        <p>ways to contact me:</p>
        <p>email -> <a href="mailto:mapanogg@gmail.com">mapanogg@gmail.com</a> or <a href="mailto:martin.atzinov@gmail.com">martin.atzinov@gmail.com</a></p>
        <p>linkedin -> <a href="http://bg.linkedin.com/in/martinatzinov">bg.linkedin.com/in/martinatzinov</a> <span class="cursor"></span></p>
    `
})

class ConsoleComponent {
    constructor() {
        document.addEventListener('keyup', function(event) {
            if(event.keyCode == 192) {
                document.querySelector('.console').classList.toggle('active');
            }
        }, false);
    }
}

bootstrap(ConsoleComponent);