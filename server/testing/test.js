const axios = require("axios");

const data = {
  username: "admin",
  password: "123",
  name: "admin",
  number: "0123456789",
  email: "admin@gmail.com",
};

axios
  .post("http://localhost:4000/login", data)
  .then((response) => {
    console.log("Phản hồi từ máy chủ:", response.data);
  })
  .catch((error) => {
    console.error("Lỗi khi gửi yêu cầu POST:", error);
  });
