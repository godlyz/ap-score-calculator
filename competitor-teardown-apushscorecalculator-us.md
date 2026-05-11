# apushscorecalculator.us 竞品拆解

日期：2026-05-10  
项目：AP Score Calculator / apscorecalculator.store  
主竞品：https://apushscorecalculator.us/

## 1. 结论先行

apushscorecalculator.us 不是一个“只靠 calculator 就能赢”的页面，而是一个成熟的 APUSH 单科工具页。它的核心优势不是花哨设计，而是把用户最想完成的任务拆得很顺：先算分，再解释，再给提分路径，再用 FAQ 和资源内链承接后续搜索。

对我们来说，最值得借的是“单科聚焦 + 计算器优先 + 解释内容围绕提分问题展开”的信息架构；最该超越的是它的结果表达深度、2026 freshness、浏览器本地隐私表达、gap to target、near-cutoff 提示、以及站级 AP 矩阵联动。

## 2. 取样与来源

本次拆解基于以下来源：

- 页面正文与 metadata 抓取：https://apushscorecalculator.us/
- 浏览器 snapshot 与 DOM inspection
- 对比参照：当前站点 apscorecalculator.store 的 APUSH 页
- 参考官方结构：College Board AP U.S. History assessment 页面

补充说明：直接浏览器访问该站触发了 Cloudflare 检查页，因此结构判断以 reader 读取正文 + DOM/metadata 为主，属于公开页面的保守分析。

## 3. 页面 IA（信息架构）

### 3.1 主结构

页面层级非常清楚，基本是：

1. Hero
2. Calculator
3. How it works
4. Exam format / scoring explanation
5. What score do you need?
6. Score distribution
7. Study resources
8. FAQ
9. About + footer legal

这个顺序符合 APUSH 用户意图：先输入 raw score，立即得到预测，再继续阅读解释和提分路径。

### 3.2 IA 优点

- 任务导向强，符合 search intent。
- Calculator 不是埋在长文里，而是首屏附近直接出现。
- 支持“算分后继续学习”的延伸路径，不是纯工具页一次性退出。
- 内链密度高，但不是乱堆链接，而是围绕 APUSH scoring、DBQ、LEQ、study plan 展开。

### 3.3 IA 缺点

- 内容层次偏传统，页面后半段较长，移动端可能滚动成本高。
- 资源内链多，但站级产品感弱，更多像“内容站 + 工具页”的组合。
- 结果解释虽然清楚，但缺少更强的个性化结果层，如 gap to 3/4/5、confidence、near-cutoff warning。

## 4. Hero 拆解

### 4.1 Hero 结构

Hero 的核心信息是：

- AP U.S. History · Free Score Calculator
- 输入 MCQ、SAQ、DBQ、LEQ
- 立即得到 1–5 预测
- 了解考试前要修正什么
- Unofficial / based on typical scoring patterns

### 4.2 Hero 优点

- 关键词覆盖准确：APUSH score calculator、AP U.S. History、free、score estimator。
- 价值主张清晰，几乎没有废话。
- 直接给用户“算分 + 修正”的心理收益。

### 4.3 Hero 缺点

- 2025/2026 freshness 表达不够统一，title 还是 2025，但正文已经偏 2026 语境。
- 没有显式强调“无需登录 / 浏览器本地 / 不存储输入”，隐私信任点略弱。
- CTA 是“Open calculator”，但没有更强的结果导向承诺，例如 gap to next band 或 confidence label。

## 5. Calculator UX

### 5.1 输入设计

输入项非常标准：

- MCQ correct: 0–55
- SAQ total points: 0–9
- DBQ: 0–7
- LEQ: 0–6

这是这个 SERP 的基本盘，说明页面完全贴合 APUSH 评分结构。

### 5.2 交互优点

- 输入字段简单，没有额外门槛。
- 用户一眼知道怎么填。
- 直接把各 section 权重写在输入附近，降低理解成本。
- 提示文字友好，告诉用户“用 timed practice test 的结果”。

### 5.3 交互缺点

- 计算逻辑偏“标准化”，但缺少更细的边界解释。
- 没有明显的“near cutoff”提示。
- 没有 what-if 交互，例如“DBQ +1 会不会把我从 3 拉到 4”。
- 移动端结果区可能较长，尤其在图表和解释并存时。

## 6. 结果呈现

### 6.1 当前结果表达

页面输出：

- predicted AP score
- composite score (out of 100)
- section contributions
- score band（1–5）
- result interpretation 文案

### 6.2 优点

- 结果很快，用户能立刻看到分数。
- section contributions 很有解释力，知道哪个部分贡献最大。
- 0–100 composite 容易理解，和 score band 的映射也很直观。

### 6.3 缺点

- 只有“你是几分”，没有“你离 4/5 还差多少”。
- 没有 confidence 分层，不知道结果是稳定还是临界。
- 没有 near-cutoff 风险提示，容易让用户误以为分数是绝对值。
- 缺少更强的行动建议，比如“下一步先补 DBQ 还是 LEQ”。

## 7. Score table / scoring explanation

### 7.1 页面做得好的地方

- 明确列出 section weights：MCQ 40%、SAQ 20%、DBQ 25%、LEQ 15%。
- 计算公式在正文中可见，不藏在 JS 里。
- 说明了 cutoffs 只是 approximate，降低误导风险。

