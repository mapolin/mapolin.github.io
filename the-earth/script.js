var container, rendererStats, clicked;
var camera, scene, renderer, mesh, light, controls, clouds, stars, geomap;
var group;
var mouseX = 0, mouseY = 0;
var scale = 0.05;

var center = new THREE.Vector3(0,0,0);
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var zoomInScale = 0.15; // elevate with 15% percent of glove radius above globe surface
var lastTap = 0;

var rendererSize = {
    width: window.innerWidth,
    height: window.innerHeight
};

var windowHalfX = rendererSize.width / 2;
var windowHalfY = rendererSize.height / 2;

var pinGeometry, pinMaterial;

init();
animate();

function init() {

    container = document.getElementById( 'container' );

    camera = new THREE.PerspectiveCamera( 45, rendererSize.width / rendererSize.height, 1, 64000 * scale );
    camera.position.z = 22000 * scale;

    scene = new THREE.Scene();

    scene.add(new THREE.AmbientLight(0xffffff, 0.2));

    light = new THREE.DirectionalLight(0xffffff, 0.2);
    light.castShadow = true;
    light.position.copy(camera.position);
    scene.add(light);

    // earth
    var map = THREE.ImageUtils.loadTexture( 'earth.jpg' );
    map.wrapS = map.wrapT = THREE.RepeatWrapping;
    map.anisotropy = 32;

    var material = new THREE.MeshPhongMaterial({
        map: THREE.ImageUtils.loadTexture('earth_4k.jpg'),
        bumpMap: THREE.ImageUtils.loadTexture('bump_4k.jpg'),
        bumpScale: 5,
        specularMap: THREE.ImageUtils.loadTexture('water_4k.jpg'),
        specular: new THREE.Color('grey')
    });

    var cloudsMaterial = new THREE.MeshPhongMaterial({
        map: THREE.ImageUtils.loadTexture('clouds_4k.png'),
        transparent: true
    });

    var starsMaterial = new THREE.MeshBasicMaterial({
        map: THREE.ImageUtils.loadTexture('galaxy_starfield.png'), 
        side: THREE.BackSide
    })

    var geometry = new THREE.SphereGeometry( 6378 * scale, 50, 50 );
    var cloudsGeometry = new THREE.SphereGeometry( geometry.parameters.radius + 50*scale, 64, 64 );
    var starsGeometry = new THREE.SphereGeometry( geometry.parameters.radius * 4, 64, 64 );

    clouds = new THREE.Mesh( cloudsGeometry, cloudsMaterial );
    mesh = new THREE.GEO.SpatialMap( geometry, material );
    stars = new THREE.Mesh( starsGeometry, starsMaterial );

    mesh.receiveShadow = true;
    mesh.setRadius( 6378 * scale );
    mesh.setTexturesEdgeLongitude( -183.806168 );

    scene.add( mesh );
    scene.add( clouds );
    scene.add( stars );

    if ( ! Detector.webgl ) {
        renderer = new THREE.CanvasRenderer();
    } else {
        renderer = new THREE.WebGLRenderer( { antialias: true } );
    }

    geomap = new THREE.Object3D();
    drawThreeGeo(json, mesh.radius + 10*scale, 'sphere', {});

    geomap.rotation.y = 90 * Math.PI/180;

    scene.add( geomap );

    renderer.shadowMapEnabled = true;
    renderer.shadowMapType = THREE.PCFSoftShadowMap;
    renderer.setClearColor( 0x000000 );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( rendererSize.width, rendererSize.height );
    container.appendChild( renderer.domElement );

    rendererStats = new THREEx.RendererStats()

    rendererStats.domElement.style.position = 'absolute'
    rendererStats.domElement.style.left = '0px'
    rendererStats.domElement.style.top   = '0px'
    document.body.appendChild( rendererStats.domElement )


    controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.rotateSpeed = 0.1;
    controls.zoomSpeed = 0.5;
    controls.noPan = true;
    controls.minDistance = mesh.radius;
    controls.maxDistance = mesh.radius * 4.5;
    controls.addEventListener( 'change', render );

    window.controls = controls;
    //

    window.addEventListener( 'resize', onWindowResize, false );

    renderer.domElement.addEventListener( 'touchend', onWindowDoubleTap, false );
    renderer.domElement.addEventListener( 'touchstart', onWindowTouchMove, false );
    renderer.domElement.addEventListener( 'dblclick', onDblClick, false );

    cachePinMesh();
}

function addPin(lat, lon) {
    var pin = new THREE.Mesh( pinGeometry, pinMaterial );
    var dropPosition = latLngToXYZ(lat, lon);

    pin.scale.set( 0.1, 0.1, 0.1 );

    pin.castShadow = true;
    pin.receiveShadow = true;

    var position = {
        value: 3
    };

    var point = new THREE.Mesh(
        new THREE.SphereGeometry( 1, 5, 5 ),
        new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0 })
    );
    
    mesh.add( point );
    point.add( pin );

    light.position.copy(dropPosition).normalize().multiplyScalar(mesh.radius * 4);
    point.position.copy(dropPosition.clone().normalize().multiplyScalar(mesh.radius));

    renderer.render( scene, camera );

    var pinBox = new THREE.Box3().setFromObject( pin );
    pinSize = pinBox.size().y;

    pin.position.z -= pinSize;
    pin.position.x = -3;
    pin.position.y = 4;

    point.lookAt( center );

    window.pin = pin;

    TweenMax.to(position, 1.5, {
        value: 1,
        onUpdate: function() {
            var newPos = dropPosition.clone().normalize().multiplyScalar(mesh.radius * position.value);

            point.position.copy( newPos );

            pin.position.x = (-3 * position.value);
            pin.position.y = (4 * position.value);

            pin.lookAt( center );
        },
        onComplete: function() {
            
        }
    });
}

