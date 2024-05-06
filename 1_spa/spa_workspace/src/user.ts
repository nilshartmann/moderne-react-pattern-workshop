type User = {
  name: string;
  age?: number;
};

function showUser(u: User) {
  // irgendwas mit user machen
  console.log(`User '${u.name}' is '${u.age}' years old`);
}

declare function loadUser(): any;

const user = loadUser(); //🙀 🙀 🙀 🙀
showUser(user);
