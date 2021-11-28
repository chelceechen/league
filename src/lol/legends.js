import { useState, useEffect } from "react";
import axios, { Axios } from "axios";
import "./legends.css";
import Content from "./content";
import "antd/dist/antd.css";
import { Progress } from "antd";

import { useSelector, useDispatch } from "react-redux";
import {
  selectLegends,
  reNew,
  setupSummonerName,
  setupSummonerSoloRank,
  setupSummonerFlexRank,
} from "./legendsSlice";

import IRON_ from "../image/rank/iron.png";
import BRONZE_ from "../image/rank/bronze.png";
import SILVER_ from "../image/rank/sliver.png";
import GOLD_ from "../image/rank/gold.png";
import PLATINUM_ from "../image/rank/platinum.png";
import DIAMOND_ from "../image/rank/diamond.png";
import MASTER_ from "../image/rank/master.png";
import GRANDMASTER_ from "../image/rank/grandmaster.png";
import CHALLENGER_ from "../image/rank/challenger.png";

const rankImageMatch = {
  IRON: IRON_,
  BRONZE: BRONZE_,
  SILVER: SILVER_,
  GOLD: GOLD_,
  PLATINUM: PLATINUM_,
  DIAMOND: DIAMOND_,
  MASTER: MASTER_,
  GRANDMASTER: GRANDMASTER_,
  CHALLENGER: CHALLENGER_,
};

function Legends() {
  const [summonerName, setsummonerName] = useState("");
  const [windowWidth, setWindowWidth] = useState();
  const baseUrl = "https://na1.api.riotgames.com/";
  const apiKey = "RGAPI-7e00b7de-c368-4f1d-964c-64185f24a4de";

  const dispatch = useDispatch();
  const legendsInfor = useSelector(selectLegends);

  useEffect(() => {
    setWindowWidth(document.body.clientWidth);
    console.log(document.body.clientWidth);
  }, [document.body.clientWidth]);

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
      for (let i = 0; i <= rank_.data.length; i++) {
        if (rank_.data[i].queueType === "RANKED_SOLO_5x5") {
          dispatch(
            setupSummonerSoloRank({
              Solo_DuoTier: rank_.data[i].tier,
              Solo_DuoRank: rank_.data[i].rank,
              Solo_DuoLp: rank_.data[i].leaguePoints,
              Solo_DuoWins: rank_.data[i].wins,
              Solo_DuoLosses: rank_.data[i].losses,
              Solo_DuoTotalgames: rank_.data[i].wins + rank_.data[i].losses,
            })
          );
        }
        if (rank_.data[i].queueType === "RANKED_FLEX_SR") {
          dispatch(
            setupSummonerFlexRank({
              FlexTier: rank_.data[i].tier,
              FlexRank: rank_.data[i].rank,
              FlexLp: rank_.data[i].leaguePoints,
              FlexWins: rank_.data[i].wins,
              FlexLosses: rank_.data[i].losses,
              FlexTotalgames: rank_.data[i].wins + rank_.data[i].losses,
            })
          );
        }
      }
      //console.log(rank_);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = () => {
    getData();
    setsummonerName("");
  };

  const display = () => {
    console.log(windowWidth);
    console.log(document.body.clientWidth);
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
            placeholder="Summoner Name"
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
                <b /> #NA <b />
                Level:{legendsInfor.summonerLevel}
              </div>
              <div className="rank">
                <div className="RankBox">
                  <h2>Solo/Duo Rank</h2>
                  {legendsInfor.Solo_Duo.tier !== "" ? (
                    <div className="content1">
                      <div className="content1Infor">
                        <div className="content1InforLeft">
                          <img
                            alt="solorank-img"
                            src={rankImageMatch[legendsInfor.Solo_Duo.tier]}
                          />
                        </div>
                        <div className="content1InforRight">
                          <p>
                            {legendsInfor.Solo_Duo.tier} <b />
                            {legendsInfor.Solo_Duo.rank}
                          </p>
                          <p> LP : {legendsInfor.Solo_Duo.lp}</p>
                        </div>
                      </div>
                      <div className="content1Infor">
                        <div className="content1InforLeft">
                          {windowWidth >= 500 ? (
                            <>
                              <Progress
                                id="Progress000"
                                className="Progress"
                                type="circle"
                                percent={Math.floor(
                                  (legendsInfor.Solo_Duo.wins /
                                    legendsInfor.Solo_Duo.totalgames) *
                                    100
                                )}
                                strokeColor={"blue"}
                                trailColor={"white"}
                                showInfo={true}
                                width={"10vw"}
                                style={{ fontSize: "2vw" }}
                              />
                            </>
                          ) : (
                            <>
                              <Progress
                                id="Progress000"
                                className="Progress"
                                type="circle"
                                percent={Math.floor(
                                  (legendsInfor.Solo_Duo.wins /
                                    legendsInfor.Solo_Duo.totalgames) *
                                    100
                                )}
                                strokeColor={"blue"}
                                trailColor={"white"}
                                showInfo={true}
                                width={"20vw"}
                                style={{ fontSize: "5vw" }}
                              />
                            </>
                          )}
                        </div>
                        <div className="content1InforRight">
                          <p>Wins: {legendsInfor.Solo_Duo.wins} games</p>
                          <p>Losses: {legendsInfor.Solo_Duo.losses} games</p>
                          <p>Total: {legendsInfor.Solo_Duo.totalgames} games</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="content2">NO solo rank</div>
                  )}
                </div>
                <div className="RankBox">
                  <h2>Flex Rank</h2>
                  {legendsInfor.Flex.tier !== "" ? (
                    <div className="content1">
                      <div className="content1Infor">
                        <div className="content1InforLeft">
                          <img
                            alt="solorank-img"
                            src={rankImageMatch[legendsInfor.Flex.tier]}
                          />
                        </div>
                        <div className="content1InforRight">
                          <p>
                            {legendsInfor.Flex.tier} <b />
                            {legendsInfor.Flex.rank}
                          </p>
                          <p> LP : {legendsInfor.Flex.lp}</p>
                        </div>
                      </div>
                      <div className="content1Infor">
                        <div className="content1InforLeft">
                          {windowWidth >= 500 ? (
                            <>
                              <Progress
                                id="Progress000"
                                className="Progress"
                                type="circle"
                                percent={Math.floor(
                                  (legendsInfor.Flex.wins /
                                    legendsInfor.Flex.totalgames) *
                                    100
                                )}
                                strokeColor={"blue"}
                                trailColor={"white"}
                                showInfo={true}
                                width={"10vw"}
                                style={{ fontSize: "2vw" }}
                              />
                            </>
                          ) : (
                            <>
                              <Progress
                                id="Progress000"
                                className="Progress"
                                type="circle"
                                percent={Math.floor(
                                  (legendsInfor.Flex.wins /
                                    legendsInfor.Flex.totalgames) *
                                    100
                                )}
                                strokeColor={"blue"}
                                trailColor={"white"}
                                showInfo={true}
                                width={"20vw"}
                                style={{ fontSize: "5vw" }}
                              />
                            </>
                          )}
                        </div>
                        <div className="content1InforRight">
                          <p>Wins: {legendsInfor.Flex.wins} games</p>
                          <p>Losses: {legendsInfor.Flex.losses} games</p>
                          <p>Total: {legendsInfor.Flex.totalgames} games</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="content2"> NO Flex rank</div>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="summonerName">Summoner Name not Found!</div>
          )}
        </div>
      </main>
    </div>
  );
}
export default Legends;
