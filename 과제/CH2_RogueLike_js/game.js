// 외부 라이브러리 및 모듈 가져오기
import chalk from 'chalk'; // 터미널 텍스트 스타일링 라이브러리
import readlineSync from 'readline-sync'; // 동기식 사용자 입력을 받을 수 있는 라이브러리
import { getRandomInt } from './server.js'; // 랜덤 정수를 생성하는 함수

// 플레이어 클래스 정의
class Player {
  // 생성자: 플레이어 객체를 생성할 때 체력, 포만감, 행복, 공격력을 초기화
  constructor(hp, fullness, happiness, pAttack) {
    this.hp = hp; // 플레이어 체력
    this.fullness = fullness; // 플레이어 포만감
    this.happiness = happiness; // 플레이어 행복 지수
    this.pAttack = pAttack; // 플레이어의 공격력
  }

  // 플레이어가 공격할 때 공격력을 반환
  attack() {
    return this.pAttack;
  }

  // 플레이어가 피해를 입었을 때 체력을 감소
  damage(n) {
    this.hp -= n;
  }
}

// 얼음 몬스터 클래스 정의
class IceMonster {
  // 생성자: 체력과 공격력을 초기화
  constructor(hp, iAttack) {
    this.hp = hp; // 얼음 몬스터 체력
    this.iAttack = iAttack; // 얼음 몬스터 공격력
  }

  // 얼음 몬스터가 공격할 때 공격력을 반환
  attack() {
    return this.iAttack;
  }

  // 얼음 몬스터가 피해를 입었을 때 체력을 감소
  damage(n) {
    this.hp -= n;
  }
}

// 인간형 몬스터 클래스 정의
class HumanMonster {
  // 생성자: 체력과 공격력을 초기화
  constructor(hp, hAttack) {
    this.hp = hp; // 인간형 몬스터 체력
    this.hAttack = hAttack; // 인간형 몬스터 공격력
  }

  // 인간형 몬스터가 공격할 때 공격력을 반환
  attack() {
    return this.hAttack;
  }

  // 인간형 몬스터가 피해를 입었을 때 체력을 감소
  damage(n) {
    this.hp -= n;
  }
}

// 플레이어 상태 표시 함수
function displayStatus(stage, player, monster) {
  console.log(chalk.magentaBright(`\n=== 현재 플레이어 상태 ===`));
  console.log(chalk.cyanBright(`| Stage: ${stage}\n `));
  console.log(
    chalk.blueBright(
      `| 체력 : ${player.hp}   포만감 : ${player.fullness}   행복 : ${player.happiness}       `,
    ),
  );
  console.log(chalk.magentaBright(`=====================\n`));
}

// 배틀 함수: 스테이지 진행과 몬스터와의 상호작용을 처리
const battle = async (stage, player, dLog) => {
  let logs = []; // 전투 로그 저장

  // 플레이어가 살아 있고 포만감이 있으며 스테이지가 10 이하일 때 반복
  while (player.hp > 0 && player.fullness > 0 && stage <= 10) {
    let choice = '';
    console.log('\n\n 길을 따라 걸어 갑니다...\n');
    choice = readlineSync.question(chalk.blueBright('Enter를 누르세요.'));

    // 체력 회복 및 포만감 감소
    if (player.hp < 95) {
      player.hp += 5;
    }
    player.fullness -= 2;

    if (player.fullness < 20) {
      console.log(`포만감 : ${player.fullness}  배가 고픕니다. 도움을 주고 식량을 얻으세요`);
    }

    const rand = getRandomInt(4);
    // console.log(rand);

    //동물 3, 사람1,
    switch (rand) {
      case 0:
        console.log('\n\n사람을 만났다'); // 빵
        await MeetHuman(player, logs, stage, dLog);
        break;
      case 1:
        console.log('\n\n울버린을 만났다'); // 고기
        await MeetWolverene(player, logs, stage, dLog);
        break;
      case 2:
        console.log('\n\n까마귀를 만났다'); // 과일
        await MeetRaven(player, logs, stage, dLog);
        break;
      case 3:
        console.log('\n\n수달을 만났다'); // 물고기
        await MeetOtter(player, logs, stage, dLog);
        break;
    }

    //logs.forEach((log) => console.log(log));
    return;
  }
};
//////////////랜덤 결과 스테이지///////////////

