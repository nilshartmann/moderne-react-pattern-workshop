# Fullstack React
<!-- .slide: id="t-nextjs" -->

---
## März 2023...

## <img src="slides/images/go-with-fullstack-framework.png">

[//]: # (---)

[//]: # (## React empfiehlt "Fullstack-Framework")

[//]: # ()
[//]: # (<img src="slides/images/can-i-use-react-without-a-framework.png" style="height:900px">)

[//]: # ()
[//]: # (&#40;https://react.dev/learn/start-a-new-react-project#can-i-use-react-without-a-framework&#41;)

[//]: # (---)

[//]: # ()
[//]: # (### React empfiehlt "Fullstack-Framework")

[//]: # ()
[//]: # (- "Framework" ist verharmlosend, weil es sich in der Regel um einen kompletten Stack samt Build-Tools und Laufzeitumgebung handelt)

[//]: # (- Deswegen werden solche Frameworks auch als "**Meta-Frameworks**" bezeichnet &#40;=> Sammlung von Frameworks&#41;)

[//]: # (- [Next.js]&#40;https://nextjs.org/&#41; entspricht den Vorstellungen des React-Teams)

[//]: # (- [Remix]&#40;https://remix.run/&#41; &#40;vom React Router Team&#41; unterstützt noch keine RSC, hat aber ähnliche Features)

[//]: # (  - Unterstützung für RSC in Planung)

---

[//]: # (## Next.js)

[//]: # ()
[//]: # (- https://nextjs.org/)

[//]: # (- Features:)

[//]: # (  - Unterstützung für React Server Components)

[//]: # (  - SSR)

[//]: # (  - Static Rendering)

[//]: # (  - Datei-basiertes Routing)

[//]: # (  - Caching und Preloading)

---

### Der Next.js App-Router

- [App-Router](https://nextjs.org/docs/app/building-your-application/routing): neuer Router (seit Next.js 13.4), der RSC unterstützt
  - (der "alte" `pages`-Router unterstützt keine RSC)
---
### Der Next.js App-Router
- <!-- .element: class="demo" -->Routen von Recipify zeigen
---
### Exkurs: Der Next.js App-Router
<!-- .slide: data-state="nextjs-exkurs" -->  
- File-system-basierter Router, der Code eurer Anwendung liegt unterhalb des Verzeichnisses `app`
- Unterhalb von `app` ist ein Verzeichnis eine **Route**, wenn darin eine `page.tsx`-Datei liegt
  - Dann ist dieses Verzeichnis vom Browser aufrufbar (`app/user/profile/page.tsx` -> Pfad im Browser: `/user/profile`)
  - `page.tsx` vergleichbar mit `index.html` in klassischem Web-Server
  - Verzeichnisse, die _keine_ `page.tsx`-Datei haben, tauchen zwar in der URL auf, können aber nicht aufgerufen werden
- Eine **Routen-Datei** muss per `default export` eine React-Komponente exportieren.
- Diese Komponente wird dargestellt, wenn die Route vom Browser angefordert wird
- ```tsx
  // /app/page.tsx
  export default function LandingPage() {
    return <h1>Hello World!</h1>;
  }

  // /app/recipes/page.tsx
  export default function RecipeListPage() {
    return <h1>Tasteful recipes 😋</h1>;
  }
  ```

---

### Der Next.js Router
<!-- .slide: data-state="nextjs-exkurs" -->  

- In einem Route-Verzeichnis kann es weitere Dateien geben, die einen festgelegten Namen haben und jeweils per `default export` eine React-Komponente zurückliefern:
- `layout.tsx`: Definiert die Layout-Komponente.
  - Damit kann über mehrere Routen ein einheitliches Layout festgelegt werden, denn wenn eine Seite gerendert wird, werden alle Layout-Komponenten aus den Pfaden darüber verwendet. So kann eine Hierarchie von Layouts gebaut werden.
- `loading.tsx`: Loading-Spinner o.ä., der dargestellt wird, bis die Seite gerendert werden kann (dazu später mehr)
- `error.tsx`: Eine Komponente, die als Error Boundary fungiert und gerendert wird, wenn beim Rendern der `page` ein Fehler aufgetreten ist
- `not-found.tsx`: Kann verwendet werden, um einen Fehler darzustellen, wenn eine Seite `notFound` zurückliefert

---

### Der Next.js Router: Layouts
<!-- .slide: data-state="nextjs-exkurs" -->  

- Jede Route kann eine Layout-Komponente haben
- Dieser Komponente wird die darzustellende Seite als `children`-Property übergeben
- ```tsx
  type MainLayoutProps = { children: React.ReactNode };

  export default function MainLayout({ children }: MainLayoutProps) {
    return <main>{children}</main>;
  }
  ```

- Layout-Komponenten können verschachtelt sein
- Wenn eine Route keine Layout-Komponente hat, wird im Baum oberhalb nach der nächstgelegenen Layout-Komponente gesucht
- Die Layout-Komponente für die Root-Route ist _pflicht_. Hier muss eine ganze HTML-Seite beschrieben werden
- ```tsx
  // /app/layout.tsx
  export default function Layout({children}: {children: ReactNode}) {
    return <html>
       <head><title>Recipify</title></head>
       <body>
         <header>Recipify!</header>
         <main>{children}</main>
       </body>
      <html>
  }
  ```

---

### Navigieren
<!-- .slide: data-state="nextjs-exkurs" -->  

- Zum Rendern von Links bringt Next.js eine eigene `Link`-Komponente mit
  - Mit einem entsprechenden Plug-in für TypeScript soll die sogar typsicher sein, so dass man keine Routen-Angaben hinschreiben kann, die es gar nicht gibt
    - (hat bei mir beim letzten Versuch nur eingeschränkt funktioniert)
- Verwendung ähnlich wie auch vom React Router (und `a`-Element) gewohnt:

- ```tsx
  import Link from "next/link";

  function RecipeLink( { recipeId } ) {
    return <Link href={`${/recipes/${receipeId}`}>Show recipe</Link>;
  }
  ```
---

[//]: # (### Übung: Getting started!)

[//]: # ()
[//]: # (<!-- .slide: class="small" -->)

[//]: # ()
[//]: # (1. Baue die "Landing Page" für die Root-Route &#40;`/`&#41; im `app`-Verzeichnis)

[//]: # ()
[//]: # (   - Die Seite muss nicht hübsch sein, "Hello World" reicht)

[//]: # (   - wichtig: die Komponente soll einen Link auf `/recipes` rendern)

[//]: # ()
[//]: # (2. Lege die Komponente für die Route `/recipes` an)

[//]: # (   - Es reicht, wenn diese Komponente erstmal nur "Hello World" ausgibt.)

[//]: # (   - In welches Verzeichnis muss die `page.tsx`-Datei für diese Route?)

[//]: # (3. Wenn deine neuen Routen funktionieren:)

[//]: # ()
[//]: # (   - Füge ein `console.log`-Statement in deine Komponenten hinzu, das beim Rendern die aktuelle Uhrzeit ausgibt)

[//]: # (   - wo und wann wird das Log-Statement ausgegeben?)

[//]: # ()
[//]: # (- Mögliche Lösung findest Du in `nextjs_schritte/10_routen_und_links`)

[//]: # ()

---
# React Server Components

---

### React Server Components

- **Idee:** Komponenten werden **nicht** im **Client** ausgeführt
- Sie stehen auf dem Client nur **fertig gerendert** zur Verfügung
- Der Server schickt lediglich _eine Repräsentation der UI_, aber _keinen JavaScript-Code_
- Das Format ist (im Gegensatz zu SSR) **nicht HTML**
- Kann aber mit SSR kombiniert werden
- React bzw. JavaScript muss also im Client laufen

---
### Arten von Komponenten

- **Client-Komponenten** (wie bisher)

- Werden auf dem **Client** gerendert
- oder auf dem **Server** 🙄

- Wie bisher:
  - JavaScript-Code wird vollständig zum Client gesendet
  - Der JavaScript-Code wird auf dem Client ausgeführt
  - Die Komponenten können interaktiv sein
    - Event-Listener etc.
---

### Arten von Komponenten

- **Neu: Server-Komponenten**

- werden auf dem **Server** gerendert
- oder im **Build** 🙄

- liefern UI (!) zum React-Client zurück (kein JavaScript-Code)
- Werden im Client nicht "ausgeführt"
- ...und können folglich nicht interaktiv sein (nur ohne JS)

---

### Arten von Komponenten

- Die Komponenten gemischt werden:
- Server-Komponenten können Client-Komponenten einbinden
  - (umgekehrt geht es nicht)
- Dann wird alles bis zur ersten Client-Komponente gerendert an den Client gesendet
  - (Mit SSR auch die Client-Komponenten)

---

# RSC am Beispiel Next.js
---
### Demo: Server Komponenten
- <!-- .element: class="demo" -->`recipes`-Route anlegen
- <!-- .element: class="demo" -->`console.log` in `page`-Komponente

[//]: # (---)

[//]: # ()
[//]: # (### Demo: Eine React Server Komponente)

[//]: # ()
[//]: # (- **Alle** Komponenten in Next.js sind per Default **Server Components**)

[//]: # (- Ausnahmen &#40;Client Komponenten&#41; müssen explizit gekennzeichnet werden &#40;dazu später mehr&#41;)

[//]: # (- <!-- .element: class="demo" --> Landing-Page `/page.tsx`)

[//]: # (- <!-- .element: class="demo" -->`/layout.tsx`)

[//]: # (- <!-- .element: class="demo" -->`console.log` in `page`-Komponente)

---

## Data Fetching

---

## Data Fetching

- Komponente, die Daten benötigen, können diese direkt _in der Komponente_ laden
- _Kann_ Latenz sparen und bessere Performance bringen

- "No Client-Server Waterfalls"

- Server Components können die Server-Infrastruktur nutzen (DB, Filesystem)

- 👉 Server-Komponenten können dazu _asynchron_ sein

---

## Data Fetching

### Demo: Eine asynchrone Server-Komponente

- **React Server Componentens können asynchron sein!**

1. fetchRecipe: `await` in `recipes`-Route 
   - await `recipes`-Route in `RecipeCard` direkt rendern

2. Zwei Komponenten, die die Daten brauchen: 
   - `RecipeList` und `RecipeListPaginationBar`


---

### Asynchrone React Server Components

- React Server Components (RSC) werden **nicht auf dem Client** ausgeführt!
- Ihr könnt dort keine Event Handler etc. verwenden. Auch Hooks (z.B. `useState`) gehen nicht.
- Dafür könnt ihr eine RSC als `async function` implementieren
- Innerhalb der RSC könnt ihr dann mit Promises arbeiten und mit `await` auf diese warten
- Ihr könnt z.B. `fetch`-Aufrufe machen, Datenbank-Zugriffe oder die Node.JS API verwenden, um Dateien von der Festplatte zu lesen
- ```tsx
  export default async function RecipeList() {
    // Dieser Fetch-Call wird im Next.js-Backend (!) ausgeführt!
    const response = await fetch("http://localhost:8100/api/recipes");
    const recipes = await response.json();

    // ...
    return <RecipeList recipes={recipes} />;
  }
  ```
---
### Übung: Vorbereitung

- Der Next.js-Workspace befindet sich in `2_nextjs/nextjs_workspace`
- ⚠️ Bitte dieses Verzeichnis in IDE/Editor öffnen
- In diesem Verzeichnis das Script `dev` ausführen
- Die Anwendung sollte dann auf http://localhost:8100 laufen
---
### Warnung: Next.js Caching

- Achtung! Next.js hat sehr aggressives Caching eingebaut
- Wenn ihr "komisches" Verhalten feststellt, könnt ihr probieren:
  - Im Browser neuen Tab öffnen, oder in den Dev Tools Caching ausschalten oder Inkognito Modus verwenden
  - "Hard Refresh" im Browser machen
  - Verzeichnis `nextjs_workspace/.next` löschen und Next.js neu starten

---
### Übung: Asynchrone Server Components
**Lade Daten für die Rezept-Übersicht und untersuche das Render-Verhalten**

* In der Datei `app/recipes/page.tsx` ist die Komponente für die Rezept-Übersicht implementiert
* Vervollständige diese Komponente:
  * Lade die Rezepe mit `fetchRecipes`
  * Render' die Komponenten `RecipeList` und `RecipeListPaginationBar`. Diese benötigen jeweils das Promise als Property.
* In `app/components/recipelistpage/RecipeList.tsx` und `app/components/recipelistpage/RecipeListPaginationBar` musst Du das Promise verarbeiten
  * Siehe weitere TODOs direkt in den jeweiligen Komponenten
* Baue `console.log`-Ausgaben in die folgenden Komponenten:
  * `RecipeList`, `RecipeListPaginationBar`, `app/components/PaginationBar`
  * Wo/wann werden die Ausgaben ausgegeben?
* Lösung in `2_nextjs/nextjs_schritte/10_async_rsc/fertig`
---
### Server- und Client-Komponenten

***Demo: Client-Komponenten***

1. In `RecipeListPaginationBar` soll mit `useRecipifyWindowTitle` der Fenster-Titel gesetzt werden
   - Das geht aber nicht... warum? 🤔

2. Demo: Zur Client-Komponente machen
   - `use`-Hook
   - was passiert mit den Unterkomponenten?

---
### Server- und Client-Komponenten
* In Next.js sind alle Komponenten unterhalb von `app` per Default **Server Komponente**
* Um zu kennzeichnen, wo die Server-Client-Komponente verläuft, muss ein Modul mit ["use client](https://19.react.dev/reference/rsc/use-client) ausgezeichnet werden
* Alle Komponenten, die dieses Modul rendert (direkt oder indirekt) sind dann **Client Komponenten**
* Client-Komponenten dürfen dann Event Handler registrieren, State und Hook verwenden, etc.
* ```tsx
  "use client"; // Am Anfang der Datei
  
  function LikeButton() {
    const [likes, setLikes] = useState(0);
  
    return <button onClick={ () => setLikes(likes+1)}>{likes} Likes</button>
  }
  ```
---
### Server- und Client-Komponenten

* Eine Server-Komponente kann Client-Komponenten rendern
  * aber nicht umgekehrt
  * Als Properties dürfen nur **serialisierbare Daten** übergeben werden
  * Außerdem Promises und **gerenderte** Server-Komponenten
* ```tsx
  "use client";
  // Client-Komponente
  function LikeButton( { errorMessageComponent } ) {
    const [likes, setLikes] = useState(0);
  
    return <>
      <button onClick={ () => setLikes(likes+1)}>{likes} Likes</button>
      {likes < 1 && errorMessageComponent }
    </>
  }
  ```
* ```tsx
  // Alles Server-Komponenten
  function Message({text}) {
    return <div className="err">{text}</div>
  }
  
  function App() {
    return <LikeButton
        errorMessageComponent={<Message text={"Invalid Likes"} />}
    />  
  } 
  ```


---
### Asynchronität in Client-Komponenten

* Client-Komponenten dürfen keine `async`-Funktionen sein (keine Veränderung zum Status Quo)
* Seit React 19 gibt es den [use-Hook](https://19.react.dev/reference/react/use)
* Damit könnt ihr in einer Komponente auf ein Promise warten
* Solange auf das Promise gewartet wird, wird die nächsthöhere Suspense-Komponente gerendert
  * In Next.js ist das eventuell die Komponente in `loading.tsx`
- ```tsx
    "use client";
    
    type RecipeListProps = {
      recipesPromise: Promise<Recipe[]>
    }
    
    function RecipeList( {recipesPromise} : RecipeListProps) {
  
      // use führt dazu, dass ggf. die Suspense.fallback-Komponente angezeigt wird
      const recipes = use(recipesPromise);
  
      // wenn wir hier sind, ist das recipesPromise aufgelöst
    }
  ```
---
### Übung: Server und Client-Komponenten

**Mache aus der `RecipeListPaginationBar` eine Client-Komponente**
* Falls Du mit der vorherigen Übung nicht fertig geworden bist, kopiere dir die Dateien aus `2_nextjs/nextjs_schritte/10_async_rsc/fertig` in deinen Workspace.
* Du musst jetzt statt `await` den `use`-Hook von React verwenden
* Verwende `useRecipifyWindowTitle`, um den Fenster-Titel in der Komponente anzupassen
* Wenn Du die Komponente umgestellt hast, was passiert mit den `console.log`-Ausgaben:
  * wo/wann werden die Komponenten nun gerendert?
* **Optional**: Wie/in welchen Komponenten könntest Du alternativ den Fenster-Titel anpassen, so dass `RecipeListPaginationBar` eine Server-Komponente bleiben könnte?
* Lösung: `nextjs_schritte/20_server_und_client/fertig`
---
## Suspense mit React und Next.js

---

### Platzhalter für Wartezeiten: Suspense
<!-- .slide: data-state="nextjs-exkurs" --> 

- Während eine Route gerendert wird, kann Next.js eine Fallback- bzw. Platzhalter-Komponente anzeigen
- Das entspricht dem Suspense-Verhalten von React
  - Alerdings übernimmt Next.js das Einbinden der `Suspense`-Komponente
  - Du musst nur die Platzhalter-Komponente bauen und in `loading.tsx` per `export default` exportieren
- Deine Fallback-Komponente wird solange dargestellt, bis alle Promises in der Routen-Komponente aufgelöst werden konnten
  - Wenn die Routen-Komponente fertig gerendert wurde, wird nur der Bereich ausgetauscht
- wird keine `loading.tsx`-Datei gefunden, bleibt die Seite weiß...
- ```tsx
  // recipes/loading.tsx
  export default Loading() {
    return <div className={"LoadingSpinner"}>Please Wait...</div>
  }
  ```

---

### Caching
<!-- .slide: data-state="nextjs-exkurs" --> 

- **Caching** ist Next.js-spezifisch.
  - React macht keine Aussage, ob und wie Server Components oder Datenverkehr allgemein gecached werden soll.
- Eine einmal gerenderte Route wird von Next.js gecached.
- Das passiert im Browser und im Backend selbst
  - Wo und wie lange, hängt von einer ganzen Reihe von Faktoren ab
  - Zusätzlich werden auch die Ergebnisse von `fetch`-Aufrufen gecached
- Das Caching ist in der [Dokumentation beschrieben](https://nextjs.org/docs/app/building-your-application/caching)

---
### Mehr zu Next.js Routen
<!-- .slide: data-state="nextjs-exkurs" -->  
- Neben den "klassischen" Verzeichnisnamen, die URL-Segementen entsprechen, gibt es noch weitere Konventionen:
- Ein Pfad in Klammern (`(path)`) taucht in der URL nicht auf. Kann z.B. für eine gemeinsame Layout-Datei oder zur besseren Organisation verwendet werden, wenn man das nicht über die Hierarchie machen kann.
- ```typescript
  // /admin/user
  // /admin/articles
  // /admin/tags
  ```
- Wenn `articles` und `tags` sich ein Layout teilen soll (aber `/user` nicht), kann die Verzeichnisstruktur dafür so aussehen:
- ```typescript
  // /admin/user/page.tsx
  // /admin/(blog)/layout.tsx
  // /admin/(blog)/articles/page.tsx
  // /admin/(blog)/tags/page.tsx
  ```

---

### Mehr zu Next.js Routen
<!-- .slide: data-state="nextjs-exkurs" -->  
- Ein Pfad in eckigen Klammern (`/recipes/[recipeId]`) definiert einen Platzhalter. Der Wert für das Segment in der URL wird der Komponente dann zur Laufzeit als Property an die Routen-Komponente übergeben
- Die Properties, die eine Routen-Komponente bekommt, sind von Next.js vorgegeben
- Die Werte für die variablen Segmente werden als Objekt mit dem Namen `params` übergeben
- Darin enthalten ist der Wert für jedes variable Segment(`[recipeId]`) ohne die eckigen Klammern (`recipeId`):
- ```typescript
  // /app/recipes/[recipeId]/page.tsx

  type RecipePageProps = {
    params: { recipeId: string };
  };

  export default function RecipePage({ params }: RecipePageProps) {
    // params.recipeId enthält den Wert aus der URL (R1, R2, ...)
    const recipeId = params.recipeId;

    // ...
  }
  ```

---

### Mehr zu Next.js Routen
<!-- .slide: data-state="nextjs-exkurs" -->  
- Mit der `notFound`-Funktion kann die [`not-found`-Komponente](https://nextjs.org/docs/app/api-reference/file-conventions/not-found) gerendert werden
- Das ist zum Beispiel nützlich, wenn Daten geladen wurden, die es nicht gibt
- `notFound` bricht die Ausführung der Komponenten-Funktion ab, man braucht kein `return` hinzuschreiben
- ```tsx
  // /app/recipes/[recipeId]/page.tsx
  import { notFound } from "next/navigation";
  export default async function RecipePage({ params }: RecipePageProps) {
    const recipeId = params.recipeId;

    const recipe = await fetchRecipe(postId);
    if (!recipe) {
      notFound(); // kein return notwendig
    }

    return <Receipe recipe={recipe} />;
  }
  ```

- In der Datei `not-found.tsx` kannst Du dann per `export default` eine Komponente exportieren, die im Fehlerfall angezeigt wird
- ```tsx
  // /app/recipes/[recipeId]/not-found.tsx
  export default function RecipeNotFound() {
    return <div>Recipe not found :-(</div>;
  }
  ```

---

### Dynamische und statische Routen
<!-- .slide: data-state="nextjs-exkurs" -->  
- Durch die Verwendung eines Platzhalters wird eine Route zu einer dynamischen Route, d.h. sie wird **nicht** im Build gerendert, sondern **nur** zur Laufzeit
  - Next.js kann hier nicht im Vorwege wissen, welche Werte für das variable Segment verwendet werden
  - Mit `getStaticPaths` kann das geändert werden
- Auch die Verwendung einiger Next.js APIs führt dazu, dass eine Route nicht mehr statisch, sondern dynamisch ist
  - Das betrifft Funktionen, die mit Daten aus einem Request arbeiten (`headers()` und `cookies()`)
- Ggf. wird das Ergebnis auf dem Server gecached

---

## Suspense

- Suspense unterbricht das Rendern, wenn in einer Komponente "etwas" fehlt
- Das haben wir schon in Zusammenhang mit TanStack Query gesehen
- "Etwas" ist im Fall von RSC ein Promise, das nicht aufgelöst ist
  - Am Beispiel der `loading`-Komponente haben wir das schon gesehen (dort aber abstrahiert von Next.js)
- Dazu kann um eine Komponente die `Suspense`-Komponente von React gelegt werden
- ```tsx
  async function loadData(...) {}

  async function RecipeList() {
    const posts = await loadRecipes();

    return <>...</>;
  }

  function RecipeListPage() {
    return <Suspense> fallback={"Please wait"}>
      <RecipeList />
    </Suspense>
  }
  ```

- Hier würde React zunächst die `fallback`-Komponente (`Please wait`) rendern und darstellen
- Wenn das Promise aufgelöst wird, rendert React dann die Komponente erneut für die finale Darstellung

---

### Suspense in Next.js
- Um die oberste Komponente einer Route (`page.tsx`) legt Next.js eine automatisch eine `Suspense`-Komponente
- Den `fallback` dafür implementieren wir in der Datei `loading.tsx`, die eine Komponente per `default export` exportieren muss
- Konzeptionell sieht das so aus:

  - Eure Route:
  - ```tsx
    // loading.tsx
    export default function Spinner() {
      return "Please Wait";
    }

    // page.tsx
    export default async function RecipeListPage() {
      const data = await loadData();
      return <>...</>;
    }
    ```

  - Next.js (dummy code!!!)
  - ```typescript
    // Next.js (dummy code):
    import Fallback from "loading.tsx"
    import Page from "page.tsx";

    function Route() {
      return <Suspense fallback={Fallback}>
        <Page />
      </Supsense>;
    }
    ```

---

## Streaming

- Wenn eine Komponente auf dem Server gerendert wird, kann React das Rendern bei einer `Suspense`-Komponente unterbrechen
- Dann wird der Rest der Seite schon zum Client gesendet
- Sobald die Komponenten unterhalb von `Suspense` gerendert werden konnten, werden diese zum Client nachgesendet
- Dieses Verhalten wird auch **Streaming** genannt.

---

### Wasserfall-Requests

- Die `RecipePage`-Komponente benötigt Daten aus zwei Quellen: Das Rezept und dessen Bewertungen
- Die Antwortzeit der beiden Requests dafür kann bei jedem Aufruf unterschiedlich lang sein
- In einer klassischen React-Architektur könnte es zu einem "Request-Wasserfall" kommen:
  - RecipePage lädt die Rezept-Daten (`fetchRecipe`). So lange wird der Platzhalter angezeigt
  - Dann wird die `ReceipePageContent`-Komponente gerendert
  - Diese verwendet die `FeedbackList`-Komponente ein. Diese lädt nun (ebenfalls) per `fetch` ihre Daten und stellt sich dar.
  - Die beiden Requests starten also nicht zeitgleich, und die Dauer, bis die Daten vollständig angezeigt werden können, setzt sich aus der Dauer der **beiden** Requests zusammen
- Kennt ihr das Problem? Meint ihr das ist ein Problem? Was könnte man dagegen tun 🤔

---

### Wasserfälle vermeiden

- Mit `Suspense` können wir grundsätzlich priorisieren, was uns wichtig(er) ist:
  1. Die Seite wird erst dargestellt, wenn **alle** Daten geladen sind
  2. Sobald "irgendwelche" Daten (Rezept **oder** Feedback) geladen wurden, diese Daten sofort anzeigen.
  3. Auf die **Rezepte warten**, und die Seite erst dann darstellen. Falls Bewertungen "schneller" sind, die Bewertungen nicht vorab anzeigen.
- <!-- .element: class="demo" --> Die ersten beiden Beispiel durchgehen
- <!-- .element: class="demo" --> Wie können wir das dritte Umsetzen? 🤔

---

### Wasserfälle vermeiden

- Mit `Suspense` können wir grundsätzlich priorisieren, was uns wichtig(er) ist:
  1. Die Seite wird erst dargestellt, wenn **alle** Daten geladen sind
  2. Sobald "irgendwelche" Daten (Rezept **oder** Feedback) geladen wurden, diese Daten sofort anzeigen.
  3. Auf die **Rezepte warten**, und die Seite erst dann darstellen. Falls Bewertungen "schneller" sind, die Bewertungen nicht vorab anzeigen.
- Für 1. setzen wir ein `Suspense` um die ganze Seite (z.B. in dem wir `loading.tsx` verwenden)
- Für 2. setzen wir jeweils ein `Suspense` um die **Komponente**, in der die Daten geladen werden
- Für 3. starten wir beide Requests sofort parallel beim Rendern der Page-Komponente
  - Diese wartet dann auf den Rezept-Request (`await fetchRecipe`)
  - Das Promise für den Bewertungen-Request wird an die `FeedbackList`-Komponente gegeben
  - In der `FeedbackList`-Komponente wird auf die Daten gewartet (`await fetchFeedback`)
  - Um die `FeedbackList`-Komponente herum wird eine `Suspense`-Komponente gelegt.

---

### Übung: Suspense und Streaming

- **Lade die Bewertungen zu einem Rezept**
- Die Route `/app/recipe/[recipeId]/page.tsx` verwendet die `RecipePageContent`-Komponente um das Rezept darzustellen
- In der `RecipePageContent`-Komponente musst du nun noch die Bewertungen laden (`fetchFeedback`) und mit der `FeedbackListLoader`-Komponente anzeigen
  - (Die `fetchFeedback`-Funktion und die `FeedbackListLoader`-Komponente sind bereits fertig)
- Überlege dir, an welchen Stellen es aus deiner Sicht fachlich Sinn macht auf Daten zu warten und setze die `Suspense`-Komponente entsprechend
  - Du kannst die beiden Requests künstlich langsam machen, in dem Du in `demo-config.ts` bei `slowDown_GetRecipe` und `slowDown_GetFeedbacks` einen Timeout (in ms) einstellst.
- Falls du bei der vorherigen Übung nicht fertig geworden bist, kopiere die fertigen Dateien aus `30_dynamic_segments` in deinen Workspace-Ordner.
- Lösung in `schritte/30_suspense`

---

## Aufteilung in Server-Client-Komponenten

<!-- .element: class="todo" -->Entweder komplett raus, oder hinter die Client-Komponenten Übung

---

### Konsequenzen

- React Server Component können keine Hooks verwenden und auch sonst nicht interaktiv sein
  - `useState` oder `useEffect` zum Beispiel gehen beide nicht
- Für alle Stellen, an denen wir Interaktivität benötigen, müssen wir **Client Components** bauen
- Das sind Komponenten, die sich wie bisherige "klassische" React-Komponenten verhalten:
  - Ihr JavaScript-Code wird bei Bedarf zum Client geschickt
  - der JavaScript-Code wird im Client ausgeführt
- Eine Client-Komponente wird mit der `"use client"`-Direktive am Beginn einer Datei ausgezeichnet:
- ```tsx
  "use client";

  export function FeedbackForm() {
    // hier jetzt Hooks etc. erlaubt
    const [name, setName] = useState("");
  }
  ```

---

### Konsequenzen

<img src="slides%2Fimages%2Freact-anwendung.png" style="max-height:900px;float:left"/>

- **Eine "normale" React-Anwendung im Browser**:
- State befindet sich oben
- Daten werden runtergereicht ("props")
- Callbacks werden runtergereicht
- Über Callbacks kann State-Veränderung ausgelöst werden

---

### Konsequenzen

<img src="slides%2Fimages%2Ffullstack-anwendung.png" style="max-height:900px;float:left"/>

- **Komponenten auf dem Server**:
- Auf dem Server gibt es keinen State!
- ...und keine Interaktion
- Wir haben nur statischen Content (RSC)
- Wir haben **Daten**
  - z.B. aus DB, Microservice, Filesystem...

---

### Konsequenzen

<img src="slides%2Fimages%2Finteraktives-muss-auf-den-client.png" style="max-height:900px;float:left"/>

- Bestimmte Teile **müssen** auf den Client
  - alles was mit Interaktion zu tun hat
    - z.B. Event-Handler
  - alles was Browser-spezifisch ist
    - z.B. `window`

---

### Konsequenzen

<img src="slides/images/url-aendern.png" style="max-height:900px;float:left"/>

- Properties müssen Client-Server-Grenze überwinden
- Müssen serialisierbare Daten sein
- Keine (Callback-)Funktionen!
- Keine Props und State-Änderungen
- Stattdessen: _Server-Requests_
  - z.B. URL ändern
  - z.B. Search-Parameter

---

### Konsequenzen

<!-- .slide: class="left" -->

- Eine **Client-Komponente**
  - wird mit `use client` gekennzeichnet
  - Alle Komponenten darunter werden dann als Client-Komponenten angenommen
  - Ist auf Client-seite interaktiv (JavaScript-Code im Browser vorhanden)
  - Muss eine neue **Darstellung** vom Server anfordern
  - Beispiel, das die Search-Parameter in der URL verändert:
- ```tsx
  "use client";

  import { useSearchParams } from "next/navigation";

  export default function OrderByButton({ orderBy, children }) {
    const searchParams = useSearchParams();

    const currentOrderBy = searchParams.get("orderBy");
    const currentPage = searchParams.get("page");

    const newParams = new URLSearchParams(searchParams);
    newParams.set("order_by", orderBy);

    const href = `/recipes?${newParams.toString()}`;

    return <Link href={href}>{children}</Link>;
  }
  ```

---

### Konsequenzen

<!-- .slide: class="left" -->

- Auf der **Server-Seite**:
  - Statt "klassischer" Props werden hier nun Search Params verwendet
  - Routen-Komponenten (`page.tsx`) in Next.js können sich die Search-Parameter als Property `searchParams` übergeben lassen
    - (`params` für Segmente im Pfad, `searchParams` für die Query-Parameter hinter dem `?` in der URL)
- ```tsx
  type RecipeListPageProps = {
    searchParams: {
      page?: string;
      orderBy?: "likes" | "time";
    };
  };

  export default async function RecipeListPage({
    searchParams,
  }: RecipeListPageProps) {
    // 'page' in Zahl konvertieren, 0 als Default
    const page = parseInt(searchParams.page || "0");
    const orderBy = searchParams.orderBy;

    const result = fetchRecipes(page, orderBy);

    return <ReipceList recipes={result.content} />;
  }
  ```

---

### Server- und Client-Komponenten

- Alle Komponenten, die von einer Client-Komponente (`use client`) aus gerendert werden (direkt oder indirekt) sind Client Komponenten
- Das heißt deren JavaScript-Code wird ebenfalls zum Client geschickt und dort ausgeführt
- Komponeten, die nicht explizit gekennzeichnet sind, können **beide** Rollen einnehmen
- Sie müssen dann aber auch Anforderungen beider Komponenten-Typen erfüllen:
  - **keine** Verwendung von Server-APIs wie Datenbanken
  - **keine** Verwendung von Browser-spezifischen APIs (z.B. `window` oder hooks)
- Wenn sie als Server Component verwent werden, wird ihr JavaScript-Code nicht zum Client geschickt
- Next.JS rendert die Client Component serverseitig vor
- Erst wenn eine Komponente als Client Komponente benötigt wird, der JS-Code vom Server abgefragt

---
## (Server) Actions

---
### Server Actions

- <!-- .element: class="demo" -->Like Action!
- **Server Actions** sind Funktionen, die auf dem Server laufen und aus einer Client-Komponente aufgerufen werden können

  - Eine Art remote-procedure Call
  - React bzw. Next.js stellt für jede Server-Action-Funktion transparent einen HTTP-Endpunkt zur Verfügung
  - Die Funktion kann beliebige Parameter entgegen nehmen und zurückliefern
    - Einschränkung: Werte müssen serialiserbar sein
    - Die Funktion **muss** asynchron sein, da die Kommunikation immer asynchron ist
    - Die Funktionen müssen in einer Datei stehen, die explizit mit `"use server"` gekennzeichnet ist

- ```typescript
  "use server";

  export async function addLike(recipeId: string) {
    const result = await addLikeToRecipe(receipdId);

    return { newLikes: result.newLikes };
  }
  ```

---

### Server Actions

- Der Aufruf einer Server-Action-Funktion erfolgt aus der Komponente wie bei einer normalen Funktion
- ```tsx
  function LikesWidget({ recipe }) {
    const [likes, setLikes] = useState(recipe.likes);

    const onSaveClick = async () => {
      // SERVER REQUEST !
      const newLikes = await addLike(recipe.id);
      setLikes(newLikes);
    };

    return <div onClick={handleLikeClick}>{recipe.likes}</div>;
  }
  ```

---

### Aktualisieren der UI
<!-- .slide: data-state="nextjs-exkurs" -->  
- In dem gezeigten Beispiel wird die Darstellung der Likes aktualisiert, wenn der Request zurückkommt
- Die gecachte Darstellung, bleibt allerdings unverändert
- Wenn ein anderer Nutzer die Seite aufruft, wird die alte Darstellung aus dem Cache geliefert und die Anzahl der Likes stimmt nicht
- Aus diesem Grund muss hier Next.js mitgeteilt werden, welche Routen "revalidiert" werden müssen
- Das kann mit den gezeigten Funktionen `revalidatePath` bzw. `revalidateTags` passieren
- ```tsx
  "use server";

  export async function addLike(recipeId: string) {
    const result = await addLikeToRecipe(receipdId);

    revalidateTag("recipes"); // Liste mit den Rezepten
    revalidateTag(`recipes/${recipeId}`); // Einzeldarstellung

    return { newLikes: result.newLikes };
  }
  ```

- Das funktioniert in unserem Beispiel deswegen, weil die `fetch`-Aufrufe die für die Liste- bzw. Einzeldarstellung entprechende Tags gesetzt haben:

* ```typescript
  async function fetchRecipes() {
    fetch("...", { next: { tags: ["recipes"] } });
    // ...
  }

  async function fetchRecipe(recipeId: string) {
    fetch("...", { next: { tags: [`recipes/${recipeId}`] } });
    // ...
  }
  ```
### useTransition

- Mit dem `useTransition`-Hook von React 18 können Updates priorisiert werden
  - Seit React 19 geht das auch mit [asynchronen Funktionen](https://react.dev/blog/2024/04/25/react-19#actions)
- Dazu wird eine Funktion angegeben, in der eine "Transition" beschrieben ist
- Das geht in Client (auch ohne Framework) und Server Komponenten
- Solange diese Funktion läuft, ist die Komponenten im `pending`-Zustand
- Mit Client-seitigem React kann auf diese Weise zum Beispiel sichergestellt werden, dass Updates, die durch Benutzer-Eingaben entstehen, nicht vom Rendern eines Suchergebnisses unterbrochen werden
  - Hier wäre das Aktualisieren des Suchergebnisses weniger "dringend", als die Darstellung der aktualisierten Eingabe
- Der `useTransition`-Hook liefert zwei Parameter zurück:
  - `const [isPending, startTransition] = useTransition()`
- Mit `startTransition` kann die Transition gestartet werden (Funktion übergeben)
- `isPending` liefert zurück, ob die Transition gerade läuft
* ```tsx
     "use client";
     function LikesWidget() {
       const [isPending, startTransition] = useTransition();
  
       const handleButtonClick = () => {
         startTransition( () => {
           // ...
         })
       }
  
       if (isPending) {
         return "Transition running..."
       }
  
       return <button onClick={handleButtonClick}>Start Transition...</button>
     }
  ```
---
### Fehler in Transition

- Wenn in einer Transition ein Fehler auftritt, wird die nächsthöhere ErrorBoundary-Komponente gerendert
- So kannst Du genau steuern, wo auf Fehler reagiert werden soll
* ```tsx
  function Page() {
    return <ErrorBoundary errorComponent={ () => "Liking failed!"}>
      <LikesWidget />
    </ErrorBoundary>
  }
  ```

---
### Server Actions und Transitions
- Server Actions können mit einer Transition umschlossen werden
- Dann kannst Du prüfen, ob die Action noch läuft und ggf. einen Hinweis rendern
- Mit einem Error Boundary kannst auf Fehler reagieren
- Damit sparst Du dir dann das manuelle Tracking eines Requests (läuft, erfolgreich, fehlerhaft, ...)
- ```tsx
  export function LikesWidget() {
    const [likes, setLikes] = useState(recipe.likes);
    const [isPending, startTransition] = useTransition();

    const onSaveClick = () => {
       startTransition( async () => {
         const newLikes = await addLike(recipe.id);
         setLikes(newLikes);
       })
     };

     return isPending ? <div>Like is updating!<div> : <div onClick={handleLikeClick}>{recipe.likes}</div>;
  }
  ```

---

## Optimistische Aktualisierungen

---
### Optimistische Aktualisierungen

<!-- .element: class="demo" -->Likes-Button mit useOptimistic

---
### Optimistische Aktualisierungen

- Mit React 19 gibt es einen neuen Hook: [useOptimistic](https://19.react.dev/reference/react/useOptimistic)
- Dieser stellt einer Komponente einen "optimistischen" Zustand zur Verfügung, solange eine async Action läuft
  - Das geht in Client Komponenten (auch ohne Framework) und in Server Components
- Damit kannst Du das erwartete Ergebnis einer Action bereits in der UI visualisieren
- Benutzer bekommen so ein schnelleres Feedback:
  - während die Action läuft das "optimistische" Ergebnis
  - danach das neue Ergebnis (oder altes im Fehlerfall)

---
### Der useOptimistic-Hook
<!-- .element: class="left" -->
- `useOptimistic` erwartet zwei Parameter:
  - den aktuellen "echten" Zustand (ohne Action)
  - eine (Reducer) Update-Funktion, die auf Basis des aktuellen Zustands und einer Action den optimistischen Zustand berechnet
- Der Hook liefert ein Array mit zwei Werten zurück:
  - den berechneten optimistischen Zustand (oder den echten, falls keine Action läuft)
  - eine Dispatch-Funktion, die die Update-Funktion auslöst, um einen optimistischen Zustand zu berechnen
* ```tsx
  function LikesWidget() {
    const [likes, setLikes] = useState(0);
    const [optimisticLikes, changeLikes] = useOptimistic(likes, (currentLikes, action) => {
      // action kann beliebiges Objekt sein, wie in einer Reducer-Funktion
      // hier soll es der Wert sein, um den currentLikes erhöht/gesenkt werden soll
      return currentLikes + action;
    });
  
    const handleIncreaseLikes = () => {
      startTransition(async () => {
        setOptimisticLikes(+1);
        const result = await increaseLikes(recipe.id);
        setLikes(result.newLikes);
      });
    };
  
    return <button>{optimisticLikes}</button>
  
  }
  ```
---

### Übung: Server Actions

- **Baue eine Server Action zum "liken" eines Rezeptes**
- Implementiere die Logik zum Hochzählen in der Server-Action-Funktion `increaseLikes` in `recipe-actions.ts`
  - Die Funktion zum Speichern der Likes (`saveLike`) ist bereits fertig. Du übergibst dieser Funktion nur die Rezept-Id (`recipeId`), die Likes werden dann Backend-seitig hochgezählt
  - Weitere Todos findest Du in `recipe-actions.ts`
- Ergänze dann die Komponente in `LikesWidget.tsx`. Hier musst Du nun deinen neue Server-Action-Funktion aufrufen.
  - Auch in dieser Datei findest du Todos
- Fertige Lösung in: `nextjs_schritte/40_actions`
- **Optional**: Kannst Du die Ausführung der Server Action mit einer Transition ummanteln?
- **Optional**: Kannst Du mit `useOptimistic` ein "optimistisches" Ergebnis zurückliefern?

---

### Formulare

- Ab React 19 können Formulare eine Action als `action`-Attribute übergeben bekommen
  - [Dokumentation: form-Komponente](https://19.react.dev/reference/react-dom/components/form)
- Die entsprechende Action-Funktion wird dann beim Submit des Formulars aufgerufen
- Übergeben wird der Form-Inhalt mit einem [FormData-Objekt](https://developer.mozilla.org/en-US/docs/Web/API/FormData)
  - Das bietet sich m.E. insb. für uncontrolled Formulare an (ohne lokalen State)
  - Kann z.B. mit [React Hook Form](https://react-hook-form.com/) verwendet werden
- Die Action kann eine Client- oder Server-Action sein
- ```tsx
  export function FeedbackForm() {
    async function saveForm(data: FormData) {
      "use server";
      // AUF DEM SERVER: Formular speichern
      const title = data.get("title");
      // ...
    }

    return (
      <form action={saveForm}>
        <input name="title" />
        <input name="body" />
      </form>
    );
  }
  ```