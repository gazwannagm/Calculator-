const mapToBytes = {
  "Kb": 128,
  "KB": 1024,
  "Mb": 131072,
  "MB": 1048576,
  "Gb": 134217728,
  "GB": 1073741824,
  "Tb": 137438953472,
  "TB": 1099511627776
};

const calculateButton = document.querySelector("#calculate");
const speedDropdown = document.querySelector("#speed-dropdown");
const speedButton = document.querySelector("#speed-button");
const speedInput = document.querySelector("#speed");
const sizeDropdown = document.querySelector("#size-dropdown");
const sizeButton = document.querySelector("#size-button");
const sizeInput = document.querySelector("#size");
const time = document.querySelector("#time");

const calculateSeconds = function (speed, speedUnit, size, sizeUnit) {
  const bytesSpeed = mapToBytes[speedUnit.substring(0, 2)] * speed;
  const bytesSize = mapToBytes[sizeUnit.substring(0, 2)] * size;
  return bytesSize / bytesSpeed;
};

const updateTime = function () {
  const speed = speedInput.value;
  const size = sizeInput.value;
  const speedUnit = speedButton.textContent;
  const sizeUnit = sizeButton.textContent;
  const seconds = calculateSeconds(speed, speedUnit, size, sizeUnit);

  let text = "";

  if (isNaN(seconds) || seconds == null) {
    text = "";
  } else if (seconds < 1) {
    text = "Less than a second";
  } else {
    text = humanizeDuration(seconds * 1000, {
      conjunction: ' and ',
      round: true,
      serialComma: false
    });
  }

  time.textContent = text;
};

speedDropdown.querySelectorAll(".dropdown-item").forEach(item => {
  item.addEventListener("click", () => {
    speedButton.textContent = item.textContent;
  })
});