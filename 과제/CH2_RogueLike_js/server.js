import chalk from 'chalk';
import figlet from 'figlet';
import readlineSync from 'readline-sync';
import { startGame } from './game.js';

// 로비 화면을 출력하는 함수
function displayLobby() {
  console.clear();

  // 타이틀 텍스트
  console.log(
    chalk.cyan(
      figlet.textSync("Polar Bear's Journey", {
        font: 'Standard',
        horizontalLayout: 'default',
        verticalLayout: 'default',
      }),
    ),
  );

  // 상단 경계선
  const line = chalk.magentaBright('='.repeat(50));
  console.log(line);

  // 게임 이름
  console.log(chalk.yellowBright.bold('북극곰의 여행에 오신것을 환영합니다!'));

  // 설명 텍스트
  console.log(chalk.green('옵션을 선택해주세요.'));
  console.log();

  // 옵션들
  console.log(chalk.blue('1.') + chalk.white(' 게임 시작'));
  //console.log(chalk.blue('2.') + chalk.white(' 업적 확인하기'));
  //console.log(chalk.blue('3.') + chalk.white(' 옵션'));
  console.log(chalk.blue('2.') + chalk.white(' 종료'));

  // 하단 경계선
  console.log(line);

  // 하단 설명
  //console.log(chalk.gray('1-4 사이의 수를 입력한 뒤 엔터를 누르세요.'));

  console.log(chalk.gray('1 or 2 를 입력한 뒤 엔터를 누르세요.'));
}

// 유저 입력을 받아 처리하는 함수
function handleUserInput() {
  const choice = readlineSync.question('입력: ');

  switch (choice) {
    case '1':
      console.log(chalk.green('게임을 시작합니다.'));
      // 여기에서 새로운 게임 시작 로직을 구현
      startGame();
      break;
    /*
    case '2':
      console.log(chalk.yellow('구현 준비중입니다.. 게임을 시작하세요'));
      // 업적 확인하기 로직을 구현
      handleUserInput();
      break;
    case '3':
      console.log(chalk.blue('구현 준비중입니다.. 게임을 시작하세요'));
      // 옵션 메뉴 로직을 구현
      handleUserInput();
      break;*/
    case '2': //4':
      console.log(chalk.red('게임을 종료합니다.'));
      // 게임 종료 로직을 구현
      process.exit(0); // 게임 종료
      break;
    default:
      console.log(chalk.red('올바른 선택을 하세요.'));
      handleUserInput(); // 유효하지 않은 입력일 경우 다시 입력 받음
  }
}
/*
// 아이템 클래스 - 플레이어가 이벤트에서 획득할 수 있는 아이템을 생성
class Item {
  constructor(name, type, effect) {
    this.name = name;
    this.type = type;
    this.effect = effect;
  }
}

// 아이템 목록 생성 함수 - 어떻게 쓸 지 생각하기
export function generateRandomItem() {
  const items = [
    new Item('라이터', 'utility', { stat: 'hp', amount: 5 }),
    new Item('라면', 'food', { stat: 'fullness', amount: 20 }),
    new Item('응급처치 키트', 'healing', { stat: 'hp', amount: 30 }),
  ];

  return items[Math.floor(Math.random() * items.length)];
}
  */

// 플레이어 상태를 콘솔에 보기 좋게 표시하는 함수
export function displayPlayerStatus(player) {
  console.log(chalk.magentaBright(`\n===== 플레이어 상태 =====`));
  console.log(chalk.cyanBright(`체력: ${player.hp}`));
  console.log(chalk.yellowBright(`포만감: ${player.fullness}`));
  console.log(chalk.greenBright(`행복: ${player.happiness}`));
  console.log(chalk.magentaBright(`========================\n`));
}

// 무작위 수 생성 함수 (이벤트 발생 확률 등)
export function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

// 콘솔에 메시지 표시 유틸리티
export function logMessage(message, color = 'white') {
  console.log(chalk[color](message));
}

// 게임 시작 함수
function start() {
  displayLobby();
  handleUserInput();
}

// 게임 실행
start();
