import React, { useEffect, useState } from 'react'
import { API_KEY, API_URL, IMAGE_BASE_URL } from '../Config'
import { Descriptions, Badge } from 'antd'

function MarketPlaceDetail(props) {

	let nftId = props.match.params.nftId

	const [nft, setNft] = useState([null])

	useEffect(() => {
		let endpointInfo = `${API_URL}/movie/${nftId}?api_key=${API_KEY}`

		fetch(endpointInfo)
		.then(response => response.json())
		.then(response => {
			setNft(response)
		})
	}, [])

	return (
		<div style={{ width: '85%', margin: '1rem auto'}}>
			<div style={{ display: 'flex', justifyContent: 'flex-end' }}></div>

			<Descriptions title="Info" bordered>
				<Descriptions.Item label="Owned">{nft.original_title}</Descriptions.Item>
				<Descriptions.Item label="Category">{nft.original_title}</Descriptions.Item>
				<Descriptions.Item label="Status">{nft.original_title}</Descriptions.Item>
				<Descriptions.Item label="Negotiated Amount">{nft.original_title}</Descriptions.Item>
				<Descriptions.Item label="DisCount">{nft.original_title}</Descriptions.Item>
				<Descriptions.Item label="ClosingDate">{nft.original_title}</Descriptions.Item>
				<Descriptions.Item label="Descriptions">{nft.overview}</Descriptions.Item>
			</Descriptions>
		</div>
	)
}

export default MarketPlaceDetail
