const ap = new APlayer({
    container: document.getElementById('aplayer'),
	// mini: false,
    fixed: true,//吸底模式
    autoplay: false,//默认是否自动播放
    theme: '#FADFA3',
	//theme: '#b7daff',
    loop: 'all',
    order: 'random',
	//order: 'list',
    preload: 'auto',
    volume: 0.7,//默认音量
	lrcType: 3, //使用lrc文件提供歌词
    mutex: true,//是否不允许多个播放器同时播放
    listFolded: true,//是否默认收起播放列表
    //listMaxHeight: 90,//播放列表的高度
	//网易云默认外链链接：http://music.163.com/song/media/outer/url?id=ID数字.mp3

    audio: [{
            name: '一直很安静',
            artist: '阿桑',
            lrc: '/music/lrc/一直很安静 - 阿桑.lrc',
            cover: 'https://p1.music.126.net/SpovasHBud2A1qXXADXsBg==/109951163167455610.jpg?param=300x300',
            url: 'https://myblog12.qiniu.yansheng.xyz/audio/mp3/一直很安静 - 阿桑.mp3'
                  },
        {
            name: '亲爱的旅人啊（Cover：木村弓）',
            artist: '周深',
            lrc: '/music/lrc/亲爱的旅人啊（Cover：木村弓） - 周深.lrc',
            cover: 'https://p1.music.126.net/1YrCPOBV314i-mTtlDg8mQ==/109951164148664637.jpg?param=300x300',
            url: 'https://myblog12.qiniu.yansheng.xyz/audio/mp3/亲爱的旅人啊（Cover：木村弓） - 周深.mp3'
                  },
        {
            name: '大鱼',
            artist: '周深',
            lrc: '/music/lrc/大鱼 - 周深.lrc',
            cover: 'https://p2.music.126.net/aiPQXP8mdLovQSrKsM3hMQ==/1416170985079958.jpg?param=300x300',
            url: 'https://myblog12.qiniu.yansheng.xyz/audio/mp3/大鱼 - 周深.mp3'
                  },
        {
            name: '无羁',
            artist: 'Silu Wang-陈情令',
            lrc: '/music/lrc/无羁 - Silu Wang-陈情令.lrc',
            cover: 'https://p2.music.126.net/8eL7nls1F8o48_umy0uqBQ==/109951164361652548.jpg?param=300x300',
            url: 'https://myblog12.qiniu.yansheng.xyz/audio/mp3/无羁 - Silu Wang-陈情令.mp3'
                  },
        {
            name: '盗将行',
            artist: '花粥,马雨阳',
            lrc: '/music/lrc/盗将行 - 花粥,马雨阳.lrc',
            cover: 'https://p2.music.126.net/-qHPT3rhxDlu5zQV9NcQ-A==/109951163555860423.jpg?param=300x300',
            url: 'https://myblog12.qiniu.yansheng.xyz/audio/mp3/盗将行 - 花粥,马雨阳.mp3'
                  },
        {
            name: '心如止水',
            artist: 'Ice Paper',
            lrc: '/music/lrc/心如止水 - Ice Paper.lrc',
            cover: 'https://i.kfs.io/album/global/54740523,0v1/fit/500x500.jpg',
            url: 'https://myblog12.qiniu.yansheng.xyz/audio/mp3/心如止水 - Ice Paper.mp3'
                  },
        {
            name: '我的梦',
            artist: '张靓颖',
            lrc: '/music/lrc/我的梦 - 张靓颖.lrc',
            cover: 'https://n.sinaimg.cn/ent/transform/20151229/WLT_-fxmxxsp7232280.jpg',
            url: 'https://myblog12.qiniu.yansheng.xyz/audio/mp3/我的梦 - 张靓颖.mp3'
                  },
        {
            name: 'Dream It Possible',
            artist: '张靓颖',
            lrc: '/music/lrc/Dream It Possible - 张靓颖.lrc',
            cover: 'https://p2.music.126.net/Gfq_eVuq7lgilBf0w1g5dg==/109951163088676710.jpg?param=300x300',
            url: 'https://myblog12.qiniu.yansheng.xyz/audio/mp3/Dream It Possible - 张靓颖.mp3'
                  },
        {
            name: 'Let Her Go',
            artist: 'J.Fla',
            lrc: '/music/lrc/Let Her Go - J.Fla.lrc',
            cover: 'https://p1.music.126.net/izJEWkbpFZOkq59zyATvmg==/109951163265162334.jpg?param=300x300',
            url: 'https://myblog12.qiniu.yansheng.xyz/audio/mp3/Let Her Go - J.Fla.mp3'
                  },
        {
            name: '我很快乐',
            artist: '刘惜君',
            lrc: '/music/lrc/我很快乐 - 刘惜君.lrc',
            cover: 'https://p1.music.126.net/aNHxGZC0H1xRQfoz7UqSpQ==/36283883730943.jpg?param=300x300',
            url: 'https://myblog12.qiniu.yansheng.xyz/audio/mp3/%E6%88%91%E5%BE%88%E5%BF%AB%E4%B9%90%20-%20%E5%88%98%E6%83%9C%E5%90%9B.mp3'
                  },
        {
            name: '南山南',
            artist: '马頔',
            lrc: '/music/lrc/南山南 - 马頔.lrc',
            cover: 'http://imge.kugou.com/stdmusic/150/20150715/20150715223122826270.jpg',
            url: 'https://myblog12.qiniu.yansheng.xyz/audio/mp3/%E5%8D%97%E5%B1%B1%E5%8D%97%20-%20%E9%A9%AC%E9%A0%94.mp3'
                  },
        {
            name: '起风了',
            artist: '买辣椒也用券',
            lrc: '/music/lrc/起风了 - 买辣椒也用券.lrc',
            cover: 'https://p1.music.126.net/diGAyEmpymX8G7JcnElncQ==/109951163699673355.jpg?param=300x300',
            url: 'https://myblog12.qiniu.yansheng.xyz/audio/mp3/%E8%B5%B7%E9%A3%8E%E4%BA%86%20-%20%E4%B9%B0%E8%BE%A3%E6%A4%92%E4%B9%9F%E7%94%A8%E5%88%B8.mp3'
                  },
        {
            name: '恋人心',
            artist: '魏新雨',
            lrc: '/music/lrc/恋人心 - 魏新雨.lrc',
            cover: 'https://p2.music.126.net/OX6lR0jEjtxPfIgjVUtWww==/5786729697194540.jpg?param=300x300',
            url: 'https://myblog12.qiniu.yansheng.xyz/audio/mp3/%E6%81%8B%E4%BA%BA%E5%BF%83%20-%20%E9%AD%8F%E6%96%B0%E9%9B%A8.mp3'
                  },
        {
            name: '断桥残雪',
            artist: '许嵩',
            lrc: '/music/lrc/断桥残雪 - 许嵩.lrc',
            cover: 'https://p2.music.126.net/PEQ69_EwVpuaBmmSkAY0SQ==/58274116284456.jpg?param=300x300',
            url: 'https://myblog12.qiniu.yansheng.xyz/audio/mp3/%E6%96%AD%E6%A1%A5%E6%AE%8B%E9%9B%AA%20-%20%E8%AE%B8%E5%B5%A9.mp3'
                  },
        {
            name: '曾经的你',
            artist: '许巍',
            lrc: '/music/lrc/曾经的你 - 许巍.lrc',
            cover: 'https://p1.music.126.net/GoiTB6oG3vQWntnCjKRw0g==/109951163092691594.jpg?param=300x300',
            url: 'https://myblog12.qiniu.yansheng.xyz/audio/mp3/%E6%9B%BE%E7%BB%8F%E7%9A%84%E4%BD%A0%20-%20%E8%AE%B8%E5%B7%8D.mp3'
                  },
        {
            name: '烟影如画',
            artist: '重小烟',
            lrc: '/music/lrc/烟影如画 - 重小烟.lrc',
            cover: 'http://singerimg.kugou.com/uploadpic/softhead/150/20151214/20151214140843180469.jpg',
            url: 'https://myblog12.qiniu.yansheng.xyz/audio/mp3/%E7%83%9F%E5%BD%B1%E5%A6%82%E7%94%BB%20-%20%E9%87%8D%E5%B0%8F%E7%83%9F.mp3'
                  },
        {
            name: '成都',
            artist: '赵雷',
            lrc: '/music/lrc/成都 - 赵雷.lrc',
            cover: 'http://imge.kugou.com/stdmusic/150/20161026/20161026104110350398.jpg',
            url: 'https://myblog12.qiniu.yansheng.xyz/audio/mp3/%E6%88%90%E9%83%BD%20-%20%E8%B5%B5%E9%9B%B7.mp3'
                  },
        {
            name: '一个人',
            artist: '夏婉安',
            lrc: '/music/lrc/一个人 - 夏婉安.lrc',
            cover: 'http://imge.kugou.com/stdmusic/150/20150715/20150715230628433049.jpg',
            url: 'https://myblog12.qiniu.yansheng.xyz/audio/mp3/%E4%B8%80%E4%B8%AA%E4%BA%BA%20-%20%E5%A4%8F%E5%A9%89%E5%AE%89.mp3'
                  },
        {
            name: '送别',
            artist: '朴树',
            lrc: '/music/lrc/送别 - 朴树.lrc',
            cover: 'http://imge.kugou.com/stdmusic/150/20160512/20160512094410431268.jpg',
            url: 'https://myblog12.qiniu.yansheng.xyz/audio/mp3/%E9%80%81%E5%88%AB%20-%20%E6%9C%B4%E6%A0%91.mp3'
                  },
        {
            name: '风起时',
            artist: '胡歌',
            lrc: '/music/lrc/风起时 - 胡歌.lrc',
            cover: 'https://oss.yansheng.xyz/%E9%A3%8E%E8%B5%B7%E6%97%B6-%E8%83%A1%E6%AD%8C.jpg',
            url: 'https://myblog12.qiniu.yansheng.xyz/audio/mp3/%E9%A3%8E%E8%B5%B7%E6%97%B6%20-%20%E8%83%A1%E6%AD%8C.mp3'
                  },
        {
            name: '追光者',
            artist: '岑宁儿',
            lrc: '/music/lrc/追光者 - 岑宁儿.lrc',
            cover: 'http://imge.kugou.com/stdmusic/150/20170615/20170615171929677900.jpg',
            url: 'https://myblog12.qiniu.yansheng.xyz/audio/mp3/%E8%BF%BD%E5%85%89%E8%80%85%20-%20%E5%B2%91%E5%AE%81%E5%84%BF.mp3'
                  },
        {
            name: '炽热的青春',
            artist: '贾乃亮',
            lrc: '/music/lrc/炽热的青春 - 贾乃亮.lrc',
            cover: 'http://imge.kugou.com/stdmusic/150/20150703/20150703153025347483.jpg',
            url: 'https://myblog12.qiniu.yansheng.xyz/audio/mp3/%E7%82%BD%E7%83%AD%E7%9A%84%E9%9D%92%E6%98%A5%20-%20%E8%B4%BE%E4%B9%83%E4%BA%AE.mp3'
                  },
        {
            name: '逆流成河',
            artist: '金南玲',
            lrc: '/music/lrc/逆流成河 - 金南玲.lrc',
            cover: 'http://imge.kugou.com/stdmusic/150/20180927/20180927182404805981.jpg',
            url: 'https://myblog12.qiniu.yansheng.xyz/audio/mp3/%E9%80%86%E6%B5%81%E6%88%90%E6%B2%B3%20-%20%E9%87%91%E5%8D%97%E7%8E%B2.mp3'
                  },
        {
            name: 'Rage your dream',
            artist: 'm.o.v.e',
            lrc: '/music/lrc/Rage your dream - m.o.v.e.lrc',
            cover: 'https://oss.yansheng.xyz/Rage%20your%20dream%20-%20m.o.v.e.jpg',
            url: 'https://myblog12.qiniu.yansheng.xyz/audio/mp3/Rage%20your%20dream%20-%20m.o.v.e.mp3'
                  },
        {
            name: 'いつも何度でも',
            artist: '宗次郎',
            lrc: '/music/lrc/いつも何度でも - 宗次郎.lrc',
            cover: 'http://imge.kugou.com/stdmusic/150/20150720/20150720192351939143.jpg',
            url: 'https://myblog12.qiniu.yansheng.xyz/audio/mp3/%E3%81%84%E3%81%A4%E3%82%82%E4%BD%95%E5%BA%A6%E3%81%A7%E3%82%82%20-%20%E5%AE%97%E6%AC%A1%E9%83%8E.mp3'
                  }
        ]
});