/////////////사람/////////
const MeetHuman = async (player, logs, stage, dLog) => {
  // 무작위 정수 생성 (0~9 사이)
  let rand = getRandomInt(10);

  // 사용자에게 선택지 제공
  console.log(chalk.blueBright(`\n1. 도와준다. 2. 도망간다.`));
  let choice = readlineSync.question(chalk.blueBright('당신의 선택은?'));

  if (choice === '1') {
    logs.push(`도와주기를 선택하셨습니다.`);

    // 70% 확률로 사람이 공격
    if (rand <= 7) {
      logs.push(chalk.green('사람에게 공격당하셨습니다.'));
      console.log(chalk.red(`\n\n사람에게 공격당하셨습니다.`));

      // 사람과 전투 시작
      const hMonster = new HumanMonster(rand + stage * 30, 10 + stage * 2);

      // 전투 루프
      while (hMonster.hp > 0 && player.hp > 0 && player.fullness > 0) {
        console.log(chalk.redBright(`\n남은 적 : ${hMonster.hp}`));
        console.log(chalk.green(`\n플레이어 hp : ${player.hp} 포만감 : ${player.fullness}`));
        console.log(chalk.blueBright(`\n1. 공격한다. 2. 방어한다. 3.도망간다.`));
        choice = readlineSync.question(chalk.blueBright('당신의 선택은? '));
        player.fullness -= 2;

        switch (choice) {
          case '1': // 공격
            console.log('1. 공격한다.');
            if (rand <= 4) {
              player.damage(hMonster.attack());
              hMonster.damage(player.attack());
              console.log(
                chalk.yellow(`베르노가 사람을 공격합니다. ${player.pAttack}의 피해를 입혔습니다.`),
              );
              console.log(
                chalk.yellow(
                  `베르노가 사람에게 공격받았습니다. 체력이 ${hMonster.hAttack} 감소합니다.`,
                ),
              );
            } else {
              hMonster.damage(player.attack());
              console.log(
                chalk.yellow(`베르노가 사람을 공격합니다. ${player.pAttack}의 피해를 입혔습니다.`),
              );
            }
            break;

          case '2': // 방어
            console.log('2. 방어한다.');
            if (rand <= 4) {
              console.log(chalk.yellow('공격을 받았지만 방어했습니다.'));
            } else {
              console.log(chalk.yellow('방어했습니다.'));
            }
            break;

          case '3': // 도망
            console.log('3. 도망치셨습니다.');
            logs.push('3.도망가기를 선택하셨습니다.');
            await battle(stage, player);
            return;
        }
      }

      // 전투 종료 후 결과 처리
      if (player.hp > 0 && player.fullness > 0 && hMonster.hp < 0) {
        // 승리 시 보상
        console.clear();
        logs.push('사람을 이겼습니다.');
        player.hp += 10;
        player.fullness = 100;
        player.happiness -= 7;
        console.log('사람을 이겼습니다. 플레이어 채력 +10, 포만감 +100, 행복 -7');
        return;
      } else {
        // 플레이어 사망 처리
        console.log(chalk.red(`사망하셨습니다.\n`));
        choice = readlineSync.question(
          chalk.blueBright(`1. 처음부터 다시시작 2. 이 스테이지에서 한번더 3.종료\n`),
        );

        switch (choice) {
          case '1': // 게임 재시작
            startGame();
            break;

          case '2': // 같은 스테이지 재도전
            dLog = '2. 이 스테이지에서 한번더 선택';
            if (player.hp <= 0) {
              player.hp = stage * 3 + 10;
            }
            if (player.fullness <= 0) {
              player.fullness = stage * 10;
            }
            displayStatus(stage, player);
            await battle(stage, player);
            return;

          case '3': // 게임 종료
            process.exit();
            return;
        }
      }
    } else {
      logs.push(chalk.green('사람을 도와 얼음을 부수세요.'));
      console.log(chalk.blue(`\n\n사람을 도와 얼음을 부수세요.`));

      // 얼음 부수기 시작
      const iMonster = new IceMonster(rand + stage * 20, 3 + stage * 2);
      while (iMonster.hp > 0) {
        console.log(chalk.red(`\n남은 얼음 : ${iMonster.hp}`));
        console.log(chalk.green(`\n플레이어 hp : ${player.hp} 포만감 : ${player.fullness}`));
        choice = readlineSync.question(chalk.blueBright(`\n1. 얼음을 부순다.`));
        player.fullness -= 2;

        if (choice === '1') {
          console.log('1. 부수기.');
          if (rand <= 3) {
            player.damage(iMonster.attack());
            iMonster.damage(player.attack());
            console.log(
              chalk.yellow(
                `얼음을 타격해 ${player.attack()}만큼 손상시켰다.\n얼음이 튀어서 hp${iMonster.attack()}가 감소했다.`,
              ),
            );
          } else {
            iMonster.damage(player.attack());
            console.log(chalk.yellow(`얼음을 타격해 ${player.attack()}만큼 손상시켰다.`));
          }
        }
      }
    }

    // 얼음 부수기 결과 처리
    if (player.hp > 0 && player.fullness > 0) {
      console.clear();
      console.log(`얼음 속의 빵을 얻었습니다.`);
      player.hp += 10;
      player.fullness += 15;
      player.happiness += 7;
      logs.push(chalk.green(`얼음을 부쉈습니다.`));
      console.log('플레이어 채력 +10, 포만감 +15, 행복 +7');
      return;
    } else {
      console.log(chalk.red(`사망하셨습니다.\n`));
      choice = readlineSync.question(
        chalk.blueBright(`1. 처음부터 다시시작 2. 이 스테이지에서 한번더 3.종료\n`),
      );

      switch (choice) {
        case '1':
          startGame();
          break;

        case '2':
          dLog = '2. 이 스테이지에서 한번더 선택';
          if (player.hp <= 0) {
            player.hp = stage * 3 + 10;
          }
          if (player.fullness <= 0) {
            player.fullness = stage * 10;
          }
          displayStatus(stage, player);
          await battle(stage, player);
          return;

        case '3':
          process.exit();
          return;
      }
    }
  } else if (choice === '2') {
    console.log('3. 도망치셨습니다.'); // 도망 선택
    player.happiness -= 3;
    await battle(stage, player);
    return;
  } else {
    console.log(`1,2 중 하나만 입력해주세요`);
    MeetHuman(player, logs, stage);
  }
};
////////사람/////////////////

