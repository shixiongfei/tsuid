"use strict";

const tsuid = require("..");
const should = require("should");
const Long = require("long");

describe("tsuid()", function() {
  it("should not return null", function() {
      should.exist(tsuid());
  });

  it("should not return the same UUID when it called multiple times", function() {
      var uuid1 = tsuid();
      var uuid2 = tsuid();
      uuid1.should.not.be.equal(uuid2);
  });

  it("should return string by default", function() {
    tsuid().should.be.String();
  });

  it("should return long when long type is given", function() {
    tsuid("long").should.be.instanceOf(Long);
  });
});
