function solution(arr) {
  return arr.reduce((sum, n) => sum + n, 0) / arr.length;
}

/*
function solution(arr) {
    let sum=0;
    for (let n of arr){
        sum +=n;
    }
    return sum/arr.length
}
*/
