const createGameOverModal = () => {
  const gameOverModalElement = document.createElement("div");

  gameOverModalElement.id = "game-over-modal";

  const contentWrapperElement = document.createElement("div");

  contentWrapperElement.id = "game-over-modal-content-wrapper";

  const headerElement = document.createElement("div");

  headerElement.id = "game-over-modal-content-header";
  headerElement.textContent = "Game Over";

  const contentElement = document.createElement("div");

  contentElement.id = "game-over-modal-content";

  const scoreElement = document.createElement("div");

  scoreElement.id = "game-over-modal-score";

  const actionsElement = document.createElement("div");

  actionsElement.id = "game-over-modal-actions";

  const closeButtonElement = document.createElement("div");

  closeButtonElement.id = "game-over-modal-close-button";
  closeButtonElement.textContent = "Fechar";

  closeButtonElement.addEventListener("click", () => {
    state.view.startButton.style.display = "flex";
    state.view.panel.style.display = "none";
    gameOverModalElement.style.display = "none";

    state.values.lastHittedPosition = null;
    state.values.enemyPosition = null;
    state.values.currentTime = 60;
    state.values.currentScore = 0;
    state.view.score.textContent = 0;
  });

  document.addEventListener("openGameOverModal", () => {
    gameOverModalElement.style.display = "flex";
    scoreElement.textContent = `Score: ${state.values.currentScore}`;
  });

  contentWrapperElement.appendChild(headerElement);
  contentElement.appendChild(scoreElement);
  contentWrapperElement.appendChild(contentElement);
  actionsElement.appendChild(closeButtonElement);
  contentWrapperElement.appendChild(actionsElement);
  gameOverModalElement.appendChild(contentWrapperElement);
  document.body.appendChild(gameOverModalElement);
};

createGameOverModal();
