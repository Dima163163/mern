import { useContext, useEffect, useState } from 'react';
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const CreatePage = () => {
	const navigate = useNavigate();
	const auth = useContext(AuthContext);
	const { request } = useHttp();
	const [link, setLink] = useState('');

	useEffect(() => {
		window.M.updateTextFields();
	}, []);

	const pressHandler = async (event) => {
		if (event.key === 'Enter') {
			try {
				const data = await request(
					'/api/link/generate',
					'POST',
					{
						from: link
					},
					{
						Authorization: `Bearer ${auth.token}`
					}
				);
				navigate(`/detail/${data.link._id}`);
			} catch (error) {}
		}
	};

	return (
		<div className="row">
			<div className="col s8 offset-s2" style={{ paddingTop: '2rem' }}>
				<div className="input-field">
					<input
						placeholder="Вставьте ссылку"
						id="link"
						type="text"
						value={link}
						className="yellow-input"
						onChange={(e) => setLink(e.target.value)}
						onKeyDown={pressHandler}
					/>
					<label
						htmlFor="link"
						style={{ transform: 'translateY(-14px) scale(0.8)' }}
					>
						Введите ссылку
					</label>
				</div>
			</div>
		</div>
	);
};
export default CreatePage;