///////////울버린/////////////
/**
 * MeetWolverene 함수
 * 울버린 캐릭터와 상호작용하며 게임을 진행하는 로직
 */
const MeetWolverene = async (player, logs, stage, dLog) => {
  let rand = getRandomInt(10); // 랜덤값 생성

  console.log(chalk.blueBright(`\n1. 도와준다. 2. 무시한다.`));
  let choice = readlineSync.question(chalk.blueBright('당신의 선택은? '));

  if (choice === '1') {
    // 도와주는 경우
    logs.push(chalk.green(`도와주기를 선택하셨습니다.`));
    logs.push(chalk.green('울버린을 도와 얼음을 부수세요.'));
    console.log(chalk.blue(`\n\n울버린을 도와 얼음을 부수세요.`));

    // 얼음 부수기 전투 로직
    const iMonster = new IceMonster(rand + stage * 20, 3 + stage * 2); // 얼음 몬스터 생성
    while (iMonster.hp > 0 && player.hp > 0 && player.fullness > 0) {
      console.log(chalk.red(`\n남은 얼음 : ${iMonster.hp}`));
      console.log(chalk.green(`\n플레이어 hp : ${player.hp} 포만감 : ${player.fullness}`));
      choice = readlineSync.question(chalk.blueBright(`\n1. 얼음을 부순다.`));
      player.fullness -= 2; // 포만감 감소

      if (choice === '1') {
        // 얼음 부수기 선택
        if (rand <= 3) {
          // 데미지 계산 로직
          player.damage(iMonster.attack());
          iMonster.damage(player.attack());
          console.log(
            chalk.yellow(
              `얼음을 타격해 ${player.attack()}만큼 손상시켰다.\n얼음이 튀어서 hp${iMonster.attack()}가 감소했다.`,
            ),
          );
        } else {
          iMonster.damage(player.attack());
          console.log(chalk.yellow(`얼음을 타격해 ${player.attack()}만큼 손상시켰다.`));
        }
      }
    }

    // 승리 시 보상 지급
    if (player.hp > 0 && player.fullness > 0) {
      console.clear();
      console.log(`얼음 속의 고기를 얻었습니다.`);
      player.hp += 10;
      player.fullness += 20;
      player.happiness += 7;
      logs.push(chalk.green(`얼음을 부쉈습니다.`));
      console.log('플레이어 체력 +10, 포만감 +20, 행복 +7');
      return;
    } else {
      // 패배 시 로직
      console.log(chalk.red(`사망하셨습니다.\n`));
      choice = readlineSync.question(
        chalk.blueBright(`1. 처음부터 다시시작 2. 이 스테이지에서 한번더 3. 종료\n`),
      );
      switch (choice) {
        case '1':
          startGame(); // 게임 처음부터 시작
          break;
        case '2': // 동일 스테이지 재도전
          dLog = '2. 이 스테이지에서 한번더 선택';
          if (player.hp <= 0) player.hp = stage * 3 + 10;
          if (player.fullness <= 0) player.fullness = stage * 10;
          displayStatus(stage, player);
          await battle(stage, player);
          return;
        case '3': // 게임 종료
          process.exit();
          return;
      }
    }
  } else if (choice === '2') {
    // 무시하는 경우
    console.log('무시하고 지나가셨습니다. 행복 -3');
    player.happiness -= 3;
    await battle(stage, player);
    return;
  } else {
    // 잘못된 입력 처리
    console.log(`1,2 중 하나만 입력해주세요`);
    MeetWolverene(player, logs, stage);
  }
};

