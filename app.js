const musicStates = {
    playing: false,
    volume: 0.5,
    currentTime: 0
};

let audioPlayer = null;

const consolationData = {
    keywords: {
        '迷茫': {
            poems: [
                {
                    title: '行路难·其一',
                    author: '李白',
                    content: '长风破浪会有时，直挂云帆济沧海。',
                    explanation: '尽管前路困难重重，但终将有一天能乘着长风破浪前行，扬起高高的船帆横渡大海。人生难免遇到坎坷，只要保持信心，终将迎来转机。'
                },
                {
                    title: '游山西村',
                    author: '陆游',
                    content: '山重水复疑无路，柳暗花明又一村。',
                    explanation: '山峦重叠水流曲折正担心无路可走，柳色浓绿花色明丽忽然出现一个村庄。当你感到迷茫时，坚持走下去，转机往往就在眼前。'
                }
            ],
            image: 'https://images.unsplash.com/photo-1476610182048-b716b8518aae?w=1200&h=600&fit=crop'
        },
        '焦虑': {
            poems: [
                {
                    title: '定风波·莫听穿林打叶声',
                    author: '苏轼',
                    content: '莫听穿林打叶声，何妨吟啸且徐行。',
                    explanation: '不用理会那穿过树林打在树叶上的雨声，不妨一边吟咏长啸，一边悠然地行走。面对纷扰，保持内心的平静，从容面对。'
                },
                {
                    title: '陋室铭',
                    author: '刘禹锡',
                    content: '山不在高，有仙则名；水不在深，有龙则灵。',
                    explanation: '山不一定要高，有仙人居住就有名；水不一定要深，有龙潜藏就显得灵验。不必过分追求外在的东西，内心的富足才是最重要的。'
                }
            ],
            image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&h=600&fit=crop'
        },
        '想家': {
            poems: [
                {
                    title: '静夜思',
                    author: '李白',
                    content: '举头望明月，低头思故乡。',
                    explanation: '抬起头来望着那明亮的月亮，低下头来思念远方的故乡。无论身在何处，家永远是心中最温暖的牵挂。'
                },
                {
                    title: '九月九日忆山东兄弟',
                    author: '王维',
                    content: '独在异乡为异客，每逢佳节倍思亲。',
                    explanation: '独自远离家乡在外漂泊，每当遇到佳节就更加思念亲人。你的思念之情是人之常情，家人也一定在牵挂着你。'
                }
            ],
            image: 'https://images.unsplash.com/photo-1513407030348-c983a97b98d8?w=1200&h=600&fit=crop'
        },
        '孤独': {
            poems: [
                {
                    title: '月下独酌',
                    author: '李白',
                    content: '举杯邀明月，对影成三人。',
                    explanation: '举起酒杯邀请天上的明月，对着影子就成了三个人。即使独处，也能与自然为伴，享受内心的宁静与自由。'
                },
                {
                    title: '江雪',
                    author: '柳宗元',
                    content: '孤舟蓑笠翁，独钓寒江雪。',
                    explanation: '一位身披蓑衣头戴斗笠的老渔翁，独自在大雪覆盖的寒冷江面上垂钓。孤独可以是一种境界，一种与自然对话的方式。'
                }
            ],
            image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=600&fit=crop'
        },
        '压力': {
            poems: [
                {
                    title: '归去来兮辞',
                    author: '陶渊明',
                    content: '采菊东篱下，悠然见南山。',
                    explanation: '在东篱之下采摘菊花，悠然间，那远处的南山映入眼帘。给自己一些空间，放慢脚步，感受生活的美好。'
                },
                {
                    title: '饮酒·其五',
                    author: '陶渊明',
                    content: '结庐在人境，而无车马喧。',
                    explanation: '虽然居住在人世间，却听不到车马的喧嚣。保持内心的宁静，外界的纷扰就无法影响你。'
                }
            ],
            image: 'https://images.unsplash.com/photo-1493770348161-369560ae357d?w=1200&h=600&fit=crop'
        },
        '失意': {
            poems: [
                {
                    title: '酬乐天扬州初逢席上见赠',
                    author: '刘禹锡',
                    content: '沉舟侧畔千帆过，病树前头万木春。',
                    explanation: '沉船的旁边正有千艘船驶过，病树的前头却也是万木争春。一时的失意不算什么，新的希望正在前方等待着你。'
                },
                {
                    title: '登科后',
                    author: '孟郊',
                    content: '春风得意马蹄疾，一日看尽长安花。',
                    explanation: '乘着和煦的春风，得意地骑着马飞快奔驰，一天之内就看完了长安城里所有的花。美好的日子终会到来，保持希望。'
                }
            ],
            image: 'https://images.unsplash.com/photo-1476610182048-b716b8518aae?w=1200&h=600&fit=crop'
        },
        '难过': {
            poems: [
                {
                    title: '浣溪沙·一曲新词酒一杯',
                    author: '晏殊',
                    content: '无可奈何花落去，似曾相识燕归来。',
                    explanation: '花儿总要凋落让人无可奈何，似曾相识的春燕又归来。人生总有起起落落，失去的同时也会有新的收获。'
                },
                {
                    title: '无题',
                    author: '李商隐',
                    content: '春蚕到死丝方尽，蜡炬成灰泪始干。',
                    explanation: '春蚕直到死时丝才吐完，蜡烛烧成灰烬时泪才流干。真情与付出终会有回报，不要轻易放弃。'
                }
            ],
            image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=1200&h=600&fit=crop'
        },
        '离别': {
            poems: [
                {
                    title: '送杜少府之任蜀州',
                    author: '王勃',
                    content: '海内存知己，天涯若比邻。',
                    explanation: '四海之内有知心朋友，即使远在天涯也像近邻一样。真正的友谊不会被距离阻隔，离别是为了更好的重逢。'
                },
                {
                    title: '赠汪伦',
                    author: '李白',
                    content: '桃花潭水深千尺，不及汪伦送我情。',
                    explanation: '桃花潭的水即使有千尺深，也比不上汪伦送我的情谊深厚。珍惜每一段相遇，离别也是情谊的见证。'
                }
            ],
            image: 'https://images.unsplash.com/photo-1510771463146-e89e6e86560e?w=1200&h=600&fit=crop'
        }
    },
    default: {
        poems: [
            {
                title: '论语·述而',
                author: '孔子',
                content: '君子坦荡荡，小人长戚戚。',
                explanation: '君子心胸宽广，光明磊落；小人则常常忧愁不安。保持内心的坦荡，烦恼自然会减少。'
            },
            {
                title: '道德经',
                author: '老子',
                content: '知足者富，强行者有志。',
                explanation: '懂得满足的人就是富有的，坚持力行的人就是有志气的。珍惜所拥有的，一步一步向前走。'
            }
        ],
        image: 'https://images.unsplash.com/photo-1493770348161-369560ae357d?w=1200&h=600&fit=crop'
    }
};

