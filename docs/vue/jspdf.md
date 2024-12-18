# jsPDF 使用指南

jsPDF 是一个用于在客户端生成 PDF 文档的 JavaScript 库。本文将介绍 jsPDF 的基本用法和一些常见操作。

## 基础使用

### 1. 安装

```bash
npm install jspdf
```

### 2. 创建 PDF 实例

```javascript
import jsPDF from 'jspdf';

const pdf = new jsPDF({
  orientation: "portrait", // 方向：portrait-纵向，landscape-横向
  unit: "mm",             // 单位：pt, mm, cm, in
  format: "a4"            // 纸张大小：a4, a3 等
});
```

### 3. 基本操作

#### 文本操作

```javascript
// 设置字体大小
pdf.setFontSize(12);

// 设置字体颜色（RGB格式）
pdf.setTextColor(0, 0, 0);  // 黑色
pdf.setTextColor("#000000"); // 也可以使用十六进制

// 添加文本
pdf.text("Hello World", x, y);

// 文本换行处理
const text = "这是一段很长的文本...";
const maxWidth = 50;
const wrappedText = pdf.splitTextToSize(text, maxWidth);
pdf.text(wrappedText, x, y);
```

#### 图片操作

```javascript
// 添加图片（支持 jpg, png, gif 等格式）
// imageData我这里使用的是base64
pdf.addImage(imageData, "PNG", x, y, width, height);
```

#### 页面操作

```javascript
// 添加新页面
pdf.addPage();

// 设置页面大小
pdf.setPageSize("a4");
```

### 4. 输出 PDF

```javascript
// 生成 blob
const blob = pdf.output("blob");

// 创建预览 URL
const blobURL = URL.createObjectURL(blob);

// 下载 PDF
pdf.save("document.pdf");

// 在新窗口预览
window.open(blobURL, "_blank");
```

## 高级功能

### 1. 自定义字体

```javascript
// 引入字体文件
import './font.js'

// 设置字体
pdf.setFont("customFont");
```

### 2. 分页处理

```javascript
function paginateItems(items, itemsPerPage) {
  const pages = [];
  for (let i = 0; i < items.length; i += itemsPerPage) {
    pages.push(items.slice(i, i + itemsPerPage));
  }
  return pages;
}
```

### 3. 绘制图形

```javascript
// 绘制矩形
pdf.rect(x, y, width, height);

// 设置线条颜色
pdf.setDrawColor(0, 0, 0);

// 设置线条宽度
pdf.setLineWidth(0.1);
```

## 注意事项

1. 坐标系统以页面左上角为原点 (0,0)
2. 单位换算要注意，建议使用 mm 作为单位
3. 添加图片时注意图片大小和格式
4. 中文字体需要额外引入字体文件
5. 生成大量内容时注意性能问题

## 实际应用示例

下面是一个生成资产管理卡片的示例：

```javascript
async function generateAssetCard(asset) {
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4"
  });
  
  // 设置中文字体
  pdf.setFont("simfang");
  
  // 添加背景图
  pdf.addImage(backgroundImage, "PNG", x, y, width, height);
  
  // 添加二维码
  const qrCode = await QRCode.toDataURL(asset.id);
  pdf.addImage(qrCode, "PNG", x, y, width, height);
  
  // 添加文本信息
  pdf.setFontSize(15);
  pdf.text(`资产名称: ${asset.name}`, x, y);
  
  return pdf;
}
```

## 相关资源

- [jsPDF 官方文档](https://artskydj.github.io/jsPDF/docs/jsPDF.html)
- [jsPDF GitHub](https://github.com/parallax/jsPDF)