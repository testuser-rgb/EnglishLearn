/* ============================================================
 * data/04_exam_cloze.js —— 题型二：完形填空（三选一）
 * 官方口径：1 篇约 250–330 词短文 / 20 空 / 每空 1 分 / 共 20 分
 * 全部自编短文，考点：动词搭配、连词逻辑、名词辨析、副词、关系词。
 * 字段：p=卷号 title=短文标题 passage=段落数组([n] 为第 n 空)
 *       blanks=[{n, o:[三个选项], a:正确下标, e:解析}] 共 20 个
 * ============================================================ */
(function (root) {
  'use strict';
  var APP = root.APP = root.APP || {};
  var data = APP.data = APP.data || {};

  data.CLOZE = [
    /* ---------------- 模拟卷一：早起的习惯 ---------------- */
    {
      p: 1,
      title: 'The Habit of Getting Up Early',
      passage: [
        'Many people believe that the secret of success lies in talent or luck. In fact, a simple habit may matter more: getting up early. Several years ago, I was the kind of person who [1] the alarm three times before getting out of bed. My mornings were a rush, and I often arrived at work [2] and tired. One day my doctor told me that my poor sleep [3] was harming my health. That conversation changed my life.',
        'I decided to try waking up at six o\'clock. The first week was [4]. My body refused to cooperate, and by ten in the morning I could hardly keep my eyes [5]. But I did not give up. I put the alarm across the room so that I had to [6] out of bed to stop it. I also prepared my clothes and bag the night before, [7] saved me fifteen minutes each morning.',
        'After a month, something unexpected [8]. I found that I had more energy than before. [9] I used to feel sleepy after lunch, now I could work [10] the whole afternoon. My colleagues noticed the change and asked me what had [11]. I told them the truth: I had simply gone to bed earlier and got up earlier.',
        'Getting up early is not just about time. It gives you a quiet period [12] you can plan the day, read a few pages, or simply enjoy a cup of tea [13] the house wakes up. This kind of calm start reduces stress and [14] your ability to concentrate.',
        'Of course, early rising only works [15] you go to bed early. Staying up until midnight and getting up at five is a [16] for disaster. Experts suggest that adults need seven to eight hours of sleep [17] night. If you lose sleep, no amount of coffee will [18] for it.',
        'So if you want to improve your life, start with something small. Set your alarm thirty minutes [19] than usual, and give your body two weeks to [20] to the change. You may be surprised by how much difference half an hour can make.'
      ],
      blanks: [
        { n: 1,  o: ['turned up', 'turned off', 'turned out'], a: 1, e: 'turn off the alarm 关掉闹钟；turn up 出现、调高音量；turn out 结果是。' },
        { n: 2,  o: ['late', 'lately', 'later'], a: 0, e: 'arrive late 迟到，late 作副词；lately 意为"最近"，later 意为"后来"。' },
        { n: 3,  o: ['custom', 'manner', 'habit'], a: 2, e: 'sleep habit 睡眠习惯；custom 多指社会风俗，manner 指举止方式。' },
        { n: 4,  o: ['comfortable', 'terrible', 'wonderful'], a: 1, e: '由后文"身体不配合、上午睁不开眼"可知第一周很糟糕，选 terrible。' },
        { n: 5,  o: ['open', 'opened', 'opening'], a: 0, e: 'keep + 宾语 + 形容词，表示"使……保持某种状态"，用 open。' },
        { n: 6,  o: ['climb', 'arrive', 'get'], a: 2, e: 'get out of bed 为固定搭配，意为"起床、下床"。' },
        { n: 7,  o: ['which', 'that', 'what'], a: 0, e: '非限制性定语从句指代前面整件事，只能用 which。' },
        { n: 8,  o: ['appeared', 'happened', 'showed'], a: 1, e: 'something happened 发生了某事；appear 意为"出现"，show 需接宾语。' },
        { n: 9,  o: ['Since', 'Unless', 'While'], a: 2, e: '前后为对比关系（过去午后困、现在不困），用 while 引导让步/对比状语从句。' },
        { n: 10, o: ['through', 'across', 'over'], a: 0, e: 'through the whole afternoon 表示"贯穿整个下午"。' },
        { n: 11, o: ['exchanged', 'changed', 'replaced'], a: 1, e: 'what had changed 发生了什么变化；exchange 意为"交换"，replace 意为"取代"。' },
        { n: 12, o: ['which', 'where', 'when'], a: 2, e: '先行词 period 表时间，从句成分完整，用关系副词 when。' },
        { n: 13, o: ['before', 'after', 'until'], a: 0, e: '趁家人还没起床时喝茶，用 before 表示"在……之前"。' },
        { n: 14, o: ['proves', 'improves', 'approves'], a: 1, e: 'improve one\'s ability 提高能力；prove 证明，approve 批准。' },
        { n: 15, o: ['unless', 'though', 'if'], a: 2, e: '条件关系："只有早睡，早起才有效"，用 if 引导条件从句。' },
        { n: 16, o: ['recipe', 'menu', 'list'], a: 0, e: 'a recipe for disaster 为固定表达，意为"必然酿成灾祸的做法"。' },
        { n: 17, o: ['every', 'a', 'one'], a: 1, e: 'seven to eight hours a night 表示"每晚"，用不定冠词表"每一"。' },
        { n: 18, o: ['take up', 'put up', 'make up'], a: 2, e: 'make up for 弥补；take up 占据、开始从事；put up 举起、搭建。' },
        { n: 19, o: ['earlier', 'early', 'earliest'], a: 0, e: '有 than 说明是比较级，用 earlier。' },
        { n: 20, o: ['adopt', 'apply', 'adapt'], a: 2, e: 'adapt to 适应；adopt 采用、收养；apply 申请、应用。' }
      ]
    },

    /* ---------------- 模拟卷二：远程办公 ---------------- */
    {
      p: 2,
      title: 'Working from Home',
      passage: [
        'When I joined my company five years ago, everyone worked in a large office in the city centre. Today, more than half of my colleagues work from home at least three days a week. This change, which began as an emergency measure, has become a permanent part of [1] we work.',
        'Remote work has clear advantages. The most obvious one is time. People no longer [2] two hours a day travelling to and from the office. This saved time can be [3] on family, exercise or simply rest. Many workers also say they can concentrate better at home, because the office is full of [4] — phone calls, meetings and colleagues who drop by for a chat.',
        '[5], working from home is not without problems. When your office is also your bedroom, it is hard to know when to [6]. Some people find themselves answering emails at midnight. Others feel lonely and [7] contact with their team. New employees suffer most, [8] they have no chance to learn by watching experienced colleagues.',
        'Companies are trying to solve these problems in different ways. Some organize a monthly [9] so that people can meet face to face. Others set clear [10] about working hours. A few have introduced a "hybrid" model, [11] staff spend two or three days in the office and the rest at home.',
        'In my opinion, the [12] of remote work depends on how well it is managed. If a company trusts its employees and judges them by results [13] than by hours, remote work can increase both productivity and happiness. But if managers simply [14] the old office rules onto the home, everyone loses.',
        'What is clear is that we cannot go back. Many jobs do not [15] a fixed desk. The question is no longer [16] we should allow remote work, but how to make it work well. For young people entering the job market, the ability to manage their own time and stay [17] with colleagues online may be as important as any professional skill.',
        'Perhaps the biggest [18] of all is trust. When employers trust their staff, and staff take [19] for their own work, distance stops being a problem. It simply becomes a different way of [20] together.'
      ],
      blanks: [
        { n: 1,  o: ['how', 'what', 'that'], a: 0, e: 'the way we work 也可说成 how we work，介词 of 后接 how 引导的宾语从句。' },
        { n: 2,  o: ['take', 'spend', 'cost'], a: 1, e: 'spend time (in) doing sth 为固定搭配；take 常用于 It takes sb some time to do；cost 主语是物。' },
        { n: 3,  o: ['wasted', 'saved', 'spent'], a: 2, e: 'spend time on sth 把时间花在某事上；此处指把省下的时间用在家人身上。' },
        { n: 4,  o: ['attractions', 'distractions', 'instructions'], a: 1, e: '由后文"电话、会议、同事闲聊"可知办公室里充满让人分心的事物，选 distractions。' },
        { n: 5,  o: ['However', 'Therefore', 'Besides'], a: 0, e: '上段讲优点，本段讲问题，为转折关系，用 however。' },
        { n: 6,  o: ['start', 'continue', 'stop'], a: 2, e: '办公室就是卧室时，很难知道什么时候该"停下"工作。' },
        { n: 7,  o: ['lose', 'keep', 'make'], a: 0, e: 'lose contact with 与……失去联系；keep contact 应为 keep in contact。' },
        { n: 8,  o: ['although', 'because', 'unless'], a: 1, e: '后句解释前句的原因（没有机会向老同事学习），用 because。' },
        { n: 9,  o: ['journey', 'examination', 'gathering'], a: 2, e: 'monthly gathering 每月聚会，与"见面"呼应。' },
        { n: 10, o: ['rules', 'prices', 'seats'], a: 0, e: 'set clear rules about working hours 制定明确的工作时间规定。' },
        { n: 11, o: ['which', 'in which', 'that'], a: 1, e: '非限制性定语从句中表"在这种模式里"，用 in which；that 不能引导非限制性从句。' },
        { n: 12, o: ['price', 'speed', 'success'], a: 2, e: 'the success of remote work depends on... 远程办公能否成功取决于管理。' },
        { n: 13, o: ['rather', 'better', 'other'], a: 0, e: 'rather than 而不是，为固定搭配。' },
        { n: 14, o: ['invite', 'force', 'teach'], a: 1, e: 'force... onto... 把……强加于，含贬义，与"每个人都会输"呼应。' },
        { n: 15, o: ['offer', 'provide', 'require'], a: 2, e: 'do not require a fixed desk 不需要固定的办公桌。' },
        { n: 16, o: ['whether', 'that', 'what'], a: 0, e: '"是否该允许远程办公"用 whether 引导；no longer 后接的从句不缺成分。' },
        { n: 17, o: ['angry', 'busy', 'connected'], a: 2, e: 'stay connected with colleagues 与同事保持联系。' },
        { n: 18, o: ['advantage', 'challenge', 'reason'], a: 1, e: '由后文谈"信任"可知这是最大的难题，选 challenge。' },
        { n: 19, o: ['responsibility', 'attention', 'advantage'], a: 0, e: 'take responsibility for 对……负责。' },
        { n: 20, o: ['living', 'working', 'playing'], a: 1, e: '全文主题是远程办公，故为"另一种一起工作的方式"。' }
      ]
    },

    /* ---------------- 模拟卷三：独自旅行 ---------------- */
    {
      p: 3,
      title: 'Travelling Alone',
      passage: [
        'Last summer I spent two weeks travelling in the northwest of China. I had planned the trip for months, [1] nothing could have prepared me for what I saw.',
        'My first stop was a small town near the desert. I arrived late at night and found that the hotel I had booked no longer [2]. An old man who ran a tea house noticed me standing in the street and [3] me to stay in his spare room. He refused to accept any money. "Guests are a gift," he said. That night we sat [4] the stars and talked until midnight, although neither of us spoke the other\'s language well.',
        'The next morning he took me to the market. The colours, the smells and the noise were [5] anything I had experienced before. I bought a hand-made knife from a man who had been [6] the same trade as his father and grandfather. He showed me how the blade was shaped, and I realized that [7] I was watching was not simply a product but a tradition.',
        'Travelling alone taught me something [8] I could not have learned from books. When you are [9] your own, you have to solve problems by yourself. My bus broke down in the middle of nowhere, and I had to [10] a lift from a truck driver. [11] first I was nervous, but he turned out to be kind and curious about my country.',
        'Of course, travel is not always comfortable. I was bitten by insects, I lost my way twice, and I [12] a whole day waiting for a train that never came. [13], looking back, these difficulties are the parts I remember most clearly.',
        'Many people say that travel is a waste of money. I [14] with them. A new place forces you to see your own life [15] a different angle. You learn that there are many ways to be happy, and that people who seem very different from you often share the same hopes.',
        'I came home with a suitcase full of cheap souvenirs and a notebook full of stories. [16] of these things cost much, but together they changed the way I look at the world. If you have the chance to go somewhere new, [17] it. You may return with more [18] than you left with. And you will understand, as I did, that the best part of a journey is often [19] you least expect. That is [20] I am already planning my next trip.'
      ],
      blanks: [
        { n: 1,  o: ['and', 'so', 'but'], a: 2, e: '前句说"准备了几个月"，后句说"没有任何准备能让我应付所见"，为转折关系，用 but。' },
        { n: 2,  o: ['existed', 'belonged', 'mattered'], a: 0, e: 'no longer existed 已不存在，与后文只好住进老人家呼应。' },
        { n: 3,  o: ['ordered', 'invited', 'forced'], a: 1, e: 'invite sb to do sth 邀请某人做某事；order 命令、点菜，force 强迫。' },
        { n: 4,  o: ['above', 'beside', 'under'], a: 2, e: 'sit under the stars 坐在星空下。' },
        { n: 5,  o: ['unlike', 'like', 'as'], a: 0, e: 'unlike anything I had experienced 与我以往经历的完全不同，unlike 为介词。' },
        { n: 6,  o: ['making', 'following', 'changing'], a: 1, e: 'follow the same trade 从事同一行业；follow 此处意为"追随、从事"。' },
        { n: 7,  o: ['that', 'which', 'what'], a: 2, e: '主语从句中 watching 缺宾语，用 what 引导。' },
        { n: 8,  o: ['that', 'what', 'which'], a: 0, e: 'something 作先行词、从句成分完整时，关系代词用 that。' },
        { n: 9,  o: ['by', 'on', 'for'], a: 1, e: 'on one\'s own 独自一人，为固定短语。' },
        { n: 10, o: ['give', 'refuse', 'ask for'], a: 2, e: 'ask for a lift 搭便车；give a lift 是"让人搭车"，主语不同。' },
        { n: 11, o: ['At', 'In', 'On'], a: 0, e: 'at first 起初，为固定搭配。' },
        { n: 12, o: ['enjoyed', 'wasted', 'saved'], a: 1, e: '等一趟始终没来的火车，"浪费"了一整天，选 wasted。' },
        { n: 13, o: ['Therefore', 'Besides', 'However'], a: 2, e: '前句说旅途不舒服，后句说这些困难记得最清楚，为转折，用 however。' },
        { n: 14, o: ['disagree', 'agree', 'argue'], a: 0, e: '后文说旅行让人换角度看生活，说明作者不同意"浪费钱"的说法，选 disagree。' },
        { n: 15, o: ['in', 'from', 'with'], a: 1, e: 'from a different angle 从不同角度，为固定搭配。' },
        { n: 16, o: ['All', 'Both', 'None'], a: 2, e: '后句用 but 转折，说明"没有一样花了很多钱"，用 none of。' },
        { n: 17, o: ['take', 'avoid', 'refuse'], a: 0, e: 'take the chance 抓住机会；avoid、refuse 与语境相反。' },
        { n: 18, o: ['money', 'stories', 'luggage'], a: 1, e: '与前文"装满故事的笔记本"呼应，带回的是故事。' },
        { n: 19, o: ['that', 'which', 'what'], a: 2, e: '介词 of 后的宾语从句缺 expect 的宾语，用 what。' },
        { n: 20, o: ['why', 'how', 'because'], a: 0, e: 'That is why... 那就是……的原因，为固定句型。' }
      ]
    }
  ];

})(window);
