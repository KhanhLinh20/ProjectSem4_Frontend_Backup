import React from 'react'

const AdminVacancy = () => {
  return (
    <div>
          <h2>Catelogy Product</h2>
      <div
        class="table-responsive"
      >
        <div>
          <button className=' btn btn-primary my-2 '><a href="/admin/createvacancy" className='' style={{ color: "white", textDecoration: "none" }}>Create</a></button>

        </div>
        <div className="input-group mb-3">
          <input type="text" className="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2" />
          <span className="input-group-text" id="basic-addon2">Search Name</span>
        </div>

        <table
          class="table table-striped table-hover table-borderless table-primary align-middle"
        >
          <thead class="table-light">
            <caption>
              Vacancy
            </caption>

            <tr>
              <th>VacanCy_Id</th>
              <th>Department_Id</th>
              <th>Employee_Id</th>
              <th>CreateDate</th>
              <th>EditeDate</th>
              <th>CloseDate</th>
              <th>Status</th>
              <th>Title</th>
              <th>Description</th>
              <th>Slot</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody class="table-group-divider">
            <tr
              class="table-primary"
            >
              <td scope="row">V001</td>
              <td>D001</td>
              <td>E001</td>
              <td>12/12/2024</td>
              <td>13/12/2024</td>
              <td>01/02/2025</td>
              <td>open</td>
              <td>Lorem ipsum dolor sit amet.</td>
              <td>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, ducimus.</td>
              <td>3</td>

              <td>
                <button className='btn btn-primary m-1'><a href="updatecatelogy" className='' style={{ color: "white", textDecoration: "none" }}>Update</a></button>
                <button className='btn btn-danger'><a href="#" className='' style={{ color: "white", textDecoration: "none" }}>Delete</a></button>

              </td>
            </tr>
         

          </tbody>

        </table>
      </div>
      
    </div>
  )
}

export default AdminVacancy
