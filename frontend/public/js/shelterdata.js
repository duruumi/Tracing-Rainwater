var proxyUrl = 'https://proxy.seoulshelter.live/';
var targetUrl = 'http://openapi.seoul.go.kr:8088/69614375656869653131315a4246614a/xml/TbEqkShelter/1/100/';

fetch(proxyUrl + targetUrl)
  .then(response => response.text())
  .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
  .then(data => {
    var items = data.getElementsByTagName('row');
    var details = Array.from(items).map(item => {
      var name = item.getElementsByTagName('VT_ACMDFCLTY_NM')[0].textContent;
      return name;
    });
    document.querySelector('.card-body').innerHTML = details.join('<br>');
  })
  .catch(error => {
    console.error('Error:', error);
    document.querySelector('.card-body').innerHTML = '데이터를 불러오는 데 실패했습니다.';
  });