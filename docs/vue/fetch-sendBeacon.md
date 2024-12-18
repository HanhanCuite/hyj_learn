# navigator.sendBeacon 与 fetch+keepalive 对比

本文介绍 navigator.sendBeacon 和 fetch+keepalive 两种数据发送方式的区别及其适用场景。

## navigator.sendBeacon

### 基本使用

```javascript
navigator.sendBeacon(url, data);
```

### 特点

1. **异步非阻塞**：不会阻塞页面卸载过程
2. **可靠性高**：浏览器保证在页面关闭前尽可能发送数据
3. **只支持 POST 请求**
4. **无法获取服务器响应**
5. **数据大小限制**：通常限制在 64KB
6. **不支持自定义请求头**（除了 Content-Type）

### 适用场景

1. 页面退出时的数据统计上报
2. 用户行为追踪
3. 离开页面时的日志记录
4. 不需要响应的数据发送

## fetch + keepalive

### 基本使用

```javascript
fetch(url, {
  method: 'POST',
  keepalive: true,
  body: JSON.stringify(data)
});
```

### 特点

1. **支持所有 HTTP 方法**
2. **可以获取服务器响应**
3. **支持自定义请求头**
4. **数据大小限制**：通常为 64KB
5. **可以设置请求超时**
6. **支持请求中断**
7. **可以监控上传进度**

### 适用场景

1. 需要服务器响应的数据发送
2. 需要自定义请求头的场景
3. 需要监控上传进度的场景
4. 需要中断请求的场景

## 对比总结

### 功能对比

| 特性 | sendBeacon | fetch+keepalive |
|------|------------|-----------------|
| HTTP方法 | 仅POST | 全部支持 |
| 获取响应 | ❌ | ✅ |
| 自定义请求头 | ❌ | ✅ |
| 进度监控 | ❌ | ✅ |
| 请求中断 | ❌ | ✅ |
| 可靠性 | 高 | 中 |
| 使用复杂度 | 低 | 中 |

### 优缺点分析

#### sendBeacon

优点：
1. 使用简单
2. 可靠性高
3. 不阻塞页面卸载
4. 浏览器优化处理

缺点：
1. 功能单一
2. 无法获取响应
3. 不支持自定义请求头
4. 只支持 POST 请求

#### fetch+keepalive

优点：
1. 功能完整
2. 可以获取响应
3. 支持自定义请求头
4. 可以监控进度
5. 可以中断请求

缺点：
1. 使用相对复杂
2. 可靠性相对较低
3. 需要更多的配置

## 使用建议

1. **使用 sendBeacon 的场景**：
   - 页面退出时的数据统计
   - 简单的日志上报
   - 不需要响应的场景
   - 追求可靠性的场景

2. **使用 fetch+keepalive 的场景**：
   - 需要服务器响应
   - 需要自定义请求头
   - 需要监控上传进度
   - 需要更多控制的场景

## 示例代码

### sendBeacon 示例

```javascript
// 页面退出时发送数据
window.addEventListener('unload', () => {
  const data = {
    type: 'page_exit',
    timestamp: Date.now()
  };
  
  navigator.sendBeacon('/api/log', JSON.stringify(data));
});
```

### fetch+keepalive 示例

```javascript
// 发送数据并获取响应
async function sendData(data) {
  try {
    const response = await fetch('/api/data', {
      method: 'POST',
      keepalive: true,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer token'
      },
      body: JSON.stringify(data)
    });
    
    const result = await response.json();
    console.log('服务器响应:', result);
  } catch (error) {
    console.error('发送失败:', error);
  }
}
```

## 浏览器兼容性

- sendBeacon：主流浏览器都支持，IE 不支持
- fetch+keepalive：现代浏览器都支持，需要注意 IE 和一些老版本浏览器的兼容性

## 相关资源

- [Navigator.sendBeacon() - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/sendBeacon)
- [Fetch API - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [Using the Beacon API - web.dev](https://web.dev/beacon-api/)
