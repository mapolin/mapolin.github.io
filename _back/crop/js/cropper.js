Cropster.Extend('Cropper', function() {
    var _this = this;

    var ajax = new Cropster.Ajax();

    this.group = new Kinetic.Group({
        draggable: true
    });

    this.overlay = new Kinetic.Group({
        name: 'overlay'
    });

    this.area = {
        x: 0,
        y: 0,
        width: 0,
        height: 0
    };

    this.controls = [
        {
            name: 'topLeft',
            width: 25,
            height: 25,
            fill: 'rgba(140,140,140,.4)',
            draggable: true
        },
        {
            name: 'topRight',
            width: 25,
            height: 25,
            fill: 'rgba(140,140,140,.4)',
            draggable: true
        },
        {
            name: 'bottomLeft',
            width: 25,
            height: 25,
            fill: 'rgba(140,140,140,.4)',
            draggable: true
        },
        {
            name: 'bottomRight',
            width: 25,
            height: 25,
            fill: 'rgba(140,140,140,.4)',
            draggable: true
        }
    ];

    this.drawGrid = function(gridX, gridY, width, height, size) {
        this.grid = new Kinetic.Group({
            name: 'grid'
        });
        // set line width/height
        var lineWidth = 3;
        var lineHeight = 3;

        // calculate space between horizontal lines
        var h_space = width/(size-1);

        // calculate space between vertical lines
        var v_space = height/(size-1);

        // draw vertical lines
        for(var i = 0; i < size; i++) {
            var x = i * h_space - ((i == 0) ? 0 : lineWidth/2);
                x += gridX;

            var line = new Kinetic.Line({
                points: [x, gridY, x, gridY + height - lineWidth],
                strokeWidth: lineWidth,
                stroke: 'rgba(140, 140, 140, .6)',
                lineCap: 'square'
            });

            this.grid.add(line);
        }

        // draw horizontal lines
        for(var i = 0; i < size; i++) {
            var y = i * v_space - ((i == 0) ? 0 : lineHeight/2);
                y += gridY;

            var line = new Kinetic.Line({
                points: [gridX, y, gridX + width - lineHeight, y],
                strokeWidth: lineHeight,
                stroke: 'rgba(140, 140, 140, .6)',
                lineCap: 'square'
            });

            this.grid.add(line);
        }

        this.grid.add(new Kinetic.Rect({
            x: gridX,
            y: gridY,
            width: width,
            height: height,
            fill: 'rgba(0,0,0,0)'
        }));

        return this.grid;
    }

    this.update = function(control) {
        var topRight = this.group.find('.topRight')[0],
            bottomRight = this.group.find('.bottomRight')[0],
            topLeft = this.group.find('.topLeft')[0],
            bottomLeft = this.group.find('.bottomLeft')[0];

        var x = control.x();
        var y = control.y();

        switch(control.getName()) {
            case 'topLeft':
                topRight.y(y);
                bottomLeft.x(x);
                break;
            case 'topRight':
                topLeft.y(y);
                bottomRight.x(x);
                break;
            case 'bottomRight':
                bottomLeft.y(y);
                topRight.x(x); 
                break;
            case 'bottomLeft':
                bottomRight.y(y);
                topLeft.x(x); 
                break;
            default: return;
        }

        this.group.find('.grid').remove();

        var width = topRight.x() - topLeft.x();
        var height = bottomLeft.y() - topLeft.y();

        this.area = {
            x: x + 1.5,
            y: y + 1.5,
            width: width + control.getWidth() - 1,
            height: height + control.getHeight() - 1
        };

        this.overlay.setClip(this.area);

        var grid = this.drawGrid(topLeft.x()+1.5, topLeft.y()+1.5, width+control.getWidth()-1.5, height+control.getHeight()-1.5, 4);

        this.group.add(grid);
        
        grid.moveToBottom();

        Cropster.Paint.draw();
    };

    this.position = function(x, y, width, height) {
        var topRight = this.group.find('.topRight')[0],
            bottomRight = this.group.find('.bottomRight')[0],
            topLeft = this.group.find('.topLeft')[0],
            bottomLeft = this.group.find('.bottomLeft')[0];

        var grid = this.drawGrid(x, y, width, height, 4);

        this.group.find('.grid').remove();
        this.group.add(grid);
        grid.moveToBottom();

        this.area = {
            x: x - 1.5,
            y: y - 1.5,
            width: width + 1,
            height: height + 1
        };

        this.overlay.setClip(this.area);

        topRight.position({
            x: x + width - topRight.getWidth(),
            y: y - 1.5
        });

        topLeft.position({
            x: x - 1.5,
            y: y - 1.5
        });

        bottomRight.position({
            x: x + width - bottomRight.getWidth(),
            y: height + y - bottomRight.getHeight()
        });

        bottomLeft.position({
            x: x - 1.5,
            y: height + y - bottomLeft.getHeight()
        });
    };

    this.initCrop = function(size, position) {
        for(var ctrl in this.controls) {
            var ctrl = new Kinetic.Rect(this.controls[ctrl]);

            var x = (ctrl.name() == 'topLeft' || ctrl.name() == 'bottomLeft') ? position.x : size.width - ctrl.getWidth();
            var y = (ctrl.name() == 'topLeft' || ctrl.name() == 'topRight') ? position.y : size.height - ctrl.getHeight();

            ctrl.position({
                x: x,
                y: y
            });

            ctrl.on('dragmove', function() {
                _this.update(this);
            });
            ctrl.on('mousedown touchstart', function() {
                _this.group.setDraggable(false);
                this.moveToTop();
            });
            ctrl.on('dragend', function() {
                _this.group.setDraggable(true);
            });
            // add hover styling
            ctrl.on('mouseover', function() {
                var layer = this.getLayer();
                document.body.style.cursor = 'resize';
                this.setFill('rgba(140,140,140,.9)');
                layer.draw();
            });
            ctrl.on('mouseout', function() {
                _this.group.setDraggable(true);
                var layer = this.getLayer();
                document.body.style.cursor = 'default';
                this.setFill('rgba(140,140,140,.6)');
                layer.draw();
            });

            this.group.add(ctrl);

            ctrl.moveToTop();
        }
    };

    this.blackOut = function() {
        Cropster.Paint.mask();
    };

    this.createOverlay = function() {
        if(Cropster.Paint.hasImage) {
            this.fake = Cropster.Paint.getImage().clone({name: 'image'});
            this.overlay.find('.image').remove();
            this.fake.show();
            this.overlay.add(this.fake);
        }
    };

    this.enable = function() {
        var center = Cropster.Paint.Stage.getCenter(),
            width = Cropster.Paint.Stage.getWidth()/4,
            height = Cropster.Paint.Stage.getHeight()/4

        this.position(center.x, center.y, width, height);

        this.createOverlay();

        if(Cropster.Paint.hasImage) {
            this.blackOut();
        }

        this.group.show();
        Cropster.Paint.draw();

        Cropster.Paint.applyCurrentAction = function() {
            _this.doCrop();
        };

        Cropster.Paint.cancelCurrentAction = function() {
            _this.disable();
        };
    };

    this.disable = function() {
        this.group.hide();
        Cropster.Paint.draw();
    };

    this.doCrop = function() {
        this.cropped = this.fake.toDataURL({
            x: this.area.x,
            y: this.area.y,
            width: this.area.width,
            height: this.area.height
        });

        ajax.set('/toImage', this.cropped, {
            success: function(data) {
                console.log(data);
            },
            error: function(error) {
                console.log(error);
            }
        });
        ajax.request();
    };

    this.initCrop({width: 0, height: 0}, {x: 0, y: 0});

    this.group.on('dragmove', function() {
        _this.area.x = this.x() + this.find('.topLeft')[0].x();
        _this.area.y = this.y() + this.find('.topLeft')[0].y();

        _this.overlay.setClip(_this.area);
    });

    Cropster.Paint.Stage.addLayer('crop');
    Cropster.Paint.Stage.addObject(this.overlay, 'crop');
    Cropster.Paint.Stage.addObject(this.group, 'crop');
});