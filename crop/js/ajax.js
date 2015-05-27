Cropster.Extend('Ajax', function(url, data, callbacks) {
    var req;
    if (window.XMLHttpRequest) { // Mozilla, Safari, ...
        req = new XMLHttpRequest();
    } else if (window.ActiveXObject) { // IE 8 and older
        req = new ActiveXObject("Microsoft.XMLHTTP");
    }

    this.url = url;
    this.data = data;
    this.callbacks = callbacks;

    this.set = function(url, data, callbacks) {
        this.url = url;
        this.data = data;
        this.callbacks = callbacks;
    };

    this.request = function() {
        if(!this.callbacks || !this.url || !this.data) {
            return;
        }

        var callbacks = this.callbacks;
        var url = this.url;
        var data = this.data;

        req.open('POST', url, true);
        req.send(data);

        req.onreadystatechange = function() {
            // if done
            if(req.readyState == 4) {
                // if success
                if(req.status == 200) {
                    callbacks.success(JSON.parse(req.responseText));
                }
                // else
                else {
                    callbacks.error(req.responseText);
                }
            }
        }
    };
});