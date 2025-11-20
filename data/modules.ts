
import { Module, Difficulty } from '../types';

export const modules: Module[] = [
  {
    id: 'sqli',
    title: { en: 'SQL Injection (SQLi)', zh: 'SQL 注入 (SQLi)' },
    shortDescription: { en: 'Manipulate database queries to leak data.', zh: '通过篡改数据库查询来泄露敏感数据。' },
    fullDescription: { en: 'SQL Injection occurs when untrusted user input is dynamically concatenated into a database query without validation.', zh: '当不可信的用户输入在未经验证的情况下直接拼接到数据库查询语句中时，就会发生SQL注入。攻击者可以以此干扰应用程序与数据库的交互。' },
    difficulty: Difficulty.APPRENTICE,
    category: { en: 'Injection', zh: '注入攻击' },
    icon: 'Database',
    interactiveType: 'sqli',
    content: {
      en: `
### How it works
Applications often use SQL queries to retrieve data. If the application constructs these queries by simply joining strings together:

\`query = "SELECT * FROM users WHERE name = '" + userName + "'";\`

An attacker can input something like \`' OR '1'='1\`. The resulting query becomes:

\`SELECT * FROM users WHERE name = '' OR '1'='1'\`

Since \`'1'='1'\` is always true, the database returns ALL users.

### Impact
- Unauthorized data access (passwords, emails)
- Data modification
- Admin access bypass
      `,
      zh: `
### 原理解析
应用程序通常使用 SQL 查询来检索数据。如果程序通过简单的字符串拼接来构建这些查询：

\`query = "SELECT * FROM users WHERE name = '" + userName + "'";\`

攻击者可以输入类似 \`' OR '1'='1\` 的内容。生成的查询将变为：

\`SELECT * FROM users WHERE name = '' OR '1'='1'\`

由于 \`'1'='1\` 永远为真（True），数据库将返回**所有**用户的数据，从而绕过登录验证。

### 危害影响
- 未授权的数据访问（密码、邮件等）
- 数据篡改或删除
- 绕过管理员登录权限
      `
    },
    quiz: [
      {
        id: 1,
        question: { en: "What is the primary cause of SQL Injection?", zh: "SQL 注入的主要成因是什么？" },
        options: [
          { en: "Weak passwords", zh: "弱密码" },
          { en: "Unsanitized user input concatenated into queries", zh: "未过滤的用户输入被拼接到查询中" },
          { en: "Missing SSL certificates", zh: "缺少 SSL 证书" },
          { en: "Open database ports", zh: "开放的数据库端口" }
        ],
        correctAnswer: 1,
        explanation: { en: "SQLi happens when user input is treated as code rather than data.", zh: "当用户输入被当作代码执行而不是纯数据处理时，就会发生 SQL 注入。" }
      },
      {
        id: 2,
        question: { en: "Which character is most commonly used to break out of a data string in SQL?", zh: "哪种字符最常用于闭合 SQL 中的数据字符串？" },
        options: [
          { en: "Double Quote (\")", zh: "双引号 (\")" },
          { en: "Single Quote (')", zh: "单引号 (')" },
          { en: "Backtick (`)", zh: "反引号 (`)" },
          { en: "Asterisk (*)", zh: "星号 (*)" }
        ],
        correctAnswer: 1,
        explanation: { en: "The single quote is the standard string delimiter in SQL.", zh: "单引号是 SQL 中标准的字符串界定符。插入单引号通常可以闭合预设的数据字段，从而注入新的 SQL 命令。" }
      }
    ]
  },
  {
    id: 'xss',
    title: { en: 'Cross-Site Scripting (XSS)', zh: '跨站脚本攻击 (XSS)' },
    shortDescription: { en: 'Inject malicious scripts into web pages viewed by others.', zh: '将恶意脚本注入到他人浏览的网页中。' },
    fullDescription: { en: 'XSS allows attackers to execute malicious scripts in the browser of an unsuspecting user.', zh: 'XSS 允许攻击者在毫无防备的用户的浏览器中执行恶意脚本。这可能导致会话劫持、网站篡改或将用户重定向到恶意网站。' },
    difficulty: Difficulty.APPRENTICE,
    category: { en: 'Client-Side', zh: '客户端攻击' },
    icon: 'Code',
    interactiveType: 'xss',
    content: {
      en: `
### Reflected XSS
The malicious script comes from the current HTTP request.
1. Attacker sends a link with a script payload in the URL.
2. \`https://example.com/search?q=<script>alert(1)</script>\`
3. Server reflects the input back in the HTML: \`<p>You searched for: <script>alert(1)</script></p>\`
4. Browser executes the script.

### Impact
- Stealing session cookies
- Keylogging
- Phishing
      `,
      zh: `
### 反射型 XSS (Reflected XSS)
恶意脚本源自当前的 HTTP 请求。
1. 攻击者发送一个 URL 中包含脚本 Payload 的链接。
2. 例如：\`https://example.com/search?q=<script>alert(1)</script>\`
3. 服务器将输入内容“反射”回 HTML 页面中：\`<p>您搜索了: <script>alert(1)</script></p>\`
4. 浏览器解析并执行该脚本。

### 危害影响
- 窃取会话 Cookie (导致账号被盗)
- 键盘记录
- 钓鱼攻击
      `
    },
    quiz: [
      {
        id: 1,
        question: { en: "What does XSS stand for?", zh: "XSS 的全称是什么？" },
        options: [
          { en: "Extreme Security Systems", zh: "Extreme Security Systems" },
          { en: "Cross-Site Scripting", zh: "Cross-Site Scripting (跨站脚本)" },
          { en: "XML Style Sheets", zh: "XML Style Sheets" },
          { en: "X-rated System Security", zh: "X-rated System Security" }
        ],
        correctAnswer: 1,
        explanation: { en: "It stands for Cross-Site Scripting. It's called XSS to avoid confusion with CSS.", zh: "全称是 Cross-Site Scripting。为了避免与 CSS (Cascading Style Sheets) 混淆，缩写为 XSS。" }
      },
      {
        id: 2,
        question: { en: "What is the best defense against XSS?", zh: "防御 XSS 的最佳方案是什么？" },
        options: [
          { en: "Using HTTPS", zh: "使用 HTTPS" },
          { en: "Disabling JavaScript", zh: "禁用 JavaScript" },
          { en: "Context-aware output encoding", zh: "基于上下文的输出编码" },
          { en: "Firewalls", zh: "防火墙" }
        ],
        correctAnswer: 2,
        explanation: { en: "Encoding special characters ensures the browser treats user input as text.", zh: "将特殊字符进行编码（如将 < 转义为 &lt;）可以确保浏览器将用户输入视为文本，而不是可执行代码。" }
      }
    ]
  },
  {
    id: 'idor',
    title: { en: 'Broken Access Control (IDOR)', zh: '越权访问 (IDOR)' },
    shortDescription: { en: 'Accessing other users\' data by changing IDs.', zh: '通过更改 ID 来访问其他用户的数据。' },
    fullDescription: { en: 'Insecure Direct Object References (IDOR) occur when an application provides direct access to objects based on user-supplied input without checking access rights.', zh: '不安全的直接对象引用 (IDOR) 发生时，应用程序根据用户提供的输入直接提供对数据库对象的访问，而没有检查用户是否有权限访问该对象。' },
    difficulty: Difficulty.HUNTER,
    category: { en: 'Authorization', zh: '权限控制' },
    icon: 'Lock',
    interactiveType: 'idor',
    content: {
      en: `
### The Mechanism
A user logs in and sees their profile at:
\`/api/profile?user_id=1001\`

The attacker simply changes the ID in the URL (or API request):
\`/api/profile?user_id=1002\`

If the server doesn't verify that the *currently logged-in user* actually owns account *1002*, it returns the victim's data.

### Impact
- Privacy violation
- Data theft
- Horizontal privilege escalation
      `,
      zh: `
### 攻击机制
用户登录后，在以下网址查看自己的个人资料：
\`/api/profile?user_id=1001\`

攻击者只需更改 URL（或 API 请求）中的 ID：
\`/api/profile?user_id=1002\`

如果服务器没有验证**当前登录的用户**是否真的拥有账户 **1002** 的所有权，它就会直接返回受害者的数据。

### 危害影响
- 隐私泄露
- 数据窃取
- 水平越权 (访问同级其他用户的数据)
      `
    },
    quiz: [
      {
        id: 1,
        question: { en: "What does IDOR stand for?", zh: "IDOR 代表什么？" },
        options: [
          { en: "Identity Documentation Or Registration", zh: "Identity Documentation Or Registration" },
          { en: "Insecure Direct Object Reference", zh: "Insecure Direct Object Reference (不安全的直接对象引用)" },
          { en: "Internal Database Object Request", zh: "Internal Database Object Request" },
          { en: "Illegal Data Operation Routine", zh: "Illegal Data Operation Routine" }
        ],
        correctAnswer: 1,
        explanation: { en: "Insecure Direct Object Reference describes referencing a database object directly without authorization checks.", zh: "不安全的直接对象引用描述了在没有授权检查的情况下直接引用数据库对象（如文件或用户ID）的行为。" }
      }
    ]
  },
  {
    id: 'cmd_injection',
    title: { en: 'OS Command Injection', zh: 'OS 命令注入' },
    shortDescription: { en: 'Execute operating system commands on the server.', zh: '在服务器上执行操作系统命令。' },
    fullDescription: { en: 'Command injection allows an attacker to execute arbitrary operating system commands on the server that is running an application, effectively taking over the machine.', zh: '命令注入允许攻击者在运行应用程序的服务器上执行任意操作系统命令，通常会导致完全控制服务器。' },
    difficulty: Difficulty.ELITE,
    category: { en: 'RCE', zh: '远程代码执行' },
    icon: 'Terminal',
    interactiveType: 'command_injection',
    content: {
      en: `
### How it works
Often apps need to call system commands (like \`ping\` or \`ffmpeg\`). If they use user input unsafely:

Code: \`exec("ping -c 1 " + userInput)\`

If the user inputs: \`8.8.8.8\`, it runs \`ping -c 1 8.8.8.8\`.
But if the user inputs: \`8.8.8.8; whoami\`, it runs:
1. \`ping -c 1 8.8.8.8\`
2. \`whoami\`

The semicolon \`;\` separates commands in Linux/Unix.

### Impact
- Full system compromise
- Data exfiltration
- Installing malware
      `,
      zh: `
### 原理解析
应用程序有时需要调用系统命令（如 \`ping\` 或 \`ffmpeg\`）。如果它们不安全地使用了用户输入：

代码: \`exec("ping -c 1 " + userInput)\`

如果用户输入：\`8.8.8.8\`，系统执行 \`ping -c 1 8.8.8.8\`。
但如果用户输入：\`8.8.8.8; whoami\`，系统将执行：
1. \`ping -c 1 8.8.8.8\`
2. \`whoami\` (显示当前系统用户名)

在 Linux/Unix 中，分号 \`;\` 用于分隔多条命令。

### 危害影响
- 服务器完全沦陷
- 敏感数据外泄
- 安装恶意软件/后门
      `
    },
    quiz: [
      {
        id: 1,
        question: { en: "Which character is commonly used to chain commands in Linux?", zh: "Linux 中常用哪个字符来连接多条命令？" },
        options: [
          { en: "Semicolon (;)", zh: "分号 (;)" },
          { en: "Colon (:)", zh: "冒号 (:)" },
          { en: "Period (.)", zh: "句号 (.)" },
          { en: "Comma (,)", zh: "逗号 (,)" }
        ],
        correctAnswer: 0,
        explanation: { en: "The semicolon (;) allows you to execute one command after another sequentially.", zh: "分号 (;) 允许按顺序执行一条接一条的命令。" }
      }
    ]
  },
  {
    id: 'csrf',
    title: { en: 'CSRF', zh: '跨站请求伪造 (CSRF)' },
    shortDescription: { en: 'Trick a user into performing an unwanted action.', zh: '诱导用户执行非自愿的操作。' },
    fullDescription: { en: 'Cross-Site Request Forgery (CSRF) forces an end user to execute unwanted actions on a web application in which they are currently authenticated.', zh: '跨站请求伪造 (CSRF) 强迫终端用户在他们当前已登录的 Web 应用程序上执行非本意的操作。' },
    difficulty: Difficulty.HUNTER,
    category: { en: 'Session', zh: '会话安全' },
    icon: 'Globe',
    interactiveType: 'csrf',
    content: {
      en: `
### How it works
1. User logs into their bank (Site A). The bank keeps a session cookie.
2. Attacker sends User a link to a malicious Site B.
3. Site B contains a hidden form or image that makes a request to Site A:
   \`<img src="http://bank.com/transfer?to=attacker&amount=1000">\`
4. The browser sees the request to \`bank.com\` and **automatically attaches the cookies**.
5. The bank processes the transfer thinking the User intended it.

### Impact
- Unwanted fund transfers
- Changing passwords/email
- Modifying account settings
      `,
      zh: `
### 原理解析
1. 用户登录银行网站（站点 A）。银行在浏览器保留了会话 Cookie。
2. 攻击者发送给用户一个恶意网站（站点 B）的链接。
3. 站点 B 包含一个隐藏的表单或图片，会自动向站点 A 发起请求：
   \`<img src="http://bank.com/transfer?to=attacker&amount=1000">\`
4. 浏览器看到指向 \`bank.com\` 的请求，**自动附带上用户的 Cookie**。
5. 银行服务器收到请求，认为是用户本人操作，于是执行转账。

### 危害影响
- 非自愿的资金转账
- 篡改密码或邮箱
- 修改账户设置
      `
    },
    quiz: [
      {
        id: 1,
        question: { en: "What is the main defense against CSRF?", zh: "防御 CSRF 的主要手段是什么？" },
        options: [
          { en: "Strong passwords", zh: "强密码" },
          { en: "Anti-CSRF Tokens", zh: "Anti-CSRF Token (防伪造令牌)" },
          { en: "HTTPS", zh: "HTTPS 加密" },
          { en: "Input validation", zh: "输入验证" }
        ],
        correctAnswer: 1,
        explanation: { en: "Tokens are unique, unpredictable values generated by the server that must be present in every state-changing request.", zh: "CSRF Token 是服务器生成的唯一且不可预测的值，必须包含在每个更改状态的请求中，攻击者无法伪造这个值。" }
      }
    ]
  }
];
