import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    {
      id: 1,
      locations: [
        [
          18.52063224305717,
          73.85581076145174
        ],
        [
          18.52063732964834,
          73.85600924491884
        ],
        [
          18.52063732964834,
          73.8561648130417
        ],
        [
          18.52063732964834,
          73.85635256767274
        ],
        [
          18.52063224305717,
          73.85645449161531
        ],
        [
          18.52063224305717,
          73.85665833950044
        ],
        [
          18.52063224305717,
          73.85687828063966
        ],
        [
          18.52063224305717,
          73.85706067085268
        ],
        [
          18.52063224305717,
          73.85725378990175
        ],
        [
          18.52050507822898,
          73.85735571384431
        ],
        [
          18.520408432896293,
          73.85735571384431
        ],
        [
          18.520316874109728,
          73.85736107826234
        ],
        [
          18.5202354884805,
          73.85753810405733
        ],
        [
          18.520210055463412,
          73.85765612125398
        ],
        [
          18.520179535837933,
          73.8578224182129
        ],
        [
          18.520143929601325,
          73.85796189308168
        ],
        [
          18.520143929601325,
          73.85808527469636
        ],
        [
          18.52016936262823,
          73.85815501213075
        ],
        [
          18.520311787509016,
          73.85815501213075
        ],
        [
          18.52038808650352,
          73.85815501213075
        ],
        [
          18.520393173101937,
          73.85797798633577
        ],
        [
          18.520469472060128,
          73.85782778263093
        ],
        [
          18.520581377137248,
          73.8577687740326
        ],
        [
          18.520744148027795,
          73.8577687740326
        ],
        [
          18.520927265094496,
          73.85790288448335
        ],
        [
          18.52101882355433,
          73.85800480842592
        ],
        [
          18.52101882355433,
          73.85809600353242
        ],
        [
          18.520967957749363,
          73.8581818342209
        ],
        [
          18.520881485846207,
          73.85831594467165
        ],
        [
          18.52081536024369,
          73.85833740234376
        ],
        [
          18.520830620000403,
          73.85847151279451
        ],
        [
          18.520835706585654,
          73.85855197906496
        ]
      ],
      animate: false,
      color: 'red',
	  progress: 0,
      startIdx: 0
    }
  ] // Hardcoded one drone locations for demo purpose

export const dronesSlice = createSlice({
	name: "drones",
	initialState,
	reducers: {
		setIsAnimate: (state, action) => {
			let { droneId, animate } = action.payload;
			const idx = state.findIndex((d) => d.id === droneId);
			if (idx !== -1) {
				state[idx].animate = animate;
			}
		},
		addLocations: (state, action) => {
			const { lat, lng, droneId } = action.payload;
			const idx = state.findIndex((d) => d.id === droneId);
			if (idx !== -1) {
				state[idx].locations.push([lat, lng]);
			}
		},
    addBulkLocations: (state, action) => {
			const { locations, droneId } = action.payload;
			const idx = state.findIndex((d) => d.id === droneId);
			if (idx !== -1) {
				state[idx].locations.push(...locations);
			}
		},
		addDrone: (state) => {
			state.push({
				id: state.length + 1,
				locations: [],
				startIdx: 0,
				animate: false,
				color: "#" + Math.floor(Math.random() * 16777215).toString(16),
				progress: 0,
			});
		},
		setProgress: (state, action) => {
			const { droneId, value } = action.payload
			const idx = state.findIndex((d) => d.id === droneId);
			if (idx !== -1) {
				state[idx].progress = value;
			}
		},
		setStartIdx: (state, action) => {
			const { index, droneId } = action.payload
			const idx = state.findIndex((d) => d.id === droneId);
			if (idx !== -1) {
				state[idx].startIdx = index
			}
		}
	},
});

export const { setIsAnimate, addLocations, addDrone, setProgress, setStartIdx, addBulkLocations } = dronesSlice.actions;

export default dronesSlice.reducer;
