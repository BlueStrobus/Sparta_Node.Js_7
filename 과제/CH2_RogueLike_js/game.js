import chalk from 'chalk';
import readlineSync from 'readline-sync';
import { getRandomInt } from './server.js';

//
class Player {
  //Player 객체 만들어 질 때 ()있는 값들 받아서 내 Plyer 스탯으로 하겠다.
  constructor(hp, fullness, happiness, pAttack) {
    this.hp = hp;
    this.fullness = fullness;
    this.happiness = happiness;
    this.pAttack = pAttack;
  }

  attack() {
    return this.pAttack;
  }

  damage(n) {
    this.hp -= n;
  }
}

class IceMonster {
  constructor(hp, iAttack) {
    this.hp = hp;
    this.iAttack = iAttack;
  }

  attack() {
    //console.log(`얼음이 공격합니다}`);
    return this.iAttack;
  }

  damage(n) {
    // console.log(`얼음이 공격받았습니다.${n}`);
    this.hp -= n;
  }
}

class HumanMonster {
  constructor(hp, hAttack) {
    this.hp = hp;
    this.hAttack = hAttack;
  }

  attack() {
    return this.hAttack;
  }

  damage(n) {
    this.hp -= n;
  }
}

/////////////Class////////////////////
/////////텍스트 수정하기//////
function displayStatus(stage, player, monster) {
  //console.clear();
  console.log(chalk.magentaBright(`\n=== 현재 플레이어 상태 ===`));
  console.log(chalk.cyanBright(`| Stage: ${stage}\n `));
  console.log(
    chalk.blueBright(
      `| 체력 : ${player.hp}   포만감 : ${player.fullness}   행복 : ${player.happiness}       `,
    ),
  );
  // (chalk.redBright("")) <- 붉은 색 텍스트 출력
  console.log(chalk.magentaBright(`=====================\n`));
}
////////////고정 화면///////////////////////////

