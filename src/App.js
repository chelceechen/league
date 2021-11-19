import "./App.css";
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

import iconImage from "./image/icon.png";

function App() {
  const [summonerName, setsummonerName] = useState("");
  const [data, setData] = useState(null);
  const [hasAcc, setHasAcc] = useState(false);
  const [typeName, setTypeName] = useState("");
  const [level, setLevel] = useState(0);

  const baseUrl = "https://na1.api.riotgames.com/";
  const apiKey = "RGAPI-e5758ff2-3753-4502-8384-d28a897aa4c7";

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
    try {
      const res = await axios.get(
        `${baseUrl}lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${apiKey}`
      );

      setLevel(res.data.summonerLevel);
      //判断有没有输入错误名字
      setHasAcc(true);

      const rank = await axios.get(
        `${baseUrl}lol/league/v4/entries/by-summoner/${res.data.id}?api_key=${apiKey}`
      );
      setData(rank.data);

      let winRate = Math.floor(
        (rank.data[1].wins / (rank.data[1].wins + rank.data[1].losses)) * 100
      );

      if (winRate <= 50) {
        let rightDegree = winRate * 3.6 - 135;
        document.getElementById("rightPart").style.transform =
          "rotate(" + rightDegree.toString() + "deg)";
        document.getElementById("leftPart").style.transform = "rotate(-135deg)";
      } else {
        let leftDegree = (winRate - 50) * 3.6 - 135;

        document.getElementById("rightPart").style.transform = "rotate(45deg)";
        document.getElementById("leftPart").style.transform =
          "rotate(" + leftDegree.toString() + "deg)";
      }
    } catch (error) {
      setHasAcc(false);
      setData(123);
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
        <div>123</div>
        <button onClick={handleClick}>Search</button>
      </div>
      {data ? (
        hasAcc ? (
          data.length > 0 ? (
            <div className="hasRank">
              <div className="topSide">
                <div>
                  <img className="iconImage" alt="" src={iconImage} />
                </div>
                <div className="topSideWords">
                  <div>{data[1].summonerName} #NA1</div>
                  <div className="test">
                    Level:{level}-{data[1].tier} {data[1].rank}
                  </div>
                  <div> LeaguePoints: {data[1].leaguePoints} LP</div>
                </div>

                <div>
                  <img
                    className="rankImage"
                    alt=""
                    src={rankImageMatch[data[1].tier]}
                  />
                </div>
              </div>
              <div className="bottomSide">
                <div className="circleProgress_wrapper">
                  <div className="rate">
                    {Math.floor(
                      (data[1].wins / (data[1].wins + data[1].losses)) * 100
                    )}
                    %
                  </div>
                  <div className="wrapperRight">
                    <div className="baseRightcircle"></div>
                    <div
                      className="circleProgressRightcircle"
                      id="rightPart"
                    ></div>
                  </div>
                  <div className="wrapperLeft">
                    <div className="baseLeftcircle"></div>
                    <div
                      className="circleProgressLeftcircle"
                      id="leftPart"
                    ></div>
                  </div>
                </div>
                <div className="winLose">
                  <div> Wins: {data[1].wins}</div>
                  <div> Loses: {data[1].losses}</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="noRank">
              Name:{typeName}
              <div>Level:{level}</div>
              <div>This player haven't played rank</div>
            </div>
          )
        ) : (
          <div className="wrongName">{typeName} does not exist</div>
        )
      ) : null}
    </div>
  );
}

export default App;
