import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, message } from "antd";
import { FAVORITE_SERVER } from "../../Config";

import { HeartFilled, HeartOutlined } from "@ant-design/icons";

function Favorite(props) {
  const nftId = props.nftId;
  const userFrom = props.userFrom;

  const [FavoriteNumber, setFavoriteNumber] = useState(0);
  const [favored, setFavored] = useState(false);

  let variables = { nftId, userFrom };

  useEffect(() => {
    Axios.post(`${FAVORITE_SERVER}/favoriteNumber`, variables).then(
      (response) => {
        setFavoriteNumber(response.data.favoriteNumber);
        if (response.data.success) {
        } else {
          message.error("Failed to read favorite number.");
        }
      }
    );

    Axios.post(`${FAVORITE_SERVER}/favored`, variables).then((response) => {
      if (response.data.success) {
        setFavored(response.data.favored);
      } else {
        message.error("Failed to read information.");
      }
    });
  }, [variables]);

  const onClickFavorite = () => {
    if (favored) {
      Axios.post(`${FAVORITE_SERVER}/removeFromFavorite`, variables).then(
        (response) => {
          if (response.data.success) {
            setFavoriteNumber(FavoriteNumber - 1);
            setFavored(!favored);
          } else {
            message.error("Failed to remove list.");
          }
        }
      );
    } else {
      Axios.post(`${FAVORITE_SERVER}/addToFavorite`, variables).then(
        (response) => {
          if (response.data.success) {
            setFavoriteNumber(FavoriteNumber + 1);
            setFavored(!favored);
          } else {
            message.error("Failed to add list.");
          }
        }
      );
    }
  };

  return (
    <div>
      <Button
        danger
        onClick={onClickFavorite}
        icon={favored ? <HeartFilled /> : <HeartOutlined />}
      >
        {favored ? "Cancel Favorite" : "Add to Favorite"} {FavoriteNumber}
      </Button>
    </div>
  );
}

export default Favorite;
