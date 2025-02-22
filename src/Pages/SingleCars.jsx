import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function SingleCars() {
  const {id} = useParams();
  const [brands, setBrands] = useState([]);
  const imageUrl = "https://realauto.limsa.uz/api/uploads/images";
  const getCategory = () => {
    axios({
      url: "https://realauto.limsa.uz/api/cars/87a755fd-22f7-4267-a7d4-09426ea842b0",
      method: "GET",
    }).then((res) => {
        console.log(res.data.data);
        
      const single = (res.data.data).filter((item) => item.id === id);
      setBrands(single);
    });
  };
  useEffect(() => {
    getCategory();
  }, []);
  console.log(brands);
  
  return (
    <div>
      <div className="grid grid-cols-2 pt-5 gap-5">
        {brands.map((category) => (           
          <div
            className="grid grid-cols-1 gap-5 p-5 bg-[#939396] rounded-[20px]"
            key={category.id}
          >
            <div className="flex justify-between">
              <h1 className="text-white text-[24px]">Name:</h1>
              <p className="text-white text-[24px]">{category.title}</p>
            </div>
            <img
              className="w-[450px] h-[300px]"
              src={`https://realauto.limsa.uz/api/uploads/images/${category.image_src}`}
              alt={category.name_en}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default SingleCars;
