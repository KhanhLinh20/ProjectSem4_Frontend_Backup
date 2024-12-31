import React, { useState } from "react";
import BannerOpport from "../components/opportunity/BannerOpport";
import SiderOpport from "../components/opportunity/SiderOpport";
import ContentOpport from "../components/opportunity/ContentOpport";


const Opportunity = () => {
  const [filters, setFilters] = useState({ department: [], level: [], location: [] });

  return (
    <div>
      <div>
        <BannerOpport />
      </div>
      <div className="">
      <div className="container my-4">
        <div className="row">
          {/* Sidebar */}
          <div className="col-md-3">
            <SiderOpport setFilters={setFilters}/>
          </div>

          {/* Main Content */}
          <div className="col-md-9">
            <h4 className="text-center py-3">Job Opportunities</h4>
            <ContentOpport filters={filters}/>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Opportunity;
