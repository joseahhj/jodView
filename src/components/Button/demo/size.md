---
order: 3
---

## 按钮尺寸
按钮有四种尺寸：大、中、小、默认

通过设置size为large、medium和small将按钮设置为大、中和小尺寸，不设置为默认尺寸。
````html
<template>
<j-button size="large">
    large
</j-button>
<j-button size="medium">
    medium
</j-button>
<j-button>
    default
</j-button>
<j-button size="small">
    small
</j-button>
<br/>
<p style="padding:10px 0">按钮组</p>
<j-button-group size="large">
    <j-button type="linear">
        large
    </j-button>
    <j-button type="linear">
        large
    </j-button>
    <j-button type="linear">
        large
    </j-button>
</j-button-group>
<j-button-group size="medium">
    <j-button type="linear">
        medium
    </j-button>
    <j-button type="linear">
        medium
    </j-button>
    <j-button type="linear">
        medium
    </j-button>
</j-button-group>
<p style="padding:3px 0"></p>
<j-button-group>
    <j-button type="linear">
        medium
    </j-button>
    <j-button type="linear">
        medium
    </j-button>
    <j-button type="linear">
        medium
    </j-button>
</j-button-group>
<j-button-group size="small">
    <j-button type="linear">
        small
    </j-button>
    <j-button type="linear">
        small
    </j-button>
    <j-button type="linear">
        small
    </j-button>
</j-button-group>
</template>
```