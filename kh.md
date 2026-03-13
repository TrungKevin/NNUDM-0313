# Kế hoạch hoàn thành bài tập NNPTUD-C6

## 1. Chuẩn bị môi trường
- Đảm bảo đã clone code mới nhất từ git về máy.
- Cài đặt đầy đủ Node.js, npm, MongoDB.
- Chạy `npm install` để cài dependencies.
- Khởi động MongoDB (mặc định port 27017).
- Chạy server bằng `npm start`.

## 2. Thực hiện chức năng login và /me trên Postman
- Mở Postman.
- Gửi request POST tới `/api/v1/auth/login` với body chứa username, password hợp lệ.
- Lưu lại ảnh màn hình kết quả trả về token.
- Gửi request GET tới `/api/v1/auth/me` với header Authorization: Bearer <token> vừa nhận được.
- Lưu lại ảnh màn hình kết quả trả về thông tin user.

## 3. Viết hàm changepassword (yêu cầu đăng nhập)
- Tạo endpoint mới: `PUT /api/v1/auth/changepassword`.
- Yêu cầu header Authorization: Bearer <token>.
- Body gồm 2 trường: `oldpassword`, `newpassword`.
- Validate:
  - `newpassword` phải đủ mạnh (ví dụ: >=6 ký tự, có số/chữ).
  - Kiểm tra `oldpassword` đúng với mật khẩu hiện tại.
  - Nếu đúng, cập nhật mật khẩu mới (hash lại bằng bcrypt).
  - Nếu sai, trả về lỗi.
- Test lại trên Postman, chụp ảnh kết quả thành công và thất bại.

## 4. Chuyển JWT sang thuật toán RS256
- Tìm hiểu JWT với thuật toán RS256 (asymmetric, dùng public/private key).
- Sinh cặp khóa RSA (private.key, public.key) bằng lệnh openssl:
  - `openssl genrsa -out private.key 2048`
  - `openssl rsa -in private.key -pubout -out public.key`
- Thay đổi code backend:
  - Khi sign token, dùng private.key và thuật toán RS256.
  - Khi verify token, dùng public.key và thuật toán RS256.
- Test lại login và /me trên Postman với token mới.
- Chụp ảnh kết quả.

## 5. Nộp bài
- Đẩy code đã sửa lên git (bao gồm 2 file private.key, public.key).
- Đính kèm các ảnh chụp màn hình vào thư mục (ví dụ: /images hoặc /screenshots).
- Đảm bảo README hoặc file hướng dẫn rõ ràng các bước test.

---

## Ghi chú
- Luôn kiểm tra log server khi gặp lỗi.
- Nếu cần hướng dẫn chi tiết từng bước code, hãy hỏi lại từng phần cụ thể.
- Có thể tham khảo tài liệu JWT, bcrypt, Express middleware để hiểu sâu hơn.


Lưu ý quan trọng: mỗi khi làm xong chức năng nên test lại và chụp ảnh màn hình lưu lại.

---

## Hướng dẫn mã hóa/nén ảnh chụp màn hình trước khi nộp bài

1. Tạo thư mục mới trong dự án, ví dụ: `screenshots` hoặc `images`.
2. Đặt tất cả ảnh chụp màn hình vào thư mục này. Đổi tên file ảnh cho rõ ràng, ví dụ:
   - login.png
   - me.png
   - changepassword_success.png
   - changepassword_fail.png
3. Nén thư mục ảnh lại thành file `.zip` để dễ nộp và bảo vệ file ảnh:
   - Trên Windows: Chuột phải vào thư mục `screenshots` → Send to → Compressed (zipped) folder.
   - Đặt tên file: `screenshots.zip`
4. (Tùy chọn) Nếu muốn đặt mật khẩu bảo vệ file zip:
   - Dùng phần mềm WinRAR hoặc 7-Zip:
     - WinRAR: Chuột phải file/thư mục → Add to archive... → Set password...
     - 7-Zip: Chuột phải → 7-Zip → Add to archive... → Nhập mật khẩu ở mục Encryption.
   - Ghi chú mật khẩu vào README hoặc gửi riêng cho giảng viên nếu được yêu cầu.
5. Đưa file `screenshots.zip` (hoặc `.rar`) vào thư mục dự án, commit và push lên git cùng code.

**Lưu ý:** Phải luôn luôn test khi làm xong chức năng phải không lỗi trước khi làm chức năng mới và luôn đọc lại file kh.md trước khi thực hiện làm bước tiếp theo 