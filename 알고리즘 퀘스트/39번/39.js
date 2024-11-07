/**
 * 두 수를 인수분해하기
 * 공통된 숫자 곱하기(최대 공약수)
 * let getGCD = (num1, num2) => {
    let gcd = 1;

    for(let i=2; i<=Math.min(num1, num2); i++){
        if(num1 % i === 0 && num2 % i === 0){
            gcd = i;
        }
    }

    return gcd;
}
 * 최소 공배수 구하기
let getLCM = (num1, num2) =>{
	let lcm = 1;
   
    while(true){
      if((lcm % num1 == 0) && (lcm % num2 == 0)){
        break;
      }
      lcm++;
    }
  	return lcm
}
 * 
 **/



function solution(n, m) {
    // n,m 입력받을 2 숫자

    let gcd = 1; // 최대 공약수
    let lcm = 1; // 최소 공배수

    for(let i=2; i<=Math.min(n, m); i++){
        if(n % i === 0 && m % i === 0){
            gcd = i;
        }
    }  
       
    while(true){
      if((lcm % n == 0) && (lcm % m == 0)){
        break;
      }
      lcm++;
    }

    var answer = [gcd, lcm];
    // 출력값 [최대공약수, 최소공배수]
    return answer;
}


/*
function solution(n, m) {
    const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
    const lcm = (n * m) / gcd(n, m);
    return [gcd(n, m), lcm];
}
    */