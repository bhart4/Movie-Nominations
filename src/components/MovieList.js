import React from 'react';
import {
	Card,
	Space
} from 'antd';
import 'antd/dist/antd.css';
const { Meta } = Card;

const MovieList = (props) => {
	const NominationComponent = props.nominationComponent;

	return (
		<>
			{props.movies.map((movie) => (
				<div className="site-card-border-less-wrapper image-container" style={{ background: '#F0F2F5', padding: '20px' }}>
					<Space size="large">
						<Card
							style={{ width: 200 }}
							bordered={false}
							cover={
								<img
									alt='movie'
									src={movie.Poster}
								>
								</img>
							}
						>

							<Meta
								title={movie.Title}
								description={movie.Year}
							/>

							<div
								onClick={() => props.handleNominationsClick(movie)}
								className='favourite'
							>
								<NominationComponent />
							</div>
						</Card>
					</Space>
				</div>
			))}
		</>
	);
};

export default MovieList;

