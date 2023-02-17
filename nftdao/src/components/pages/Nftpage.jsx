import React from "react";
import { Navbar } from "../shared/Navbar/Navbar";
import { NftCard } from "../shared/cards/nftCard";
import Grid from "@mui/material/Grid";
import { useHistory } from "react-router-dom";
import ImageDisplay from "../threeD/ImageLoder";

import "./nftPage.css";

const NftPage = () => {
  const history = useHistory();

  function navigateToRoute(route) {
    history.push(route);
  }

  return (
    <div>
      <Navbar />
      <div className="nftHeading">
        <h1>
          <span>OWN</span> THE <span>NFTs</span>
        </h1>
        <h4>
          Become an <span> Integral part</span> of
          <span>AMAZING DAO</span>
        </h4>
      </div>
      <div className="titleDisplay">
        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={3}>
            {/* <div>
              <div
                style={{
                  height: "400px",
                  width: "300px",
                  backgroundColor: "white",
                  borderRadius: "300px",
                }}
              >
                <ImageDisplay
                  imgpath={
                    "https://mudemo.infura-ipfs.io/ipfs/QmPCg6s6BGGXi5qYrk99mF1Gp85M9WgUVuEvotRMh35xSX"
                  }
                />
              </div>
            </div> */}
            <div>
            <NftCard nftValue={1} price={150000000000000000} /></div>
          </Grid>
          <Grid item xs={3}>
            <NftCard nftValue={2} price={180000000000000000} />
          </Grid>
          <Grid item xs={3}>
            <NftCard nftValue={3} price={250000000000000000} />
          </Grid>
          <Grid item xs={3}>
            <NftCard nftValue={4} price={190000000000000000} />
          </Grid>
          <Grid item xs={3}>
            <NftCard nftValue={5} price={160000000000000000} />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default NftPage;
