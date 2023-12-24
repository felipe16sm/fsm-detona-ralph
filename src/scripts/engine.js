const state = {
  view: {
    panelCells: document.querySelectorAll(".panel-cell"),
    enemy: document.querySelector(".enemy"),
    timeLeft: document.querySelector("#time-value"),
    score: document.querySelector("#score-value"),
  },
  values: {
    enemyPosition: null,
    enemyVelocity: 900,
    result: 0,
    currentTime: 60,
  },
  actions: {
    runGameClock: () => {
      runGameClock();
    },
    stopGameClock: ({ clock, action }) => {
      stopGameClock({ clock, action });
    },
    clearEnemyPosition: () => {
      clearEnemyPosition();
    },
    changeEnemyPositionRandomicaly: () => {
      changeEnemyPositionRandomicaly();
    },
  },
};

const runGameClock = () => {
  state.view.timeLeft.textContent = state.values.currentTime;
  const clock = setInterval(() => {
    if (state.values.currentTime <= 0) {
      state.actions.stopGameClock({
        clock,
        action: () => {
          alert("Game Over!");
        },
      });
      return;
    }
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;
  }, 1000);
};

const stopGameClock = ({ clock, action }) => {
  clearInterval(clock);
  action && action();
};

const clearEnemyPosition = () => {
  const enemyElement = document.querySelector(".enemy");

  enemyElement && enemyElement.classList.remove("enemy");
};

const changeEnemyPositionRandomicaly = () => {
  const enemyPositionInterval = setInterval(() => {
    state.actions.clearEnemyPosition();

    if (state.values.currentTime <= 0) {
      clearInterval(enemyPositionInterval);
      return;
    }

    let enemyPosition = drawEnemyPosition();

    while (enemyPosition === state.values.enemyPosition) {
      enemyPosition = drawEnemyPosition();
    }

    state.values.enemyPosition = enemyPosition;

    paintEnemyPosition({ enemyId: enemyPosition });
  }, state.values.enemyVelocity);
};

const drawEnemyPosition = () => {
  let enemyPosition = Math.floor(Math.random() * state.view.panelCells.length);

  return enemyPosition;
};

const paintEnemyPosition = ({ enemyId }) => {
  const enemyElement = document.getElementById(`panel-cell-${enemyId}`);

  enemyElement.classList.add("enemy");
};

const runMatch = () => {
  state.actions.runGameClock();
  state.actions.changeEnemyPositionRandomicaly();
};

const initialize = () => {
  runMatch();
};

initialize();