////////울버린///////

/////////까마귀/////
const MeetRaven = async (player, logs, stage, dLog) => {
  let rand = getRandomInt(10);

  console.log(chalk.blueBright(`\n1. 도와준다. 2. 무시한다.`));
  let choice = readlineSync.question(chalk.blueBright('당신의 선택은? '));

  if (choice === '1') {
    logs.push(`도와주기를 선택하셨습니다.`);

    logs.push(chalk.green('까마귀를 도와 얼음을 부수세요.'));
    console.log(chalk.blue(`\n\n까마귀를 도와 얼음을 부수세요.`));
    //얼음 부수기 while()
    const iMonster = new IceMonster(rand + stage * 20, 3 + stage * 2);
    while (iMonster.hp > 0 && player.hp > 0 && player.fullness > 0) {
      console.log(chalk.red(`\n남은 얼음 : ${iMonster.hp}`));
      console.log(chalk.green(`\n플레이어 hp : ${player.hp} 포만감 : ${player.fullness}`));
      choice = readlineSync.question(chalk.blueBright(`\n1. 얼음을 부순다.`));
      player.fullness -= 2;

      if (choice === '1') {
        console.log('1. 부수기.');
        if (rand <= 2) {
          player.damage(iMonster.attack());
          iMonster.damage(player.attack());
          console.log(
            chalk.yellow(
              `얼음을 타격해 ${player.attack()}만큼 손상시켰다.\n얼음이 튀어서 hp${iMonster.attack()}가 감소했다.`,
            ),
          );
        } else {
          iMonster.damage(player.attack());
          console.log(chalk.yellow(`얼음을 타격해 ${player.attack()}만큼 손상시켰다.`));
        }
      }
    }

    if (player.hp > 0 && player.fullness > 0) {
      // 보상

      console.clear();
      console.log(`얼음 속의 과일을 얻었습니다.`);
      player.hp += 10;
      player.fullness += 3;
      player.happiness += 7;
      logs.push(chalk.green(`얼음을 부쉈습니다.`));

      console.log('플레이어 채력 +10, 포만감 +3, 행복 +7');
      return;
    } else {
      //plyaer가 죽었을 때 로직
      console.log(chalk.red(`사망하셨습니다.\n`)); // 해골그림...묘비?
      choice = readlineSync.question(
        chalk.blueBright(`1. 처음부터 다시시작 2. 이 스테이지에서 한번더 3.종료\n`),
      );

      switch (choice) {
        case '1':
          startGame();
          break;
        case '2': // 기능추가하기
          //console.log('2. 이 스테이지에서 한번더 선택');
          dLog = '2. 이 스테이지에서 한번더 선택';
          if (player.hp <= 0) {
            player.hp = stage * 3 + 10;
          }
          if (player.fullness <= 0) {
            player.fullness = stage * 10;
          }
          displayStatus(stage, player);
          await battle(stage, player);
          return;

        case '3':
          process.exit();
          //console.log('3번 선택');
          return;
      }
    }
  } else if (choice === '2') {
    console.log('무시하고 지나가셨습니다. 행복 -3'); // 안도와주고 도망가기
    player.happiness -= 3;
    await battle(stage, player);
    return;
  } else {
    console.log(`1,2 중 하나만 입력해주세요`);
    MeetRaven(player, logs, stage);
  }
};
/////////까마귀/////
/////////수달/////
const MeetOtter = async (player, logs, stage, dLog) => {
  let rand = getRandomInt(10);

  console.log(chalk.blueBright(`\n1. 도와준다. 2. 무시한다.`));
  let choice = readlineSync.question(chalk.blueBright('당신의 선택은? '));

  if (choice === '1') {
    logs.push(chalk.green(`도와주기를 선택하셨습니다.`));

    logs.push(chalk.green('수달을 도와 얼음을 부수세요.'));
    console.log(chalk.blue(`\n\n수달을 도와 얼음을 부수세요.`));
    //얼음 부수기 while()
    const iMonster = new IceMonster(rand + stage * 20, 3 + stage * 2);
    while (iMonster.hp > 0 && player.hp > 0 && player.fullness > 0) {
      console.log(chalk.red(`\n남은 얼음 : ${iMonster.hp}`));
      console.log(chalk.green(`\n플레이어 hp : ${player.hp} 포만감 : ${player.fullness}`));
      choice = readlineSync.question(chalk.blueBright(`\n1. 얼음을 부순다.`));
      player.fullness -= 2;

      if (choice === '1') {
        console.log('1. 부수기.');
        if (rand <= 2) {
          player.damage(iMonster.attack());
          iMonster.damage(player.attack());
          console.log(
            chalk.yellow(
              `얼음을 타격해 ${player.attack()}만큼 손상시켰다.\n얼음이 튀어서 hp${iMonster.attack()}가 감소했다.`,
            ),
          );
        } else {
          iMonster.damage(player.attack());
          console.log(chalk.yellow(`얼음을 타격해 ${player.attack()}만큼 손상시켰다.`));
        }
      }
    }

    if (player.hp > 0 && player.fullness > 0) {
      // 보상
      console.clear();
      console.log(`얼음 속의 물고기를 얻었습니다.`);
      player.hp += 10;
      player.fullness += 10;
      player.happiness += 7;
      logs.push(chalk.green(`얼음을 부쉈습니다.`));

      console.log('플레이어 채력 +10, 포만감 +10, 행복 +7');
      return;
    } else {
      //plyaer가 죽었을 때 로직
      console.log(chalk.red(`사망하셨습니다.\n`)); // 해골그림...묘비?
      choice = readlineSync.question(
        chalk.blueBright(`1. 처음부터 다시시작 2. 이 스테이지에서 한번더 3.종료\n`),
      );

      switch (choice) {
        case '1':
          startGame();
          break;
        case '2': // 기능추가하기
          //console.log('2. 이 스테이지에서 한번더 선택');
          dLog = '2. 이 스테이지에서 한번더 선택';
          if (player.hp <= 0) {
            player.hp = stage * 3 + 10;
          }
          if (player.fullness <= 0) {
            player.fullness = stage * 10;
          }
          displayStatus(stage, player);
          await battle(stage, player);
          return;

        case '3':
          process.exit();
          //console.log('3번 선택');
          return;
      }
    }
  } else if (choice === '2') {
    console.log('무시하고 지나가셨습니다. 행복 -3'); // 안도와주고 도망가기
    player.happiness -= 3;
    await battle(stage, player);
  } else {
    console.log(`1,2 중 하나만 입력해주세요`);
    MeetOtter(player, logs, stage);
  }
};
/////////수달/////

