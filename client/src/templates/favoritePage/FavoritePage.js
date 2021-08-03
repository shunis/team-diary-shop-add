import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Popover, Button, Pagination } from "antd";
import { API_KEY, API_URL, FAVORITE_SERVER } from "../Config";
import "../../assets/css/favoritePage.css";

function FavoritePage() {
  const [favorites, setFavorites] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);

  useEffect(() => {
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&;amgiage=ko-Korean&page=1`;
    fetchFavoriteMovie();
    fetchNFT(endpoint);
  }, []);

  const fetchFavoriteMovie = () => {
    Axios.post(`${FAVORITE_SERVER}/getFavoriteNFT`, {
      userFrom: localStorage.getItem("userId"),
    }).then((response) => {
      if (response.data.success) {
        setFavorites(response.data.favorites);
      } else {
        alert("Failed to import favorites list.");
      }
    });
  };

  const onClickDelete = (nftId, userFrom) => {
    const variables = {
      nftId,
      userFrom,
    };

    Axios.post(`${FAVORITE_SERVER}/removeFromFavorite`, variables).then(
      (response) => {
        if (response.data.success) {
          fetchFavoriteMovie();
        } else {
          alert("Failed to delete from list.");
        }
      }
    );
  };

  const renderCards = favorites.map((favorite, index) => {
    const content = (
      <div>{favorite.nftImg ? <img src="" alt="img" /> : "No Image"}</div>
    );
    return (
      <tr key={index}>
        <Popover content={content} title={`${favorite.nftName}`}>
          <td>{favorite.nftName}</td>
        </Popover>
        <td>{favorite.nftOwned}</td>
        <td>{favorite.nftPrice}</td>
        <td>
          <Button onClick={() => onClickDelete(favorite.nftId, favorite.userFrom)} >Remove</Button>
        </td>
      </tr>
    );
  });

  const fetchNFT = (endpoint) => {
    fetch(endpoint)
      .then((response) => response.json())
      .then((response) => {
        setCurrentPage(response.page);
        setTotalPage(response.total_pages);
      });
  };

  const loadMoreItem = () => {
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&;amgiage=ko-Korean&page=${currentPage + 1}`;
    fetchNFT(endpoint);
  };

	const onChangePage = page => {
		setCurrentPage(page)
		const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&;amgiage=ko-Korean&page=${page}`;
		fetchNFT(endpoint)
	}

	let firstPage = 1;

  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
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
        <tbody>{renderCards}</tbody>
      </table>


      <br />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Pagination current={firstPage} total={totalPage} onChange={onChangePage} />
      </div>
    </div>
  );
}

export default FavoritePage;
