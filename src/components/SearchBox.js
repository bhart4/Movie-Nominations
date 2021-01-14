import React from 'react';
import {
	Row,
	Col,
	Input
} from 'antd';
import 'antd/dist/antd.css';
const { Search } = Input;

const SearchBox = (props) => {
	return (
		<Row className="search-row">
			<Col span={12} offset={6}>
				<Search
					value={props.value}
					onChange={(event) => props.setSearchValue(event.target.value)}
					placeholder='Enter a Movie Name'
					enterButton="Search"
					size="large"
				/>
			</Col>
		</Row>
	);
};


export default SearchBox;
