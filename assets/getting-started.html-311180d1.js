import{_ as i,M as t,p as c,q as u,R as n,t as s,N as a,V as o,a1 as l}from"./framework-5866ffd3.js";const r={},d=n("h1",{id:"快速上手",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#快速上手","aria-hidden":"true"},"#"),s(" 快速上手")],-1),k=n("h2",{id:"依赖环境",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#依赖环境","aria-hidden":"true"},"#"),s(" 依赖环境")],-1),v={href:"https://nodejs.org/",target:"_blank",rel:"noopener noreferrer"},m={href:"https://classic.yarnpkg.com/en/",target:"_blank",rel:"noopener noreferrer"},b=l(`<h2 id="手动安装" tabindex="-1"><a class="header-anchor" href="#手动安装" aria-hidden="true">#</a> 手动安装</h2><ul><li><strong>步骤 1</strong>: 创建并进入一个新目录</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">mkdir</span> dulladmin-starter
<span class="token builtin class-name">cd</span> dulladmin-starter
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><strong>步骤 2</strong>: 初始化项目</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">yarn</span> init
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li><strong>步骤 3</strong>: 将 <strong>dulladmin</strong> 安装为本地依赖</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">yarn</span> <span class="token function">add</span> <span class="token parameter variable">-D</span> @dulladmin/cli @dulladmin/generator-arco-vue
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,7),g=n("thead",null,[n("tr",null,[n("th",null,"软件包"),n("th",null,"用途")])],-1),h=n("tr",null,[n("td",null,"@dulladmin/cli"),n("td",null,"命令行工具")],-1),y=n("td",null,"@dulladmin/generator-arco-vue",-1),_={href:"https://arco.design/vue",target:"_blank",rel:"noopener noreferrer"},f=l(`<ul><li><strong>步骤 4</strong>: 创建 client 目录</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">yarn</span> dulladmin client:install
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>将会生成类似下方的目录结构：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>├─ client     <span class="token comment"># clientDir, 客户端源码的输出目录</span>
├─ dulladmin  <span class="token comment"># dulladminDir, 资源定义文件</span>
│  ├─ resources
│  └─ app.yml
└─ package.json
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><strong>步骤 5</strong>: 创建你的第一个<strong>资源定义文件</strong></li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">vim</span> dulladmin/resources/users.yml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><details class="custom-container details"><summary>点击查看 dulladmin/resources/users.yml 的文件内容</summary><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token comment"># dulladmin/resources/users.yml</span>
<span class="token key atrule">name</span><span class="token punctuation">:</span> <span class="token string">&#39;users&#39;</span>
<span class="token key atrule">views</span><span class="token punctuation">:</span>
  <span class="token key atrule">index</span><span class="token punctuation">:</span>
    <span class="token key atrule">table</span><span class="token punctuation">:</span>
      <span class="token key atrule">items</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token punctuation">{</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> <span class="token string">&#39;id&#39;</span><span class="token punctuation">,</span> <span class="token key atrule">type</span><span class="token punctuation">:</span> <span class="token string">&#39;int64&#39;</span> <span class="token punctuation">}</span>
        <span class="token punctuation">-</span> <span class="token punctuation">{</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> <span class="token string">&#39;name&#39;</span><span class="token punctuation">,</span> <span class="token key atrule">type</span><span class="token punctuation">:</span> <span class="token string">&#39;string&#39;</span> <span class="token punctuation">}</span>
        <span class="token punctuation">-</span> <span class="token punctuation">{</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> <span class="token string">&#39;avatar&#39;</span><span class="token punctuation">,</span> <span class="token key atrule">type</span><span class="token punctuation">:</span> <span class="token string">&#39;image&#39;</span> <span class="token punctuation">}</span>
      <span class="token key atrule">sorters</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token punctuation">{</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> <span class="token string">&#39;id&#39;</span><span class="token punctuation">,</span> <span class="token key atrule">directions</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">&#39;descend&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;ascend&#39;</span><span class="token punctuation">]</span> <span class="token punctuation">}</span>
      <span class="token key atrule">searchers</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token punctuation">{</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> <span class="token string">&#39;id&#39;</span><span class="token punctuation">,</span> <span class="token key atrule">predicate</span><span class="token punctuation">:</span> <span class="token string">&#39;eq&#39;</span> <span class="token punctuation">}</span>
        <span class="token punctuation">-</span> <span class="token punctuation">{</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> <span class="token string">&#39;name&#39;</span><span class="token punctuation">,</span> <span class="token key atrule">predicate</span><span class="token punctuation">:</span> <span class="token string">&#39;cont&#39;</span> <span class="token punctuation">}</span>
      <span class="token key atrule">pagination</span><span class="token punctuation">:</span>
        <span class="token key atrule">per</span><span class="token punctuation">:</span> <span class="token number">5</span>

  <span class="token key atrule">show</span><span class="token punctuation">:</span>
    <span class="token key atrule">descriptions</span><span class="token punctuation">:</span>
      <span class="token key atrule">items</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token punctuation">{</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> <span class="token string">&#39;id&#39;</span><span class="token punctuation">,</span> <span class="token key atrule">type</span><span class="token punctuation">:</span> <span class="token string">&#39;int64&#39;</span> <span class="token punctuation">}</span>
        <span class="token punctuation">-</span> <span class="token punctuation">{</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> <span class="token string">&#39;name&#39;</span><span class="token punctuation">,</span> <span class="token key atrule">type</span><span class="token punctuation">:</span> <span class="token string">&#39;string&#39;</span> <span class="token punctuation">}</span>
        <span class="token punctuation">-</span> <span class="token punctuation">{</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> <span class="token string">&#39;avatar&#39;</span><span class="token punctuation">,</span> <span class="token key atrule">type</span><span class="token punctuation">:</span> <span class="token string">&#39;image&#39;</span> <span class="token punctuation">}</span>

  <span class="token key atrule">new</span><span class="token punctuation">:</span>
    <span class="token key atrule">form</span><span class="token punctuation">:</span>
      <span class="token key atrule">items</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token punctuation">{</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> <span class="token string">&#39;name&#39;</span><span class="token punctuation">,</span> <span class="token key atrule">type</span><span class="token punctuation">:</span> <span class="token string">&#39;string&#39;</span> <span class="token punctuation">}</span>
        <span class="token punctuation">-</span> <span class="token punctuation">{</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> <span class="token string">&#39;avatar&#39;</span><span class="token punctuation">,</span> <span class="token key atrule">type</span><span class="token punctuation">:</span> <span class="token string">&#39;image&#39;</span> <span class="token punctuation">}</span>

  <span class="token key atrule">edit</span><span class="token punctuation">:</span>
    <span class="token key atrule">form</span><span class="token punctuation">:</span>
      <span class="token key atrule">items</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token punctuation">{</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> <span class="token string">&#39;name&#39;</span><span class="token punctuation">,</span> <span class="token key atrule">type</span><span class="token punctuation">:</span> <span class="token string">&#39;string&#39;</span> <span class="token punctuation">}</span>
        <span class="token punctuation">-</span> <span class="token punctuation">{</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> <span class="token string">&#39;avatar&#39;</span><span class="token punctuation">,</span> <span class="token key atrule">type</span><span class="token punctuation">:</span> <span class="token string">&#39;image&#39;</span> <span class="token punctuation">}</span>

  <span class="token key atrule">delete</span><span class="token punctuation">:</span>
    <span class="token key atrule">form</span><span class="token punctuation">:</span>
      <span class="token key atrule">items</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><ul><li><strong>步骤 6</strong>: 输出客户端源码</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">yarn</span> dulladmin build
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><details class="custom-container details"><summary>点击查看控制台的构建信息</summary><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> Parsing DULLADMIN_FILES <span class="token keyword">in</span> dulladmin
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span>   output to client
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span>     - dulladmin/resources/users.yml
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span>       + client/src/router/routes/modules/users.ts
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span>       + client/src/api/modules/users/index/self-block.ts
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span>       + client/src/api/modules/users/show/self-block.ts
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span>       + client/src/api/modules/users/new/self-block.ts
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span>       + client/src/api/modules/users/edit/self-block.ts
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span>       + client/src/api/modules/users/delete/self-block.ts
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span>       + client/src/views/modules/users/index/index.vue
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span>       + client/src/views/modules/users/index/components/self-block.vue
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span>       + client/src/views/modules/users/show/index.vue
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span>       + client/src/views/modules/users/show/components/self-block.vue
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span>       + client/src/views/modules/users/new/index.vue
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span>       + client/src/views/modules/users/new/components/self-block.vue
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span>       + client/src/views/modules/users/edit/index.vue
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span>       + client/src/views/modules/users/edit/components/self-block.vue
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span>       + client/src/views/modules/users/delete/index.vue
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span>       + client/src/views/modules/users/delete/components/self-block.vue
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span>       + client/src/assets/style/modules/users.less
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span>       + client/src/locale/en-US/modules/users.json
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span>       + client/src/locale/zh-CN/modules/users.json
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span>     - dulladmin/app.yml
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span>       + client/src/config/config.json
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span>       + client/src/locale/en-US/modules/07-app-site.json
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span>       + client/src/locale/zh-CN/modules/07-app-site.json
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span>       + client/src/router/app-menu/routes.ts
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span>       + client/src/locale/en-US/modules/13-app-menu.json
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span>       + client/src/locale/zh-CN/modules/13-app-menu.json
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><ul><li><strong>步骤 7</strong>: 预览</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">cd</span> client
<span class="token function">yarn</span> run-p mock:server dev
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,12),N={href:"http://127.0.0.1:3000",target:"_blank",rel:"noopener noreferrer"},I={href:"http://127.0.0.1:5173",target:"_blank",rel:"noopener noreferrer"},x={class:"custom-container tip"},F=n("p",{class:"custom-container-title"},"TIP",-1),O={href:"https://github.com/dulladmin/dulladmin/tree/main/examples/arco-vue",target:"_blank",rel:"noopener noreferrer"};function w(j,L){const e=t("ExternalLinkIcon"),p=t("RouterLink");return c(),u("div",null,[d,k,n("ul",null,[n("li",null,[n("a",v,[s("Node.js v14.18.0+"),a(e)])]),n("li",null,[n("a",m,[s("Yarn v1 classic"),a(e)])])]),b,n("table",null,[g,n("tbody",null,[h,n("tr",null,[y,n("td",null,[s("前端代码生成器，"),n("a",_,[s("Arco Design Vue"),a(e)]),s(" 版本")])])])]),f,n("p",null,[s("运行上述命令执行，会在 "),n("a",N,[s("http://127.0.0.1:3000"),a(e)]),s(" 运行一个后台服务器来提供接口数据， 同时在 "),n("a",I,[s("http://127.0.0.1:5173"),a(e)]),s(" 运行一个热加载的开发服务器来提供前端代码。")]),n("p",null,[s("在登录界面，输入用户名 “admin” 和密码 “123456” 进入系统。到现在为止，你应该可以看到一个基本但实用的 后台管理系统。接下来，了解一下 "),a(p,{to:"/zh/guide/resource-file.html"},{default:o(()=>[s("资源定义文件")]),_:1}),s(" 的基础知识。")]),n("div",x,[F,n("p",null,[s("完整的示例可查看 "),n("a",O,[s("examples/arco-vue"),a(e)]),s(" 目录。")])])])}const S=i(r,[["render",w],["__file","getting-started.html.vue"]]);export{S as default};
