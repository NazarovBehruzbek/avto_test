import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
function Models() {
    const [models,setModels] = useState([]);
    const [brand,setBrand] = useState([]);
    const [name, setName] = useState('');
    const [brandId, setBrandId] = useState(null)
    const [loading,setLoading] = useState(false);
    const token = localStorage.getItem('accessToken');
    const getModels = () =>{
        axios.get('https://realauto.limsa.uz/api/models').then(res=>{
            setModels(res?.data?.data)
        })
    }
    const getBrands = () =>{
        axios.get('https://realauto.limsa.uz/api/brands').then(res=>{
            setBrand(res?.data?.data)
        })
    }
    useEffect(()=>{
        getModels()
        getBrands()
    },[])

    const addModels = () =>{
        setLoading(true)
        const formdata = new FormData()
        formdata.append('name',name)
        formdata.append('brand_id',brandId)
        axios({
            url: "https://realauto.limsa.uz/api/models",
            method: "POST",
            data: formdata,
            headers:{
                Authorization: `Bearer ${token}`
            }
        }).then(res=>{
            toast.success("Add Models")
            getModels()
    }).finally(()=>{
        setLoading(false)
    })
    }
    
  return (
   <>
   <input type="text" placeholder='name' onChange={(e)=>setName(e?.target?.value)}/>
   <select name="" id="" onChange={(e)=>setBrandId(e?.target?.value)}>
    <option value="" disabled>Select Brands</option>
    {
        brand.map((item) => (
            <option value={item.id}>{item.title}</option>
        ))
    }
   </select>
   <button onClick={addModels}>Save</button>
    <div className="grid grid-cols-2 pt-5 gap-5">
        {models.map((item) => (
            <div
              className="grid grid-cols-1 gap-5 p-5 bg-[#939396] rounded-[20px]"
              key={item.id}
            >
              <div className="flex justify-between">
                <h1 className="text-white text-[24px]">Name:</h1>
                <p className="text-white text-[24px]">{item.name}</p>
              </div>
              
            </div>
          ))}
    </div>
   </>
  )
}

export default Models