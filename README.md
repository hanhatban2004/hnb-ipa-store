# HNB IPA STORE

Website tĩnh tiếng Việt, giao diện responsive, dùng GitHub Pages để hiển thị danh sách ứng dụng và GitHub Releases để lưu trữ tệp IPA.

## Cấu trúc
- `index.html`: trang chính.
- `style.css`: giao diện.
- `config.js`: cấu hình tài khoản, ứng dụng, phiên bản và đường dẫn tải.
- `app.js`: tìm kiếm, hiển thị ứng dụng, tạo liên kết tải/cài.
- `manifests/manifest-template.plist`: mẫu manifest OTA.

## Cấu hình ứng dụng
Mở `config.js` và sửa đối tượng trong mảng `apps`: `name`, `subtitle`, `version`, `build`, `category`, `icon`, `tag`, `ipa`, `manifest`, `size`, `updated`.

Tệp IPA cần được lưu trong GitHub Release của repository đã khai báo. Giá trị `tag` phải khớp tag Release; `ipa` phải khớp tên asset IPA.

## Bật GitHub Pages
Vào **Settings → Pages → Build and deployment**:
1. Chọn **Deploy from a branch**.
2. Chọn branch **main** và thư mục **/(root)**.
3. Nhấn **Save**.

Địa chỉ dự kiến: https://hanhatban2004.github.io/hnb-ipa-store/

## Cài đặt OTA
Tạo manifest riêng từ tệp mẫu, thay bundle ID, bundle version, title và URL HTTPS trực tiếp của IPA. Khai báo đúng đường dẫn manifest trong `config.js`.

**Lưu ý:** GitHub chỉ lưu trữ website và tệp. Cài đặt OTA chỉ hoạt động với IPA đã được ký hợp lệ theo phương thức phân phối phù hợp; manifest không ký ứng dụng và không thay thế chứng chỉ/provisioning profile.