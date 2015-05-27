Cropster.Extend('Stage', function(element) {
    if(!element) {
        element = Cropster.Settings.selectors.stage;
    }

    var _self = this;

    this.layers = false;
    this.stage = new Kinetic.Stage({
        container: document.querySelector(element)
    });

    this.resize = function() {
        _self.stage.width(0);
        _self.stage.height(0);

        _self.stage.width(_self.stage.container().clientWidth - 20);
        _self.stage.height(window.innerHeight - 20);

        return {
            width: _self.stage.container().parentNode.innerWidth,
            height: window.innerHeight
        };
    };

    this.addLayer = function(name) {
        if(!this.layers) {
            this.layers = {};
        }

        var l = new Kinetic.Layer({
            name: name || ''
        });

        this.layers[name] = l;

        this.stage.add(l);

        return l;
    };

    this.addObject = function(object, layer, draw) {
        if(!this.layers) {
            var l = this.addLayer(layer);
        }

        if(layer && !l) {
            l = this.layers[layer];

            if(!l) {
                l = this.addLayer(layer);
            }
        }
        else if(!layer && !l) {
            l = this.layers['default'];
        }
    
        l.add(object);

        if(draw) {
            this.draw();
        }
    };

    this.clearLayer = function(layer) {
        if(!layer) {
            layer = 'default';
        }

        try {
            if(this.layers[layer]) {
                this.layers[layer].clear();
                this.draw();
            }
        }
        catch(ex) {
            console.log(ex);
        }
    };

    this.resetLayer = function(layer) {
        if(!layer) {
            layer = 'default'
        }

        try {
            if(this.layers[layer]) {
                this.layers[layer].removeChildren();
                this.stage.draw();
            }
        }
        catch(ex) {
            console.log(ex);
        }
    };

    this.getWidth = function() {
        return _self.stage.width();
    };

    this.getHeight = function() {
        return _self.stage.height();
    };

    this.getCenter = function() {
        return {
            x: this.getWidth()/2,
            y: this.getHeight()/2
        };
    };

    this.getLayer = function(layer) {
        if(!layer || !this.layers[layer]) {
            layer = 'default';
        }

        return this.layers[layer];
    };

    this.getContext = function(layer) {
        return this.getLayer(layer).canvas.getContext('2d');
    };

    this.draw = function() {
        if(this.layers['crop']) {
            this.layers['crop'].moveToTop();
        }
        this.stage.draw();
    };

    this.addLayer('default');
    this.resize();

    window.addEventListener('resize', this.resize, false);
});

Cropster.Extend('Paint', {
    fit: function(image, resize, maxWidth, maxHeight) {
        var ratio = image.getWidth() / image.getHeight();

        if( maxWidth ) {
            var width = Math.min( maxWidth, image.getWidth() );
            var height = width / ratio;
        }
        else if( this.Stage.getWidth() < image.getWidth() ) {
            var width = Math.min( this.Stage.getWidth(), image.getWidth() );
            var height = width / ratio;
        }

        if( maxHeight ) {
            var height = Math.min( maxHeight, image.getHeight() );
            var width = width / ratio;
        }
        else if( this.Stage.getHeight() < image.getHeight() ) {
            var height = Math.min( this.Stage.getHeight(), image.getHeight() );
            var width = width / ratio;
        }

        if(resize) {
            image.width(width);
            image.height(height);
        }

        return {
            width: width,
            height: height
        }
    },
    center: function(object) {
        var x = this.Stage.getWidth()/2;
        var y = this.Stage.getHeight()/2;
    },
    init: function() {
        var _this = this;

        this.Stage = new Cropster.Stage();
        this.hasImage = false;
        this.image = null;
        
        Cropster.Image.onload = function(dataURL) {
            var img = new Cropster.ImageObject(dataURL, function(image) {

                _this.reset('image');
                _this.fit(image.image, true);

                _this.createMask();
                _this.group = new Kinetic.Group({name: 'image'});
                
                _this.image = image.image;

                _this.group.add(image.image);
                _this.group.add(_this.overlay);

                _this.Stage.addObject(_this.group, 'image', true);

                _this.hasImage = true;

                if(_this.cropper) {
                    _this.cropper.disable();
                }
            });
        }
    },
    createMask: function() {
        this.overlay = new Kinetic.Rect({
            width: this.Stage.getWidth(),
            height: this.Stage.getHeight(),
            fill: 'rgba(0, 0, 0, .6)'
        });
        this.overlay.hide();
    },
    mask: function() {
        this.overlay.moveToTop();
        this.overlay.show();
        this.group.find('.image').moveToBottom();
        this.draw();
    },
    getImage: function() {
        if(this.image) {
            return this.image;
        }
        return false;
    },
    getImageData: function(layer, x, y, w, h) {
        var context = this.Stage.getContext(layer);
        var pixelData = null;

        if(x && y && w && h) {
            pixelData = context.getImageData(x, y, w, h).data;
        }
        else {
            pixelData = context.getImageData(0, 0, this.Stage.getWidth(), this.Stage.getHeight()).data;
        }

        var pixels = new Cropster.PixelArray(pixelData);
        return pixels;
    },
    draw: function() {
        this.Stage.draw();
    },
    clear: function(layer) {
        this.Stage.clearLayer(layer);
        if(this.cropper) {
            this.cropper.disable();
        }
    },
    reset: function(layer) {
        this.Stage.resetLayer(layer);
        if(this.cropper) {
            this.cropper.disable();
        }
    },
    crop: function(layer) {
        if(!this.cropper) {
            this.cropper = new Cropster.Cropper();
        }

        this.cropper.enable();
    },
    applyAction: function() {
        if(this.applyCurrentAction && typeof this.applyCurrentAction == 'function') {
            this.applyCurrentAction();
        }
    },
    cancelAction: function() {
        if(this.resetCurrentAction && typeof this.resetCurrentAction == 'function') {
            this.resetCurrentAction();
        }
    }
});

Cropster.DOMReady.enqueue(function() {
    Cropster.Paint.init();
});