/* 完形填空（含选项、答案、解析）与超纲词提示
   本文件由 学位英语_55天冲刺台.html 原样抽出，表达式体未作任何改动。
   修改题目或答案请只改这里；页面渲染逻辑在 HTML 内，不存题目。
   校验：node data/verify.js
   包含：CLOZE, CGLOSS
*/

const CLOZE=[
{d:1,k:'c1',t:'The Lost Wallet',zh:'一名学生在公交车上捡到钱包，里面有给儿子买药的钱。他等到失主、拒收谢礼。有人说他傻，失主回信说钱包里装的不只是钱。',w:[],p:`On a cold morning, a student found a wallet on the bus. Inside were a card, some money and a photo of a small child. He could have kept the money, {{1}} he did not. He called the number on the card and waited an hour. When the owner arrived, she began to cry: the money was for her son's medicine, and she had {{2}} it from her mother that morning.

The student asked for no reward. He said only that a stranger had once helped him in the {{3}} way. A small act of honesty does not {{4}} the world, he said, but it keeps a little trust alive. Trust, he added, is a {{5}} that a city cannot buy.

The story was soon on the local news. Some people called the student foolish. {{6}}, a few said he was too honest for his own good. {{7}}, the owner answered them in a short letter: a wallet is not only money; it carries the small proofs of a life.

At the end of the week the bus company gave him a book. He {{8}} it with a smile. For years the photo of the child would {{9}} him of that cold morning: a small test, passed quietly. And a pattern began to {{10}} in the weeks that followed — three more passengers returned things they had found.`,g:[
{o:['however','therefore','besides','otherwise'],a:0,e:'前句说他本可以把钱留下，后句说他没这么做，两句是转折关系，选 however。therefore 表因果，besides 表追加，otherwise 表"否则"，都不合。'},
{o:['received','accepted','refused','expected'],a:0,e:'receive 指"收到"这个客观动作，钱是母亲给她的，她收到了，选 received。accept 强调"主观接受、同意"，此处不涉及是否愿意收；refused 意思相反；expected 是"期待"。'},
{o:['same','exact','steady','total'],a:0,e:'in the same way 是固定搭配，"以同样的方式"。exact 指"精确的"，steady 指"稳定的"，total 指"总的"，都不能修饰 way 表达这个意思。'},
{o:['change','replace','eliminate','reflect'],a:0,e:'句意：一个小小的诚实之举不会"改变"世界。change the world 是固定说法。replace 是"替换"，eliminate 是"消除"，reflect 是"反映"，都不能与 world 搭配表达"改变"。'},
{o:['resource','result','research','record'],a:0,e:'句意：信任是一座城市买不到的"资源"。resource 指可依靠的东西，与 cannot buy 呼应。result（结果）、research（研究）、record（记录）都不是"可以拥有、可以匮乏"的东西。'},
{o:['Besides','However','Therefore','Otherwise'],a:0,e:'前句说有人骂他傻，后句说还有一些人说他过于老实——是"再补充一种看法"，用 Besides（此外）。However 表转折，但这里两句方向一致，不是转折。'},
{o:['However','Therefore','Besides','Instead'],a:0,e:'前面是外人的议论，后面是失主自己的回应，方向相反，用 However 表转折。Therefore 表结果，Instead 表"代替做某事"，都不合。'},
{o:['accepted','received','refused','returned'],a:0,e:'这里是"他接受了这本书"。accept 强调主观上收下，与前面拒收谢礼形成对照。received 只讲"收到"这个动作，无法体现"收下"的态度。'},
{o:['remind','reflect','respond','represent'],a:0,e:'remind sb of sth 是固定搭配，"使某人想起某事"，主语是那张照片。reflect 是"反映"（不接 of sb），respond 是"回应"，represent 是"代表"。'},
{o:['emerge','evolve','elect','eliminate'],a:0,e:'句意：随后几周里一种模式开始"显现"。emerge 指从隐到显，正合语意。evolve 指逐渐演化（强调变化过程），elect 是"选举"，eliminate 是"消除"。'}
]},

{d:6,k:'c2',t:'A Letter to the Editor',zh:'一位居民投书报社：街道撤掉了唯一的护学岗，孩子独自穿四车道。信刊登后有家长自愿轮值，城市承诺下学期恢复。作者说，指出问题并给出办法的抱怨，最难被无视。',w:["have access to"],p:`Dear Editor,

Last month our street lost its only crossing guard. The school says it has no money to {{1}} him, and the city says the road belongs to the province. For two weeks, children crossed four lanes of traffic alone. Nobody was hurt, but that was luck: the city had taken no {{2}} at all.

I am not writing to {{3}} anyone. I am writing because a small danger is {{4}} to become a large one when everyone waits for someone else to speak. The guard's wage was smaller than one window of the new office building across the road.

Since the letter appeared, two parents have offered to {{5}} turns at the crossing each morning, and a neighbor who had never spoken to me knocked on my door to ask what she could do. It is not a perfect answer, {{6}} it is better than waiting for a budget that may never come. That, I think, is how a street becomes a place people care about.

The city has now promised a guard by next term. It has not {{7}} to me, and I did not ask it to. {{8}}, I have learned something: a complaint that names a problem and offers a {{9}} is much harder to ignore than one that only {{10}}.`,g:[
{o:['replace','receive','represent','remind'],a:0,e:'句意：学校说没钱"另找一个人顶替他"。replace 指"替换、接替某人的位置"，正合语意。receive（收到）、represent（代表）、remind（提醒）都不能表达"接替岗位"。'},
{o:['measures','results','resources','researches'],a:0,e:'take measures 是固定搭配，"采取措施"。句意：城市一点措施都没采取。results（结果）、resources（资源）不与 take 搭配表达这个意思；researches 一般不用复数。'},
{o:['insult','offend','protest','argue'],a:0,e:'句意：我写这封信不是为了"侮辱"谁。insult 指用言语伤人，与后文"我只想说明危险"形成对照。protest（抗议）、argue（争论）是行为方式，offend 是"冒犯"的结果，都不如 insult 贴合"写信用语"的语境。'},
{o:['likely','able','willing','bound'],a:0,e:'be likely to do 表示"很可能发生"，句意：小危险在无人出声时很可能变成大危险。be able to 是"有能力"，be willing to 是"愿意"，be bound to 是"必定"，三者都不表示"可能性大"。'},
{o:['take','make','give','do'],a:0,e:'take turns 是固定搭配，"轮流"。句意：两位家长愿意每天早晨轮流在路口值守。make / give / do 都不与 turns 构成这个意思。'},
{o:['but','so','for','or'],a:0,e:'前句"这不是完美的办法"，后句"总比等一笔可能永远不来的预算好"，意思相反，用 but。'},
{o:['apologized','argued','protested','insulted'],a:0,e:'句意：城市承诺下学期派护学岗，但并没有向我"道歉"，我也没要求它道歉。apologize to sb 是固定搭配。argue / protest 是争辩、抗议，与"承诺"这一让步不构成对照。'},
{o:['However','Therefore','Besides','Otherwise'],a:0,e:'前句说城市没有回复、自己也没要求回复，后句说不过自己学到了点东西，是转折，用 However。'},
{o:['solution','result','measure','reason'],a:0,e:'句意：指出问题并给出"解决办法"的抱怨更难被无视。solution 与 problem 配对，是 and 前后并列的两个成分：names a problem / offers a solution。measure 是"措施"（通常由政府采取），与 a complaint offers 搭配不如 solution 自然。'},
{o:['complains','argues','apologizes','protests'],a:0,e:'句意：……比只会"发牢骚"的抱怨难无视得多。complain 指只表达不满而不给办法，与前半句"指出问题并给出办法"形成对照。argue 是"论证"，本身中性甚至正面，不能构成对照。'}
]},

{d:11,k:'c3',t:'Why We Forget',zh:'记忆不是箱子，遗忘是机制的一部分。只读过一遍约等于白读，因为没和已知的东西连上；睡眠会整理白天的经验。方法不是更用功，而是换方式：自测、分散、睡觉。',w:["research", "matter", "experience", "in addition to", "in terms of", "in charge of", "in favor of", "in spite of", "in case of", "in the long run", "in general", "in particular", "in other words", "in contrast to", "in response to", "in advance"],p:`Most students believe that memory is a box: you put something in and it stays there. Research on the brain tells a different story. Forgetting is not a failure of the box; it is part of the {{1}}. A memory that is never used begins to {{2}}, like a path through grass that closes when nobody walks it.

This is why reading a chapter once is close to {{3}}. The words pass through, but nothing {{4}} them to anything you already know. The mind keeps what it can connect and drops what stands alone. {{5}}, a fact tied to a story, a picture or an argument is far easier to {{6}} a month later.

Sleep matters as much as study. During deep sleep the brain {{7}} the day's experience and moves the useful parts into long-term store. Students who study all night often remember less than those who stop at eleven and sleep. The night is not empty time; it is when the {{8}} is finished.

So the advice is not to try harder but to study differently: test yourself instead of {{9}} the page again, space the sessions out, and sleep. None of this is a trick; it is simply how the machine works. {{10}} you work with it, you will keep losing the same hour twice.`,g:[
{o:['process','problem','result','reason'],a:0,e:'句意：遗忘不是箱子的故障，而是这个"过程"的一部分。process 指有阶段的运作机制，与后半句"像没人走的小路会合上"呼应。problem 带负面评价，result 指结果，reason 指原因，都不表示"机制的一环"。'},
{o:['decline','reduce','eliminate','replace'],a:0,e:'句意：从不使用的记忆会开始"衰退"。decline 是不及物动词，表示自身逐渐变弱，正合语意。reduce 是及物动词，要带宾语；eliminate 是"彻底消除"，程度过重；replace 是"替换"。'},
{o:['useless','harmful','endless','careless'],a:0,e:'句意：这就是为什么把一章只读一遍近似于"没用"。下一句"词句过去了，却没跟任何已知的东西连上"正是在解释无效。harmful（有害）、endless（无休止）、careless（粗心）都不合。'},
{o:['links','joins','ties','unites'],a:0,e:'link A to B 是固定搭配，"把 A 与 B 联系起来"，与前句 connect 同义复现。join 强调"连接成一体"，tie 多指用绳系住或关系紧密，unite 指"联合成一个整体"，都不接 to anything you know 这种搭配。'},
{o:['By contrast','As a result','In addition','For example'],a:0,e:'前句讲"孤立的东西会被丢掉"，后句讲"与故事、图画、论证相连的事实更容易记住"，是正反对比，用 By contrast。As a result 表结果，In addition 表递进，For example 表举例，都不是对比关系。'},
{o:['remember','remind','recognize','reflect'],a:0,e:'句意：……一个月后要"记住"就容易得多。remember 是"记得"，主语是人或动作的承受者。remind 是"提醒（别人）"，recognize 是"认出（当场见到）"，reflect 是"反映"。'},
{o:['reviews','repeats','records','reflects'],a:0,e:'句意：深睡时大脑"回放、整理"白天的经历。review 有"回顾、复核"之义，与后文"把有用的部分移入长期存储"衔接。repeat 是机械重复，record 是"记录"，reflect 是"反映"。'},
{o:['work','job','task','duty'],a:0,e:'句意：夜里正是这项"工作"完成的时候，指上文的整理与转移。work 是不可数名词，可指"进行中的工作过程"。job 指具体职位或一件差事，task 指被分派的任务，duty 指职责，都不指这个持续的过程。'},
{o:['reading','read','to read','having read'],a:0,e:'instead of 是介词短语，后面接动名词，所以用 reading。这是 instead of + doing 的固定用法，不能用动词原形或不定式。'},
{o:['Unless','If','Because','Although'],a:0,e:'句意："除非"你顺着它的规律来，否则你会把同一个小时丢两次。Unless = if not，正好表达"不这样做就会……"。If 会使句意相反，Because、Although 逻辑不通。'}
]},

{d:16,k:'c4',t:'The Price of Fast Delivery',zh:'次日达背后是货车、仓库和赶时间的司机。免费配送让人多买，退货又要多跑几趟。有城市限时段进城，商家说生意没掉。作者主张让真实成本可见，而不是让购物变贵。',w:["receive", "expense", "expensive", "depend", "deserve", "online", "pay attention to", "make a difference", "in addition to", "in terms of", "in charge of", "in favor of", "in spite of", "in case of", "in the long run", "in general", "in particular"],p:`Online shops now promise next-day delivery as a normal service, not a special one. Behind that promise is a {{1}} most customers never see: vans, warehouses, and thousands of drivers working against a clock.

The cost is not only in the price on the screen. A van that carries fifty parcels still burns fuel at every stop, and a street that receives twenty vans a day has cleaner air than one that receives two hundred. When delivery is free, we order more than we need. {{2}}, a shirt bought in three sizes and returned in two still travels three times.

Some cities have begun to {{3}} the problem. In one old town, vans may enter the centre only before ten in the morning. Shops there report that business has not fallen; the change simply moved the traffic to a quieter hour. {{4}}, drivers say their day is calmer, because they no longer race through narrow streets at noon.

Critics argue that such rules {{5}} the poor, who depend on cheap delivery more than others do. That is a fair point, and it deserves an honest {{6}}. The aim is not to make shopping expensive but to make its real cost visible. A small fee per parcel, used to pay for cleaner vans, would change behaviour faster than a public {{7}}.

What customers can do is smaller but real. Order once a week instead of four times; choose a {{8}} delivery day when the shop offers one; keep what you buy. None of these acts is {{9}}. Together they decide whether the last kilometre of every purchase is cheap for the buyer and expensive for the street, or the other way {{10}}.`,g:[
{o:['system','symbol','service','signal'],a:0,e:'句意：这个承诺背后是一套顾客看不见的"系统"——货车、仓库、成千上万的司机，正是系统的组成。symbol（象征）、signal（信号）都不由这些具体环节组成；service 指服务本身，与"看不见的组成"搭配不如 system 准确。'},
{o:['For example','However','Therefore','Besides'],a:0,e:'前句说"免运费时我们会买得比需要的多"，后句举买三件退两件的衬衫为例，是举例，用 For example。'},
{o:['confront','conceal','accept','ignore'],a:0,e:'句意：有些城市已经开始"正视"这个问题，后面紧接着就是限时段进城的具体做法。confront 指直面难题，与后文措施一致。conceal（隐瞒）、ignore（无视）与采取行动矛盾；accept 只是"接受现状"，不含处理之意。'},
{o:['Meanwhile','However','Therefore','Otherwise'],a:0,e:'前句讲商店的生意没受影响，后句讲司机觉得日子更轻松，是两个并列的观察角度，用 Meanwhile（与此同时）。'},
{o:['harm','damage','injure','hurt'],a:0,e:'句意：批评者认为这类规定"损害"穷人利益。harm 可指抽象利益的损害，最贴合。damage 多指对物体或名誉的破坏，injure 几乎只用于人身受伤，hurt 多指身体或感情上的疼。'},
{o:['answer','question','reason','result'],a:0,e:'前句说"这是个公允的观点"，后句说"它值得一个诚实的回答"，an honest answer 与 a fair point 对应，指作者接下来要正面回应。'},
{o:['campaign','speech','meeting','lesson'],a:0,e:'句意：按件收取小额费用，改变行为会比一场公共"宣传活动"快。campaign 指有组织的宣传、运动，与"改变行为"的手段相配。speech、meeting、lesson 都是单次活动，量级不够。'},
{o:['slower','faster','nearer','later'],a:0,e:'句意：在商家提供选项时，选一个"更慢"的配送日。全文主张减少配送频次与急迫感，slower 与"不急"一致。faster 与主旨相反；later 指时间更晚，但不含"放慢节奏"的意思；nearer 是距离更近。'},
{o:['difficult','useless','harmful','expensive'],a:0,e:'句意：这些举动没有一个是"难"的——只要一周订一次、选慢一点的配送日、买了就留下。difficult 与"smaller but real"呼应：事小，但不难。useless 会否定整段建议，harmful 与主旨相反，expensive 与"不花钱"矛盾。'},
{o:['round','way','time','hand'],a:0,e:'the other way round 是固定说法，"反过来（也一样）"。句意：要么买家得便宜、街道付代价，要么反过来。'}
]},
{d:21,k:'c5',t:'The Nurse Who Listens',zh:'诊所护士 Ruth 每周留两小时只做一件事：听。不记笔记、不开药方，记住细节，下周再问。有人怀疑这不值，她说"他肯来第二次，就是结果"。',w:["result", "learn", "train", "student", "school", "interview", "manager", "survey", "medicine", "treatment", "patient", "sleep", "job", "detail", "put off", "put up with", "put forward", "to sum up", "what is more", "in addition to", "in terms of", "in charge of", "in favor of", "in spite of", "in case of"],p:`Every Thursday afternoon, the small clinic on Bridge Street closes its doors to new patients. For two hours, one nurse does nothing but talk. Anyone may walk in — a mother with a sleeping baby, an old man who has not spoken to anyone for days, a student who says there is {{1}} wrong but stays anyway.

The nurse, Ruth, does not carry a notebook. She says paper gets in the way: when you write while someone speaks, you stop {{2}}. So she listens, and she remembers. A week later she will ask how the job interview went, or whether the cough is better. Patients say this is the part they {{3}} most — not the medicine, which is usually simple, but the fact that someone kept the details.

The clinic started the hours after a survey {{4}} that half of its visitors came with problems no pill could fix. Loneliness, worry about money, fear of a test — these do not {{5}} on a form. Ruth's manager wanted to measure the results. {{6}}, Ruth refused, gently. 'If a man comes back a second time, that is the result,' she said. 'Numbers will come later, and they will say less than his face does.'

{{7}} everything is soft talk. When Ruth hears something serious, she acts: a call to a housing office, a letter to a school, sometimes an ambulance. She has learned to tell the difference between a bad week and a bad {{8}} — between what time will cure and what needs a plan.

The two hours are now the busiest part of her week. Young doctors come to watch, and at first they {{9}}: where is the treatment? By the second visit most of them stop asking. One put it well: 'We were trained to find what is broken. She was trained to find who is lonely.' The clinic has not {{10}} a cure for anything. What it has done is smaller and harder: it has made sure that nobody in this town has to be ill and invisible at the same time.`,g:[
{o:['nothing','anything','something','everything'],a:0,e:'句意：一个学生说"没什么"毛病，却还是留了下来。say there is nothing wrong 是固定说法。something wrong 会表示"确实有问题"（与前文"却说没事"矛盾），anything 用于疑问否定，everything 语义不通。'},
{o:['listening','writing','reading','speaking'],a:0,e:'stop doing 表示"停下正在做的事"。护士的意思是：边听边写，就等于停止了"倾听"。stop writing 虽语法通，但与上文"纸碍事"的指向不符——问题不在写，而在写导致没在听。'},
{o:['value','refuse','ignore','suffer'],a:0,e:'句意：病人说这是他们最"看重"的部分。value 指认为有价值。refuse（拒绝）、ignore（忽视）与"最看重的部分"矛盾；suffer 是"受苦"，搭配 suffer most 指"最受苦"，语义错位。'},
{o:['revealed','hid','refused','repeated'],a:0,e:'句意：一项调查"揭示"了一半就诊者的问题无药可解。reveal 指让隐藏的事实显现。hid 意思相反；refused 不能以 survey 作主语表此义；repeated 是"重复"。'},
{o:['fit','fill','match','join'],a:0,e:'句意：孤独、缺钱、怕考试——这些"填不进"一张表格。fit on a form 指"在表格上放得下、装得下"。fill 是及物动词（fill the form 填表），match 是"匹配"，join 是"加入"。'},
{o:['Instead','Therefore','Besides','Otherwise'],a:0,e:'前句说经理想量化结果，后句说 Ruth 婉拒并给出另一种回应（"他肯来第二次就是结果"）——用 Instead 表示"取而代之的做法"。Therefore 表因果，Besides 表追加，Otherwise 表"否则"。'},
{o:['Not','No','None','Nothing'],a:0,e:'Not everything 是部分否定："并非一切都是温和的谈话"，与下文她叫救护车、写信给学校一致。No everything、None everything 不合语法；Nothing everything 同样不通。'},
{o:['situation','decision','tradition','condition'],a:0,e:'句意：她会区分糟糕的一周和糟糕的"处境"。situation 指整体处境。decision（决定）、tradition（传统）不合；condition 虽可指状态，但多指健康或具体条件，此处指长期生活处境，situation 更准。'},
{o:['wonder','know','agree','forget'],a:0,e:'后接冒号引出的疑问"治疗在哪里？"，说明年轻医生心里"纳闷"。know 与疑问内容矛盾（他们不知道才对）；agree（同意）、forget（忘记）不合语境。'},
{o:['found','looked','searched','waited'],a:0,e:'find a cure 是固定搭配"找到疗法"。look 和 search 表"寻找"须接 for；waited a cure 不通。注意：句中否定的是"找到"，不是"寻找"。'}
]},

{d:26,k:'c6',t:'A Job That Disappears',zh:'看了一辈子火车的 Idris 被摄像头取代。机器不累、不出错、便宜，事故率也没升。但他知道摄像头不知道的事。女儿说他描述的是感受不是计划。两个都对，所以没有简单结局。',w:["replace", "respect", "learn", "train", "rise", "progress", "course", "platform", "data", "fail", "job", "company", "system", "signal", "sensor", "argue", "pay attention to", "give up", "in addition to", "in terms of", "in charge of", "in favor of", "in spite of", "in case of", "in the long run", "in general"],p:`For thirty years, Idris counted the trains. Twice a day he stood on the platform with a board in his hand, and every driver who passed gave him a flash of lights. The board told him the weather, the delay, the mood of the line. Last month a {{1}} replaced the board, and nobody gives him lights anymore.

The company calls it progress, and in a way it is. The {{2}} never gets tired, never reads a number wrong, and costs less in a year than Idris earned in a month. Three other lines made the same {{3}} two years ago, and the accident rate did not rise at all. It is hard to argue with that.

But numbers are not the whole {{4}}. Idris knew things the camera does not: which driver had not slept, which signal failed twice in the rain, which part of the track froze before the sensors woke up. Twice he stopped a train on his own judgment. The machine would have {{5}} both times — the numbers were, strictly speaking, fine.

What happens to a man like Idris? He is fifty-four. He could {{6}} a course and learn to fix the very cameras that replaced him; the company offers to pay. But he says he is too old to start again, and his {{7}} is not money but meaning. 'I watched the same trains for thirty years,' he says. 'You do not just {{8}} a job. You become the person who does it.'

His daughter sees it differently. She works with data all day and says her father is describing a {{9}}, not a plan: the world will not keep a job open out of respect. {{10}} he learns the new system, someone younger will.

Both of them are right, which is why this story has no easy ending.`,g:[
{o:['camera','screen','robot','recorder'],a:0,e:'下一段明确说 "things the camera does not"，全文的替代设备是摄像头。screen（屏幕）、robot（机器人）、recorder（录音机）都与后文不符。'},
{o:['machine','worker','manager','computer'],a:0,e:'句意：这台"机器"不累、不出错。machine 总括摄像头这类设备。worker 与"取代人工"矛盾，manager 是经理，computer 指电脑本身，此处泛指整套设备。'},
{o:['decision','mistake','promise','deal'],a:0,e:'make a decision 是固定搭配"做决定"。句意：另外三条线路两年前做了同样的决定，事故率没有上升。mistake 与"事故率没升"矛盾，promise（承诺）、deal（交易）不合。'},
{o:['story','number','line','record'],a:0,e:'"numbers are not the whole story" 是惯用表达：数字并不是事情的全部。后文列举摄像头不知道的事，正是"数字之外的另一半"。'},
{o:['agreed','argued','failed','waited'],a:0,e:'句意：机器两次都会"同意"放行——因为严格从数字上看没有问题。与 Idris 凭判断拦车形成对比。argued 意思相反，failed（失灵）与"数字没问题"矛盾，waited 不合。'},
{o:['take','make','give','do'],a:0,e:'take a course 是固定搭配"上课程"。make / give / do 都不与 a course 搭配表达"参加课程"。'},
{o:['problem','answer','reason','result'],a:0,e:'his problem is not money but meaning：他的问题不在于钱，而在于意义。answer 与句意相反，reason 指原因，result 指结果，都不表示"困扰他的事"。'},
{o:['hold','find','lose','do'],a:0,e:'hold a job 是固定搭配，"保住一份工作"。句意：你不只是"做"一份工作，你会变成做这份工作的那个人。find / lose 与后半句"成为那个人"衔接不上；do 与句末 does 重复且弱。'},
{o:['feeling','festival','feature','failure'],a:0,e:'句意：父亲描述的是一种"感受"，不是一个计划——世界不会出于敬意保留一份工作。feeling 与 not a plan 对举。feature（特征）、festival（节日）、failure（失败）都不与"描述感受"呼应。'},
{o:['Until','Unless','Once','While'],a:1,e:'Unless he learns the new system, someone younger will：除非他学会新系统，否则更年轻的人会先顶上。Unless 本身含「如果不…就…」，主句 someone younger will 是省略句。Until 表「到…为止」，与将来时 will 连用在此语义不完整；Once 表「一旦」句意相反；While 表对照。'}
]},

{d:32,k:'c7',t:'The Quiet Classroom',zh:'Okafor 老师发现自己总是几秒内就替学生答题，于是改成提问后沉默等待。起初难受，后来从不举手的学生举了手。"你没有损失时间，只是把重复浪费换成一次性花掉。"',w:["result", "experiment", "learn", "teach", "exam", "student", "teacher", "school", "complain", "waste", "method", "staff", "rather than", "belong", "mention", "failure", "rarely", "instead", "this", "one", "rule", "would", "to sum up", "in addition to", "in terms of", "in charge of", "in favor of", "in spite of", "in case of", "in the long run"],p:`The loudest thing in Room 12 is the clock. Thirty children are reading, and nobody is checking a phone, passing notes, or staring out of the window. Three years ago this room was like any other: the teacher talked, half the class listened, and the other half waited for the bell.

The change did not come from a new rule or a new book. It came from something the teacher, Ms. Okafor, {{1}} one Tuesday: she was answering every question within seconds, and the student who answered was always the same handful. The rest had learned a trick — stay quiet long enough and someone else will do the work. So she tried an experiment: she would ask a question and then say nothing.

The first week was painful. Silence in a classroom feels like failure, and her {{2}} told her to fill it. She did not. She waited ten seconds, twenty, sometimes half a minute. Slowly, hands went up that had never gone up before. The students who needed the longest time often gave the most {{3}} answers — they were not slow, they were careful.

Other teachers came to watch, then complained: it works for her, but we have a syllabus, we have exams, we have no {{4}} to waste. Ms. Okafor's reply is on the wall of the staff room now: 'You do not lose the time. You spend it once instead of {{5}} it every year.'

She has not {{6}} anything magical. The class still has weak students, and some days the silence is just silence. But the room now belongs to both the teacher and the taught. When a visitor asked who was in {{7}}, a boy answered, 'We are. She just starts us.'

The experiment spread to two other schools in the district. Results there are mixed, which Ms. Okafor treats as honest news rather than {{8}}. 'A method is not a machine,' she says. 'You carry it; you do not {{9}} it.' Her own students, asked what changed, rarely mention silence. They say the questions got better. That, she believes, is the real {{10}} of waiting: not quieter children, but better thinking.`,g:[
{o:['noticed','forgot','denied','proved'],a:0,e:'句意：改变来自她某天"注意到"的一件事——她总在几秒内答题。noticed 与后文的具体发现衔接。forgot、denied 与"带来改变"矛盾，proved（证明）后面不接这种偶然观察。'},
{o:['training','budget','syllabus','schedule'],a:0,e:'句意：她的"职业训练"告诉她要把沉默填满。training 指当教师受的训练——控制课堂、不留空白。budget（预算）、syllabus（教学大纲）、schedule（日程）都不是"告诉她该怎么做"的内在声音。'},
{o:['interesting','interested','boring','bored'],a:0,e:'修饰"答案"（物）要用 -ing 形容词：most interesting answers。interested 修饰人（人对……感兴趣）；boring / bored 与前文"他们不是慢，是仔细"矛盾。'},
{o:['time','room','energy','money'],a:0,e:'下文 Okafor 的回答正是关于 time："You do not lose the time."——抱怨的核心是"没时间可以浪费"。room / energy / money 都与她的回答脱节。'},
{o:['repeating','repeat','to repeat','repeated'],a:0,e:'instead of 是介词短语，后接动名词 repeating。"每年重复浪费它"对应"一次性花掉"。动词原形、不定式、过去分词都不能接在 instead of 后。'},
{o:['done','made','found','brought'],a:0,e:'do anything magical：她没"做"出什么神奇的事——下文承认班里仍有差生。make anything magical 不合搭配（make 通常接宾补），found（发现）与"做出"语义不同，brought 需接方向或结果。'},
{o:['charge','control','danger','fashion'],a:0,e:'in charge 是固定搭配，"负责、当家"。学生回答"我们才是，她只是把我们发动起来"，说明课堂属于学生——谁 in charge。in control 虽也通，但 in charge 是更固定的身份表达，且 control 前通常加 the。'},
{o:['failure','victory','record','fiction'],a:0,e:'句意：别校效果参差，她把这当作诚实的消息，而不是"失败"。rather than 前后对照：honest news vs failure。victory（胜利）与"效果参差"矛盾，record、fiction 不与"消息"对照。'},
{o:['copy','carry','create','correct'],a:0,e:'You carry it; you do not copy it：方法要"消化着用"，不能"照搬"。copy 与 carry 形成方法论对照。create（创造）与"不要照搬"不构成对照；correct（纠正）不合。'},
{o:['result','report','review','reason'],a:0,e:'the real result of waiting：等待带来的真正"结果"——不是更安静的孩子，而是更好的思考。report（报告）、review（回顾）不合；reason 是"理由"，不表示产生的效果。'}
]},

{d:38,k:'c8',t:'Why We Sleep Badly',zh:'睡眠像银行：工作日透支、周末偿还，身体却记着更严的账。卧室里全是小偷——手机每一次亮起都偷走一点注意力。多数人不是决定几点睡，而是决定几点停工，而后一个决定一直在往后滑。',w:["learn", "study", "student", "refresh", "matter", "appoint", "screen", "damage", "sleep", "decision", "public", "account", "tired", "prescription", "this", "these", "one", "trouble", "modern", "would", "reaction", "accident", "feeling", "alone", "pay attention to", "put off", "put up with", "to sum up", "be aware of", "be capable of", "be responsible for", "be used to doing", "be subject to"],p:`We treat sleep like a bank we can rob: stay up on workdays, repay at the weekend, repeat. The body keeps a stricter account. One short night slows reaction time; a week of them slows it {{1}} than one glass of wine would, and the person never notices, because the feeling of being used to it is part of the damage.

The modern bedroom is full of small {{2}}. The phone glows, the screen refreshes, and each time it does, a small amount of attention {{3}} away. None of these interruptions matters alone. Together they cost the deep sleep that the brain uses to file the day — which is why people can spend eight hours in bed and still wake up {{4}}.

The usual advice — no screens, fixed hours, a cool room — is correct and incomplete. It misses the main {{5}}: most of us do not decide when to sleep; we decide when to stop working, and the second decision keeps sliding. A to-do list that ends at ten has a way of {{6}} at midnight. The fix is boring: put an end to the day, in writing, and treat it like an appointment that cannot be moved. People who do this report fewer half-awake nights within a {{7}} — not because they learned to sleep, but because they finally gave the night a border.

There is a public side to this private trouble. Tired drivers {{8}} thousands of accidents a year; tired doctors write worse prescriptions; tired students study three hours to earn what one fresh hour would pay. Yet we keep praising the person who answers email at two in the morning, as if lack of sleep were a kind of {{9}}.

It is not. It is a debt, and the body charges interest. The good news is that unlike most debts, this one can be {{10}} in a week of honest, boring, regular nights — and the interest never comes back, as long as you keep paying on time.`,g:[
{o:['more','less','faster','deeper'],a:0,e:'slows it more than...：一周缺觉对反应速度的拖累"大于"一杯酒。slows it less than 意思相反；faster / deeper 修饰 slow 不成立（slow 的程度要用 more）。'},
{o:['thieves','guests','guards','strangers'],a:0,e:'句意：现代卧室里全是小"偷"。下文"每一次亮起都偷走一点注意力"正是比喻的展开。guests（客人）、guards（卫兵）与"偷注意力"矛盾，strangers（陌生人）不带"偷"的含义。'},
{o:['slips','steps','runs','walks'],a:0,e:'slip away 是固定搭配，指"悄悄溜走"。注意力一点点被偷走，用 slip 最贴合"无声无息"。step / run / walk 是自主的走动动作，不能以 attention 作主语表"流失"。'},
{o:['tired','excited','relaxed','pleased'],a:0,e:'句意：在床上躺了八小时，醒来却像只睡了五小时一样"累"。tired 与"深睡不足"直接对应。excited（兴奋）、relaxed（放松）、pleased（满意）都与全文的疲惫主题相反。'},
{o:['part','piece','point','place'],a:0,e:'the main part 指建议遗漏的主要"部分"。后文冒号引出的正是被遗漏的核心——人决定的是何时停工。piece 强调"一块"，point 是"要点"（表观点而非遗漏的组成），place 是地点。'},
{o:['growing','to grow','grown','grow'],a:0,e:'a way of + doing：a way of growing at midnight，"有一种在午夜继续生长的倾向"。of 是介词，后面只能接动名词 growing，不能用原形、不定式或过去分词。'},
{o:['week','minute','season','decade'],a:0,e:'末段说这种债"一周"就能还清，此处 within a week 与之呼应：坚持一周内就能见效。minute（一周之内？过快）、season、decade 都与末段的兑现周期脱节。'},
{o:['cause','cost','carry','catch'],a:0,e:'cause accidents 是固定搭配"引发事故"。cause 指造成结果，主语可以是原因（疲劳司机）。cost 的宾语是钱或代价，carry 是携带，catch 是赶上或感染。'},
{o:['honor','humour','hunger','habit'],a:0,e:'句意：我们夸奖凌晨两点回邮件的人，仿佛缺觉是一种"美德/光荣"。honor 表"光荣"，与 praising 呼应。humour（幽默）、hunger（饥饿）不合；habit（习惯）是中性词，不与"夸奖"构成反讽。'},
{o:['paid','spent','taken','given'],a:0,e:'还债用 pay：this debt can be paid，"这笔债可以还清"。主语是债（debt），与 pay 搭配。spend 的主语是人，take / given 与债务不搭配。'}
]},

{d:42,k:'c9',t:'The Bridge and the Glass Box',zh:'石桥塌了一角，小城的修复申请不符合官方规则。退休泥瓦匠带着两个人修了条木头便桥，收一块钱过桥费，钱投进镇政府大厅的玻璃箱。两年后新桥通了，木桥留在了旁边。',w:["beside", "accept", "retire", "learn", "exact", "support", "application", "data", "survey", "community", "family", "government", "different", "allow", "this", "those", "one", "rule", "modern", "would", "exactly", "narrow", "dangerous", "carry out", "carry on", "be aware of", "what is more", "to sum up", "in addition to", "in terms of", "in charge of", "in favor of", "in spite of", "in case of", "in the long run", "in general", "in particular", "in other words", "by contrast"],p:`The old stone bridge had carried carts, buses and schoolchildren for ninety years, and nobody thought about it until a chunk of stone fell into the river. The {{1}} closed the bridge within an hour, and the town woke up to a question it had never asked: what do we do when the thing that holds us together stops {{2}} that?

A new bridge would {{3}} about two million, and the government had a fund for exactly this. But the rules were written for cities: applications had to be {{4}} by an engineer and supported by five years of traffic data. The town had {{5}}. Its last survey was older than its buses.

So it started without permission. A retired mason, two farmers and a schoolteacher built a wooden walkway beside the broken bridge and {{6}} one yuan to cross. The money went into a glass box at the town hall, and the {{7}} was written on a board outside: what had been collected, what was still needed, and the name of every family that gave more than its share.

Critics called the walkway dangerous. An inspector came, tested the rope, then paid his yuan, crossed, and wrote in the visitor book that the walkway was {{8}} than his report would be polite about. His {{9}} gave the town the official numbers it had lacked, and the fund finally accepted the application, two years after the stone fell.

The new bridge opened last spring — wider, stronger, and completely {{10}}. But the town kept the walkway beside it as a footpath, and the glass {{11}} still stands at the entrance. Visitors ask why a modern bridge needs an old rope path, and the answer on the board has not changed: the bridge was rebuilt with government money and eleven thousand {{12}} from the people who cross it every day.

What the town learned goes {{13}} the official story. Money builds bridges, but money does not decide who crosses first, or why a yuan in a glass box is worth more than a promise in a folder. Those questions are answered by {{14}}, not by paperwork.

Ask anyone what the bridge means and you will hear the same {{15}} in different words: before, we waited; now, we {{16}}. It is a small sentence, but it changed how the town {{17}} about everything else. When someone says a problem is too big, somebody else walks to the town hall and points at the {{18}} outside.

Not every town can build its own bridge. The walkway worked because the river is narrow and the town is small — the inspector said so {{19}}. The lesson is not 'do it yourself'. It is that doing something, even something {{20}}, changes what a community believes it is allowed to do.`,g:[
{o:['government','company','school','hospital'],a:0,e:'下一段的申请对象是政府基金，能在一小时内封锁桥梁的只有"政府"。company / school / hospital 既无此权力，也与全文叙事不符。'},
{o:['doing','to do','done','do'],a:0,e:'stop doing sth 表示"停止正在做的事"：维系大家的桥不再"维系"。stop to do 表示停下来去做另一件事，语义不通；done / do 不接在 stop 后表此义。'},
{o:['cost','spend','pay','take'],a:0,e:'句意：新桥将"花费"约两百万。主语是桥（物），用 cost。spend 和 pay 的主语必须是人，take 用于 it takes sb... 结构。'},
{o:['signed','sent','sold','shown'],a:0,e:'申请必须由工程师"签署"才有效。signed by an engineer 是制度性要求的核心。sent（寄出）、sold（卖）、shown（展示）都不能表达"资质签字"这一关。'},
{o:['neither','either','both','none'],a:0,e:'前文列出两样东西：工程师签字、五年交通数据。town had neither 表示"两样都没有"。either 用于肯定句"任一"，both 与否定语境相反，none 用于三者以上。'},
{o:['charged','paid','spent','costed'],a:0,e:'句意：过桥"收费"一元。charge sb (money) to do sth，主语是收费方。paid 是"付钱"（方向相反），spent 的主语是人且花自己的钱，cost 不用于此结构。'},
{o:['total','title','ticket','temple'],a:0,e:'板子上写的是"总数"：已收多少、还差多少。total 与 collected / needed 对应。title（标题）、ticket（票）、temple（寺庙）都与募捐账目无关。'},
{o:['stronger','stranger','slower','shorter'],a:0,e:'句意：便桥比他的报告"愿意承认的"要"更结实"。inspectors 试了绳子后给出的暗语式表扬。stranger（更奇怪）与赞扬语气不符，slower / shorter 与安全无关。'},
{o:['report','record','review','remark'],a:0,e:' inspector 写的是官方"报告"，给镇里带来了它一直缺的官方数字。report 与前文 his report would be polite about 呼应。record 是记录（中性），review 是"复审"，remark 是"评论"。'},
{o:['safe','sorry','serious','silent'],a:0,e:'新桥更宽、更牢、完全"安全"——桥本该如此。sorry（遗憾）不合，serious（严重）不能形容桥好，silent（安静）与安全性无关。'},
{o:['box','bottle','basket','bag'],a:0,e:'全文的募捐容器是"玻璃箱"（glass box），此处 the glass ___ 直接呼应。bottle / basket / bag 都与前文建立的形象不符。'},
{o:['gifts','goals','guests','games'],a:0,e:'句意：桥是用政府的钱和每天过桥的人的"馈赠"重建的。gifts 指每家每户的捐助。goals（目标）、guests（客人）、games（游戏）都与"钱从哪里来"无关。'},
{o:['beyond','behind','below','beside'],a:0,e:'goes beyond the official story：小城学到的"超出"官方叙事的范围。beyond 表"超出……之外"。behind（在后面）、below（低于）、beside（在旁边）都不表达"超出"之意。'},
{o:['habit','hobby','hotel','humor'],a:0,e:'句意：这些问题靠"习惯"回答，而不是靠文书。habit 与 paperwork 对举，指日复一日的共同行为。hobby（爱好）、hotel、humor（幽默）都不与"回答公共问题"搭配。'},
{o:['sentence','service','silence','science'],a:0,e:'下一句直接说 It is a small sentence——同词复现：人们用不同的词说出同一句"句子"。service（服务）、silence（沉默）、science（科学）与"用不同的话说同一件事"不符。'},
{o:['start','stop','stay','sleep'],a:0,e:'before, we waited; now, we ___：过去等，现在"行动/开始"。start 与 waited 形成对照。stop、stay、sleep 都与"从被动到主动"的转变相反。'},
{o:['argues','agrees','answers','arrives'],a:0,e:'句意：它改变了这个镇"争论"其他一切事情的方式——下文"有人说问题太大时，就有人去镇公所指板子"。argues about 是固定搭配。agrees（同意）与"争论"相反，answers 不接 about 表争论，arrives 不合。'},
{o:['board','box','bridge','bank'],a:0,e:'句末限定词 outside：镇公所"外面"的是写着账目的"板子"（board was written on a board outside）。box 在厅内，bridge 不是信息来源，bank（银行）无关。'},
{o:['himself','itself','themselves','myself'],a:0,e:'the inspector said so himself：检查员"亲口"承认便桥能用的原因。主语是 he（the inspector），反身代词用 himself。itself / themselves / myself 与主语在人称和数上不一致。'},
{o:['small','strange','silly','slow'],a:0,e:'句意：哪怕做的是"小事"，也会改变一个共同体认为自己被允许做什么。small 与 even（即便）呼应，点出全文主旨。strange / silly / slow 都带贬义或无关，破坏主旨。'}
]},

{d:46,k:'c10',t:'Fast Clothes, Slow Damage',zh:'一件T恤比午餐便宜，因为有人在别处付差额。做一件棉衬衫的水够一个人喝两年半，三成网购衣服被退回后直接销毁。作者主张：少买一半、多穿一倍，河会更干净。',w:["recycle", "individual", "teach", "student", "process", "online", "rather than", "wage", "company", "industry", "generation", "explain", "account", "imagine", "this", "those", "one", "rule", "trouble", "may", "should", "custom", "success", "solution", "somewhere", "trade", "cost", "tax", "customer", "traffic", "brand", "package", "fuel", "bargain", "take measures to", "in addition to", "in terms of", "in charge of", "in favor of", "in spite of", "in case of", "in the long run", "in general", "in particular", "in other words", "in contrast to", "in response to", "in advance", "in vain", "in detail", "in the face of", "in light of"],p:`A T-shirt costs less than lunch. That single fact explains both the success of fast fashion and the trouble it leaves behind. Clothes are cheap {{1}} someone, somewhere, is paying the difference — in wages, in water, in air.

The numbers are hard to imagine. Making one cotton shirt takes enough water to keep one person {{2}} for two and a half years. A garment that is worn seven times and thrown away has {{3}} all of that water in seven uses. The maths is simple and nobody does it at the till.

Cheap clothes also travel far. Cotton may be grown in one country, spun in a second, cut in a third and sold in a fourth. Every step burns fuel, and the {{4}} of a returning parcel — free to the customer — is paid in traffic and packaging. About a third of online clothes are sent back; many of those are not resold but {{5}} away, because processing returns costs more than the shirt is worth.

What can be done? Rules help at the edges: a {{6}} on destroyed returns, a tax on virgin plastic, a label that shows the real cost of washing. But rules move slowly, and wardrobes fill weekly. The faster lever is the {{7}}. When buyers ask how long a shirt should last, the answer stops being a season.

Some change is already visible. Second-hand shops were once {{8}} with shame; now students trade clothes as a hobby. Repair cafes teach people to sew a button, and a mended seam has become something to {{9}} rather than an embarrassment. None of this is a solution yet. {{10}}, it is a sign of direction.

The industry says it is going green, and some of it is. But a brand that sells five hundred million items a year cannot be made {{11}} by adding a recycling logo. The honest test is smaller: does the company make fewer things, better things, and keep them in use {{12}}?

For the individual, the arithmetic is kind. {{13}} half as much and keeping it twice as long keeps the wardrobe smaller, the bank account fatter, and the river cleaner. Nobody has to be perfect. A wardrobe that is {{14}} of clothes you actually wear is better than one that is full of bargains you forgot.

The deeper change is in how we see a shirt. For most of history, clothes were {{15}} for, mended, handed down and worn out honestly. Cheap fabric broke that {{16}} in two generations. It does not need two more to fix it — but it does need buyers who {{17}} that the lowest price is never the whole price. Someone always pays the rest; the only {{18}} is whether it is you now, or everyone {{19}}. {{20}} you buy less this month, someone downstream will drink cleaner water.`,g:[
{o:['because','although','unless','until'],a:0,e:'句意：衣服便宜，"是因为"有人在别处支付差额。因果关系的直接解释。although 表让步，unless / until 表条件与时间，逻辑不通。'},
{o:['drinking','washing','swimming','wasting'],a:0,e:'keep sb doing：让一个人"喝"两年半的水。与 water 的用途直接对应。washing（洗）、swimming（游泳）、wasting（浪费）都与"水的量相当于谁在用"不符——此处是饮用量类比。'},
{o:['spent','saved','shared','sold'],a:0,e:'句意：一件穿七次就扔的衣服，在七次使用里"花掉"了全部那些水。spend 水（资源）与后文"成本"概念一致。saved（省下）与"扔掉"矛盾，shared / sold 与主语 garment 不搭。'},
{o:['cost','price','bill','fare'],a:0,e:'the cost of a returning parcel：退货包裹的"成本"。cost 指生产、运输等总耗费，由交通和包装来支付。price 是标价（对顾客免费），bill 是账单，fare 特指车船费。'},
{o:['thrown','taken','turned','tried'],a:0,e:'thrown away 是固定搭配"扔掉"。句意：很多退货不再转卖而是直接扔掉，因为处理退货比衬衫本身还贵。taken / turned / tried 都不构成"处理掉"的含义。'},
{o:['ban','plan','fan','man'],a:0,e:'a ban on sth 是固定搭配，"对……的禁令"。句意：禁止销毁退货。plan（计划）不与 on destroyed returns 构成约束；fan / man 词形相近但语义无关——这是完形里典型的形近干扰。'},
{o:['buyer','seller','worker','driver'],a:0,e:'下文 When buyers ask how long a shirt should last 明确点出：更快的杠杆在"买家"一侧。seller（卖家）与"买多买少由谁定"的论证方向相反。'},
{o:['associated','satisfied','surprised','interested'],a:0,e:'be associated with 是固定搭配，"与……联系在一起"。句意：二手店过去与"羞耻"相连。satisfied / surprised / interested 的搭配是 with，但语义（满意、惊讶、感兴趣）与 shame 矛盾。'},
{o:['show','hide','sell','send'],a:0,e:'something to show rather than an embarrassment：缝补过的接缝成了可以"展示"的东西，而不是难堪。hide（藏）意思相反，sell（卖）、send（寄）不合语境。'},
{o:['Still','Then','Thus','So'],a:0,e:'前句"这还不是解决方案"，后句"它是一个方向的信号"——让步后转折继续，用 Still（尽管如此）。Then 表时间顺序，Thus / So 表因果（"因此它是方向"，与"还不是方案"衔接生硬）。'},
{o:['honest','huge','humid','hollow'],a:0,e:'made honest：年售五亿件的品牌不可能靠一个回收标志变得"诚实"。honest 与 the honest test 呼应。huge（巨大）与 make 搭配后语义未完成，humid（潮湿）、hollow（空洞的）不合。'},
{o:['longer','larger','later','louder'],a:0,e:'keep them in use longer：让物品被使用得"更久"。longer 与 fewer things, better things 并列，构成"少而耐久"的检验标准。larger 指更大，later 指更晚（时间点），louder 更响，都不表达"使用周期长"。'},
{o:['Buying','Buy','Bought','To buy'],a:0,e:'动名词短语作主语：Buying half as much... and keeping it... keeps...。两个并列主语都是 doing 形式，谓语用第三人称单数 keeps。动词原形不能作主语，To buy 与并列的 keeping 不对称。'},
{o:['full','fond','afraid','proud'],a:0,e:'be full of 是固定搭配，"装满"。句意：装着你真正会穿的衣服的衣柜。fond（喜爱）、afraid（害怕）、proud（自豪）虽然都接 of，但语义不通——这是 be + adj. + of 家族的经典辨析。'},
{o:['cared','called','cleaned','carried'],a:0,e:'cared for 是固定搭配，"被照料、被爱惜"。句意：历史上衣服是被爱惜、缝补、传代的。be cared for 才成立；called for（需要）、cleaned for / carried for 都不构成搭配。'},
{o:['habit','hobby','health','height'],a:0,e:'broke that habit：廉价面料在两代人里打破了"爱惜衣物"的习惯。habit 指长期形成的行为模式。hobby 是消遣，health / height 与"缝补传代"无关。'},
{o:['know','ask','hope','doubt'],a:0,e:'buyers who know that...：知道"最低价从来不是全部价格"的买家。know 接宾语从句表"明白这个道理"。ask 不接 that 从句表认知；hope / doubt 与全句的断定语气矛盾。'},
{o:['question','quarrel','quality','quantity'],a:0,e:'the only question is whether...：唯一的问题"是"现在由你付，还是以后由大家付。question 引出 whether 选择。quarrel（争吵）、quality（质量）、quantity（数量）都不接 whether 从句。'},
{o:['later','earlier','longer','louder'],a:0,e:'whether it is you now, or everyone later：是你现在付，还是"以后"所有人付。later 与 now 直接对举。earlier 意思相反，longer / louder 不进入这个对照。'},
{o:['If','Unless','Until','Although'],a:0,e:'If you buy less..., someone will drink cleaner water：条件与结果的直接因果。Unless 意思相反（除非不买才干净），Until 表时间，Although 表让步，逻辑都不通。'}
]},
{d:48,k:'c11',t:'When a Machine Reads Your Application',zh:'一家大公司承认招聘软件在筛掉女性——不是有人教它歧视，而是它从十年的招聘记录里学的。机器不残忍，它只是在重复过去。可查、可调、可追问，恰恰是它比人强的地方。',w:["result", "learn", "adjust", "avoid", "in charge of", "information", "insult", "statement", "software", "application", "inherit", "practice", "prejudice", "applicant", "company", "decision", "algorithm", "system", "different", "explain", "measure", "questionnaire", "imagine", "tired", "objective", "this", "should", "reason", "speed", "feeling", "exciting", "practical", "human", "publish", "bias", "filter", "fake", "hire", "in addition to", "in terms of", "in favor of", "in spite of", "in case of", "in the long run", "in general", "in particular", "in other words", "to sum up", "what is more", "in contrast to", "in response to", "in advance", "in vain", "in detail", "in the face of", "in light of", "in accordance with", "for instance", "for the sake of", "be aware of"],p:`A few years ago, a large company admitted that its hiring software had been {{1}} women. Not because anyone told it to — because it had learned from ten years of hiring {{2}}, and ten years of hiring had mostly chosen men. The machine was not cruel. It was {{3}} the past, which is a different and quieter problem.

The company {{4}} the system, hired outside auditors and published an honest summary of what had gone wrong. That is more than most companies {{5}}. Most stories about biased software end with a statement, not a {{6}}.

But the deeper lesson is about the word 'objective'. People imagine that a {{7}} cannot be prejudiced because it has no feelings. In fact it inherits ours: it learns from what we did, not from what we {{8}} to do. A questionnaire can measure what people say; an algorithm {{9}} what people actually chose. If the choosing was unfair, the learning will be too.

This does not mean we should {{10}} the machines. Human recruiters have the same weaknesses, plus a few of their own: they get tired, they favour faces that look like {{11}}, and they cannot explain a decision they made in ninety seconds. A machine is at least {{12}} to question: you can test it, adjust it, and ask it to show its reasons.

The practical answer is boring and slow. Audit the {{13}} before you trust the output. Keep a human in charge of the final {{14}}, and make that person write down why. Test the system with fake applications that differ only in name or age, and {{15}} the results every quarter. None of this is exciting. All of it is cheaper than a lawsuit, and more {{16}} than a promise.

Applicants can do something too. If a rejection arrives in four seconds, {{17}} a human ever read your file. The machine never {{18}} your cover letter; it counted {{19}} first. That is information, not just an insult: it tells you the company is filtering for speed, not for people. And a company that filters for speed will, sooner or later, {{20}} the same mistake it was built to avoid.`,g:[
{o:['rejecting','hiring','training','meeting'],a:0,e:'句意：招聘软件一直在"筛掉"女性。rejecting 与下文"十年的招聘大多选了男性"形成因果。hiring / training / meeting 与"软件出了问题"的语境相反——软件正是用来做这些事的。'},
{o:['records','reports','reasons','reviews'],a:0,e:'hiring records：十年的招聘"记录"——机器学习的正是历史数据。reasons（理由）不能被机器"学"，reports（报告）与 records 相比更偏一次性文件，reviews（评论）不合。'},
{o:['repeating','remembering','refusing','recording'],a:0,e:'句意：它只是在"重复"过去——这是一个更安静的问题。repeating the past 与首尾呼应（末段 the same mistake）。remembering 主语应是有人格者，refusing / recording 语义不合。'},
{o:['replaced','repeated','repaired','refused'],a:0,e:'句意：公司"更换"了系统，请了外部审计。replaced 与"系统有问题"的处置一致。repeated（重复）没有解决问题，repaired（修理）程度不够，refused（拒绝使用）与"still in use"不合。'},
{o:['do','say','know','try'],a:0,e:'That is more than most companies do：大多数公司"做"到的还不及此。do 概括上文"换系统、请审计、公开总结"这一整套动作。say / know / try 都只覆盖其中一个侧面。'},
{o:['change','choice','chance','check'],a:0,e:'end with a statement, not a change：以声明收场，而不是以"改变"收场。change 与 statement 对照。choice（选择）、chance（机会）、check（检查）都不与"声明 vs 行动"的对比呼应。'},
{o:['machine','manager','minister','monster'],a:0,e:'人们以为"机器"没有感情就不会有偏见——全文讨论的对象。manager（经理）是人，与 no feelings 矛盾；minister（部长）、monster（怪物）偏离话题。'},
{o:['meant','managed','forgot','failed'],a:0,e:'what we meant to do：我们从"打算"做的事。mean to do 表"打算"，与 did（实际做的）对举——机器学的是行为，不是意图。managed to do（设法做成）与 did 语义重复，forgot / failed 与 from what we did 的对照不成立。'},
{o:['measures','mentions','misses','mixes'],a:0,e:'measure what people chose：算法"测量"人们实际选了什么——与前半句 A questionnaire can measure what people say 平行。mentions（提及）、mixes（混合）不合；misses 与"测量"的对举错位。'},
{o:['remove','repair','repeat','refuse'],a:0,e:'句意：这不意味着我们该"撤掉"机器。remove 与后文"机器至少可以被质疑"的辩护立场一致。repair（修理）与"不应使用"的假设句式不符，repeat / refuse 语义不合。'},
{o:['themselves','himself','itself','oneself'],a:0,e:'they favour faces that look like themselves：招聘者偏爱"像他们自己"的面孔。主语 they 是复数，反身代词用 themselves。himself / itself / oneself 在数或指代上不一致。'},
{o:['easier','earlier','elder','either'],a:0,e:'easier to question：机器至少"更容易被质疑"——可以测试、调整、要求说明理由。earlier（更早）、elder（年长的）、either（二者之一）都不与 to question 搭配表达此义。'},
{o:['data','date','desk','door'],a:0,e:'Audit the data：先审计"数据"再相信输出——偏见藏在训练数据里。date（日期）、desk（桌子）、door（门）与"算法学习的原料"无关，属形近干扰。'},
{o:['choice','change','chance','check'],a:0,e:'the final choice：最终"决定"由人把守。choice 与 make that person write down why（让人为决定负责）呼应。change（改变）不是 hiring 流程的终点产物，chance / check 与 in charge of the final ___ 搭配不成立。'},
{o:['check','cheat','change','charge'],a:0,e:'check the results every quarter：每季度"核查"结果。check 与 audit（审计）呼应，都是监督动作。cheat 意思相反，change（更改）与"每季度"的例行核查不符，charge（收费）不合。'},
{o:['real','rare','rude','rich'],a:0,e:'more real than a promise：比一句承诺更"实在"。real 与 promise 对照——审计是做出来的，承诺是说出来的。rare（稀少）、rude（粗鲁）、rich（富有）都不与"承诺"对举。'},
{o:['hardly','nearly','really','almost'],a:0,e:'hardly a human ever read：几乎"没有人"读过你的档案。hardly 表否定意味的"几乎不"，置于 a human 前构成半否定。nearly / almost 表肯定方向的"几乎"，意思相反；really 是强调，不表否定。'},
{o:['opened','printed','posted','paid'],a:0,e:'never opened your cover letter：机器连你的求职信都"打开"都没打开过——只数关键词。opened 与 counted first（先数关键词）构成"没看内容、只看标签"。printed / posted / paid 与"读文件"无关。'},
{o:['words','world','works','worth'],a:0,e:'counted words first：先数"词"——机器筛选靠关键词匹配。words 与 cover letter 对应。world / works / worth 词形相近，但"数世界、数作品、数价值"都不合"筛选简历"的语境。'},
{o:['repeat','repair','refuse','remove'],a:0,e:'repeat the same mistake：迟早会"重蹈"它本想避免的覆辙。repeat 与开头 It was repeating the past 首尾呼应，点出主题。repair / refuse / remove 都不与 the same mistake 搭配。'}
]},

{d:52,k:'c12',t:'The Well and the Whiteboard',zh:'Ashford 村一口井、一条河、两百户人家。天气变了，井水每年夏天下沉一米。最终管用的不是委员会和海报，而是井边一块白板：取水的人写下水量和日期。一个月用水降了三分之一。',w:["resource", "protect", "produce", "argument", "technology", "family", "government", "turn out", "turn to", "office", "limit", "argue", "solve", "suggest", "this", "one", "rule", "could", "must", "should", "region", "order", "usual", "total", "to sum up", "in addition to", "in terms of", "in charge of", "in favor of", "in spite of", "in case of", "in the long run", "in general", "in particular"],p:`The village of Ashford has one well, one river and two hundred families. For sixty years that was {{1}}: the well gave drinking water, the river watered the fields, and the only argument was about whose turn it was to fix the pump.

Then the weather changed. Rain that used to arrive in April now arrives in June, if it arrives at all. The river runs low for months, and the well, which never ran dry before, now {{2}} by a metre every summer. In a dry year, the village must decide — every single day — {{3}} the water goes.

At first, people simply {{4}} more. Big farms pumped at night; small gardens died quietly. A committee was formed, met twice, and produced a poster. Nothing changed, because a poster asks nobody to {{5}} anything.

What finally worked was embarrassingly simple. A farmer's wife suggested a whiteboard at the well: anyone who takes water writes the amount and the {{6}}. Not to police each other — just to see. Within a month, use fell by a {{7}} — from eleven buckets a day to seven — without a single rule. People had been taking a little more {{8}} nobody could see the total. The whiteboard did something else. It made the water feel {{9}}. A resource that nobody owns is a resource nobody protects; once every family could see its own name next to a number, the well stopped being 'the village's problem' and became 'our {{10}}'. When a tourist asked why visitors should also write, an eight-year-old answered before any adult could: '{{11}} uses the water, so everyone writes.'

There is a limit to what a whiteboard can do. It cannot make it rain, and it cannot {{12}} a farm that needs more water than the village can spare. The village knows that some day it will need real rules — who gets how much, in what order, {{13}} by whom. But there is a {{14}} between rules written by people who share the well and rules handed down by a distant office. One says: we are in this together. The other says: {{15}} yourself.

The regional government now sends visitors to Ashford, which the villagers find {{16}}: officials ask for the secret, as if there were a {{17}} technology behind a whiteboard and a pencil. The villagers usually answer that the secret is not the board but the {{18}}: everyone who drinks from the well can see the well, and everyone who can see it can {{19}} its story.

Ashford did not solve the weather. What it did was smaller, but it {{20}}: it turned a silent problem into a visible one, and a visible problem, it turns out, is halfway to being solved.`,g:[
{o:['enough','easy','early','extra'],a:0,e:'句意：六十年来，这样就"够了"。enough 与冒号后的稳定分工呼应：井供饮水、河浇田。easy（容易）、early（早）、extra（额外）都不表达"这种状态令人满意"。'},
{o:['drops','drinks','drives','dreams'],a:0,e:'句意：井水每年夏天"下降"一米。drop 指水位下降，与 now drops 呼应后文 must decide where the water goes。drinks / drives / dreams 与主语 the well 不构成搭配。'},
{o:['where','when','why','whether'],a:0,e:'decide where the water goes：决定水"去向哪里"。缺水年份的核心问题是分配给谁、用在哪。when（何时）与 every single day 矛盾，why（为何）不合，whether 缺"是否"的二元语境。'},
{o:['took','gave','left','kept'],a:0,e:'句意：起初，人们只是"取"更多的水。take water 取水，与下文大农场夜里抽水一致。gave（给）方向相反，left / kept 与"悄悄多占"不合。'},
{o:['change','pay','say','wait'],a:0,e:'asks nobody to change anything：海报没有要求任何人"改变"任何事——所以什么都没变。change 与 Nothing changed 直接呼应。pay（付钱）、say（说）、wait（等）都不是海报欠缺的要素。'},
{o:['date','data','day','dawn'],a:0,e:'writes the amount and the date：写下水量和"日期"。date 与 amount 并列，是记录的两个要素。data（数据）是不可数且不与 the 搭配单数；day / dawn 与"记录"无关，属形近干扰。'},
{o:['third','half','quarter','fifth'],a:0,e:'fell by a third：从每天十一桶降到七桶——减少 4/11，约三分之一，数字锁定 third。half 是 5.5 桶，quarter 约 2.75 桶，fifth 约 2.2 桶，都与 11→7 不符。'},
{o:['because','although','unless','until'],a:0,e:'句意：人们多取一点，是"因为"没人能看到总数。because 引出多占的原因，与白板"让总数可见后用量下降"的因果一致。although（尽管）、unless / until（条件、时间）逻辑不通。'},
{o:['shared','shown','sold','saved'],a:0,e:'made the water feel shared：让水感觉是"共享的"。shared 与下文 nobody owns / our well 的论述一致。shown（被展示）、sold（被卖）、saved（被省下）都与"归属感"这条线不合。'},
{o:['well','wall','wave','wind'],a:0,e:'became our well：井不再是"村子的问题"，而成了"我们的井"。well 与全文的核心意象和标题 The Well and the Whiteboard 呼应。wall / wave / wind 都偏离主线。'},
{o:['Everyone','Anyone','Someone','Nobody'],a:0,e:'Everyone uses the water, so everyone writes："人人都用水，所以人人都写"。Everyone 与 so everyone 前后一致，构成普遍规则。Anyone / Someone 以偏概全，Nobody 与"人人要写"矛盾。'},
{o:['help','stop','keep','make'],a:0,e:'it cannot help a farm：白板帮不了"需要的水比全村能匀出的还多"的农场。help 承认白板的局限。stop（阻止农场）不合语境——问题不在阻止，而在供给不足；keep / make 搭配不完整。'},
{o:['decided','divided','dropped','done'],a:0,e:'decided by whom：由"谁"来决定。decide 与上句 it will need real rules 呼应——规则的核心是决定权。divided（被分割）与 by whom 不搭，dropped / done 语义不合。'},
{o:['difference','difficulty','distance','disaster'],a:0,e:'a difference between A and B：共同体自己写的规则与上级办公室发下来的规则之间的"差别"。difference between 是固定搭配。difficulty 需接 in doing，distance 需指空间，disaster（灾难）不合。'},
{o:['Save','Share','Show','Send'],a:0,e:'Save yourself："各自保命/只顾自己"——与 we are in this together 形成两种规则的对照。Share（共享）意思相反，Show / Send 与"自保"不符。'},
{o:['strange','strong','sweet','stiff'],a:0,e:'find it strange：村民觉得上级派人来"取经"很奇怪——因为答案只是块白板。strange 与下文 as if there were a hidden technology 的反讽一致。strong / sweet / stiff 都不表达"觉得奇怪"。'},
{o:['hidden','heavy','hungry','hollow'],a:0,e:'a hidden technology：好像白板和铅笔背后藏着什么"隐藏的"高科技。hidden 与 as if（仿佛）的反讽语气一致。heavy（沉重）、hungry（饥饿）、hollow（空洞）都不能修饰 technology 表"藏而不露"。'},
{o:['view','voice','visit','vision'],a:0,e:'the secret is not the board but the view：秘密不在板子，而在"视野"——人人都能看见井。view 与 see the well 呼应。voice（声音）、visit（访问）、vision（远见）都与"可见性"这条论证线不合。'},
{o:['tell','talk','say','speak'],a:0,e:'tell its story：tell a story 是固定搭配，"讲述它的故事"。tell 接故事作宾语。talk / say / speak 都不能直接接 its story（应为 talk about、say the story 不地道、speak 不接双宾）。'},
{o:['works','wins','waits','wastes'],a:0,e:'it works：它"管用"。works 指（办法）奏效，与 What finally worked 前后呼应。wins（获胜）缺对手，waits（等待）与"已见效"矛盾，wastes（浪费）意思相反。'}
]}
];

