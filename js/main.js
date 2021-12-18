const navProfile = document.querySelector("#profile");

const list = document.querySelector("#list");

const globalData = [];
/*
 * Fetching data from server
 */
async function getData(url) {
  list.innerHTML = '<div class="mt-2" colspan="4">Loading...</div>';
  res = await fetch(url);
  json = await res.json();
  return json.storesAllDishes
}

/*
 * Rendering data to UI
 */
function renderData() {
  list.innerHTML = "";

  if (globalData.length > 0) {
    const list_html = globalData.map((data, i) => {
      return `
        <div class="col s12 m4">
            <div class="card">
                <div class="card-image waves-effect waves-block waves-light">
                    <img class="activator" src="${data.imageUrl}">
                </div>
                <div class="card-content">
                    <span class="card-title activator grey-text text-darken-4">${data.dishName}</span>
                    <p>₹ ${data.price}</p>
                </div>
                <div class="card-reveal">
                    <span class="card-title grey-text text-darken-4">${data.dishName}<i class="material-icons right">close</i></span>
                    <p>₹ ${data.description}</p>
                </div>
            </div>
        </div>`;
    });
    list.innerHTML = list_html.join("");
  } else {
    list.innerHTML = '<div class="mt-2" colspan="4">No data</div>';
  }
}

getData("https://cwc-api.herokuapp.com/api/store/dishes").then((d) => {
  d.forEach((element) => {
    globalData.push({
      id: element._id,
      dishName: element.dishName,
      description: element.description,
      imageUrl: element.imageUrl,
      price: element.price,
    });
  });
  renderData();
  console.log(globalData
    )
});
