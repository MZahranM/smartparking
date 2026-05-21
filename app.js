/* ============================================================
   SMART PARKING IoT — Firebase + Chart.js
   ============================================================ */



// =====================================================
// FIREBASE CONFIG
// =====================================================

const firebaseConfig = {

  apiKey: "AIzaSyBTwMNlw7V1eGOGEzR6MZeIXn9HIZT71bE",

  authDomain: "smart-parkiing.firebaseapp.com",

  databaseURL:
  "https://smart-parkiing-default-rtdb.asia-southeast1.firebasedatabase.app",

  projectId: "smart-parkiing",

  storageBucket:
  "smart-parkiing.firebasestorage.app",

  messagingSenderId: "1059121264551",

  appId:
  "1:1059121264551:web:4aed4416da5cf27e786882"
};


// =====================================================
// INIT FIREBASE
// =====================================================

firebase.initializeApp(firebaseConfig);

const database = firebase.database();

console.log("🔥 Firebase Connected");



// =====================================================
// GRAFIK REALTIME — Chart.js
// =====================================================

const MAX_POINTS = 30;

const chartLabels = [];

const chartData = [];

let slotChart;



// =====================================================
// INIT CHART
// =====================================================

document.addEventListener("DOMContentLoaded", () => {

  const ctx =
  document.getElementById("slotChart")
  .getContext("2d");

  slotChart = new Chart(ctx, {

    type: "line",

    data: {

      labels: chartLabels,

      datasets: [{

        label: "Slot Tersedia",

        data: chartData,

        borderColor: "#4f46e5",

        backgroundColor:
        "rgba(79,70,229,0.1)",

        pointBackgroundColor:
        "#4f46e5",

        pointRadius: 3,

        borderWidth: 2,

        tension: 0.4,

        fill: true

      }]
    },

    options: {

      responsive: true,

      plugins: {

        legend: {

          labels: {

            color: "#6b7280"

          }
        }
      },

      scales: {

        x: {

          ticks: {

            color: "#6b7280"

          }
        },

        y: {

          beginAtZero: true,

          ticks: {

            color: "#6b7280",

            stepSize: 1

          }
        }
      }
    }
  });

  console.log("📈 Chart Ready");

});



// =====================================================
// PUSH DATA TO CHART
// =====================================================

function pushChartData(value){

  if(!slotChart) return;

  const now =
  new Date().toLocaleTimeString("id-ID");

  chartLabels.push(now);

  chartData.push(value);

  // LIMIT DATA
  if(chartLabels.length > MAX_POINTS){

    chartLabels.shift();

    chartData.shift();

  }

  slotChart.update();

}



// =====================================================
// FIREBASE REALTIME LISTENER
// =====================================================

// SLOT
database.ref("parking/availableSlots")
.on("value",(snapshot)=>{

    const value = snapshot.val();

    document.getElementById("slotValue")
    .innerHTML = value + " / 10";

    // UPDATE CHART
    pushChartData(value);

});



// STATUS PARKIR
database.ref("parking/status")
.on("value",(snapshot)=>{

    document.getElementById("parkingStatus")
    .innerHTML = snapshot.val();

});



// SENSOR MASUK
database.ref("sensor/distIn")
.on("value",(snapshot)=>{

    document.getElementById("sensorIn")
    .innerHTML =
    snapshot.val() + " cm";

});



// SENSOR KELUAR
database.ref("sensor/distOut")
.on("value",(snapshot)=>{

    document.getElementById("sensorOut")
    .innerHTML =
    snapshot.val() + " cm";

});



// GATE MASUK
database.ref("gate/in")
.on("value",(snapshot)=>{

    document.getElementById("gateIn")
    .innerHTML =
    snapshot.val();

});



// GATE KELUAR
database.ref("gate/out")
.on("value",(snapshot)=>{

    document.getElementById("gateOut")
    .innerHTML =
    snapshot.val();

});



// =====================================================
// RESET SLOT
// =====================================================

function resetSlot(){

    database.ref("parking/availableSlots")
    .set(10);

}



// =====================================================
// LAST UPDATE
// =====================================================

setInterval(()=>{

    let now = new Date();

    document.getElementById("lastUpdate")
    .innerHTML =
    now.toLocaleTimeString();

},1000);



// =====================================================
// DEBUG
// =====================================================

console.log("=================================");
console.log(" Smart Parking IoT Loaded");
console.log(" Firebase Connected");
console.log(" Chart.js Connected");
console.log("=================================");