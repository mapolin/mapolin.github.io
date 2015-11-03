Cropster.Extend('ToolBox', {
    init: function() {
        this.controls = document.querySelectorAll(Cropster.Settings.tools.selector);
        for(var ctrl = 0; ctrl < this.controls.length; ctrl++) {
            var action = this.controls[ctrl].getAttribute('data-bind');
            var tool = this.controls[ctrl];
            this.bind(action.toLowerCase(), tool);
        }

        this.apply = document.querySelector(Cropster.Settings.tools.apply);
        this.cancel = document.querySelector(Cropster.Settings.tools.cancel);

        this.apply.addEventListener('click', function(e) {
            e.preventDefault();

            Cropster.Paint.applyAction();
        }, false);
        this.cancel.addEventListener('click', function(e) {
            e.preventDefault();
            
            Cropster.Paint.cancelAction();
        }, false);
    },
    bind: function(action, trigger) {
        if(Cropster.Paint[action] && typeof Cropster.Paint[action] == 'function') {
            trigger.addEventListener('click', function(e) {
                e.preventDefault();

                Cropster.Paint[action](this.getAttribute('data-layer'));

            }, false);
        }
    }
});

Cropster.DOMReady.enqueue(function() {
    Cropster.ToolBox.init();
});