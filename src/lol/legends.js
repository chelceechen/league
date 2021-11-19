import { useState, useEffect } from "react";
import axios, { Axios } from "axios";
import "./legends.css";

const data_init = {
  summonerName: "",
  summonerLevel: 0,
  Solo_Duo: { tier: "", rank: "", wins: 0, losses: 0, totalgames: 0 },
  Flex: { tier: "", rank: "", wins: 0, losses: 0, totalgames: 0 },
};

function Legends() {
  const [summonerName, setsummonerName] = useState("");
  const [data, setData] = useState(data_init);
  const [DDdata, setDDdata] = useState(null);
  const baseUrl = "https://na1.api.riotgames.com/";
  const apiKey = "RGAPI-9e4e4c98-790a-4842-8461-346866bd0a5b";

  /* useEffect(() => {
    const ddragon = new DDragon();
    ddragon.champion.all().then(() => {
      setDDdata(ddragon);
    });
  }, []);
 */
  const getData = async () => {
    let data_init_ = {
      summonerName: "",
      summonerLevel: 0,
      Solo_Duo: { tier: "", rank: "", wins: 0, losses: 0, totalgames: 0 },
      Flex: { tier: "", rank: "", wins: 0, losses: 0, totalgames: 0 },
    };
    setData(data_init_);

    try {
      let data_ = data_init_;
      const res = await axios.get(
        `${baseUrl}lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${apiKey}`
      );

      data_.summonerName = res.data.name;
      data_.summonerLevel = res.data.summonerLevel;
      setData(data_);

      const rank = await axios.get(
        `${baseUrl}lol/league/v4/entries/by-summoner/${res.data.id}?api_key=${apiKey}`
      );
      [
        data_.Solo_Duo.tier,
        data_.Solo_Duo.rank,
        data_.Solo_Duo.wins,
        data_.Solo_Duo.losses,
        data_.Solo_Duo.totalgames,
        data_.Flex.tier,
        data_.Flex.rank,
        data_.Flex.wins,
        data_.Flex.losses,
        data_.Flex.totalgames,
      ] = [
        rank.data[0].tier,
        rank.data[0].rank,
        rank.data[0].wins,
        rank.data[0].losses,
        rank.data[0].wins + rank.data[0].losses,
        rank.data[1].tier,
        rank.data[1].rank,
        rank.data[1].wins,
        rank.data[1].losses,
        rank.data[1].wins + rank.data[1].losses,
      ];

      setData(data_);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = () => {
    getData();
    setsummonerName("");
  };

  const display = () => {
    console.log(data);
  };

  const content = () => {
    return (
      <div>
        wsss{data}
        sd{" "}
      </div>
    );
    /* if (data.summonerName !== "") {
      return <div>{data.summonerName}</div>;
    } */
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

        <div>sss{content}</div>
      </main>

      <progress value="80" max="100"></progress>
    </div>
  );
}
export default Legends;
