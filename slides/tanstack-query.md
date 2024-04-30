<!-- .slide: id="t-tanstack-query" -->
# TanStack Query
## Modernes Data Fetching mit 
---
## Modernes Data Fetching in React
* Mit `useEffect`, `fetch` und `axios` stehen dir "Low-Level-APIs" zur Verfügung, um mit serverseitigen Daten zu arbeiten
* Diese APIs sind React (`useEffect`) bzw. Browser (`fetch`) Standard APIs
* Es gibt aber spezialisierte Bibliotheken, die das Arbeiten mit Daten erleichtern können.
    * [TanStack Query](https://tanstack.com/query/latest) / und [Vercel SWR](https://swr.vercel.app/): Zwei Bibliotheken zum Laden/Speichern von Daten inklusive Cache-Funktion
    * [Redux Toolkit Query](https://redux-toolkit.js.org/rtk-query/overview): Arbeiten mit APIs in Redux-Anwendungen
    * [Apollo GraphQL Client](https://www.apollographql.com/docs/react/): Client für GraphQL APIs mit Cache und Statemanagement Möglichkeiten
* Diese Bibliotheken haben alle ähnliche Konzepte:
    * Hooks zum Laden/Speichern von Daten
    * globales Caching von Daten (auch zur Sicherstellung der konsistenten Darstellung)
        * Strategien zur Aktualisierung von Daten (auch automatisch im Hintergrund)
---
## TanStack Query
### Schritt-für-Schritt: Laden von Daten mit "TanStack Query"

* 👉 `PostListPage`
* 👉 später: `PostEditorPage`
* 👉 später: Custom Hooks
* 👉 später: zod
* 👉 Arbeiten in `advanced/workspace`


---
### Der QueryClient

* Zentrales Konfigurationsobject: `QueryClient`
* React-unabhängig
* Wird beim Starten der Anwendung initialisiert
* Oft reichen Default-Einstellung
* Es können aber z.B. globale Refetch-Policies eingestellt werden
* Das Objekt wird per QueryClientProvider in die Anwendung gereicht
* ```typescript
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false
      }
    }
  });

  root.render(
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
  ```

---
### Laden von Daten: useQuery

* [Queries](https://tanstack.com/query/latest/docs/react/guides/queries) werden mit dem `useQuery`-Hook ausgeführt
* [Der `useQuery`-Hook](https://tanstack.com/query/latest/docs/framework/react/reference/useQuery) erwartet ein Konfigurationsobjekt
    * `queryKey`: Array mit Query Keys (zur Interaktion mit dem Cache)
    * `queryFn`: Funktion zum Laden der Daten
    * Weitere Konfigurationen (optional)
* ```typescript
  import { useQuery } from "react-query";
  import { loadBlogPosts } from "./blog-api";
  function BlogListPage() {

    const result = useQuery({queryKey: ['posts'], queryFn: loadBlogPosts});

    // ...
  }
  ```
---
### Query Function

* `useQuery` erwartet eine [Query-Function](https://tanstack.com/query/latest/docs/react/guides/query-functions), die den eigentlichen Request ausführt
* Die Signatur ist fast beliebig, die Funktion muss aber ein Promise zurückliefern:
* Wenn die Daten erfolgreich geladen wurden, muss das Promise mit den Daten "aufgelöst" werden
* Wenn es einen Fehler gab, muss die Funktion einen Fehler werfen
* ```typescript
  export async function loadRecipe(recipeId) {
    const response = await fetch("http://localhost:8080/api/recipes/" + recipeId);

    if (!response.ok) {
      throw new Error("Could not load recipe post: " + response.status);
    }

    return response.json();
  }
  ```

---

### Rückagebwert von `useQuery` (Query Ergebnis)

* `useQuery` liefert ein Objekt zurück:
    * `isLoading`: Der Query lädt noch (und es sind keine Daten im Cache)
    * `isSuccess`: Daten sind geladen
    * `isError`: Es ist ein Fehler aufgetreten
    * `data` enthält die geladenen Daten
    * `error`: Fehlerobjekt aus der Query-Funktion
* Weitere [siehe Doku](https://tanstack.com/query/latest/docs/react/reference/useQuery)

---
### Query Keys

* Mit den [Query Keys](https://tanstack.com/query/latest/docs/react/guides/query-keys) wird ein Ergebnis im Cache gespeichert
* Ein Query Key besteht aus einem **Array von Werten**
* Üblicherweise ist es ein Name (z.B. "recipes") und dann ggf. weitere Parameter, zum Beispiel die Id eines Rezeptes ("R1")
  oder die Sortierreihenfolge
    * Also alle Daten, die den Query exakt beschreiben
* ```typescript
  import { useQuery } from "react-query";
  import { fetchRecipe } from "./recipe-api";

  function ReipcePage({recipeId}) {

    // Für jeden Aufruf mit einer neuen recipeId
    //  wird das Ergebnis separat in den Cache gelegt
    const result = useQuery({
      queryKey: ['recipes', recipeId], 
      queryFn: () => fetchRecipe(recipeId)
    });

    // ...
  }
  ```
* Wenn ein Query mit denselben Query Keys in mehr als einer Komponente ausgeführt wird
* stellt TanStack Query sicher, dass der Query nur einmal ausgeführt wird
* wenn sich das Ergebnis ändert, werden alle Komponenten, die den Query verwenden,
  automatisch aus dem Cache aktualisiert
* 👉 dieses Verhalten sehen wir uns später noch an

---
## Übung: Daten lesen mit TanStack Query

- In der Route `/routes/recipes/$recipeId/index.tsx` befindet sich (d)eine Hello-World-Komponente
- Füge in dieser Komponente einen TanStack Query mit `useQuery` ein, der die Daten eines Rezeptes liest
- In der Datei `/spa_material/30/query_use_query` findest eine Vorlage und weitere TODOs
- In `/spa_schritte/30/query_use_query` findest Du eine mögliche Lösung

[//]: # (---)

[//]: # (## Übung: Daten lesen mit TanStack Query)

[//]: # (* In der Komponente `PostListPage` wird `fetch` bzw. `useEffect` zum Laden der Daten verwendet)

[//]: # (* Stelle diese Komponente auf `useQuery` um.)

[//]: # (* Zeige eine Warte-Meldung an, während die Daten geladen werden)

[//]: # (    * Du kannst den Request künstlich langsam machen, in dem Du an die Url `?slow` hängst)

[//]: # (* TanStack Doku:)

[//]: # (    * [Queries]&#40;https://tanstack.com/query/v5/docs/framework/react/guides/queries&#41;)

[//]: # (    * [useQuery]&#40;https://tanstack.com/query/v5/docs/framework/react/reference/useQuery&#41;)

[//]: # (* Mögliche Lösung: `60_tanstack_query/material/10_useQuery`)

[//]: # (* Wenn Du fertig bist, bitte die Hand heben ✋)

---
## Validieren von Daten

---
### Validieren von Daten
* <!-- .element: class="demo" --> Außerhalb des Projektes, in einer TypeScript-Datei:
* <!-- .element: class="demo" --> fetch-Ergebnis ist any in TypeScript
* <!-- .element: class="demo" --> zod
---
### Validieren von Daten
<!-- .slide: class="left" -->
- Das Ergebnis eines `fetch`-Calls ist aus TypeScript-Sicht ein Promise von `any`
- Wir können das Ergebnis also verwenden, ohne weitere Typ-Angaben zu verwenden:
* ```typescript
  async function fetchRecipe(recipeId: string) {
    const response = await fetch("...");
    const data = await response.json();
    //      ^-- data ist 'any'
    return data;
  }
  ``` 
- Wir haben bereits im Router-Teil gesehen, wie wir mit zod Daten validieren können
- Das können wir auch hier einsetzen:
* ```typescript
  
  const Recipe = z.object({
    id: z.string(), title: z.string(), likes: z.number().min(1)
  });
  
  async function fetchRecipe(recipeId: string) {
    const response = await fetch("...");
    const data = await response.json();
    //      ^-- data ist 'any'
    const recipe = Recipe.parse(data);
  //        ^-- recipe is Recipe 
    return data;
  }
  ```
* Wenn `parse` das Objekt *nicht* erfolgreich validieren kann, wird ein Fehler geworfen
* Das führt in TanStack Query automatisch dazu, dass der Fehlerfall aktiviert wird (`isError === true`)
---
---
### TanStack Query: Mutations

* [Mutations](https://tanstack.com/query/latest/docs/framework/react/guides/mutations) werden verwendet, um Daten zu *verändern* (speichern, löschen)
* Der entsprechende Hook heißt [`useMutation`](https://tanstack.com/query/latest/docs/framework/react/reference/useMutation)
* Dessen API ist vergleichbar mit `useQuery`
* Auch der `useMutation`-Hook liefert Informationen über den Zustand der Mutation zurück
* ```typescript
  import { useMutation } from "react-query";
  import { saveFeedback } from "./use-queries";

  function FeedbackForm() {
    const mutation = useMutation({
      mutationFn: saveFeedback,
      onSuccess() {
        // optional: wird aufgerufen, wenn die Mutation erfolgreich war
        // ...
      }
    });

    if (mutation.status === "error") {
      return <h1>Error!</h1>;
    }

    if (mutation.status === "loading") {
      return <h1>Saving, please wait!</h1>;
    }

    // ...
  }
  ```
---
### TanStack Query: Mutations
* Im Gegensatz zu `useQuery` wird eine Mutation aber nicht automatisch ausgeführt, sondern wird explizit gestartet
* Dazu liefert `useMutation` die Funktion `mutate` zurück
* Übergeben wird der Funktion die zu schreibenden Daten
* ```typescript
  const mutation = useMutation(/* ... */ );

  function handleFeedbackSave(newFeedback: FeedbackData) {
    mutation.mutate(newFeedback);
  }
  ```
---
### Parameter für die Mutations
* Üblicherweise benötigt eine Mutation Daten, die erst bei der Ausführung `mutate` feststehen
* Dazu kann der `mutate`-Funktion genau **ein** Parameter übergeben werden
* Wie dieser aussieht bestimmt ihr in der Definition der Mutation selbst
* Dieser Parameter entspricht nämlich dem ersten Parameter der `mutationFn`:
  * ```typescript
    const saveFeedbackMutation = useMutation({
      mutationFn(newFeedback: FeedbackData) { /* ... */ }
    })
    ```
* Wenn ihr mehr als einen "logischen" Parameter benötigt, müsst ihr ein Objekt verwenden:
* ```typescript
  
  type AddFeedbackParam = {
    newFeedback: FeedbackData,
    credentials: string
  }

  const saveFeedbackMutation = useMutation({
    mutationFn(params: AddFeedbackParam) {
      const url = `/api/recipes/${recipeId}/feedback;
      fetch(url, { 
        body: JSON.stringify({params.newFeedback}),
        headers: { Authorization: params.credentials }
      });
    }
  });
  ```

---
### Arbeiten mit dem Ergebnis

* Wenn eine Mutation ausgeführt wurde, bekommt ihr `data` bzw. `error` zurück
* Damit könnt ihr - wie bei `useQuery` - nach der Ausführung einer Mutation die UI aktualisieren, um zum Beispiel Fehlermeldungen anzuzeigen
* ```tsx
  function FeedbackForm() {
    const saveFeedbackMutation = useMutation(/*...*/);

    return <form>
      { /* ... */}

      {saveFeedbackMutation.isError && <p>Fehler beim Speichern des Feedbacks: {String(saveMutation.error)}</p>}
      {saveFeedbackMutation.isSuccess && <p>Das Feedback wurde erfolgreich gespeichert!</p>}
    </form>
  }
  ```
---
### Auf das Ergebnis warten
* Um direkt nach Beendingung einer Mutation weitere Aktionen auszuführen, kann man `on`-Callback-Funktionen bzw. [`mutateAsync`](https://tanstack.com/query/latest/docs/framework/react/guides/mutations#promises) verwenden
* `onSuccess` und `onFailure` könnt ihr bei `useMutation` angeben. Das ist sinnvoll für Aktionen, die immer ausgeführt werden sollen
  * Sehen wir später noch im Zusammenhang mit Caching.
* Mit `mutateAsync` könnt ihr _in einer Komponente_ auf das Ergebnis der Mutation warten. Das ist sinnvoll, wenn man Komponenten-spezfische Aktionen ausführen möchte.
* `mutateAsync` liefert ein Promise mit den Daten der Mutation zurück.
* Schlägt die Mutation fehl, wird das Promise nicht verworfen (rejected)
* Beispiel:
* ```typescript
  function PostEditor() {
    const navigate = useNavigate(); // vom React oder TanStack Router

    const saveFeedbackMutation = useMutation({ /* ... */ });

    async function handleSaveFeedback(newFeedback: FeedbackData) {
      const result = await saveFeedbackMutation.mutate(newFeedback);
      // result ist hier das Ergebnis der (erfolgreichen) Mutation

      navigate({to: "/"}); // nach erfolgreicher Mutation zurück auf die Landingpage
    }

    // ...

  }
  ```


---
### Zurücksetzen einer Mutation

* Wenn eine Mutation ausgeführt wurde, ist `status`, `data`, `error` usw. gesetzt
* Mit `reset` kann man diese Informationen zurücksetzen
* Das kann zum Beispiel nach einem Fehler sinnvoll sein, um die Fehlermeldung wieder verschwinden zu lassen
  * Zum Beispiel nach einer Benutzer-Interaktion
* Dann ist die Mutation "wie neu"
* ```tsx
  function FeedbackForm() {
    const saveFeedbackMutation = useMutation(/* ... */);

    return <form>
      { /* ... */ }

      <input onChange={e => {
        saveFeedbackMutation.reset();
        // ...
      }} />

      { /* ... */ }
    </form>
  }
  ```
