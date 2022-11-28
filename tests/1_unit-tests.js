const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();
const units = ["km", "mi", "gal", "L", "lbs", "kg"];
const unitsSpelledOut = ["kilometers", "miles", "gallons", "liters", "pounds", "kilograms"]

suite('Unit Tests', function(){
    test("is whole number", () => {
        assert.equal(convertHandler.getNum("1mi") % 1, 0)
    });
    test("is decimal number", () => {
        assert.equal(convertHandler.getNum("1.5mi"), 1.5)
    });
    test("is factional", () => {
        assert.equal(convertHandler.getNum("1/2mi"), 0.5)
    });
    test("is farctional with decimal", () => {
        assert.equal(convertHandler.getNum("1/2.5mi"), 0.4)
    })
    test("double fraction returns error", () => {
        assert.equal(convertHandler.getNum("3/2/3mi"), "invalid number")
    });
    test("no number input, defaults 1", () => {
        assert.equal(convertHandler.getNum("mi"), 1)
    });
    test("valid input unit", () => {
        assert.include(units, convertHandler.getUnit("1.2mi"))
    });
    test("no valid input unit", () => {
        assert.notInclude(units, convertHandler.getUnit("1.2li"))
    });
    test("return unit for valid input unit", () => {
        assert.include(units, convertHandler.getReturnUnit("gal"))
    });
    test("spelled out unit for valid input unit", () => {
        assert.include(unitsSpelledOut, convertHandler.spellOutUnit("kg"))
    });
    test("gal to L", () => {
        assert.equal(convertHandler.getReturnUnit("gal"), "L")
    });
    test("L to gal", () => {
        assert.equal(convertHandler.getReturnUnit("L"), "gal")
    });
    test("mi to km", () => {
        assert.equal(convertHandler.getReturnUnit("mi"), "km")
    });
    test("km to mi", () => {
        assert.equal(convertHandler.getReturnUnit("km"), "mi")
    });
    test("lbs to kg", () => {
        assert.equal(convertHandler.getReturnUnit("lbs"), "kg")
    });
    test("kg to lbs", () => {
        assert.equal(convertHandler.getReturnUnit("kg"), "lbs")
    });
});
