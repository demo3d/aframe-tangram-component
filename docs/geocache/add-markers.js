var setProperty = AFRAME.utils.entity.setComponentProperty;

AFRAME.registerComponent('add-markers', {
    dependencies: ['tangram-map'],
    schema: {
        geojson: {
            type: "asset",
        },
    },
    init: function() {

        var data = this.data

        this.heightMap = this.el.components['tangram-heightmap']
        this.el.addEventListener("map-loaded", e => {
            console.log("map-loaed")
            var loader = new THREE.FileLoader();
            loader.load(data.geojson, file => {
                const geojson = JSON.parse(file)
                
                geojson.features.map(f => {
                    var coord = f.geometry.coordinates
                    // lng lat
                    var position = this.heightMap.project(coord[0], coord[1])

                    var marker = this.addMarker()

                    setProperty(marker, 'position', position);
                })
                
                //console.log(this.heightMap.project(47.77682884663196, 15.814647674560547))
            })
            
        })

        
    },
    addMarker: function() {
        var marker = document.createElement('a-entity');
        var point = document.createElement('a-cone');
        point.setAttribute('height', 0.5);
        point.setAttribute('radius-bottom', 0);
        point.setAttribute('radius-top', 0.05);
        point.setAttribute('rotation', {
            x: 90,
            y: 0,
            z: 0
        });
        point.setAttribute('position', {
            x: 0,
            y: 0,
            z: 0.25
        });
        point.setAttribute('color', '#ff0000');
        marker.appendChild(point);

        this.el.appendChild(marker);
        return marker;
    }
});