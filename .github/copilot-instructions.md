# Interactive Mathematics Project - Copilot Instructions

## Tổng quan dự án
Đây là một dự án giáo dục tương tác về toán học, sử dụng JavaScript để triển khai các thuật toán số, trực quan hóa và minh họa các khái niệm toán học phức tạp. Dự án bao gồm nhiều lĩnh vực toán học như giải tích, đại số tuyến tính, lý thuyết đồ thị, mật mã học, blockchain, và nhiều chủ đề khác.

## Nguyên tắc phát triển chính

### 1. Tính giáo dục và dễ hiểu
- **Ưu tiên tính giáo dục**: Mã nguồn phải rõ ràng, dễ hiểu cho người học không có nền tảng mạnh về toán học
- **Giải thích chi tiết**: Thêm nhiều bình luận giải thích thuật toán, công thức và logic
- **Ví dụ thực tế**: Cung cấp ví dụ minh họa cụ thể cho mỗi khái niệm toán học
- **Giải thích trực quan**: Mô tả cách hoạt động của các minh họa và trực quan hóa

### 2. Chất lượng mã nguồn
- **Modern JavaScript**: Sử dụng ES6+ features (arrow functions, destructuring, template literals, async/await)
- **Modular code**: Tổ chức mã thành các module và function nhỏ, tái sử dụng được
- **Clean code**: Tên biến và function có ý nghĩa, logic rõ ràng
- **Error handling**: Xử lý lỗi phù hợp và thông báo lỗi có ý nghĩa

### 3. Nội dung toán học
- **Công thức đầy đủ**: Hiển thị công thức toán học bằng MathJax với ký hiệu LaTeX
- **Bối cảnh lý thuyết**: Giải thích nền tảng toán học trước khi triển khai
- **Ứng dụng thực tế**: Đưa ra các ví dụ ứng dụng trong đời sống và công nghệ
- **Độ chính xác**: Đảm bảo tính chính xác về mặt toán học

### 4. Trực quan hóa và tương tác
- **Responsive design**: Giao diện hoạt động tốt trên nhiều kích thước màn hình
- **Interactive controls**: Slider, button, input để người dùng thay đổi tham số
- **Real-time updates**: Cập nhật minh họa ngay khi thay đổi tham số
- **Visual feedback**: Hiệu ứng trực quan rõ ràng và mượt mà

## Cấu trúc dự án

### Các thư mục chính:
- `algorithms-datastructures/`: Thuật toán và cấu trúc dữ liệu
- `calculus/`: Giải tích (đạo hàm, tích phân, chuỗi Taylor)
- `complex-analysis/`: Giải tích phức (số phức, ánh xạ conformal)
- `linear-algebra/`: Đại số tuyến tính (ma trận, vector, eigenvalue)
- `optimization/`: Tối ưu hóa (gradient descent, Newton method)
- `machine-learning/`: Máy học (regression, neural networks)
- `cryptography/`: Mật mã học (RSA, AES, elliptic curves)
- `blockchain/`: Blockchain và DeFi
- `fourier-analysis/`: Phân tích Fourier
- `graph-theory/`: Lý thuyết đồ thị

### Cấu trúc file HTML:
```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Tiêu đề có ý nghĩa</title>
    <script src="../mathjax-config.js"></script>
    <script src="https://polyfill.io/v3/polyfill.min.js?features=es6"></script>
    <script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
</head>
```

## Hướng dẫn cụ thể theo lĩnh vực

### Thuật toán số (Numerical Methods)
- Triển khai các phương pháp như Newton-Raphson, Runge-Kutta
- Hiển thị convergence behavior và error analysis
- So sánh độ chính xác của các phương pháp khác nhau

### Trực quan hóa (Visualization)
- Sử dụng Canvas API hoặc D3.js cho đồ thị 2D
- Three.js cho trực quan hóa 3D
- Animation mượt mà với requestAnimationFrame
- Color coding có ý nghĩa cho dữ liệu

### Tương tác người dùng (User Interaction)
- Control panel rõ ràng với labels mô tả
- Range sliders với giá trị min/max hợp lý
- Buttons để start/stop/reset animation
- Input validation và error messages

### Hiệu suất (Performance)
- Tối ưu hóa tính toán cho real-time interaction
- Sử dụng Web Workers cho tính toán nặng
- Debouncing cho user input
- Efficient rendering techniques

## Tiêu chuẩn documentation

### Comments trong code:
```javascript
/**
 * Tính toán gradient descent để tìm minimum của function
 * @param {Function} f - Hàm mục tiêu cần tối ưu
 * @param {Function} gradient - Gradient của hàm f
 * @param {number} learningRate - Tốc độ học (learning rate)
 * @param {number} maxIterations - Số lần lặp tối đa
 * @returns {Object} Kết quả với giá trị x optimal và lịch sử convergence
 */
function gradientDescent(f, gradient, learningRate = 0.01, maxIterations = 1000) {
    // Implementation với comments giải thích từng bước
}
```

### Giải thích toán học:
- Mô tả bài toán trước khi giải
- Giải thích ý nghĩa vật lý hoặc hình học
- Nêu rõ assumptions và limitations
- Cung cấp references cho tài liệu học thuật

### Ví dụ sử dụng:
- Đưa ra ít nhất 2-3 ví dụ cụ thể
- Giải thích expected results
- Hướng dẫn cách thay đổi parameters
- Gợi ý các thí nghiệm mở rộng

## Checklist cho mỗi file mới:

- [ ] Có đủ mathematical context và explanation
- [ ] Code được comment đầy đủ và rõ ràng  
- [ ] Có interactive controls để thay đổi parameters
- [ ] Responsive design cho mobile và desktop
- [ ] Error handling phù hợp
- [ ] Mathematical formulas được render bằng MathJax
- [ ] Có ví dụ minh họa cụ thể
- [ ] Performance tối ưu cho real-time interaction
- [ ] Cross-browser compatibility
- [ ] Accessibility features (ARIA labels, keyboard navigation)

## Lưu ý đặc biệt:

1. **Độ chính xác toán học**: Luôn verify kết quả với tài liệu học thuật
2. **Giáo dục**: Prioritize learning value over computational efficiency
3. **Tương tác**: Mọi parameter quan trọng đều có thể điều chỉnh
4. **Trực quan**: Sử dụng màu sắc và animation có ý nghĩa
5. **Documentation**: Giải thích "tại sao" chứ không chỉ "làm thế nào"

Nhớ rằng mục tiêu cuối cùng là tạo ra một công cụ học tập hiệu quả, giúp người dùng hiểu sâu về toán học thông qua trải nghiệm tương tác trực quan.