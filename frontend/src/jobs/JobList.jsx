import React, { useState, useEffect } from 'react';
import Search from '../common/SearchForm';
import JoblyApi from '../api';
import JobCardList from './JobCardList';
import LoadingSpinner from '../common/LoadingSpinner';

const JobList = () => {
	const [ jobs, setJobs ] = useState(null);

	useEffect(function getAllJobsOnMount() {
		search();
	}, []);

	async function search(title) {
		let jobs = await JoblyApi.getJobs(title);
		setJobs(jobs);
	}

	
	if (!jobs) return <LoadingSpinner />;

	return (
		<div>
			<Search searchFor={search} />
			{jobs.length ? <JobCardList jobs={jobs} /> : <p>No results.</p>}
		</div>
	);
};

export default JobList;