'use strict';

var FirstAndPike = {
  name: 'First and Pike',
  maxCustPerHour: 65,
  minCustPerHour: 23,
  avgCookiePerCust: 6.3,
  cookieSalesPerHour: [],
  populateCookieSales: function() {
    for (var i = this.open; i <= this.close; i++) {
      this.cookieSalesPerHour.push(Math.floor(this.randomCustomerGenerator() * this.avgCookiePerCust));
      // console.log('this.cookieSalesPerHour: ', this.cookieSalesPerHour);
    }
  },
  randomCustomerGenerator: function() {
    return Math.floor(Math.random() * (this.maxCustPerHour - this.minCustPerHour) + this.minCustPerHour);
  },
  open: 6,
  close: 20,
};

var SeaTacAirport = {
  name: 'SeaTac Airport',
  maxCustPerHour: 24,
  minCustPerHour: 3,
  avgCookiePerCust: 1.2,
  cookieSalesPerHour: [],
  populateCookieSales: function() {
    for (var i = this.open; i <= this.close; i++) {
      this.cookieSalesPerHour.push(Math.floor(this.randomCustomerGenerator() * this.avgCookiePerCust));
      // console.log('this.cookieSalesPerHour: ', this.cookieSalesPerHour);
    }
  },
  randomCustomerGenerator: function() {
    return Math.floor(Math.random() * (this.maxCustPerHour - this.minCustPerHour) + this.minCustPerHour);
  },
  open: 6,
  close: 20,
};

var SeattleCenter = {
  name: 'Seattle Center',
  maxCustPerHour: 38,
  minCustPerHour: 11,
  avgCookiePerCust: 3.7,
  cookieSalesPerHour: [],
  populateCookieSales: function() {
    for (var i = this.open; i <= this.close; i++) {
      this.cookieSalesPerHour.push(Math.floor(this.randomCustomerGenerator() * this.avgCookiePerCust));
      // console.log('this.cookieSalesPerHour: ', this.cookieSalesPerHour);
    }
  },
  randomCustomerGenerator: function() {
    return Math.floor(Math.random() * (this.maxCustPerHour - this.minCustPerHour) + this.minCustPerHour);
  },
  open: 6,
  close: 20,
};

var CapitolHill = {
  name: 'Capitol Hill',
  maxCustPerHour: 38,
  minCustPerHour: 20,
  avgCookiePerCust: 2.3,
  cookieSalesPerHour: [],
  populateCookieSales: function() {
    for (var i = this.open; i <= this.close; i++) {
      this.cookieSalesPerHour.push(Math.floor(this.randomCustomerGenerator() * this.avgCookiePerCust));
      // console.log('this.cookieSalesPerHour: ', this.cookieSalesPerHour);
    }
  },
  randomCustomerGenerator: function() {
    return Math.floor(Math.random() * (this.maxCustPerHour - this.minCustPerHour) + this.minCustPerHour);
  },
  open: 6,
  close: 20,
};

var Alki = {
  name: 'Alki',
  maxCustPerHour: 16,
  minCustPerHour: 2,
  avgCookiePerCust: 4.6,
  cookieSalesPerHour: [],

  populateCookieSales: function() {
    for (var i = this.open; i <= this.close; i++) {
      this.cookieSalesPerHour.push(Math.floor(this.randomCustomerGenerator() * this.avgCookiePerCust));
      // console.log('this.cookieSalesPerHour: ', this.cookieSalesPerHour);
    }
  },

  randomCustomerGenerator: function() {
    return Math.floor(Math.random() * (this.maxCustPerHour - this.minCustPerHour) + this.minCustPerHour);
  },
  open: 6,
  close: 20,
};

var storeList = [FirstAndPike, SeaTacAirport, SeattleCenter, CapitolHill, Alki];

// for each store in store list create unordered list
for (var j = 0; j < storeList.length; j++) {
  // set store name for object calling
  var store = storeList[j];

  // get element to append to
  var storeContainer = document.getElementById('repo');

  // create store label
  var nameEl = document.createElement('h2');
  nameEl.textContent = store.name;
  storeContainer.append(nameEl);

  // create unordered list
  var ulEl = document.createElement('ul');

  // give the unordered list a unique ID of 'store-[storeName]'
  ulEl.id = 'store-' + store;
  storeContainer.append(ulEl);

  // populate cookie sales
  store.populateCookieSales();
  // console.log(store.cookieSalesPerHour);

  // create Line items
  for (var k = 0; k < store.cookieSalesPerHour.length; k++) {
    // set hour label
    var hour = 0;
    if ((store.open + k) % 12 !== 0) {
      hour = (store.open + k) % 12;
    } else {
      hour = 12;
    }
    // console.log('hour: ', hour);

    // set meridian
    var meridian = '';
    if (k < 6) {
      meridian = 'am';
    } else {
      meridian = 'pm';
    }

    // create line item and content
    var liEl = document.createElement('li');
    liEl.textContent = `${hour}${meridian}: ${store.cookieSalesPerHour[k]} cookies`;

    ulEl.append(liEl);
  }
}
