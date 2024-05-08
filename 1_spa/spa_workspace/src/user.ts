import { z } from "zod";

// type User = {
//   firstname: string;
//   age?: number;
// };

const TUser = z.object({
  name: z.string(),
  age: z.number().optional(),
});

type User = z.infer<typeof TUser>;

const zodUser = TUser.parse({});
showUser(zodUser);

function showUser(u: User) {
  // irgendwas mit user machen
  console.log(`User '${u.name}' is '${u.age}' years old`);
}

declare function loadUser(): any;

const user = loadUser(); //🙀 🙀 🙀 🙀
showUser(user);
