import React from 'react'
import { NavLink } from 'react-router-dom'

const AdminBlog = () => {
  return (
    <div>
      <div className="table-title my-3">
        <div className="row">
          <div className="col-sm-6 p-0 d-flex justify-content-lg-start justify-content-center">
            <h2 className="ml-lg-2 mx-3">Blog</h2>
          </div>
          <div className="col-sm-6 p-0 d-flex justify-content-lg-end justify-content-center px-2">
            <NavLink to="/admin/createblog" className="btn btn-success" >
              <i class="fa-solid fa-plus bg-white text-success" style={{ borderRadius: "50%" }}></i> <span>Add New Blog</span></NavLink>
            {/* <a href="" className="btn btn-danger">
              <i class="fa-solid fa-minus bg-white text-danger " style={{ borderRadius: "50%" }}></i><span> Delete</span></a> */}
          </div>
        </div>
      </div>

      <div
        class="table-responsive"
      >

        <div className="input-group mb-3">
          <input type="text" className="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2" />
          <span className="input-group-text" id="basic-addon2">Search Name</span>
        </div>



        <table
          class="table table-striped table-hover table-borderless table-primary align-middle"
        >
          <thead class="table-light">


            <tr>
              <th>Post_Id</th>
              <th>Catelogy_Id</th>
              <th>Employee_Id</th>
              <th>PostNumber</th>
              <th>Title</th>
              <th>Content</th>
              <th>CreatedAt</th>
              <th>UpdatedAt</th>
              <th>PublishedAt</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody class="table-group-divider">
            <tr
              class="table-primary"
            >
              <td scope="row">P001</td>
              <td>C001</td>
              <td>E001</td>
              <td>P000122</td>
              <td>IT Post</td>
              <td>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, ducimus.</td>
              <td>12/12/2024</td>
              <td>13/12/2024</td>
              <td>open</td>
              <td>Reading</td>
              <td>
                <div>
                  <NavLink to="/admin/updateblog" className="edit" data-toggle="modal">
                    <i class="fa-solid fa-pen"></i></NavLink>
                  <a href="" data-bs-toggle="modal" data-bs-target="#deleteblog" className='blog'style={{padding:"0 5px"}}>
                    <i class="fa-solid fa-trash"></i></a>
                </div>


              </td>
            </tr>


          </tbody>

        </table>

      </div>
      {/* modal delete blog */}
      <div className="modal fade" id="deleteblog" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Delete Blog</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">
              Are you sure you want to delete these Records?
              <p class="text-danger"><small>This action cannot be undone.</small></p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-danger">Delete Done</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminBlog
