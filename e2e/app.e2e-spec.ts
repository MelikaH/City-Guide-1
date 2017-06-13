import {browser, by, element} from "protractor";
/**
 * Created by denis on 5/16/2017.
 */

describe("test of home page", function () {

  let expectedMsg = 'Welcome to the City-Guide!Please enter the city.';
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
    expect(browser.getCurrentUrl()).toContain('detail/1');
  });

  it('Typing in Travnik and clicking GO goes to Travnik details page', function () {
    element(by.id('search')).clear();
    element(by.id('search')).sendKeys('Travnik');
    element(by.id('goBtn')).click();
    expect(browser.getCurrentUrl()).toContain('detail/3');
  });

  it('Typing in Zenica and clicking GO goes to Zenica details page', function () {
    element(by.id('search')).clear();
    element(by.id('search')).sendKeys('Zenica');
    element(by.id('goBtn')).click();
    expect(browser.getCurrentUrl()).toContain('detail/5');
  });

  it('Typing in non existant city leads to notfound page', function () {
    element(by.id('search')).clear();
    element(by.id('search')).sendKeys('New York');
    element(by.id('goBtn')).click();
    expect(browser.getCurrentUrl()).toContain('notfound');
  });

});

describe("testing using css expressions", function(){
	beforeEach(function(){
		browser.get("http://localhost:3000/dashboard");
		});
		
	it("button reactions", funtion(){
		element(by.css('input')).sendKeys("Mostar");
		element(by.css('button')).click();
		element(by.css('button')).click();
		expect(browser.getCurrentUrl()).toEqual("http://localhost:3000/dashboard");
	});
	
	it("going to the accomodation page", function(){
		element(by.css('input')).sendKeys("Banja Luka");
		element(by.css('button')).click();
		var nortonlink=element(by.css('[href="/accomod/11"]'));
		nortonlink.click();
		expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/accomod/11');
	});
	
	it("going to the food page", function(){
		element(by.css('input')).sendKeys("Banja Luka");
		element(by.css('button')).click();
		var nortonlink=element(by.css('[href="/food/11"]'));
		nortonlink.click();
		expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/food/11');
	});
	it("going to the places page", function(){
		element(by.css('input')).sendKeys("Banja Luka");
		element(by.css('button')).click();
		var nortonlink=element(by.css('[href="/places/11"]'));
		nortonlink.click();
		expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/places/11');
	});
		
	
});



