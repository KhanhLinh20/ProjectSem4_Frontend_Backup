import React, { useEffect, useState } from "react";
import axiosclient from "../../api/Axios";

const SiderOpport = ({setFilters }) => {

    const [category, setCategory] = useState([]);
    const [page, setPage] = useState(0); // Trang hiện tại
    const [totalPages, setTotalPages] = useState(0);
    const fetchdata = async() => {
        try{
            const response = await axiosclient.get('shopee-career/job/list-all-job-category');
            setCategory(response.data.data.filter(item => item.isActive === "Active"));
            console.log("category", response.data.data);
        }catch(error){
            console.log(error);
        }
    }
    

    const [jobLevel, setJobLevel] = useState([]);
    const [uniqueLevels, setUniqueLevels] = useState([]);
    const [uniqueLocations, setUniqueLocations] = useState([]);
    const fetchJobLevel = async() => {
        try{
            const response = await axiosclient.get(`shopee-career/job/list-jobposting?page=${page}&size=10&status=Publish`);
            const jobs = response.data.data.content;
            setJobLevel(jobs);
            console.log(response.data.data.content);
            
            const levels = [...new Set(jobs.map((item) => item.experiencedLevel))];
            setUniqueLevels(levels);
            const locations = [...new Set(jobs.map((item) => item.location))];
            setUniqueLocations(locations);
            console.log(response.data);
        }catch(error){
            console.log(error);
        }
    }


    useEffect(()=>{
        fetchdata();
        fetchJobLevel();
    },[page])

    const handleFilterChange = (type, value) => {
        setFilters((prevFilters) => {
            const updatedFilters = { ...prevFilters };
            if (!updatedFilters[type]) {
                updatedFilters[type] = [];
            }
            if (updatedFilters[type].includes(value)) {
                updatedFilters[type] = updatedFilters[type].filter((item) => item !== value);
            } else {
                updatedFilters[type] = [...updatedFilters[type], value];
            }
            return updatedFilters;
        });
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < totalPages) {
          setPage(newPage); // Cập nhật trang và trigger lại fetching
        }
      };

    return (
        <div>
            <div>

                <div className="d-flex flex-column mb-3" >
                    <a href="/" className="d-flex align-items-center flex-shrink-0 p-3 link-dark text-decoration-none ">
                        <svg className="bi me-2" width={30} height={24}><use xlinkHref="#bootstrap" /></svg>
                    </a>
                    <h5 className="">Department</h5>
                    {category.map((item)=>(
                        <div className="list-group list-group-flush scrollarea">
                            <div className="list-group-item list-group-item-action py-3 lh-tight">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" defaultValue id="flexCheckChecked"  onChange={() => handleFilterChange("department", item.categoryName)}/>
                                    <label className="form-check-label" htmlFor="flexCheckChecked">
                                        {item.categoryName}
                                    </label>
                                </div>
                            </div>
                        </div>
                    ))}
                    <h5>Level</h5>
                    {uniqueLevels.map((level, index) => (
                        <div className="list-group list-group-flush scrollarea">
                            <div
                                key={index}
                                className="list-group-item list-group-item-action py-3 lh-tight"
                            >
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id={`level-${index}`}
                                        onChange={() => handleFilterChange("level", level)}
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor={`level-${index}`}
                                    >
                                        {level}
                                    </label>
                                </div>
                            </div>
                        </div>
                    ))}
                    <h5>Location</h5>
                    <div className="list-group list-group-flush  scrollarea">
                    {uniqueLocations.map((location, index) => (
                        <div className="list-group list-group-flush scrollarea">
                            <div
                            key={index}
                            className="list-group-item list-group-item-action py-3 lh-tight"
                        >
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id={`location-${index}`}
                                    onChange={() => handleFilterChange("location", location)}
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor={`location-${index}`}
                                >
                                    {location}
                                </label>
                            </div>
                        </div>
                        </div>
                    ))}
                    </div>
                </div>

            </div>

        </div>
    )
}

export default SiderOpport
