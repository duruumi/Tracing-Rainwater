var originalSidebarContent = document.querySelector('.sidebar').innerHTML;

// "길찾기" 버튼을 클릭하면 사이드바의 내용을 변경
document.getElementById('route-button').addEventListener('click', function() {
    document.querySelector('.sidebar').innerHTML = `
        <button id="back"><span class="material-symbols-outlined">&#xe5c4;</span></button>
        <div id="directions-form">
            <input autofocus type="text" id="start" placeholder="시작 주소">
            <input type="text" id="end" placeholder="도착지">
            <select id="travel-mode"> <!-- 교통 수단을 선택할 수 있는 드롭다운 메뉴를 추가 -->
                <option value="DRIVING">자동차</option>
                <option value="WALKING">도보</option>
                <option value="BICYCLING">자전거</option>
                <option value="TRANSIT">대중교통</option>
            </select>
            <button id="submit">길찾기</button>
        </div>
    `;

    // "뒤로" 버튼이 생성된 후에 이벤트 리스너를 추가
    document.getElementById('back').addEventListener('click', function() {
        location.reload(true);
    });

    // "길찾기" 버튼을 클릭하면 경로를 찾음
    document.querySelector('#submit').addEventListener('click', function() {
        var start = document.querySelector('#start').value;
        var end = document.querySelector('#end').value;
        var travelMode = document.querySelector('#travel-mode').value; // 선택한 교통 수단을 가져옴

        var directionsService = new kakao.maps.services();

        directionsService.route({
            origin: start,
            destination: end,
            travelMode: kakao.maps.TravelMode[travelMode] // 선택한 교통 수단에 따라 경로를 찾음
        }, function(result, status) {
            if (status === kakao.maps.services.Status.OK) {
                // 경로를 찾은 경우, 경로를 맵에 표시
                var directionsDisplay = new kakao.maps.DirectionsRenderer();
                directionsDisplay.setDirections(result);
                directionsDisplay.setMap(map);
            }
        });
    });
});
