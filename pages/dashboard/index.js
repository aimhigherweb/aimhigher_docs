import { useContext, Fragment } from 'react';
import { useQuery } from 'react-query';

import { UserContext } from '../_app';
import Layout from '../../components/layout';
import RestrictedPage from '../../components/parts/restricted_page';
import Dashboard from '../../components/partials/dashboard';

import { fetchClients } from '../../utils/cms/client/index';

// eslint-disable-next-line one-var
const ClientProfile = () => {
	const { user } = useContext(UserContext),
		access_roles = user?.app_metadata?.roles.filter((role) => role !== `admin`) || [],
		clients = useQuery([
			`docs`,
			{
				clients: access_roles
			}
		], fetchClients);

	return (
		<Layout>
			<RestrictedPage {...{ access_roles }}>
				{clients.status == 'loading' 
					&& <p>Loading Dashboard</p>
				}
				<Dashboard {...clients} />	
			</RestrictedPage>
		</Layout>
	);
};

export default ClientProfile;
