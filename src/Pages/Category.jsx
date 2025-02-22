import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

function Category() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setopenModal] = useState(false);
  const [nameUz, setNameUz] = useState("");
  const [nameRu, setNameRu] = useState("");
  const [images, setImages] = useState(null);
  const [selectedItem,setSelectedItem] = useState(null)
  const [deleteModal,setDeleteModal] = useState(null)
  const token = localStorage.getItem("accessToken");
  const handleOpenModal = () => {
    setopenModal(!openModal);
  };
  const imageUrl = "https://realauto.limsa.uz/api/uploads/images";
  const getCategory = () => {
    setLoading(true);
    axios({
      url: "https://realauto.limsa.uz/api/categories",
      method: "GET",
    })
      .then((res) => {
        setCategories(res.data.data);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const addCategory = () => {
    setLoading(true);
    const formdata = new FormData();
    formdata.append("name_en", nameUz);
    formdata.append("name_ru", nameRu);
    if (images) {
      formdata.append("images", images);
    }
    axios({
      url: `https://realauto.limsa.uz/api/categories/${selectedItem?.id}`,
      method: selectedItem?'PUT':'POST',
      data: formdata,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        toast.success("Add CAtegories");
        getCategory();
        setopenModal(false);
        setSelectedItem(null)
      })
      .finally(() => {
        setLoading(false);
      });
  };
   const closeModal = () =>{
    setopenModal(false);
    setSelectedItem(null) 
    setNameUz('')
    setNameRu('')
   }
  useEffect(() => {
    getCategory();
  }, []);

  const showEdit = (category) =>{
    setSelectedItem(category)
    setopenModal(true);
    setNameUz(category.name_en)
    setNameRu(category.name_ru);
  }

   const deleteCategory = (id) =>{
      axios({
        method:'DELETE',
        url:`https://realauto.limsa.uz/api/categories/${deleteModal}`,
        headers:{
            Authorization: `Bearer ${token}`
        }
      }).then(()=>{
      toast.success("Delele Category")
      const updateCategory = categories.filter(item=> item?.id !==selectedItem?.id )
      setCategories(updateCategory)
      setSelectedItem(null)
      })
   }

  return (
    <>
      {deleteModal ?  <div>
        <p>Haqiqatdan ham o'chirasanmi?</p>
        <button onClick={()=>setDeleteModal(null)}>Yo'q</button>
        <button onClick={deleteCategory}>Ha</button>
      </div>:''}
      <button onClick={handleOpenModal}>Add category</button>
      {!openModal ? (
        ""
      ) : (
        <form class="w-full max-w-sm">
          <button onClick={closeModal}>X</button>
          <div class="md:flex md:items-center mb-6">
            {selectedItem?"Edit Modal":"Add Modal"}
            <div class="md:w-1/3">
              <label
                class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                for="inline-full-name"
              >
                Full Name
              </label>
            </div>
            <div class="md:w-2/3">
              <input
                class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="inline-full-name"
                type="text"
                onChange={(e) => setNameUz(e.target.value)}
                value={nameUz}
              />
            </div>
          </div>
          <div class="md:flex md:items-center mb-6">
            <div class="md:w-1/3">
              <label
                class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                for="inline-password"
              >
                Password
              </label>
            </div>
            <div class="md:w-2/3">
              <input
                class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="inline-password"
                type="text"
                placeholder=""
                onChange={(e) => setNameRu(e.target.value)}
                value={nameRu}
              />
            </div>
          </div>
          <div class="md:flex md:items-center mb-6">
            <div class="md:w-1/3">
              <label
                class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                for="inline-password"
              >
                Images
              </label>
            </div>
            <div class="md:w-2/3">
              <input
                class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="inline-password"
                type="file"
                placeholder=""
                onChange={(e) => setImages(e.target.files[0])}
              />
            </div>
          </div>

          <div class="md:flex md:items-center">
            <div class="md:w-1/3"></div>
            <div class="md:w-2/3">
              <button onClick={addCategory} type="button" class="bg-indigo-500 p-2 border rounded-2xl text-white" disabled={loading}>
               {loading?"Yuborilmoqda ...": "Yuborish"}
              </button>
            </div>
          </div>
        </form>
      )}
      <div className="grid grid-cols-2 pt-5 gap-5">
        {loading ? (
          <div>Loading...</div>
        ) : (
          categories.map((category) => (
            <div
              className="grid grid-cols-1 gap-5 p-5 bg-[#939396] rounded-[20px]"
              key={category.id}
            >
              <div className="flex justify-between">
                <h1 className="text-white text-[24px]">Name:</h1>
                <p className="text-white text-[24px]">{category.name_en}</p>
              </div>
              <img
                className="w-[450px] h-[300px]"
                src={`https://realauto.limsa.uz/api/uploads/images/${category.image_src}`}
                alt={category.name_en}
              />
              <button onClick={()=>showEdit(category)}>Edit</button> 
              <button onClick={()=>setDeleteModal(category.id)}>Delete</button>
            </div>
          ))
        )}
      </div>
    
    </>
  );
}

export default Category;
