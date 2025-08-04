// 视图切换插件
(function() {
  // 添加按钮样式
  function addStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .view-toggle-btn {
        background-color: #42b983;
        color: white;
        border: none;
        padding: 8px 16px;
        margin: 5px;
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
        transition: background-color 0.3s;
      }
      .view-toggle-btn:hover {
        background-color: #359c6d;
      }
      .view-toggle-btn.active {
        background-color: #359c6d;
        font-weight: bold;
      }
    `;
    document.head.appendChild(style);
  }

  // 添加视图切换按钮
  function addViewToggleButtons() {
    // 等待DOM加载完成
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', addButtons);
    } else {
      addButtons();
    }
  }

  // 添加按钮的具体实现
  function addButtons() {
    // 不再添加首页按钮
    // 添加事件监听器
    addEventListeners();
  }

  // 添加事件监听器
  function addEventListeners() {
    // 移除了首页按钮的事件监听器
    // 移除了侧边栏按钮的事件监听器
  }

  // 更新活动按钮样式
  function updateActiveButton(view, containerSelector) {
    const container = document.querySelector(containerSelector);
    if (container) {
      const buttons = container.querySelectorAll('.view-toggle-btn');
      buttons.forEach(btn => {
        if (btn.getAttribute('data-view') === view) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });
    }
  }

  // 切换视图
  function switchView(view) {
    // 保存用户偏好到localStorage
    localStorage.setItem('preferredView', view);
    
    // 过滤侧边栏项目
    filterSidebarItems(view);
    
    // 不再更新首页按钮样式
  }

  // 根据视图过滤侧边栏项目
  function filterSidebarItems(view) {
    const sidebarLinks = document.querySelectorAll('.sidebar-nav a');
    
    sidebarLinks.forEach(link => {
      // 检查链接是否有标签
      const basicTag = link.querySelector('.tag-basic');
      const intermediateTag = link.querySelector('.tag-intermediate');
      const advancedTag = link.querySelector('.tag-advanced');
      
      if (view === 'basic') {
        // 基础视图：只显示基础内容
        if (basicTag) {
          link.parentElement.style.display = '';
        } else {
          link.parentElement.style.display = 'none';
        }
      } else if (view === 'intermediate') {
        // 中级视图：显示基础和中级内容
        if (basicTag || intermediateTag) {
          link.parentElement.style.display = '';
        } else {
          link.parentElement.style.display = 'none';
        }
      } else if (view === 'advanced') {
        // 高级视图：显示所有内容
        link.parentElement.style.display = '';
      } else {
        // 全部视图：显示所有内容
        link.parentElement.style.display = '';
      }
    });
  }

  // 初始化视图
  function initView() {
    const preferredView = localStorage.getItem('preferredView') || 'all';
    switchView(preferredView);
  }

  // 初始化函数
  function init() {
    addStyles();
    addViewToggleButtons();
    initView();
    
    // 监听路由变化
    if (window.$docsify) {
      const originalDoneEach = window.$docsify.doneEach || function() {};
      window.$docsify.doneEach = function() {
        originalDoneEach.apply(this, arguments);
        const preferredView = localStorage.getItem('preferredView') || 'all';
        switchView(preferredView);
      };
    }
  }

  // 启动插件
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();