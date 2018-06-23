(function ($) {
	"use strict";

    var towerData= [
            ["Khaman Substation",18.428393,79.134944,"5.7&#9940","16.39&#9940","133&#9940","1.614","0.158","83.3&#9940"]
            ["Kaman Tower A",18.432270,79.134756,"3.368&#9940","11.47&#9940","31.25&#9940","1.6063","0.1522","NA"],
            ["Kaman Tower B",18.427721,79.134198,"7.368&#9940","8.2&#9989","125&#9940","1.6002","0.1536","5&#9940"],
            ["Kaman Tower C",18.427856,79.135518,"6.42&#9940","45.9&#9940","243.75&#9940","1.6262","0.1479","20&#9940"],
            ["Court Circle Substation",18.443744,79.124644,"1.649&#9989","6.01&#9940","145&#9940","1.6161","0.1521","74.8&#9940"],
            ["Court Circle A",18.443907,79.124767,"3.11&#9989","7.6&#9940","62.5&#9940","1.6163","0.1501","15&#9940"],
            ["Court Circle B",18.445393,79.125915,"5.21&#9940","13.11&#9940","125&#9940","1.6079","0.1519","4&#9940"],
            ["Court Circle C",18.443235,79.127492,"7.06&#9989","3.27&#9989","250&#9940","1.6115","0.1511","12&#9940"],
            ["Ramnagar Substation",18.438094,79.106308,"9.105&#9989","22.54&#9940","223.43&#9940","1.665","0.1585","52.3&#9940"],
            ["Ramnagar A",18.439508,79.107810,"33.95&#9989","40.98&#9940","56.25&#9940","1.605","0.1525","22&#9940"],
            ["Ramnagar B",18.439793,79.104012,"16.947&#9940","26.22&#9940","268.75&#9940","1.6001","0.1536","1&#9940"],
            ["Ramnagar C",18.438511,79.108529,"24.06&#9989","9.83&#9989","56.25&#9989","1.5867","0.1566","7&#9989"],
            ["Ramnagar D",18.438511,79.110513,"4.631&#9940","32.78&#9940","231.25&#9940","1.6103","0.1514","4&#9989"]
        ];
        var areaData=[
            ["Karimnagar Kaman",18.428094,79.135573],
            ["Karimnagar Circle",18.522211,79.052531],
            ["Karimnagar Ramnagar",18.438094,79.106308],
            ["Hyderabad JBS",17.447689,78.498509],
            ["Hyderabad JUBLEE HILLS",17.432216,78.410287], 
            ["Hyderabad Masab Tank",17.402069,78.453555],
            ["Warangal",17.954544,79.603841],
            ["Huzurabad",18.204223,79.396813]
        ];
    //Google Map init
    var googleMapSelector = $('#map');
    
    var myCenter=new google.maps.LatLng(18.4340954, 79.1269655);
    
    function initialize(){
        var mapProp = {
            center:myCenter,
            zoom:15,
            scrollwheel: false,
            mapTypeId:google.maps.MapTypeId.TERRIAN,
            styles: [
                {
                    "featureType": "poi",
                    "elementType": "all",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "all",
                    "stylers": [
                        {
                            "saturation": -100
                        },
                        {
                            "lightness": 45
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "all",
                    "stylers": [
                        {
                            "visibility": "simplified"
                        }
                    ]
                },
                {
                    "featureType": "road.arterial",
                    "elementType": "labels.icon",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "transit",
                    "elementType": "all",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "all",
                    "stylers": [
                        {
                            "color": "#46bcec"
                        },
                        {
                            "visibility": "on"
                        }
                    ]
                }
            ]
            
        };
        var map=new google.maps.Map(document.getElementById("map"),mapProp);
    /*    var marker=new google.maps.Marker({
            position:myCenter,
            animation:google.maps.Animation.BOUNCE,
            icon:'img/google-pin.png'
        });
        marker.setMap(map);
    */
    //custom points code
    //this points file json file should be loaded based on the inputs from the dropdown
    var find_submitBtn=document.getElementById('find_submitBtn');
    find_submitBtn.addEventListener('click',function(){
        var area=document.getElementById('area');
        var areaValue=area.value;
        for(var i=0;i<areaData.length;i++){
            if(areaValue==areaData[i][0])
            {
                console.log(areaData[i][0]);
                var myLatlng = {lat: areaData[i][1], lng: areaData[i][2]};
                map.setCenter(myLatlng);
            }
        }
    });
    var validte_submitBtn=document.getElementById('validte_submitBtn');
    validte_submitBtn.addEventListener('click',function(){
        var lat=document.getElementById("latValue");
        var latValue=lat.value;
        var lang=document.getElementById("langValue");
        var langValue=lang.value;
        console.log(latValue+langValue);
        localStorage.setItem("latValue",latValue);
        localStorage.setItem("langValue",langValue);
        window.location.href='./project.html';
    });
    
    var infowindow = new google.maps.InfoWindow();
      var marker, i;
      var locations = [
        ["Khaman Substation",18.428393,79.134944,"5.7&#9940","16.39&#9940","133&#9940","1.614","0.158","83.3&#9940"],
        ["Kaman Tower A",18.432270,79.134756,"3.368&#9940","11.47&#9940","31.25&#9940","1.6063","0.1522","NA"],
        ["Kaman Tower B",18.427721,79.134198,"7.368&#9940","8.2&#9989","125&#9940","1.6002","0.1536","5&#9940"],
        ["Kaman Tower C",18.427856,79.135518,"6.42&#9940","45.9&#9940","243.75&#9940","1.6262","0.1479","20&#9940"],
        ["Court Circle Substation",18.443744,79.124644,"1.649&#9989","6.01&#9940","145&#9940","1.6161","0.1521","74.8&#9940"],
        ["Court Circle A",18.443907,79.124767,"3.11&#9989","7.6&#9940","62.5&#9940","1.6163","0.1501","15&#9940"],
        ["Court Circle B",18.445393,79.125915,"5.21&#9940","13.11&#9940","125&#9940","1.6079","0.1519","4&#9940"],
        ["Court Circle C",18.443235,79.127492,"7.06&#9989","3.27&#9989","250&#9940","1.6115","0.1511","12&#9940"],
        ["Ramnagar Substation",18.438094,79.106308,"9.105&#9989","22.54&#9940","223.43&#9940","1.665","0.1585","52.3&#9940"],
        ["Ramnagar A",18.439508,79.107810,"33.95&#9989","40.98&#9940","56.25&#9940","1.605","0.1525","22&#9940"],
        ["Ramnagar B",18.439793,79.104012,"16.947&#9940","26.22&#9940","268.75&#9940","1.6001","0.1536","1&#9940"],
        ["Ramnagar C",18.438511,79.108529,"24.06&#9989","9.83&#9989","56.25&#9989","1.5867","0.1566","7&#9989"],
        ["Ramnagar D",18.438511,79.110513,"4.631&#9940","32.78&#9940","231.25&#9940","1.6103","0.1514","4&#9989"],
        ['Center Point',18.4340954, 79.1269655,,"33.95&#9989","40.98&#9940","56.25&#9940","1.605","0.1525","22&#9940"],
        ['Kaman A', 18.429803, 79.136131,"33.95&#9989","40.98&#9940","56.25&#9940","1.605","0.1525","22&#9940"],
        ['Kaman B',18.426495, 79.139715,,"33.95&#9989","40.98&#9940","56.25&#9940","1.605","0.1525","22&#9940"],
        ['Kaman C', 18.430658, 79.137698,,"33.95&#9989","40.98&#9940","56.25&#9940","1.605","0.1525","22&#9940"],
        ['RamNagar A', 18.442847, 79.106984,"33.95&#9989","40.98&#9940","56.25&#9940","1.605","0.1525","22&#9940"],
        ['RamNagar B', 18.4342847, 79.106344,"33.95&#9989","40.98&#9940","56.25&#9940","1.605","0.1525","22&#9940"],
        ['RamNagar C', 18.446647, 79.106944,"33.95&#9989","40.98&#9940","56.25&#9940","1.605","0.1525","22&#9940"],
        ['RamNagar D', 18.449947, 79.102384,"33.95&#9989","40.98&#9940","56.25&#9940","1.605","0.1525","22&#9940"],
        ['Court Circle A', 18.543547, 79.105484,"33.95&#9989","40.98&#9940","56.25&#9940","1.605","0.1525","22&#9940"],
        ['Court Circle B', 18.435847, 79.102384,"33.95&#9989","40.98&#9940","56.25&#9940","1.605","0.1525","22&#9940"],
        ['Court Circle C', 18.236847, 79.100984,"33.95&#9989","40.98&#9940","56.25&#9940","1.605","0.1525","22&#9940"],
        ];
      
        for (i = 0; i < locations.length; i++) {  
            marker = new google.maps.Marker({
            position: new google.maps.LatLng(locations[i][1], locations[i][2]),
            map: map,
            animation:google.maps.Animation.BOUNCE,
            icon:'img/towerPin.png'
            });
    
            google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
                var st="<p>"+locations[i][0]+"<br/>"
                            +"RF :"     +locations[i][3]+"<br/>"
                            +"EFS :"    +locations[i][4]+"<br/>"
                            +"MFS :"    +locations[i][5]+"<br/>"
                            +"T.VAL :"  +locations[i][6]+"<br/>"
                            +"P.VAL :"  +locations[i][7]+"<br/>"
                            +"PD :"     +locations[i][8]+"<br/>";
                infowindow.setContent(st);
                infowindow.open(map, marker);
            }
            })(marker, i));
        }
    }
    if(googleMapSelector.length){
        google.maps.event.addDomListener(window, 'load', initialize);
    }
        
    
    
})(jQuery);