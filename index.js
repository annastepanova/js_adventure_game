let  readlineSync  =  require('readline-sync');


let userName = readlineSync.question('May I have your name? ');
console.log('Hi ' + userName + '! ' + 'Welcome to the Game!');

console.log("============================")
console.log("The Bun")
console.log("============================")


const scenarios = {
  intro: {
    prompt: "What do you want to do?",
    text: "You found yourself in a body of a fresh yummy bun. You are lying on the windowsill. You see your grandmother and grandfather in the kitchen.",
    options: [
      {
        key: 'firstFork',
        action: "Run away"
      },
      {
        key: 'knife',
        action: "Keep lying on the window"
      }
    ],
  },
  firstFork: {
    prompt: "What do you want to do now?",
    text: "You run away and keep running along the road. You came to the fork.",
    options: [
      {
        key: 'rabbit',
        action: "go to the left"
      },
      {
        key: 'bear',
        action: "go to the right"
      }
    ]
  },
  knife: {
    prompt: "What do you want to do?",
    text: "Grandmother and grandfather got a knife and coming to you...",
    options: [
      {
        key: 'youLose',
        action: "Well, let's see what happens.."
      }
    ]
  },
  rabbit: {
    prompt: "What do you want to do?",
    text: `You meet a rabbit. Rabbit says: ${userName} Little Bun, I want to eat you!`,
    options: [
      {
        key: 'caughtUp',
        action: 'run away'
      },
      {
        key: 'secondFork',
        action: 'punch him into a face'
      },
      {
        key: 'talented',
        action: "sing a song"
      }
    ]
  },
  bear: {
    prompt: "What do you want to do?",
    text: `You meet a bear. Bear says: ${userName} Little Bun, I want to eat you!`,
    options: [
      {
        key: 'secondFork',
        action: 'run away'
      },
      {
        key: 'youLose',
        action: 'punch him into a face'
      },
      {
        key: 'talented',
        action: "sing a song"
      }
    ]
  },
  secondFork: {
    prompt: "What do you want to do?",
    text: "You are succesfully run away and continue your journey. You came to a fork.",
    options: [
      {
        key: 'fox',
        action: 'go to the left'
      },
      {
        key: 'bed',
        action: 'go to the right'
      }
    ]
  },
  talented: {
    prompt: "What do you want to do?",
    text: "Your enemy says: Well, you have an amazing talent but I eat you anyway, hahaha...",
    options: [
      {
        key: 'youLose',
        action: "Well, let's see what happens.."
      }
    ]
  },
  bed: {
    prompt: "What do you want to do?",
    text: "You continue your journey. You run along the road and see a bed",
    options: [
      {
        key: 'nap',
        action: 'get into bed'
      },
      {
        key: 'caughtUp',
        action: 'continue to run'
      }
    ]
  },
  fox: {
    prompt: "What do you want to do?",
    text: `You run along the road and meet Red Fox. Fox says: ${userName} Little Bun, I want to eat you!`,
    options: [
      {
        key: 'caughtUp',
        action: 'run away'
      },
      {
        key: 'bed',
        action: 'punch him into a face'
      },
      {
        key: 'talented',
        action: 'sing a song'
      }
    ]
  },
  caughtUp: {
    prompt: "What do you want to do?",
    text: "Your enemy runs faster than you. He caught you up.",
    options: [
      {
        key: 'youLose',
        action: "Well, let's see what happens.."
      }
    ]
  },
  nap: {
    prompt: "What do you want to do?",
    text: "You wrapped in a blanket. You feel sleepy...",
    options: [
      {
        key: 'youWon',
        action: 'take a nap'
      },
      {
        key: 'caughtUp',
        action: 'continue to run'
      }
    ]
  },
  youWon: {
    prompt: "",
    text: "You wake up alive in your bed in your lovely house. You are not a bun anymore. That's was just a horrible dream...",
    options: []
  },
  youLose: {
    prompt: "",
    text: "Oh God! They ate you! You lost the game...",
    options: []
  }
};

const getPrompts = scenario => {
  const mainPrompt = scenario.prompt,
  options = scenario.options,
  text = scenario.text,
  optionsLength = options.length,
  optionsPrompt = options
     .map((option, i) => `[${i + 1}] ${option.action}`)
      .join("\n");
  return { mainPrompt, text, options, optionsLength, optionsPrompt }
}

const bun = (currentScenario = scenarios.intro) => {
  const { text, mainPrompt, options, optionsLength, optionsPrompt } = getPrompts(currentScenario);
  console.log(text)

  let response = readlineSync.question(`${mainPrompt}\n${optionsPrompt}\n`)
  response = parseInt(response);
  if (response > optionsLength) response = NaN;
  if (isNaN(response)) console.log(`"${response}" is not a valid choice.`);
  if (!response) bun(currentScenario);

  const nextScenario = options[response - 1].key
  bun(scenarios[nextScenario])
}

bun();