const poetData = {
    '李白': {
        name: '李白',
        era: '唐代',
        style: '浪漫主义',
        image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=500&fit=crop',
        bio: '李白（701年—762年），字太白，号青莲居士，又号谪仙人，唐代伟大的浪漫主义诗人，被后人誉为诗仙。其诗豪放飘逸，想象丰富，语言流转自然，音律和谐多变。代表作有《望庐山瀑布》《行路难》《蜀道难》《将进酒》等。',
        works: ['静夜思', '月下独酌', '望庐山瀑布', '行路难', '将进酒']
    },
    '杜甫': {
        name: '杜甫',
        era: '唐代',
        style: '现实主义',
        image: 'https://images.unsplash.com/photo-1493770348161-369560ae357d?w=400&h=500&fit=crop',
        bio: '杜甫（712年—770年），字子美，自号少陵野老，唐代伟大的现实主义诗人，被后人誉为诗圣。其诗沉郁顿挫，反映社会现实和民间疾苦，被称为诗史。代表作有《登高》《春望》《茅屋为秋风所破歌》等。',
        works: ['春望', '登高', '茅屋为秋风所破歌', '望岳', '三吏三别']
    },
    '王维': {
        name: '王维',
        era: '唐代',
        style: '山水田园',
        image: 'https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?w=400&h=500&fit=crop',
        bio: '王维（701年—761年），字摩诘，号摩诘居士，唐代著名诗人、画家。其诗清新淡远，自然脱俗，被誉为诗中有画，画中有诗。代表作有《山居秋暝》《使至塞上》《九月九日忆山东兄弟》等。',
        works: ['山居秋暝', '九月九日忆山东兄弟', '使至塞上', '送元二使安西']
    },
    '苏轼': {
        name: '苏轼',
        era: '宋代',
        style: '豪放派',
        image: 'https://images.unsplash.com/photo-1476610182048-b716b8518aae?w=400&h=500&fit=crop',
        bio: '苏轼（1037年—1101年），字子瞻，号东坡居士，宋代著名文学家、书画家。其词豪放飘逸，开创了豪放词派。代表作有《水调歌头·明月几时有》《念奴娇·赤壁怀古》《江城子·密州出猎》等。',
        works: ['水调歌头', '念奴娇·赤壁怀古', '定风波', '江城子']
    },
    '刘禹锡': {
        name: '刘禹锡',
        era: '唐代',
        style: '豪放明快',
        image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=500&fit=crop',
        bio: '刘禹锡（772年—842年），字梦得，唐代著名文学家、哲学家。其诗风格豪放，笔锋犀利，善于借物抒情。代表作有《陋室铭》《酬乐天扬州初逢席上见赠》《竹枝词》等。',
        works: ['陋室铭', '酬乐天扬州初逢席上见赠', '竹枝词']
    },
    '陶渊明': {
        name: '陶渊明',
        era: '东晋',
        style: '田园诗',
        image: 'https://images.unsplash.com/photo-1493770348161-369560ae357d?w=400&h=500&fit=crop',
        bio: '陶渊明（365年—427年），字元亮，又名潜，号五柳先生，东晋著名诗人、辞赋家。其诗以田园生活为题材，语言质朴自然，意境深远。代表作有《归去来兮辞》《桃花源记》《饮酒》等。',
        works: ['归去来兮辞', '桃花源记', '饮酒', '归园田居']
    },
    '王昌龄': {
        name: '王昌龄',
        era: '唐代',
        style: '边塞诗',
        image: 'https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?w=400&h=500&fit=crop',
        bio: '王昌龄（698年—757年），字少伯，唐代著名边塞诗人。其边塞诗气势雄浑，格调高昂，被誉为七绝圣手。代表作有《出塞》《从军行》《芙蓉楼送辛渐》等。',
        works: ['出塞', '从军行', '芙蓉楼送辛渐']
    },
    '王之涣': {
        name: '王之涣',
        era: '唐代',
        style: '边塞诗',
        image: 'https://images.unsplash.com/photo-1476610182048-b716b8518aae?w=400&h=500&fit=crop',
        bio: '王之涣（688年—742年），字季凌，唐代著名诗人。其诗用词十分朴实，造境极为深远，令人神往。传世之作仅六首，但皆为精品。代表作有《登鹳雀楼》《凉州词》等。',
        works: ['登鹳雀楼', '凉州词']
    },
    '孟浩然': {
        name: '孟浩然',
        era: '唐代',
        style: '山水田园',
        image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=500&fit=crop',
        bio: '孟浩然（689年—740年），名浩，字浩然，号孟山人，唐代著名的山水田园派诗人。其诗清淡自然，以五言古诗见长。代表作有《春晓》《望洞庭湖赠张丞相》等。',
        works: ['春晓', '望洞庭湖赠张丞相', '宿建德江']
    }
};

