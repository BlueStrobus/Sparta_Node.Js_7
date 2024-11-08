/**문제 설명
자연수 n이 매개변수로 주어집니다. 
n을 3진법 상에서 앞뒤로 뒤집은 후, 이를 
다시 10진법으로 표현한 수를 return 하도록 solution 함수를 완성해주세요.

제한사항
n은 1 이상 100,000,000 이하인 자연수입니다. */

/**
 * n을 3진법으로 수정
 *      console.log(decimal.toString(3));
 *      console.log(변수.toString(2진법은 2, 3진법은 3...));
 * 
 * 앞뒤로 뒤집어???
 *      3진법 숫자를 배열로 만들기
 *      const str = String(num);// 숫자 -> 문자열 String()
        const newArr = Array.from(str); // 문자열 -> 배열 Array.from()
 * 
 *     배열 뒤집기
 *     const reversed = array1.reverse();
 *     문자를 3진법으로
 *      parseInt() 함수는 문자열 인자를 파싱하여 특정 진수(수의 진법 체계에서 기준이 되는 값)의 정수를 반환합니다.
 *      parseInt(string);
        parseInt(string, radix);

 *      console.log(parseInt('0xFF', 16)); // 255 (upper-case hexadecimal with "0x" prefix)
 * 10진법으로 바꾸기
 * 
 *     console.log(parseInt(number,3));
 *     console.log(parseInt(변수,진법수));
 * 반환
 * 
 */
/*n진수 → n진수
parseInt(string, n).toString(n)*/

function solution(n) {
    var answer = 0;
    //n.toString(3); // 10 -> 3
    // reverse(n); // 앞뒤 반전시키고  -> 숫자라 문자로 풀고 뒤집고 묶기
    //let strN = n.toString()
    //const str = String(num);// 숫자 -> 문자열 String()
    
    let strN = n.toString(3); // 10진수 -> 3진수 문자열
    
    let arrN = Array.from(strN); // 문자열 -> 배열 Array.from()
    let reversed = arrN.reverse(); // 배열 뒤집기
    arrN = reversed.join(""); // 배열-> 문자열
    //Number(arrN)// 문자열 -> 숫자(3진수)
        
    answer = Number.parseInt(arrN, 3);// 문자열 -> 숫자 (3진수 문자열을 10진수로 변환)
    return answer;
}

console.log(solution(1005))