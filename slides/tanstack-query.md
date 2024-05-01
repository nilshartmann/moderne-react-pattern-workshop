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

* 👉 `$recipeId`-Route


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

    const result = useQuery({
  
      // Für jeden Aufruf mit einer neuen recipeId
      //  wird das Ergebnis separat in den Cache gelegt
      queryKey: ['recipes', recipeId],
   
      queryFn: () => fetchRecipe(recipeId)
    });

    // ...
  }
  ```
---
### TanStack Query für globalen State
* Wenn ein Query mit demselben Query Key in mehr als einer Komponente ausgeführt wird:
  * stellt TanStack Query sicher, dass der Query nur einmal ausgeführt wird
  * wenn sich das Ergebnis ändert, werden alle Komponenten, die den Query verwenden,
    automatisch aus dem Cache aktualisiert
* Ihr könnt also gefahrlos denselben Query (= selber Query Key) in diversen Komponenten verwenden
* Dadurch ist TS Query eine Art globale Statemanagement Library für serverseitige Daten
* ```tsx
  function useUser() {
    return useQuery(
      { queryKey: [ "current-user" ], 
      queryFn: () => {/*...*/ }
     });
  }
  ```
* ```tsx
  
  function UserProfile() {
    const user = useUser();
  
    // ...
  }
  ```
* ```tsx
  
  function UserAvatar() {
    const user = useUser();
  
    // ...
  }
  ```
---
## Übung: Daten lesen mit TanStack Query

- In der Route `/routes/recipes/$recipeId/index.tsx` befindet sich (d)eine Hello-World-Komponente
- Füge in dieser Komponente einen TanStack Query mit `useQuery` ein, der die Daten eines Rezeptes liest
- In der Datei `/spa_material/30/query_use_query` findest eine Vorlage und weitere TODOs
- In `/spa_schritte/30/query_use_query` findest Du eine mögliche Lösung

---
## Validieren von Daten

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
### Generieren von TypeScript Typen
* In der Beispiel-Anwendung werden die Typen für die API-Zugriffe aus einer OpenAPI-Beschreibung generiert:
  * Das Backend erzeugt beim Starten eine aktuelle OpenAPI-Beschreibung aus dem Backend-Code (hier: Java)
  * Mit dem Projekt [typed-openapi](https://github.com/astahmer/typed-openapi) werden aus der OpenAPI-Beschreibung Zod-Typen erzeugt
* Der Zugriff auf die API ist damit "Ende-zu-Ende-typsicher"
* Beispiele:
  * siehe `use-queries.ts` und `getEndpointConfig` (`fetch-from-api.ts`)
---
## Suspense
<!-- .slide: id="t-suspense" -->

* Suspense ist ein relativ neuer Mechanismus in React, um das Arbeiten mit asynchronem Code (insb. Data Fetching) zu vereinfachen
  * Für Lazy-Loading und Code-Splitting gibt's das schon länger
* Suspense unterbricht das Rendern, wenn eine Komponente wegen noch fehlender Daten nicht gerendert werden kann
  * Daten können "normale" Daten sein, die z.B. mit TanStack Query geladen werden
  * ...oder Source-Code, der mit Lazy Loading erst bei Bedarf nachgeladen wird

---
### Suspense für Daten ("Suspense for Data Fetching")
* Um Suspense mit fetch o.ä. zu verwenden, muss die eingesetzte Bibliothek Suspense unterstützen
  * Das können wir in unserem eigenen Code nicht machen
  * TanStack Query, React Router und der Apollo GraphQL Client unterstützen Suspense in ihren neusten Versionen
---
### Suspense mit TanStack Query

* Die Verwendung mit TanStack Query ist denkbar einfach: ihr verwendet den `useSuspenseQuery`-Hook statt des `useQuery`-Hooks
* Die Parameter sind dieselben
* Aber: der Query liefert erst ein Ergebnis, wenn die Daten geladen worden sind (oder im Cache vorhanden sind)
  * Für die Dauer der Ladezeit muss `Suspense` verwendet werden, um eine Platzhalter-Komponente zu rendern
  * Für den Fall eines Fehlers muss eine [Error-Boundary-Komponente](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary) gesetzt werden
    * Das ist eine Art try-catch-Mechanismus, mit dem eine React-Anwendung auf Fehler _während des Renderns_ reagieren kann

* ```tsx
  // /routes/recipes/$recipeId/index.tsx
  function RecipePage() {
	const { recipeId } = useParams();
    // hier wird das Rendern von React unterbrochen, bis die Daten da sind:
    const data = useSuspenseQuery({queryFn: fetchRecipe(/*...*/), queryKey: ["recipes", recipeId] });
    // wenn die Anwendung hierher kommt, sind die Daten in jedem Fall vorhanden
    return ...;
  }

    // /routes/recipes/$recipeId/route.tsx
  function RecipeRoute() {
    return (
      <ErrorBoundary fallback={<h1>Loading failed!</h1>}>      
        <Suspense fallback={<h1>Post loading...</h1>}>
          <Post postId="P10" />
        </Suspense>
      </ErrorBoundary>
    )
  }
  ```
---
### Error Boundary
- Eine Error Boundary-Komponente kann man grundsätzlich selbst bauen
- Fehler, die beim Rendern unterhalb einer Error-Boundary-Komponente auftreten, werden als eine Art Propertie in die nächsthöhere Error-Boundary-Komponente gegeben
  - ähnlich wie try/catch
- Die Komponente kann dann eine Fehlermeldung o.ä. rendern
- Ihr könnt damit sehr feingranular steuern, wo Fehler angezeigt werden sollen (wenn _eine_ Abfrage nicht funktioniert, können die anderen weiterlaufen - oder nicht)
- Es gibt eine fertige, generische Error-Boundary-Komponente: [react-error-boundary](https://www.npmjs.com/package/react-error-boundary)
- Auch TanStack Query hat eine Error-Boundary-Komponente, [QueryErrorResetBoundary](https://tanstack.com/query/latest/docs/framework/react/reference/QueryErrorResetBoundary)
  - Mit dieser gibt es die Möglichkeit, einen fehlerhaften Query wiederholen zu lassen (auch durch User-Interaktion, z.B. Button click)

---
### Priorisierung
* Mit Suspense könnt ihr einzelne Teile der UI priorisieren
* Ihr könnt z.B. steuern, welche Teile schon dargestellt werden sollen, auch wenn noch andere Daten fehlen
* ...oder das auf _alle_ Daten gewartet werden soll
* Was jeweils "richtig" ist, hängt von den fachlichen Anforderungen ab
---
### Priorisierung
* In der `RecipePage` werden Daten aus zwei Requests benötigt: die Rezept-Daten und die Bewertungen (Feedback) für das Rezept
* Beide Requests können zeitgleich (oder nacheinander) gestartet werden
* Durch das Festlegen der Suspense-Komponente könnt ihr ausdrücken, welche Teile wichtig sind (sofort rendern, sobald Daten da sind), oder "unwichtig"
<!-- .element: class="demo" -->FeedbackLoader
---
### Wasserfälle...

* Was passiert hier:
* ```typescript
  function RecipePage() {
    const reipceData = useSuspenseQuery( /* Recipe Daten laden */ );
    const feedbackData = useSuspenseQuery( /* Feedback Daten laden */) ;

    // ...
  }
  ```
* React rendert Komponente bis zum ersten `useSuspenseQuery`
* Wenn die Daten da sind, wird die Komponente nochmal gerendert
* Diesmal bis zum zweiten `useSuspenseQuery`
* Die Daten werden also *nacheinander* nicht *parallel* geladen. 😢
---
### Priorisierung mit TanStack Query
* Um die Daten parallel zu laden, könnt ihr TanStack Query anweisen, Daten in den Cache zu laden, *ohne* darauf zu warten
* Dazu verwendet ihr `QueryClient.ensureData`, das die selben Parameter wie `useSuspenseQuery` bzw. `useQuery` entgegennimmt
* TanStack Query startet dann den Request im Hintergrund (und legt die Daten in den Cache, sobald sie vorliegen)
* Um also *nicht* auf die User-Daten zu warten könnt ihr folgendes tun:
* ```tsx
  function RecipePage({recipeId}) {
    const queryClient = useQueryClient();
  
    queryClient.ensureData({queryFn: /* ... */, queryKey: ["recipes", recipeId, "feedbacks"]});
   
    const recipeData = useSuspenseQuery(/* Post */);

    return <RecipePageContent recipe={recipeData.recipe} />;
  }
  ```
* Hier werden beide Requests gestartet und React wartet dann auf das Ergebnis des Post-Queries
* In einer weiteren Komponente könntet ihr dann auf die User-Daten warten, die im besten Fall dann sogar schon im Cache sind:
* ```typescript
  function FeedbackList({recipeId}) {
    // Query-Key muss mit dem Query-Key von oben übereinstimmen!
    const feedbackData = useSuspenseQuery({queryFn: /* ... */, queryKey: ["recipes", recipeId, "feedbacks"]}); 

    // User-Daten rendern

    return ...;
  }
  ```
---
### Neu in React 19: use-Hook
- Der Suspense-Mechanismus inkl. Error-Boundaries wird ab React 19 mit "normalen" Promises funktionieren
- Dazu könnt ihr auf ein Promise mit `use` "warten" (statt mit `await`)
- React rendert dann solange das nächstgelegene Suspense Fallback-Element
- Das funktioniert vernünftig nur mit Unterstützung von Bibliotheken, die euch ein (gecachtes) Promise geben
- Später soll es einen Cache für Promises (?) in React geben
- ```tsx
    function FeedbackList({feedbackQueryPromise}) {
  
      const feedback = use(feedbackQueryPromise);
  
      // erst wenn feedbackQueryPromise aufgelöst ist, geht's hier weiter
      //   bis dahin wird die nächsthöhere Fallback-Komponente angzeigt
      // wird das Promise rejected, 
      //   greift das nächsthöhere ErrorBoundary
  
    }
  ```
---
## Übung: Suspense

* Die Rezept-Detailseite soll das Rezept nun mit Suspense laden und außerdem die Bewertungen darstellen
* In der Route `/recipes/$recipeId/page.tsx` hast Du bereits den Query mit `useQuery` gebaut
  * Stelle diesen Query auf `useSuspenseQuery` um
  * Die Logik zum prüfen, ob der Query erfolgreich war oder noch lädt, kannst Du nun entfernen.
  * Falls dein Query nicht funktioniert hat, kopiere dir den fertigen `useQuery`-Code aus `spa_schritte/30_query_use_query`
* Wenn Du den Query umgestellt hast, musst Du eine Suspense-Komponente einziehen
  * Das muss in einer Komponente sein, die oberhalb von `RecipePage` (bzw. `/recipes/$recipeId/page.tsx`) liegt
    * Du kannst eine `route.tsx` dafür verwenden oder eine "Wrapper-Komponente" um `RecipePage` bauen.
* Kommentiere in  `RecipePageContent` den `FeedbackListLoader` ein und setze die `Suspense`-Grenze
*   (siehe TODOs dort)
* Lösung: `spa_schritte/40_query_suspense`

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
---
### Caching

* Alle gelesenen Daten werden in einem globalen Cache gehalten
* 👉 Dev Tools!
* Es gibt verschiedene Strategien, wie die Daten im Cache aktualisiert werden

---
### (Automatisches) Aktualisieren von Daten

* Alle Query-Ergebnisse von `useQuery` werden automatisch gecached
* Alle Komponenten werden aktualisiert, wenn sich der Cache aktualisiert
* Alle Daten im Cache werden als "stale" (veraltet) angesehen
* [Per Default](https://tanstack.com/query/latest/docs/react/guides/important-defaults) werden Queries deswegen automatisch neu ausgeführt:
* Komponente wird (neu) gemounted
* Browser-Fenster bekommt den Focus
* Nachdem das Netzwerk offline war

---

### Manuelles Aktualisieren von Queries

* Queries können per API manuell erneut ausgeführt werden
* Das kann zum Beispiel nach einer Mutation sinnvoll sein, um die geänderten/gespeicherten Daten
  im Cache zu aktualisieren
* Dazu wird die Funktion [`invalidateQueries`](https://tanstack.com/query/latest/docs/react/reference/QueryClient#queryclientinvalidatequeries) vom `QueryClient` verwendet
* Übergeben werden die Query Keys, deren Queries erneut ausgeführt werden sollen
* ```tsx
  import { useMutation, useQueryClient } from "react-query";
  import { saveFeedback } from "./use-query";

  function FeedbackForm({recipeId}) {
    const queryClient = useQueryClient();
    const mutation = useMutation({
      mutationFn: saveFeedback, 
      onSuccess() {
        // Feedback-Query erneut ausführen, wenn Mutation erfolgreich war
        queryClient.invalidateQueries({queryKey: ["recipes", recipeId, "feedbacks"]});
      }
    });

    // ...
  }
  ```

---

### Refetch

* Das von `useQuery` zurückgeliefert Objekt enthält auch eine `refetch`-Funktion um einen Query
  manuell neu auszuführen
* ```tsx
  function RecipeList() {
    const result = useQuery({queryKey: ['recipe-list', orderBy], queryFn: fetchRecipes}, {
      // nicht automatisch aktualisieren
      refetchOnMount: false, refetchOnWindowFocus: false
    })

    // ... result.status === loading, status === error ... 

    return <div>
      <button onClick={result.refetch}>Reload Recipes</button>
      <PostList posts={result.data} />
    </div>
  }
  ```
---
## Übung: Feedback für ein Rezept speichern

* Auf der Rezept-Detailseite gibt es ein Formular für eine Bewertung
* Das Formular ist fertig, aber **die Logik zum Speichern** fehlt
* Vervollständige dazu bitte `FeedbackForm.tsx` mit einer Mutation, die den Formular-Inhalt auf dem Server speichern kann
* Du findest Hinweise und Todos direkt in der Datei.
* ⚠️ Wenn mehrere von euch die Cloud-Version als Backend verwenden, nicht wundern, wenn ihr Kommentare seht, die ihr nicht geschrieben habt 😉
  * Entsprechend nur anständiges Zeugs zum testen posten 👮‍
* Eine mögliche Lösung findest Du in `spa_schritte/50_query_use_mutation`

