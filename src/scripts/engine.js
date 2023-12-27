const state = {
  view: {
    panel: document.getElementById("panel"),
    panelCells: document.querySelectorAll(".panel-cell"),
    enemy: document.querySelector(".enemy"),
    timeLeft: document.querySelector("#time-value"),
    score: document.querySelector("#score-value"),
    startButton: document.getElementById("start-game"),
  },
  values: {
    lastHittedPosition: null,
    enemyPosition: null,
    enemyVelocity: 1000,
    currentScore: 0,
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
    verifyHitScore: () => {
      verifyHitScore();
    },
  },
};

const runGameClock = () => {
  state.view.timeLeft.textContent = state.values.currentTime;
  const clock = setInterval(() => {
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;
    if (state.values.currentTime <= 0) {
      state.actions.stopGameClock({
        clock,
        action: () => {
          const gameOverModalEvent = new Event("openGameOverModal");
          document.dispatchEvent(gameOverModalEvent);
        },
      });
      return;
    }
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
  let enemyPosition = drawEnemyPosition();

  state.values.enemyPosition = drawEnemyPosition();
  paintEnemyPosition({ enemyId: enemyPosition });

  const enemyPositionInterval = setInterval(() => {
    state.actions.clearEnemyPosition();

    if (state.values.currentTime <= 0) {
      clearInterval(enemyPositionInterval);
      return;
    }

    enemyPosition = drawEnemyPosition();

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

const verifyHitScore = () => {
  state.view.panelCells.forEach((cell, i) => {
    cell.addEventListener("click", () => {
      if (cell.classList.contains("enemy")) {
        if (state.values.lastHittedPosition === i) {
          return;
        }

        state.values.lastHittedPosition = i;
        state.values.currentScore++;

        updateScoreInScreen();
      }
    });
  });
};

const updateScoreInScreen = () => {
  state.view.score.textContent = state.values.currentScore;
};

const runMatch = () => {
  state.actions.runGameClock();
  state.actions.changeEnemyPositionRandomicaly();
  state.actions.verifyHitScore();
};

const initialize = () => {
  state.view.startButton.addEventListener("click", () => {
    state.view.startButton.style.display = "none";
    state.view.panel.style.display = "grid";
    runMatch();
  });
};

initialize();
