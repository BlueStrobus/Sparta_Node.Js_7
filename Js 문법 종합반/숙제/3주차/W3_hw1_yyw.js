// 가장 아래의 코드가 실행 되었을 때, 
//“Passed ~” 가 출력되도록 getAge 함수를 채워주세요
var user = {
  name: "john",
  age: 20,
}

var getAged = function (user, passedTime) { // 3. 유저랑 6
  // user를 다른 객체로 복사
  // 유저 나이에 passedTime 추가하기
  // 수정한 user 반환
  let newUser = {...user}
  newUser.age += passedTime;

  return newUser

}


var agedUser = getAged(user, 6); // 2. 유저랑 6

var agedUserMustBeDifferentFromUser = function (user1, user2) {
  if (!user2) {
      console.log("Failed! user2 doesn't exist!");
  } else if (user1 !== user2) { 
      console.log("Passed! If you become older, you will be different from you in the past!")
  } else {
      console.log("Failed! User same with past one");
  }
}

agedUserMustBeDifferentFromUser(user, agedUser); // 1.