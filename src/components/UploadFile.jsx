import React, { memo, useEffect, useState } from "react";
import icons from "../utilities/icons";
import { apiUploadImages } from "../services/post";
import Loading from "./Loading";
import { useSelector } from "react-redux";

const { FcSwitchCamera, RiDeleteBin5Line } = icons;

const UploadFile = ({ id, type, payload, setPayload, setInvalidFields, invalidFields }) => {
  const { dataEdit } = useSelector((state) => state.post);
  // console.log(dataEdit)
  const [preview, setPreview] = useState([]);
  // const [isLoading, setIsLoading] = useState(false)

  

  const handleFiles = (e) => {
    e.stopPropagation();
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      const reader = new FileReader(); // đọc các tệp dữ liệu hình ảnh, video, văn bản
      reader.onload = (e) => {
        setPreview((prev) => [...prev, e.target.result]);
      };
      reader.readAsDataURL(selectedImage);
      setPayload((prev) => ({...prev, images: [...payload, selectedImage]}));
    }
  };
  // useEffect(() => {
  //   let imageArr = [...preview];
  //   setPayload((prev) => ({ ...prev, images: [...imageArr] }));
  // }, [preview]);
  useEffect(() =>{
    if(dataEdit){
      let images = JSON.parse(dataEdit?.images?.image)
      console.log(images)
      images && setPreview(images)
    }
  }, [dataEdit])

  const handleDeleteImage = (index) => {
    const newPreview = [...preview];
    newPreview.splice(index, 1);
    const newImages = [...payload];
    newImages.splice(index, 1);

    // console.log("check",deletedItem)
    setPreview(newPreview);
    setPayload((prev) => ({
      ...prev,
      images: newImages,
    }));
  };
  return (
    <>
      <h3 className="overview-image__heading">Hình ảnh</h3>
      <small className="overview-image__introduce">
        Cập nhật hình ảnh rõ ràng sẽ cho thuê nhanh hơn
      </small>
      <div className="overview-image__file">
        <label htmlFor={id}>
          <FcSwitchCamera />
          <span>Thêm ảnh</span>
        </label>
        <input
          name="images"
          onChange={(e) => handleFiles(e)}
          type={id}
          id={id}
          multiple
        />
      </div>
      <small className="select--error input--error">
        {invalidFields?.some((item) => item.name === "images") &&
          invalidFields?.find((item) => item.name === "images")?.mess}
      </small>

      <div className="preview row">
        {preview?.map((item, index) => {
          return (
            <div key={index} className="preview-images row">
              <img src={item} alt="ảnh" />
              <RiDeleteBin5Line onClick={() => handleDeleteImage(index)} />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default memo(UploadFile);
