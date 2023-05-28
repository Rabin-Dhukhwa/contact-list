const apiUrl = "https://randomuser.me/api/?";
console.log(apiUrl);

let userList = [];

// // promise
// const fethUser = () => {
//   fetch(apiUrl) //fetch api promise
//     .then((response) => {
//       //callback function will execute, when initial response is received
//       console.log(response);
//       return response.json();
//     })
//     .then((data) => {
//       console.log(data);
//     })
//     .catch((error) => {
//       //handle the errro
//     });
// };
// fethUser();

//asnyc/await
const fethUser = async (params = "results=10") => {
  try {
    const response = await fetch(apiUrl + params);
    const data = await response.json();
    // console.log(data)
    userList = data.results;

    displayUser(data.results);
  } catch (error) {
    console.log(error);
  }
};

fethUser();
const displayElm = document.getElementById("list");
const count = document.getElementById("count");

const displayUser = (user) => {
  console.log(user);

  let str = ``;
  user.map((item, i) => {
    str += `<div class="card" style="width: 18rem;">
    <img src="${item?.picture?.large}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${item?.name.title} ${item?.name.first} ${item?.name.last}</h5>
      <p class="card-text">
      <div>      <i class="fa-solid fa-envelope"></i> ${item?.email}
      </div>
      <div>      <i class="fa-solid fa-phone"></i> ${item?.phone}
      </div>
      <div>      <i class="fa-solid fa-address-book"> </i> ${item?.location?.street.number} ${item?.location?.street.name} ${item?.location?.city} ${item?.location?.country}
      </div>
      </p>
      <a href="#" class="btn btn-primary">Go somewhere</a>
    </div>
  </div>`;
  });
  displayElm.innerHTML = str;
  count.innerText = user.length;
};

//change gender dynamically

document.getElementById("select").addEventListener("change", (e) => {
  console.log(e);
  const { value } = e.target;

  const path = "results=10&gender=" + value;

  fethUser(path);
  //   console.log(value);

  //   console.log(e.target);
  //   console.log(e.target.value);
});

// capture data from search input

document.getElementById("search-input").addEventListener("keyup", (e) => {
  const { value } = e.target;

  //   console.log(value);

  let filteredUsers = userList.filter((item) => {
    const fullName = (item.name.first + "" + item.name.last).toLowerCase();
    return fullName.includes(value.toLowerCase());
  });
  displayUser(filteredUsers);
});
