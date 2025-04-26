import dedent from "dedent";

export default {
  IDEA: dedent`
    Học Python: Bạn đóng vai trò là giáo viên hướng dẫn
    - Người dùng muốn học về chủ đề này
    - Tạo ra 5–7 tiêu đề khóa học ngắn gọn để học
    - Đảm bảo các tiêu đề liên quan đến mô tả
    - Kết quả đầu ra phải là MẢNG (ARRAY) các chuỗi (String) ở định dạng JSON
    - Không được thêm bất kỳ văn bản thuần (plain text) nào vào kết quả
  `,
  COURSE: dedent`
    {
      "courses": [
        {
          "courseName": "Python cơ bản cho người mới",
          "description": "Khóa học dành cho người mới bắt đầu học lập trình Python từ con số 0.",
          "courseBanner": "/banner1.jpg",
          "chapters": [
            {
              "title": "Giới thiệu về Python",
              "content": "Tìm hiểu Python là gì, lịch sử phát triển và các ứng dụng thực tế."
            },
            {
              "title": "Cài đặt và thiết lập môi trường",
              "content": "Hướng dẫn cài đặt Python, thiết lập VS Code và chạy chương trình đầu tiên."
            },
            {
              "title": "Các kiểu dữ liệu cơ bản",
              "content": "Tìm hiểu số, chuỗi, danh sách, tuple, set và dictionary."
            }
          ],
          "quizzes": [
            "Python dùng để làm gì?",
            "Làm thế nào để cài đặt Python?",
            "Danh sách (list) trong Python là gì?",
            "Tuple khác list như thế nào?",
            "Set có các đặc điểm gì?"
          ],
          "flashcards": [
            "Python là ngôn ngữ lập trình cấp cao",
            "List: Mảng các phần tử thay đổi được",
            "Tuple: Mảng các phần tử không thay đổi",
            "Set: Tập hợp các phần tử duy nhất",
            "Dictionary: Cặp key-value",
            "print(): Hàm in dữ liệu ra màn hình",
            "len(): Hàm đếm số lượng phần tử",
            "input(): Hàm nhập dữ liệu từ bàn phím",
            "int(): Ép kiểu sang số nguyên",
            "str(): Ép kiểu sang chuỗi"
          ],
          "questions": [
            "Hãy viết một chương trình in 'Hello World' ra màn hình.",
            "Làm thế nào để ép kiểu dữ liệu từ chuỗi thành số?",
            "Viết một ví dụ về list trong Python.",
            "Sự khác nhau giữa list và set là gì?",
            "Hàm nào dùng để nhập dữ liệu từ bàn phím?"
          ]
        },
        {
          "courseName": "Python ứng dụng thực tế",
          "description": "Khóa học nâng cao kỹ năng Python thông qua các dự án thực tế.",
          "courseBanner": "/banner2.jpg",
          "chapters": [
            {
              "title": "Tự động hóa với Python",
              "content": "Hướng dẫn viết các script tự động hóa công việc văn phòng."
            },
            {
              "title": "Xử lý file Excel với Python",
              "content": "Sử dụng thư viện openpyxl để đọc và ghi file Excel."
            },
            {
              "title": "Web scraping với BeautifulSoup",
              "content": "Thu thập dữ liệu từ website một cách tự động."
            }
          ],
          "quizzes": [
            "Thư viện nào dùng để xử lý Excel?",
            "Tự động hóa là gì?",
            "Web scraping dùng để làm gì?",
            "BeautifulSoup hỗ trợ ngôn ngữ nào?",
            "Các bước cơ bản của một chương trình scraping là gì?"
          ],
          "flashcards": [
            "openpyxl: Thư viện xử lý Excel",
            "BeautifulSoup: Công cụ thu thập dữ liệu web",
            "requests: Gửi yêu cầu HTTP trong Python",
            "Automation: Quá trình tự động hóa công việc",
            "script: Đoạn chương trình nhỏ",
            "pandas: Thư viện phân tích dữ liệu",
            "Excel file: File bảng tính phổ biến",
            "API: Giao diện lập trình ứng dụng",
            "HTML parser: Bộ phân tích HTML",
            "CSV: Định dạng file văn bản dữ liệu bảng"
          ],
          "questions": [
            "Hãy viết code đọc file Excel với openpyxl.",
            "Làm sao gửi yêu cầu HTTP bằng Python?",
            "Viết chương trình lấy tiêu đề của một trang web.",
            "Ưu điểm của BeautifulSoup là gì?",
            "Khi nào nên dùng automation trong công việc?"
          ]
        }
      ]
    }
  `
}
