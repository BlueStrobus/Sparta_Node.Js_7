/** 
 * 문자열 리스트 strings
 * 문자열의 n번째 문자로 리스트 오름차순 정렬
 * 
 * 문자열 앞에 인덱스에 해당하는 문자를 붙인다
 * ["sun", "bed", "car"], 1 이라면 → ["usun", "ebed", "acar"]
 * 사전순으로 정렬한다
 * ["acar", "ebed", "usun"]
 * 정렬된 배열의 가장 앞 글자를 땐다
 * ["car", "bed", "sun"]
 * **/

function solution(strings, n) {
    //const myList = strings.map(value => `${value[n]}${value}`);
    
    const myList = [];
    for (const value of strings.values()) {
        myList.push(`${value[n]}${value}`);
    }
    myList.sort();

    const answer = myList.map(str => str.substring(1));
    
    
    // var answer = [];
    return answer;
}
