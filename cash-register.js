function checkCashRegister(price, cash, cid) {
  let change = cash - price;
  console.log("change:", change);
  let divide = [100, 20, 10, 5, 1, 0.25, 0.1, 0.05, 0.01];
  let togive = {
    status: "",
    change: []
  }

  let totalOfCash = cid.reduce((total, el) => {
    return total + el[1];
  }, 0);
  console.log("total of cash: ", totalOfCash);

  if(totalOfCash === change){
    togive["status"] = "CLOSED";
    togive["change"] = cid;
  } else if (totalOfCash > change && totalOfCash > 300){
    cid.reverse().map((item, dex) => {
      for(let i = item[1]; i > 0; i = i - divide[dex]){
        if((change - Math.round(i*100)/100) >= 0){
          let y = change - Math.round(i*100)/100;
          change = Math.round(y*100)/100;
          togive["status"] = "OPEN";
          togive["change"].push([item[0], Math.round(i*100)/100]);
          break;
        }
      }
    });
  } else {
    cid.reverse().map((item, dex) => {
      for(let i = item[1]; i > 0; i = i - divide[dex]){
        if((change - Math.round(i*100)/100) >= 0){
          let y = change - Math.round(i*100)/100;
          change = Math.round(y*100)/100;
          togive["status"] = "INSUFFICIENT_FUNDS";
          togive["change"] = [];
          break;
        }
      }
    });
  }

  console.log("modified change:", change);
  return togive;
}

console.log("first: ",checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]));
console.log("second: ",checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]));
console.log("third: ",checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]));
console.log("fourth: ",checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]));




console.log("fifth: ",checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]));
