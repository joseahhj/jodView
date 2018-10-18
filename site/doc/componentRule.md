# 组件目录规范

## 命名

- 尽量简单、表意。
- export出的对象使用pascal命名，比如Page、ButtonGroup
- 如组件需要嵌套使用，子组件命名在父组件后加Item，比如timeline及timelineItem

## 目录

- 组件在目录src/components/下，每个组件单独一个目录，入口文件为index.js，导出组件，再由根入口文件src/index.js暴露给使用者
- 每个组件的文件名使用使用pascal命名，与组件的名称一致，比如Button.vue和ButtonGroup.vue
- 注册全局组件,在组件名前面加小写’j‘,如：jButton

## 组件src文件夹结构

    ├── style.js // 组件入口css
    ├── index.js // 组件入口js
    ├── utils // 处理入口文件的js，组件注册 
    ├── local // 格式化，日历方法相关的js 
    ├── mixins // 公用混入相关js 
    ├── directives // 指令相关js      
    ├── components // 组件
    │   ├── index.js // 入口文件
    │   ├── 组件A
    │   │   ├── index.js // 入口文件
    │   │   ├── 组件A.vue
    │   │   ├── README.md //组件使用说明,组件属性props、slot、event说明
    │   │   ├── demo  //例子
    │   │   │   └── basic.md
    │   │   ├── test  //单元测试
    │   │   │   ├── 组件A.spec.js
    │   │   │   └── fixtures //示例文件夹  
    │   │   │       ├── 组件A.html //示例模板  
    │   │   │       └── 组件A.js //示例实例化js                     
    │   └── 组件B
    │       └── index.js
    └── styles // 组件样式
        ├── README.md // 结构说明    
        ├── index.scss // 入口文件
        ├── animation // 动画样式   
        ├── common // 公共样式              
        └── components // 组件样式
            ├── all.scss // 入口文件
            └── 组件A.scss


## 分类

- Basic(基础)[layout 布局组件、icon 图标组件、button 按钮组件、color 色彩组件、font 字体组件]
- Form(表单)[input、checkbox、radio、switch、slider、datapicker、select、transfer、upload、级联选择、rate]
- Data(数据)[table、Tag、progress、tree、分页、badge]
- Notice(通知)[Notice、Alert、loading、dialog、modal、tooltip、popover]
- Navigation(导航)[Menu、tabs、breadcrumb 面包屑组件、下拉菜单、steps、card]
- Other(其他)

## README.md的规范说明

    - 写api的前面一行必须加上三个小横线“---”
    - 开头必须写meta，用于左侧菜单的输出，结构如下：
        ---
        type: Basic // 分类
        title: Button // 标题
        subtitle: 按钮 // 中文
        ---
        

## demo文件夹下的示例XX.md的规范说明

    - 开头必须写meta，用于示例展示的顺序，结构如下：
        ---
        order: 1 //示例从1开始，不能重复
        ---

## 组件内组件A.vue文件内部结构

    按照一定的结构组织，使得组件易于阅读。
    （name; extends; props, data 和 computed; components; watch 和 methods等）。
     
    <template lang="html">
      <div class="ranger-wrapper">
        <!-- ... -->
      </div>
    </template>
    <script type="text/javascript">
      export default {
        name: 'RangeSlider', // 不要忘记了 name 属性
        extends: {}, // 组合其它组件 也可以用minx
        // 组件属性、变量
        props: {
          bart: {}, // 按字母顺序
          foo: {},
          fooBar: {},
        },
        // 变量
        data() {},
        computed: {},
        // 使用其它组件
        components: {},
        // 方法
        watch: {},
        methods: {},
        // 生命周期函数
        beforeCreate() {},
        mounted() {},
      };
    </script>
    <style scoped>
      .ranger-wrapper { /* ... */ }
    </style>

## props命名规范：必须使用camel命名法

- prefixCls（样式前缀）
- title(标题)
- content(文本内容)
- type(显示类型)
- size(显示形状大小)
- shape(显示形状)
- isVertical(显示方向)
- fontSize(显示字体大小)
- default+(各种值如：defaultValue)(默认值)
- value(会变更的值)
- placeholder(输入框的默认值)
- placement（显示位置）
- isDisabled （是否禁用）
- isVisible（是否显示）
- isChecked （是否选中）
- isClosable (是否可关闭)
- className（类名）
- effect（动画效果）

## 自定义event命名规范：必须使用kebab-case命名法，统一加上“on-xxx”

- on-modal-close（按钮关闭、取消事件）
- on-modal-ok（按钮确定事件）
- on-change（状态变化事件）
- on-update (更新类的事件)
- on-select (选择菜单类)
