function solution(n){
    let strN = n.toString(10);
    return [...strN].reduce((sum, num) => sum + Number(num), 0);
}
