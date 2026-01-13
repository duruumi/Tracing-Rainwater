var proxyUrl = 'https://proxy.seoulshelter.live/';
var targetUrl = 'http://openapi.1365.go.kr/openapi/service/rest/VolunteerPartcptnService/getVltrAreaList';
var queryParams = '?' + encodeURIComponent('serviceKey') + '=rLytspPQdGqIRT%2FG6MX1LUUtJI2%2BSw5eq8pNW%2FVR1XzXT5ScR66VtA9PwxGQDYoUr%2FmuvsiYx7I7kq111qOUsQ%3D%3D';
queryParams += '&' + encodeURIComponent('schSido') + '=' + encodeURIComponent('6110000');
queryParams += '&' + encodeURIComponent('schSign1') + '=' + encodeURIComponent('3020000');
queryParams += '&' + encodeURIComponent('upperClCode') + '=' + encodeURIComponent('0100');
queryParams += '&' + encodeURIComponent('nanmClCode') + '=' + encodeURIComponent('0199');
queryParams += '&' + encodeURIComponent('schCateGu') + '=' + encodeURIComponent('all');
queryParams += '&' + encodeURIComponent('keyword') + '=' + encodeURIComponent('');

fetch(proxyUrl + targetUrl + queryParams)
  .then(response => response.text())
  .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
  .then(data => {
    var items = data.getElementsByTagName('item');
    var details = Array.from(items).map(item => {
      var name = item.getElementsByTagName('nanmmbyNm')[0].textContent;
      var description = item.getElementsByTagName('progrmSj')[0].textContent;
      return name + ': ' + description;
    });
    document.querySelector('#volunteer-card .card-body').innerHTML = details.join('<br>');
  })
  .catch(error => {
    console.error('Error:', error);
    document.querySelector('#volunteer-card .card-body').innerHTML = '데이터를 불러오는 데 실패했습니다.';
  });