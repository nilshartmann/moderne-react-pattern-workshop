# TanStack Query
## Modernes Data Fetching in React
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
<!-- .element: class="todo" -->An Recipify anpassen
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
  // async function gibt IMMER ein Promise zurück
  export async function loadBlogPost(postId) {
    const response = await fetch("http://localhost:7000/posts" + postId);

    if (!response.ok) {
      throw new Error("Could not load blog post: " + response.status);
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
* Ein Query Key besteht aus einem Array von Werten
* Üblicherweise ist es ein Name (z.B. "posts") und dann ggf. weitere Parameter, zum Beispiel die Id eines Posts ("P1")
  oder die Sortierreihenfolge
    * Also alle Daten, die den Query exakt beschreiben
* ```typescript
  import { useQuery } from "react-query";
  import { loadBlogPosts } from "./blog-api";

  function BlogPage({blogPostId}) {

    // Für jeden Aufruf mit einer neuen blogPostId
    //  wird das Ergebnis separat in den Cache gelegt
    const result = useQuery({
      queryKey: ['blogPost', blogPostId], 
      queryFn: () => loadPost(blogPostId)
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
<!-- .element: class="todo" -->an recipify anpassen
* Vorbereitung: Backend starten
    * ```bash
  cd 60_tanstack_query/backend
  npm install # falls noch nicht gemacht
  npm start
  ```
  * Danach sollte unter [http://localhost:7000/posts](http://localhost:7000/posts)
* Wir arbeiten in `60_tanstack_query/workspace`
* Dort ggf. `npm install` und dann `npm start` ausführen (vorherige npm-Prozesse bitte beenden)
* In der Komponente `PostListPage` wird `fetch` bzw. `useEffect` zum Laden der Daten verwendet
* Stelle diese Komponente auf `useQuery` um.
* Zeige eine Warte-Meldung an, während die Daten geladen werden
    * Du kannst den Request künstlich langsam machen, in dem Du an die Url `?slow` hängst
* TanStack Doku:
    * [Queries](https://tanstack.com/query/v5/docs/framework/react/guides/queries)
    * [useQuery](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery)
* Mögliche Lösung: `60_tanstack_query/material/10_useQuery`
* Wenn Du fertig bist, bitte die Hand heben ✋