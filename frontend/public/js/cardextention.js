document.addEventListener('DOMContentLoaded', function() {
    const moreButtons = document.querySelectorAll('.more-button');
  
    moreButtons.forEach(button => {
        button.addEventListener('click', function() {
            const cardSection = this.closest('.card-section');
            const currentCard = this.parentElement.parentElement;

            // 현재 클릭된 버튼의 텍스트 변경
            if (this.textContent === "더보기") {
                this.textContent = "줄이기";
            } else {
                this.textContent = "더보기";
            }

            // 현재 카드 확장 또는 축소
            if (currentCard.classList.contains('expanded')) {
                currentCard.style.height = "160px"; // 보여지는 높이를 160px로 고정
                currentCard.classList.remove('expanded');
                // 모든 카드를 보이게 함
                cardSection.querySelectorAll('.card-light, .card-dark').forEach(card => {
                    card.classList.remove('hidden');
                });
            } else {
                currentCard.style.height = "520px"; // 카드의 전체 높이를 450px로 설정
                currentCard.classList.add('expanded');
                // 선택된 카드를 제외한 다른 카드 숨기기
                cardSection.querySelectorAll('.card-light, .card-dark').forEach(card => {
                    if (card !== currentCard) {
                        card.classList.add('hidden');
                    }
                });
            }
        });
    });
});