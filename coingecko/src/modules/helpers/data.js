const selectCoinsPerPage = [
  {value: 10, text: '10'},
  {value: 25, text: '25'},
  {value: 50, text: '50'},
  {value: 100, text: '100'}
];

const selectAutoReloadTiming = [
  {value: 0, text: "Disabled"},
  {value: 60000, text: "1 min"},
  {value: 300000, text: "5 min"},
  {value: 600000, text: "10 min"},
  {value: 1200000, text: "20 min"},
  {value: 1800000, text: "30 min"},
  {value: 3600000, text: "1 hour"}
]

export { selectCoinsPerPage, selectAutoReloadTiming };