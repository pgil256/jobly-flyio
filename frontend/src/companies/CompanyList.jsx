import React, { useState, useEffect } from 'react';
import SearchForm from '../common/SearchForm';
import JoblyApi from '../api';
import CompanyCard from './CompanyCard';
import './Company.css';
import LoadingSpinner from '../common/LoadingSpinner';

const CompanyList = () => {
	const [ companies, setCompanies ] = useState(null);

	useEffect(function getCompaniesOnMount() {
		search();
	}, []);

	async function search(name) {
		let companies = await JoblyApi.getCompanies(name);
		setCompanies(companies);
	}

	if (!companies) return <LoadingSpinner />;

	return (
		<div>
			<SearchForm searchFor={search} />
			{companies.length ? (
				<div id='list'>
					{companies.map((company) => (
						<CompanyCard
							key={company.handle}
							handle={company.handle}
							name={company.name}
							description={company.description}
							logoUrl={company.logoUrl}
						/>
					))}
				</div>
			) : (
				<p>No results.</p>
			)}
		</div>
	);
};

export default CompanyList;