function initMusic() {
    const musicBtn = document.getElementById('music-btn');
    const musicIcon = document.getElementById('music-icon');
    
    if (!musicBtn) return;
    
    musicBtn.addEventListener('click', function() {
        if (musicStates.playing) {
            if (audioPlayer) {
                audioPlayer.pause();
            }
            musicStates.playing = false;
            musicIcon.innerHTML = '<path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>';
        } else {
            if (!audioPlayer) {
                audioPlayer = new Audio('https://cdn.pixabay.com/audio/2022/05/27/audio_9c4a161198.mp3');
                audioPlayer.loop = true;
                audioPlayer.volume = musicStates.volume;
            }
            audioPlayer.play().catch(function(e) {
                console.log('音乐播放失败:', e);
            });
            musicStates.playing = true;
            musicIcon.innerHTML = '<path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6zM19 17h2v-3h-2v3zm0-5h2V8h-2v4z"/>';
        }
    });
}

function matchKeyword(text) {
    for (const keyword in consolationData.keywords) {
        if (text.includes(keyword)) {
            return keyword;
        }
    }
    return null;
}

function showConsolation(keyword) {
    const data = consolationData.keywords[keyword] || consolationData.default;
    const randomPoem = data.poems[Math.floor(Math.random() * data.poems.length)];
    
    const modal = document.getElementById('consolation-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalPoem = document.getElementById('modal-poem');
    const modalAuthor = document.getElementById('modal-author');
    const modalExplanation = document.getElementById('modal-explanation');
    const modalImage = document.getElementById('modal-image');
    
    modalTitle.textContent = randomPoem.title;
    modalPoem.textContent = randomPoem.content;
    modalAuthor.textContent = '—— ' + randomPoem.author;
    modalExplanation.textContent = randomPoem.explanation;
    modalImage.src = data.image;
    
    modal.classList.add('show');
}

function closeModal() {
    const modal = document.getElementById('consolation-modal');
    modal.classList.remove('show');
}

function initConsolation() {
    const submitBtn = document.getElementById('submit-consolation');
    const inputText = document.getElementById('trouble-input');
    const closeBtn = document.getElementById('modal-close');
    
    if (submitBtn && inputText) {
        submitBtn.addEventListener('click', function() {
            const text = inputText.value.trim();
            if (!text) {
                alert('请先写下您的烦恼');
                return;
            }
            
            const keyword = matchKeyword(text);
            showConsolation(keyword);
            inputText.value = '';
        });
    }
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    window.addEventListener('click', function(e) {
        const modal = document.getElementById('consolation-modal');
        if (e.target === modal) {
            closeModal();
        }
    });
}

function initPoetLinks() {
    const authorLinks = document.querySelectorAll('.author-link');
    
    authorLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const poetName = this.getAttribute('data-poet');
            if (poetName) {
                const poet = poetData[poetName];
                if (poet) {
                    sessionStorage.setItem('selectedPoet', JSON.stringify(poet));
                    window.location.href = 'poet_detail.html';
                }
            }
        });
    });
}

