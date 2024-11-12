function solution(angle) {
    switch (true) {
        case (angle > 0 && angle < 90):
            return 1;
        case (angle === 90):
            return 2;
        case (angle > 90 && angle < 180):
            return 3;
        case (angle === 180):
            return 4;
        default:
            return '유효하지 않은 각도';
    }
}