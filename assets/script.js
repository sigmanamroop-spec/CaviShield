// assets/script.js
document.addEventListener('DOMContentLoaded',()=>{
  // Menu toggle for small screens
  const menuToggle=document.getElementById('menu-toggle');
  const sidebar=document.getElementById('sidebar');
  menuToggle.addEventListener('click',()=>{sidebar.style.display = (sidebar.style.display === 'block') ? 'none' : 'block'});

  // Footer year
  document.getElementById('year').textContent = new Date().getFullYear();

  // Gauge draw (uses stroke-dashoffset)
  const progress = document.querySelector('.gauge').getAttribute('data-value') || 0;
  const circle = document.querySelector('.gauge-progress');
  const radius = 50; // matches r in svg
  const circumference = 2 * Math.PI * radius;
  circle.style.strokeDasharray = `${circumference}`;
  const offset = circumference * (1 - (progress/100));
  circle.style.strokeDashoffset = offset;

  // Download logs (print to PDF)
  const downloadBtn=document.getElementById('download-logs');
  if(downloadBtn){
    downloadBtn.addEventListener('click',()=>{
      // Open a printable view
      const printable = document.createElement('div');
      printable.innerHTML = `<h2>Compliance & Logs — Smart Cavitation Connect</h2>` + document.getElementById('log-items').outerHTML;
      const w = window.open('','_blank');
      w.document.write('<html><head><title>Logs</title><style>body{font-family:Arial;padding:20px}</style></head><body>'+printable.innerHTML+'</body></html>');
      w.document.close();
      w.print();
    });
  }

  // Bluetooth scanner mock
  const devicesList = document.getElementById('bt-devices');
  const btBanner = document.getElementById('bt-banner');
  const sampleDevices = [
    {name:'Cavitation_System_V1', rssi:-42},
    {name:'Nozzle_Controller_3', rssi:-68},
    {name:'Spare_Module_A', rssi:-82}
  ];

  function rssiToBars(rssi){
    if(rssi>-50) return '▮▮▮▮';
    if(rssi>-70) return '▮▮▮▯';
    if(rssi>-90) return '▮▮▯▯';
    return '▮▯▯▯';
  }

  function populateDevices(){
    devicesList.innerHTML = '';
    sampleDevices.forEach((d, i)=>{
      const li = document.createElement('li');
      li.innerHTML = `<span>${d.name} <small class="muted">(${rssiToBars(d.rssi)})</small></span>`;
      const btn = document.createElement('button');
      btn.className='btn';
      btn.textContent='Connect';
      btn.addEventListener('click',()=>{
        connectDevice(d);
      });
      li.appendChild(btn);
      devicesList.appendChild(li);
    });
  }

  function connectDevice(d){
    btBanner.textContent = `Connected to ${d.name}`;
    btBanner.classList.add('connected');
    // show RSSI next to banner
    const rssiEl = document.createElement('div');
    rssiEl.style.marginTop='8px';
    rssiEl.textContent = `Signal: ${d.rssi} dBm`;
    btBanner.appendChild(rssiEl);
  }

  // Simulate scanning
  setTimeout(()=>{
    populateDevices();
    btBanner.textContent = 'Found 3 devices';
  },1200);

  // Data sync toggle
  const syncToggle = document.getElementById('sync-toggle');
  if(syncToggle){
    syncToggle.addEventListener('change',(e)=>{
      if(e.target.checked){
        alert('Forcing data sync via Bluetooth... (simulate)');
      }
    });
  }

});
