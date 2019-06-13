"use strict";

// Cookie store object constructor
function CookieStore(name, maxCustPerHour, minCustPerHour, avgCookiePerCust) {
  this.name = name;
  this.maxCustPerHour = maxCustPerHour;
  this.minCustPerHour = minCustPerHour;
  this.avgCookiePerCust = avgCookiePerCust;
  this.cookieSalesPerHour = [];
  this.cookieServersPerHour = [];
  this.open = 6;
  this.close = 20;
  CookieStore.allStores.push(this);
}

CookieStore.allStores = [];

// add random customer generator method to CookieStore
CookieStore.prototype.randomCustomerGenerator = function() {
  return Math.floor(
    Math.random() * (this.maxCustPerHour - this.minCustPerHour) +
      this.minCustPerHour
  );
};

// add populate cookie sales method to CookieStore
CookieStore.prototype.populateCookieSales = function() {
  for (var i = this.open; i <= this.close; i++) {
    this.cookieSalesPerHour.push(
      Math.floor(this.randomCustomerGenerator() * this.avgCookiePerCust)
    );
  }
};

CookieStore.prototype.populateServers = function() {
  for (var s = 0; s < this.cookieSalesPerHour.length; s++) {
    if (this.cookieSalesPerHour[s] < 40) {
      this.cookieServersPerHour.push(2);
    } else {
      this.cookieServersPerHour.push(
        Math.ceil(this.cookieSalesPerHour[s] / 20)
      );
    }
  }
};

// Individual store data
var cookieStores = [
  ["First and Pike", 65, 23, 6.3],
  ["SeaTac Airport", 24, 3, 1.2],
  ["Seattle Center", 38, 11, 3.7],
  ["Capitol Hill", 38, 20, 2.3],
  ["Alki", 16, 2, 4.6]
];

// make and store cookie stores
var makeStores = function(arr) {
  var sites = [];
  for (var l = 0; l < arr.length; l++) {
    sites.push(new CookieStore(...arr[l]));
    sites[l].populateCookieSales();
    sites[l].populateServers();
  }
  return sites;
};

var storeList = makeStores(cookieStores);

var appendTable = function(caption, arr, item) {
  // create table for store data
  // get element to append to
  var storeContainer = document.getElementById("store-sales");

  // create table
  var tableEl = document.createElement("table");
  tableEl.id = "table-set";
  storeContainer.append(tableEl);

  // create store label
  var captionEl = document.createElement("caption");
  captionEl.textContent = caption;
  tableEl.append(captionEl);

  // create table header
  var headerEl = document.createElement("thead");
  tableEl.append(headerEl);

  // create talbe row
  var rowEl = document.createElement("tr");
  headerEl.append(rowEl);

  // create line item and content
  var thEl = document.createElement("th");
  thEl.textContent = "Store Location";
  rowEl.append(thEl);

  // create table header
  for (var k = 0; k < storeList[0][arr].length; k++) {
    // set hour label
    var hour = 0;
    if ((storeList[0].open + k) % 12 !== 0) {
      hour = (storeList[0].open + k) % 12;
    } else {
      hour = 12;
    }

    // set meridian
    var meridian = "";
    if (k < 6) {
      meridian = "am";
    } else {
      meridian = "pm";
    }

    // create line item header
    thEl = document.createElement("th");
    thEl.textContent = `${hour}${meridian}`;
    rowEl.append(thEl);
  }
  // create total header
  thEl = document.createElement("th");
  thEl.textContent = `Total ${item} Per Store`;
  rowEl.append(thEl);

  // create table body
  var tbodyEl = document.createElement("tbody");
  tableEl.append(tbodyEl);

  // table data append to tbody
  // foe each item in storelist create a row and populate it with data
  for (var o = 0; o < storeList.length; o++) {
    // set total
    var totalCount = 0;

    rowEl = document.createElement("tr");
    tbodyEl.append(rowEl);

    var tdEl = document.createElement("td");
    tdEl.textContent = storeList[o].name;
    rowEl.append(tdEl);

    for (var p = 0; p < storeList[o][arr].length; p++) {
      tdEl = document.createElement("td");
      totalCount += storeList[o][arr][p];
      tdEl.textContent = storeList[o][arr][p];
      rowEl.append(tdEl);
    }

    // add total to end of row
    tdEl = document.createElement("td");
    tdEl.textContent = totalCount;
    rowEl.append(tdEl);
  }

  rowEl = document.createElement("tr");
  tbodyEl.append(rowEl);

  // create footer title
  thEl = document.createElement("td");
  thEl.textContent = "Hourly Totals";
  rowEl.append(thEl);

  // create and populate footer with totals by hour
  var dailyTotal = 0;
  for (var q = 0; q < storeList[0][arr].length; q++) {
    var hourlyTotal = 0;
    for (var r = 0; r < storeList.length; r++) {
      hourlyTotal += storeList[r][arr][q];
    }

    // append data to table
    thEl = document.createElement("td");
    thEl.textContent = hourlyTotal;
    rowEl.append(thEl);
    dailyTotal += hourlyTotal;
  }

  // create daily total
  thEl = document.createElement("td");
  thEl.textContent = dailyTotal;
  rowEl.append(thEl);
};

appendTable("Salmon Cookie Store Summary", "cookieSalesPerHour", "Cookies");
appendTable(
  " Store Server Requirement Summary",
  "cookieServersPerHour",
  "Servers"
);

var form = document.getElementById("newShopForm");

var handleFormSubmit = function(formSubmitEvent) {
  formSubmitEvent.preventDefault();

  var storeName = formSubmitEvent.target.name.value;

  var maxCust = parseInt(formSubmitEvent.target.maxCustPerHour.value);

  var minCust = parseInt(formSubmitEvent.target.minCustPerHour.value);

  var avgCookie = parseInt(formSubmitEvent.target.avgCookiePerCust.value);
  var newStore = [storeName, maxCust, minCust, avgCookie];
  cookieStores.push(newStore);

  storeList = makeStores(cookieStores);

  document.getElementById("table-set").remove();
  document.getElementById("table-set").remove();

  appendTable("Salmon Cookie Store Summary", "cookieSalesPerHour", "Cookies");
  appendTable(
    " Store Server Requirement Summary",
    "cookieServersPerHour",
    "Servers"
  );
};

form.addEventListener("submit", handleFormSubmit);
