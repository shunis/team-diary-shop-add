import React, { useEffect, useState } from "react";
import { Button, message } from "antd";
import { FAVORITE_SERVER } from "../../Config";
import Axios from "axios";

import { HeartOutlined } from "@ant-design/icons";

function GuestFavorite(props) {
  const nftId = props.nftId;

  const [FavoriteNumber, setFavoriteNumber] = useState(0);

  useEffect(() => {
    Axios.post(`${FAVORITE_SERVER}/favoriteNumber`, nftId).then((response) => {
      setFavoriteNumber(response.data.favoriteNumber);
      if (response.data.success) {
      } else {
        message.error("Failed to read favorite number.");
      }
    });
  });

  const onClickLogin = () => {
    message.warning("Login is required.");
  };

  return (
    <div>
      <Button
        danger
        onClick={onClickLogin}
        icon={<HeartOutlined />}
        href="/login"
      >
        Add to Favorite {FavoriteNumber}
      </Button>
    </div>
  );
}

export default GuestFavorite;
