import { useState } from "react";
import "antd/dist/antd.css";
import { Progress } from "antd";

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

const colorMatch = {
  IRON: "#331a00",
  BRONZE: "#862d2d",
  SILVER: "#4d4d4d",
  GOLD: "#ffd700",
  PLATINUM: "#006600",
  DIAMOND: DIAMOND_,
  MASTER: MASTER_,
  GRANDMASTER: GRANDMASTER_,
  CHALLENGER: CHALLENGER_,
};

function RankCards(props) {
  const [hiden, setHiden] = useState(false);
  const [title, tier, rank, lp, wins, totalgames, losses, title2] = [
    props.title,
    props.tier,
    props.rank,
    props.lp,
    props.wins,
    props.totalgames,
    props.losses,
    props.title2,
  ];

  const handleClick = () => {
    if (hiden === false) {
      document.getElementById(title).style.display = "none";
      document.getElementById(title2).style.borderBottomLeftRadius = "15px";
      document.getElementById(title2).style.borderBottomRightRadius = "15px";
      document.getElementById(title2).innerHTML = "↓↓↓";
      setHiden(true);
    } else {
      document.getElementById(title).style.display = "flex";
      document.getElementById(title2).style.borderRadius = "0";
      document.getElementById(title2).innerHTML = "↑↑↑";
      setHiden(false);
    }
  };
  let aaa = "blue";
  return (
    <div className="RankBox">
      <h2>{title}</h2>
      {tier !== "" ? (
        <div className="content1" style={{ color: colorMatch[tier] }}>
          <div className="content1Infor">
            <div className="content1InforLeft">
              <img alt="solorank-img" src={rankImageMatch[tier]} />
            </div>
            <div className="content1InforRight">
              <p>
                {tier} &nbsp;
                {rank}
              </p>
              <p> LP : {lp}</p>
            </div>
          </div>

          <button onClick={handleClick} id={title2}>
            ↑↑↑
          </button>

          <div className="content1Infor" id={title}>
            <div className="content1InforLeft">
              <Progress
                id="Progress000"
                className="Progress"
                type="circle"
                percent={Math.round((wins / totalgames) * 100)}
                strokeColor={colorMatch[tier]}
                trailColor={"white"}
                showInfo={true}
                width={"10vw"}
                style={{ fontSize: "2vw" }}
              />
            </div>
            <div className="content1InforRight">
              <p>Wins: {wins} games</p>
              <p>Losses: {losses} games</p>
              <p>Total: {totalgames} games</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="content2">{title2}</div>
      )}
    </div>
  );
}
export default RankCards;
