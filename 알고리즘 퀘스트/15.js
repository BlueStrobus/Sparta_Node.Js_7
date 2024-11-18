function solution(n) {
    for(let i=2;i<n;i++){
        if(n % i===1 ){return i}
    }
}

/*
function solution(n) {
    for (let x = 2; x < n; x++) if (n % x === 1) return x;
}
*/
