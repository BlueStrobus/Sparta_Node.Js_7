/*
    1. 반복문으로  'p'의 개수와 'y'의 개수를 카운트
    2. 비교하기
    3. 
    */ 

    //let s = "PasdYasdg"
    function solution(s){
        var answer = true;
        let sp = 0;
        let sy = 0;
        for (let i = 0; i < s.length; i++) {
          if(s[i] === "p"|| s[i] === "P"){
            sp++
          }else if(s[i] === "y" || s[i] === "Y"){
            sy++
          }
        }
        if(sp===sy){
           return answer
        }else{
            answer = false
            return answer
        }
    }

    //console.log(solution(s));