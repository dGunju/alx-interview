#!/usr/bin/node

const request = require('request');
const API_URL = 'https://swapi-api.hbtn.io/api';

if (process.argv.length > 2) {
  request(`${API_URL}/films/${process.argv[2]}/`, (error, _, body) => {
    if (error) {
      console.log(error);
    }
    const charactersURLs = JSON.parse(body).characters;
    const charactersNames = charactersURLs.map(
      url => new Promise((resolve, reject) => {
        request(url, (promiseError, __, charactersReqBody) => {
          if (promiseError) {
            reject(promiseError);
          }
          resolve(JSON.parse(charactersReqBody).name);
        });
      }));

    Promise.all(charactersNames)
      .then(names => console.log(names.join('\n')))
      .catch(allErrors => console.log(allErrors));
  });
}
