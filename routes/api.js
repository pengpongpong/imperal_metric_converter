'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');
const express = require("express")

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.route("/api/convert").get((req, res) => {
    const input = req.query.input
    const initNum = convertHandler.getNum(input);
    const initUnit = convertHandler.getUnit(input);

    if (!input) {
      res.json("invalid unit")
    }
    else if (initUnit === "invalid unit" || initNum === "invalid number") {
      let result = [];
  
      if (initNum === "invalid number") {
        result.push(initNum)
      };
      if (initUnit === "invalid unit") {
        result.push(initUnit)
      };

      if (result.length > 1) {
        res.json("invalid number and unit")
      }
      else if (result.length === 1) {
        res.json(result[0])
      };
    }
    else {
      
      const returnUnit = convertHandler.getReturnUnit(initUnit);
      const returnNum = convertHandler.convert(initNum, initUnit);
      const initUnitSpell = convertHandler.spellOutUnit(initUnit);
      const returnUnitSpell = convertHandler.spellOutUnit(returnUnit);
      
      res.json({
        initNum: initNum,
        initUnit: initUnit,
        returnNum: Number(returnNum),
        returnUnit: returnUnit,
        string: convertHandler.getString(initNum, initUnitSpell, returnNum, returnUnitSpell)
      })
      
    }
    


  })
};
