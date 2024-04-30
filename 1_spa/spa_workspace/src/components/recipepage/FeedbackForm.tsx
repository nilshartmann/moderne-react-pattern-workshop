import { Input, Textarea } from "../Input";
import { Button } from "../Button.tsx";
import ButtonBar from "../ButtonBar.tsx";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { saveFeedback } from "../use-queries.ts";
import { useMutation } from "@tanstack/react-query";
import RatingInput from "./RatingInput.tsx";

type AddFeedbackFormProps = {
  recipeId: string;
};

type FormState = {
  commenter: string;
  stars: number;
  comment: string;
};

export function FeedbackForm({ recipeId }: AddFeedbackFormProps) {
  const [formState, setFormState] = useState<FormState>({
    commenter: "",
    stars: -1,
    comment: "",
  });

  // TODO:
  //  1. Beschreibe eine Mutation mit 'useMutation'
  //    - der mutationKey ist hier nicht so wichtig, überleg' doch mal, ob du einen guten findest
  //    - in der mutationFn kannst Du die fertige Funktion 'saveFeedback' für das eigentliche speichern
  //      des Feedbacks verwenden
  //      - Die 'saveFeedback'-Funktion benötigt als Paramter:
  //         1. die recipeId (aus den Properties dieser Komponente)
  //         2. die Formular-Daten ('formState').
  //    - in der 'onSuccess'-Funktion musst den Cache mit den bereits geladenen Feedbacks invalidieren
  //      - Dazu musst Du dir mit 'useQueryClient' eine Instanz des zentralen QueryClient-Objektes holen
  //      - Darauf kannst Du dann invalidateQuery aufrufen:
  //               onSuccess: () =>
  //                  queryClient.invalidateQueries({
  //                    queryKey: ["recipes", recipeId, "feedbacks"],
  //                  }),
  //
  //
  //
  //  2. Verwende die Mutation in 'handleSave', um die eingegebenen Daten zu speichern

  const mutation = null; // TODO

  const handleSave = async () => {
    // TODO:
    //
    //   - Führe deine Mutation aus, um die Daten aus dem Formular ('formState') zu speichern
    //
    // TODO OPTIONAL:
    //
    //   - Wenn die Mutation erfolgreich war, kannst du den Formular-Inhalt löschen?
  };

  // TODO: (alles OPTIONAL):
  // Experimentiere mit den Status einer Mutation, z.B.:
  //
  // 1. Kannst Du das Formular disablen, während die Mutation läuft?
  //    Du kannst Du Mutation künstlich verzögern, in dem Du 'saveFeedback' als 3. Parameter
  //     einen Delay in Millisekunden übergibst
  //
  // 2. Wenn die Mutation erfolgreich war, kannst Du eine entsprechende Meldung unter dem Formular ausgeben?
  //
  // 3. Wenn es beim Speichern einen Fehler gibt, zeig eine Fehlermeldung an
  //    - Du kannst einen Fehler provozieren, in dem Du bei "Your name" einen Namen eingibst,
  //      der weniger als drei Zeichen lang ist
  //
  // 4. Wenn nach der Ausführung einer Mutation eines der Eingabefelder verändert wird, kannst Du
  //    die Erfolg- oder Fehlermeldung (Schritt 2 bzw. 3) wieder entfernen?

  const formDisabled = false;
  const isSuccess = false;
  const isError = false;

  const handleChange = (e: {
    target: { name: string; value: string | number };
  }) => {
    setFormState((f) => ({
      ...f,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <h2 className={"mb-4 font-space text-3xl font-bold"}>Your opinion?</h2>
      <div
        className={
          "mb-8 rounded-2xl border border-dotted border-gray-300 bg-white p-8 font-inter text-gray-500 hover:border-solid"
        }
      >
        <div className={"mb-4 font-medium"}>Your name:</div>

        <div className={"mb-8"}>
          <Input
            disabled={formDisabled}
            name={"commenter"}
            className={
              "rounded-lg border-gray-300 pb-6 pt-6 hover:outline hover:outline-orange_2 focus:outline focus:outline-orange_2"
            }
            value={formState.commenter}
            onChange={handleChange}
          />
        </div>

        <div className={"mb-4 font-medium"}>Your rating:</div>

        <div className={"mb-8"}>
          <RatingInput
            stars={formState.stars}
            onStarsChange={(setter) =>
              handleChange({
                target: { name: "stars", value: setter(formState.stars) },
              })
            }
            disabled={formDisabled}
          />
        </div>

        <div className={"mb-4 font-medium"}>Your comment:</div>
        <div className={"mb-2"}>
          <Textarea
            rows={4}
            name={"comment"}
            className={
              "rounded-lg border-gray-300 pb-6 pt-3 focus:outline focus:outline-orange_2"
            }
            value={formState.comment}
            onChange={handleChange}
            disabled={formDisabled}
          />
        </div>
        <div className={"mb-4 flex w-full items-center"}>
          <span
            className={twMerge(
              "text-sm",
              formState.comment.length > 500 && "text-red",
            )}
          >
            {formState.comment.length}/500 characters
          </span>
        </div>
        <div>
          <ButtonBar align={"end"}>
            <Button disabled={formDisabled}>
              <button onClick={() => handleSave()} disabled={formDisabled}>
                Submit Rating
              </button>
            </Button>
          </ButtonBar>
        </div>
        {isSuccess && (
          <div>
            <div className={"mt-4 font-medium text-green"}>
              Thanks for your submission!
            </div>
          </div>
        )}
        {isError && (
          <div>
            <div className={"mt-4 font-medium text-red"}>Submission failed</div>
          </div>
        )}
      </div>
    </>
  );
}
