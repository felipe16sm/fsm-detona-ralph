const createPanel = ({ numColumns, numRows, squareSize }) => {
  const panelContainerElement = document.querySelector(".panel-container");
  const panelElement = document.createElement("div");

  panelElement.id = "panel";
  panelElement.style.height = `${numRows * squareSize}px`;
  panelElement.style.gridTemplateColumns = `repeat(${numColumns}, ${squareSize}px)`;
  panelElement.style.gridTemplateRows = `repeat(${numRows}, ${squareSize}px)`;

  for (let i = 0; i < numColumns * numRows; i++) {
    const panelCellElement = document.createElement("div");

    panelCellElement.id = `panel-cell-${i}`;
    panelCellElement.classList.add("panel-cell");

    panelElement.appendChild(panelCellElement);
  }

  panelContainerElement.appendChild(panelElement);
};

createPanel({ numColumns: 3, numRows: 3, squareSize: 120 });
