const init = () => {
  //localstorage에서 선택된 좌석 가져옴
  const selectedSeats = getSeats();
  const seats = document.querySelectorAll(".container .seat");
  const select = document.querySelector("select");

  let count = selectedSeats.length;
  let price = select.options[select.selectedIndex].value;

  select.addEventListener("change", () => {
    price = select.options[select.selectedIndex].value;
    changeText(count, price);
  });

  //행, 열에 맞게 id값 부여
  seats.forEach((seat, index) => {
    seat.id = `${Math.floor(index / 8)}-${index % 8}`;
    seat.addEventListener(
      "click",
      (e) => (count = seatClicked(e.target, count, price))
    );
  });

  // localStorage에서 가져온 데이터에 맞게 "selected" 클래스를 추가
  selectedSeats &&
    selectedSeats.map((id) => {
      document.getElementById(`${id}`).className = "seat selected";
    });

  changeText(count, price);
};

//아래 텍스트를 현재 count, price로 바꿔줌
const changeText = (count, price) => {
  const countElem = document.querySelector("#count");
  const priceElem = document.querySelector("#total");
  countElem.textContent = count;
  priceElem.textContent = price * count;
};

// 좌석 클릭됐을 때,
const seatClicked = (seat, count, price) => {
  // 체크할 때
  if (seat.className === "seat") {
    seat.className = "seat selected";
    localStorage.setItem(`${seat.id}`, "selected");
    count = count + 1;
  }

  // 체크 해제할 때
  else if (seat.className === "seat selected") {
    seat.className = "seat";
    localStorage.removeItem(`${seat.id}`);
    count = count - 1;
  }

  changeText(count, price);
  // 좌석 수 리턴
  return count;
};

//localStorage에서 전체 selected 좌석 id 가져옴.
const getSeats = () => {
  let array = [];
  for (let i = 0; i < localStorage.length; i++) {
    array.push(localStorage.key(i));
  }

  //localstorage에 데이터 없을 시 return null
  if (!array) {
    return null;
  }
  return array;
};

//인자로 넘어온 좌석의 id를 localStorage에 삽입.
const setSeats = (id) => {
  localStorage.setItem(`${id}`, "selected");
};

init();
