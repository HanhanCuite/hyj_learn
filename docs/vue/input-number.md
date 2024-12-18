# v-number 数字输入指令

一个用于限制输入框只能输入数字的 Vue 自定义指令。

## 功能特性

- 限制只能输入数字和小数点
- 自动过滤非数字字符
- 处理多个小数点的情况，保留第一个小数点
- 支持粘贴操作时的数字过滤
- 支持 Vue 双向绑定
- 兼容原生 input 元素和 Element UI 的 el-input 组件

## 使用方法

### 基础用法

```vue
<template>
  <input v-number v-model="value">
  <!-- 或者 -->
  <el-input v-number v-model="value"></el-input>
</template>
```

### 示例

```vue
<template>
  <div>
    <el-input v-number v-model="price" placeholder="请输入数字"></el-input>
    <p>输入的数值：{{ price }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      price: ''
    }
  }
}
</script>
```

## 源码
``` js
/**
 * v-number 数字输入指令
 * 只允许输入数字,并支持双向绑定
 * Copyright (c) 2024 huyingjun
 */
export default {
    bind(el, binding, vnode) {
        const input = el.tagName === 'INPUT' ? el : el.querySelector('input')
        if (!input) {
            console.warn('v-number指令需要作用于INPUT元素或el-input组件')
            return
        }

        // 处理输入,允许数字和小数点
        const handleInput = function (e) {
            let value = e.target.value
            
            // 只保留数字和小数点
            value = value.replace(/[^\d.]/g, '')
            
            // 处理多个小数点的情况，只保留第一个
            if (value.split('.').length > 2) {
                const parts = value.split('.')
                value = parts[0] + '.' + parts.slice(1).join('')
            }

            // 更新输入框值
            if (value !== e.target.value) {
                input.value = value
            }

            // 如果有绑定值，通过$emit更新父组件的值
            if (binding.value !== undefined && vnode.componentInstance) {
                vnode.componentInstance.$emit('input', value)
            }
        }

        input.addEventListener('input', handleInput)

        // 处理粘贴
        const handlePaste = function (e) {
            e.preventDefault()
            let text = (e.clipboardData || window.clipboardData).getData('text')
            
            // 过滤非数字和小数点
            text = text.replace(/[^\d.]/g, '')
            
            // 处理多个小数点的情况
            if (text.split('.').length > 2) {
                const parts = text.split('.')
                text = parts[0] + '.' + parts.slice(1).join('')
            }

            // 更新输入框值
            input.value = text

            // 如果有绑定值，通过$emit更新父组件的值
            if (binding.value !== undefined && vnode.componentInstance) {
                vnode.componentInstance.$emit('input', text)
            }
        }

        input.addEventListener('paste', handlePaste)

        // 保存事件处理函数以便解绑
        el._numberDirective = {
            handleInput,
            handlePaste
        }
    },

    unbind(el) {
        const input = el.tagName === 'INPUT' ? el : el.querySelector('input')
        if (input && el._numberDirective) {
            input.removeEventListener('input', el._numberDirective.handleInput)
            input.removeEventListener('paste', el._numberDirective.handlePaste)
            delete el._numberDirective
        }
    }
}
```

## 注意事项

1. 指令必须作用于 `<input>` 元素或包含 input 的组件（如 el-input）
2. 当输入非数字字符时，这些字符会被自动过滤掉
3. 如果输入多个小数点，只会保留第一个小数点
4. 粘贴操作时也会自动过滤非数字字符

## 实现原理

该指令通过以下方式实现数字输入限制：

1. 监听 input 事件，实时过滤非数字字符
2. 监听 paste 事件，确保粘贴的内容也只包含数字
3. 通过 Vue 的自定义指令生命周期钩子 `bind` 和 `unbind` 管理事件监听器
4. 使用正则表达式过滤非数字和小数点字符
5. 支持 v-model 双向绑定，通过 `$emit` 触发更新

