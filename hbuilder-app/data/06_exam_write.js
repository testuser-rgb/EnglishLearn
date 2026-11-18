/* ============================================================
 * data/06_exam_write.js —— 题型四：句子汉译英 / 题型五：短文写作
 * 汉译英：5 句 / 每题 3 分 / 共 15 分，参考答案 + 考点（主观题，考生自评）
 * 短文写作：1 篇 / 15 分 / ≥120 词 / 提纲式，参考范文（主观题，考生自评）
 * 全部自编，未使用任何真题原句。
 * ============================================================ */
(function (root) {
  'use strict';
  var APP = root.APP = root.APP || {};
  var data = APP.data = APP.data || {};

  data.TRANS = [
    /* ---------------- 模拟卷一 ---------------- */
    { p: 1, no: 1, cn: '他不可能已经完成了那份报告。',
      ref: "He can't have finished that report.",
      point: '情态动词表否定推测：can\'t have done（对过去的否定推测）；不能写成 mustn\'t have done。' },
    { p: 1, no: 2, cn: '这个问题正在会上讨论。',
      ref: 'This problem is being discussed at the meeting.',
      point: '现在进行时的被动语态：is/are being done；discuss 是及物动词，须带宾语或变被动。' },
    { p: 1, no: 3, cn: '无论多困难，我们都不应该放弃。',
      ref: 'No matter how difficult it is, we should never give up.',
      point: 'no matter how + 形容词 + 主谓 引导让步状语从句；也可写 However difficult it is。' },
    { p: 1, no: 4, cn: '我到达车站时，火车已经开走了。',
      ref: 'When I got to the station, the train had already left.',
      point: '过去完成时 had done 表示"过去的过去"；already 常与完成时连用。' },
    { p: 1, no: 5, cn: '他建议我们早点出发。',
      ref: 'He suggested that we (should) start early.',
      point: 'suggest 表建议，从句用虚拟语气 (should) + 动词原形；不可写 suggested us to start。' },

    /* ---------------- 模拟卷二 ---------------- */
    { p: 2, no: 1, cn: '这座桥是十年前建造的。',
      ref: 'This bridge was built ten years ago.',
      point: '一般过去时的被动语态 was/were done；build 的过去分词是 built。' },
    { p: 2, no: 2, cn: '直到深夜他才写完论文。',
      ref: "He didn't finish his paper until late at night. / It was not until late at night that he finished his paper.",
      point: 'not... until 结构；若用强调句则为 It was not until... that...，注意 that 不能换成 when。' },
    { p: 2, no: 3, cn: '我想知道你是否能帮我一个忙。',
      ref: 'I wonder if you could do me a favor.',
      point: '宾语从句用 if/whether 引导；could 表委婉请求；do sb a favor 为固定搭配。' },
    { p: 2, no: 4, cn: '听到这个消息，他们都激动得说不出话来。',
      ref: 'Hearing the news, they were too excited to say a word.',
      point: '现在分词作时间状语（主语 they 与 hear 是主动关系）；too... to... 表示"太……而不能"。' },
    { p: 2, no: 5, cn: '他宁愿待在家里也不愿去看那部电影。',
      ref: 'He would rather stay at home than go to see that film.',
      point: 'would rather do A than do B，前后都用动词原形；不能写成 would rather to do。' },

    /* ---------------- 模拟卷三 ---------------- */
    { p: 3, no: 1, cn: '这本书值得一读。',
      ref: 'This book is worth reading.',
      point: 'be worth doing 用主动形式表被动；也可写 This book is worthy to be read。' },
    { p: 3, no: 2, cn: '据说他已经去了上海。',
      ref: 'It is said that he has gone to Shanghai.',
      point: 'It is said that... 固定句型；have gone to 表示"已去（未回）"，与 have been to 区分。' },
    { p: 3, no: 3, cn: '如果我是你，我会接受这个建议。',
      ref: 'If I were you, I would accept the suggestion.',
      point: '与现在事实相反的虚拟语气：if + 过去式（be 用 were），主句 would + 动词原形。' },
    { p: 3, no: 4, cn: '她花了两个小时才完成这项任务。',
      ref: 'It took her two hours to finish the task.',
      point: 'It takes sb some time to do sth 句型；若以人作主语则为 She spent two hours finishing the task。' },
    { p: 3, no: 5, cn: '不管天气如何，会议都将按时举行。',
      ref: 'Whatever the weather is like, the meeting will be held on time.',
      point: 'whatever 引导让步状语从句；主句用将来时被动 will be held；on time 按时。' }
  ];

  data.WRITING = [
    /* ---------------- 模拟卷一 ---------------- */
    { p: 1,
      topic: 'On Keeping a Healthy Lifestyle',
      cn: '健康的生活方式',
      outline: ['健康生活方式的重要性', '你在日常生活中如何保持健康', '你对同龄人的建议'],
      words: 120,
      ref: [
        'Health is the foundation of everything we do. Without it, wealth and success mean very little. Yet many students, including me, used to think that health could wait until we were older.',
        'In my daily life I try to keep three simple habits. First, I go to bed before eleven o\'clock, because I have learned that sleep improves my memory far more than coffee does. Second, I walk or cycle for at least thirty minutes a day instead of taking a bus for short trips. Third, I eat fruit with every meal and drink water rather than sweet drinks.',
        'My advice to others is to start small. Nobody changes his whole life in a week. Choose one habit, keep it for a month, and then add another. Health is not built by a single decision, but by hundreds of small ones.'
      ]
    },

    /* ---------------- 模拟卷二 ---------------- */
    { p: 2,
      topic: 'On Choosing a Career',
      cn: '谈职业选择',
      outline: ['人们选择职业时会考虑哪些因素', '你认为最重要的因素是什么', '说明你的理由'],
      words: 120,
      ref: [
        'Choosing a career is one of the most important decisions a young person has to make. Some people are attracted by a high salary, others by a stable job, and still others by the chance to travel or to become famous.',
        'In my opinion, the most important factor is whether the work suits your interests and abilities. A job that pays well but makes you unhappy every morning is difficult to keep for thirty years. On the other hand, work that you genuinely enjoy gives you energy instead of taking it away.',
        'Of course, money cannot be ignored. Nobody can live on enthusiasm alone, and a career should allow you to support yourself and your family. But interest and money are not opposites. When people are good at what they do and enjoy doing it, they usually become valuable, and value is eventually rewarded.',
        'Therefore, I would advise young people to know themselves first, and then choose a career that fits.'
      ]
    },

    /* ---------------- 模拟卷三 ---------------- */
    { p: 3,
      topic: 'On Reading Classics',
      cn: '谈阅读经典',
      outline: ['经典作品的价值', '现在很多人不读经典的原因', '你的建议'],
      words: 120,
      ref: [
        'Classics are books that have been read and loved by generations. They deal with questions that never grow old: love, friendship, fear, ambition and the search for meaning.',
        'Yet fewer and fewer people read them today. One reason is time. Students are busy with exams and workers with deadlines, and a long novel feels like a luxury. Another reason is that classics are often described as difficult, so people give up after a few pages. Films and short videos offer easier entertainment, and they require no effort at all.',
        'I would suggest starting with a short classic rather than a famous long one. Read ten pages a day, and do not worry about the words you do not know. In time, the language becomes easier and the story takes hold.',
        'A classic is not a test to pass. It is a conversation with someone who lived long ago and yet understood something about us.'
      ]
    }
  ];

})(window);
