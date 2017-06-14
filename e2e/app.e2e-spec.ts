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
describe('tests for city-detail page', function () {

  beforeEach(function () {
    browser.get("http://localhost:3000/detail/1");
  });

  it('test whether city-detail photo exists', function () {

    expect(element(by.id('detailCityPhoto')).isPresent()).toEqual(true);
  });

  it('test whether accomodation field exists', function () {
    element(by.id('search')).sendKeys('Sarajevo');
    element(by.id('accomod')).isPresent();
    expect(browser.getCurrentUrl()).toEqual(true);
  });

  it('test whether map field exists', function () {
    element(by.id('search')).sendKeys('Sarajevo');
    element(by.id('map')).isPresent();
    expect(browser.getCurrentUrl()).toEqual(true);
  });
  it('test whether food field exists', function () {
    element(by.id('search')).sendKeys('Sarajevo');
    element(by.id('food')).isPresent();
    expect(browser.getCurrentUrl()).toContain('food/1');
  });
  it('test whether place field exists', function () {
    element(by.id('search')).sendKeys('Sarajevo');
    element(by.id('place')).isPresent();
    expect(browser.getCurrentUrl()).toContain('place/1');
  });
  it('test whether back button returns to the dashboard', function () {
    element(by.id('search')).sendKeys('Sarajevo');
    element(by.id('button')).click();
    expect(browser.getCurrentUrl()).toContain('dashboard');
  });
  it('test whether it directs to accomodation', function () {
    element(by.id('search')).sendKeys('Sarajevo');
    element(by.id('accomod')).click();
    expect(browser.getCurrentUrl()).toContain('accomod/1');
  });
  it('test whether it directs to place', function () {
    element(by.id('search')).sendKeys('Sarajevo');
    element(by.id('places')).click();
    expect(browser.getCurrentUrl()).toContain('place/1');
  });
  it('test whether it directs to food', function () {
    element(by.id('search')).sendKeys('Sarajevo');
    element(by.id('food')).click();
    expect(browser.getCurrentUrl()).toContain('food/1');
  });

  describe('tests for accomodation-detail page', function () {

    beforeEach(function () {
      browser.get("http://localhost:3000/accomod/1");
    });

    it('test whether accomodation-detail photo exists', function () {
      element(by.id('search')).sendKeys('Sarajevo');
      element(by.id('header')).isPresent();
      expect(browser.getCurrentUrl()).toEqual(true);
    });

    it('test whether map field exists', function () {
      element(by.id('search')).sendKeys('Sarajevo');
      element(by.id('map')).isPresent();
      expect(browser.getCurrentUrl()).toEqual(true);
    });

    it('test whether information field exists', function () {
      element(by.id('search')).sendKeys('Sarajevo');
      element(by.id('information')).isPresent();
      expect(browser.getCurrentUrl()).toEqual(true);
    });

    it('test whether table field exists', function () {
      element(by.id('search')).sendKeys('Sarajevo');
      element(by.id('table-wrapper')).isPresent();
      expect(browser.getCurrentUrl()).toEqual(true);
    });

    it('test whether scroller field exists', function () {
      element(by.id('search')).sendKeys('Sarajevo');
      element(by.id('table-scroll')).isPresent();
      expect(browser.getCurrentUrl()).toEqual(true);
    });

    it('test whether scroller works', function () {
      element(by.id('search')).sendKeys('Sarajevo');
      element(by.id('table-scroll')).click();
      expect(browser.getCurrentUrl()).toContain('accomod/1');
    });

    it('test whether table contains elements', function () {
      element(by.id('search')).sendKeys('Sarajevo');
      element(by.id('table-wrapper')).toContain();
      expect(browser.getCurrentUrl()).toContain('accomod/1');
    });

    it('test whether back button returns to the detail page', function () {
      element(by.id('search')).sendKeys('Sarajevo');
      element(by.id('button')).click();
      expect(browser.getCurrentUrl()).toContain('detail/1');
    });

    it('test whether back button returns to the dashboard page', function () {
      element(by.id('search')).sendKeys('Sarajevo');
      element(by.id('button')).click();
      element(by.id('button')).click();
      expect(browser.getCurrentUrl()).toContain('dashboard');
    });
    it('test whether back button returns to the detail page and goes to places', function () {
      element(by.id('search')).sendKeys('Sarajevo');
      element(by.id('button')).click();
      element(by.id('places')).click();
      expect(browser.getCurrentUrl()).toContain('places/1');
    });
    it('test whether back button returns to the detail page and goes to food', function () {
      element(by.id('search')).sendKeys('Sarajevo');
      element(by.id('button')).click();
      element(by.id('food')).click();
      expect(browser.getCurrentUrl()).toContain('food/1');
    });
  });

  describe('tests for food-detail page', function () {

    beforeEach(function () {
      browser.get("http://localhost:3000/food/1");
    });

    it('test whether food-detail photo exists', function () {
      element(by.id('search')).sendKeys('Sarajevo');
      element(by.id('header')).isPresent();
      expect(browser.getCurrentUrl()).toEqual(true);
    });

    it('test whether map field exists', function () {
      element(by.id('search')).sendKeys('Sarajevo');
      element(by.id('map')).isPresent();
      expect(browser.getCurrentUrl()).toEqual(true);
    });

    it('test whether information field exists', function () {
      element(by.id('search')).sendKeys('Sarajevo');
      element(by.id('information')).isPresent();
      expect(browser.getCurrentUrl()).toEqual(true);
    });

    it('test whether table field exists', function () {
      element(by.id('search')).sendKeys('Sarajevo');
      element(by.id('table-wrapper')).isPresent();
      expect(browser.getCurrentUrl()).toEqual(true);
    });

    it('test whether scroller field exists', function () {
      element(by.id('search')).sendKeys('Sarajevo');
      element(by.id('table-scroll')).isPresent();
      expect(browser.getCurrentUrl()).toEqual(true);
    });

    it('test whether scroller works', function () {
      element(by.id('search')).sendKeys('Sarajevo');
      element(by.id('table-scroll')).click();
      expect(browser.getCurrentUrl()).toContain('food/1');
    });

    it('test whether table contains elements', function () {
      element(by.id('search')).sendKeys('Sarajevo');
      element(by.id('table-wrapper')).toContain();
      expect(browser.getCurrentUrl()).toContain('food/1');
    });

    it('test whether back button returns to the detail page', function () {
      element(by.id('search')).sendKeys('Sarajevo');
      element(by.id('button')).click();
      expect(browser.getCurrentUrl()).toContain('detail/1');
    });

    it('test whether back button returns to the dashboard page', function () {
      element(by.id('search')).sendKeys('Sarajevo');
      element(by.id('button')).click();
      element(by.id('button')).click();
      expect(browser.getCurrentUrl()).toContain('dashboard');
    });
    it('test whether back button returns to the detail page and goes to places', function () {
      element(by.id('search')).sendKeys('Sarajevo');
      element(by.id('button')).click();
      element(by.id('places')).click();
      expect(browser.getCurrentUrl()).toContain('places/1');
    });
    it('test whether back button returns to the detail page and goes to accomodation', function () {
      element(by.id('search')).sendKeys('Sarajevo');
      element(by.id('button')).click();
      element(by.id('accomodation')).click();
      expect(browser.getCurrentUrl()).toContain('accomod/1');
    });
  });
  describe('tests for places-detail page', function () {

    beforeEach(function () {
      browser.get("http://localhost:3000/places/1");
    });

    it('test whether places-detail photo exists', function () {
      element(by.id('search')).sendKeys('Sarajevo');
      element(by.id('header')).isPresent();
      expect(browser.getCurrentUrl()).toEqual(true);
    });

    it('test whether map field exists', function () {
      element(by.id('search')).sendKeys('Sarajevo');
      element(by.id('map')).isPresent();
      expect(browser.getCurrentUrl()).toEqual(true);
    });

    it('test whether information field exists', function () {
      element(by.id('search')).sendKeys('Sarajevo');
      element(by.id('information')).isPresent();
      expect(browser.getCurrentUrl()).toEqual(true);
    });

    it('test whether table field exists', function () {
      element(by.id('search')).sendKeys('Sarajevo');
      element(by.id('table-wrapper')).isPresent();
      expect(browser.getCurrentUrl()).toEqual(true);
    });

    it('test whether scroller field exists', function () {
      element(by.id('search')).sendKeys('Sarajevo');
      element(by.id('table-scroll')).isPresent();
      expect(browser.getCurrentUrl()).toEqual(true);
    });

    it('test whether scroller works', function () {
      element(by.id('search')).sendKeys('Sarajevo');
      element(by.id('table-scroll')).click();
      expect(browser.getCurrentUrl()).toContain('food/1');
    });

    it('test whether table contains elements', function () {
      element(by.id('search')).sendKeys('Sarajevo');
      element(by.id('table-wrapper')).toContain();
      expect(browser.getCurrentUrl()).toContain('food/1');
    });

    it('test whether back button returns to the detail page', function () {
      element(by.id('search')).sendKeys('Sarajevo');
      element(by.id('button')).click();
      expect(browser.getCurrentUrl()).toContain('detail/1');
    });

    it('test whether back button returns to the dashboard page', function () {
      element(by.id('search')).sendKeys('Sarajevo');
      element(by.id('button')).click();
      element(by.id('button')).click();
      expect(browser.getCurrentUrl()).toContain('dashboard');
    });
    it('test whether back button returns to the detail page and goes to food', function () {
      element(by.id('search')).sendKeys('Sarajevo');
      element(by.id('button')).click();
      element(by.id('food')).click();
      expect(browser.getCurrentUrl()).toContain('food/1');
    });
    it('test whether back button returns to the detail page and goes to accomodation', function () {
      element(by.id('search')).sendKeys('Sarajevo');
      element(by.id('button')).click();
      element(by.id('accomod')).click();
      expect(browser.getCurrentUrl()).toContain('accomod/1');
    });
  });
});
