# Axios 上传进度监听与取消上传

本文介绍如何使用 Axios 实现文件上传进度监听以及取消上传功能。

## 基础配置

### 1. 安装

```bash
npm install axios
```

### 2. 基本设置

```javascript
import axios from 'axios';

// 创建 axios 实例
const instance = axios.create({
  baseURL: 'https://api.example.com',
  timeout: 30000,
});
```

## 监听上传进度

### 1. 使用 onUploadProgress

```javascript
async function uploadFile(file) {
  const formData = new FormData();
  formData.append('file', file);
  
  try {
    const response = await axios.post('/upload', formData, {
      onUploadProgress: (progressEvent) => {
        // 计算上传进度百分比
        const progress = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        
        console.log(`上传进度: ${progress}%`);
        // 这里可以更新进度条UI
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('上传失败:', error);
    throw error;
  }
}
```

### 2. 结合 Vue 的进度条示例

```vue
<template>
  <div>
    <input type="file" @change="handleFileChange">
    <div class="progress-bar">
      <div :style="{ width: `${uploadProgress}%` }" class="progress"></div>
    </div>
    <div>{{ uploadProgress }}%</div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const uploadProgress = ref(0);

const handleFileChange = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append('file', file);

  try {
    await axios.post('/upload', formData, {
      onUploadProgress: (progressEvent) => {
        uploadProgress.value = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
      }
    });
    
    alert('上传成功！');
  } catch (error) {
    console.error('上传失败:', error);
  }
};
</script>

<style scoped>
.progress-bar {
  width: 100%;
  height: 20px;
  background-color: #f0f0f0;
  border-radius: 10px;
  overflow: hidden;
}

.progress {
  height: 100%;
  background-color: #4caf50;
  transition: width 0.3s ease;
}
</style>
```

## 取消上传

### 1. 使用 AbortController

```javascript
const controller = new AbortController();

const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await axios.post('/upload', formData, {
      signal: controller.signal,
      onUploadProgress: (progressEvent) => {
        const progress = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        console.log(`上传进度: ${progress}%`);
      }
    });
    
    return response.data;
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log('上传已取消');
    } else {
      console.error('上传失败:', error);
    }
    throw error;
  }
};

// 取消上传
const cancelUpload = () => {
  controller.abort();
};
```

### 2. 完整的上传组件示例

```vue
<template>
  <div>
    <input type="file" @change="handleFileChange">
    <div class="progress-bar">
      <div :style="{ width: `${uploadProgress}%` }" class="progress"></div>
    </div>
    <div>{{ uploadProgress }}%</div>
    <button @click="handleUpload" :disabled="isUploading">上传</button>
    <button @click="handleCancel" :disabled="!isUploading">取消上传</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const uploadProgress = ref(0);
const isUploading = ref(false);
const selectedFile = ref(null);
let controller = null;

const handleFileChange = (event) => {
  selectedFile.value = event.target.files[0];
  uploadProgress.value = 0;
};

const handleUpload = async () => {
  if (!selectedFile.value) return;
  
  controller = new AbortController();
  isUploading.value = true;
  
  const formData = new FormData();
  formData.append('file', selectedFile.value);

  try {
    await axios.post('/upload', formData, {
      signal: controller.signal,
      onUploadProgress: (progressEvent) => {
        uploadProgress.value = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
      }
    });
    
    alert('上传成功！');
  } catch (error) {
    if (axios.isCancel(error)) {
      alert('上传已取消');
    } else {
      alert('上传失败');
      console.error(error);
    }
  } finally {
    isUploading.value = false;
    controller = null;
  }
};

const handleCancel = () => {
  if (controller) {
    controller.abort();
  }
};
</script>
```

## 注意事项

1. 上传大文件时建议设置较长的超时时间
2. 取消上传后需要正确处理清理工作
3. 注意内存泄漏问题，确保组件销毁时取消未完成的上传
4. 建议添加上传大小限制和文件类型验证
5. 考虑添加断点续传功能处理大文件上传

## 相关资源

- [Axios 官方文档](https://axios-http.com/)
- [XMLHttpRequest.upload](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/upload)
- [AbortController](https://developer.mozilla.org/en-US/docs/Web/API/AbortController)
