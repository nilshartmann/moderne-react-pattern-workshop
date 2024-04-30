# TanStack Router
<!-- .slide: id="t-tanstack-router" -->
---
## TanStack Router

- https://tanstack.com/router/latest/docs/framework/react/overview
- Typsicherer React Router
- File-basierte Routen
- Code-Generator für Routen-Konfiguration
---
## Routen

* Es gibt verschiedene Routen-Typen
  * zum Beispiel `RootRoute` oder `FileRoute`
* Route-Objekte werden mit Factory-Funktionen erzeugt
  * zum Beispiel `createRootRoute`, [`createFileRoute`](https://tanstack.com/router/latest/docs/framework/react/api/router/createFileRouteFunction#createfileroute-options)
* Ein Route-Objekt umfasst u.a. folgende Informationen:
  * Den Pfad der Route (`/recipes`)
  * Die Komponente die gerendert werden soll, wenn die Route aktiv ist
  * Funktionen zum Laden von Daten
  * Konfiguration der Search Parameter
---
### Router Konfiguration

- Beim Starten der Anwendung wird ein zentrales [Router-Objekt erzeugt](https://tanstack.com/router/latest/docs/framework/react/api/router/createRouterFunction)
- Dieses Router-Objekt kennt die **Routen** der Anwendung
- Der Codegenerator genertiert das Router-Objekt automatisch anhand der Route-Objekte, die ein Routen-Modul exportiert

---
### Routen Konfiguration

- Zwei Möglichkeiten 
  1. Manuell per [Code](https://tanstack.com/router/latest/docs/framework/react/guide/code-based-routing)
  2. Automatisch per [Filesystem Konventionen](https://tanstack.com/router/latest/docs/framework/react/guide/file-based-routing)
- Empfohlen wird die zweite Variante
---
### Filesystem-basierte Konfiguration


- Die Konfiguration wird mittels [Vite Plug-in](https://tanstack.com/router/latest/docs/framework/react/guide/file-based-routing#vite-plugin) oder [CLI](https://tanstack.com/router/latest/docs/framework/react/guide/file-based-routing#router-cli) automatisch generiert
- Dabei gibt es [Konventionen](https://tanstack.com/router/latest/docs/framework/react/guide/file-based-routing#file-naming-conventions), wie Dateien benannt werden müssen
  - und wie die [Routen verschachtelt](https://tanstack.com/router/latest/docs/framework/react/guide/route-trees#route-trees) werden müssen, um Hierarchien zu bilden
  - (hier gibt es mehrere Varianten, die Beispiel-Anwendung verwendet die ["Directory Routes"](https://tanstack.com/router/latest/docs/framework/react/guide/route-trees#directory-routes))
---
### Filesystem-basierte Konfiguration

- Alle Routen liegen per Default unterhalb von `routes`
- **Alle Dateien** unterhalb von `routes` gelten per Default als Route!
  - Um eine Datei (oder ein Verzeichnis) auszuschliessen, kann man es mit `-` prefixen:
    - `-components/Button.tsx`
- Eine Routen-Datei muss das per named export das `Route`-Objekt exportieren
- Das `Route`-Objekt wird mit [createFileRoute](`https://tanstack.com/router/latest/docs/framework/react/api/router/createFileRouteFunction#createfileroute-function`) erzeugt
  - (Die initiale Konfiguration dafür wird vom Generator erzeugt)
- Mit dem `component`-Property kann man die Komponente angeben, die gerendert werden soll, wenn die Route aktiv ist
  - * ```tsx
      export const Route = createFileRoute("/recipes/")({
          component: () => <h1>Hello Recipes!</h1>,
      });
      ```
---
### Verschachtelte Routen
* Routen können verschachtelt sein
* Eine "Ober-Route" kann dabei immer die "Unter-Routen" einbinden
* Die oberste Route muss immer aus `__root.tsx` exportiert sein und eine [rootRoute](https://tanstack.com/router/latest/docs/framework/react/api/router/createRootRouteFunction#createrootroute-function) sein
* Dazu wird die [`Outlet`-Komponente](https://tanstack.com/router/latest/docs/framework/react/guide/outlets#outlets) verwendet
---
### Verschachtelte Routen: Beispiel
<!-- .slide: class="left" -->
* ```tsx
  // __root.tsx: exportiert root-Route
  export const Route = createRootRoute({
    component: () => <div><Outlet /></div>,
  });
  ```  
* ```tsx  
  // /user/route.tsx
  export const Route = createRootRoute({
    component: () => <main className="User"><Outlet /></main>,
  });
  ```
* ```tsx  
  // /user/route/password.tsx
  export const Route = createRootRoute({
    component: () => <form><input type="password" /></form>,
  });
  ```
- Wenn `/user/password` aufgerufen wird,
  - wird `password.tsx` gerendert und 
  - steht in `/user/route.tsx` als `Outlet` zur Verfügung. Das Ergebnis von `/user/route.tsx`...
  - steht in `/__root.tsx` als `Outlet` zur Verfügung
- gerendert wird also:
- ```tsx
  <div>  <!-- aus __root -->
    <main className="User">  <!-- aus /user/route -->
      <form><input type="password" /></form>  <!-- aus /user/route/password -->
    </main>
  </div>
  ```

---
### Index Route
- Im Beispiel gibt es die `/user/route.tsx`-Datei
- Dessen Route wird immer gerendert, wenn der aktuelle Pfad mit `/user` anfängt
  - also auch bei `/user/password`
- Dadurch kann man hier gemeinsame Logik (etwa ein Layout oder Authentifizierung unterbringen)
- Eine **Index Route** ist eine Route, die nur dann gerendert wird, wenn dessen Pfad **genau** dem Pfad im Browser entspricht
- Dafür gibt es zwei Möglichkeiten
  - Eine Datei mit einem Dateinamen, der nicht `route.tsx` ist (und einigen anderen "geschützten Namen")
    - `/user/password.tsx` wird nur gerendert, wenn `/user/password` aktiv ist, aber nicht bei `/user/password/reset`
  - Eine Datei mit dem Namen `index.tsx`. Diese Route ist aktiv, wenn der Pfad im Browser genau dem Pfad zu der Datei entspricht
    - `/user/password/index.tsx` wird nur gerendert, wenn `/user/password` aktiv ist, aber nicht bei `/user/password/reset`
---
### Beispiele
<!-- .slide: class="left" -->
- ```
  /routes/__root.tsx # Gerendert bei /, /about, /user, /user/password, /user/reset

  /routes/about.tsx # Gerendert bei /about
  
  /routes/user/route.tsx  # Gerendert bei /user, /user/password, /user/reset
  
  /routes/user/index.tsx  # Gerendert bei /user
  
  /routes/user/password/index.tsx # Gerendert bei /user/password
  
  /routes/user/password/reset.tsx # Gerendert bei /user/password/reset
  ```

---
### Root-Route
- Es **muss** eine zentrale Root-Route geben
- Diese liegt in `/routes/__root.tsx`.
  - Diese enthält die Root-Route, die beispielsweise ein globales Layout vorgeben kann
- Eine Route kann per [`Outlet`-Komponente](https://tanstack.com/router/latest/docs/framework/react/guide/outlets#outlets) die "Kinder"-Routen zu rendern:
- ```tsx
  // _root.tsx
    export const Route = createRootRoute({
      component: () => <main><Outlet /></main>,
    });
  ```
---
### Das Route-Objekt
- Das erzeugte `Route`-Objekt kann verwendet werden, um zur Laufzeit z.B.:
  - an die Parameter in der URL zu kommen ( `useParams`)
  - an die Such-Parameter an der URL zu kommen (`useSearchParams`)
- In der Routen-Datei könnt ihr das `Route`-Objekt direkt verwenden:
  - `Route.useParams()`
- In allen anderen Dateien kann man die `[getRouteApi]`(https://tanstack.com/router/latest/docs/framework/react/api/router/getRouteApiFunction#getrouteapi-function)-Funktion verwenden
  - Diese liefert das `Route`-Objekt für einen Pfad zurück
  - * ```typescript
    const userPasswordRoute = getRouteApi("/user/password");
    ```
- Der String mit dem Pfad ist typsicher!  
---
### Routen mit variablen Segmenten

- Wenn eine Route ein variables Segment (z.B. eine Id) aufnehmen soll, muss der Datei- oder Ordnername mit `$` anfangen
  - `/user/profile/$userId` (`/user/profile/U1`)
- In einer Komponente kannst Du zur Laufzeit an den Wert für das Segment mit dem [`useParams`-Hook](https://tanstack.com/router/latest/docs/framework/react/api/router/useParamsHook#useparams-hook) der Route gelangen:
- ```typescript
    const Route = createFileRoute( /* ... */);
    // oder: const Route = getRouteApi("/user/profile/$profileId");
   
    const { userId } = Route.useParams()
  ```
- Die Verwendung von `useParams` ist typsicher.
  - TypeScript gibt einen Fehler aus, wenn Du einen Namen verwendet der nicht im Pfad vorkommt
  * ```typescript
    const { user_id } = Route.useParams() // ERROR: user_id
    ```
---
### Links

- Links zu Routen kannst Du mit der [Link-Komponente](https://tanstack.com/router/latest/docs/framework/react/guide/navigation#link-component) erzeugen
- Diese Komponente ist typsicher, was den Pfad und die erwarteten Parameter angeht
- ```tsx
  function NavBar() {
    return <div>
       <Link to={"/"}>Home</Link>
       <Link to={"/about"}>About</Link>
    </div>
  }
  ```
- Werte für dynamische Segmente (params) setzt du mit dem `params`-Objekt
- ```tsx
  function NavBar() {
    return <div>
       <Link to="/" params={{userId: "U1"}}>User Profile</Link>
    </div>
  }
  ```
- Auch diese Verwendung ist hier typsicher 
  - Es gibt einen Fehler wenn du `params` nicht angibst (oder kein `userId` darin)
---
### Übung: Routing mit TS Router

---
### Übung: Vorbereitung #1

- **Klonen des Repositories**
- Kurze Vorstellung des Repositories von mir
- Bitte klonen: https://github.com/nilshartmann/moderne-react-pattern-workshop
- In der [README.md-Datei](https://github.com/nilshartmann/nextjs-workshop/blob/main/README.md) findet ihr Hinweise zur Installation des Workspaces
  - Es reicht für diesen Teil, wenn ihr **das Backend** und die **SPA-Anwendung (Workspace)** installiert bzw. startet 
- **Arbeitsverzeichnis**: Wir arbeiten ausschliesslich im Verzeichnis `1_spa/spa_workspace`
- ⚠️ Am besten nur das `1_spa/spa_workspace`-Verzeichnis in der IDE oder im Editor öffnen

---
### Übung: Routing mit TS Router

- Lege die Route für `/recipes` an.
  - Als Komponente kannst Du dort die fertige Komponente `RecipeListPageContent` angeben
  - Füge in der (fertigen) `LandingPage.tsx`-Komponente einen `Link` auf die recipes-Route hinzu
    - Du findest in der Datei ein entsprechendes TODO
- Lege die Route zur Einzeldarstellung eines Rezeptes an
  - Die Pfade im Browser lauten `/recipes/Id-1`, `/recipes/ID-2`, ...
  - Du brauchst also ein variables Segment mit der `recipeId`
  - Die Komponente für die Route kann eine "Hello-World"-Komponente sein
  - Sie soll mit `useParams` die `recipeId` abfragen und die `recipeId`-anzeigen
- Für in der `RecipeCard`-Komponente einen Link zur Einzeldarstellung hinzu
  - In `RecipeCard.tsx` stehen entsprechende TODOs
- **Optional**: Kannst Du ein Layout für alle Routen in `/recipes` erzeugen?
  - Du kannst dafür die `RecipesPageLayout`-Komponente verwenden oder Du denkst was einfaches selber aus
- Eine Lösung findest Du in `spa_schritte/10_router_routing`

---
### Exkurs: zod

<!-- .slide: data-markdown="zod.md" -->

---
### TanStack Router
## Search Params

- TanStack Router bietet flexible und typsichere Wege um mit Search Parametern in der URL zu arbeiten
  - (alles hinter dem `?` in der URL: `/users?order_by=age&lastname=mueller`)
- Die Angabe der Search Parameter und der Zugriff darauf ist typsicher
- Die kannst die Search Parameter mit zod validieren lassen
  - Dann wird eine Route nur gerendert, wenn deren Search-Parameter gültig sind
- Die Search Parameter werden von TS Router bei bedarf serialisiert und deserialisiert (z.B. bei Objekten oder Arrays)
  - Damit kannst du Search Parameter als Ergänzung oder Alternative zu (globalem) State verwenden
---
### Definition der Search Params
- In der Routen-Definition gibst Du eine `validateSearch`-Methode an
- Diese bekommt von TS Router die Search Parameter aus der URL
- Die Methode muss die Parameter validieren
- Aus dem Rückgabe-Typ der Methode weiß Typescript, welche Search Parameter es für eine Route gibt
- ```typescript
  import { createFileRoute } from "@tanstack/react-router";
  import { z } from "zod";
  
  const UserListParams = z.object({
    lastname: z.string(),
    order_by: z.enum(["age", "name"]).optional(),
  });
  
  export const Route = createFileRoute("/users/")({
    component: RecipeListPageContent,
    validateSearch: (search) => UserListParams.parse(search),
  });
  ```
---
### Zugriff auf die Search Parameter
- Mit dem [`useSearch`-Hook](https://tanstack.com/router/latest/docs/framework/react/api/router/useSearchHook#usesearch-hook) einer Route kannst du auf die Such-Parameter zugreifen
- TypeScript kennt deren Format und du kannst dir auch zur Laufzeit sicher sein, dass die Parameter korrekt sind
  - (wenn dein `validateSearch`-Methode korrekt funktioniert)
- ```typescript
    const Route = createFileRoute( /* ... */);
    // oder: const Route = getRouteApi("/users");
   
    const { lastname, order_by } = Route.useSearch();
    // TS Typen:
    //   lastname ist string
    //   order_by ist undefined oder "age" oder "name"  
  ```
---
### Ausgewählte Search-Parameter
- Eine Komponente, die `useSearch` verwendet, wird automatisch neu gerendert, wenn sich die Search Parameter ändern
  - ähnlich wie bei `useState`
- Du kannst - ähnlich wie mit `useSelector` in Redux oder Zustand - auch einzelne Search-Parameter auswählen
- Dann wird die Komponente nur neu gerendert, wenn sich diese Parameter geändert haben
- Dazu übergibst Du an `useSearch` ein Option-Objekt mit einem `select`-Property
- Das `select`-Property ist eine Methode, die die aktuellen Suchparameter übergeben bekommt und das die ausgewählten Parameter als Objekt zurückliefern muss
- Hier wird nur neu gerendert, wenn sich der `lastname` geändert hat:
- ```typescript
    const { lastname } = Route.useSearch({
      select: search => ({ lastname: s.lastname })
    });
  ```
---
### Übung: Search-Parameter
- **Definiere für die Rezeptliste den `orderBy`-Search-Parameter**
  - Das `zod`-Objekt mit den Parametern ist bereits fertig: `RecipePageListParams` in `RecipeListRouteParams.ts`
  - Du musst in `routes/recipes/index.tsx` nur noch die `Route.validateSearch`-Methode hinzufügen
  - Diese soll `ReceipPageListParams.parse` verwenden, um sicherzustellen, dass die Search-Parameter korrekt sind
- In `OrderButton.tsx` musst Du mit dem `orderBy`-Search-Parameter arbeiten:
  - Lies den aktuellen `orderBy`-Search-Parameter aus
  - Baue einen Link mit einem neuen `orderBy`-Parameter
  - Siehe Todos in `OrderButton.tsx`
- Danach sollte Sortierung und Paginierung funktionieren (s. `RecipeListPageContent.tsx`)
- Mögliche Lösung: `spa_schritte/20_router_search_params`
---
### 