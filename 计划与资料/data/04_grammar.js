/* 课堂语法题库 / 分层题库 / 动态出题生成器
   本文件由 学位英语_55天冲刺台.html 原样抽出，表达式体未作任何改动。
   修改题目或答案请只改这里；页面渲染逻辑在 HTML 内，不存题目。
   校验：node data/verify.js
   包含：LESSONS, BANK_X, GENS
*/

const LESSONS=[
{id:'L0',wk:'先修课',t:'先看懂这些词：语法术语入门',sub:'名词动词形容词 / 主谓宾定状补 / 介词到底是什么 —— 后面所有课文都建立在这节上',
 teach:[
  ['为什么先上这节课','后面的课文里会不断出现「主语、谓语、宾语、介词、定语」这些词。如果你不懂它们，每句话都像天书。这节课用大白话把这些术语一次讲清，看完再回 L1，所有句子都看得懂了。<br>不用背，先混个脸熟，后面每课都会反复用到，用着用着就懂了。'],
  ['一、先认识「词性」——每个英文单词都有自己的岗位','<b>名词</b> = 人、事物、地点的名字：teacher 老师、city 城市、book 书、water 水。<br><b>动词</b> = 表示「动作或状态」：run 跑、teach 教、love 爱。<b>是句子的发动机，每个句子必须有一个。</b><br><b>形容词</b> = 描述「什么样的」：beautiful 漂亮的、important 重要的、red 红色的。<br><b>副词</b> = 描述「怎么做的」：quickly 快地、very 非常、always 总是。多数副词长这样：形容词 + ly（quick → quickly）。<br><b>代词</b> = 代替名词避免重复：I 我、he 他、it 它、they 他们。<br>一张图记住分工：名词是「东西」，动词是「动作」，形容词给名词「贴标签」，副词给动词「贴标签」。'],
  ['二、介词——你圈出来的这个词（重点讲透）','<b>介词 = 表示「关系」的小词，本身没有动作，只负责把前后的词连起来。</b><br>它像一个小挂钩，主要表达三种关系：<br>· <b>位置关系</b>：in the room 在房间里（in = 在…里面）、on the desk 在桌上（on = 在…上面）、under the tree 在树下<br>· <b>方向关系</b>：go <b>to</b> school 去学校（to = 朝向）、come <b>from</b> China 来自中国（from = 从）<br>· <b>时间关系</b>：at 9:00 在九点、on Monday 在周一、in 2026 在2026年<br>为什么叫「介」词？因为它「介于」名词和其他词之间，必须带着一个名词一起出现：<br><b>arrive at</b> the station —— at 后面必须挂一个名词（the station），这个「at + 名词」的整体叫<b>介词短语</b>，作用相当于一个形容词或副词，用来说明「在哪里 / 什么时候 / 怎么样」。<br>换个角度看：<b>中文里「在」「到」「从」「向」「对」这些字，就是介词的角色</b>。「到达车站」的「到」、「在桌上」的「在」——英文换成 at / on 而已。你早就在用介词，只是中文里它们长得不像一个「词类」。<br>考试怎么考：① 固定搭配记哪个介词（arrive <b>at</b>、listen <b>to</b>、good <b>at</b> 擅长）② 时间介词三选一（at 点 / on 天 / in 段）③ 它标记的短语在长句里是「修饰」，砍长句时整块砍掉。'],
  ['三、句子成分——一句话里的六个岗位','拿一句中文对照：「昨天那个女孩在图书馆认真地读了一本书。」<br>· <b>主语</b> = 动作的发出者，回答「谁？」：那个女孩（the girl）<br>· <b>谓语</b> = 动词本身，回答「做什么」：读了（read）<br>· <b>宾语</b> = 动作的承受者，回答「动了什么」：一本书（a book）<br>· <b>定语</b> = 修饰<b>名词</b>的成分：「昨天那个」修饰女孩——定语回答「哪个？」<br>· <b>状语</b> = 修饰<b>动词</b>的成分：「在图书馆」「认真地」修饰读——状语回答「在哪 / 怎么做 / 何时」<br>· <b>表语</b> = be 动词后面的成分：「她是医生」的「医生」（She is a doctor）<br>记法：<b>主语干活，谓语是动作，宾语挨打，定语贴在名词前，状语围着动词转。</b><br>英文完全一样：The girl <b>carefully</b> read a book in the library.（carefully = 状语，in the library = 状语）'],
  ['四、及物与不及物——为什么有的动词后面要加介词','<b>及物动词（vt）</b>：动作直接砸到对象上，后面直接跟宾语——I love <b>you</b>. 我爱你。<br><b>不及物动词（vi）</b>：动作自己就完整，后面<b>不能</b>直接跟对象——Birds fly. 鸟会飞（fly 后面什么都不用带）。<br>问题来了：不及物动词也想说「对谁做」怎么办？——<b>必须请介词当中间人</b>：<br>listen（听，不及物）→ listen <b>to</b> music 听音乐（to 是中间人）<br>arrive（到达，不及物）→ arrive <b>at</b> the station 到达车站<br>✗ arrive the station（中间人不能省）✓ arrive <b>at</b> the station<br>这就是 L1 说的「要接宾语必须加介词」的全部含义：<b>不及物动词 + 介词 + 名词</b>，介词是它的通行证。'],
  ['五、三句话检验你是否过关','① I put the book <b>on</b> the desk. —— on 是<b>介词</b>（位置关系），the book 是<b>宾语</b>，on the desk 整体是<b>状语</b>（说明放哪儿）。<br>② She looks <b>beautiful</b>. —— beautiful 是<b>形容词</b>作表语（looks 是系动词）。<br>③ The man <b>in the car</b> is my boss. —— in the car 是介词短语作<b>定语</b>，修饰 the man（「车里那个男人」）。<br>能想明白这三句，就可以进 L1 了。想不明白就再读一遍第二、三节。'],
  ['后续课文遇到术语怎么办','本工具所有课文都用这套术语，不会再引入新黑话。如果哪里又卡住了，直接回到本课对照；或者截图发我，我把那个术语也补进来。'],
 ],
 bank:[
  {s:'Listen __ me carefully.',o:['to','at','for','in'],a:0,e:'listen 是不及物动词，接对象必须加介词 to：listen to me。at / for / in 都不是 listen 的固定搭配。'},
  {s:'She is good __ math.',o:['at','in','to','for'],a:0,e:'be good at 是固定搭配「擅长」。介词搭配没有道理可讲，见一个记一个。'},
  {s:'We arrived __ Beijing last night.',o:['in','to','at','on'],a:0,e:'arrive 后接介词：到达大地方用 in（arrive in Beijing），到达小地点用 at（arrive at the station）。北京是大地方，用 in。'},
  {s:'In the sentence "He runs quickly", the word "quickly" is __.',o:['a 副词，修饰动词 runs','a 形容词，修饰 runs','a 介词','a 名词'],a:0,e:'quickly 描述「怎么跑的」，修饰动词的词是副词（多数以 ly 结尾）。'},
  {s:'In "The girl in red is my sister", the phrase "in red" is __.',o:['定语，修饰 the girl','宾语','谓语','状语，修饰 is'],a:0,e:'in red 是介词短语，回答「哪个女孩？」→ 修饰名词的成分叫定语。'},
  {s:'I will wait __ you come back.',o:['until','at','to','for when'],a:0,e:'until 是「直到」，引导时间：我会等到你回来。wait 后面直接跟从句时用 until（wait for 后面只能跟名词）。'},
  {s:'In "Put it on the table", "on the table" tells us __.',o:['在哪里放 → 地点状语','动作的承受者 → 宾语','修饰 it → 定语','主语'],a:0,e:'介词短语说明动作发生的位置，修饰动词 put，是状语。宾语是 it（被放的东西）。'},
  {s:'Which one is a preposition (介词)?',o:['under','quickly','beautiful','teacher'],a:0,e:'under（在…下面）是介词；quickly 是副词；beautiful 是形容词；teacher 是名词。'}
 ]},
{id:'L1',wk:'第 1 周',t:'句子骨架：五种基本句型',sub:'主谓 / 主谓宾 / 主系表 / 双宾 / 宾补 / there be / it',
 teach:[
  ['为什么先学骨架','中文和英文的语序思路不一样：中文把修饰放在前面（「穿红衣服的女孩」），英文把长修饰放在后面（The girl in red）。所以读英文长句的正确动作是：<b>先找骨架，再看修饰</b>。<br>每读一句先问三个问题：① 谁是主语？② 谓语动词是哪个？③ 其余部分在修饰谁？把这三个问题练成本能，阅读 70% 的困难就消失了。'],
  ['① 主+谓（不及物动词）','<b>The man left.</b> 那个人走了。<br><b>Birds fly.</b> 鸟会飞。<br><b>What happened?</b> 发生了什么事？<br>「不及物」= 动作不需要承受者，后面<b>不能直接跟宾语</b>。常见不及物：come、go、happen、rise（上升）、die、arrive、listen。<br>要接对象必须加<b>介词</b>（介词 = 表示「到 / 在 / 从」这类关系的小词，详见先修课 L0 第三节）：<b>arrive at</b> the station 到达车站、<b>listen to</b> music 听音乐。<br>✗ arrive the station　✓ arrive <b>at</b> the station'],
  ['② 主+谓+宾','<b>She teaches English.</b> 她教英语。<br><b>I love this city.</b> 我爱这座城市。<br><b>He is reading a book.</b> 他正在读一本书。<br>「及物」= 动作有承受者，宾语就是动作的对象。找宾语的方法：谓语动词后问「什么？」——teach 什么？English。<br>阅读技巧：先抓「谁 + 做了什么」，句子意思就懂了一半，剩下的都是修饰。'],
  ['③ 主+系+表','这个句型的动词不表示「做动作」，而是「描述状态」。系动词分四类，全部要认识：<br>· <b>be</b>（是）：She <b>is</b> a doctor. 她是医生。<br>· 感官类：<b>look / sound / smell / taste / feel</b>（看起来/听起来/闻起来/尝起来/摸起来）：The music <b>sounds</b> beautiful. 音乐听起来很美。<br>· 变化类：<b>become / turn / get / go</b>（变得）：He <b>got</b> angry. 他生气了。<br>· 保持类：<b>keep / stay / remain</b>（保持）：Please <b>keep</b> quiet. 请保持安静。<br><b>铁律：系动词后面接形容词，不接副词。</b><br>✗ The soup tastes well.　✓ The soup tastes <b>good</b>. 汤尝起来很好喝。<br>（特例：well 作形容词只有「身体好」一个意思：I am well. 我身体很好。）'],
  ['④ 主+谓+双宾','动作同时涉及「人」和「物」两个对象：<br><b>He gave me a book.</b> 他给了我一本书。= He gave a book <b>to</b> me.<br><b>My mother bought me a bike.</b> 妈妈给我买了辆自行车。= She bought a bike <b>for</b> me.<br>近的宾语是「人」（间接宾语），远的宾语是「物」（直接宾语）。也可以说：直接宾语＝被给的东西（物），间接宾语＝接收的人。<br>用 <b>to</b> 的动词（动作朝向人）：give / send / show / tell / pass / lend / return<br>用 <b>for</b> 的动词（为某人做）：buy / make / cook / get / find<br>判断方法：把句子改成「物 + 介词 + 人」，介词选 to 还是 for 背动词即可，考试就考这一步。'],
  ['⑤ 主+谓+宾+补','宾补 = 补充说明宾语「是什么 / 怎么样」：<br><b>We call him Jack.</b> 我们叫他 Jack。（him = Jack，宾补是名词）<br><b>The news made me happy.</b> 这个消息让我开心。（宾补是形容词）<br><b>I found the room empty.</b> 我发现房间是空的。<br><b>Keep the door open.</b> 让门开着。<br>常用动词：make / keep / find / consider / call / name / leave。<br>两个硬规则：宾语必须用<b>宾格</b>（made <b>me</b> happy ✗ made I）；补语位置用<b>形容词</b>（✗ made me happily）。'],
  ['there be 句型','表示「某地有某物」，there 无实义，真正的主语在 be 后面：<br><b>There is a book and two pens on the desk.</b> 桌上有一支笔和两本书。<br><b>There was an accident here last night.</b> 昨晚这里出了一次事故。<br><b>There is a man standing at the door.</b> 有个人正站在门口。（there be + 名词 + doing：正在做）<br><b>就近原则</b>：be 动词跟<b>最近的名词</b>保持一致——上面第一句最近的名词是 a book，所以用 is。<br>两个禁止：✗ There <b>have</b> a book.（there be 句型不能用 have）✗ There is <b>stand</b> a man.（动词要用 doing 形式）'],
  ['it 句型','it 在这里<b>没有词义</b>，只是占位，真正的内容在后面：<br><b>It is important to learn English.</b> 学英语很重要。（真正主语 = to learn English）<br><b>It takes me two hours to finish the work.</b> 完成这项工作花了我两个小时。<br><b>I find it difficult to get up early.</b> 我发现早起很难。（it 形式宾语，代替 to get up early）<br>判断方法：把 it 换成后面的真主语/真宾语，句子意思不变，就说明它是形式主语/宾语。'],
  ['长句砍修饰法（本课最重要的一节）','四步：<b>① 找谓语动词 ② 找主语 ③ 砍掉介词短语/从句/分词 ④ 连成中文</b><br>例 1：<b>The girl [in red] [who sits behind me] is my deskmate.</b><br>→ 找到谓语 is → 主语是 The girl → 方括号全是修饰 → 骨架：The girl is my deskmate.<br>→ 译文：穿红衣服、坐我后面的那个女孩是我的同桌。<br>例 2：<b>The book [that I bought yesterday] is interesting.</b><br>→ 骨架：The book is interesting. → 译文：我昨天买的那本书很有趣。<br>你看到的英文长句，90% 都能用这个方法拆开。']],
 bank:[
  {s:'There __ a pen and two books on the desk.',o:['is','are','be','been'],a:0,e:'there be 就近原则：动词跟最近的 a pen 保持一致，用单数。'},
  {s:'The soup tastes __.',o:['good','well','badly','nicely'],a:0,e:'系动词后接形容词。taste well 不成立（well 作形容词仅指「身体好」）；nicely 是副词，不能作表语。'},
  {s:'He gave __ yesterday.',o:['me a book','a book me','to me a book','a book to I'],a:0,e:'双宾语 give sb sth：人放前、物放后。宾语用宾格 me。'},
  {s:'My mother bought __ last week.',o:['a bike for me','for me a bike','a bike me','me to a bike'],a:0,e:'buy 搭配 for：buy sth for sb。give 类才用 to。'},
  {s:'The news made __.',o:['me happy','me happily','I happy','my happy'],a:0,e:'主谓宾+宾补：make + 宾语 + 形容词。宾语用宾格 me，补语用形容词。'},
  {s:'We found __ hard to finish the work on time.',o:['it','this','that','them'],a:0,e:'it 形式宾语：find it + adj + to do，真正的宾语是 to finish...。'},
  {s:'She __ a teacher for ten years.',o:['has been','is being','was been','is'],a:0,e:'for ten years 与现在完成时连用：has been。'},
  {s:'__ a lot of students on the playground now.',o:['There are','There is','There have','There has'],a:0,e:'就近的 students 是复数 → There are。there be 句型不能用 have。'},
  {s:'Which one is 主+谓+宾+补 结构？',o:['We call the dog Lucky.','The dog is Lucky.','We call the dog.','The dog called Lucky.'],a:0,e:'call + 宾(the dog) + 补(Lucky)，只有这一项是宾补结构；The dog is Lucky 是主系表，We call the dog 只有主谓宾，The dog called Lucky 主语是狗、意思变了。'},
  {s:'The girl in red who sits behind me is my deskmate. 主干是？',o:['The girl is my deskmate.','The girl sits behind me.','My deskmate is behind me.','I sit behind the girl.'],a:0,e:'in red 和 who sits behind me 都是修饰 the girl 的定语，砍掉后主干是主系表。'},
  {s:'He looks __ today.',o:['tired','tiredly','tire','tiring'],a:0,e:'look 是系动词，接形容词。tired 修饰人「感到累」，tiring 修饰物「令人累」。'},
  {s:'There is a man __ at the door.',o:['standing','stands','stood','to stand'],a:0,e:'there be + 名词 + doing：主动进行的动作用现在分词。'}
 ]},
{id:'L2',wk:'第 2 周',t:'修饰语的位置：定语与状语',sub:'形容词前置 / 介词短语后置 / 副词位置 / enough 后置',
 teach:[
  ['什么是定语、状语','<b>定语</b>：修饰名词的成分，翻译成中文就是「……的」：a <b>red</b> car 一辆红色的车。<br><b>状语</b>：修饰动词/整句的成分，说明「什么时候、在哪、怎么做、为什么」：He runs <b>fast</b>. 他跑得快。<br>中英最大的差异在这里：<b>中文的修饰永远在前面，英文的短修饰在前、长修饰在后</b>。这就是你翻译不出来句子的第二个原因（第一个是找不到主干）。'],
  ['单个形容词：前置，但有一类必须后置','正常情况放名词前：an <b>interesting</b> book 一本有趣的书。<br>但修饰 <b>something / anything / nothing / everything / somewhere</b> 这类不定代词时，形容词<b>必须放后面</b>：<br>✓ something <b>important</b> 重要的事情　✗ important something<br>✓ nothing <b>new</b> 没什么新东西<br>判断方法：看到 something/anything/nothing 开头的词组，修饰语一律往后放——这个考点每年都考。'],
  ['后置定语三兄弟（长修饰放后面）','① 介词短语：the man <b>in the room</b> 房间里的那个男人<br>② 分词：the language <b>spoken in Brazil</b> 巴西人说的语言（被说 → 过去分词）；the boy <b>standing there</b> 站在那里的男孩（主动 → 现在分词）<br>③ 不定式：the way <b>to solve it</b> 解决这个问题的办法<br>翻译练习：The girl <b>in red</b> is my sister. → 穿红衣服的那个女孩是我妹妹。修饰语短就放前面，长就放后面，但<b>介词短语作定语永远后置</b>。'],
  ['副词的位置','频度副词（always / usually / often / sometimes / never）的固定位置：<br>· 实义动词<b>前面</b>：He <b>always</b> comes late. 他总是迟到。<br>· be 动词<b>后面</b>：He is <b>always</b> late. 他总是迟到。<br>· 助动词后面：I have <b>never</b> been there. 我从没去过那里。<br><b>enough 的位置是必考点</b>：修饰形容词/副词时放<b>后面</b>：<br>✓ old <b>enough</b> 年龄够大　✗ enough old<br>✓ He is not old <b>enough</b> to join the army. 他年纪不够大，不能参军。'],
  ['多个状语的排列顺序','顺序：<b>方式 → 地点 → 时间</b>（小的时间单位在前）：<br>He worked <b>quietly</b>（方式）<b>in the office</b>（地点）<b>all day</b>（时间）. 他一整天都在办公室安静地工作。<br>时间状语可以提到句首表强调：<b>Yesterday</b> I met an old friend. 昨天我遇到了一位老朋友。'],
  ['时间介词三兄弟（送分题）','<b>at</b> + 钟点：at 9:00 在九点<br><b>on</b> + 具体某天（含某天的上午下午）：on Monday 在周一、on Monday morning 在周一早上<br><b>in</b> + 月 / 年 / 季节 / 世纪：in May 在五月、in 2026、in winter<br>口诀：<b>at 点、on 天、in 大</b>。易错：具体某天的上下午也用 on（因为 Monday morning 是「一天」的概念）。'],
  ['数词修饰','确切数字：数词 + 名词，<b>不加 s、不加 of</b>：two <b>hundred</b> students 两百个学生<br>泛指「成百上千」：<b>加 s + of</b>：<b>hundreds of</b> students 成百上千的学生<br>同理：thousands of 成千上万的、millions of 数百万的。<br>✗ two hundreds students　✓ two hundred students'],
  ['复合形容词作定语','「数词-名词-形容词」用连字符连起来放名词前，中间名词用<b>单数</b>：<br>a <b>five-year-old</b> boy 一个五岁的男孩（✗ five-years-old）<br>a <b>well-prepared</b> meeting 一场准备充分的会议<br>a <b>hard-working</b> student 一个勤奋的学生']],
 bank:[
  {s:'I have __ to tell you.',o:['something important','important something','something of important','important anything'],a:0,e:'不定代词的定语后置：something important。'},
  {s:'He is not __ to join the army.',o:['old enough','enough old','very old','so old'],a:0,e:'enough 修饰形容词要后置；not + adj + enough to do = 不够…而不能。very / so 与 not 连用后都不能接 to do 表「不够年龄」。'},
  {s:'He __ late for school.',o:['is always','always is','always be','be always'],a:0,e:'频度副词放 be 动词之后。'},
  {s:'The man __ is our new teacher.',o:['in black','in a black','in black is','wear black'],a:0,e:'介词短语作后置定语：「穿黑衣的男人」，不能说 the man in a black。'},
  {s:'The meeting will begin __.',o:['at nine o\'clock','on nine o\'clock','in nine o\'clock','nine o\'clock at'],a:0,e:'具体钟点用 at。'},
  {s:'He lives __.',o:['next to me','next me','to next me','next of me'],a:0,e:'next to 是固定介词短语：紧挨着。'},
  {s:'There is __ in today\'s newspaper.',o:['nothing new','new nothing','new something','nothing of new'],a:0,e:'不定代词的定语后置：nothing new「没什么新闻」。'},
  {s:'We had a __ meeting yesterday.',o:['well-prepared','well prepared','prepared well','prepare-well'],a:0,e:'复合形容词作前置定语要加连字符：a well-prepared meeting。'},
  {s:'She speaks English __.',o:['very well','very good','very better','good very'],a:0,e:'修饰动词 speak 用副词 well。'},
  {s:'He didn\'t notice the picture __.',o:['on the wall','on wall','in the wall','at wall'],a:0,e:'挂在墙上用 on the wall；介词短语作后置定语。'},
  {s:'The teacher asked us to keep __.',o:['quiet','quietly','quieten','quietness'],a:0,e:'keep + 宾语 + 形容词（宾补）：保持安静。'},
  {s:'__ students watched the game.',o:['Hundreds of','Three hundreds','Two hundred of','Some hundreds'],a:0,e:'泛指 hundreds of；确切数字 two hundred 不加 s 也不加 of。'}
 ]},
{id:'L3',wk:'第 3 周',t:'并列句 + 四大时态',sub:'and/but/or/so · 现在完成 · 过去完成 · 主将从现',
 teach:[
  ['并列连词：把两个句子拧在一起','<b>and</b> 顺承（然后）：He opened the door <b>and</b> walked in. 他打开门走了进去。<br><b>but</b> 转折（但是）：He is old <b>but</b> strong. 他年纪大但身体壮。<br><b>or</b> 否则：Study hard, <b>or</b> you will fail. 好好学，否则你会不及格。<br><b>so</b> 因此：It was late, <b>so</b> we went home. 天晚了，所以我们回家了。<br><b>并列主语的就近原则</b>：Neither he nor I <b>am</b> interested. 他和我都对数学不感兴趣。（动词跟最近的主语 I 一致）'],
  ['祈使句 + and / or（固定考法）','<b>祈使句 + and</b> = 「那么就会」：Work hard, <b>and</b> you will pass. 努力学，你就会通过。<br><b>祈使句 + or</b> = 「否则就会」：Hurry up, <b>or</b> we\'ll be late. 快点，否则我们要迟到了。<br>考法：给一句祈使句让你选 and / or / but / so。判断方法：后半句是「好结果」选 and，「坏结果」选 or。'],
  ['四大时态：一张结构表','<table><tr><th>时态</th><th>结构</th><th>信号词</th><th>例句</th></tr><tr><td>一般现在</td><td>do / does</td><td>often、usually、every day</td><td>He <b>goes</b> to school every day. 他每天上学。</td></tr><tr><td>一般过去</td><td>did</td><td>yesterday、last week、in 2020、ago</td><td>I <b>lost</b> my keys yesterday. 我昨天丢了钥匙。</td></tr><tr><td>现在完成</td><td>have / has + done</td><td>since、for、already、yet、just、recently、so far</td><td>I <b>have lost</b> my keys. 我把钥匙弄丢了。</td></tr><tr><td>过去完成</td><td>had + done</td><td>by the time + 过去、by last year、before + 过去</td><td>He <b>had finished</b> before I came. 我来之前他就做完了。</td></tr></table><br>做题第一步：<b>先在句子里找信号词</b>，信号词直接决定时态，这是送分题。'],
  ['现在完成时深讲（考得最多）','两个用法：<br>① <b>过去的事对现在有影响</b>：I <b>have lost</b> my keys.（丢钥匙是过去的事，但影响是「现在没钥匙开门」）<br>② <b>从过去延续到现在</b>：She <b>has taught</b> here since 2020. 从 2020 年起她一直在这里教书。（现在还在教）<br>两个「去」的辨析：<br>have <b>been to</b> Beijing 去过北京（人已经回来了）→ 可以说次数：I have been there twice.<br>have <b>gone to</b> Beijing 去了北京（人还没回来）→ 只能说别人：He has gone to Beijing.<br>易错：since + 过去时间点（since 2020），for + 时间段（for ten years），两个都配现在完成。'],
  ['过去完成时：「过去的过去」','当过去发生两件事，<b>更早的那件用过去完成</b>：<br><b>The train had left when I got to the station.</b> 我到车站时，火车已经开走了。（先开车，后到站）<br><b>He had finished his homework before his mother came back.</b> 妈妈回来之前，他已经做完了作业。<br>判断方法：句子里有「过去的时间点」（when I got there / by the end of last year），再往前的事用 had done。'],
  ['主将从现（高频铁律）','if / when / as soon as / until / unless 引导的从句，<b>用一般现在时表将来</b>：<br>✓ If it <b>rains</b> tomorrow, we will stay home. 如果明天下雨，我们就待在家里。<br>✗ If it will rain...<br>口诀：<b>主将从现</b>——主句用将来时，从句用现在时。注意只是从句换，主句照常 will。'],
  ['过去进行时','was / were + doing：「过去某一时刻正在发生」：<br><b>She was watching TV when I called her.</b> 我打电话时她正在看电视。<br>信号：when I called（过去的短暂动作）+ was doing（延续动作）。<br>信号词 Listen! / Look! 提示现在进行：Listen! Someone <b>is playing</b> the piano. 听！有人在弹钢琴。'],
  ['三个送分细节','① 客观真理、自然规律永远用一般现在：The earth <b>goes</b> around the sun. 地球绕着太阳转。<br>② 有明确过去时间（yesterday / last night / in 2020）就用一般过去，<b>不能用现在完成</b>：✗ I have seen him yesterday.<br>③ 平行结构：and 前后形式要一致：✗ He likes swimming and to run.　✓ He likes <b>swimming</b> and <b>running</b>.']],
 bank:[
  {s:'He __ his homework before his mother came back.',o:['had finished','has finished','finish','finishes'],a:0,e:'came 之前完成 → 过去的过去 → 过去完成 had finished。has finished 是现在完成，不能与过去时间 came 搭配；finish / finishes 与主谓一致和时态都不合。'},
  {s:'She __ in this school since 2020.',o:['has taught','taught','is teaching','teaches'],a:0,e:'since 与现在完成时连用。'},
  {s:'If it __ tomorrow, we will stay home.',o:['rains','will rain','rain','rained'],a:0,e:'主将从现：if 从句用一般现在表将来。'},
  {s:'Listen! Someone __ the piano.',o:['is playing','plays','played','has played'],a:0,e:'Listen! / Look! 是进行时的信号。'},
  {s:'I __ my keys. I can\'t open the door.',o:['have lost','lost','lose','had lost'],a:0,e:'过去的动作对现在造成影响 → 现在完成。'},
  {s:'He said that he __ the film before.',o:['had seen','saw','has seen','sees'],a:0,e:'宾语从句里「过去的过去」→ 过去完成。'},
  {s:'The earth __ around the sun.',o:['goes','go','is going','went'],a:0,e:'客观真理永远用一般现在时。'},
  {s:'By the end of last year, they __ three bridges.',o:['had built','have built','built','build'],a:0,e:'by + 过去时间点 → 过去完成。'},
  {s:'Neither he nor I __ interested in math.',o:['am','is','are','be'],a:0,e:'并列主语就近原则：跟最近的主语 I 一致 → am。'},
  {s:'Work hard, __ you will pass the exam.',o:['and','or','but','so'],a:0,e:'祈使句 + and = 「那么就会」。'},
  {s:'Hurry up, __ we\'ll be late.',o:['or','and','so','but'],a:0,e:'祈使句 + or = 「否则」。'},
  {s:'She __ TV when I called her.',o:['was watching','watched','is watching','has watched'],a:0,e:'过去某一时刻正在发生 → 过去进行时。'},
  {s:'My brother __ to Beijing twice.',o:['has been','has gone','is going','went'],a:0,e:'have been to 去过（人已回来）才有「两次」。'},
  {s:'He __ me about it yesterday.',o:['told','tells','has told','had told'],a:0,e:'有明确过去时间 yesterday → 一般过去时。'}
 ]},
{id:'L4',wk:'第 4 周',t:'定语从句',sub:'who / which / that / whose / where / when / 介词+which',
 teach:[
  ['它是什么 + 做题总纲','定语从句就是一个「拉长的形容词」，紧跟在它修饰的名词（<b>先行词</b>）后面。<br>The book <b>[that I bought yesterday]</b> is interesting. → 我昨天买的那本书很有趣。<br>所有定语从句题都是两步：<b>① 找先行词（是人？物？时间？地点？）② 看从句里缺什么成分</b>。这两步定答案，不需要语感。'],
  ['第一步：认先行词','紧跟从句前面的那个名词就是先行词：<br>the man <b>who</b> helped me（人）帮过我的那个人<br>the book <b>that</b> I bought（物）我买的那本书<br>the day <b>when</b> we met（时间）我们见面的那天<br>the house <b>where</b> I lived（地点）我住过的房子<br>the reason <b>why</b> he was late（原因）他迟到的原因<br>易错：先行词不一定紧贴从句——The days <b>which</b> we spent together（spent 的宾语）与 The days <b>when</b> we met（met 完整）用哪个，看第二步。'],
  ['第二步：从句缺成分吗？','<b>缺主语或宾语 → 关系代词（who/whom/which/that）</b><br>the museum <b>which</b> you visited last month（visit 缺宾语：visited <b>什么</b>？缺 → 代词）你上月参观的博物馆<br>the man <b>who</b> helped me（helped 缺主语：谁帮的？缺 → 代词）<br><b>主谓宾完整 → 关系副词（where/when/why）</b><br>the house <b>where</b> I worked（I worked 主谓完整 → 副词）我工作过的房子<br>the day <b>when</b> we met（met 完整 → 副词）<br>这就是「visited 选 which、worked 选 where」的原因——同一类先行词，答案由从句内部决定。'],
  ['关系代词细讲','<b>who</b> 指人作主语：This is the man <b>who</b> helped me. 这就是帮过我的那个人。<br><b>whom</b> 指人作宾语（正式）：the girl <b>whom</b> I met 我见过的那个女孩<br><b>which / that</b> 指物：The book <b>that</b> I bought is interesting.<br><b>whose</b> = 谁的，<b>人和物都能用</b>：<br>the girl <b>whose</b> mother is a doctor 妈妈是医生的那个女孩<br>the house <b>whose</b> windows face south 窗户朝南的那座房子<br>that 作宾语可以省略：the book (that) I bought 中的 that 可省。'],
  ['只用 that 的三种情况（必背）','① 先行词是 all / everything / nothing / anything / little：<b>All that</b> can be done has been done. 能做的都做了。<br>② 先行词被序数词、最高级修饰：This is the best film <b>that</b> I have ever seen. 这是我看过的最好的电影。<br>③ 先行词被 the only / the very / all 修饰：the only book <b>that</b> I want 我唯一想要的书。'],
  ['只用 which：逗号之后','非限制性定语从句（前面有逗号）指物时<b>只能 which，不能 that</b>，它常指代前面整件事：<br><b>He failed the exam, which made his parents angry.</b> 他考试不及格，这让父母很生气。（which = 他不及格这件事）<br>判断：逗号 + 指物 → 闭眼选 which。'],
  ['介词 + which / whom（进阶）','方法：<b>看从句里的动词和什么介词搭配，把介词提前</b>：<br>He writes <b>with</b> a pen. → The pen <b>with which</b> he writes is made in Shanghai. 他写字用的那支笔是上海造的。<br>I lived <b>in</b> the house. → the house <b>in which</b> I lived = the house <b>where</b> I lived<br>规则：介词后面只能跟 which / whom，<b>不能 that</b>：✗ with that。']],
 bank:[
  {s:'This is the man __ helped me.',o:['who','whom','which','whose'],a:0,e:'先行词是人，从句缺主语 → who。'},
  {s:'The book __ I bought yesterday is interesting.',o:['that','who','whose','where'],a:0,e:'先行词是物，从句缺宾语 → that / which。'},
  {s:'I still remember the day __ we first met.',o:['when','which','that','where'],a:0,e:'met 主谓宾完整，先行词是时间 → 关系副词 when。'},
  {s:'This is the house __ I lived ten years ago.',o:['where','which','that','when'],a:0,e:'lived 是不及物动词，从句完整 → where（= in which）。'},
  {s:'The man __ car was stolen called the police.',o:['whose','his','who\'s','which'],a:0,e:'「他的车」= whose car，物主关系用 whose。'},
  {s:'He failed the exam, __ made his parents angry.',o:['which','that','what','who'],a:0,e:'逗号后面指代整件事，只能用 which，不能用 that。'},
  {s:'All __ can be done has been done.',o:['that','which','what','who'],a:0,e:'先行词是 all → 只用 that。'},
  {s:'This is the best film __ I have ever seen.',o:['that','which','what','who'],a:0,e:'被最高级修饰的先行词 → 只用 that。'},
  {s:'The reason __ he was late is that he missed the bus.',o:['why','which','when','where'],a:0,e:'reason + 从句完整 → why。'},
  {s:'Is this the museum __ you visited last month?',o:['which','where','what','when'],a:0,e:'visited 是及物动词缺宾语 → 关系代词 which。选 where 就错了——这是最高频陷阱。'},
  {s:'The pen __ he writes is made in Shanghai.',o:['with which','with that','in which','by which'],a:0,e:'write with a pen → 介词提前：with which。that 不能紧跟介词。'},
  {s:'I\'ll never forget the days __ we spent together.',o:['which','when','where','why'],a:0,e:'spent 缺宾语 → 关系代词。别看是时间就选 when。'},
  {s:'Do you know the girl __ mother is a doctor?',o:['whose','who','which','that'],a:0,e:'「她的妈妈」= whose mother。'},
  {s:'The house __ windows face south is mine.',o:['whose','who','which','its'],a:0,e:'whose 也能指物：whose windows = 它的窗户。'}
 ]},
{id:'L5',wk:'第 5 周',t:'状语从句',sub:'时间 / 条件 / 让步 / 原因 / 目的 / 结果',
 teach:[
  ['状语从句是什么','两个句子，一个当「背景说明」（时间、条件、原因……），连接词放在两句之间：<br><b>Although</b> it rained heavily, he arrived on time. 虽然雨下得很大，他还是准时到了。<br>做题只考一件事：<b>两句之间是什么逻辑关系</b>？转折选 although、原因选 because、条件选 if。先读两句、想清楚关系，再选连词。'],
  ['六类从句一张表','<b>时间</b>：when / while / as / until / as soon as —— When I got home, my wife was cooking. 我到家时妻子在做饭。<br><b>条件</b>：if / unless（= if not）/ as long as（只要）—— You will fail <b>unless</b> you work harder. 除非你更努力，否则会失败。<br><b>让步</b>：although / though / even if（即使）/ however（无论多么）—— <b>However hard</b> he tries, he can\'t pass. 无论他多努力都过不了。<br><b>原因</b>：because / since（既然）/ as / now that（既然）—— <b>Now that</b> you have finished, you can rest. 既然做完了，你休息吧。<br><b>目的</b>：so that / in order that（以便，后接 can/may）—— He spoke slowly <b>so that</b> we could follow him. 他说得很慢，以便我们能跟上。<br><b>结果</b>：so...that / such...that —— It was <b>so</b> hot <b>that</b> we stayed indoors. 天太热了，我们只能待在室内。'],
  ['铁律一：although 和 but 不能同时出现','中文说「虽然……但是……」，英文<b>一个句子只能要一个</b>：<br>✗ <b>Although</b> he is old, <b>but</b> he works hard.<br>✓ <b>Although</b> he is old, he works hard. 虽然他年纪大了，但工作很努力。<br>同理：<b>because 和 so 不能同时出现</b>。<br>这是中国学生最高频的错误（母语迁移），考试专门设坑：选项里 although 和 but 同时出现，直接排除。'],
  ['铁律二：主将从现','时间、条件从句用<b>一般现在时表将来</b>：<br>✓ If it <b>rains</b> tomorrow, we will stay home. 如果明天下雨我们就待在家。<br>✗ If it will rain...<br>注意只有 when/if 引导<b>从句</b>时才这样；when 作疑问词时不受此限：I don\'t know when he <b>will come</b>. 我不知道他什么时候来。'],
  ['until 家族 + in case','肯定句 <b>until</b> = 直到：I\'ll wait <b>until</b> you come back. 我会等到你回来。<br><b>not...until</b> = 直到……才：He didn\'t go to bed <b>until</b> he finished his homework. 他做完了作业才去睡觉。<br><b>in case</b> = 以防万一（后接一般现在时表将来）：Take an umbrella <b>in case</b> it rains. 带把伞以防下雨。'],
  ['so 与 such 的公式（必考）','<b>so + 形容词/副词</b>：so hot that... 这么热以至于……<br><b>such + (a/an) + 形容词 + 名词</b>：He is <b>such a</b> kind man that everyone likes him. 他人这么好，人人都喜欢他。<br>四个例外用 so：<b>so many / so much / so few / so little</b> + 名词（so many books 那么多书）。<br>判断方法：中心词是形容词 → so；中心词是名词 → such（many/much/few/little 除外）。'],
  ['while / when / as 的分工','<b>while</b> + 延续动作，表「与此同时」：I was reading <b>while</b> he was cooking. 我在看书，他在做饭。<br><b>when</b> + 短暂或延续都行：When I got home, my wife was cooking. 我到家时她在做饭。（got home 是短暂动作，不能用 while）<br><b>as</b> = 一边……一边 / 随着：As I get older, I feel happier. 随着年龄增长我更快乐了。<br>判断方法：从句动作是「一瞬间」用 when，是「一段过程」用 while。'],
  ['because of 与 because（完形高频）','<b>because + 句子</b>（有主谓）：He was late <b>because</b> he missed the bus. 他迟到是因为没赶上公交。<br><b>because of + 名词/短语</b>：He was late <b>because of</b> the heavy rain. 他因为大雨迟到了。<br>同理：although + 句子，despite / in spite of + 名词。填空题先看横线后面是句子还是名词，再选。']],
 bank:[
  {s:'__ it rained heavily, he arrived on time.',o:['Although','Because','If','So'],a:0,e:'「雨大」与「准时到」是让步关系 → Although。'},
  {s:'He is __ a kind man that everyone likes him.',o:['such','so','very','too'],a:0,e:'such a + 形容词 + 名词；so 后面不能直接接 a + 名词。'},
  {s:'I\'ll wait __ you come back.',o:['until','because','though','if'],a:0,e:'肯定式 until = 直到。'},
  {s:'He didn\'t go to bed __ he finished his homework.',o:['until','when','before','while'],a:0,e:'not...until 直到…才。'},
  {s:'Take an umbrella __ it rains.',o:['in case','because of','although','so that'],a:0,e:'in case 以防（万一）。because of 后只能接名词。'},
  {s:'__ you have finished the work, you can have a rest.',o:['Now that','Because of','Even if','In case'],a:0,e:'now that = 既然（原因）。'},
  {s:'He spoke slowly __ we could follow him.',o:['so that','such that','because','until'],a:0,e:'so that + can/may = 以便（目的）。'},
  {s:'__ he was tired, he kept working.',o:['Though','Because','If','Unless'],a:0,e:'让步：虽然累但继续工作。'},
  {s:'I was reading __ he was cooking.',o:['while','when','since','until'],a:0,e:'两个延续动作同时进行 → while。'},
  {s:'You will fail __ you work harder.',o:['unless','if','when','although'],a:0,e:'unless = if not：除非你更努力，否则会失败。'},
  {s:'It was __ hot that we stayed indoors.',o:['so','such','very','too'],a:0,e:'so + 形容词 + that 结果状语从句。very 不能接 that。'},
  {s:'__ hard he tries, he can\'t pass.',o:['However','How','Whatever','Although'],a:0,e:'However + adj/adv + 主谓 = 无论多么。'},
  {s:'__ I got home, my wife was cooking.',o:['When','While','Until','Unless'],a:0,e:'got home 是短暂动作 → when；while 要接延续动作。'},
  {s:'We must hurry __ we can catch the train.',o:['so that','so','because','for'],a:0,e:'目的状语 so that：为了赶上火车。'}
 ]},
{id:'L6',wk:'第 6 周',t:'名词性从句 + it 句型',sub:'that vs what · 陈述语序 · whether vs if · it 形式主语',
 teach:[
  ['它是什么：从句当名词用','把一整句话当一个「名词」用，有四个位置：<br>· <b>主语位置</b>：__ he said at the meeting surprised us.（「他说的话」是全句主语）<br>· <b>宾语位置</b>：I know <b>that he is honest</b>. 我知道他是诚实的。<br>· <b>be 后面（表语）</b>：The question is <b>whether we can finish it</b>. 问题是我们能否按时完成。<br>· 名词后面解释内容（同位语）：the news <b>that our team won</b> 我们队获胜的消息<br>做题核心只有一件事：<b>选对引导词</b>（that / what / whether / when...）。'],
  ['that 与 what：先看从句缺不缺成分（最高频考点）','<b>what</b>：从句里<b>缺主语或宾语</b>时用。what 自己在从句里充当成分，= the thing that：<br><b>What he said at the meeting surprised us.</b>（said 缺宾语：说了<b>什么</b>？）他在会上说的话让我们吃惊。<br><b>What we need is more time.</b>（need 缺宾语：需要<b>什么</b>？）我们需要的是更多时间。<br><b>that</b>：从句<b>主谓宾完整</b>时用。that 不作任何成分、没有词义，只负责「引出这句话」：<br>The fact <b>that</b> he works hard is known to all. 他工作努力这件事众所周知。（works hard 完整）<br><b>判断口诀：从句缺成分用 what，完整用 that。</b>做两道题就熟了。'],
  ['陈述语序（判卷必扣分点）','从句一律用<b>陈述语序：主语在前、动词在后</b>。疑问词虽然带疑问意思，但语序不倒：<br>✓ Could you tell me <b>where he lives</b>? 你能告诉我他住哪儿吗？<br>✗ where does he live（把一般疑问句的语序直接搬进来——中国学生最高频错误）<br>✓ He asked me <b>if I was tired</b>. 他问我累不累。<br>一般问句变从句的公式：<b>if/whether + 陈述语序</b>。'],
  ['whether 与 if：五个位置只能 whether','① 介词后面：It depends on <b>whether</b> he agrees. 这取决于他是否同意。<br>② 不定式前面：I don\'t know <b>whether</b> to go. 我不知道要不要去。<br>③ 句首主语从句：<b>Whether</b> he will come hasn\'t been decided. 他来不来还没定。<br>④ 与 or not 连用：I don\'t know <b>whether or not</b> he will come.<br>⑤ 表语从句：The question is <b>whether</b> we can finish it.<br>记忆技巧：拿不准就选 whether——if 能用的位置它都能用，反之不行。'],
  ['it 形式主语 / 形式宾语','主语从句太长时，用 it 先占位，真主语放句尾：<br><b>It is a pity that you missed the match.</b> 你错过了比赛，真遗憾。<br><b>It hasn\'t been decided when the meeting will be held.</b> 会议何时开还没定。<br>「动词 + it + 形容词 + to do」句型：<br><b>I find it difficult to get up early.</b> 我发现早起很难。（it 代替 to get up early）<br>特例句型：<b>It is important / necessary that + 主语 + (should) 动词原形</b>——这是第 8 课虚拟语气的入口。'],
  ['同位语从句 vs 定语从句（一招区分）','同样接在名词后，看 that 从句内部完不完整：<br>· 从句<b>完整</b> → 同位语从句（that 不作成分）：the news <b>that our team had won</b> 我们队获胜的消息<br>· 从句<b>缺成分</b> → 定语从句（that 作主语或宾语）：the news <b>that</b> he told me 他告诉我的那个消息（told 缺宾语）<br>常接同位语从句的名词：news / fact / idea / hope / suggestion。']],
 bank:[
  {s:'__ he said at the meeting surprised us.',o:['What','That','Which','If'],a:0,e:'said 缺宾语 → what（= the thing that）。that 不能作成分。'},
  {s:'I don\'t know __ or not he will come.',o:['whether','if','that','what'],a:0,e:'与 or not 连用只能 whether。'},
  {s:'Could you tell me __ ?',o:['where he lives','where does he live','where he live','where lives he'],a:0,e:'宾语从句用陈述语序：主语 he 在前、动词 lives 在后。'},
  {s:'__ is a pity that you missed the match.',o:['It','That','This','What'],a:0,e:'it 形式主语，真正的主语是 that 从句。'},
  {s:'The question is __ we can finish it in time.',o:['whether','that','what','which'],a:0,e:'表语从句表「是否」用 whether，if 不能引导表语从句。'},
  {s:'We heard the news __ our team had won.',o:['that','which','what','when'],a:0,e:'同位语从句解释 news 的内容，从句完整 → that。'},
  {s:'__ the meeting will be held hasn\'t been decided.',o:['When','What','Which','If'],a:0,e:'主语从句缺时间状语 → When（何时举行）。What / Which 要在从句里充当成分，If 不能引导句首主语从句（表「是否」要用 Whether，但本题缺的是时间状语）。'},
  {s:'__ we need is more time.',o:['What','That','Which','Whether'],a:0,e:'need 缺宾语 → what 作主语从句引导词。'},
  {s:'He asked me __ .',o:['if I was tired','did I tired','if was I tired','that I was tired'],a:0,e:'一般问句 → if + 陈述语序。'},
  {s:'It is necessary __ we start at once.',o:['that','what','which','when'],a:0,e:'It is necessary that + (should) do 虚拟语气。'},
  {s:'I wonder __ he will accept the offer.',o:['whether','that','what','which'],a:0,e:'wonder 表「不知道是否」→ whether / if。'},
  {s:'__ made the school famous was its teachers.',o:['What','That','Which','It'],a:0,e:'从句缺主语 → what。'},
  {s:'The fact __ he works hard is known to all.',o:['that','which','what','why'],a:0,e:'同位语从句，从句完整 → that（不作成分）。'},
  {s:'I want to buy the same book. Please tell me __ you bought it.',o:['where','what','which','who'],a:0,e:'从句 you bought it 成分完整，前句「想买同一本」锁定问的是地点 → where。what / which 要作 bought 的宾语（已有 it），who 指人，都不合。'}
 ]},
{id:'L7',wk:'第 7 周',t:'非谓语动词',sub:'to do / doing / done · 三步判断法',
 teach:[
  ['为什么要有非谓语','英语一句话<b>只能有一个谓语动词</b>。第二个动词出场时必须「卸任」——变成非谓语形式：<br>He ran fast <b>to catch</b> the bus. 他跑得很快为了赶上公交。（ran 是谓语，catch 变 to catch）<br><b>Seeing</b> the police, the thief ran away. 看到警察，小偷跑了。（see 变 doing，ran 是谓语）'],
  ['三种形态一句话记住','<b>to do</b>：将来的、目的的（要去干、还没干）<br><b>doing</b>：主动的、进行的（正在干、主动干）<br><b>done</b>：被动的、完成的（被干、已经干完）'],
  ['判断三步法（做题就靠它）','① <b>找逻辑主语</b>：这个动作是谁做的？看主句主语。<br>② <b>判断主动还是被动</b>：逻辑主语发出动作用 doing，承受动作用 done。<br>③ <b>判断先后</b>：动作在谓语之后用 to do，在谓语之前用 having done。<br>演示：<b>__ from space, the earth looks like a blue ball.</b><br>① 逻辑主语 = the earth ② the earth 是「被看」→ 被动 ③ → <b>Seen</b> from space... 从太空看，地球像一个蓝色球体。<br>演示 2：<b>__ his homework, the boy went out to play.</b><br>① 逻辑主语 = the boy ② 主动完成作业 → doing 系 ③ 先完成才出去玩 → <b>Having finished</b>'],
  ['只接 doing 的动词（背清单）','enjoy / finish / mind / avoid / suggest / practise / keep / miss / imagine / consider<br>例：I enjoy <b>reading</b>. 我喜欢阅读。　He suggested <b>putting off</b> the meeting. 他建议推迟会议。<br>口诀：<b>建议避免享受完成</b>——suggest、avoid、enjoy、finish、mind、practise 全接 doing。<br><b>介词后面一律 doing</b>：be good at <b>swimming</b> 擅长游泳、be interested in <b>learning</b> 对学……感兴趣<br>最高频陷阱：<b>look forward to doing</b>（这里的 to 是介词，不是不定式标志）：I look forward to <b>hearing</b> from you. 期待你的回信。'],
  ['to do 与 doing 的三组高频辨析','stop <b>to do</b> 停下来去做（另一件事）vs stop <b>doing</b> 停止做（手头的事）：<br>He stopped <b>to smoke</b>. 他停下来去抽烟。　He stopped <b>smoking</b>. 他戒烟了。<br>remember / forget：<b>to do</b> 记得要做（还没做）vs <b>doing</b> 记得做过（已做）：<br>I remembered <b>to close</b> the door. 我记得要去关门（还没关，正打算关）。　I remember <b>closing</b> the door. 我记得关过门了（已关，回想动作）。<br>used to：<b>be used to doing</b> 习惯于（to 是介词）vs <b>used to do</b> 过去常常（现在不了）：<br>I\'m used to <b>getting</b> up early. 我习惯早起了。　I used to <b>get</b> up late. 我以前常晚起。'],
  ['分词作定语：主动 doing / 被动 done','单个分词放名词前，短语放名词后：<br>the <b>rising</b> sun 正在升起的太阳（太阳「升起」主动）<br><b>fallen</b> leaves 落叶（已经落下）<br>the boy <b>standing there</b> 站在那里的男孩（男孩主动站）<br>the question <b>discussed</b> at the meeting 会上讨论的问题（问题「被讨论」被动）<br>the language <b>spoken in Brazil</b> 巴西说的语言（语言「被说」）<br>判断方法：名词能不能主动发出这个动作？能 → doing；不能（是被做的）→ done。'],
  ['分词作状语：逻辑主语必须等于主句主语','<b>Given more attention, the trees could have grown better.</b> 如果给予更多照料，这些树本可以长得更好。（树「被给予」→ Given；could have grown 表示与过去事实相反）<br><b>Having finished the work, he left.</b> 做完工作后他离开了。（he 主动完成，且先于 left → having done）<br>同一个动词，逻辑主语不同，形式就不同——对比这两句：<br>· <b>Seen</b> from the hill, the city looks beautiful. 从山上看，城市很美。（city 是「被看」→ Seen）<br>· <b>Seeing</b> from the hill, we can see the whole city. 从山上我们能看到整座城市。（we 是「看」的发出者 → Seeing）<br>这就是三步法第①步的意义：先锁定「这个动作是谁做的」，再判断主动还是被动。'],
  ['三个特殊句型（背下来）','<b>It\'s no use doing...</b> 做……没有用：It\'s no use <b>crying</b> over spilt milk. 覆水难收（哭没用）。<br><b>make 的被动还原 to</b>：主动 He made me <b>work</b>. → 被动 I was made <b>to work</b>. 我被迫工作。<br><b>keep / catch / find + 宾语 + doing</b>：She kept me <b>waiting</b> for an hour. 她让我等了一个小时。']],
 bank:[
  {s:'He ran fast __ the bus.',o:['to catch','catching','caught','catch'],a:0,e:'不定式作目的状语：为了赶上。'},
  {s:'__ from space, the earth looks like a blue ball.',o:['Seen','Seeing','To see','See'],a:0,e:'the earth 与 see 是被动关系 → Seen（过去分词作状语）。'},
  {s:'I look forward to __ from you.',o:['hearing','hear','heard','be heard'],a:0,e:'look forward to 中的 to 是介词 → doing。最高频陷阱。'},
  {s:'He suggested __ the meeting.',o:['putting off','to put off','put off','to putting'],a:0,e:'suggest 只接动名词：suggest doing。'},
  {s:'The __ man was taken to hospital.',o:['injured','injuring','injure','injury'],a:0,e:'受伤的人：人与 injure 是被动 → 过去分词作定语。'},
  {s:'Do you mind __ the window?',o:['opening','to open','opened','to opening'],a:0,e:'mind 后接动名词。'},
  {s:'I remember __ the door, but it\'s open now.',o:['closing','to close','close','closed'],a:0,e:'remember doing 记得做过（已发生）；remember to do 记得要去做。'},
  {s:'__ his homework, the boy went out to play.',o:['Having finished','Have finished','Finished','To finish'],a:0,e:'先完成再出去：完成 + 主动 → having done。'},
  {s:'It\'s no use __ about it.',o:['crying','to cry','cried','cry'],a:0,e:'It\'s no use doing 固定句型：哭没有用。'},
  {s:'The question __ at the meeting is very important.',o:['discussed','discussing','which discussed','discuss'],a:0,e:'问题被讨论 → 过去分词作后置定语 = which is discussed。discussing 表主动，which discussed 缺 be，动词原形 discuss 不能直接作定语。'},
  {s:'He was made __ twelve hours a day.',o:['to work','work','working','worked'],a:0,e:'主动句 make sb do，被动句要还原 to：be made to do。'},
  {s:'I\'m used to __ up early now.',o:['getting','get','got','have got'],a:0,e:'be used to doing 习惯于；used to do 过去常常——高频辨析。'},
  {s:'__ more attention, the trees could have grown better.',o:['Given','Giving','To give','Give'],a:0,e:'树被给予关注 → Given（被动）。'},
  {s:'She kept me __ for an hour.',o:['waiting','waited','to wait','wait'],a:0,e:'keep sb doing 让某人一直做。'}
 ]},
{id:'L8',wk:'高频补充 ①',t:'被动语态 + 虚拟语气',sub:'be done 各时态 · if 虚拟三类 · suggest + (should) do',
 teach:[
  ['被动语态：什么时候用','三种情况用被动：① 不知道谁干的 ② 没必要说谁干的 ③ 想强调「被作用的对象」。<br>主动：Workers build bridges. 工人建桥。→ 被动：Bridges <b>are built</b> by workers. 桥是（工人们）建的。<br>变换步骤：<b>宾语提前当主语 → 动词变 be + 过去分词 → 原主语放 by 后面（可省）</b>。'],
  ['一个公式走天下','<b>be + 过去分词</b>。时态变化全在 be 身上，分词永远不变：<br>一般现在 is <b>cleaned</b>：The room is cleaned every day. 房间每天打扫。<br>一般过去 was <b>cleaned</b>：It was cleaned yesterday. 昨天打扫了。<br>现在进行 is <b>being cleaned</b>：It is being cleaned now. 现在正在打扫。<br>现在完成 has <b>been cleaned</b>：It has already been cleaned. 已经打扫完了。<br>将来 will <b>be cleaned</b>：It will be cleaned tomorrow. 明天会打扫。<br>情态 can <b>be cleaned</b>：It can be cleaned easily. 它很容易清洗。<br>做题方法：先判断「被动」再判断「时态」，两个信号叠加出答案。'],
  ['没有被动的动词（高频陷阱）','不及物动词<b>永远没有被动</b>，因为没有承受者：<br>happen 发生 / take place 发生 / break out 爆发 / rise 上升 / belong to 属于<br>✗ The accident was taken place...　✓ The accident <b>took place</b> on a rainy night. 事故发生在一个雨夜。<br>✗ is belonged to　✓ The car <b>belongs to</b> him. 这辆车属于他。<br>另外：主动表被动的固定用法先不管（如 The book sells well 这本书好卖），考试以「被动用 be done」为主。'],
  ['虚拟语气是什么','<b>说的话与事实相反</b>，动词就要「后退一步」（往后推一个时态）来表示假想：<br>事实：I am not you. → 假想：If I <b>were</b> you... 如果我是你（其实不是）<br>if 虚拟三类对照：<br><b>与现在相反</b>：If 从句用过去式（be 一律 were），主句 would + 原形：<br>If I <b>were</b> you, I <b>would take</b> the job. 如果我是你，我就接受这份工作。<br><b>与过去相反</b>：If 从句用 had done，主句 would have done：<br>If he <b>had worked</b> harder, he <b>would have passed</b>. 如果他当时更努力，就通过了。（事实：没努力，没通过）<br><b>与将来相反</b>：If it <b>should rain</b> / <b>were to rain</b> tomorrow... 万一明天下雨……'],
  ['省略 if 的倒装（看到 had/were 开头别慌）','if 省略后，had / were / should 提到主语前：<br>If he had known... → <b>Had he known</b>..., ...<br>If I were you... → <b>Were I</b> you, ...<br>判断方法：句子以 Had / Were / Should 开头，多半是虚拟倒装，还原 if 再理解。'],
  ['wish 与 as if','wish 后面的内容「不是真的」，动词后退一步：<br><b>I wish I were a bird.</b> 真希望我是只鸟。（现在不可能 → 过去式 were）<br><b>I wish I had gone</b> to the party. 真希望当时去了聚会。（过去没去 → had done）<br><b>He talks as if he knew everything.</b> 他说话好像什么都知道。（其实不知道 → 过去式）'],
  ['(should) do 家族：每年必考的送分题','suggest / demand / insist（坚持要求）/ order / require / propose + that + 主语 + <b>(should) 动词原形</b>：<br>He suggested that the meeting <b>(should) be put</b> off. 他建议会议推迟。<br>It is important / necessary / strange / suggested that + 主语 + <b>(should) 动词原形</b>：<br>It is important that every student <b>(should) follow</b> the rules. 每个学生都遵守纪律很重要。<br>判断标志：看见上面这些「建议/要求/命令」类词或句型，从句动词直接用原形（should 可省）——不看主语单复数！<br>另一句型：<b>would rather + 动词原形</b>：I would rather <b>stay</b> at home. 我宁愿待在家里。']],
 bank:[
  {s:'The Great Wall __ by millions of tourists every year.',o:['is visited','visits','is visiting','visited'],a:0,e:'长城被参观 + every year → 一般现在被动 is visited。'},
  {s:'English __ in many countries.',o:['is spoken','speaks','is speaking','spoken'],a:0,e:'英语被说 → is spoken。'},
  {s:'If I __ you, I would take the job.',o:['were','am','was be','was'],a:0,e:'与现在事实相反，be 一律用 were（不用 was）。'},
  {s:'If he __ harder, he would have passed the exam.',o:['had worked','worked','has worked','would work'],a:0,e:'与过去相反：if + had done，主句 would have done。'},
  {s:'I wish I __ a bird.',o:['were','am','was','be'],a:0,e:'wish 后的虚拟：与现在相反用过去式，be 用 were。'},
  {s:'He suggested that the meeting __ put off.',o:['should be','will be','would be','must be'],a:0,e:'suggest that + 主语 + (should) do。会议被推迟 → should be put off。'},
  {s:'It is important that every student __ the rules.',o:['(should) follow','follows','will follow','followed'],a:0,e:'It is important that + (should) do，用动词原形。'},
  {s:'This kind of car __ in that factory.',o:['is made','makes','is making','made'],a:0,e:'车被制造 → is made。'},
  {s:'A new bridge __ across the river next year.',o:['will be built','will build','is built','was built'],a:0,e:'next year + 被建 → will be built（将来被动）。'},
  {s:'I would rather __ at home tonight.',o:['stay','to stay','staying','stayed'],a:0,e:'would rather + 动词原形。'},
  {s:'He talks as if he __ everything.',o:['knew','knows','has known','know'],a:0,e:'as if 后用虚拟：与现在相反用过去式 knew。'},
  {s:'The accident __ on a rainy night.',o:['took place','was taken place','is taken place','taking place'],a:0,e:'take place 不及物，永远没有被动。'},
  {s:'If I __ the money, I would have bought it.',o:['had had','have had','had','have'],a:0,e:'与过去相反：if 从句用过去完成 had had。'},
  {s:'The work __ by the time you arrive tomorrow.',o:['will have been finished','will finish','has finished','finishes'],a:0,e:'by + 将来时间 → 将来完成被动：will have been done。'}
 ]},
{id:'L9',wk:'高频补充 ②',t:'倒装与强调',sub:'否定词倒装 · Only 倒装 · so/neither · It is...that 强调',
 teach:[
  ['倒装是什么、为什么倒','正常语序：主语 + 助动词 + 动词（I <b>have</b> seen it）。<br><b>部分倒装</b> = 把助动词提到主语前面，形状像一般疑问句：<b>Have</b> I seen it? → 倒装句 Never <b>have I</b> seen it. 我从未见过它。<br>触发条件只有一个：<b>否定词 / Only / so/neither 放在句首</b>。倒装不改变意思，只是「强调」的信号。'],
  ['否定词开头必倒装（公式 + 例句）','公式：<b>否定词 + 助动词 + 主语 + 动词原形</b><br>· <b>Never have I seen</b> such a beautiful place. 我从未见过这么美的地方。<br>· <b>Not until midnight did he come</b> back. 直到半夜他才回来。<br>· <b>Not only had he read</b> the book, but he also remembered... 他不仅读过这本书，还记得内容。<br>· <b>Seldom does he</b> go out. 他很少出门。<br>操作方法：找到句中的助动词（have/do/can/had...），把它搬到主语前面，其余不动。没有助动词就请 do 来帮忙（did he come）。'],
  ['Hardly...when 与 No sooner...than','固定搭配，都表「一……就……」，且必须倒装：<br><b>Hardly had I got home when</b> it began to rain. 我刚到家天就开始下雨。<br><b>No sooner had I got home than</b> the phone rang. 我一到家电话就响了。<br>记忆：<b>Hardly 配 when，No sooner 配 than</b>——前者用 when、后者用 than，混了就错。'],
  ['Only 开头倒装（注意例外）','<b>Only + 状语</b>（介词短语 / 状语从句 / 副词）开头才倒装：<br><b>Only in this way can we make</b> progress. 只有这样我们才能进步。<br><b>Only then did I realize</b> my mistake. 直到那时我才意识到错误。<br>例外：<b>Only + 主语</b>开头不倒装：Only he <b>knows</b> the answer. 只有他知道答案。（he 是主语，语序正常）<br>判断方法：看 Only 后面第一个词——是名词/代词就不倒，是介词短语或 then 等副词才倒。'],
  ['so / neither 开头：两种回答必须分清','<b>So / Neither + 助动词 + 主语</b> = 「另一个人也一样」（倒装）：<br>— I have never been there. — <b>Neither have I.</b> 我也没去过。<br>— He works hard. — <b>So does she.</b> 她也努力。<br><b>So + 主语 + 助动词</b> = 「此人确实如此」（不倒装）：<br>— He works hard. — <b>So he does.</b> 他的确很努力。<br>判断方法：前后说的是<b>不同的人</b> → 倒装；<b>同一个人</b>的确认 → 不倒装。这个辨析年年考。'],
  ['强调句：It is/was...that/who','公式：<b>It is/was + 被强调部分 + that(/who) + 其余部分</b>。用来突出句子的某一部分：<br>正常：I met her in Beijing. 我在北京遇见了她。<br>强调地点：<b>It was in Beijing that</b> I met her. 我是在北京遇见她的。<br>强调人可以用 who：It was <b>he who</b> is wrong. 是他错了。<br><b>判断法（一步搞定）</b>：去掉 It is/was...that，剩下的词能还原成完整句子 → 强调句：<br>It was in Beijing that I met her. → I met her in Beijing ✓ 完整 → 是强调句<br>It was rainy that day. → 去掉后不成立 → 只是普通主系表，不是强调句。<br>细节：强调句动词跟被强调者一致（It is he who <b>is</b> wrong）；that 不能省、指物不能用 which。'],
  ['as 让步倒装（写作加分）','把名词/形容词/副词提到 as 前面表「虽然」：<br><b>Child as he is</b>, he knows a lot. 虽然他还是个孩子，懂得却很多。<br>规则：提前的名词<b>不加冠词</b>（不说 A child as he is）；<br><b>Hard as he tried</b>, he failed. 尽管很努力，他还是失败了。<br>认识即可，写作文用一次很加分。']],
 bank:[
  {s:'Never __ such a beautiful place.',o:['have I seen','I have seen','I saw','do I see'],a:0,e:'never 开头 → 部分倒装：have I seen。'},
  {s:'Only in this way __ progress.',o:['can we make','we can make','we make','can make we'],a:0,e:'Only + 状语开头 → can we make。'},
  {s:'Hardly __ when it began to rain.',o:['had I got home','I had got home','did I get home','I got home'],a:0,e:'Hardly had...when... 固定句型，倒装。'},
  {s:'Not until midnight __ back.',o:['did he come','he came','he come','does he come'],a:0,e:'not until 开头 → 倒装 did he come。'},
  {s:'It was in Beijing __ I met her first.',o:['that','which','where','when'],a:0,e:'强调句。还原：I met her first in Beijing 完整 → that。'},
  {s:'It was because of the rain __ we stayed home.',o:['that','so','because','which'],a:0,e:'强调原因状语：It was because of...that...。'},
  {s:'— I have never been to Beijing.　— __.',o:['Neither have I','Neither I have','So have I','So I have'],a:0,e:'「我也没去过」= 否定 + also → Neither have I（倒装）。'},
  {s:'Not only __ the book, but he also remembered what he had read.',o:['had he read','he had read','he read','does he read'],a:0,e:'not only 开头 → 倒装 had he read。'},
  {s:'__ , he knows a lot.',o:['Child as he is','As he is child','He is as child','A child as he is'],a:0,e:'as 让步倒装：名词提前且不加冠词 a。'},
  {s:'It is he who __ wrong.',o:['is','are','were','be'],a:0,e:'强调句的动词跟被强调者 he 一致 → is。'},
  {s:'So loudly __ that everyone heard him.',o:['did he speak','he spoke','he speaks','spoke he'],a:0,e:'so + 副词开头 → 倒装 did he speak。'},
  {s:'— He works hard.　— __.',o:['So he does','So does he','He does so','Does so he'],a:0,e:'So he does = 他的确如此（同一人）；So does he = 另一个人也这样。'}
 ]},
{id:'L10',wk:'高频补充 ③',t:'比较结构 + 主谓一致',sub:'as...as / 倍数 / that 替代 · 就前就近 · the number of',
 teach:[
  ['原级比较 as...as','<b>as + 原级 + as</b>：He is <b>as tall as</b> his brother. 他和他哥哥一样高。<br>否定：<b>not as/so + 原级 + as</b>：It is not <b>so cold as</b> yesterday. 没有昨天冷。<br>注意两个 as 都不能省，中间放形容词/副词<b>原级</b>（不加 er / most）。'],
  ['倍数比较：两个固定公式','公式一：<b>倍数 + as...as</b>：This room is <b>three times as large as</b> that one. 这个房间是那个的三倍大。<br>公式二：<b>倍数 + the + 名词 + of</b>：This room is <b>three times the size of</b> that one.<br>两个公式等价，倍数永远放在最前面：<br>✗ as three times large as　✓ three times as large as'],
  ['比较级：修饰词与对象一致','规则一：修饰比较级用 <b>much / far / even / a little / still</b>，<b>不能用 very</b>（very 只修饰原级）：He is <b>much</b> taller than his brother. 他比他哥哥高得多。<br>规则二：比较对象必须是<b>同类事物</b>，不同类的用 that / those 代替：<br>The weather in Beijing is colder than <b>that</b> in Guangzhou. 北京的天气比广州的冷。（that = the weather；两地的天气不是一类东西，不能直接比）<br>The number of students in Class 1 is larger than <b>that</b> in Class 2. 一班的学生人数比二班多。（that = the number）<br>✗ The weather in Beijing is colder than Guangzhou.（拿「天气」跟「城市」比——错）'],
  ['the more...the more 句型','结构：<b>the + 比较级 + 主谓，the + 比较级 + 主谓</b>，表「越……越……」：<br><b>The harder</b> you work, <b>the better</b> result you will get. 你越努力，成绩就越好。<br><b>The more</b> you read, <b>the more</b> you know. 读得越多，知道得越多。<br>两个 the 都不能少，比较级后不用加 than。'],
  ['两者与三者的区别','两者比较用<b>比较级</b>：He is the <b>taller</b> of the two. 他是两人中较高的那个。（要加 the）<br>三者以上用<b>最高级 + the</b>：Tom is <b>the strongest</b> of the three boys. Tom 是三个男孩中最壮的。<br>older vs elder：older 通用（可接 than）；elder 只作定语指家人，<b>不接 than</b>：my elder brother 我哥哥。年龄差用「数字 + older」：She is three years <b>older</b> than I. 她比我大三岁。'],
  ['不接 than 的比较词（高频陷阱）','superior（优于）/ inferior（劣于）/ senior（年长于）/ junior（年幼于）+ <b>to</b>，<b>没有 than</b>：<br>This car is superior <b>to</b> that one. 这辆车比那辆好。<br>✗ superior than。这四个词来自拉丁比较级，自带 to。'],
  ['主谓一致：就前与就近','<b>就前原则</b>：主语后面跟着 as well as / together with / along with / but / except 时，动词跟<b>前面的主语</b>一致：<br>The teacher, <b>as well as</b> the students, <b>is</b> going to attend. 老师和学生们都要参加。（跟 the teacher 一致 → is）<br><b>就近原则</b>：either...or / neither...nor / not only...but also 连接主语时，动词跟<b>最近的主语</b>一致：<br>Either you or he <b>is</b> to blame. 不是你就是他该受责备。（跟 he 一致 → is）<br>each / every / either / neither + 单数名词 → 单数动词：Each of them <b>has</b> a car.'],
  ['number 家族：一个字母之差（必考）','<b>The number of</b> + 复数名词 = 「……的数量」（中心词是 number）→ <b>单数动词</b>：<br>The number of students <b>is</b> increasing. 学生人数在增加。<br><b>A number of</b> + 复数名词 = 「许多……」（= many，中心词是 students）→ <b>复数动词</b>：<br>A number of students <b>are</b> present. 许多学生到场了。<br>同理：the percentage of + 单数动词；分数/百分数 + of + 名词时，动词跟 of 后面的名词一致：Two thirds of the water <b>is</b> polluted. 三分之二的水被污染了。']],
 bank:[
  {s:'This room is __ that one.',o:['three times as large as','as three times large as','three times larger as','large three times as'],a:0,e:'倍数公式：倍数 + as...as。'},
  {s:'He is __ taller than his brother.',o:['much','very','more','most'],a:0,e:'比较级用 much/far/even 修饰，very 只修饰原级。'},
  {s:'The population of China is larger than __ of the USA.',o:['that','those','it','one'],a:0,e:'比较对象要同类：that 代替 the population（单数用 that）。'},
  {s:'__ you work, __ result you will get.',o:['The harder;the better','Harder;better','The harder;better','More hard;better'],a:0,e:'the + 比较级..., the + 比较级...：越……越……。'},
  {s:'The teacher as well as the students __ going to attend.',o:['is','are','have','be'],a:0,e:'as well as 就前原则：动词跟 the teacher 一致 → is。'},
  {s:'The number of students __ increasing.',o:['is','are','have been','were'],a:0,e:'The number of（……的数量）→ 单数动词。'},
  {s:'A number of students __ present.',o:['are','is','was','been'],a:0,e:'A number of（许多）→ 复数动词。与 The number of 对照记。'},
  {s:'Either you or he __ to blame.',o:['is','are','am','be'],a:0,e:'either...or 就近原则：跟 he 一致 → is。'},
  {s:'She is three years __ than I.',o:['older','old','elder','more old'],a:0,e:'数字 + older；elder 只作定语（elder brother），不接 than。'},
  {s:'He is the __ of the two boys.',o:['taller','tallest','tall','more tall'],a:0,e:'两者之中「较……的那个」用 the + 比较级。'},
  {s:'Learning English is __ than teaching it.',o:['easier','more easy','easy','easiest'],a:0,e:'easy 的比较级是 easier（变 y 为 i 加 er），不是 more easy。'},
  {s:'Tom is __ of the three boys.',o:['the strongest','strongest','strong','the stronger'],a:0,e:'三者以上用最高级，前面加 the。'}
 ]}
 ];

