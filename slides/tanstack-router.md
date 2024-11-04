# TanStack Router
<!-- .slide: id="t-tanstack-router" -->
---
## TanStack Router
<!-- .slide: class="with-fragments" -->

- https://tanstack.com/router/latest/docs/framework/react/overview
- Typsicherer, client-seitiger Router für React (und andere)
- File-basierte Routen
- Code-Generator für Routen-Konfiguration
---
### Workspace
<!-- .slide: class="with-fragments" -->
- Für den Single-Page-Application-Teil verwenden wir das Verzeichnis `1_spa/spa_workspace`
- Du kannst dieses Verzeichnis schon in deinem Editor/IDE öffnen
  - ...aber installieren und starten der npm-Pakete machen wir später

---
### TanStack Router: Demo
<!-- .slide: class="with-fragments" -->
- <!-- .element: class="demo" -->Route für /recipe/$recipeId
- <!-- .element: class="demo" -->useParams, um $recipeId auszugeben
- <!-- .element: class="demo" -->In RecipeCard Link bauen
- <!-- .element: class="demo" -->route.tsx für Layout
- 

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
### Übung: Vorbereitung "SPA-Workspace"
<!-- .slide: class="with-fragments" -->
- **Klonen des Repositories**
- Kurze Vorstellung des Repositories von mir
- Bitte klonen: https://github.com/nilshartmann/moderne-react-pattern-workshop
- In der [README.md-Datei](https://github.com/nilshartmann/nextjs-workshop/blob/main/README.md) findet ihr Hinweise zur Installation des Workspaces
  - Es reicht für diesen Teil, wenn ihr **das Backend** und die **SPA-Anwendung (Workspace)** installiert bzw. startet 
- **Arbeitsverzeichnis**: Wir arbeiten ausschliesslich im Verzeichnis `1_spa/spa_workspace`
- ⚠️ Am besten nur das `1_spa/spa_workspace`-Verzeichnis in der IDE oder im Editor öffnen
- Hierdrin `npm install` oder `pnpm install` oder `yarn install` ausführen
- Dann `spa_workspace/vite.config.ts`-Datei anpassen:
  ```
  const recipifyBackend = "URL_KOMMT_VON_NILS"; 
  ```
- Dann `npm run dev` (oder `yarn dev` oder `pnpm dev`)  


---
### Übung: Routing mit TS Router
<!-- .slide: class="with-fragments" -->
- Lege die Route zur Einzeldarstellung eines Rezeptes an
  - Wenn Du die Datei dafür angelegt hast, sollte TS Router die (minimale) Routen-Defintion automatisch generieren. Wenn das *nicht* passiert:
      - evtl. Datei manuell in deiner IDE/Editor neu laden
      - Vite einmal beenden und neustarten (dann läuft der Generator neu los)
  - Die Pfade im Browser lauten `/recipes/1`, `/recipes/2`, `/recipes/3`, ...
  - Du brauchst also ein variables Segment. Das soll `recipeId` heißen
- Die **Komponente** für die Route kann eine "Hello-World"-Komponente sein
  - Die Seite muss nicht hübsch sein, heute gilt: wir machen Bauhaus-Style, "form follows function" 😉
  - Die Komponente soll mit `Route.useParams` die `recipeId` abfragen und die `recipeId`-anzeigen
- Füge in der `components/recipelistpage/RecipeCard`-Komponente einen Link zur Einzeldarstellung hinzu
  - In `RecipeCard.tsx` stehen entsprechende TODOs
- **Optional**: Kannst Du ein Layout für alle Routen in `/recipes` erzeugen?
  - Du kannst dafür die `RecipesPageLayout`-Komponente verwenden oder Du denkst dir was einfaches selber aus
- Eine Lösung findest Du in `spa_schritte/10_router_routing`
---
### TanStack Router
## Search Params
<!-- .slide: class="with-fragments" -->
- TanStack Router bietet flexible und typsichere Wege um mit Search Parametern in der URL zu arbeiten
  - (alles hinter dem `?` in der URL: `/users?order_by=age&lastname=mueller`)
- Die Angabe der Search Parameter und der Zugriff darauf ist typsicher
- Wie stellen wir sicher, dass eine Route während der Entwicklung (TypeScript) und zur Laufzeit (JavaScript) mit den korrekten Search Parametern verwendet wird?

---
## Exkurs: zod

---

# Zod
<!-- .slide: class="with-fragments" -->
- "TypeScript-first schema validation with static type inference"
- https://zod.dev/
- Damit könnt ihr Objekte beschreiben und **zur Laufzeit** validieren lassen
- Das ist insbesondere sinnvoll für Daten, die wir in der Anwendung nicht selbst erzeugen, z.B.:
  - Search Parameter in einer URL
  - Daten, die vom Server gelesen wurden
  - um Benutzereingaben aus einem Formular

---

### TypeScript vs. JavaScript
<!-- .slide: data-state="exkurs" -->
<!-- .slide: class="left with-fragments" -->

- Im folgenden ist mit **TypeScript** das Typsystem von TypeScript gemeint, das nur zur Buildzeit vorhanden ist
- Mit **JavaScript** ist der Code gemeint, den wir in JavaScript oder TypeScript schreiben, und der dann auch im Browser (als JavaScript) ausgeführt wird

* ```typescript
  // "TypeScript": zur Laufzeit weg
  type User = { lastname: string; firstname?: string };

  // "JavaScript"
  function login() {
    return { lastname: "Meier", firstname: null };
  }
  ```
---
### Typecast vs. Validierung
<!-- .slide: data-state="exkurs" -->
<!-- .slide: class="left with-fragments" -->
- Mit einem Typecast sagen wir TypeScript welchen Typ eine Variablen haben soll
* Das kann richtig oder falsch sein:
* ```typescript
  const s:string = "Hallo";
  let y:any = s;
  let x:number = y as number; 🙀
  ```
- Entspricht ungefähr in Java:
* ```java
  String s = "Hallo";
  Object y = s;
  Integer x = (Integer) y;
  ```
- ```
  async function loadRecipes() {
    const data = await fetch("/api/recipes");
    const recipes = await data.json();
    return recipes as Recipe[];
  }
  ```  
- In dem Beispiel sind wir uns ja sicher, dass `data` eine Liste von `Recipe`-Objekten ist.
- Deswegen können wir uns auf den Type Cast verlassen.
* Oder? 🤔
---
### Validierung
<!-- .slide: data-state="exkurs" -->
<!-- .slide: class="left with-fragments" -->
* Die Daten, die von einem Server (oder auch aus Benutzereingaben) kommen, können von TypeScript nicht überprüft werden
* TypeScript ist zu Laufzeit "weg"
* Wenn der Server also Daten schickt die - entgegen unserer Erwartung - nicht zu dem passen, was wir als TypeScript-Typ definiert haben, merken wir das nicht
  * (abgesehen davon, dass die Anwendung irgendwann in Fehler läuft)
* Besser wäre bei solchen Daten eine echte Laufzeit-Validierung
* Dabei werden die gelesen Daten nach dem Empfang überprüft:
* ```typescript
  function validateRecipes(r: any): Recipe[] {
    if (!Array.isArray(data)) {
      // Fehler, Antwort muss eine Liste sein
    }

    data.forEach(p => {
      if (!"title" in p) { throw new Error("Kein title"); }
      if (!"likes" in p) { throw new Error("Keine likes"); }
      // ... weitere Prüfungen ...
    });

    // ok: data hier ziemlich sicher Recipe-Liste
    return r as Recipe[];
  }
  ```
* Ist das schön?
---

### Problem: TypeScript-Typen sind zur Laufzeit weg
<!-- .slide: data-state="exkurs" -->

- Wenn man ein Objekt beschrieben hat, kann man das zur **Laufzeit** nicht mit TypeScript überprüfen
  - Hat uns der Server zur Laufzeit wirklich ein Objekt geschickt, das aussieht wie ein `User`?
- Für "echte" Validierungen sind TypeScript-Typen auch zu ungenau:
  - keine Wertebegrenzungen (bzw. nur sehr eingeschränkt)
  - Längen-Begrenzungen gibt es nicht
- Wenn man Validierung zur Laufzeit benötigt, kommt man um (JavaScript-)Code, der zur Laufzeit ausgeführt wird, nicht drumherum
- Also müssen die Validierungsregeln in JavaScript beschrieben werden.
- Dann sind diese aber redundant: in TypeScript (statische Typbeschreibung), in JavaScript zur Validierung während der Laufzeit
---
### Zod
## Demo
<!-- .slide: class="with-fragments" -->
- <!-- .element: class="demo" -->user.ts mit Zod

---
### Validierungsbibliothek: zod
<!-- .slide: class="left" -->
- Mit [zod](https://zod.dev) gibt es eine Validierungsbibliothek, die beides verbindet
- Mit (JavaScript)-Code, der auch zur Laufzeit ausgeführt wird, wird ein **Schema** beschrieben
- Dieses Schema kann zur Laufzeit verwendet werden, um ein beliebiges Objekt zu validieren
- Außerdem kann aus dem Schema ein TypeScript-Type für die Build-Zeit abgeleitet werden
* ```typescript
  import { z } from "zod";

  const UserSchema = z.object({
    // String:
    username: z.string(),

    // String mit Format:
    email: z.email(),

    // Optionaler String (kann null oder undefined sein):
    nickname: z.string().nullish(),

    // Zahl:
    age: z.number(),

    // Liste von Strings:
    roles: z.string().array();
  });
  ```
---
### Validierungsbibliothek: zod
<!-- .slide: class="left" -->
* Die definierten Schema lassen sich kombinieren:
* ```typescript
  // "Primitiver" Wert mit definiertem Format
  const Password = z.string()
            .min(10)
            .regex(/^(?=.*[a-zA-Z])(?=.*\d).+$/);

  const UserSchema = z.object({
    // ...
    password: Password
  });

  // Liste mit definiertem Inhalt (UserSchema)
  const GetUserApiResponse = UserSchema.array();

  ```
* ```typescript
  // Erweiterung des UserSchema:
  const EditorSchema = UserSchema.extend({
    mainTopic: z.string()
  });
  ```
* ```typescript
  // Verwenden von Schemas
  const Article = z.object({
    // writtenBy muss EditorSchema entsprechen (weder null noch undefined)
    writtenBy: EditorSchema,

    // reviewedBy darf Editor oder null sein (nicht undefined)
    reviewedBy: EditorSchema.nullable(),

    // Optionale Liste von Usern (darf undefined, aber nicht null sein)
    commentedBy: UserSchema.array().optional()
  })
  ```
---
### Zod
* Mit dem `z`-Objekt lassen sich Typen (einfache und komplexe) beschreiben
* Objekte werden mit [`z.object`](https://zod.dev/?id=objects) beschrieben
* Dabei kann man nicht nur Typen angeben ([`string`, `number`](https://zod.dev/?id=primitives), `email`, ....) sondern auch Wertebeschränkungen
  * [Mindestlänge, Maximallänge](https://zod.dev/?id=minmaxlength), erlaubte Zeichen etc.
* Mit der [`parse`-Methode](https://zod.dev/?id=parse) am `Schema`-Objekt kann dann ein beliebiges Objekt validiert werden.
* Wenn das Objekt nicht dem Schema entspricht, wird ein Fehler geworfen
* Wenn alles in Ordnung ist, kommt das validierte Objekt zurück
* ```typescript
  const potentialUser = await loadUser("U1");

  const user = UserSchema.parse(potentialUser);
  ```
* Dadurch ist auch TypeScript der Typ bekannt!
* ```typescript
  type User = { username: string; email: string; nickname?: string | null };
  const user: User = UserSchema.parse(potentialUser);
                     // ^--- ok

  ```
---
### Zod: Ableiten des TypeScript-Typen
* Den TypeScript-Typen müssen wir gar nicht selber schreiben, dass kann zod für uns machen:
* ```typescript
  export const UserSchema = z.object({ /* ... */ });

  export type User = z.infer<typeof UserSchema>;
  ```
* 👉 Damit sind wir sicher, dass unser TypeScript-Type und die Validierungsregeln übereinstimmen
  * Wir vermeiden Redundanzen
  * Wir haben Sicherheit zur Build- und zur Laufzeit
---
### Übung: zod
<!-- .slide: class="with-fragments" -->

* In `src/param.ts` ist ein `RecipeListSearchParams`-Typ als TypeScript-Typ definiert
* Schreibe dafür einen zod-Typen und lass dir den TypeScript-Typen dann generieren
* Mehr Hinweise findest du direkt in `src/param.ts`
* Mögliche Lösung: `15_zod`

---
### TanStack Router
## Search Params
<!-- .slide: class="with-fragments" -->
- TanStack Router bietet flexible und typsichere Wege um mit Search Parametern in der URL zu arbeiten
  - (alles hinter dem `?` in der URL: `/users?order_by=age&lastname=mueller`)
- Die Angabe der Search Parameter und der Zugriff darauf ist typsicher
- Die kannst die Search Parameter mit zod validieren lassen
  - Dann wird eine Route nur gerendert, wenn deren Search-Parameter gültig sind
- Die Search Parameter werden von TS Router bei bedarf serialisiert und deserialisiert (z.B. bei Objekten oder Arrays)
  - Damit kannst du Search Parameter als Ergänzung oder Alternative zu (globalem) State verwenden
---
### Search Params: Demo
<!-- .slide: class="with-fragments" -->
- <!-- .element: class="demo" -->http://localhost:8099 Sortierung zeigen
- <!-- .element: class="demo" --> `/recipes`-Route Search Parameter validateSearch
- <!-- .element: class="demo" --> `OrderButton`
- <!-- .element: class="demo" --> `RecipeListPageContent.tsx` Search Params verwenden
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
<!-- .slide: class="with-fragments" -->
![Order Button](./slides/images/order-buttons.png)
- **Definiere für die Rezeptliste den `orderBy`-Search-Parameter**
  - Das `zod`-Objekt mit den Parametern ist bereits fertig: `RecipePageListParams` in `src/components/recipelistpage/RecipeListRouteParams.ts`
  - Du musst in `routes/recipes/index.tsx` nur noch die `Route.validateSearch`-Methode hinzufügen
  - Diese soll `RecipePageListParams.parse` verwenden, um sicherzustellen, dass die Search-Parameter korrekt sind
  - Mehr zu Search Parameters findest Du [hier in der Dokumentation](https://tanstack.com/router/latest/docs/framework/react/guide/search-params)
- In `OrderButton.tsx` musst Du mit dem `orderBy`-Search-Parameter arbeiten:
  - Lies den aktuellen `orderBy`-Search-Parameter aus
  - Baue einen Link mit einem neuen `orderBy`-Parameter
  - Siehe Todos in `OrderButton.tsx`
- Danach sollte Sortierung und Paginierung funktionieren (s. `RecipeListPageContent.tsx`)
- Mögliche Lösung: `spa_schritte/20_router_search_params`

---
## Search Params als globaler State
<!-- .slide: class="with-fragments" -->
* Macht das Sinn? 🤔
* In welchen Fällen können wir Search-Params als Alternative oder Ergänzung zu globalem State verwenden? 🤔

---
### Demo: Search Params als globaler State
* `BookmarkButton` einfügen und implementieren

---
### Search Params als globaler State

* TanStack Router sorgt dafür, dass nur Komponeten neu gerendert werden, die sich für einen (oder mehrere) _veränderte_ Search Parameter interessieren
  * Das Verhalten ist damit ähnlich wie z.B. in den `useSelector`-Funktionen von Redux
* Die Search-Parameter werden automatisch validiert
* ...sie sind typsicher
* ...und es können sogar Objekte und Arrays sein
  * TS Router serialisiert und deserialisert diese dann automatisch
  