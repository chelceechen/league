import "./App.css";
import "antd/dist/antd.css";
import { useState, useEffect } from "react";
import axios, { Axios } from "axios";
import IRON_ from "./image/rank/iron.png";
import BRONZE_ from "./image/rank/bronze.png";
import SLIVER_ from "./image/rank/sliver.png";
import GOLD_ from "./image/rank/gold.png";
import PLATINUM_ from "./image/rank/platinum.png";
import DIAMOND_ from "./image/rank/diamond.png";
import MASTER_ from "./image/rank/master.png";
import GRANDMASTER_ from "./image/rank/grandmaster.png";
import CHALLENGER_ from "./image/rank/challenger.png";

import logo from "./image/logo.png";
import { Progress } from "antd";

function App() {
  const [summonerName, setsummonerName] = useState("");
  const [data, setData] = useState(null);
  const [hasAcc, setHasAcc] = useState(false);
  const [typeName, setTypeName] = useState("");
  const [level, setLevel] = useState(0);

  const baseUrl = "https://na1.api.riotgames.com/";
  const apiKey = "RGAPI-51fbe43c-71ea-40e1-aec9-a448adff1429";

  const rankImageMatch = {
    IRON: IRON_,
    BRONZE: BRONZE_,
    SLIVER: SLIVER_,
    GOLD: GOLD_,
    PLATINUM: PLATINUM_,
    DIAMOND: DIAMOND_,
    MASTER: MASTER_,
    GRANDMASTER: GRANDMASTER_,
    CHALLENGER: CHALLENGER_,
  };

  const getData = async () => {
    setData(null);
    try {
      const res = await axios.get(
        `${baseUrl}lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${apiKey}`
      );

      setLevel(res.data.summonerLevel);
      //判断有没有输入错误名字
      setHasAcc(true);

      let noRankData = {
        rank: "",
      };

      setData(noRankData);

      try {
        const rank = await axios.get(
          `${baseUrl}lol/league/v4/entries/by-summoner/${res.data.id}?api_key=${apiKey}`
        );

        for (let i = 0; i < rank.data.length; i++) {
          if (rank.data[i].queueType === "RANKED_SOLO_5x5") {
            setData(rank.data[i]);
            console.log(rank.data[i], 123);
          }
        }
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      setHasAcc(false);
      setData(123);
      console.log(error);
    }
  };
  const handleClick = () => {
    getData();
    setsummonerName("");
    setTypeName(summonerName);
    setLevel(0);
  };

  return (
    <div className="App">
      <header>
        <div className="logoImg">
          <div className="empty"></div>
          <div className="imgBox">
            <img alt="" src={logo} />
          </div>

          <div className="empty"></div>
        </div>
        <div className="headerWords">
          <div className="empty"></div>
          <h1>Summoner's Rank</h1>
          <div className="searchBar">
            <input
              value={summonerName}
              placeholder="summonerName"
              type="text"
              onChange={(e) => {
                setsummonerName(e.target.value);
              }}
            />
            <button onClick={handleClick}>Search</button>
          </div>
          <div className="empty"></div>
        </div>
      </header>
      <main>
        <div className="rank">
          {data ? (
            hasAcc ? (
              data.rank !== "" ? (
                <div className="hasRank">
                  <div className="topSide">
                    <div className="topSideWords">
                      <div className="name">Name: {data.summonerName} #NA1</div>
                      <div className="level">
                        Level:{level}-{data.tier} {data.rank}
                      </div>
                      <div className="points">
                        LeaguePoints: {data.leaguePoints} LP
                      </div>
                    </div>

                    <div>
                      <img
                        className="rankImage"
                        alt=""
                        src={rankImageMatch[data.tier]}
                      />
                    </div>
                  </div>
                  <div className="bottomSide">
                    <Progress
                      className="progress"
                      type="circle"
                      style={{ fontSize: "2vw", color: "white" }}
                      percent={Math.floor(
                        (data.wins / (data.wins + data.losses)) * 100
                      )}
                      strokeWidth={"10"}
                      width={"calc(10vw + 3px)"}
                    />

                    <div className="bottomSideWords">
                      <div> Wins: {data.wins}</div>
                      <div> Loses: {data.losses}</div>
                      <div>
                        WinRate:{" "}
                        {Math.floor(
                          (data.wins / (data.wins + data.losses)) * 100
                        )}
                        %
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="noRank">
                  Name:{typeName}
                  <div>Level:{level}</div>
                  <div>This player haven't played any rank</div>
                </div>
              )
            ) : (
              <div className="wrongName">Player {typeName} does not exist</div>
            )
          ) : null}
        </div>
      </main>
      <div className="testCase">
        TestCase:
        <br />
        "BiAnHua": Has league of lengend account and played rank(platinum).
        <br />
        "Nico is peppapig": Has league of lengend account and played
        rank(master).
        <br />
        "okeydokeycn": Has league of lengend account and haven't played rank
        <br />
        "sdfasdfasdfwe": Wrong Name
      </div>
    </div>
  );
}

export default App;
