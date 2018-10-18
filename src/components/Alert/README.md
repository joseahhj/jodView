---
type: Notice
title: Alert
subtitle: 警告
---
# Alert 警告
静态的展示页面中重要的提示信息（可关闭）


---

## API
### Alert props

| 参数      | 说明                            | 类型                     |可选值               | 默认值     |
|-----------|--------------------------------|---------------------|------------------------|-----------|
| title       | 标题，必传参数                      | String               |-                      | -   |
| type      | 主题样式                          | String              |info,success,error,warn | info     |
| desc   | 描述性信息,可动态切换               | String            |-                  | ''   |
| isClosable| 是否可关闭                     | Boolean             |true,false              | false     |
| isShowIcon      | 是否显示icon图标             | Boolean               | -                 | false         |
| icon      | 自定义默认主题图标样式             | Object              | {fontSize:'18px';color:'#333333';}                | -      |
| className       | 自定义类名                     | String              |-                      | -   |
|isNowrap      | 文字一行展示,多出省略号                     | Boolean              |-                      | false   |

### Alert events

| 参数       | 说明                            | 返回值     |
|-----------|---------------------------------|---------- |
| on-close  | 关闭时触发                       | 返回event对象  |

### Alert slot

| slot      | 说明                            | 
|-----------|---------------------------------|
| icon     | 自定义图标、文字等                 | 
| close     | 自定义关闭图标、文字等              | 