function initPoetDetail() {
    const poetDataStr = sessionStorage.getItem('selectedPoet');
    if (poetDataStr) {
        const poet = JSON.parse(poetDataStr);
        
        document.getElementById('poet-name').textContent = poet.name;
        document.getElementById('poet-era').textContent = poet.era;
        document.getElementById('poet-style').textContent = poet.style;
        document.getElementById('poet-bio').textContent = poet.bio;
        document.getElementById('poet-image').src = poet.image;
        
        const worksList = document.getElementById('poet-works');
        worksList.innerHTML = poet.works.map(function(work) {
            return '<li class="work-item">' + work + '</li>';
        }).join('');
    } else {
        document.getElementById('poet-content').innerHTML = '<p style="text-align: center; padding: 50px;">请从其他页面点击诗人姓名进入此页面</p>';
    }
}

function initNetwork() {
    const nodes = [
        { id: 'moon', name: '月亮', x: 50, y: 50, link: 'poem_moon.html' },
        { id: 'homesick', name: '乡愁', x: 25, y: 25, link: 'poem_homesick.html' },
        { id: 'frontier', name: '边塞', x: 75, y: 25, link: 'poem_frontier.html' },
        { id: 'frustrated', name: '失意', x: 25, y: 75, link: 'poem_frustrated.html' },
        { id: 'parting', name: '离别', x: 75, y: 75, link: 'poem_moon.html' },
        { id: 'nostalgia', name: '思乡', x: 12, y: 50, link: 'poem_homesick.html' },
        { id: 'plum', name: '梅花', x: 88, y: 50, link: 'poem_frustrated.html' },
        { id: 'ambition', name: '壮志', x: 50, y: 12, link: 'poem_frontier.html' },
        { id: 'lonely', name: '孤独', x: 50, y: 88, link: 'poem_frustrated.html' }
    ];
    
    const networkContainer = document.getElementById('node-network');
    if (!networkContainer) return;
    
    const links = [];
    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            links.push({ from: nodes[i], to: nodes[j] });
        }
    }
    
    links.forEach(function(link) {
        const linkElement = document.createElement('div');
        linkElement.className = 'network-link';
        
        const centerX1 = (link.from.x / 100) * networkContainer.offsetWidth;
        const centerY1 = (link.from.y / 100) * networkContainer.offsetHeight;
        const centerX2 = (link.to.x / 100) * networkContainer.offsetWidth;
        const centerY2 = (link.to.y / 100) * networkContainer.offsetHeight;
        
        const dx = centerX2 - centerX1;
        const dy = centerY2 - centerY1;
        const fullLength = Math.sqrt(dx * dx + dy * dy);
        
        linkElement.style.width = fullLength + 'px';
        linkElement.style.left = centerX1 + 'px';
        linkElement.style.top = centerY1 + 'px';
        linkElement.style.transformOrigin = '0 0';
        linkElement.style.transform = 'rotate(' + Math.atan2(dy, dx) * 180 / Math.PI + 'deg)';
        
        networkContainer.appendChild(linkElement);
    });
    
    nodes.forEach(function(node) {
        const nodeElement = document.createElement('div');
        nodeElement.className = 'network-node';
        nodeElement.innerHTML = '<span>' + node.name + '</span>';
        nodeElement.style.left = (node.x / 100) * networkContainer.offsetWidth - 50 + 'px';
        nodeElement.style.top = (node.y / 100) * networkContainer.offsetHeight - 50 + 'px';
        nodeElement.style.zIndex = 10;
        
        nodeElement.addEventListener('click', function() {
            window.location.href = node.link;
        });
        
        networkContainer.appendChild(nodeElement);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    initMusic();
    initConsolation();
    initPoetLinks();
    
    if (document.getElementById('poet-content')) {
        initPoetDetail();
    }
    
    if (document.getElementById('node-network')) {
        initNetwork();
    }
});