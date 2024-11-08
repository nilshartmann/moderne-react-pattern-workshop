import { z } from "zod";

// type User = {
//   name: string;
//   age?: number;
// };

const UserSchema = z.object({
  name: z.string(),
  age: z.number().min(18).optional(),
});

type User = z.infer<typeof UserSchema>;

function showUser(u: User) {
  // irgendwas mit user machen
  console.log(`User '${u.name}' is '${u.age}' years old`);
}

declare function loadUser(): unknown;

const user = loadUser(); //🙀 🙀 🙀 🙀

const reallyUser = UserSchema.parse(user);

showUser(reallyUser);
