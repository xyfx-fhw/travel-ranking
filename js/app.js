// 全局变量
let map = null;
let currentRegion = null;
let currentView = 'regions'; // 'regions' 或 'all-spots'
let currentMode = 'cards'; // 'cards' 或 'map'
let markers = [];

// DOM 元素
const bgImage = document.getElementById('bgImage');
const regionList = document.getElementById('regionList');
const regionCount = document.getElementById('regionCount');
const spotsGrid = document.getElementById('spotsGrid');
const spotsContainer = document.getElementById('spotsContainer');
const mapContainer = document.getElementById('mapContainer');
const allSpotsContainer = document.getElementById('allSpotsContainer');
const allSpotsGrid = document.getElementById('allSpotsGrid');
const regionInfo = document.getElementById('regionInfo');
const currentRegionName = document.getElementById('currentRegionName');
const currentRegionDesc = document.getElementById('currentRegionDesc');
const viewToggle = document.getElementById('viewToggle');
const sidebar = document.getElementById('sidebar');

// 模态框元素
const spotModal = document.getElementById('spotModal');
const modalClose = document.getElementById('modalClose');
const modalImage = document.getElementById('modalImage');
const modalRank = document.getElementById('modalRank');
const modalTitle = document.getElementById('modalTitle');
const modalRegion = document.getElementById('modalRegion');
const modalRating = document.getElementById('modalRating');
const modalDescription = document.getElementById('modalDescription');
const modalTags = document.getElementById('modalTags');

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    setupEventListeners();
});

// 初始化应用
function initializeApp() {
    // 渲染网站基础信息
    renderSiteConfig();

    // 设置默认背景
    setBackground(travelData.config.defaultBg);
    
    // 渲染地区列表
    renderRegionList();
    
    // 更新地区计数
    regionCount.textContent = travelData.regions.length;
    
    // 默认选中第一个地区
    if (travelData.regions.length > 0) {
        selectRegion(travelData.regions[0].id);
    }
    
    // 渲染全景点排行榜
    renderAllSpots();
}

// 渲染网站基础配置信息
function renderSiteConfig() {
    const config = travelData.config;
    
    // 网站标题
    document.title = `${config.siteTitle} - ${config.siteSubtitle}`;
    const logoH1 = document.querySelector('.logo h1');
    if (logoH1) logoH1.textContent = config.siteTitle;
    
    const logoSubtitle = document.querySelector('.logo .subtitle');
    if (logoSubtitle) logoSubtitle.textContent = config.siteSubtitle;
    
    // 侧边栏
    const sidebarTitle = document.querySelector('.sidebar-header h2');
    if (sidebarTitle) sidebarTitle.innerHTML = `<i class="fas fa-compass"></i> ${config.sideBarTitle}`;
    
    // 全景点标题
    const allSpotsH2 = document.querySelector('.all-spots-header h2');
    if (allSpotsH2) allSpotsH2.innerHTML = `<i class="fas fa-crown"></i> ${config.allSpotsTitle}`;
    
    const allSpotsP = document.querySelector('.all-spots-header p');
    if (allSpotsP) allSpotsP.textContent = config.allSpotsDesc;
}

// 设置背景图片
function setBackground(imageUrl) {
    bgImage.style.backgroundImage = `url(${imageUrl})`;
}

// 渲染地区列表
function renderRegionList() {
    regionList.innerHTML = '';
    
    travelData.regions.forEach((region, index) => {
        const card = document.createElement('div');
        card.className = 'region-card';
        card.dataset.regionId = region.id;
        
        const rankClass = getRankClass(index + 1);
        const topSpotImage = region.spots[0] ? region.spots[0].image : region.thumbnail;

        card.innerHTML = `
            <div class="region-rank ${rankClass}">${index + 1}</div>
            <div class="region-info-brief">
                <div class="region-name">${region.name}</div>
                <div class="region-date" style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 4px;">
                    <i class="far fa-clock"></i> ${region.date}
                </div>
                <div class="region-spots-count">
                    <i class="fas fa-location-dot"></i>
                    ${region.spots.length} 个景点
                </div>
            </div>
            <div class="region-thumbnail" style="background-image: url(${topSpotImage})"></div>
        `;
        
        card.addEventListener('click', () => selectRegion(region.id));
        regionList.appendChild(card);
    });
}

