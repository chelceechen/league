import { useState } from "react";
import axios, { Axios } from "axios";
import "./legends.css";
import RankCards from "./rankCards";
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

function Legends() {
  const [summonerName, setsummonerName] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [apiKeyT, setApiKeyT] = useState("");
  const [checkApi, setCheckApi] = useState(false);
  const [checkApiT, setCheckApiT] = useState(null);
  const [start, setStart] = useState(false); //to delay updating
  const baseUrl = "https://na1.api.riotgames.com/";
  //const apiKey_ = "RGAPI-9d86f07c-57c1-4196-9363-6608b5f129cc";

  const dispatch = useDispatch();
  const legendsInfor = useSelector(selectLegends);

  const getData = async () => {
    dispatch(reNew());
    setStart(true);

    try {
      const res = await axios.get(
        `${baseUrl}lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${apiKey}`
      );

      dispatch(
        setupSummonerName({
          summonerName: res.data.name,
          summonerLevel: res.data.summonerLevel,
          state_: "setup",
        })
      );

      const rank_ = await axios.get(
        `${baseUrl}lol/league/v4/entries/by-summoner/${res.data.id}?api_key=${apiKey}`
      );

      for (let i = 0; i < rank_.data.length; i++) {
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
        if (i === rank_.data.length - 1) setStart(false);
      }
    } catch (error) {
      console.log(error);
      setStart(false);
    }
  };

  const handleSearch = () => {
    if (summonerName !== "" && checkApi === true) {
      getData();
      setsummonerName("");
    } else if (summonerName !== "" && checkApi === false) {
      alert("Make sure API Key is correct!");
    }
  };

  const handleCheck = async () => {
    if (apiKeyT !== "") {
      try {
        await axios.get(
          `${baseUrl}lol/summoner/v4/summoners/by-name/${"aaaa"}?api_key=${apiKeyT}`
        );
        setCheckApi(true);
        setCheckApiT(true);
        let T = apiKeyT;
        setApiKey(T);
        setApiKeyT("");
      } catch (error) {
        console.log(error);
        setCheckApi(false);
        setCheckApiT(true);
        let T = apiKeyT;
        setApiKey(T);
        setApiKeyT("");
      }
    }
  };

  return (
    <div className="Legends">
      <header role="banner">
        <h1>Summoner's Rank</h1>
      </header>
      {/* <div
        onClick={() => {
          var otherWindow = window.open("https://developer.riotgames.com/");
          otherWindow.opener = null;
        }}
      >
        https://developer.riotgames.com
      </div> */}

      <main role="main">
        <div className="getAPIkey">
          Click the link to get the API KEY：
          <a
            href="https://developer.riotgames.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://developer.riotgames.com
          </a>
        </div>
        <div className="checkAPIkey">
          <input
            value={apiKeyT}
            placeholder="API Key"
            type="text"
            onChange={(e) => {
              setApiKeyT(e.target.value);
            }}
          />

          <button onClick={handleCheck}>Check</button>
          {checkApiT ? (
            checkApi ? (
              <>
                <Progress
                  type="circle"
                  percent={100}
                  width={"5vw"}
                  style={{ fontSize: "1vw" }}
                />
              </>
            ) : (
              <>
                <Progress
                  type="circle"
                  percent={0}
                  status="exception"
                  width={"5vw"}
                  style={{ fontSize: "1vw" }}
                />
              </>
            )
          ) : (
            <></>
          )}
        </div>
        <div className="search">
          <input
            value={summonerName}
            placeholder="Summoner Name"
            type="text"
            onChange={(e) => {
              setsummonerName(e.target.value);
            }}
          />
          <button onClick={handleSearch}>Search</button>
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
                <RankCards
                  title={"Solo/Duo rank"}
                  tier={legendsInfor.Solo_Duo.tier}
                  rank={legendsInfor.Solo_Duo.rank}
                  lp={legendsInfor.Solo_Duo.lp}
                  wins={legendsInfor.Solo_Duo.wins}
                  totalgames={legendsInfor.Solo_Duo.totalgames}
                  losses={legendsInfor.Solo_Duo.losses}
                  title2={"NO Solo rank"}
                />
                <RankCards
                  title={"Flex rank"}
                  tier={legendsInfor.Flex.tier}
                  rank={legendsInfor.Flex.rank}
                  lp={legendsInfor.Flex.lp}
                  wins={legendsInfor.Flex.wins}
                  totalgames={legendsInfor.Flex.totalgames}
                  losses={legendsInfor.Flex.losses}
                  title2={"NO Flex rank"}
                />
              </div>
            </>
          ) : (
            <>
              {legendsInfor.state_ !== null && start === false ? (
                <div className="summonerName">Summoner Name not Found!</div>
              ) : (
                <></>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}
export default Legends;
