import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "antd";

import { HeartTwoTone, HeartOutlined } from "@ant-design/icons";

function Favorite(props) {
  const nftId = props.nftId;
  const userFrom = props.userFrom;
  const nftInfoId = props.nftInfo.id;

  const [FavoriteNumber, setFavoriteNumber] = useState(0);
  const [favored, setFavored] = useState(false);

  let variables = { userFrom, nftId, nftInfoId };

  useEffect(() => {
    Axios.post("/api/favorite/favoriteNumber", variables).then((response) => {
      setFavoriteNumber(response.data.FavoriteNumber);
      if (response.data.success) {
      } else {
        alert("Failed to read favorite number.");
      }
    });

    Axios.post("/api/favorite/favored", variables).then((response) => {
      if (response.data.success) {
        setFavored(response.data.favored);
      } else {
        alert("Failed to read information.");
      }
    });
  }, [variables]);

  const onClickFavorite = () => {
    if (favored) {
      Axios.post("api/favorite/removeFromFavorite", variables).then(
        (response) => {
          if (response.data.success) {
            setFavoriteNumber(FavoriteNumber - 1);
            setFavored(!favored);
          } else {
            alert("Failed to remove list.");
          }
        }
      );
    } else {
      Axios.post("api/favorite/addToFavorite", variables).then((response) => {
        if (response.data.success) {
          setFavoriteNumber(FavoriteNumber + 1);
          setFavored(!favored);
        } else {
          alert("Failed to add list.");
        }
      });
    }
  };

  return (
    <div>
      {favored ? (
        <Button
          danger
          onClick={onClickFavorite}
          icon={<HeartTwoTone twoToneColor="#eb2f96" />}
        >
          Not Favorite {FavoriteNumber}
        </Button>
      ) : (
        <Button danger onClick={onClickFavorite} icon={<HeartOutlined />}>
          Add to Favorite {FavoriteNumber}
        </Button>
      )}
    </div>
  );
}

export default Favorite;
