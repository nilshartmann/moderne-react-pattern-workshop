"use server";

import { revalidateTag } from "next/cache";
import { saveLike } from "@/app/components/queries.ts";

export async function increaseLikes(recipeId: string) {
  // TODO:
  //
  // Implementiere die increaseLikes Server-Action-Funktion
  //   - Die Funktion muss eine Server-Funktion sein!
  //   - Die Funktion muss asynchron sein!
  //   - Zum Hochzählen und Speichern der Likes im "API-Backend" kannst Du die fertige Funktion 'saveLike' aufrufen
  //      - Diese macht einen HTTP Request zu unserem "API-Backend" und das speichert dann zählt dann die Likes hoch
  //   		- 'saveLike' liefert ein Promise mit einem Objekt zurück, das so aussieht:
  //         { newLikes: 213 }
  //   - Dieses Objekt kannst Du als Rückgabe-Wert für deine increaseLikes Server-Action-Funktion verwenden
  const result = saveLike(recipeId);

  //  Bitte die folgenden Zeilen unverändert am Ende der Funktion stehen lassen
  //   - damit wird der Next.js-Cache geleert
  revalidateTag("recipes");
  revalidateTag(`recipes/${recipeId}`);

  return result;
}
