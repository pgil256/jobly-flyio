import React from 'react';
import { Link } from 'react-router-dom';
import './Company.css';

const CompanyCard = ({ name, description, handle }) => {
	return (
		<div id= 'card'>
			<Link to={`/companies/${handle}`}>
				<div>
					<h4>{name}</h4>
					<p>{description}</p>
				</div>
			</Link>
		</div>
	);
};

export default CompanyCard;
