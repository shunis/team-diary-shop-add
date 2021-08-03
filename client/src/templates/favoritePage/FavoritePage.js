import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { Popover } from 'antd'
import '../../assets/css/favoritePage.css'

function FavoritePage() {
	const [favorites, setFavorites] = useState([])

	useEffect(() => {
		fetchFavoriteMovie()
	}, [])

	const fetchFavoriteMovie = () => {
		Axios.post("/api/favorite/getFavoriteNFT", { userFrom: localStorage.getItem('userId')})
		.then(response => {
			if (response.data.success) {
				setFavorites(response.data.favorites)
			} else {
				alert("Failed to import favorites list.")
			}
		})
	}

	const onClickDelete = (movieId, userFrom) => {
		const variables = {
			movieId, userFrom
		}

		Axios.post('/api/favorite/removeFromFavorite', variables)
		.then(response => {
			if (response.data.success) {
				fetchFavoriteMovie()
			} else {
				alert("Failed to delete from list.")
			}
		})
	}

	const renderCards = favorites.map((favorite, index) => {
		const content = (
			<div>
				{favorite.nftImg ? <img src="" alt="img" /> : "No Image"} 
			</div>
		)
		return <tr key = {index}>
			<Popover content={content} title={`${favorite.nftName}`}>
				<td>{favorite.nftName}</td>
			</Popover>
			<td>{favorite.nftOwned}</td>
			<td>{favorite.nftPrice}</td>
			<td><button onClick={() => onClickDelete(favorite.nftId, favorite.userFrom)}>Remove</button></td>
		</tr>
	})

	return (
		<div style={{ width: '85%', margin: '3rem auto' }}>
			<h2>Favorite NFT</h2>
			<hr />

			<table>
				<thead>
					<tr>
						<th>NFT Name</th>
						<th>NFT Owned</th>
						<th>NFT Price</th>
						<th>Remove</th>
					</tr>
				</thead>
				<tbody>
					{renderCards}
				</tbody>
			</table>
		</div>
	)
}

export default FavoritePage
