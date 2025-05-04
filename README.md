# Terminal Portfolio Vue

这是一个使用Vue.js构建的交互式终端风格个人主页，使用React构建版本移步 [terminal-portfolio](https://github.com/ipaler/terminal-portfolio)。

## 功能

- 模拟终端界面
- 支持多种命令展示个人信息
- 响应式设计

## 安装

```bash
git clone https://github.com/ipaler/terminal-portfolio-vue.git
cd terminal-portfolio-vue
```

```bash
npm install
```

## 运行

```bash
npm run serve
```

## 构建

```bash
npm run build
```

## 项目结构

```
src/
  ├── App.vue          # 主应用组件
  ├── main.js          # 应用入口
  ├── components/      # 组件目录
  │   └── Terminal.vue # 终端组件
  └── utils/           # 工具函数
      └── commands.js  # 命令处理逻辑
```

## 可用命令

- `help` - 显示可用命令列表
- `about` - 显示关于我的信息
- `skills` - 显示我的技能
- `projects` - 显示我的项目
- `experience` - 显示我的工作经验
- `education` - 显示我的教育背景
- `contact` - 显示联系方式
- `clear` - 清除屏幕
- 更多命令请查看帮助