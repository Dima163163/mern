import { useCallback, useContext, useEffect, useState } from 'react';
import { useHttp } from '../hooks/http.hook';
import Loader from '../components/Loader';
import ListLinks from '../components/ListLinks';
import { AuthContext } from '../context/AuthContext';

const LinksPage = () => {
	const [links, setLinks] = useState([]);
	const { loading, request } = useHttp();
	const { token } = useContext(AuthContext);

	const fetchLinks = useCallback(async () => {
		try {
			const fetched = await request('/api/link', 'GET', null, {
				Authorization: `Bearer ${token}`
			});
			setLinks(fetched);
		} catch (error) {}
	}, [token, request]);

	useEffect(() => {
		fetchLinks();
	}, [fetchLinks]);

	if (loading) {
		return <Loader />;
	}
	return <>{!loading && <ListLinks links={links} />}</>;
};
export default LinksPage;
