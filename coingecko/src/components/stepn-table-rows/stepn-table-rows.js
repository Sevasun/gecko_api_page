import React from "react";
import { round, spanColor } from "../../modules/helpers";

const StepnTableRow = (props) => {
  const { coins } = props;
  let coinsObj = {};

  coins.map((coin) => {
    const { current_price,
            symbol,
            price_change_24h } = coin;

    return coinsObj[symbol] = {
      price: current_price,
      price_change: price_change_24h
    };
  });

  const solRef = 105;
  const gstRef = 4.8;
  const gmtRef = 3.2;

  const solGstRef = round(solRef / gstRef);
  const solGmtRef = round(solRef / gmtRef);

  const solGstCurrent = round(coinsObj.sol.price / coinsObj.gst.price);
  const solGmtCurrent = round(coinsObj.sol.price / coinsObj.gmt.price);

  const solGstPercentToRef = round(-100 * (solGstRef - solGstCurrent) / solGstRef);
  const solGmtPercentToRef = round(-100 * (solGmtRef - solGmtCurrent) / solGmtRef);

  const solPrice24h = coinsObj.sol.price + coinsObj.sol.price_change;
  const gstPrice24h = coinsObj.gst.price + coinsObj.gst.price_change;
  const gmtPrice24h = coinsObj.gmt.price + coinsObj.gmt.price_change;

  const solGst24h = solPrice24h / gstPrice24h;
  const solGmt24h = solPrice24h / gmtPrice24h;

  const solGstPercentTo24h = round(-100 * (solGstCurrent - solGst24h) / solGst24h);
  const solGmtPercentTo24h = round(-100 * (solGmtCurrent - solGmt24h) / solGmt24h);

  return (
    <tr>
      <td>{ solGstRef }</td>
      <td>{ solGstCurrent }</td>
      <td>{ spanColor(solGstPercentToRef) }</td>
      <td>{ spanColor(solGstPercentTo24h) }</td>
      <td>{ solGmtRef }</td>
      <td>{ solGmtCurrent }</td>
      <td>{ spanColor(solGmtPercentToRef) }</td>
      <td>{ spanColor(solGmtPercentTo24h) }</td>
    </tr>
  );
};

const StepnTableHead = () => {
  return (
    <tr>
      <th>GST/SOL reference</th>
      <th>GST/SOL</th>
      <th>GST/SOL, % to ref</th>
      <th>GST/SOL, % 24h</th>
      <th>GMT/SOL reference</th>
      <th>GMT/SOL</th>
      <th>GMT/SOL, % to ref</th>
      <th>GMT/SOL, % 24h</th>
    </tr>
  );
};

export { StepnTableHead, StepnTableRow };