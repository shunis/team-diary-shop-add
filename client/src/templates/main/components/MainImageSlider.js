import React from 'react'
import { Carousel } from "antd";

function MainImageSlider(props) {
	console.log('props.images -> ', props)
	return (
		<div>
			<img style={{ width: '90%', height: '500px' }}
					src={`http://localhost:5000/${props.images[0]}`} />
		</div>
	)
}

export default MainImageSlider
