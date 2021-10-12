const ap = new APlayer({
	// 这里命名ap, 与全局音乐播放器ap名称一样 所以在/music页面只出现一个播放器 ; 如果需要同时出现 请命名ap1
    container: document.getElementById('aplayer2'),
	// mini: false,
    //fixed: true,//吸底模式
    autoplay: false,//默认是否自动播放
	//theme: '#0088cc',
    loop: 'all',
    //order: 'random',
	order: 'list',
    preload: 'auto',
    volume: 0.7,//默认音量
	lrcType: 3, //使用lrc文件提供歌词
    mutex: true,//是否不允许多个播放器同时播放
    listFolded: false,//是否默认收起播放列表
    listMaxHeight: 700,//播放列表的高度
	//网易云默认外链链接：http://music.163.com/song/media/outer/url?id=ID数字.mp3
	// 音乐网解析: https://www.jbsou.cn/

    audio: [{
            name: '所念皆星河',
            artist: '房东的猫',
            lrc: '/music/lrc/所念皆星河 - 房东的猫.lrc',
            cover: 'http://p1.music.126.net/JtevaRk1N7ecpmwZCIvwzQ==/109951165293262893.jpg?param=300y300',
            url: 'http://music.163.com/song/media/outer/url?id=1476239407.mp3',
			theme: 'red',
			type: '',
                  },
        {
            name: '举镜子的女孩',
            artist: '张子枫',
            lrc: '/music/lrc/举镜子的女孩 - 张子枫.lrc',
            cover: 'http://singerimg.kugou.com/uploadpic/softhead/150/20201209/20201209103630863.jpg',
            url: 'https://sharefs.ali.kugou.com/202110122207/38eb24edc7aceb6d062d0455fb1c0925/KGTX/CLTX001/35700581792749ef1260bb06178cf9f6.mp3',
                  },
		{
            name: '亲爱的旅人啊',
            artist: '周深',
            lrc: '/music/lrc/亲爱的旅人啊 - 周深.lrc',
            cover: 'http://p2.music.126.net/1YrCPOBV314i-mTtlDg8mQ==/109951164148664637.jpg?param=300x300',
            url: 'http://music.163.com/song/media/outer/url?id=1371939273.mp3'
                  },
        {
            name: '平凡的一天',
            artist: '毛不易',
            lrc: '/music/lrc/平凡的一天 - 毛不易.lrc',
            cover: 'http://p1.music.126.net/vmCcDvD1H04e9gm97xsCqg==/109951163350929740.jpg?param=300x300',
            url: 'http://music.163.com/song/media/outer/url?id=569214247.mp3'
                  },
        {
            name: '若把你',
            artist: 'Kirsty刘瑾睿',
            lrc: '/music/lrc/若把你 - Kirsty刘瑾睿.lrc',
            cover: 'http://p1.music.126.net/M877M2-VhWZiLPVFORf9iQ==/109951163401482434.jpg?param=300x300',
            url: 'http://music.163.com/song/media/outer/url?id=865632948.mp3'
                  },
        {
            name: '大鱼',
            artist: '周深',
            lrc: '/music/lrc/大鱼 (Live) - 周深.lrc',
            cover: 'https://p2.music.126.net/aiPQXP8mdLovQSrKsM3hMQ==/1416170985079958.jpg?param=300x300',
            url: 'http://music.163.com/song/media/outer/url?id=1421191783',
                  },
        {
            name: '远方不远',
            artist: '徐薇',
            lrc: '/music/lrc/远方不远 - 徐薇.lrc',
            cover: 'https://p1.music.126.net/LjwSx1AXf7si4MaAb8bzYw==/109951165041602630.jpg?param=300x300',
            url: 'http://music.163.com/song/media/outer/url?id=431554119.mp3'
                  },
        {
            name: '风铃',
            artist: '孟凡明',
            lrc: '/music/lrc/风铃 - 孟凡明.lrc',
            cover: 'https://p1.music.126.net/ZjWhERuCE8slMan5EzX96w==/109951164358745101.jpg?param=300x300',
            url: 'http://music.163.com/song/media/outer/url?id=1390480881.mp3'
                  },
        {
            name: '心如止水',
            artist: 'Ice Paper',
            lrc: '/music/lrc/心如止水 - Ice Paper.lrc',
            cover: 'http://p2.music.126.net/MLQl_7poLz2PTON6_JZZRQ==/109951163938219545.jpg?param=300x300',
            url: 'http://music.163.com/song/media/outer/url?id=1349292048.mp3'
                  },
        {
            name: '成都',
            artist: '赵雷',
            lrc: '/music/lrc/成都 - 赵雷.lrc',
            cover: '	https://p2.music.126.net/34YW1QtKxJ_3YnX9ZzKhzw==/2946691234868155.jpg?param=300x300',
            url: 'http://music.163.com/song/media/outer/url?id=436514312.mp3'
                  },
        {
            name: '忽而今夏',
            artist: '汪苏泷',
            lrc: '/music/lrc/忽而今夏 - 汪苏泷.lrc',
            cover: 'https://p2.music.126.net/Oq2wbMND4y6jTSL5F3HmNA==/109951163293541812.jpg?param=300x300',
            url: 'http://music.163.com/song/media/outer/url?id=1366388726.mp3'
                  },
        {
            name: '泡沫',
            artist: 'G.E.M.邓紫棋',
            lrc: '/music/lrc/泡沫 - G.E.M.邓紫棋.lrc',
            cover: 'https://p2.music.126.net/fqleir2BWqbmE8tDNLa5Pg==/109951163789160762.jpg?param=300x300',
            url: 'http://music.163.com/song/media/outer/url?id=233931.mp3'
                  },
        {
            name: '何以爱情',
            artist: '钟汉良',
            lrc: '/music/lrc/何以爱情 - 钟汉良.lrc',
            cover: 'https://p2.music.126.net/ODGACHdemEF8EgDy6-Mjlw==/109951163014224498.jpg?param=300x300',
            url: 'https://sharefs.ali.kugou.com/202110122151/b8e67c1c85e933da8033cc67b4b17295/KGTX/CLTX001/9ffedd1dd3572a565b9c0417cf2f7d03.mp3'
                  },
        {
            name: '可能否',
            artist: '木小雅',
            lrc: '/music/lrc/可能否 - 木小雅.lrc',
            cover: 'https://p2.music.126.net/SJYnDay7wgewU3O7tPfmOQ==/109951163322541581.jpg?param=300x300',
            url: 'http://music.163.com/song/media/outer/url?id=569214126.mp3'
                  },
        {
            name: '丁香花',
            artist: '唐磊',
            lrc: '/music/lrc/丁香花 - 唐磊.lrc',
            cover: 'https://p2.music.126.net/FdutyVQ0oNOvjDHDixrALw==/844424930132282.jpg?param=300x300',
            url: 'http://music.163.com/song/media/outer/url?id=151985.mp3'
                  },
        {
            name: '冬眠',
            artist: '司南',
            lrc: '/music/lrc/冬眠 - 司南.lrc',
            cover: 'https://p1.music.126.net/4KDBaQXnQywQovmqvjx-8Q==/109951164444131697.jpg?param=300x300',
            url: 'http://music.163.com/song/media/outer/url?id=1398663411.mp3'
                  },
        {
            name: '少年 (Live)',
            artist: '梦然',
            lrc: '/music/lrc/少年 (Live) - 梦然.lrc',
            cover: 'https://p2.music.126.net/AcJI2yDiUNgKYn_Wr5eVxw==/109951165358201641.jpg?param=300x300',
            url: 'http://music.163.com/song/media/outer/url?id=1483891561.mp3'
                  },
        {
            name: '我和我的祖国',
            artist: '王菲',
            lrc: '/music/lrc/我和我的祖国 - 王菲.lrc',
            cover: 'https://p1.music.126.net/HeGrAKPiZhKkONiFDxZvmw==/109951164384346866.jpg?param=300x300',
            url: 'http://music.163.com/song/media/outer/url?id=1392990601.mp3'
                  },
        {
            name: '在青春里遇见',
            artist: '卜冠今',
            lrc: '/music/lrc/在青春里遇见 - 卜冠今.lrc',
            cover: 'https://p2.music.126.net/Oq2wbMND4y6jTSL5F3HmNA==/109951163293541812.jpg?param=300x300',
            url: 'http://music.163.com/song/media/outer/url?id=1324399236.mp3'
                  },
        {
            name: '杏花弦外雨',
            artist: '杏花弦外雨',
            lrc: '/music/lrc/杏花弦外雨 - CRITTY,司夏.lrc',
            cover: 'https://p2.music.126.net/iwZ6w7D5C8WXgnjcohHb0Q==/7799935488436943.jpg?param=300x300',
            url: 'http://music.163.com/song/media/outer/url?id=32957012.mp3'
                  },
        {
            name: '刚刚好',
            artist: '薛之谦',
            lrc: '/music/lrc/刚刚好 - 薛之谦.lrc',
            cover: '	https://p2.music.126.net/hti_a0LADoFMBHvOBwAtRA==/1369991500930171.jpg?param=300x300',
            url: 'http://music.163.com/song/media/outer/url?id=415792881.mp3'
                  },
        {
            name: '光年之外',
            artist: 'G.E.M.邓紫棋',
            lrc: '/music/lrc/光年之外 - G.E.M.邓紫棋.lrc',
            cover: '	https://p2.music.126.net/fkqFqMaEt0CzxYS-0NpCog==/18587244069235039.jpg?param=300x300',
            url: 'http://music.163.com/song/media/outer/url?id=449818741.mp3'
                  },
        {
            name: '空空如也 ',
            artist: '任然',
            lrc: '/music/lrc/空空如也  - 任然.lrc',
            cover: 'https://p1.music.126.net/84FJjDgb51TmRqixaUpshg==/109951163094476391.jpg?param=300x300',
            url: 'http://music.163.com/song/media/outer/url?id=526464293.mp3'
                  },
		{
            name: '蓝莲花',
            artist: '许巍',
            lrc: '/music/lrc/蓝莲花 - 许巍.lrc',
            cover: 'http://imge.kugou.com/stdmusic/150/20150719/20150719030234152582.jpg',
            url: 'https://sharefs.ali.kugou.com/202110122212/4e0614fd3f2776a2e1e816c75cc9c620/G158/M04/00/0F/fpQEAFzVU6aAD9uGAEIRaxAfzh8459.mp3'
                  },

        ],
		customAudioType: {
			'customHls': function (audioElement, audio, player) {
				if (Hls.isSupported()) {
					const hls = new Hls();
					hls.loadSource(audio.url);
					hls.attachMedia(audioElement);
				}
				else if (audioElement.canPlayType('application/x-mpegURL') || audioElement.canPlayType('application/vnd.apple.mpegURL')) {
					audioElement.src = audio.url;
				}
				else {
					player.notice('Error: HLS is not supported.');
				}
			}
       }  
});