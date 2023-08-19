export const validate = (payload, setInvalidFields) => {
  let invalid = 0; // đếm các trường không hợp lệ
  let fields = Object.entries(payload); // chuyển obj thành mảng và mỗi phần tử là 1 mảng nhỏ gồm key và value
  let min = 6,
    max = 20,
    phoneNumber = 10;

  // Set để duy trì danh sách lỗi duy nhất
  //   check rỗng

  fields.forEach((item) => {
    // map qua từng phần tử =>> mỗi pt ở đây vẫn là 1 mảng nhỏ
    // console.log("map",item)
    if (item[1] === "") {
      setInvalidFields((prev) => [
        // prev ở đây là invalidField trước nếu có => tức là nếu có lỗi trước đó thì giải ra và giữ lại sau đó + thêm lỗi tiếp
        ...prev, // dã invalidField ra
        {
          name: item[0], // tên của trường k hợp lệ
          mess: `Không được bỏ trống.`,
        },
      ]);
      invalid += 1;
    }
  });

  //   check pass
  fields.forEach((item) => {
    switch (item[0]) {
      case "password":
        if (item[1].length < min) {
          // min = 6
          setInvalidFields((prev) => [
            ...prev,
            {
              name: item[0],
              mess: `Mật khẩu phải có tối thiểu ${min} kí tự`,
            },
          ]);
          invalid++;
        } else if (item[1].length > max) {
          // max = 20
          setInvalidFields((prev) => [
            ...prev,
            {
              name: item[0],
              mess: `Mật khẩu không được vượt quá ${max} kí tự`,
            },
          ]);
          invalid += 1;
        }
        break;
      case "phone":
        if (!+item[1]) {
          setInvalidFields((prev) => [
            ...prev,
            {
              name: item[0],
              mess: `Số điện thoại phải là số.`,
            },
          ]);
          invalid += 1;
        } else if (+item[1].length < phoneNumber) {
          setInvalidFields((prev) => [
            ...prev,
            {
              name: item[0],
              mess: `Số điện thoại phải đủ ${phoneNumber} ký tự`,
            },
          ]);
          invalid += 1;
        } else if (+item[1].length > phoneNumber) {
          setInvalidFields((prev) => [
            ...prev,
            {
              name: item[0],
              mess: `Số điện thoại không được vượt quá ${phoneNumber} ký tự`,
            },
          ]);
          invalid += 1;
        }
        break;
      case "priceNumber":
      case "acreageNumber":
        if (+item[1] === 0) {
          setInvalidFields((prev) => [
            ...prev,
            {
              name: item[0],
              mess: `Chưa nhập giá trị!`,
            },
          ]);
          invalid += 1;
        };
        if (!+item[1]) {
          setInvalidFields((prev) => [
            ...prev,
            {
              name: item[0],
              mess: `Trường này phải là số`,
            },
          ]);
          invalid += 1;
        }
        break;
      default:
        break;
    }
  });
  return invalid;
};
