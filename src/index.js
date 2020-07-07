let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
let API = 'https://rickandmortyapi.com/api/character/';

let fetchData = (url_api, callback) => {
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function (event) {
    if (xhttp.readyState === 4) {
      if (xhttp.status == 200) {
        callback(null, JSON.parse(xhttp.responseText))
      } else {
        const error = new Error('Error: ' + url_api)
        return callback(error, null)
      }
    }
  };
  xhttp.open('GET', url_api, false);
  xhttp.send();
}

// fetchData(API, (error1, data1) => {
//   if (error1) {
//     return console.error(`Error ${error1}`)
//   };
//   console.log('Primer Llamado...')
//   fetchData(API + data1.results[0].id, (error2, data2) => {
//     if (error2) return console.error(error2);
//     console.log('Segundo Llamado...')
//     fetchData(data2.origin.url, (error3, data3) => {
//       if (error3) return console.error(error3);
//       console.log(`Tercero Llamado...
// Personajes: ${data1.info.count}
// Primer Personaje: ${data2.name}
// Dimensión: ${data3.dimension}`);
//     });
//   })
// })

fetchData(API)
  .then(data => {
    console.log('Primer Llamado...')
    console.log(data.info.count);
    return fetchData(`${API}${data.results[0].id}`)
  })
  .then(data => {
    console.log('Segundo Llamado...');
    fetchData(API + data.origin.url)
  })
  .then(data => {
    console.log(`Tercero Llamado...
Personajes: ${data.info.count}
Primer Personaje: ${data.name}
Dimensión: ${data.dimension}`);
  }
  )
