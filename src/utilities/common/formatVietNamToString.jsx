export const formatVietNamToString = (keyword) => {
    return keyword
      .toLowerCase()
      .normalize("NFD") // Chuẩn hóa chuỗi theo bảng mã Unicode
      .replace(/[\u0300-\u036f]/g, "")
      .split(" ")
      .join("-");
  };
  