const CGLOSS={"wallet": "钱包", "medicine": "药", "reward": "报酬", "honesty": "诚实", "trust": "信任", "proof": "证明", "passenger": "乘客", "owner": "失主/主人", "pattern": "模式", "local": "当地的", "editor": "编辑", "guard": "护学岗/警卫", "crossing": "人行横道", "province": "省", "budget": "预算", "wage": "工资", "committee": "委员会", "complaint": "投诉", "poster": "海报", "inspector": "检查员", "rope": "绳子", "rope walkway": "木板便道", "walkway": "便道", "footpath": "步道", "glass box": "玻璃箱", "board": "告示板", "fund": "基金", "application": "申请", "entrance": "入口", "paperwork": "文书工作", "cart": "手推车/马车", "chunk": "大块", "mason": "泥瓦匠", "survey": "测量/调查", "pump": "水泵", "bucket": "桶", "whiteboard": "白板", "regional": "地区的", "official": "官员", "pencil": "铅笔", "folder": "文件夹", "spare": "匀出", "memory": "记忆", "brain": "大脑", "chapter": "章节", "path": "小路", "silence": "沉默", "experiment": "实验", "syllabus": "教学大纲", "staff room": "教研室", "district": "区", "method": "方法", "sentence": "句子", "trick": "诀窍", "practice": "练习", "delivery": "配送", "parcel": "包裹", "warehouse": "仓库", "vans": "货车", "packaging": "包装", "fuel": "燃料", "till": "收银台", "garment": "成衣", "wardrobe": "衣柜", "second-hand": "二手的", "mended": "缝补过的", "seam": "缝线", "fabric": "布料", "downstream": "下游的", "virgin plastic": "原生塑料", "label": "标签", "recycling logo": "回收标志", "bargain": "便宜货", "arithmetic": "算术", "cotton": "棉花", "spin": "纺纱", "fashion": "时尚", "t-shirt": "T 恤", "lunch": "午餐(基础)", "fast fashion": "快时尚", "clinic": "诊所", "notebook": "笔记本", "loneliness": "孤独", "pill": "药丸", "housing": "住房", "ambulance": "救护车", "visitor": "来访者", "glass": "玻璃", "interview": "面试", "newspaper": "报纸", "patients": "病人", "platform": "站台", "delay": "延误", "sensor": "传感器", "track": "轨道", "signal": "信号", "daughter": "女儿", "flash": "闪一下", "judgment": "判断", "strictly": "严格地", "clock": "钟", "staring": "盯着看", "semester": "学期", "magic": "魔法", "debt": "债务", "interest": "利息", "to-do list": "待办清单", "appointment": "约定", "border": "边界", "prescription": "处方", "reaction": "反应", "thief": "小偷", "thieves": "小偷", "glow": "发光", "refresh": "刷新", "interruptions": "打断", "half-awake": "半睡半醒", "carts": "马车", "cars": "汽车(基础)", "engineer": "工程师", "name": "名字(基础)", "hiring": "招聘", "recruiter": "招聘人员", "auditor": "审计员", "auditors": "审计员(复数)", "biased": "有偏见的", "prejudiced": "有偏见的", "questionnaire": "问卷", "fake": "伪造的", "lawsuit": "诉讼", "cover letter": "求职信", "applicant": "申请人", "rejection": "拒绝信", "objective": "客观的", "filter": "筛选", "recruiters": "招聘人员(复数)", "software": "软件", "hiring software": "招聘软件", "well": "水井", "drought": "干旱", "share": "份额(基础)", "limit": "限制(基础)", "custom": "习俗", "ritual": "仪式", "technology": "技术", "region": "地区", "minister": "部长", "monster": "怪物", "recorder": "录音机", "fiction": "小说", "hollow": "空洞的", "humid": "潮湿的", "humour": "幽默", "humor": "幽默", "temple": "寺庙", "decade": "十年", "dawn": "黎明", "fare": "车费", "vision": "远见", "victory": "胜利", "height": "身高", "difficulty": "困难", "distance": "距离", "minute": "分钟", "stranger": "陌生人", "guests": "客人", "guards": "卫兵", "seller": "卖家", "buyer": "买家", "worker": "工人", "ticket": "票", "fond": "喜爱的", "bound": "必定的", "agree": "同意", "agreed": "同意(过去式)", "charge": "收费", "computer": "电脑", "control": "控制", "copy": "照搬", "correct": "正确的", "denied": "否认(过去式)", "faster": "更快", "lesson": "课", "listening": "倾听", "machine": "机器", "match": "匹配", "mistake": "错误", "noticed": "注意到", "promise": "承诺", "reading": "读", "remember": "记得", "repeat": "重复", "repeated": "重复(过去式)", "repeating": "重复(进行式)", "repeats": "重复(三单)", "returned": "归还(过去式)", "speaking": "说", "speech": "演讲", "ties": "系住(三单)", "unites": "联合(三单)", "buying": "买(动名词)", "agrees": "同意(三单)", "arrives": "到达(三单)", "ask": "问", "cared": "照料(过去式)", "charged": "收费(过去式)", "cleaned": "清理(过去式)", "drinking": "喝", "fan": "风扇/爱好者", "games": "游戏", "gifts": "礼物", "hobby": "爱好", "honor": "光荣", "hotel": "旅馆", "huge": "巨大的", "piece": "一块", "remark": "评论", "satisfied": "满意的", "saved": "省下(过去式)", "shared": "分享(过去式)", "signed": "签署(过去式)", "silent": "安静的", "slips": "溜走", "steps": "脚步", "strangers": "陌生人", "surprised": "惊讶的", "swimming": "游泳", "washing": "洗", "wasting": "浪费", "save": "保全/节省", "check": "核查", "difference": "差别", "divided": "分割(过去式)", "doubt": "怀疑", "drinks": "喝(三单)", "elder": "年长的", "hidden": "隐藏的", "misses": "漏掉(三单)", "mixes": "混合(三单)", "posted": "张贴(过去式)", "printed": "打印(过去式)", "recording": "记录", "refusing": "拒绝", "rejecting": "拒绝/筛掉", "remembering": "记住", "repair": "修理", "repaired": "修理(过去式)", "reports": "报告", "view": "视野", "visit": "访问", "voice": "声音", "wave": "波浪", "wind": "风", "words": "词", "worth": "值得",
"rhythm":"节奏",
"patience":"耐心",
"custom":"习俗",
"customs":"习俗",
"pace":"步调",
"craft":"手艺，工艺",
"routine":"常规，例行做法",
"learner":"学习者",
"inquiry":"探究，调查",
"sample":"样本，样品",
"workshop":"工坊，研讨班",
"timetable":"时间表",
"shelf":"架子，搁板",
"recipe":"食谱，配方",
"bin":"箱，垃圾桶",
"household":"家庭，住户",
"cart":"手推车",
"bench":"长凳，工作台",
"survey":"调查",
"greeting":"问候",
"portable":"便携的",
"gentle":"温和的",
"steady":"稳定的",
"plain":"朴素的，清楚的",
"scattered":"分散的",
"ward":"病房",
"monitor":"监测仪，显示器",
"wireless":"无线的",
"trainee":"受训者",
"device":"装置，设备",
"nurse":"护士",
"stage":"阶段，舞台",
"chart":"图表",
"lane":"小巷，车道",
"ceremony":"仪式",
"grain":"谷物",
"quiet":"安静的",
"calm":"平静的",
"ordinary":"普通的",
"daily":"每日的",
"habit":"习惯",
"record":"记录"
};

