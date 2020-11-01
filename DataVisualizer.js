class DataVisualizer {
  constructor() {
    this.countryData = []
    this.maximumValue = 0
    this.minimumValue = 0
  }

  calculateMaxMin(chosenData) {
    let confirmedCasesArray = []
    this.countryData.forEach((country) => {
      confirmedCasesArray.push(country[chosenData])
    });
    this.maximumValue =  Math.max(...confirmedCasesArray);
    this.minimumValue =  Math.min(...confirmedCasesArray);
  }

  displayData(chosenData) {
    this.countryData.forEach((country) => {
      let div = document.createElement('div')
      let divValue = country[chosenData] / this.maximumValue * 100
      div.setAttribute('style', 'background-color: red; border: black 0.1vw solid; height: 2vw; width: ' + divValue + '%;')
      let list = document.getElementById('country-list')
      let listItem = document.createElement('li')
      listItem.innerHTML += country["Country"] + " - " + chosenData + ": " + country[chosenData]
      list.append(listItem)
      list.append(div)
    })
  }

  getData(chosenData) {
    fetch('https://api.covid19api.com/summary')
    .then(response => response.json())
    .then(data => {
      console.log(data)
      this.countryData = data["Countries"]
      this.calculateMaxMin(chosenData)
      this.displayData(chosenData)
    });
  }
}

initializeDataVisualizer = (chosenData) => {
  myVisualizer = new DataVisualizer();
  let mainContent = document.getElementById('main-content')
  let oldList = document.getElementById('country-list')
  let newList = document.createElement('ul')
  newList.setAttribute('id', 'country-list')
  oldList.remove()
  mainContent.append(newList)
  myVisualizer.getData(chosenData)
}

dateTag = document.getElementsByTagName('h2')[0]
setInterval(() => {
  var dt = new Date();
  dt.getFullYear() + "/" + (dt.getMonth() + 1) + "/" + dt.getDate();
  dateTag.innerHTML = dt
  
}, 1);

document.onload = initializeDataVisualizer()
