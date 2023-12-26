const createPanel = ({ numColumns, numRows }) => {
  const panelContainerElement = document.querySelector(".panel-container");
  const panelElement = document.createElement("div");

  document.documentElement.style.setProperty("--panel-num-columns", numColumns);
  document.documentElement.style.setProperty("--panel-num-rows", numRows);

  panelElement.id = "panel";

  for (let i = 0; i < numColumns * numRows; i++) {
    const panelCellElement = document.createElement("div");

    panelCellElement.id = `panel-cell-${i}`;
    panelCellElement.classList.add("panel-cell");

    panelElement.appendChild(panelCellElement);
  }

  panelContainerElement.appendChild(panelElement);
};

createPanel({ numColumns: 3, numRows: 3 });
