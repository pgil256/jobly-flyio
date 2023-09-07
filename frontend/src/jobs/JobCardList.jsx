import React, { useContext, useState, useEffect } from "react";
import "./Jobs.css";
import UserContext from "../auth/UserContext";

function JobCardList({ jobs = [] }) {
  console.debug("JobCard");

  const { hasAppliedToJob, applyToJob } = useContext(UserContext);

  // This state is now an object which keeps track of multiple job applications
  const [applied, setApplied] = useState({});

  useEffect(
    function updateAppliedStatus() {
      const appliedJobs = {};
      for (let job of jobs) {
        appliedJobs[job.id] = hasAppliedToJob(job.id);
      }
      setApplied(appliedJobs);
    },
    [jobs, hasAppliedToJob]
  );

  /** Apply for a job */
  async function handleApply(jobId) {
    if (applied[jobId]) return;
    applyToJob(jobId);
    setApplied((data) => ({ ...data, [jobId]: true }));
  }

  return (
    <div style={{ fontFamily: "Arial, sans-serif", margin: "20px" }}>
      {jobs.map((job) => (
        <div
          key={job.id}
          style={{
            border: "1px solid #e0e0e0",
            borderRadius: "5px",
            padding: "20px",
            marginBottom: "20px",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div style={{ fontWeight: "bold", marginBottom: "10px" }}>
            {job.companyName}
          </div>
          <p style={{ color: "#333", marginBottom: "10px" }}>
            Title: {job.title}
          </p>
          <p style={{ color: "#666", marginBottom: "10px" }}>
            Salary: ${job.salary.toLocaleString()}
          </p>
          <p style={{ color: "#666", marginBottom: "10px" }}>
            Equity: {job.equity}
          </p>
          <p style={{ color: "#444", marginBottom: "10px" }}>
            Company Name: {job.companyName}
          </p>
          <button
            className="btn btn-danger font-weight-bold text-uppercase float-right"
            onClick={() => handleApply(job.id)}
            disabled={applied[job.id]}
          >
            {applied[job.id] ? "Applied" : "Apply"}
          </button>
        </div>
      ))}
    </div>
  );
}

export default JobCardList;
