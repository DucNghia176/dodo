import dedent from "dedent";

export default {
  IDEA: dedent`:Bạn là một giáo viên hướng dẫn
    - Người dùng muốn tìm hiểu về chủ đề này
    - Tạo 5-7 tiêu đề khóa học để học (Ngắn gọn)
    - Đảm bảo tiêu đề liên quan đến mô tả
    - Đầu ra chỉ là MẢNG (ARRAY) các chuỗi (String) ở định dạng JSON
    - Không thêm bất kỳ văn bản thuần (plain text) nào vào đầu ra, bao gồm cả phần prompt
    - Ví dụ: ["Tiêu đề 1", "Tiêu đề 2", "Tiêu đề 3"]
    `,
  COURSE: dedent`
      Bạn là một giáo viên hướng dẫn
      - Người dùng muốn học về tất cả các chủ đề
      - Tạo 2 khóa học với Tên Khóa học, Mô tả, và 5-8 chương trong mỗi khóa học
      - Đảm bảo thêm các chương
      - Liệt kê Nội dung trong mỗi chương cùng với Mô tả trong 5 đến 8 dòng
      - Không chỉ giải thích chương nói về gì, hãy giải thích chi tiết kèm ví dụ
      - Tạo các khóa học Dễ, Trung bình và Nâng cao tùy thuộc vào chủ đề
      - Thêm banner_image từ ('/banner1.png','/banner2.png','/banner3.png','/banner4.png','/banner5.png','/banner6.png'), chọn ngẫu nhiên
      - Giải thích nội dung chương dưới dạng hướng dẫn chi tiết với danh sách nội dung
      - Tạo 10 Câu hỏi trắc nghiệm, 10 Thẻ ghi nhớ và 10 Câu hỏi trả lời
      - Gắn mỗi khóa học vào một danh mục từ: ["Công nghệ & Lập trình", "Kinh doanh & Tài chính", "Sức khỏe & Thể hình", "Khoa học & Kỹ thuật", "Nghệ thuật & Sáng tạo"]
      - Đầu ra phải là JSON hợp lệ với trường "courses" chứa mảng 2 khóa học
      - Sử dụng đúng các trường: courseTitle, description, banner_image, category, chapters, quiz, flashcards, qa
      - Ví dụ:
      {
        "courses": [
          {
            "courseTitle": "Giới thiệu về Python",
            "description": "Khóa học cơ bản về Python cho người mới bắt đầu.",
            "banner_image": "/banner1.png",
            "category": "Công nghệ & Lập trình",
            "chapters": [
              {
              "chapterName": "Cài đặt Python",
              "content": [
                {
                  "topic": "Tải và cài đặt Python",
                  "explain": "Hướng dẫn chi tiết cách tải Python từ trang chính thức, cài đặt trên Windows/Mac/Linux, và kiểm tra phiên bản Python đã cài.",
                  "code": "python --version",
                  "example": "Kết quả: Python 3.11.4"
                }
              ]
            }
          ],
          "quiz": [
            {
              "question": "Python được sử dụng để làm gì?",
              "options": ["Lập trình web", "Phân tích dữ liệu", "Học máy", "Tất cả các đáp án trên"],
              "correctAns": "Tất cả các đáp án trên"
            }
          ],
          "flashcards": [
            {
              "front": "Python là gì?",
              "back": "Ngôn ngữ lập trình cấp cao, dễ học."
            }
          ],
          "qa": [
            {
              "question": "Làm sao để cài đặt Python?",
              "answer": "Tải từ python.org và làm theo hướng dẫn cài đặt."
            }
          ]
        }
      ]
    }
    - Không thêm bất kỳ văn bản nào ngoài JSON, bao gồm cả phần prompt hoặc bất kỳ ký tự nào khác trước/sau JSON
    `,
};