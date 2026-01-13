var map;

let data;
let coordinates = []; //좌표 저장 배열
let name = ''; //행정구 이름

let polygons = [];

function initMap() {
    
    var container = document.getElementById('map');
    var options = {
        center: new kakao.maps.LatLng(37.5665, 126.9780), // 서울특별시청 좌표
        level: 8 // 서울전체
    };

    map = new kakao.maps.Map(container, options);
}

const customOverlay = new kakao.maps.CustomOverlay({});

function moveToLocation() {
    var places = new kakao.maps.services.Places();

    var searchInput = document.querySelector('#search-input');
    var resultsList = document.querySelector('#results'); // 검색 결과를 표시할 datalist

    searchInput.addEventListener('input', function () {
        var boundary = new kakao.maps.LatLngBounds(
            new kakao.maps.LatLng(37.426449, 126.764582),
            new kakao.maps.LatLng(37.701749, 127.183593)
        );

        places.keywordSearch(searchInput.value, function(result, status) {
            if (status === kakao.maps.services.Status.OK) {
                resultsList.innerHTML = ''; // datalist를 비움

                result.forEach(function(place) {
                    // 검색 결과를 datalist에 추가
                    var option = document.createElement('option');
                    option.value = place.place_name;
                    resultsList.appendChild(option);

                    console.log(place.place_name);
                });

                var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
                map.setCenter(coords);
                map.setLevel(1);
            }
        }, {
            bounds: boundary
        });
    });
}

window.onload = function() {
    fetch('../seoulweb.json')
    .then(response => response.json())
    .then(json => {
        data = json.features;
        initMap();
        moveToLocation();
        displayArea();
    });
};

//지역구 자르기 여기서 부터

const displayArea = () => {
    data.forEach((val) => {
        coordinates = val.geometry.coordinates;
        name = val.properties.SIG_KOR_NM;
      
        let path = [];
        let points = [];
      
        coordinates[0].forEach((coordinate) => {
          let point = {};
          point.x = coordinate[1];
          point.y = coordinate[0];
          points.push(point);
          path.push(new kakao.maps.LatLng(coordinate[1], coordinate[0]));
        });
      
        let polygon = new kakao.maps.Polygon({
          map: map,
          path: path, // 그려질 다각형의 좌표 배열입니다
          strokeWeight: 2, // 선의 두께입니다
          strokeColor: '#004c80', // 선의 색깔입니다
          strokeOpacity: 0.8, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
          strokeStyle: 'solid', // 선의 스타일입니다
          fillColor: '#fff', // 채우기 색깔입니다
          fillOpacity: 0.7, // 채우기 불투명도 입니다
        });
      
        polygons.push(polygon);
      
        kakao.maps.event.addListener(polygon, 'mouseover', function (mouseEvent) {
          polygon.setOptions({ fillColor: '#09f' });
      
          customOverlay.setContent('<div class="area">' + name + '</div>'); 
      
          customOverlay.setPosition(mouseEvent.latLng);
          customOverlay.setMap(map);
        });
      
        kakao.maps.event.addListener(polygon, 'mousemove', function (mouseEvent) {
          customOverlay.setPosition(mouseEvent.latLng);
        });
      
        kakao.maps.event.addListener(polygon, 'mouseout', function () {
          polygon.setOptions({ fillColor: '#fff' });
          customOverlay.setMap(null);
        });
    });
};