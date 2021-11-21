import { useState, useEffect } from "react";
import axios, { Axios } from "axios";
import "./legends.css";
import Content from "./content";

import { useSelector, useDispatch } from "react-redux";
import {
  selectLegends,
  reNew,
  setupSummonerName,
  setupSummonerRank,
} from "./legendsSlice";

function Legends() {
  const [summonerName, setsummonerName] = useState("");
  const baseUrl = "https://na1.api.riotgames.com/";
  const apiKey = "RGAPI-98f40c3b-44d2-4c39-98c8-c5fd4d5dcfab";

  const dispatch = useDispatch();
  const legendsInfor = useSelector(selectLegends);

  const getData = async () => {
    dispatch(reNew());
    try {
      const res = await axios.get(
        `${baseUrl}lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${apiKey}`
      );

      dispatch(
        setupSummonerName({
          summonerName: res.data.name,
          summonerLevel: res.data.summonerLevel,
        })
      );

      const rank_ = await axios.get(
        `${baseUrl}lol/league/v4/entries/by-summoner/${res.data.id}?api_key=${apiKey}`
      );

      console.log(rank_);
      dispatch(
        setupSummonerRank({
          Solo_DuoTier: rank_.data[0].tier,
          Solo_DuoRank: rank_.data[0].rank,
          Solo_DuoWins: rank_.data[0].wins,
          Solo_DuoLosses: rank_.data[0].losses,
          Solo_DuoTotalgames: rank_.data[0].wins + rank_.data[0].losses,
          FlexTier: rank_.data[2].tier,
          FlexRank: rank_.data[2].rank,
          FlexWins: rank_.data[2].wins,
          FlexLosses: rank_.data[2].losses,
          FlexTotalgames: rank_.data[2].wins + rank_.data[2].losses,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = () => {
    getData();
    setsummonerName("");
  };

  const display = () => {
    console.log(legendsInfor);
  };

  return (
    <div className="Legends">
      <header role="banner">
        <h1>Summoner's Rank</h1>
      </header>

      <main role="main">
        <div className="search">
          <input
            value={summonerName}
            placeholder="summonerName"
            type="text"
            onChange={(e) => {
              setsummonerName(e.target.value);
            }}
          />
          <button onClick={handleClick}>Search</button>
          <button onClick={display}>Test</button>
        </div>

        <div className="summonerInfor">
          {legendsInfor.summonerName !== "" ? (
            <>
              <div className="summonerName">
                {legendsInfor.summonerName}
                {legendsInfor.summonerLevel}
              </div>
              <div className="summonerName">
                {legendsInfor.summonerName}
                {legendsInfor.summonerLevel}
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </main>
    </div>
  );
}
export default Legends;
