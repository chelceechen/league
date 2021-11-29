import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  summonerName: "",
  summonerLevel: 0,
  state_: null,
  Solo_Duo: { tier: "", rank: "", lp: 0, wins: 0, losses: 0, totalgames: 0 },
  Flex: { tier: "", rank: "", lp: 0, wins: 0, losses: 0, totalgames: 0 },
};

const Legends = createSlice({
  name: "legends",
  initialState,
  reducers: {
    setupSummonerName(state, action) {
      [state.summonerName, state.summonerLevel, state.state_] = [
        action.payload.summonerName,
        action.payload.summonerLevel,
        action.payload.state_,
      ];
    },
    setupSummonerSoloRank(state, action) {
      [
        state.Solo_Duo.tier,
        state.Solo_Duo.rank,
        state.Solo_Duo.lp,
        state.Solo_Duo.wins,
        state.Solo_Duo.losses,
        state.Solo_Duo.totalgames,
      ] = [
        action.payload.Solo_DuoTier,
        action.payload.Solo_DuoRank,
        action.payload.Solo_DuoLp,
        action.payload.Solo_DuoWins,
        action.payload.Solo_DuoLosses,
        action.payload.Solo_DuoTotalgames,
      ];
    },
    setupSummonerFlexRank(state, action) {
      [
        state.Flex.tier,
        state.Flex.rank,
        state.Flex.lp,
        state.Flex.wins,
        state.Flex.losses,
        state.Flex.totalgames,
      ] = [
        action.payload.FlexTier,
        action.payload.FlexRank,
        action.payload.FlexLp,
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
        state.Solo_Duo.lp,
        state.Solo_Duo.wins,
        state.Solo_Duo.losses,
        state.Solo_Duo.totalgames,
        state.Flex.tier,
        state.Flex.rank,
        state.Flex.lp,
        state.Flex.wins,
        state.Flex.losses,
        state.Flex.totalgames,
      ] = ["", 0, "", "", 0, 0, 0, 0, "", "", 0, 0, 0, 0];
    },
  },
});

export const {
  reNew,
  setupSummonerName,
  setupSummonerSoloRank,
  setupSummonerFlexRank,
} = Legends.actions;
export const selectLegends = (state) => state.legends;

export default Legends.reducer;
