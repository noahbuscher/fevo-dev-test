/**
 * Config
 */
var accountsSrc = './accounts.json';

/**
 * Imports
 */
var fs = require('fs');

/**
 * Parse accounts file into array
 */
var accountData = JSON.parse(fs.readFileSync('./accounts.json', 'utf8'));

/**
 * Merge arrays, remove duplicates
 */
function mergeArrays(a1, a2) {
  var merged = a1;

  for (var i = 0; i < a2.length; i++) {
    if (merged.indexOf(a2[i]) == -1) {
      merged.push(a2[i]);
    }
  }

  return merged;
}


/**
 * Populate new person object
 */
function createPerson(n, e, a) {
  var newPerson = {};

  newPerson.name = n;
  newPerson.emails = e;
  newPerson.applications = [a];

  return newPerson;
}

/**
 * Initialize people
 */
function populatePeople(accounts) {
  var people = [];

  for (var i = 0; i < accounts.length; i++) {
    var account = accounts[i];

    people.push(createPerson(account.name, account.emails, account.application));
  }

  return people;
}

/**
 * Merge people
 */
function mergePeople(people) {

  // Iterate through all people
  for (var i = 0; i < people.length; i++) {

    // Iterate through existing person's emails
    for (var j = 0; j < people[i].emails.length; j++) {
      var email = people[i].emails[j];

      // Iterate throguh all people
      for (var k = 0; k < people.length; k++) {

        // Ignore current person
        if (k !== i) {

          // Set emails to check against
          var emailsToBeCompared = people[k].emails;

          // Compare each email to existing email
          for (var l = 0; l < emailsToBeCompared.length; l++) {
            var emailToBeCompared = emailsToBeCompared[l];

            // Match found!
            if (emailToBeCompared === email) {
              
              // Merge emails/accounts
              people[i].emails = mergeArrays(people[i].emails, emailsToBeCompared);
              people[i].applications = mergeArrays(people[i].applications, people[k].applications);

              // Compress more
              mergePeople(people.splice(k, 1));
            }
          }
        }
      }
    }
  }

  return people;
}

// Log list to console
console.log(mergePeople(populatePeople(accountData)));
