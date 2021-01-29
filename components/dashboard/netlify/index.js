import { Fragment } from 'react';
import {
	useQuery
} from 'react-query';

import { fetchSites, siteBuilds } from '../../../utils/netlifyData';

// eslint-disable-next-line one-var
const NetlifyStatus = () => {
	console.log();

	return (
		<div>
			<h3>Netlify</h3>
			<Sites />
			{/* <Builds /> */}
		</div>
	);
};

// eslint-disable-next-line one-var
const Sites = () => {
	const sites = useQuery(`sites`, fetchSites);

	if (sites.status === `loading`) {
		return <p>Loading data</p>;
	}

	return <p>Sites</p>;
};

// eslint-disable-next-line one-var
const Builds = () => {
	const builds = useQuery([`builds`, { site_id: process.env.NEXT_PUBLIC_SITE_ID }], siteBuilds);

	if (builds.status === `loading`) {
		return <p>Loading Data</p>;
	}

	console.log(builds.data);

	return (
		<ul>
			{builds.data.map((build) => (
				<li>
					<dl>
						<dt>Status</dt>
						<dd>{build.done ? `Finished` : `In Progress`}</dd>
						{build.error
							&& <Fragment>
								<dt>Error</dt>
								<dd>{build.error}</dd>
							</Fragment>
						}
					</dl>
				</li>
			))}
		</ul>
	);
};

export default NetlifyStatus;