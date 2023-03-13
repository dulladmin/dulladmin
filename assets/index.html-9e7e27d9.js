import{_ as n}from"./README-generated-webui-8fde1745.js";import{_ as s,p as a,q as t,a1 as p}from"./framework-5866ffd3.js";const e={},c=p(`<h1 id="介绍" tabindex="-1"><a class="header-anchor" href="#介绍" aria-hidden="true">#</a> 介绍</h1><p><strong>DullAdmin</strong> 用以快速构建后台管理系统的规范。</p><p>构建后台管理系统通常需要编写大量重复的 CRUD 逻辑，实现排序、搜索等功能非常乏味。本规范定义了请求接口和数据呈现，让代码生成器处理剩余工作。例如：</p><p><strong>资源文件：</strong></p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token comment"># dulladmin/resources/users.yml</span>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>自动生成的管理页面：</strong></p><p><img src="`+n+'" alt="generated webui"></p>',7),l=[c];function o(u,i){return a(),t("div",null,l)}const d=s(e,[["render",o],["__file","index.html.vue"]]);export{d as default};