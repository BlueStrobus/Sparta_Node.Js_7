/*
1. 음수, 양수 true, fals로 구분하기
2. 정수배열의 값을 +_하기
3. 결과 반횐
*/

function solution(absolutes, signs) {
    var answer = 0;
    for (let i = 0; i < signs.length; i++) {
        if (signs[i]) {  // 양수(true)면 참
            answer += absolutes[i];
        } else {
            answer -= absolutes[i];
        }
    }
    return answer;
}