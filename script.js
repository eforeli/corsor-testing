// 模擬家電狀態與用電量（每家電獨立）
const appliances = [
  { id: 'ac', name: '冷氣', status: true, weekUsage: [5, 6, 7, 8, 7, 9, 8], monthUsage: [120, 110, 115, 130, 140, 135, 138, 142, 145, 150, 148, 152, 155, 158, 160, 162, 165, 168, 170, 172, 175, 178, 180, 182, 185, 188, 190, 192, 195, 198] },
  { id: 'light', name: '燈', status: false, weekUsage: [2, 2, 3, 4, 3, 4, 3], monthUsage: [40, 38, 36, 42, 44, 41, 43, 45, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68] },
  { id: 'tv', name: '電視', status: true, weekUsage: [3, 4, 5, 6, 5, 7, 6], monthUsage: [80, 78, 75, 85, 90, 88, 89, 92, 95, 98, 97, 99, 100, 102, 104, 106, 108, 110, 112, 114, 116, 118, 120, 122, 124, 126, 128, 130, 132, 134] },
  { id: 'fridge', name: '冰箱', status: true, weekUsage: [2, 3, 3, 4, 4, 5, 3], monthUsage: [80, 84, 69, 83, 86, 66, 80, 91, 103, 114, 106, 119, 124, 128, 133, 138, 142, 146, 150, 154, 158, 162, 166, 170, 174, 178, 182, 186, 190, 194] }
];

const weekLabels = ['週一', '週二', '週三', '週四', '週五', '週六', '週日'];
const monthLabels = Array.from({length: 30}, (_, i) => `${i+1}日`);

const peakTime = '18:00 - 19:00';

// 狀態渲染
function renderApplianceStatus() {
  appliances.forEach(appliance => {
    const checkbox = document.getElementById(`switch-${appliance.id}`);
    checkbox.checked = appliance.status;
    checkbox.onchange = function() {
      appliance.status = this.checked;
      renderUsageChart();
      renderTopAppliance();
    };
  });
}

// 用電量圖表（只統計開啟的家電）
let currentMode = 'week';
function renderUsageChart() {
  let data = [];
  let categories = currentMode === 'week' ? weekLabels : monthLabels;
  // 統計所有開啟家電的用電量加總
  for (let i = 0; i < categories.length; i++) {
    let sum = 0;
    appliances.forEach(appliance => {
      if (appliance.status) {
        sum += currentMode === 'week' ? appliance.weekUsage[i] : appliance.monthUsage[i];
      }
    });
    data.push(sum);
  }
  Highcharts.chart('usage-chart', {
    chart: {
      type: 'column',
      backgroundColor: '#181c2f',
      style: { fontFamily: 'Segoe UI, 微軟正黑體, Arial, sans-serif' }
    },
    title: { text: '' },
    xAxis: {
      categories: categories,
      labels: { style: { color: '#fff' } }
    },
    yAxis: {
      min: 0,
      title: { text: '用電量 (度)', style: { color: '#fff' } },
      labels: { style: { color: '#fff' } }
    },
    series: [{
      name: '用電量',
      data: data,
      color: '#ffb347',
      borderRadius: 6
    }],
    legend: { enabled: false },
    credits: { enabled: false }
  });
}

// 切換按鈕事件
function setupToggleButtons() {
  document.getElementById('week-btn').onclick = function() {
    currentMode = 'week';
    this.classList.add('active');
    document.getElementById('month-btn').classList.remove('active');
    renderUsageChart();
  };
  document.getElementById('month-btn').onclick = function() {
    currentMode = 'month';
    this.classList.add('active');
    document.getElementById('week-btn').classList.remove('active');
    renderUsageChart();
  };
}

// 最高耗電家電（僅統計開啟的）
function renderTopAppliance() {
  let max = 0;
  let top = '無';
  appliances.forEach(appliance => {
    if (appliance.status) {
      // 以本週/本月總用電量判斷
      const total = currentMode === 'week' ? appliance.weekUsage.reduce((a,b)=>a+b,0) : appliance.monthUsage.reduce((a,b)=>a+b,0);
      if (total > max) {
        max = total;
        top = appliance.name;
      }
    }
  });
  document.getElementById('top-appliance').textContent = top;
}

// 最高用電時段（維持原本模擬值）
function renderPeakInfo() {
  document.getElementById('peak-time').textContent = peakTime;
}

window.onload = function() {
  renderApplianceStatus();
  renderUsageChart();
  setupToggleButtons();
  renderPeakInfo();
  renderTopAppliance();
}; 