// 获取排名样式类
function getRankClass(rank) {
    switch (rank) {
        case 1: return 'gold';
        case 2: return 'silver';
        case 3: return 'bronze';
        default: return 'normal';
    }
}

// 选择地区
function selectRegion(regionId) {
    const selectedRegion = travelData.regions.find(r => r.id === regionId); // 改名
    if (!selectedRegion) return;
    
    currentRegion = selectedRegion; // 更新全局变量

    // 更新地区卡片选中状态
    document.querySelectorAll('.region-card').forEach(card => {
        card.classList.toggle('active', card.dataset.regionId === regionId);
    });
    
    // 更新地区信息
    const rankBadge = regionInfo.querySelector('.rank-badge');
    rankBadge.textContent = `#${currentRegion.rank}`;
    currentRegionName.innerHTML = `${currentRegion.name} <span style="font-size: 1rem; color: var(--text-muted); font-weight: 300; margin-left: 10px;">${currentRegion.date}</span>`;
    currentRegionDesc.textContent = currentRegion.description;
    
    // 更新背景为当前地区第一名景点的图片
    if (currentRegion.spots.length > 0) {
        setBackground(currentRegion.spots[0].image);
    }
    
    // 强制重新渲染当前内容，无论模式如何
    renderContent();
}

// 统一渲染入口
function renderContent() {
    // 确保当前区域存在
    if (!currentRegion) return;

    if (currentView === 'regions') { // 只有在地区视图下才渲染
        if (currentMode === 'cards') {
            spotsContainer.style.display = 'block';
            spotsContainer.classList.remove('hidden'); // 确保移除hidden类
            mapContainer.style.display = 'none';
            mapContainer.classList.add('hidden');
            renderSpots(currentRegion.spots);
        } else {
            spotsContainer.style.display = 'none';
            spotsContainer.classList.add('hidden');
            mapContainer.style.display = 'block';
            mapContainer.classList.remove('hidden'); // 确保移除hidden类
            
            // 确保地图容器可见后再渲染地图，否则Leaflet可能会计算错误尺寸
            requestAnimationFrame(() => {
                 renderMap();
            });
        }
    }
}

// 渲染景点卡片
function renderSpots(spots) {
    spotsGrid.innerHTML = '';
    
    spots.forEach((spot, index) => {
        const card = document.createElement('div');
        card.className = 'spot-card';
        card.style.animationDelay = `${index * 0.05}s`;
        
        card.innerHTML = `
            <div class="spot-card-image" style="background-image: url(${spot.image})">
                <div class="spot-rank-badge normal">${spot.rank}</div>
            </div>
            <div class="spot-card-content">
                <div class="spot-card-header">
                    <h3 class="spot-card-title">${spot.name}</h3>
                    <div class="spot-rating-box">
                        <span class="spot-rating-score">${spot.rating}</span>
                        <span class="spot-rating-label">/ 100</span>
                    </div>
                </div>
                <!-- 将tags提前显示，并确保与描述分开 -->
                <div class="spot-card-tags-preview">
                     ${spot.tags.map(tag => `<span class="spot-tag-small">${tag}</span>`).join('')}
                </div>
                <div class="spot-card-details">
                    <p class="spot-card-desc">${spot.description}</p>
                </div>
            </div>
        `;
        
        card.addEventListener('click', () => openSpotModal(spot, currentRegion.name));
        spotsGrid.appendChild(card);
    });
}

// 渲染评分 (100分制)
function generateRatingBox(rating) {
    return `
        <div class="spot-rating-box">
            <span class="spot-rating-score">${rating}</span>
            <span class="spot-rating-label">/ 100</span>
        </div>
    `;
}