const BANK_X={
 L1:[
  {s:'There __ two books and a pen on the desk.',o:['are','is','be','have'],a:0,d:2,e:'there be 就近原则：跟最近的 two books 一致 → are。对比「a pen and two books」那句——最近的名词是谁，be 就跟谁。'},
  {s:'My uncle __ when he came to visit us.',o:['brought me a gift','brought a gift me','brought for me a gift','me brought a gift'],a:0,d:2,e:'双宾：bring sb sth，人前物后，宾语用宾格。要强调「为某人」可改写成 bring a gift for me。'},
  {s:'We found __ strange that nobody mentioned the accident.',o:['it','that','this','what'],a:0,d:2,e:'it 形式宾语：真正的宾语是后面的 that 从句。find it + adj + that... 是固定结构。'},
  {s:'__ no use arguing with him now.',o:['It is','That is','This is','He is'],a:0,d:3,e:'It is no use doing 是固定句型，it 形式主语，真正主语是 arguing。中文意思是「跟他吵也没用」。'},
  {s:'Her suggestion sounds __.',o:['reasonable','reasonably','reason','to be reasonable'],a:0,d:2,e:'系动词 sound 后接形容词作表语。reasonably 是副词，不能作表语。'},
  {s:'The old man who lives next door __ his dog every evening.',o:['walks','walk','walking','is walking'],a:0,d:3,e:'先砍修饰（who lives next door），主干是 The old man walks his dog。every evening 表习惯 → 一般现在时，第三人称单数加 s。'},
  {s:'We consider him __ honest man.',o:['an','a','the','不填'],a:0,d:2,e:'宾补是名词短语 an honest man。honest 的 h 不发音，以元音音素开头 → an。冠词看读音不看拼写。'}
 ],
 L2:[
  {s:'Is there __ in today\'s newspaper?',o:['anything interesting','interesting anything','something interested','interesting something'],a:0,d:2,e:'不定代词的修饰语一律后置（anything interesting）；疑问句一般用 anything。something 只用于表请求、建议或期待肯定回答的疑问句，本题没有这种语境。'},
  {s:'He is not __ to carry the heavy box.',o:['strong enough','enough strong','too strong','so strong'],a:0,d:2,e:'enough 修饰形容词必须后置：strong enough。enough strong 是错误语序。'},
  {s:'The box is __ heavy for me __ carry.',o:['too...to','so...that','very...to','too...that'],a:0,d:2,e:'too + adj + to do = 太……而不能。so...that 后面要接完整从句，不能接 to do。'},
  {s:'She bought __ bag yesterday.',o:['a beautiful little red','a red beautiful little','a little beautiful red','a red little beautiful'],a:0,d:3,e:'多个形容词排序：观点(beautiful) → 大小(little) → 颜色(red)。真题冷门点，记住口诀「观点-大小-形状-颜色」。'},
  {s:'He __ goes to the cinema because he is always busy.',o:['seldom','seldomly','not often he','never not'],a:0,d:2,e:'频度副词放实义动词前。seldom 本身含否定意义，不能再加 not。'},
  {s:'We will have a picnic tomorrow __ it rains.',o:['unless','if','because','although'],a:0,d:2,e:'unless = if not（除非 / 如果不）。不下雨才去野餐，逻辑是条件。'},
  {s:'My brother works __ than I do.',o:['much harder','very harder','more harder','hard'],a:0,d:3,e:'双重考点：修饰比较级用 much / far / even（不能用 very）；hard 的比较级是 harder，不加 more。'}
 ],
 L3:[
  {s:'He __ his keys, so he cannot open the door now.',o:['has lost','lost','loses','was losing'],a:0,d:2,e:'强调对现在的影响（现在开不了门）→ 现在完成时。后半句的 now 是信号。'},
  {s:'It __ since nine o\'clock this morning.',o:['has been raining','is raining','rained','rains'],a:0,d:2,e:'since + 过去时间点 → 现在完成（进行）时，动作从九点延续到现在。'},
  {s:'By the time you arrive tomorrow, I __ the report.',o:['will have finished','will finish','have finished','finished'],a:0,d:3,e:'by + 将来时间 → 将来完成时 will have done：「到明天你来时，我将已经写完」。'},
  {s:'This is the first time I __ this city.',o:['have visited','visited','will visit','visit'],a:0,d:3,e:'It/This is the first time + 现在完成时，固定搭配。真题年年考。'},
  {s:'Study hard, __ you will fall behind.',o:['or','and','so','but'],a:0,d:2,e:'祈使句 + or = 否则；+ and = 就会。这里语义是「否则会落后」。'},
  {s:'He told me that he __ the film before.',o:['had seen','has seen','saw','sees'],a:0,d:2,e:'「看电影」发生在「告诉」之前 → 过去的过去 → 过去完成时 had seen。before 是信号词。'},
  {s:'I __ to visit you last night, but it rained heavily.',o:['was planning','plan','have planned','plans'],a:0,d:3,e:'was planning 表「过去正打算（但没实现）」，与 but 后的转折呼应；空格后已有 to visit，plan / plans 既不合主语时态也接不上，have planned 是现在完成，不能配明确的过去时间 last night。'},
  {s:'The teacher said that light __ much faster than sound.',o:['travels','traveled','had traveled','would travel'],a:0,d:3,e:'宾语从句表达客观真理时，永远用一般现在时，不受主句过去时限制。'}
 ],
 L4:[
  {s:'This is the school __ my son studies.',o:['where','which','that','whose'],a:0,d:2,e:'studies 主谓宾完整，只缺地点状语 → where。对比：the school which we visited（visit 缺宾语）。'},
  {s:'The house __ windows face south belongs to Mr. Li.',o:['whose','which','its','that'],a:0,d:3,e:'「房子的窗户」= whose windows。whose 不只指人，物也可以用。'},
  {s:'He failed the exam again, __ made his parents very angry.',o:['which','that','what','it'],a:0,d:3,e:'逗号后面的非限制性定语从句指代前面整件事 → 只能用 which，不能用 that。'},
  {s:'I still remember the days __ we spent together in the countryside.',o:['which','when','in which','on which'],a:0,d:3,e:'最高频陷阱：spend 缺宾语（spent the days）→ 用 which。判断方法永远是看从句动词缺不缺成分，不看先行词是时间就选 when。'},
  {s:'The man about __ you talked just now is our new manager.',o:['whom','who','which','that'],a:0,d:3,e:'介词后面指人只能用 whom。that 不能紧跟在介词后面。'},
  {s:'__, the earth is round.',o:['As is known to all','Which is known to all','That is known to all','It is known to all'],a:0,d:3,e:'as 引导非限制性定语从句可以放句首，意为「正如」。which 引导的从句不能放句首。'},
  {s:'The reason __ he was late was that he missed the bus.',o:['why','which','that','because'],a:0,d:2,e:'the reason why... was that...（不能用 because）。两个考点：why 引导定语从句 + that 引导表语从句。'}
 ],
 L5:[
  {s:'__ he is very busy, he always helps us with the work.',o:['Although','Because','Until','If'],a:0,d:2,e:'两句逻辑是让步转折 → Although。记住铁律：句子里不能再出现 but。'},
  {s:'__ hard he tries, he cannot catch up with us.',o:['However','Whatever','Although','No matter'],a:0,d:3,e:'However + adj/adv + 主谓 = 无论多么……。No matter 后面必须加 how 才行，不能直接接 hard。'},
  {s:'Take your umbrella __ it rains.',o:['in case','so that','even if','until'],a:0,d:2,e:'in case = 以防万一。so that 表目的（以便），语义不通。'},
  {s:'The problem was __ difficult __ nobody could solve it.',o:['so...that','too...to','such...that','very...that'],a:0,d:2,e:'so + 形容词 + that + 从句。too...to 后面接动词原形，不接从句。'},
  {s:'__ the heavy rain, they went on working.',o:['Despite','Although','Because','Even if'],a:0,d:3,e:'Despite + 名词短语；Although + 完整句子。the heavy rain 是名词短语 → Despite。这是真题设坑的标准手法。'},
  {s:'I will not believe it __ I see it with my own eyes.',o:['until','after','when','if'],a:0,d:2,e:'not...until = 直到……才。'},
  {s:'__ I know, he has no difficulty in learning English.',o:['As far as','As long as','As well as','So that'],a:0,d:3,e:'as far as I know = 据我所知。as long as = 只要。四个短语长得像，考辨析。'}
 ],
 L6:[
  {s:'__ we will go camping tomorrow depends on the weather.',o:['Whether','If','That','What'],a:0,d:3,e:'句首主语从句表「是否」只能用 whether，if 不能引导句首主语从句。'},
  {s:'__ breaks the law will be punished.',o:['Whoever','Who','Anyone','Those who'],a:0,d:3,e:'whoever = anyone who，一个词既引导从句又作从句主语。Anyone 后面还缺一个 who。'},
  {s:'Word came __ he had won the first prize.',o:['that','what','which','when'],a:0,d:3,e:'同位语从句解释 word/news 的内容，从句完整 → that。容易被误判为定语从句——判断方法：that 在从句里不作任何成分。'},
  {s:'He asked me __ I had ever been to Beijing.',o:['if','that','what','which'],a:0,d:2,e:'一般问句变宾语从句：if/whether + 陈述语序，时态跟着主句的 asked 用过去范畴。'},
  {s:'It depends on __ he will agree.',o:['whether','if','that','what'],a:0,d:2,e:'介词 on 后面只能用 whether，不能用 if。whether 的四个特权之一。'},
  {s:'I don\'t know __ to accept the offer.',o:['whether','if','that','what'],a:0,d:2,e:'不定式前面用 whether to do，if 不能直接接不定式。whether 的四个特权之二。'},
  {s:'This is the city __ I spent my childhood.',o:['where','which','that','when'],a:0,d:3,e:'spend my childhood 后面缺地点（spent my childhood in the city）→ where。如果句子是 the city which I visited 就选 which。'}
 ],
 L7:[
  {s:'__ from space, the earth looks like a blue ball.',o:['Seen','Seeing','To see','See'],a:0,d:2,e:'地球是「被看」→ done 表被动。逻辑主语 the earth 与 see 是被动关系。'},
  {s:'He hurried to the station, only __ the train had left.',o:['to find','finding','found','find'],a:0,d:3,e:'only to do 表出乎意料的结果：「结果却发现」。真题高频考点。'},
  {s:'I regret __ you that you failed the exam.',o:['to tell','telling','tell','told'],a:0,d:3,e:'regret to do = 遗憾地要做（坏消息还没说）；regret doing = 后悔做过。这里是「遗憾地通知」。'},
  {s:'__ is believing.',o:['Seeing','To see','Seen','See'],a:0,d:2,e:'动名词作主语表示一般事实：Seeing is believing 眼见为实。'},
  {s:'The problem __ at the meeting yesterday is very important.',o:['discussed','discussing','to discuss','having discussed'],a:0,d:2,e:'problem「被讨论」且 yesterday 已完成 → done 作后置定语。现在分词 discussing 表主动，不对。'},
  {s:'He apologized for __ able to come to my party.',o:['not being','being not','not to be','to not be'],a:0,d:3,e:'介词 for 后接动名词；否定式把 not 放在 doing 前面：not being able to。双重考点。'},
  {s:'With the work __, he went home happily.',o:['finished','finishing','to finish','finish'],a:0,d:2,e:'with + 名词 + done 复合结构：work 与 finish 是被动关系（工作被完成）。'}
 ],
 L8:[
  {s:'A new hospital __ in our town next year.',o:['will be built','will build','is built','has been built'],a:0,d:2,e:'next year 将来 + 医院被建 → will be done。时间信号与语态两个考点。'},
  {s:'The project __ by the end of last month.',o:['had been completed','has been completed','was completed','completed'],a:0,d:3,e:'by + 过去时间 → 过去完成；工程是被完成 → had been done。「过去的过去 + 被动」叠加，冲刺级。'},
  {s:'If I __ you, I would take the chance.',o:['were','was','am','would be'],a:0,d:2,e:'与现在相反的虚拟：if I were you 固定用法，一律用 were，不用 was。'},
  {s:'__ it rain tomorrow, we would put off the sports meeting.',o:['Should','Would','Will','Must'],a:0,d:3,e:'省略 if 的虚拟：should rain = if it should rain，把 should 提到句首构成倒装。与将来相反。'},
  {s:'The teacher demanded that the exam __ before Friday.',o:['(should) be finished','would be finished','was finished','must be finished'],a:0,d:3,e:'demand + that + 主语 + (should) do；这里是被动 → (should) be finished。虚拟语气 + 被动叠加。'},
  {s:'It is high time we __.',o:['went to bed','go to bed','will go to bed','have gone to bed'],a:0,d:3,e:'It is (high) time that + 过去式 = 该是……的时候了。虚拟语气固定句型，必须用过去式。'},
  {s:'I would rather you __ tomorrow.',o:['came','come','will come','had come'],a:0,d:3,e:'would rather + 从句用过去式表「宁愿」（指现在 / 将来）。区别于 would rather do（自己宁愿做）。'},
  {s:'The accident __ on a rainy night last month.',o:['took place','was taken place','took place of','was happened'],a:0,d:2,e:'take place / happen 是不及物动词，永远没有被动。was taken place 是经典错误选项。'}
 ],
 L9:[
  {s:'Never before __ such a beautiful sunset.',o:['have I seen','I have seen','I saw','did I saw'],a:0,d:3,e:'否定词 Never 开头 → 部分倒装：助动词 have 提到主语 I 前面。D 选项时态还不对（did 后接原形）。'},
  {s:'Only when he returned home __ what had happened.',o:['did he learn','he learned','he did learn','learned he'],a:0,d:3,e:'Only + 状语从句开头，主句倒装：did he learn。注意倒装的是主句，从句本身不倒装。'},
  {s:'__ than it began to rain.',o:['No sooner had I got home','No sooner I had got home','Hardly had I got home','As soon as I got home'],a:0,d:3,e:'No sooner...than 固定配对，No sooner 开头倒装。Hardly 要与 when 配对，不与 than；As soon as 是「一……就」不与 than 搭配。'},
  {s:'—They have finished the work. —__.',o:['So they have','So have they','So they do','So do they'],a:0,d:3,e:'同一人「确实如此」→ So + 主语 + 助动词（不倒装）；另一人也一样 → So + 助动词 + 主语（倒装）。这里说「他们的确做完了」，助动词跟 have finished 用 have。'},
  {s:'It was not until midnight __ he came back.',o:['that','when','which','so'],a:0,d:2,e:'not until 的强调句固定形式：It was not until...that...'},
  {s:'Hardly __ sat down when the phone rang.',o:['had he','he had','did he','he did'],a:0,d:3,e:'Hardly...when 配对，Hardly 开头倒装：had he sat down（过去的过去用过去完成）。'},
  {s:'It was in the countryside __ I spent my childhood.',o:['that','where','when','which'],a:0,d:2,e:'强调句判断法：去掉 It was...that 还原成 I spent my childhood in the countryside，句子完整 → 是强调句，用 that。不要被地点迷惑选 where。'}
 ],
 L10:[
  {s:'The population of China is larger than __ of Japan.',o:['that','those','this','it'],a:0,d:2,e:'比较对象要一致：population 不可数 → that of Japan。those 用于可数复数。'},
  {s:'He is __ of the two brothers.',o:['the taller','the tallest','taller','tall'],a:0,d:3,e:'两者之中「较……的那个」也要加 the：the taller of the two。真题经典陷阱——看到 two 就以为用比较级不加 the。'},
  {s:'Our school is three times __ theirs.',o:['the size of','as size as','larger as','so large than'],a:0,d:3,e:'倍数 + the + 名词 + of = 是……的几倍。也可以说 three times as large as。'},
  {s:'Mary, along with her parents, __ moved to Canada.',o:['has','have','are','were'],a:0,d:3,e:'along with 就前原则：谓语跟 Mary 一致 → 单数 has。插入语和逗号不影响主谓一致。'},
  {s:'Twenty percent of the water in the lake __ polluted.',o:['is','are','were','have'],a:0,d:3,e:'百分数 + of + 名词，动词跟名词一致：water 不可数 → is。若后面是可数复数（如 students）则用 are。'},
  {s:'The more we get together, __ we will be.',o:['the happier','happier','the more happy','happiest'],a:0,d:2,e:'the + 比较级, the + 比较级 = 越……越……。happy 的比较级是 happier（变 y 为 i）。'},
  {s:'This car is superior __ that one in quality.',o:['to','than','over','from'],a:0,d:2,e:'superior / inferior / senior / junior + to，永远不接 than。'}
 ]
};

