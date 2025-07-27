// 模擬家電狀態資料
const appliances = [
  { id: 'ac', name: '冷氣', status: true },
  { id: 'light', name: '燈', status: false },
  { id: 'tv', name: '電視', status: true },
  { id: 'fridge', name: '冰箱', status: true }
];

// 模擬用電量資料
const weekUsage = [12, 15, 18, 22, 19, 25, 20]; // 單位：度
const monthUsage = [320, 310, 295, 340, 360, 330, 350, 370, 390, 410, 400, 420, 430, 440, 450, 460, 470, 480, 490, 500, 510, 520, 530, 540, 550, 560, 570, 580, 590, 600];
const weekLabels = ['週一', '週二', '週三', '週四', '週五', '週六', '週日'];
const monthLabels = Array.from({length: 30}, (_, i) => `${i+1}日`);

// 模擬最高用電時段與家電
const peakTime = '18:00 - 19:00';
const topAppliance = '冷氣';

// 初始化家電狀態
function renderApplianceStatus() {
  appliances.forEach(appliance => {
    const el = document.getElementById(appliance.id).querySelector('.status');
    el.textContent = appliance.status ? '開啟' : '關閉';
    el.className = 'status' + (appliance.status ? '' : ' off');
  });
}

// 用電量圖表
let currentMode = 'week';
function renderUsageChart() {
  const data = currentMode === 'week' ? weekUsage : monthUsage;
  const categories = currentMode === 'week' ? weekLabels : monthLabels;
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

// 初始化最高用電時段與家電
function renderPeakInfo() {
  document.getElementById('peak-time').textContent = peakTime;
  document.getElementById('top-appliance').textContent = topAppliance;
}

// 初始化
window.onload = function() {
  renderApplianceStatus();
  renderUsageChart();
  setupToggleButtons();
  renderPeakInfo();
}; 