function cachePinMesh() {
    var loader = new THREE.STLLoader();
    loader.load( 'pin.stl', function ( geometry ) {
        pinGeometry = geometry;
        pinMaterial = new THREE.MeshPhongMaterial( { color: 0xff5533, specular: 0x111111, shininess: 200 } );
    } );
}

function addGeoPoint(lat, lon) {
    var point = new THREE.Mesh(
        new THREE.SphereGeometry( 5 * scale, 5, 5 ),
        new THREE.MeshBasicMaterial({ color: 'red' })
    );
    
    mesh.add(point);

    point.position.copy( latLngToXYZ(lat, lon) );
}

function latLngToXYZ(lat, lon) {
    var phi   = (90-lat)*(Math.PI/180);
    var theta = (lon+180)*(Math.PI/180);

    x = -((mesh.radius) * Math.sin(phi)*Math.cos(theta));
    z = ((mesh.radius) * Math.sin(phi)*Math.sin(theta));
    y = ((mesh.radius) * Math.cos(phi));

    return new THREE.Vector3(x, y, z);
}

function buildLine( src, dst, colorHex ) {
    var geom = new THREE.Geometry(),
        mat; 

    mat = new THREE.LineBasicMaterial({ linewidth: 3, color: colorHex });

    geom.vertices.push( src.clone() );
    geom.vertices.push( dst.clone() );
    geom.computeLineDistances(); // This one is SUPER important, otherwise dashed lines will appear as simple plain lines

    var axis = new THREE.Line( geom, mat, THREE.LinePieces );

    return axis;

}

function goToPoint(point) {
    var from = camera.position.clone();
    var to = point.clone();

    to = to.clone().normalize().multiplyScalar(camera.position.length());

    var position = {
        value: 0
    };
    var diff = to.clone().sub(from);

    var startAlt = camera.position.length();
    var endAlt = mesh.radius + mesh.radius * zoomInScale;
    var diffAlt = endAlt - startAlt;

    TweenMax.to(position, 1, {
        value: 1,
        onUpdate: function() {
            var zoom = startAlt + diffAlt * position.value;
            var newPos = from.clone().add( diff.clone().multiplyScalar(position.value) ).normalize().multiplyScalar( zoom );
            
            camera.position.copy( newPos );
        }
    });
}

function onWindowResize() {

    windowHalfX = rendererSize.width / 2;
    windowHalfY = rendererSize.height / 2;

    camera.aspect = rendererSize.width / rendererSize.height;
    camera.updateProjectionMatrix();

    renderer.setSize( rendererSize.width, rendererSize.height );

}

function onDblClick(event) {
    
    if(event) {
        mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    }

    // update the picking ray with the camera and mouse position    
    raycaster.setFromCamera( mouse, camera );

    // calculate objects intersecting the picking ray
    var intersectsPoin = raycaster.intersectObjects( mesh.children );
    var intersectsSphere = raycaster.intersectObject( mesh );

    var target = (intersectsPoin.length > 0) ? intersectsPoin : intersectsSphere;

    if(target.length > 0) {

        goToPoint( target[0].point );
    }

}

function onWindowDoubleTap(event) {
    var currentTime = new Date().getTime();
    var tapLength = currentTime - lastTap;

    if (tapLength < 200 && tapLength > 50) {
        onDblClick(null);
    }

    lastTap = currentTime;
}

function onWindowTouchMove(event) {
    lastTap = new Date().getTime();

    if(event.touches.length == 1) {
        mouse.x = ( event.touches[ 0 ].pageX / window.innerWidth ) * 2 - 1;
        mouse.y = - ( event.touches[ 0 ].pageY / window.innerHeight ) * 2 + 1;
    } else if(event.touches.length == 2) {
        lastTap = Infinity;
    }
}

function animate() {

    requestAnimationFrame( animate );

    render();
    rendererStats.update(renderer);

    controls.update();

    clouds.rotation.x += 0.001 * Math.PI/360;
    clouds.rotation.y += 0.005 * Math.PI/360;
    clouds.rotation.z += 0.003 * Math.PI/360;

}

function render() {

    renderer.render( scene, camera );

}

function codeAddress() {
    geocoder = new google.maps.Geocoder();
    var address = document.getElementById("location").value;

    geocoder.geocode({
        'address': address
    }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            var lat = results[0].geometry.location.lat();
            var lon = results[0].geometry.location.lng();

            // addGeoPoint(lat, lon);

            goToPoint( latLngToXYZ(lat, lon) );
            addPin( lat, lon );
        } else {
            alert("Geocode was not successful for the following reason: " + status);
        }
    });
}