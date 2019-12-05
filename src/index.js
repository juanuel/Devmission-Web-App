import "./styles.css";
import $ from "jquery";

function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

var getAllRecords = function() {
  $.getJSON(
    "https://api.airtable.com/v0/appMjSG613drSLOIo/Table%201?api_key=keygPQfCBdeVadTmY",
    function(airtable) {
      var html = [];
      $.each(airtable.records, function(index, record) {
        var id = record.id;
        var picture = record.fields["picture"];
        var category = record.fields["Category"];
        var restaurantName = record.fields["Restaurant Name"];
        var location = record.fields["Location"];
        html.push(listView(id, picture, category, restaurantName, location));
      });
      $(".list-view").append(html);
    }
  );
};

var getOneRecord = function(id) {
  $.getJSON(
    `https://api.airtable.com/v0/appMjSG613drSLOIo/Table%201/${id}?api_key=keygPQfCBdeVadTmY`,
    function(record) {
      var html = [];
      var picture = record.fields["picture"];
      var category = record.fields["Category"];
      var restaurantName = record.fields["Restaurant Name"];
      var location = record.fields["Location"];
      var address = record.fields["Address"];
      var price = record.fields["Price"];
      var reservation = record.fields["Reservation"];
      var url = record.fields["URL"];
      var recs = record.fields["Recs"];
      var flag = record.fields["Flag"];
      html.push(
        detailView(
          picture,
          category,
          restaurantName,
          location,
          address,
          price,
          reservation,
          url,
          recs,
          flag
        )
      );
      $(".detail-view").append(html);
    }
  );
};

var listView = function(id, picture, category, restaurantName, location) {
  return `
  <div class="card border-dark" style="width: 18rem;">
    ${picture ? `<img src="${picture[0].url}">` : ``}
    <div class="card-body">
     <h3 class="card-text">${restaurantName}</h3>
      <h1 class="card-title">
        <a href="index.html?id=${id}">${category}</h1></a>
        <p class="card-text">${location}</p>
    </div>
  </div>`;
};

var detailView = function(
  picture,
  category,
  restaurantName,
  location,
  address,
  price,
  reservation,
  url,
  recs,
  flag
) {
  return `
  
<div class=info> 
<div class="card mb-3" style="max-width: 1040px;">
  <div class="row no-gutters">
    <div class="col-md-4">
    ${picture ? `<img src="${picture[0].url}">` : ``}
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h1 class="card-title"><strong>${restaurantName} <strong></h1>
        <h2 class="card-text" style="font-size:80px">${flag}</h2>
        <h2 class="card-text">${price}</h2>
        <h5 class="card-text">Location(s): ${location}</h5>
        <h5 class="card-text> Address ${address}</h5>
        <p class="card-text"><small class="text-muted">${reservation}</small></p>
        <a href="url">${url}</a>
        <p class> Food Recommendations: ${recs}</p>
      </div>
  </div>
</div>
</div>
</div>

<button onclick="goBack()">Go Back</button>

<script>
function goBack() {
  window.history.back();
}
</script>

  `;
};

var id = getParameterByName("id");
if (id) {
  getOneRecord(id);
} else {
  getAllRecords();
}
