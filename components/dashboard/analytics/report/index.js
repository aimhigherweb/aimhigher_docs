import React, { useState, useEffect } from 'react';

import LineChart from '../../charts/line';

const Report = () => {
	const [data, setData] = useState([]),
		displayResults = (res) => {
			const queryResult = res.result.reports[0].data.rows,
				result = queryResult.map((row) => {
					const date = row.dimensions[0];

					return {
						date,
						visits: row.metrics[0].values[0]
					};
				});

			setData(result);
		},
		queryReport = () => {
			window.gapi.client.request({
				path: `/v4/reports:batchGet`,
				root: `https://analyticsreporting.googleapis.com/`,
				method: `POST`,
				body: {
					reportRequests: [
						{
							viewId: process.env.NEXT_PUBLIC_GOOGLE_VIEW_ID, // enter your view ID here
							dateRanges: [
								{
									startDate: `31daysAgo`,
									endDate: `today`,
								},
							],
							metrics: [
								{
									expression: `ga:users`,
								},
							],
							dimensions: [
								{
									name: `ga:date`,
								},
							],
						},
					],
				},
			})
				.then(displayResults, console.error.bind(console));
		};

	useEffect(() => {
		queryReport();
	}, []);

	return <LineChart {...{ data }} />;
};

export default Report;
