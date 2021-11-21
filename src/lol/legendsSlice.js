import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  summonerName: "",
  summonerLevel: 0,
  Solo_Duo: { tier: "", rank: "", wins: 0, losses: 0, totalgames: 0 },
  Flex: { tier: "", rank: "", wins: 0, losses: 0, totalgames: 0 },
};

const Legends = createSlice({
  name: "legends",
  initialState,
  reducers: {
    setupSummonerName(state, action) {
      [state.summonerName, state.summonerLevel] = [
        action.payload.summonerName,
        action.payload.summonerLevel,
      ];
    },
    setupSummonerRank(state, action) {
      [
        state.Solo_Duo.tier,
        state.Solo_Duo.rank,
        state.Solo_Duo.wins,
        state.Solo_Duo.losses,
        state.Solo_Duo.totalgames,
        state.Flex.tier,
        state.Flex.rank,
        state.Flex.wins,
        state.Flex.losses,
        state.Flex.totalgames,
      ] = [
        action.payload.Solo_DuoTier,
        action.payload.Solo_DuoRank,
        action.payload.Solo_DuoWins,
        action.payload.Solo_DuoLosses,
        action.payload.Solo_DuoTotalgames,
        action.payload.FlexTier,
        action.payload.FlexRank,
        action.payload.FlexWins,
        action.payload.FlexLosses,
        action.payload.FlexTotalgames,
      ];
    },
    reNew(state) {
      [
        state.summonerName,
        state.summonerLevel,
        state.Solo_Duo.tier,
        state.Solo_Duo.rank,
        state.Solo_Duo.wins,
        state.Solo_Duo.losses,
        state.Solo_Duo.totalgames,
        state.Flex.tier,
        state.Flex.rank,
        state.Flex.wins,
        state.Flex.losses,
        state.Flex.totalgames,
      ] = ["", 0, "", "", 0, 0, 0, "", "", 0, 0, 0];
    },
  },
});

export const { reNew, setupSummonerName, setupSummonerRank } = Legends.actions;
export const selectLegends = (state) => state.legends;

export default Legends.reducer;
