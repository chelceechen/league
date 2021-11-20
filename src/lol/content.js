import { useState } from "react";

export default function content(prop) {
  const data = prop.data;

  const display = () => {
    console.log(data);
    console.log(data.summonerLevel);
  };
  return (
    <div>
      {data.summonerLevel}
      <p>World</p>
      <p>Hello</p>
      <button onClick={display}>Test</button>
    </div>
  );
}
