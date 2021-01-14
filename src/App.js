import React, { useState, useEffect } from 'react';
import Banner from 'react-js-banner';
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddNominations from './components/AddNominations';
import RemoveNominations from './components/RemoveNominations';
import {
	Layout,
	Row,
	Modal,
	Typography
} from 'antd';
import 'antd/dist/antd.css';
const { Header, Content, Footer } = Layout;
const TextTitle = Typography.Title;

const App = () => {
	const [movies, setMovies] = useState([]);
	const [nominations, setNominations] = useState([]);
	const [searchValue, setSearchValue] = useState('');
	const [isBannerVisible, setIsBannerVisible] = useState(false);
	const [isTitleBannerVisible, setIsTitleBannerVisible] = useState(false);
	const [isModalVisible, setIsModalVisible] = useState(false);

	const getMovieRequest = async (searchValue) => {
		const url = `http://www.omdbapi.com/?s=${searchValue}&type=movie&apikey=263d22d8`;

		const response = await fetch(url);
		console.log(response);
		const responseJson = await response.json();

		if (responseJson.Search) {
			setMovies(responseJson.Search);
		}
	};

	useEffect(() => {
		getMovieRequest(searchValue);
	}, [searchValue]);

	useEffect(() => {
		const movieNominations = JSON.parse(
			localStorage.getItem('the-shoppies-nominations')
		);

		if (movieNominations) {
			setNominations(movieNominations);
		}
	}, []);

	const saveToLocalStorage = (items) => {
		localStorage.setItem('the-shoppies-nominations', JSON.stringify(items));
	};

	const addNominationMovie = (movie) => {
		setIsBannerVisible(false);
		const nominationList = [...nominations];
		const newNominationList = [...nominations, movie];
		if (nominationList.length < 5 && !nominationList.includes(movie)) {
			setNominations(newNominationList);
			saveToLocalStorage(newNominationList);
			if (nominationList.length === 4) {
				setIsBannerVisible(true);
				setIsModalVisible(true);
			}
			else {
				setIsBannerVisible(false);
				setIsModalVisible(false);
			}
		}

		else if (nominationList.length === 5) {
			setIsTitleBannerVisible(true);
			setIsModalVisible(true);
			setNominations(nominationList);
			saveToLocalStorage(nominationList);
		}

		else {
			setIsTitleBannerVisible(false);
			setIsModalVisible(false);
			setNominations(nominationList);
			saveToLocalStorage(nominationList);
		}
	};

	const removeNominationMovie = (movie) => {
		const newNominationList = nominations.filter(
			(nomination) => nomination.imdbID !== movie.imdbID
		);

		setNominations(newNominationList);
		saveToLocalStorage(newNominationList);
		setIsBannerVisible(false);
		setIsTitleBannerVisible(false);
		setIsModalVisible(false);

	};

	const handleOk = () => {
		setIsModalVisible(false);
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	const movieNominations = JSON.parse(
		localStorage.getItem('the-shoppies-nominations')
	);

	if (movieNominations && movieNominations.length > 0) {
		return (
			<div className="App">
				<Layout className="layout">
					<Header>
						<div style={{ textAlign: 'center' }}>
							<TextTitle style={{ color: '#ffffff', marginTop: '14px', fontSize: '30px' }} level={3}>The Shoppies</TextTitle>
						</div>
					</Header>
					<Layout>
						<Content className="content" style={{ padding: '0 0px' }}>
							<Banner
								className="the-banner"
								title="You have already picked 5 nominations! Remove one to nominate another."
								showBanner={isTitleBannerVisible}
							/>
							<Banner
								className="the-banner"
								title="You have picked 5 nominations!"
								showBanner={isBannerVisible}
							/>
							<div>
								<MovieListHeading heading='Your Nominations' />
							</div>
							<br></br>
							<Row gutter={16} type="flex" justify="center">
								<MovieList
									movies={nominations}
									handleNominationsClick={removeNominationMovie}
									nominationComponent={RemoveNominations}
								/>
							</Row>
							<div>
								<MovieListHeading heading='Search for Movies' />
							</div>
							<SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
							<br />
							<Row gutter={16} type="flex" justify="center">
								<MovieList
									movies={movies}
									handleNominationsClick={addNominationMovie}
									nominationComponent={AddNominations}
								/>
							</Row>
							<Modal
								title="Nominations Complete!"
								visible={isModalVisible}
								onOk={handleOk}
								onCancel={handleCancel}
								footer={null}
								width={300}
								body={null}
								centered
							>
							</Modal>
						</Content>
					</Layout>
					<Footer style={{ textAlign: 'center', position: 'relative', bottom: '0px', width: '100%' }}>OMDB Movies ©2020</Footer>
				</Layout>
			</div >
		);
	}
	else {
		return (
			<div className="App">
				<Layout className="layout">
					<Header>
						<div style={{ textAlign: 'center' }}>
							<TextTitle style={{ color: '#ffffff', marginTop: '14px', fontSize: '30px' }} level={3}>The Shoppies</TextTitle>
						</div>
					</Header>
					<Layout>
						<Content className="content" style={{ padding: '0 0px' }}>
							<div>
								<MovieListHeading heading='Your Nominations' />
							</div>
							<br></br>
							<div style={{ textAlign: 'center' }}>
								You have not nominated any movies yet.
							</div>
							<div style={{ textAlign: 'center' }}>
								Search for a movie below and click the <AddNominations /> to nominate!
							</div>

							<div>
								<MovieListHeading heading='Search for Movies' />
							</div>
							<SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
							<br />
							<Row gutter={16} type="flex" justify="center">
								<MovieList
									movies={movies}
									handleNominationsClick={addNominationMovie}
									nominationComponent={AddNominations}
								/>
							</Row>
						</Content>
					</Layout>
					<Footer style={{ textAlign: 'center', position: 'relative', bottom: '0px', width: '100%' }}>OMDB Movies ©2020</Footer>
				</Layout>
			</div >
		);
	}
};

export default App;
