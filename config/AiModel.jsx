const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} = require("@google/generative-ai");

// Lấy API Key từ biến môi trường
const apiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY;

// Kiểm tra xem API Key có tồn tại không
if (!apiKey) {
    throw new Error("EXPO_PUBLIC_GEMINI_API_KEY không được thiết lập. Vui lòng kiểm tra file .env.");
}

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
};

// Khởi tạo chat session với lịch sử được định nghĩa
export const GeneraTopicsAIModel = model.startChat({
    generationConfig,
    history: [
        {
            role: "user",
            parts: [
                {
                    text: "Học Python: Bạn đóng vai trò là giáo viên hướng dẫn - Người dùng muốn học về chủ đề này - Tạo ra 5–7 tiêu đề khóa học ngắn gọn để học - Đảm bảo các tiêu đề liên quan đến mô tả - Kết quả đầu ra phải là MẢNG (ARRAY) các chuỗi (String) ở định dạng JSON - Không được thêm bất kỳ văn bản thuần (plain text) nào vào kết quả",
                },
            ],
        },
        {
            role: "model",
            parts: [
                {
                    text: JSON.stringify([
                        "Python cơ bản cho người mới",
                        "Phân tích dữ liệu với Python",
                        "Tự động hóa với Python",
                        "Xây dựng web với Python",
                        "Học máy cơ bản với Python",
                    ]),
                },
            ],
        },
    ],

});

export const GeneraCourseAIModel = model.startChat({
    generationConfig,
    history: [
    ],
});