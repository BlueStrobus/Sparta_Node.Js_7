function solution(n) {
    var answer = 0;
        
    let strN = n.toString(3);// 10진수 -> 3진수 문자열
    let arrN = Array.from(strN); // 문자열 -> 배열(Array.from())
    let reversed = arrN.reverse(); // 배열 뒤집기
    arrN = reversed.join(""); // 배열 -> 문자열
    answer = Number.parseInt(arrN, 3);// 문자열 -> 숫자 (3진수 문자열을 10진수로 변환)
    
    return answer;
}

console.log(solution(1005));
