let size = 0;
let moving = false;
let drawing = false;

let field = [];
for (let i = 0; i < 20; i++) {
  field[i] = [];
  for (let j = 0; j < 20; j++) {
    field[i][j] = false
  }
}

const canvas = document.getElementById("canvas");
canvas.addEventListener("mouseup", onClick, false);
canvas.addEventListener("mousemove", onMove, false);

function resetCanvas() {
  for (let i = 0; i < 20; i++) {
    field[i] = [];
    for (let j = 0; j < 20; j++) {
      field[i][j] = false
    }
  }
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#DDDDDD";
  ctx.fillRect(0, 0, 300, 300);
}

function setSize(s) {
  size = s;
  resetCanvas();
}

function onClick(e) {
  if (moving) {
    moving = false;
    return;
  }
  let rectSize = 60;
  if (size === 1) rectSize = 30;
  if (size === 2) rectSize = 20;
  if (size === 3) rectSize = 15;
  let rect = e.target.getBoundingClientRect();
  let x = Math.floor((e.clientX - rect.left) / rectSize);
  let y = Math.floor((e.clientY - rect.top) / rectSize);
  field[x][y] = !field[x][y];
  const ctx = canvas.getContext("2d");
  if (field[x][y]) {
    ctx.fillStyle = "#000000";
    ctx.fillRect(x * rectSize, y * rectSize, rectSize, rectSize);
  } else {
    ctx.fillStyle = "#DDDDDD";
    ctx.fillRect(x * rectSize, y * rectSize, rectSize, rectSize);
  }
}

function onMove(e) {
  if (e.buttons === 1 || e.witch === 1) {
    let rectSize = 60;
    if (size === 1) rectSize = 30;
    if (size === 2) rectSize = 20;
    if (size === 3) rectSize = 15;
    let rect = e.target.getBoundingClientRect();
    let x = Math.floor((e.clientX - rect.left) / rectSize);
    let y = Math.floor((e.clientY - rect.top) / rectSize);
    const ctx = canvas.getContext("2d");
    if (!moving) {
      moving = true;
      drawing = !field[x][y];
    }
    if (drawing) {
      ctx.fillStyle = "#000000";
      field[x][y] = drawing;
      ctx.fillRect(x * rectSize, y * rectSize, rectSize, rectSize);
    } else {
      ctx.fillStyle = "#DDDDDD";
      field[x][y] = drawing;
      ctx.fillRect(x * rectSize, y * rectSize, rectSize, rectSize);
    }
  }
}

function dump() {
  dumpRow();
  dumpCol();
  dumpArray();
}

function dumpRow() {
  let message = "";
  for (let i = 0; i < (size + 1) * 5; i++) {
    let rowMessage = "";
    let counter = 0;
    for (let j = 0; j < (size + 1) * 5; j++){
      if (field[j][i]) {
        counter++;
      } else {
        if (counter > 0) {
          rowMessage += counter + ",";
          counter = 0;
        }
      }
    }
    if (counter > 0) {
      rowMessage += counter + ",";
      counter = 0;
    }
    if (!rowMessage) rowMessage = "0,";
    rowMessage = rowMessage.slice(0, rowMessage.length - 1);
    message += rowMessage + "<br>";
  }
  document.getElementById("row").innerHTML = message;
}

function dumpCol() {
  let message = "";
  for (let i = 0; i < (size + 1) * 5; i++) {
    let rowMessage = "";
    let counter = 0;
    for (let j = 0; j < (size + 1) * 5; j++){
      if (field[i][j]) {
        counter++;
      } else {
        if (counter > 0) {
          rowMessage += counter + ",";
          counter = 0;
        }
      }
    }
    if (counter > 0) {
      rowMessage += counter + ",";
      counter = 0;
    }
    if (!rowMessage) rowMessage = "0,";
    rowMessage = rowMessage.slice(0, rowMessage.length - 1);
    message += rowMessage + "<br>";
  }
  document.getElementById("col").innerHTML = message;
}

function dumpArray() {
  let message = "arrayOf(";
  for (let i = 0; i < (size + 1) * 5; i++) {
    message += "<br>intArrayOf(";
    for (let j = 0; j < (size + 1) * 5; j++) {
      if (field[j][i]) {
        message += "1, ";
      } else {
        message += "0, ";
      }
    }
    message = message.slice(0, message.length - 2);
    message += "),";
  }
  message = message.slice(0, message.length - 1);
  message += ")";
  document.getElementById("array").innerHTML = message;
}
