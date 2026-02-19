// 旅行数据配置
const travelData = {
    // 网站基础配置（新增）
    config: {
        siteTitle: "TRAVEL RANKING",
        siteSubtitle: "雪云飞星的旅行日志",
        author: "雪云飞星",
        sideBarTitle: "地区天梯榜",
        sideBarSubTitle: "已探索",
        allSpotsTitle: "全景点天梯榜",
        allSpotsDesc: "博主所有去过景点的终极排名",
        defaultBg: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920"
    },
    // 地区数据（按排名顺序）
    regions: [
        {
            id: 'sichuan-aba',
            name: '阿坝·四川',
            date: '2023.10',
            rank: 1,
            description: '去的时候尚未通高铁，全程包车虽路途遥远，但沿途风光无限。特意选在金秋红叶季，天公作美，景色惊艳。川西高原的璀璨明珠，摄影师的天堂。',
            thumbnail: 'https://images.unsplash.com/photo-1545562083-c583d014b4f2?w=400',
            coordinates: [31.9000, 102.2000],
            spots: [
                {
                    id: 'aba-1',
                    name: '九寨沟',
                    rank: 1,
                    rating: 96,
                    image: 'images/aba-jiuzhaigou.webp',
                    description: '国内旅游的绝对天花板，论风景、人文和管理服务都是顶级。四季皆美，哪怕是阴天也难掩其秀色。真正做到了“九寨归来不看水”。',
                    tags: ['世界遗产', '湖泊', '秋景'],
                    coordinates: [33.2600, 103.9167]
                },
                {
                    id: 'aba-2',
                    name: '毕棚沟',
                    rank: 2,
                    rating: 94,
                    image: 'images/aba-bipenggou.webp',
                    description: '秋景绝美，满山黄叶与巍峨雪山、高山草甸交相辉映。若草甸此时仍绿，那便是完美的“川西小瑞士”。',
                    tags: ['雪山', '红叶', '自然'],
                    coordinates: [31.5000, 102.8333]
                },
                {
                    id: 'aba-3',
                    name: '黄龙',
                    rank: 3,
                    rating: 81,
                    image: 'images/aba-huanglong.webp',
                    description: '虽然高海拔让秋日的树叶略显凋零，但那变幻莫测的五彩钙化池，依然不负“人间瑶池”的美誉。',
                    tags: ['世界遗产', '钙化池', '自然'],
                    coordinates: [32.7500, 103.8333]
                },
                {
                    id: 'aba-4',
                    name: '达古冰川',
                    rank: 4,
                    rating: 79,
                    image: 'images/aba-dagu.webp',
                    description: '人生首次登顶雪山体验（虽然借助了缆车）。接近5000米的海拔，寒风刺骨，却也见证了那份属于最年轻、最孤独冰川的纯净。',
                    tags: ['冰川', '咖啡馆', '高海拔'],
                    coordinates: [32.2417, 102.7333]
                }
            ]
        },
        {
            id: 'bali',
            name: '巴厘岛·印尼',
            date: '2025.6',
            rank: 2,
            description: '诸神之岛。一流的酒店，二流的沙滩，三流的景点。但在乌布的稻田间发呆，在悬崖边看日落，依然是度假的首选。',
            thumbnail: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400',
            coordinates: [-8.4095, 115.1889],
            spots: [
                {
                    id: 'bali-1',
                    name: '佩妮达岛',
                    rank: 1,
                    rating: 93,
                    image: 'images/bali-penida.webp',
                    description: '精灵坠崖、钻石沙滩、天神浴池的景色都是夯中夯，但是岛上的交通是真的烂，而且天气好的时候是真的晒。',
                    tags: ['海岛', '悬崖', '沙滩'],
                    coordinates: [-8.7278, 115.5444]
                },
                {
                    id: 'bali-2',
                    name: '希尔顿酒店',
                    rank: 2,
                    rating: 87,
                    image: 'images/bali-hilton.webp',
                    description: '一流的酒店，二流的沙滩，三流的景点。努沙杜瓦的酒店都挺不错的，景色和惬意感拉满，不过也都不便宜。',
                    tags: ['酒店', '度假', '沙滩'],
                    coordinates: [-8.8105, 115.2163]
                },
                {
                    id: 'bali-3',
                    name: '罗威纳追海豚',
                    rank: 3,
                    rating: 76,
                    image: 'images/bali-dolphin.webp',
                    description: '罗威纳海豚之旅，清晨出海追逐野生海豚群，看着它们跃出海面，体验十分独特。',
                    tags: ['海豚', '出海', '生态'],
                    coordinates: [-8.1633, 115.0315]
                },
                {
                    id: 'bali-4',
                    name: '丛林漂流&AVT',
                    rank: 4,
                    rating: 75,
                    image: 'images/bali-rafting.webp',
                    description: '阿勇河激流勇进搭配丛林越野车，在巴厘岛的热带雨林中释放肾上腺素。',
                    tags: ['漂流', '户外', '探险'],
                    coordinates: [-8.4555, 115.2319]
                },
                {
                    id: 'bali-5',
                    name: '水神庙',
                    rank: 5,
                    rating: 74,
                    image: 'images/bali-temple.webp',
                    description: '供奉水泽女神的寺庙，坐落在布拉坦湖畔，云雾缭绕时宛如仙境，是5万印尼盾纸币上的图案。',
                    tags: ['寺庙', '湖泊', '人文'],
                    coordinates: [-8.2753, 115.1668]
                },
                {
                    id: 'bali-6',
                    name: '金巴兰沙滩',
                    rank: 6,
                    rating: 74,
                    image: 'images/bali-jimbaran.webp',
                    description: '以日落海鲜烧烤闻名。虽然沙滩质量一般，但傍晚时分的烛光晚餐氛围感十足。',
                    tags: ['日落', '海鲜', '海滩'],
                    coordinates: [-8.7845, 115.1627]
                },
                {
                    id: 'bali-7',
                    name: '情人崖',
                    rank: 7,
                    rating: 67,
                    image: 'images/bali-uluwatu.webp',
                    description: '乌鲁瓦图断崖。悬崖景观确实壮观，但猴子太野蛮了，抢东西不手软，体验感扣分。',
                    tags: ['悬崖', '海景', '猴子'],
                    coordinates: [-8.8291, 115.0849]
                },
                {
                    id: 'bali-8',
                    name: '乌布皇宫',
                    rank: 8,
                    rating: 61,
                    image: 'images/bali-ubud-palace.webp',
                    description: '非常小的一个皇宫，几分钟就能逛完。建筑还是有特色的，但如果特意跑一趟可能会失望。',
                    tags: ['建筑', '历史', '打卡'],
                    coordinates: [-8.5060, 115.2625]
                },
                {
                    id: 'bali-9',
                    name: 'Finns Beach Club',
                    rank: 9,
                    rating: 56,
                    image: 'images/bali-finns.webp',
                    description: '对于我这种没有酒吧文化，融入不了白人圈子的人来说，很无聊。除了吵闹的音乐和昂贵的酒水，没感觉到什么乐趣。',
                    tags: ['酒吧', '夜生活', '沙滩'],
                    coordinates: [-8.6631, 115.1352]
                }
            ]
        },
        {
            id: 'yunnan',
            name: '滇西北·云南',
            date: '2026.1',
            rank: 3,
            description: '对于习惯了城市生活的人来说，云南的慢节奏和自然风光会让人感到放松和愉悦。不过相比古镇，我更爱雪山。',
            thumbnail: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
            coordinates: [25.0433, 102.7086],
            spots: [
                {
                    id: 'yn-1',
                    name: '飞来寺观景（梅里雪山）',
                    rank: 1,
                    rating: 93,
                    image: 'images/yunnan-meili.webp',
                    description: '日照金山是人生必看的奇观。梅里雪山乃藏区八大神山之首，卡瓦格博峰的威严与神圣，让人心生敬畏。',
                    tags: ['雪山', '日照金山', '高海拔'],
                    coordinates: [28.4239, 98.8142]
                },
                {
                    id: 'yn-2',
                    name: '普达措',
                    rank: 2,
                    rating: 91,
                    image: 'images/yunnan-pudacuo.webp',
                    description: '高原明珠，属都湖和碧塔海就像两块镶嵌在群山中的翡翠。空气纯净到洗肺。',
                    tags: ['国家公园', '湖泊', '原始森林'],
                    coordinates: [27.8383, 99.9622]
                },
                {
                    id: 'yn-3',
                    name: '松赞林寺',
                    rank: 3,
                    rating: 90,
                    image: 'images/yunnan-songzanlin.webp',
                    description: '小布达拉宫。金顶在阳光下熠熠生辉，信仰的力量在这里具象化，纯净的心灵之旅',
                    tags: ['寺庙', '藏传佛教', '建筑'],
                    coordinates: [27.8633, 99.7047]
                },
                {
                    id: 'yn-4',
                    name: '洱海生态走廊',
                    rank: 4,
                    rating: 88,
                    image: 'images/yunnan-erhai.webp',
                    description: '在大理做的最正确的事，就是租一辆单车，沿着洱海慢慢骑。S湾、水杉林，处处是景。',
                    tags: ['洱海', '骑行', '休闲'],
                    coordinates: [25.7069, 100.1862]
                },
                {
                    id: 'yn-5',
                    name: '纳帕海',
                    rank: 5,
                    rating: 85,
                    image: 'images/yunnan-napahai.webp',
                    description: '一半是湖泊，一半是草原。雨季是海，旱季是依拉草原。骑马抱小羊拍照很出片。',
                    tags: ['草原', '湖泊', '自驾'],
                    coordinates: [27.8769, 99.6389]
                },
                {
                    id: 'yn-6',
                    name: '虎跳峡',
                    rank: 6,
                    rating: 84,
                    image: 'images/yunnan-tiger-leaping.webp',
                    description: '金沙江在这里咆哮，惊涛骇浪，震耳欲聋。世界级的徒步路线，壮阔非凡。',
                    tags: ['峡谷', '徒步', '自然奇观'],
                    coordinates: [27.2417, 100.1250]
                },
                {
                    id: 'yn-7',
                    name: '沙溪古镇',
                    rank: 7,
                    rating: 80,
                    image: 'images/yunnan-shaxi.webp',
                    description: '茶马古道上唯一幸存的古集市。没有商业古镇的喧嚣，只有安静的岁月流淌。',
                    tags: ['古镇', '历史', '安静'],
                    coordinates: [26.3167, 99.8500]
                },
                {
                    id: 'yn-8',
                    name: '蓝月谷（玉龙雪山）',
                    rank: 8,
                    rating: 80,
                    image: 'images/yunnan-bluemoon.webp',
                    description: '自带滤镜的蓝宝石水色，背景是壮丽的玉龙雪山，美得不真实。',
                    tags: ['湖泊', '雪山', '摄影'],
                    coordinates: [27.1167, 100.2333]
                },
                {
                    id: 'yn-9',
                    name: '巴拉格宗',
                    rank: 9,
                    rating: 77,
                    image: 'images/yunnan-balagezong.webp',
                    description: '香格里拉最后的秘境。从峡谷底到雪山顶，立体气候分布明显。佛塔和神山相映成趣。',
                    tags: ['秘境', '雪山', '峡谷'],
                    coordinates: [28.2833, 99.4333]
                },
                {
                    id: 'yn-10',
                    name: '云杉坪（玉龙雪山）',
                    rank: 10,
                    rating: 76,
                    image: 'images/yunnan-yunshanping.webp',
                    description: '雪山脚下的原始森林草甸。仿佛闯入了暮光之城的取景地，杉林幽静。',
                    tags: ['森林', '草甸', '徒步'],
                    coordinates: [27.1267, 100.2233]
                },
                {
                    id: 'yn-11',
                    name: '独克宗古城',
                    rank: 11,
                    rating: 72,
                    image: 'images/yunnan-dukezong.webp',
                    description: '月光之城。不仅有世界最大的转经筒，还有龟山公园的日落夜景。',
                    tags: ['古城', '藏族', '转经筒'],
                    coordinates: [27.8167, 99.7000]
                },
                {
                    id: 'yn-12',
                    name: '丽江古镇',
                    rank: 12,
                    rating: 70,
                    image: 'images/yunnan-lijiang-oldtown.webp',
                    description: '虽然商业化严重，但从大水车到四方街，依然有着不可替代的纳西风情。',
                    tags: ['古镇', '商业', '夜景'],
                    coordinates: [26.8667, 100.2333]
                },
                {
                    id: 'yn-13',
                    name: '喜洲古镇',
                    rank: 13,
                    rating: 68,
                    image: 'images/yunnan-xizhou.webp',
                    description: '白族建筑的代表。转角楼、喜洲粑粑、稻田，适合半日闲逛。',
                    tags: ['古镇', '白族', '稻田'],
                    coordinates: [25.8500, 100.1333]
                },
                {
                    id: 'yn-14',
                    name: '双廊古镇',
                    rank: 14,
                    rating: 63,
                    image: 'images/yunnan-shuanglang.webp',
                    description: '曾经的苍洱风光第一镇，如今人多拥挤，体验感一般。适合远观。',
                    tags: ['古镇', '洱海', '海景'],
                    coordinates: [25.9167, 100.1833]
                },
                {
                    id: 'yn-15',
                    name: '大理古城',
                    rank: 15,
                    rating: 62,
                    image: 'images/yunnan-dali-oldtown.webp',
                    description: '风花雪月的起点，但过于雷同的商业店铺消磨了它的独特感。',
                    tags: ['古城', '商业', '历史'],
                    coordinates: [25.6960, 100.1648]
                },
                {
                    id: 'yn-16',
                    name: '丽江千古情',
                    rank: 16,
                    rating: 55,
                    image: 'images/yunnan-romance.webp',
                    description: '大型歌舞秀，虽然舞美震撼，但剧情和形式过于套路化，票价虚高。',
                    tags: ['演出', '文化', '商业'],
                    coordinates: [26.8300, 100.2500]
                }
            ]
        },
        {
            id: 'zhangjiajie',
            name: '张家界·湖南',
            date: '2023.10',
            rank: 4,
            description: '缩小的仙境，放大的盆景。奇峰三千，秀水八百。这里是《阿凡达》哈利路亚山的取景地。',
            thumbnail: 'https://images.unsplash.com/photo-1628663806373-c4669816574f?w=400',
            coordinates: [29.1170, 110.4790],
            spots: [
                {
                    id: 'zjj-1',
                    name: '张家界大峡谷',
                    rank: 1,
                    rating: 90,
                    image: 'images/zjj-grand-canyon.webp',
                    description: '玻璃桥惊险刺激，一帘幽梦的徒步路线也非常棒，溪水清澈，植被茂密。',
                    tags: ['大峡谷', '玻璃桥', '徒步'],
                    coordinates: [29.3900, 110.6900]
                },
                {
                    id: 'zjj-2',
                    name: '武陵源（天子山/袁家界）',
                    rank: 2,
                    rating: 88,
                    image: 'images/zjj-wulingyuan.webp',
                    description: '经典的阿凡达悬浮山原型地。虽然景色壮观，金鞭溪徒步体验不错。',
                    tags: ['世界遗产', '石英砂岩', '山峰'],
                    coordinates: [29.3250, 110.4333]
                },
                {
                    id: 'zjj-3',
                    name: '黄龙洞',
                    rank: 3,
                    rating: 72,
                    image: 'images/zjj-huanglong-cave.webp',
                    description: '典型的喀斯特溶洞，规模宏大，内部需要坐船。定海神针确实独特。全程有导游讲解',
                    tags: ['溶洞', '地质', '奇观'],
                    coordinates: [29.3567, 110.5167]
                },
                {
                    id: 'zjj-4',
                    name: '魅力湘西',
                    rank: 4,
                    rating: 70,
                    image: 'images/zjj-charming-xiangxi.webp',
                    description: '冯小刚导演的大型民俗演出。场面热闹，特别是赶尸和哭嫁等环节很有地方特色。',
                    tags: ['演出', '民俗', '文化'],
                    coordinates: [29.3450, 110.5333]
                },
                {
                    id: 'zjj-5',
                    name: '天门山（浓雾版）',
                    rank: 5,
                    rating: 63,
                    image: 'images/zjj-tianmen-mountain.webp',
                    description: '虽然索道世界一流，99道弯通天大道震撼，但赶上大雾天，眼前只有白茫茫一片，啥也看不见。而且看不见天门洞的概率还很高',
                    tags: ['大雾', '索道', '遗憾'],
                    coordinates: [29.0500, 110.4833]
                }
            ]
        },
        {
            id: 'huangshan',
            name: '黄山·安徽',
            date: '2021.1',
            rank: 5,
            description: '五岳归来不看山，黄山归来不看岳。奇松、怪石、云海、温泉、冬雪，黄山五绝名扬天下。',
            thumbnail: 'https://images.unsplash.com/photo-1589304049806-0563428d0526?w=400',
            coordinates: [30.1317, 118.1667],
            spots: [
                {
                    id: 'hs-1',
                    name: '黄山风景区',
                    rank: 1,
                    rating: 94,
                    image: 'images/huangshan-scenic.webp',
                    description: '确实很好看，三山五岳如果只去一个地方，那必然是黄山。奇松、怪石、云海，一步一景，不负“天下第一奇山”之名。',
                    tags: ['世界遗产', '云海', '爬山'],
                    coordinates: [30.1333, 118.1667]
                }
            ]
        },
        {
            id: 'zhejiang-mix',
            name: '浙北·浙江',
            date: '2022-2025',
            rank: 6,
            description: '从东海之滨的离岛，到江南水乡的古镇。浙江的柔情与壮阔，都藏在这些山水之间。',
            thumbnail: 'https://images.unsplash.com/photo-1518623489648-a173ef7824f3?w=400',
            coordinates: [30.2741, 120.1551],
            spots: [
                {
                    id: 'zj-1',
                    name: '嵊泗列岛',
                    rank: 1,
                    rating: 84,
                    image: 'images/zj-shengsi.webp',
                    description: '距离上海很近，小众但是可以让上海码农快速享受放松的假期。东崖绝壁的日出，还有无人村的绿野仙踪。',
                    tags: ['海岛', '沙滩', '上海周边'],
                    coordinates: [30.7250, 122.4583]
                },
                {
                    id: 'zj-2',
                    name: '乌镇',
                    rank: 2,
                    rating: 76,
                    image: 'images/zj-wuzhen.webp',
                    description: '晚上开灯后好看，枕水人家，江南水乡。商业化成熟但管理规范。',
                    tags: ['古镇', '夜景', '水乡'],
                    coordinates: [30.7442, 120.4875]
                },
                {
                    id: 'zj-3',
                    name: '千岛湖',
                    rank: 3,
                    rating: 65,
                    image: 'images/zj-qiandaohu.webp',
                    description: '名气虽大，但是没啥可玩的，景色看第二眼就会腻，如果单纯找个地方躺平倒是很合适。',
                    tags: ['湖泊', '躺平', '自然'],
                    coordinates: [29.6000, 118.9500]
                },
                {
                    id: 'zj-4',
                    name: '安昌古镇',
                    rank: 4,
                    rating: 61,
                    image: 'images/zj-anchang.webp',
                    description: '年味浓，腊肠酱鸭满街挂，充满了浓浓的烟火气，担没必要非要特意来一趟。',
                    tags: ['古镇', '人文', '美食'],
                    coordinates: [30.1200, 120.5000]
                }
            ]
        },
        {
            id: 'japan-okinawa',
            name: '冲绳游轮·日本',
            date: '2025.2',
            rank: 7,
            description: '海上的移动城堡，蓝色的琉球之梦。享受海上的慢时光，探索冲绳的独特风情。',
            thumbnail: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=400',
            coordinates: [26.2124, 127.6809],
            spots: [
                {
                    id: 'jp-1',
                    name: '海洋光谱号',
                    rank: 1,
                    rating: 87,
                    image: 'images/jp-cruise.webp',
                    description: '新奇的体验，很享受放松。海上的移动城堡，吃喝玩乐一应俱全。',
                    tags: ['游轮', '度假', '美食'],
                    coordinates: [26.2124, 127.6809]
                },
                {
                    id: 'jp-2',
                    name: '冲绳（游轮靠岸）',
                    rank: 2,
                    rating: 72,
                    image: 'images/jp-okinawa.webp',
                    description: '景点都很小，但是比较精致，海水很蓝。不过如果想深度游不建议坐游轮来，时间太赶。',
                    tags: ['海岛', '城市', '购物'],
                    coordinates: [26.2170, 127.7195]
                }
            ]
        },
        {
            id: 'jiangsu-wuxi',
            name: '无锡·江苏',
            date: '2023.3',
            rank: 8,
            description: '太湖明珠，江南盛地。鼋头渚的樱花，拈花湾的禅意，还有甜甜的无锡排骨。',
            thumbnail: 'https://images.unsplash.com/photo-1543232870-2227d82eb108?w=400',
            coordinates: [31.4912, 120.3119],
            spots: [
                {
                    id: 'wx-1',
                    name: '鼋头渚',
                    rank: 1,
                    rating: 80,
                    image: 'images/wx-yuantouzhu.webp',
                    description: '我是樱花季去的，好看，很有特色。太湖绝佳处，毕竟在鼋头。但是入园人太多，路非常堵，体验感稍打折扣。',
                    tags: ['太湖', '樱花', '园林'],
                    coordinates: [31.5233, 120.2167]
                },
                {
                    id: 'wx-3',
                    name: '拈花湾',
                    rank: 2,
                    rating: 75,
                    image: 'images/wx-nianhuawan.webp',
                    description: '晚上的景色在古镇里算是上佳的，灯光设计很棒，还有各种表演。虽然是人造景点，但禅意氛围营造得不错。',
                    tags: ['古镇', '夜景', '禅意'],
                    coordinates: [31.3975, 120.0766]
                },
                {
                    id: 'wx-2',
                    name: '灵山大佛',
                    rank: 3,
                    rating: 70,
                    image: 'images/wx-lingshan.webp',
                    description: '人工的佛教建筑和公园，大佛确实很大，抱佛脚需要排队。梵宫内部金碧辉煌，比较震撼。',
                    tags: ['佛教', '雕像', '大佛'],
                    coordinates: [31.4333, 120.0833]
                }
            ]
        },
        {
            id: 'guangxi-guilin',
            name: '桂林·广西',
            date: '2024.9',
            rank: 9,
            description: '总体评价：景色都是好看的，但没有到甲天下的级别，和四川、云南、西藏等比完全不是一个量级的。并且有一个巨大的问题，当地景点管理混乱，当地人也多有宰客、拉客等现象，甚至有个老婆婆跟了我们一路，就想让我们买东西。',
            thumbnail: 'https://images.unsplash.com/photo-1533052809059-33d3c829e083?w=400',
            coordinates: [25.2667, 110.2833],
            spots: [
                {
                    id: 'gl-2',
                    name: '漓江游船',
                    rank: 1,
                    rating: 86,
                    image: 'images/gl-lijiang.webp',
                    description: '感觉桂林唯一拿得出手的，乘船从桂林到阳朔，一路轻松惬意，并且有讲解。',
                    tags: ['游船', '山水', '惬意'],
                    coordinates: [24.7833, 110.4833]
                },
                {
                    id: 'gl-yangshuo',
                    name: '阳朔',
                    rank: 2,
                    rating: 74,
                    image: 'images/gl-yangshuo.webp',
                    description: '竹筏好玩，其他一般，建议骑小电驴慢慢游，景点分布杂乱，很多景点很水。',
                    tags: ['竹筏', '骑行', '山水'],
                    coordinates: [24.7766, 110.4913]
                },
                {
                    id: 'gl-3',
                    name: '象鼻山',
                    rank: 3,
                    rating: 68,
                    image: 'images/gl-elephant.webp',
                    description: '就是一个公园，象鼻山拍个照。',
                    tags: ['地标', '公园', '打卡'],
                    coordinates: [25.2600, 110.2900]
                },
                {
                    id: 'gl-xingping',
                    name: '兴平古镇',
                    rank: 4,
                    rating: 54,
                    image: 'images/gl-xingping.webp',
                    description: '没啥特别的古镇，只有20元人民币取景地一个稍微有点意思的地方，其他没有任何可取之处，并且当地一些老人会追着你不放让你买东西。',
                    tags: ['古镇', '人民币', '避雷'],
                    coordinates: [24.9189, 110.5255]
                },
                {
                    id: 'gl-impression',
                    name: '印象刘三姐',
                    rank: 5,
                    rating: 45,
                    image: 'images/gl-impression.webp',
                    description: '拉完了，看了一半忍不了走了，巨无聊，一群人在那走来走去，没有故事情节。这演出太老了，已经不适应当下人的审美。',
                    tags: ['演出', '无聊', '避雷'],
                    coordinates: [24.7719, 110.4975]
                }
            ]
        }
    ]
};

// 获取所有景点的扁平化列表（用于全景点排行）
function getAllSpots() {
    const allSpots = [];
    travelData.regions.forEach(region => {
        region.spots.forEach(spot => {
            allSpots.push({
                ...spot,
                regionId: region.id,
                regionName: region.name
            });
        });
    });
    // 按评分和地区排名综合排序
    return allSpots.sort((a, b) => {
        // 首先按评分排序
        if (b.rating !== a.rating) {
            return b.rating - a.rating;
        }
        // 评分相同则按地区排名
        const regionA = travelData.regions.find(r => r.id === a.regionId);
        const regionB = travelData.regions.find(r => r.id === b.regionId);
        if (regionA.rank !== regionB.rank) {
            return regionA.rank - regionB.rank;
        }
        // 地区相同则按景点排名
        return a.rank - b.rank;
    });
}
