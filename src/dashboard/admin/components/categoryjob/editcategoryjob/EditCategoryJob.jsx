import React, { useEffect, useState } from "react";
import "../editcategoryjob/EditCategoryJob.css";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import axiosclient from "../../../../../api/Axios";
import Swal from "sweetalert2";

const EditCategoryJob = () => {
  const [category, setcategory] = useState({
    categoryName: "",
  });
  const {id}=useParams();
  console.log(id);
  const navigate = useNavigate();

  const getcate=async ()=>{
    try {
      const res=await axiosclient.get(`/shopee-career/job/jobcategorybyid/${id}`)
      setcategory(res.data.data);
      console.log(res.data.data);
      
    } catch (error) {
      console.error(error);
      
      
    }
  }

  useEffect(()=>{
    getcate();
  },[])


  const handleChange = (e) => {
    const { name, value } = e.target;
    setcategory((pre)=>{
      return {
        ...pre,
        [name]:value,
      }
    });
 
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const formdata=new FormData();
      formdata.append("categoryName",category.categoryName);
      const res=await axiosclient.put(`/shopee-career/job/update-job-category/${id}`,formdata);
      if (res.data?.status===201) {
        await Swal.fire({
          title: "Are you sure?",
          text: "Do you want to change this category name?",
          icon: "question",
          showCancelButton: true,
          confirmButtonText: "Yes, change it!",
          cancelButtonText: "No, cancel",
        })
        
        navigate("/admin/job-category");
        
      }
      
    } catch (error) {

       await Swal.fire({
              title:"Error",
              text:error.response.data?.message,
              icon:"warning",
            })
            console.error("Error update Job Category:",error);
            // setErrors(error.response.data?.message || "Job Title cannot empty");
    }
  };



  return (
    <div>
      <div className="add-employee-container">
        <h2>Edit Job Category</h2>
        <form className="add-category-form" onSubmit={handleSubmit}>
                 <div className="form-group">
                   <label>Category Name</label>
                   <input
                     type="text"
                     name="categoryName"
                     value={category.categoryName}
                     onChange={handleChange}
                   />
                 </div>
          
                 <div className="button-group">
                   <button type="button" className="back-button">
                     <NavLink
                       className="text-white"
                       to="/admin/job-category"
                       style={{ textDecoration: "none" }}
                     >
                       Back
                     </NavLink>
                   </button>
                   <button type="submit" className="submit-button">
                     Update Job Category
                   </button>
                 </div>
               </form>
      </div>
    </div>
  );
};

export default EditCategoryJob;
