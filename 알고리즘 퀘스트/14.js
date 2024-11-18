function solution(n) {
  if (n === 0) return 0;
  let sum = 0;
  for (let i = 1; i <= Math.sqrt(n); i++) {
    if (n % i === 0) {
      sum += i + (i !== n / i ? n / i : 0);
    }
  }
  return sum;
}

/*
function solution(n) {
    return n === 0 ? 0 : Array.from({ length: n }, (_, i) => i + 1)
                         .filter(v => n % v === 0)
                         .reduce((a, b) => a + b, 0);
}
*/

/*
function solution(n) {
    if (n <= 0) return 0;
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        if (n % i === 0) {
            sum += i; // 약수를 바로 더함
        }
    }
    return sum;
}
 */
