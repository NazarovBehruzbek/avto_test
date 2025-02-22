import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function Brands() {
  const navigate = useNavigate()
  const [brands, setBrands] = useState([])
  const getCategory = () => {
    axios({
      url: 'https://realauto.limsa.uz/api/brands',
      method: 'GET'
    }).then(res => {
      setBrands(res.data.data)
    })
  }
  useEffect(() => {
    getCategory()
  }, [])

  const singleNavigate = (id) =>{
    navigate(`/single/${id}`)
 }
  return (
    <div className='grid grid-cols-2 pt-5 gap-5'>
      {
        brands.map(category => (
          <div onClick={()=>singleNavigate(category?.id)} className='grid grid-cols-1 gap-5 p-5 bg-[#939396] rounded-[20px]' key={category.id}>
            <div className='flex justify-between'>
              <h1 className='text-white text-[24px]'>Name:</h1>
              <p className='text-white text-[24px]'>{category.title}</p>
            </div>
            <img className='w-[450px] h-[300px]' src={`https://realauto.limsa.uz/api/uploads/images/${category.image_src}`} alt={category.name_en} />
          </div>
        ))
      }
    </div>
  )
}

export default Brands