//////////스테이지////////////////
const battle = async (stage, player, dLog) => {
  // 무시하기, 도망가기에서 호출하기
  let logs = [];

  while (player.hp > 0 && player.fullness > 0 && stage <= 10) {
    let choice = '';
    // console.clear();

    console.log('\n\n 길을 따라 걸어 갑니다...\n'); // 길 그림 추가하고 싶음
    choice = readlineSync.question(chalk.blueBright('Enter를 누르세요.'));
    if (player.hp < 95) {
      player.hp += 5;
    }
    player.fullness -= 2;
    if (player.fullness < 20) {
      console.log(`포만감 : ${player.fullness}  배가 고픕니다. 도움을 주고 식량을 얻으세요`);
    }

    //대사 1,2 -> 산을 걷고 있다....
    //Enter 입력
    //랜덤을 돌린다(0 ~ 10)
    // //
    const rand = 0; // getRandomInt(4);
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
  let rand = getRandomInt(10);

  console.log(chalk.blueBright(`\n1. 도와준다. 2. 도망간다.`));
  let choice = readlineSync.question(chalk.blueBright('당신의 선택은?'));
  if (choice === '1') {
    logs.push(`도와주기를 선택하셨습니다.`);

    if (rand <= 7) {
      logs.push(chalk.green('사람에게 공격당하셨습니다.'));
      console.log(chalk.red(`\n\n사람에게 공격당하셨습니다.`));
      //사람과 전투 while()
      const hMonster = new HumanMonster(rand + stage * 30, 10 + stage * 2);
      while (hMonster.hp > 0 && player.hp > 0 && player.fullness > 0) {
        console.log(chalk.redBright(`\n남은 적 : ${hMonster.hp}`));
        console.log(chalk.green(`\n플레이어 hp : ${player.hp} 포만감 : ${player.fullness}`));
        console.log(chalk.blueBright(`\n1. 공격한다. 2. 방어한다. 3.도망간다.`));
        choice = readlineSync.question(chalk.blueBright('당신의 선택은? '));
        player.fullness -= 2;
        switch (choice) {
          case '1':
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
          case '2':
            console.log('2. 방어한다.');
            // logs.push없이 공격, 방어만
            if (rand <= 4) {
              console.log(chalk.yellow('공격을 받았지만 방어했습니다.'));
            } else {
              console.log(chalk.yellow('방어했습니다.'));
            }
            break;
          case '3':
            console.log('3. 도망치셨습니다.');
            logs.push('3.도망가기를 선택하셨습니다.');
            await battle(stage, player);
            return;
        }
      }

      if (player.hp > 0 && player.fullness > 0 && hMonster.hp < 0) {
        // 보상
        console.clear();
        logs.push('사람을 이겼습니다.');
        player.hp += 10;
        player.fullness = 100;
        player.happiness -= 7;
        console.log('사람을 이겼습니다. 플레이어 채력 +10, 포만감 +100, 행복 -7');
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
            //console.log('2. 스테이지 처음으로 선택');
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
            //  console.log('3번 선택');
            process.exit();
            return;
        }
      }
    } else {
      logs.push(chalk.green('사람을 도와 얼음을 부수세요.'));
      console.log(chalk.blue(`\n\n사람을 도와 얼음을 부수세요.`));
      //얼음 부수기 while()
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

    if (player.hp > 0 && player.fullness > 0) {
      // 보상
      console.clear();
      console.log(`얼음 속의 빵을 얻었습니다.`);
      player.hp += 10;
      player.fullness += 15;
      player.happiness += 7;
      logs.push(chalk.green(`얼음을 부쉈습니다.`));
      console.log('플레이어 채력 +10, 포만감 +15, 행복 +7');
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
    console.log('3. 도망치셨습니다.'); // 안도와주고 도망가기
    player.happiness -= 3;
    await battle(stage, player);
    return;
  } else {
    console.log(`1,2 중 하나만 입력해주세요`);
    MeetHuman(player, logs, stage);
  }
};
////////사람/////////////////
/////////울버린/////////////
const MeetWolverene = async (player, logs, stage, dLog) => {
  let rand = getRandomInt(10);

  console.log(chalk.blueBright(`\n1. 도와준다. 2. 무시한다.`));
  let choice = readlineSync.question(chalk.blueBright('당신의 선택은? '));
  if (choice === '1') {
    logs.push(chalk.green(`도와주기를 선택하셨습니다.`));

    logs.push(chalk.green('울버린을 도와 얼음을 부수세요.'));
    console.log(chalk.blue(`\n\n울버린을 도와 얼음을 부수세요.`));
    //얼음 부수기 while()
    const iMonster = new IceMonster(rand + stage * 20, 3 + stage * 2);
    while (iMonster.hp > 0 && player.hp > 0 && player.fullness > 0) {
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

    if (player.hp > 0 && player.fullness > 0) {
      // 보상

      console.clear();
      console.log(`얼음 속의 고기를 얻었습니다.`);
      player.hp += 10;
      player.fullness += 20;
      player.happiness += 7;
      logs.push(chalk.green(`얼음을 부쉈습니다.`));
      console.log('플레이어 채력 +10, 포만감 +20, 행복 +7');
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
export async function startGame() {
  console.clear();
  let dLog = null;

  //constructor(hp, fullness, happiness, pAttack)
  const player = new Player(100, 40, 40, 10);
  // console.log('new Player(100, 80, 40, 20); 생성');

  //player 변수는 Player클래스를 통해서 객체로 생성 되었다()안에 있는 값을 가지고
  let stage = 0;

  while (stage <= 10 && player.hp > 0 && player.fullness > 0) {
    //console.clear(); // 보상 출력문이 사라져서 이동
    // console.log('게임스타트 While문');

    // displayStatus(stage, player);
    if (player.hp > 0 && player.fullness > 0) {
      stage++; // 사망 후 스테이지++방지
      if (stage <= 10) {
        displayStatus(stage, player);
      }
      await battle(stage, player, dLog);

      // 스테이지 클리어 및 게임 종료 조건
      //displayStatus(stage, player);
      player.pAttack = 10 + 2 * stage;
    } else {
      console.log('게임 오버! 다시 시작하세요.');
      return;
    }
  }
  if (stage >= 10 && player.hp > 0 && player.fullness > 0) {
    console.log(chalk.green('축하합니다! 모든 스테이지를 클리어하셨습니다!\n'));
    if (player.happiness > 80) {
      console.log('즐거운 여행을 마친 베르노. 행복하게 집으로 돌아갑니다.');
    } else if (player.happiness > 40) {
      console.log('괜찮은 여행이었어요. 이번엔 어디로 여행을 가볼까요?');
    } else if (player.happiness > 10) {
      console.log('힘들어요 ㅠㅠ 어서 집으로 돌아가고 싶네요');
    } else {
      console.log('우울해요. 괜히 나왔어. 집으로 돌아갈래요');
    }
  } else if (dLog === '2. 이 스테이지에서 한번더 선택') {
    displayStatus(stage, player);
    console.log('사망하셨습니다. 게임이 종료 됩니다.');
  } else {
    displayStatus(stage, player);
    console.log('사망하셨습니다. 게임이 종료 됩니다.');
  }
}