### 7.2 可借鉴点

- 公式透明，是建立信任的关键。
- 分数区间表清晰，降低理解门槛。
- 让用户能自己验证 calculator，不只是“黑箱结果”。

### 7.3 可超越点

- 我们可以在透明公式之外，再加“gap to next band”。
- 我们可以把 0–100 或 0–130 的映射解释得更直观。
- 我们可以把 each section 的边际价值说得更清楚，例如 DBQ 25% 为什么常常是提分杠杆。

## 8. FAQ

### 8.1 覆盖内容

它的 FAQ 主要围绕：

- 准确性
- 分数来源
- 某一 section 拖后腿怎么办
- 何时使用 calculator

### 8.2 优点

- FAQ 紧扣“算完分之后会问什么”。
- 不是泛泛的学校官网式问答。

### 8.3 缺点

- FAQ 偏通用，还可以更 APUSH-specific。
- 没有直接回答“我需要多少分才能拿 3/4/5”。
- 没有回答“为什么别的网站算出来不一样”。
- 没有明确说明“输入是否存储”。

## 9. 内容深度

### 9.1 它的深度来源

这个站不是靠一篇大文取胜，而是靠一套围绕 APUSH 的内容网络：

- Scoring explained
- Score distribution
- DBQ rubric
- LEQ rubric
- 3-month study plan
- Tips & guides hub

### 9.2 价值

这套结构非常适合 SEO，因为它不仅满足主词，也承接了大量长尾意图：

- APUSH DBQ rubric
- APUSH LEQ rubric
- APUSH scoring explained
- APUSH score distribution
- APUSH study plan

### 9.3 风险

- 单科站扩展性有限，站级联动弱。
- 如果别的站在同类内容上做得更完整，单页站容易被平台型产品压制。

## 10. 视觉与界面感受

### 10.1 强项

- 结构很“工具站”，用户一眼知道这里能做什么。
- 版面秩序清楚，不会迷路。
- 结果区和解释区分层明确。

### 10.2 弱项

- 视觉更偏实用主义，品牌记忆点不强。
- 看起来像成熟信息站，不像有设计系统的产品页。
- 若移动端文案堆得太满，容易造成折行拥挤。

## 11. 内链与站点扩展

### 11.1 观察结果

它的内链很多，而且围绕 APUSH 主题展开得很完整：

- scoring explained
- score distribution
- DBQ rubric
- LEQ rubric
- study plan
- tips hub
- about / legal / contact

### 11.2 这说明什么

这个站已经不是“一个 calculator 页面”，而是一个围绕 APUSH 的内容集群入口。

### 11.3 我们应该怎么做

我们不应该只学它的单页结构，而要把它的内容深度升级成站级矩阵：

- APUSH 只是一个强入口
- 还要把 AP World / AP Gov / AP Lang / AP Bio 等矩阵串起来
- 在结果区下方放真正有用的 related calculators，而不是 footer 里弱化处理

## 12. Borrow / Adapt / Avoid

### 12.1 Borrow

1. 单科聚焦的页面节奏
   - Hero → calculator → explanation → FAQ → resources

2. 公式透明
   - 直接写出 section weights 和 conversion logic

3. 结果后继续学习
   - 让 calculator 不是终点，而是提分路径入口

4. APUSH-specific FAQ
   - 用用户真实问题组织 FAQ，而不是泛模板

### 12.2 Adapt

1. 结果区升级
   - 加 gap to 3/4/5
   - 加 near-cutoff badge
   - 加 confidence label
   - 加 section-aware recommendation

2. 站级联动
   - 用我们的 AP subject matrix 做更强的内部转化

3. 隐私表达
   - 明确 browser-local / no signup / no storage

4. 2026 freshness
   - 把 2026 写到 title、H1、hero、methodology、last updated 中一致化

5. 移动端优化
   - 首屏尽快出现输入卡片
   - 结果卡片紧跟输入
   - 长表格 card 化

### 12.3 Avoid

1. 不要只做一个“能算分”的黑箱工具
2. 不要把 explanation 写成长墙文本
3. 不要只给 1–5，不给用户下一步
4. 不要忽略移动端首屏体验
5. 不要在 FAQ 里回答太泛的空话
6. 不要让 title、H1、正文年份不一致

## 13. 对我们站点的直接结论

如果我们要重做 apscorecalculator.store 的 APUSH 页，apushscorecalculator.us 给出的不是“样式参考”，而是“内容骨架参考”。真正要赢，必须在以下四点上超过它：

- 更清楚的结果解释
- 更强的 2026 freshness
- 更实用的提分建议
- 更完整的站级矩阵联动

换句话说：

- 它赢在“成熟、完整、清楚”
- 我们要赢在“更现代、更可执行、更能把用户带到下一步”

## 14. 交付建议

下一步重建 APUSH 页时，建议优先落地：

- hero + calculator 一体化
- scoring formula 正文化
- official exam structure 模块
- score distribution 模块
- APUSH-specific FAQ
- related calculators / hub 联动
- browser-local privacy microcopy

## 15. Sources

- https://apushscorecalculator.us/
- https://test-ninjas.com/ap-us-history-score-calculator
- https://www.collegeboard.org/
- 当前项目 brief: /root/.hermes/kanban/boards/outbound-sites/workspaces/t_830a4536/full-redesign-rebuild-brief.md
