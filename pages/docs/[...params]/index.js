import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {useQuery} from '@apollo/client'

import Layout from '../../../components/layout';
import RestrictedPage from '../../../components/parts/restricted_page';
import Doc from '../../../components/partials/doc';

import {GET_DOC} from '../../../utils/cms/docs/index'

const DocPage = () => {
	const router = useRouter(),
		{ params } = router.query,
		location = params,
		access_roles = [`aimhigher`],
		slug = location?.pop()
		

		// console.log({slug, options, location, params, router: router.query})

		// console.log({data})

	return (
		<Layout>
				{slug && <Doc {...{ slug }} />}
		</Layout>
	);
};

export default DocPage;