// 渲染全景点排行榜
function renderAllSpots() {
    const allSpots = getAllSpots();
    allSpotsGrid.innerHTML = '';
    
    allSpots.forEach((spot, index) => {
        const rank = index + 1;
        const item = document.createElement('div');
        item.className = `all-spot-item ${rank <= 3 ? 'top-3' : ''}`;
        item.style.animationDelay = `${index * 0.03}s`;
        
        item.innerHTML = `
            <div class="all-spot-rank normal">${rank}</div>
            <div class="all-spot-image" style="background-image: url(${spot.image})"></div>
            <div class="all-spot-info">
                <div class="all-spot-name">${spot.name}</div>
                <div class="all-spot-region">
                    <i class="fas fa-map-marker-alt"></i>
                    ${spot.regionName}
                </div>
            </div>
            <div class="spot-rating-box">
                <span class="spot-rating-score">${spot.rating}</span>
                <span class="spot-rating-label">/ 100</span>
            </div>
        `;
        
        item.addEventListener('click', () => openSpotModal(spot, spot.regionName));
        allSpotsGrid.appendChild(item);
    });
}

// 初始化地图
function initMap() {
    if (map) {
        map.remove();
    }
    
    map = L.map('map', {
        center: [35.8617, 104.1954], // 中国中心
        zoom: 4,
        zoomControl: true,
        attributionControl: false
    });
    
    // 图层组
    const satelliteLayer = L.layerGroup([
        L.tileLayer('http://webst0{s}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}', {
            subdomains: '1234',
            maxZoom: 18
        }),
        L.tileLayer('http://webst0{s}.is.autonavi.com/appmaptile?style=8&x={x}&y={y}&z={z}', {
            subdomains: '1234',
            maxZoom: 18,
            opacity: 0.8
        })
    ]);
    
    // 高德标准地图 (更适合国内)
    const standardLayer = L.tileLayer('http://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}', {
        subdomains: '1234',
        maxZoom: 18
    });
    
    // OpenStreetMap (更适合国外)
    const osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    // 默认使用标准地图 (高德)
    standardLayer.addTo(map);

    // 图层控制器
    const baseLayers = {
        "标准地图(国内)": standardLayer,
        "OpenStreetMap(全球)": osmLayer,
        "卫星影像": satelliteLayer
    };
    
    // 如果是国外地区（id包含 bali 或 japan），自动切换到 OSM
    if (currentRegion && (currentRegion.id.includes('bali') || currentRegion.id.includes('japan'))) {
        map.eachLayer((layer) => layer.remove());
        osmLayer.addTo(map);
    }
    
    L.control.layers(baseLayers, null, { position: 'topright' }).addTo(map);
}

