/* ============================================================
 * data/05_exam_reading.js —— 题型三：阅读理解（四选一）
 * 官方口径：每套 2 篇 / 每篇 4 题 / 共 8 题 / 每题 2.5 分 / 共 20 分
 * 全部自编短文（约 250–330 词），考点：主旨、细节、推理、词义指代、NOT TRUE。
 * 字段：p=卷号 idx=篇序 title=标题 text=段落数组 qs=[{q, o:[四选项], a, e}]
 * ============================================================ */
(function (root) {
  'use strict';
  var APP = root.APP = root.APP || {};
  var data = APP.data = APP.data || {};

  data.READING = [
    /* ================= 模拟卷一 · 篇一 ================= */
    {
      p: 1, idx: 1,
      title: 'A Summer at the Community Centre',
      text: [
        'When Li Ming was sixteen, he spent his summer holiday volunteering at a small community centre in his hometown. His job was simple: he helped elderly people fill in forms, read letters from their children, and sometimes just listened to them talk.',
        'At first he was not sure he was doing anything useful. The work seemed too easy, and he often felt bored. One afternoon, however, an old woman named Aunt Wang asked him to read a letter from her son, who worked in another city. After listening to the letter, she began to cry. Li Ming did not know what to do. He sat beside her without speaking for a long time. When she finally looked up, she said, "Thank you. I have not had anyone to talk to for a month."',
        'That sentence stayed with Li Ming. He began to spend more time at the centre, and he started a small reading group for the elderly. Seven people came to the first meeting. By the end of the summer, there were twenty.',
        'Li Ming\'s parents were surprised. They had expected him to spend his holiday playing computer games, as he had done in previous years. His mother asked him why he kept going. "At school, everything is about marks," he said. "Here, nobody asks about marks. People are just glad that you came."',
        'Now Li Ming is a university student. He still volunteers at weekends, and last year he persuaded twelve of his classmates to join him. He says the experience changed the way he thinks about success. "I used to think success meant beating others," he says. "Now I think it means being useful to someone."'
      ],
      qs: [
        { q: 'What was Li Ming\'s main job at the community centre?',
          o: ['Teaching children to read', 'Helping elderly people with their daily needs', 'Organizing sports activities for teenagers', 'Repairing houses for old people'], a: 1,
          e: '第一段明确列出：帮老人填表、读信、听他们说话，都属于"帮助老人处理日常需要"；文中未提教小孩、体育或修房子。' },
        { q: 'How did Li Ming feel about the work at the beginning?',
          o: ['He thought it was too easy and often felt bored', 'He was afraid of the elderly people', 'He was sure he was doing something useful', 'He wanted to leave the centre immediately'], a: 0,
          e: '第二段："The work seemed too easy, and he often felt bored."——起初他觉得工作太简单、常常无聊，也不确定自己是否有用。' },
        { q: 'What can we learn from the last paragraph?',
          o: ['Li Ming has stopped volunteering', 'Li Ming failed to persuade his classmates', 'Li Ming\'s understanding of success has changed', 'Li Ming\'s parents still do not support him'], a: 2,
          e: '末段原文："the experience changed the way he thinks about success"，并由"以前认为成功是胜过别人"转为"对别人有用"，故选 C。' },
        { q: 'Which of the following would be the best title for the passage?',
          o: ['How to Fill in Forms', 'A Letter from a Son', 'A Summer Holiday Game', 'The Value of Being Useful'], a: 3,
          e: '全文主线是从"觉得没用"到"发现自己对别人有用"，并以此重新定义成功，标题应体现"有用的价值"。' }
      ]
    },

    /* ================= 模拟卷一 · 篇二 ================= */
    {
      p: 1, idx: 2,
      title: 'Sleep and Memory',
      text: [
        'Students often believe that staying up late is a sign of hard work. They drink coffee, keep their books open until two in the morning, and then wonder why they cannot remember anything during the exam.',
        'Research on sleep and memory suggests a different picture. During sleep, the brain does not simply rest. It sorts through the information collected during the day and decides what to keep. Experiments with students have shown that those who sleep for eight hours after studying remember about twenty percent more than those who study the same material for the same time but then stay awake.',
        'This does not mean that sleep can replace study. You cannot learn a chapter by putting it under your pillow. But it does mean that cutting sleep to gain study time may be a poor bargain. If you lose two hours of sleep, you may gain two hours of reading, but you lose the very process that would have fixed that reading in your memory.',
        'There is also a practical point. A tired brain works slowly. When you are short of sleep, your attention drops and you make careless mistakes. Many students who fail an exam have not misunderstood the material; they have simply read the question too quickly.',
        'The good news is that better sleep is not difficult to arrange. Going to bed at the same time each night helps the body settle into a rhythm. Avoiding screens for half an hour before bed is also useful, because the light from a phone or laptop tells the brain that it is still daytime. And a short walk in the afternoon can improve the quality of sleep at night.',
        'Some students say they simply cannot sleep before an exam. For them, the advice is not to lie in bed worrying. Getting up, reading something light for fifteen minutes, and returning to bed is often better than lying awake for hours. The aim is to sleep enough, not to sleep perfectly.'
      ],
      qs: [
        { q: 'According to the passage, what does the brain do during sleep?',
          o: ['It stops working completely', 'It sorts the information collected during the day', 'It forgets everything learned before', 'It prepares the body for physical exercise'], a: 1,
          e: '第二段："It sorts through the information collected during the day and decides what to keep."——睡眠中大脑整理白天收集的信息。' },
        { q: 'What did the experiments with students show?',
          o: ['Students who slept remembered more than those who stayed awake', 'Students who stayed up late always got better marks', 'Sleep can completely replace study', 'Coffee helped students remember more'], a: 0,
          e: '第二段实验结论：学习后睡 8 小时的学生比同样学习但不睡的多记住约 20%。' },
        { q: 'The phrase "a poor bargain" in Paragraph 3 probably means ______.',
          o: ['a very good choice', 'an expensive book', 'a deal that costs more than it gains', 'a difficult question to answer'], a: 2,
          e: '后文解释：少睡两小时换来两小时阅读，却失去了把内容固定进记忆的过程——得不偿失，即"代价大于收益的交易"。' },
        { q: 'Which of the following is NOT mentioned as a way to sleep better?',
          o: ['Going to bed at the same time each night', 'Avoiding screens for half an hour before bed', 'Taking a short walk in the afternoon', 'Drinking a cup of coffee before going to bed'], a: 3,
          e: '第五段列出三项建议：固定时间睡、睡前半小时不看屏幕、下午短时散步。咖啡是首段提到的"熬夜工具"，不是助眠建议。' }
      ]
    },

    /* ================= 模拟卷二 · 篇一 ================= */
    {
      p: 2, idx: 1,
      title: 'A Library That Changed',
      text: [
        'Forty years ago, the library in my town was a quiet building with long wooden tables and a strict rule about silence. If you spoke above a whisper, the librarian would look at you over her glasses, and everyone would turn around. I remember being afraid of that building when I was a child.',
        'Today the same building looks very different. There is a coffee corner near the entrance, a small play area for children, and comfortable chairs instead of hard benches. People talk, laugh and even eat. The old librarian would have been shocked.',
        'This change was not an accident. Ten years ago, the town council discovered that fewer and fewer people were borrowing books. Young people, in particular, seemed to prefer reading on their phones. The library was in danger of being closed.',
        'The council decided to try something new. They hired a young director who had worked in a large city library. Her first decision was to remove half of the shelves and replace them with meeting rooms, a small computer area and a section for teenagers. Many local people were angry. "A library without books is not a library," one of them wrote in the local newspaper.',
        'But the numbers told a different story. Visits rose by forty percent in the first year. The number of books borrowed also rose, because people who came for a meeting or a coffee often left with a book. The director explains: "We stopped thinking of ourselves as a place that stores books and started thinking of ourselves as a place where people gather. Books are still at the centre, but people come first."',
        'Not everyone agrees. Some older readers miss the silence, and the local newspaper still receives letters complaining about the noise. The director listens to these complaints, but she does not plan to change direction. "A library that nobody visits cannot serve anybody," she says.',
        'Last month I took my daughter to the library for the first time. She ran straight to the play area, and I sat down with a novel. Nobody looked at us over their glasses. It was not the library I remembered, and I was glad.'
      ],
      qs: [
        { q: 'What was the library like forty years ago?',
          o: ['It had a coffee corner near the entrance', 'It was quiet and strict about silence', 'It was full of computers and meeting rooms', 'It had a play area for children'], a: 1,
          e: '第一段描述：长木桌、严格保持安静、说话大声会被馆员瞪——说明当年安静而严格。其他三项都是现在的样子。' },
        { q: 'Why did the town council decide to change the library?',
          o: ['Too few people were borrowing books', 'The building was too old to repair', 'There were too many shelves in it', 'The director asked for a higher salary'], a: 0,
          e: '第三段：议会发现借书的人越来越少，年轻人更愿意在手机上看书，图书馆面临关闭。' },
        { q: 'How did many local people first react to the director\'s decision?',
          o: ['They supported it warmly', 'They did not notice it at all', 'They were angry about it', 'They asked for more coffee corners'], a: 2,
          e: '第四段："Many local people were angry." 还有人投书报纸说"没有书的图书馆不是图书馆"。' },
        { q: 'What does the director believe about a library?',
          o: ['It should be silent at all times', 'Books are no longer important', 'Old readers should stay at home', 'It should put people first'], a: 3,
          e: '第五段她的原话："Books are still at the centre, but people come first."——书仍在中心，但人优先。' }
      ]
    },

    /* ================= 模拟卷二 · 篇二 ================= */
    {
      p: 2, idx: 2,
      title: 'The Problem with Plastic',
      text: [
        'Every year, the world produces more than three hundred million tons of plastic. About half of it is used only once: bags, bottles, straws and packaging. Some of this waste is burned, some is buried, and a large amount ends up in the sea.',
        'The problem with plastic is that it does not disappear. A plastic bottle thrown into the sea may break into smaller and smaller pieces, but the material itself remains for hundreds of years. These small pieces, known as microplastics, are now found in the stomachs of fish, in drinking water and even in human blood.',
        'Scientists are still studying the effects on human health, but the effects on animals are already clear. Seabirds eat plastic pieces because they look like food, and then starve with full stomachs. Turtles mistake plastic bags for jellyfish. Whales have been found with dozens of plastic bags inside them.',
        'Some countries have taken strong action. Rwanda banned plastic bags in 2008, and visitors are searched at the airport for them. Kenya introduced a similar ban in 2017, with heavy fines for shops that continue to give out bags. In Europe, a number of single-use items, such as straws and cutlery, have been forbidden since 2021.',
        'Bans alone, however, cannot solve the problem. Plastic is cheap, light and strong, and it has real advantages in medicine, transport and food safety. A blanket ban on all plastic would do more harm than good. What is needed, many experts argue, is a change in design: products should be made so that they can be repaired, reused or easily recycled.',
        'Individuals also have a part to play. Refusing a plastic bag, carrying a water bottle and choosing products with less packaging are small actions, but they add up. More importantly, they send a signal to shops and governments that customers care.',
        'The problem is not plastic itself, but the way we use it. A material that lasts for hundreds of years should not be used for a few minutes and then thrown away.'
      ],
      qs: [
        { q: 'How much of the world\'s plastic is used only once?',
          o: ['About half of it', 'About ten percent of it', 'All of it', 'None of it'], a: 0,
          e: '第一段："About half of it is used only once"——约一半是一次性使用。' },
        { q: 'What happens to plastic that gets into the sea?',
          o: ['It disappears completely within a year', 'It breaks into small pieces that remain for centuries', 'It turns into food for fish', 'It is cleaned up by machines'], a: 1,
          e: '第二段：塑料瓶会碎成越来越小的颗粒，但材料本身会留存数百年，形成微塑料。' },
        { q: 'Why do some experts oppose a blanket ban on all plastic?',
          o: ['Plastic is too expensive for ordinary people', 'Plastic has real advantages in some fields', 'Bans are illegal in most countries', 'Nobody would obey such a ban'], a: 1,
          e: '第五段：塑料便宜、轻、结实，在医药、运输、食品安全上有真实优势，"全面禁用"弊大于利。' },
        { q: 'What is the main idea of the last paragraph?',
          o: ['Plastic should be produced in larger amounts', 'Individuals can do nothing about the problem', 'The problem lies in how we use plastic rather than in plastic itself', 'Governments should stop all recycling projects'], a: 2,
          e: '末段首句点题："The problem is not plastic itself, but the way we use it."——问题在于使用方式，而非塑料本身。' }
      ]
    },

    /* ================= 模拟卷三 · 篇一 ================= */
    {
      p: 3, idx: 1,
      title: 'Give the Wood Time',
      text: [
        'My grandfather was a carpenter. He worked in a small workshop behind our house for over fifty years, making tables, chairs and cupboards for the people of our town. I spent many afternoons there as a boy, watching him work.',
        'He had a rule that I did not understand at first. He never used an electric saw, although he could easily have bought one. When I asked him why, he said that a machine cuts too fast. "You must give the wood time to tell you which way it wants to go," he explained. At the time I thought this was a strange idea. Wood, after all, does not talk.',
        'When I was fifteen, he let me make a small stool by myself. I cut the legs too short, and the whole thing was uneven. I wanted to throw it away, but he stopped me. He showed me how to cut a thin piece of wood and fit it under one leg. "A good carpenter is not someone who never makes mistakes," he said. "He is someone who knows how to fix them."',
        'He died when I was twenty-two. By then I had moved to the city and found a job in an office. For years I hardly thought about the workshop. Then, one weekend, my daughter asked me to help her build a birdhouse for a school project. I bought some wood and borrowed a saw, and as I worked I heard my grandfather\'s voice: give the wood time.',
        'The birdhouse was not beautiful. One side was slightly longer than the other, and the roof did not fit perfectly. But my daughter was proud of it, and she hung it in the garden. Two weeks later, a pair of birds moved in.',
        'I do not think I will ever be a carpenter. But I have learned something from that afternoon. My grandfather was not really talking about wood. He was talking about patience, and about the difference between finishing something quickly and finishing it well. In a world that is always in a hurry, that is a lesson worth keeping.'
      ],
      qs: [
        { q: 'Why did the grandfather refuse to use an electric saw?',
          o: ['He could not afford to buy one', 'He thought a machine cuts too fast', 'He did not know how to use it', 'Electric tools were forbidden in his town'], a: 1,
          e: '第二段："he said that a machine cuts too fast"，并说要给木头时间告诉你想往哪边走。' },
        { q: 'What did the grandfather do when the writer\'s stool was uneven?',
          o: ['He threw it away at once', 'He made a new one by himself', 'He showed him how to fix it with a thin piece of wood', 'He refused to teach him any more'], a: 2,
          e: '第三段：他割了一片薄木片垫在一条腿下面，并说"好木匠不是从不犯错，而是知道怎么修"。' },
        { q: 'What does "give the wood time" really mean in the passage?',
          o: ['Wait until the wood is completely dry', 'Work with patience instead of hurrying', 'Buy better quality wood', 'Let someone else do the work'], a: 1,
          e: '末段点明：祖父谈的其实不是木头，而是耐心，是"快速做完"与"做好"的区别。' },
        { q: 'What is the writer\'s main point in the last paragraph?',
          o: ['He plans to become a carpenter', 'The birdhouse turned out to be perfect', 'Patience and doing things well matter more than speed', 'Old tools are always better than new ones'], a: 2,
          e: '末段结论：在一个总在赶时间的世界里，耐心与做好一件事的态度值得保留。' }
      ]
    },

    /* ================= 模拟卷三 · 篇二 ================= */
    {
      p: 3, idx: 2,
      title: 'Why Cities Need Green Space',
      text: [
        'More than half of the world\'s population now lives in cities, and the number is rising. As cities grow, one question becomes increasingly important: how much space should be given to parks and trees?',
        'Supporters of green space point to a growing body of evidence. Studies in several countries have found that people who live near parks are more likely to walk and exercise, and less likely to suffer from stress. Hospital patients with a view of trees, according to one well-known study, recover faster than those who look at a brick wall. Children who play in green areas are reported to concentrate better at school.',
        'Green spaces also help with a problem that cities know well: heat. Concrete and asphalt absorb sunlight during the day and release it at night, which is why city centres can be several degrees warmer than the countryside. Trees provide shade and cool the air as water evaporates from their leaves. A single large tree can do the work of several air conditioners.',
        'There is another benefit that is less obvious. When rain falls heavily, soil and plants absorb water slowly instead of letting it run straight into drains. This reduces the risk of flooding. Some cities have built "rain gardens" — small planted areas designed to hold water during storms — and found them cheaper than enlarging underground pipes.',
        'Opponents argue that land in cities is too valuable to be used for parks. Every hectare given to trees, they say, is a hectare that cannot hold homes or offices. In cities where housing is already expensive, this is a serious point.',
        'The answer is probably not to choose between green space and buildings, but to combine them. Green roofs, planted walls and small squares between apartment blocks provide many of the benefits of a park without taking up space at ground level. Some new housing projects in Europe are designed so that no resident is more than three minutes\' walk from a tree.',
        'Cities are not temporary. The decisions made today about where to plant trees and where to build will shape life for a hundred years.'
      ],
      qs: [
        { q: 'What did the well-known study of hospital patients find?',
          o: ['Patients with a view of trees recover faster', 'Patients prefer looking at brick walls', 'Green space has no effect on health', 'Patients who exercise recover more slowly'], a: 0,
          e: '第二段：能看见树的病人比面对砖墙的病人恢复得更快。' },
        { q: 'How do trees help reduce heat in cities?',
          o: ['They absorb concrete and asphalt', 'They provide shade and cool the air through evaporation', 'They reflect sunlight back into the sky', 'They stop people from driving cars'], a: 1,
          e: '第三段：树木提供树荫，叶片水分蒸发使空气变凉，一棵大树的作用相当于几台空调。' },
        { q: 'What is a "rain garden" designed to do?',
          o: ['Grow vegetables for the city', 'Enlarge the underground pipes', 'Hold water during storms', 'Provide shade in summer'], a: 2,
          e: '第四段：rain garden 是"为暴雨时蓄水而设计的小块绿地"，而且比扩大地下管道更便宜。' },
        { q: 'What is the writer\'s conclusion about green space and buildings?',
          o: ['Cities should stop building houses', 'Parks are a waste of valuable land', 'Green space and buildings can be combined', 'Only rich cities can afford trees'], a: 2,
          e: '第六段："not to choose between green space and buildings, but to combine them."——不必二选一，可以结合。' }
      ]
    }
  ];

})(window);
