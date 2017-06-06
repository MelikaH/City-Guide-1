import {browser, by, element} from "protractor";
/**
 * Created by denis on 5/16/2017.
 */

describe("test of home page", function () {

  let expectedMsg = 'Welcome to the City-Guide!';
  beforeEach(function (){
    browser.get("http://localhost:3000/dashboard");
  });

  it("should be on a correct page", function () {
    expect(browser.getCurrentUrl()).toEqual("http://localhost:3000/dashboard");
  });

  it("Title should be City-Guide", function () {
    expect(browser.getTitle()).toEqual("City-Guide");
  });

  it('should display: ' + expectedMsg, function () {
    expect(element(by.id('welcomeMessage')).getText()).toEqual(expectedMsg);
  });

});


describe('test for input ', function () {

  beforeEach(function (){
    browser.get("http://localhost:3000/dashboard");
  });

  it('clicking on details jumps to details about Sarajevo', function () {
    element(by.id('goBtn')).click();
    element(by.id('goBtn')).click();
    expect(browser.getCurrentUrl()).toContain('detail/1');
  });


  it('Tping in Travnik and clicking GO goes to Travnik details page', function () {
    element(by.id('search')).clear();
    element(by.id('search')).sendKeys('Travnik');
    element(by.id('goBtn')).click();
    element(by.id('goBtn')).click();
    expect(browser.getCurrentUrl()).toContain('detail/3');
  });

  it('Typing in Zenica and clicking GO goes to Zenica details page', function () {
    element(by.id('search')).clear();
    element(by.id('search')).sendKeys('Zenica');
    element(by.id('goBtn')).click();
    element(by.id('goBtn')).click();
    expect(browser.getCurrentUrl()).toContain('detail/5');
  });

  it('Typing in non existant city leads to nowhere', function () {
    element(by.id('search')).clear();
    element(by.id('search')).sendKeys('New York');
    element(by.id('goBtn')).click();
    expect(browser.getCurrentUrl()).toContain('dashboard');
  });

});