const GENS={
 L3:function(){
  const out=[];
  const verbs=[['finish','finished','finished','my work'],['see','saw','seen','the film'],['do','did','done','my homework'],['write','wrote','written','the report'],['eat','ate','eaten','lunch'],['buy','bought','bought','the book'],['take','took','taken','the bus']];
  const sig=[['yesterday','past','有明确过去时间 yesterday → 一般过去时'],
   ['last night','past','last night 是过去时间信号'],
   ['already','perf','already 是现在完成的信号 → have/has done'],
   ['so far','perf','so far 到目前为止 → 现在完成'],
   ['by the time he arrived','pp','by + 过去动作 → 过去的过去 → 过去完成'],
   ['every day','pres','every day 表习惯 → 一般现在时']];
  for(const v of verbs){ for(const s of sig){
    const forms={past:v[1],pp:'had '+v[2],perf:'have '+v[2],pres:v[0]};
    const ans={past:forms.past,pp:forms.pp,perf:forms.perf,pres:v[0]}[s[1]];
    const wrongs=[];
    ['past','pp','perf','pres'].forEach(k=>{ if(k!==s[1]) wrongs.push(forms[k]); });
    const uniq=[...new Set(wrongs)].filter(w=>w!==ans);
    out.push({s:'I __ '+v[3]+' '+s[0]+'.',o:[ans].concat(uniq.slice(0,3)),a:0,e:s[2]});
  }}
  return out;
 },
 L8:function(){
  const out=[];
  const objs=[['room','cleaned'],['car','repaired'],['bridge','built'],['report','written'],['novel','translated']];
  const sig=[
   ['every day','is %V%','一般现在被动：is + 过去分词','was %V%','is being %V%','has been %V%'],
   ['last week','was %V%','一般过去被动：was + 过去分词','is %V%','had been %V%','will be %V%'],
   ['right now','is being %V%','now 表正在进行中的被动：is being done','is %V%','was being %V%','has been %V%'],
   ['already','has been %V%','already 表已完成的被动：has been done','is %V%','had been %V%','is being %V%'],
   ['next month','will be %V%','next month 表将来被动：will be done','will %V%','is %V%','has been %V%']];
  for(const o of objs){ for(const s of sig){
    const opts=[s[1]].concat(s.slice(3)).map(x=>x.split('%V%').join(o[1]));
    out.push({s:'The '+o[0]+' __ by the workers '+s[0]+'.',o:opts,a:0,e:s[2]});
  }}
  return out;
 }
};