// 渲染地图
function renderMap() {
    if (!map) {
        initMap();
    } else {
        // 如果地图已存在，检查是否需要切换图层
        if (currentRegion) {
             const isInternational = currentRegion.id.includes('bali') || currentRegion.id.includes('japan');
             // 简单查找当前的图层状态
             let hasOSM = false;
             let hasGaode = false;
             
             map.eachLayer(layer => {
                 if (layer._url && layer._url.includes('openstreetmap')) hasOSM = true;
                 if (layer._url && layer._url.includes('autonavi')) hasGaode = true;
             });

             if (isInternational && !hasOSM) {
                 // 切换到 OSM
                 map.eachLayer(l => { if(l._url) map.removeLayer(l); }); // 移除所有tile layer
                 L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 }).addTo(map);
             } else if (!isInternational && !hasGaode && !hasOSM) { // 这里简单处理，如果不是国际且没有高德（假设也没OSM或是卫星），切回高德
                  // 实际上用户手动切了图层最好别动，但为了自动适配...
                  // 更好的做法是只在初始化或特定逻辑触发。
                  // 简化策略：每次 renderMap 强制检查
                  
                  // 为了避免干扰用户手动选择，我们可以只在地区切换触发的第一次渲染做自动判断
                  // 但这里 renderMap 被多次调用。
                  
                  // 改进：只在 hasOSM 但不是 international 时切回高德？ 或者干脆让用户自己选？
                  // 还是自动点比较好。
                  
                 if (!isInternational && hasOSM) {
                     map.eachLayer(l => { if(l._url && l._url.includes('openstreetmap')) map.removeLayer(l); }); 
                     L.tileLayer('http://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}', { subdomains: '1234' }).addTo(map);
                 }
             }
        }
    }
    
    // 清除现有标记
    markers.forEach(marker => map.removeLayer(marker));
    markers = [];
    
    // 渲染地图也要确保 currentRegion 存在
    if (currentRegion) {
        // 计算所有景点的中心坐标
        let centerLat = 0, centerLng = 0;
        const spotCount = currentRegion.spots.length;
        
        if (spotCount > 0) {
            currentRegion.spots.forEach(spot => {
                centerLat += spot.coordinates[0];
                centerLng += spot.coordinates[1];
            });
            centerLat /= spotCount;
            centerLng /= spotCount;
        } else {
            // 如果没有景点，使用地区默认坐标
            centerLat = currentRegion.coordinates[0];
            centerLng = currentRegion.coordinates[1];
        }

        // 添加地区标记 (居中且样式不同)
        const regionMarker = L.marker([centerLat, centerLng], {
             zIndexOffset: 1000, // 确保地区名称在最上层
             icon: L.divIcon({
                className: 'region-name-marker',
                html: `
                    <div style="
                        background: rgba(255, 255, 255, 0.95);
                        backdrop-filter: blur(10px);
                        border: 2px solid var(--gold-color);
                        padding: 10px 20px;
                        border-radius: 8px; /* 方形圆角框 */
                        box-shadow: 0 8px 25px rgba(0,0,0,0.4);
                        color: #000;
                        font-family: var(--font-main);
                        font-weight: 800;
                        font-size: 18px;
                        text-align: center;
                        white-space: nowrap;
                        transform: translate(-50%, -50%);
                        display: flex;
                        align-items: center;
                        gap: 10px;
                        min-width: max-content;
                    ">
                        <!-- 已移除图标 -->
                        <div style="display: flex; flex-direction: column; line-height: 1.2; align-items: center;">
                            <span>${currentRegion.name.split('·')[0]}</span>
                            <span style="font-size: 12px; font-weight: normal; color: #666;">${currentRegion.date}</span>
                        </div>
                    </div>
                    <!-- 添加一个小三角指向下方中心 -->
                    <div style="
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, 26px); /* 调整垂直位置 */
                        width: 0; 
                        height: 0; 
                        border-left: 10px solid transparent;
                        border-right: 10px solid transparent;
                        border-top: 10px solid var(--gold-color);
                    "></div>
                `,
                iconSize: [0, 0],
                iconAnchor: [0, 0]
            })
        }).addTo(map);
        markers.push(regionMarker);
        
        // 添加景点标记
        currentRegion.spots.forEach(spot => {
            const spotMarker = L.marker(spot.coordinates, {
                icon: createCustomIcon(getMarkerColor(spot.rank), false, `${spot.rank}. ${spot.name}`)
            }).addTo(map);
            
            spotMarker.bindPopup(`
                <div style="text-align: center; min-width: 150px;">
                    <img src="${spot.image}" style="width: 100%; height: 80px; object-fit: cover; border-radius: 8px; margin-bottom: 8px;">
                    <strong style="font-size: 14px;">${spot.name}</strong>
                    <br>
                    <span style="font-size: 18px; font-weight: bold; color: #333;">${spot.rating}</span> <span style="font-size: 10px; color: #666;">/ 100</span>
                </div>
            `);
            
            markers.push(spotMarker);
        });
        
        // 调整地图视野以显示所有标记
        // 增加数据存在校验
        if (markers.length > 0) {
             const bounds = L.latLngBounds(markers.map(m => m.getLatLng()));
             map.fitBounds(bounds, { padding: [50, 50] });
        }
    }
}

