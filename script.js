document.getElementById("calcForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const fluid = document.getElementById("fluidSelect").value;
  const fluids = {
    water: { Cp: 4.18, density: 1000 },
    oil: { Cp: 2.0, density: 850 },
    air: { Cp: 1.01, density: 1.2 }
  };

  const Cp = fluids[fluid].Cp;
  const density = fluids[fluid].density;

  const tHotIn = parseFloat(document.getElementById("tHotIn").value);
  const tHotOut = parseFloat(document.getElementById("tHotOut").value);
  const tColdIn = parseFloat(document.getElementById("tColdIn").value);
  const tColdOut = parseFloat(document.getElementById("tColdOut").value);
  const massFlow = parseFloat(document.getElementById("massFlow").value);
  const length = parseFloat(document.getElementById("length").value);
  const diameter = parseFloat(document.getElementById("diameter").value);

  const U = 0.5; // kW/m²·K
  const f = 0.02;

  const Q = massFlow * Cp * (tHotIn - tHotOut);

  const deltaT1 = tHotIn - tColdOut;
  const deltaT2 = tHotOut - tColdIn;
  const LMTD = (deltaT1 - deltaT2) / Math.log(deltaT1 / deltaT2);

  const area = Q / (U * LMTD);

  const flowArea = Math.PI * Math.pow(diameter / 2, 2);
  const velocity = (massFlow / density) / flowArea;

  const pressureDrop = f * (length / diameter) * (density * velocity ** 2 / 2) / 1000;

  document.getElementById("result").innerHTML = `
    <p><strong>Fluid:</strong> ${fluid.toUpperCase()}</p>
    <p><strong>Heat Duty (Q):</strong> ${Q.toFixed(2)} kW</p>
    <p><strong>LMTD:</strong> ${LMTD.toFixed(2)} °C</p>
    <p><strong>Required Heat Transfer Area:</strong> ${area.toFixed(2)} m²</p>
    <p><strong>Estimated Pressure Drop:</strong> ${pressureDrop.toFixed(2)} kPa</p>
  `;
});