/////////////게임 시작/////////////////

/////////////게임 시작/////////////////
export async function startGame() {
  console.clear(); // 콘솔을 초기화하여 이전 게임 로그를 지움
  let dLog = null; // 게임 중 로그를 저장할 변수 선언

  // 플레이어 생성 - Player 클래스의 생성자를 호출하여 플레이어 객체 생성 (hp, fullness, happiness, pAttack 초기화)
  const player = new Player(100, 40, 40, 10);

  // 스테이지 변수 초기화
  let stage = 0;

  // 게임의 각 스테이지를 진행하는 while 루프, 플레이어의 hp와 fullness가 모두 0 이상이고, 스테이지가 10 이하일 때까지 반복
  while (stage <= 10 && player.hp > 0 && player.fullness > 0) {
    // 플레이어가 살아있고 fullness가 0보다 큰지 확인
    if (player.hp > 0 && player.fullness > 0) {
      stage++; // 사망 후 스테이지 증가 방지

      // 스테이지가 10 이하일 때만 상태를 출력
      if (stage <= 10) {
        displayStatus(stage, player); // 현재 스테이지와 플레이어 상태를 출력
      }

      // 현재 스테이지에서의 전투를 수행
      await battle(stage, player, dLog);

      // 스테이지에 따라 플레이어 공격력(pAttack)을 증가시킴
      player.pAttack = 10 + 2 * stage;
    } else {
      // 플레이어가 죽었을 경우 게임 오버 메시지 출력 후 함수 종료
      console.log('게임 오버! 다시 시작하세요.');
      return;
    }
  }

  // 모든 스테이지를 클리어하고 hp와 fullness가 0 이상일 경우
  if (stage >= 10 && player.hp > 0 && player.fullness > 0) {
    console.log(chalk.green('축하합니다! 모든 스테이지를 클리어하셨습니다!\n')); // 게임 클리어 메시지 출력

    // 플레이어의 happiness 값에 따라 다른 메시지를 출력
    if (player.happiness > 80) {
      console.log('즐거운 여행을 마친 베르노. 행복하게 집으로 돌아갑니다.');
    } else if (player.happiness > 40) {
      console.log('괜찮은 여행이었어요. 이번엔 어디로 여행을 가볼까요?');
    } else if (player.happiness > 10) {
      console.log('힘들어요 ㅠㅠ 어서 집으로 돌아가고 싶네요');
    } else {
      console.log('우울해요. 괜히 나왔어. 집으로 돌아갈래요');
    }
  }
  // 게임 종료 조건 확인 후, dLog에 특정 조건이 있을 경우 사망 메시지 출력
  else if (dLog === '2. 이 스테이지에서 한번더 선택') {
    displayStatus(stage, player); // 현재 스테이지와 플레이어 상태 출력
    console.log('사망하셨습니다. 게임이 종료 됩니다.');
  } else {
    displayStatus(stage, player); // 현재 스테이지와 플레이어 상태 출력
    console.log('사망하셨습니다. 게임이 종료 됩니다.');
  }
}