// 创建自定义图标 (增强版)
function createCustomIcon(color, isRegion, labelText) {
    const size = isRegion ? 24 : 18; // 稍微加大一点
    const border = isRegion ? '3px solid #fff' : '2px solid #fff';
    
    // 使用 divIcon 的 html 属性来包含标签
    return L.divIcon({
        className: 'custom-marker-container',
        html: `
            <div style="position: relative;">
                <div style="
                    width: ${size}px;
                    height: ${size}px;
                    background: ${color};
                    border-radius: 50%;
                    border: ${border};
                    box-shadow: 0 4px 10px rgba(0,0,0,0.5);
                    position: absolute;
                    left: -${size/2}px;
                    top: -${size/2}px;
                "></div>
                <div class="map-label" style="
                    position: absolute;
                    left: ${size/2 + 5}px;
                    top: -12px;
                ">${labelText}</div>
            </div>
        `,
        iconSize: [0, 0], // 因为我们使用 absolute positioning 相对于锚点
        iconAnchor: [0, 0]
    });
}

// 获取标记颜色
function getMarkerColor(rank) {
    switch (rank) {
        case 1: return '#ffd700';
        case 2: return '#c0c0c0';
        case 3: return '#cd7f32';
        default: return '#f093fb';
    }
}

// 打开景点模态框
function openSpotModal(spot, regionName) {
    modalImage.style.backgroundImage = `url(${spot.image})`;
    modalRank.textContent = `#${spot.rank}`;
    modalTitle.textContent = spot.name;
    modalRegion.textContent = regionName;
    modalRating.innerHTML = `
        <div class="spot-rating-box" style="text-align: left;">
            <span class="spot-rating-score" style="font-size: 3rem;">${spot.rating}</span>
            <span class="spot-rating-label" style="font-size: 1rem;">/ 100</span>
        </div>
    `;
    modalDescription.textContent = spot.description;
    modalTags.innerHTML = spot.tags.map(tag => `<span class="modal-tag">${tag}</span>`).join('');
    
    spotModal.classList.remove('hidden');
}

// 关闭景点模态框
function closeSpotModal() {
    spotModal.classList.add('hidden');
}

// 设置事件监听器
function setupEventListeners() {
    // 导航标签切换
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', (e) => { // 添加 e
            const view = btn.getAttribute('data-view'); // 使用 getAttribute
            
            // 更新按钮状态
            document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active'); // 确保当前按钮被激活

            currentView = view; // 更新全局 view 状态
            
            if (view === 'regions') {
                // 显示地区视图
                sidebar.classList.remove('hidden'); // 显示侧边栏
                viewToggle.classList.remove('hidden');
                regionInfo.classList.remove('hidden');
                allSpotsContainer.classList.add('hidden'); // 隐藏全景点
                
                // 恢复当前选中地区的背景图
                if (currentRegion && currentRegion.spots.length > 0) {
                    setBackground(currentRegion.spots[0].image);
                }

                renderContent(); // 使用统一渲染函数
             } else {
                // 显示全景点排行
                sidebar.classList.add('hidden');
                viewToggle.classList.add('hidden');
                regionInfo.classList.add('hidden');
                spotsContainer.classList.add('hidden'); // Hide spots container
                mapContainer.classList.add('hidden'); // Hide map container
                allSpotsContainer.classList.remove('hidden');
                
                // 设置全景点排行的背景为第一名景点
                const allSpots = getAllSpots();
                if (allSpots.length > 0) {
                    setBackground(allSpots[0].image);
                }
             }
        });
    });
    
    // 视图模式切换（卡片/地图）
    document.querySelectorAll('.toggle-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const mode = btn.dataset.mode; // 'cards' 或 'map'
            
            // 更新按钮状态
            document.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            currentMode = mode; // 更新全局状态
            
            renderContent(); // 使用统一渲染函数
        });
    });
    
    // 模态框关闭
    modalClose.addEventListener('click', closeSpotModal);
    spotModal.addEventListener('click', (e) => {
        if (e.target === spotModal) {
            closeSpotModal();
        }
    });
    
    // ESC键关闭模态框
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeSpotModal();
        }
    });
}
