import React from 'react'

const CreateBlog = () => {
  return (
    <div>
      <div>
        <h3 className='text-center py-4'>Create Blog </h3>
        <form className="row g-3">
          <div className="col-md-6">
            <label htmlFor="inputEmail4" className="form-label">Catelogy_Id</label>
            <select className="form-select" aria-label="Default select example">
              <option selected>Catelogy_Id</option>
              <option value={1}>One</option>
              <option value={2}>Two</option>
              <option value={3}>Three</option>
            </select>

          </div>
          <div className="col-md-6">
            <label htmlFor="inputPassword4" className="form-label">Employee_Id</label>
            <input type="text" className="form-control" id="Employee_Id" />
          </div>
          <div className="col-md-6">
            <label htmlFor="inputAddress" className="form-label">PostNumber</label>
            <input type="text" className="form-control" id="PostNumber" name="PostNumber" />
          </div>
          <div  className="col-md-6">
            <label htmlFor="inputAddress2" className="form-label">Title</label>
            <input type="text" className="form-control" id="Title" name='Title' />
          </div>
          <div  className="col-12">
            <label htmlFor="inputAddress2" className="form-label">Content</label>
            <textarea class="form-control" aria-label="With textarea"name='Content' ></textarea>
          </div>

          <div className="col-md-6">
            <label htmlFor="inputCity" className="form-label" name="CreatedAt">CreatedAt</label>
            <input type="date" className="form-control" id="CreatedAt" name="CreatedAt" />
          </div>
          <div className="col-md-6">
            <label htmlFor="inputCity" className="form-label" name="CreatedAt">UpdatedAt</label>
            <input type="date" className="form-control" id="CreatedAt" name="UpdatedAt" />
          </div>
          <div className="col-md-6">
            <label htmlFor="inputCity" className="form-label" name="PublishedAt">PublishedAt</label>
            <input type="text" className="form-control" id="inputCity"  name='PublishedAt' />
          </div>
          <div className="col-md-4">
            <label htmlFor="inputState" className="form-label">Status</label>
            <select id="Status" className="form-select" name='Status'>
              <option selected>Choice Status</option>
              <option>Reading</option>
              <option>Offer</option>
            </select>
          </div>
          {/* <div className="col-md-2">
            <label htmlFor="inputZip" className="form-label">Zip</label>
            <input type="text" className="form-control" id="inputZip" />
          </div>
          <div className="col-12">
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="gridCheck" />
              <label className="form-check-label" htmlFor="gridCheck">
                Check me out
              </label>
            </div>
          </div> */}
          <div className="col-12">
            <button type="submit" className="btn btn-primary">Create Blog</button>
          </div>
        </form>

      </div>
    </div>
  )
}

export default CreateBlog
