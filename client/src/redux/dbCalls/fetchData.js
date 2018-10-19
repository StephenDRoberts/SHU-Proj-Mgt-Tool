export const fetchData=()=>{

    fetch('/api/provideData', {
        method: 'get',
      })
        .then(function (response) {
          if (response.ok) {
            console.log('am I ok?')
            return response.json()
          }
          return Promise.reject("Some Random Error");
        })
        .then(function (myData) {
          console.log('did I get my data???')
          console.log(myData[0])
          return myData[0]
        })  
}