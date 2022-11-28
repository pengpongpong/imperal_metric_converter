function ConvertHandler() {

  const units = ["km", "mi", "gal", "L", "lbs", "kg"];
  const unitsSpelledOut = ["kilometers", "miles", "gallons", "liters", "pounds", "kilograms"];

  const regexNum = /\d*\.?\d*\/?\d*\.?\d*\/?/
  const regexUnit = /[a-zA-Z]*$/;

  const filterNum = (val) => {
    return val.match(regexNum)[0]
  };

  const filterUnit = (val) => {
    return val.match(regexUnit)[0]
  };

  this.getNum = function(input) {
    let result;
    const regexDblFrac = /[\/]/g;
    let tempNum = filterNum(input);
    const checkFrac = tempNum.match(regexDblFrac);

    if (tempNum === "") {
      tempNum = 1;
    };

    if (checkFrac) {
      if (checkFrac.length > 1) {
        result = "invalid number";
      }
      else if (checkFrac.length === 1) {
        let num1 = Number(tempNum.split("/")[0])
        let num2 = Number(tempNum.split("/")[1])
        result = num1 / num2;
      }
    } 
    else {
      result = Number(tempNum);
    };

    return result;
  };
  
  this.getUnit = function(input) {
    let result = filterUnit(input).toLowerCase();

    if (result === "l") {
      result = "L"
    };

    if (result === "km" || result === "mi" || result === "gal" || result === "L" || result === "lbs" || result === "kg") {
      return result
    }
    else {
      return "invalid unit"
    };
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;

    if (initUnit === "km") {
      result = "mi";
    }
    else if (initUnit === "mi") {
      result = "km";
    }
    else if (initUnit === "gal") {
      result = "L";
    }
    else if (initUnit === "L") {
      result = "gal";
    }
    else if (initUnit === "lbs") {
      result = "kg";
    }
    else if (initUnit === "kg") {
      result = "lbs";
    }
    else {
      result = "invalid unit"
    };
    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;

    if (unit === "km") {
      result = "kilometers";
    }
    else if (unit === "mi") {
      result = "miles";
    }
    else if (unit === "gal") {
      result = "gallons";
    }
    else if (unit === "L") {
      result = "liters";
    }
    else if (unit === "lbs") {
      result = "pounds";
    }
    else if (unit === "kg") {
      result = "kilograms";
    }
    else {
      result = "invalid unit"
    };
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    if (initUnit === "gal") {
      result = (initNum * galToL)
    }
    else if (initUnit === "L") {
      result = (initNum / galToL)
    }
    else if (initUnit === "lbs") {
      result = (initNum * lbsToKg)
    }
    else if (initUnit === "kg") {
      result = (initNum / lbsToKg)
    }
    else if (initUnit === "mi") {
      result = (initNum * miToKm)
    }
    else if (initUnit === "km") {
      result = (initNum / miToKm)
    };
    return result.toFixed(5);
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result = `${initNum} ${initUnit} converts to ${returnNum} ${returnUnit}`;
    return result;
  };
  
}

// let convertHandler = new ConvertHandler()

// console.log(convertHandler.getUnit("1.1/1.1/asdf"))


module.exports = ConvertHandler;
