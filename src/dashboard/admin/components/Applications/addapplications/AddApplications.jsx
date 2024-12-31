import React from "react";
import "../addapplications/AddApplications.css";

const AddApplications = () => {
  return (
    <div>
      <div>
        <div className="add-employee-container">
          <h2>Add New Applications </h2>
          <form className="add-employee-form">
            <div className="form-group">
              <label>FirstName</label>
              <input type="text" name="FirstName" required />
            </div>

            <div className="form-group">
              <label>LastName</label>
              <input type="text" name="LastName" required />
            </div>
            <div className="form-group">
              <label>DateOfBirth</label>
              <input type="text" name="DateOfBirth" required />
            </div>
            <div className="form-group">
              <label>PhoneNumber</label>
              <input type="text" name="PhoneNumber" required />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" name="Email" required />
            </div>

            <div className="form-group">
              <label>Location</label>
              <input type="text" name="Location" required />
            </div>

            <div className="form-group">
              <label>HighestEducation</label>
              <input type="text" name="HighestEducation" required />
            </div>
            <div className="form-group">
              <label>School</label>
              <input type="text" name="School" required />
            </div>
            <div className="form-group">
              <label>CourseOfStudy</label>
              <input type="text" name="CourseOfStudy" required />
            </div>
            <div className="form-group">
              <label>CourseEndDate</label>
              <input type="date" name="CourseEndDate" required />
            </div>
            <div className="form-group">
              <label>ExperiencedLevel</label>
              <input type="text" name="ExperiencedLevel" required />
            </div>
            <div className="form-group">
              <label>LanguageLevel</label>
              <input type="text" name="LanguageLevel" required />
            </div>
            <div className="form-group">
              <label>CurrentCompany</label>
              <input type="text" name="CurrentCompany" required />
            </div>
            <div className="form-group">
              <label>Website</label>
              <input type="text" name="Website" required />
            </div>
            <div className="form-group">
              <label>Message</label>
              <input type="text" name="Message" required />
            </div>
            <div className="form-group">
              <label>Resume</label>
              <input type="text" name="Resume" required />
            </div>
            <div className="form-group">
              <label>Transcript</label>
              <input type="number" name="Transcript" required />
            </div>


            <div className="form-group">
              <label>JobID</label>
              <select name="JobID">
                <option value="">Select Job</option>

                <option value="IT">IT</option>
                <option value="Sale">Sale</option>
              </select>
            </div>
            <div className="button-group">
              <button type="button" className="back-button">
                Back
              </button>
              <button type="submit" className="submit-button">
                Add New Applications
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddApplications;
