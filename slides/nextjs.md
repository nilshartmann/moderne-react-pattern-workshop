# Fullstack React
<!-- .slide: id="t-nextjs" -->

---
## März 2023...

## <img src="slides/images/go-with-fullstack-framework.png">

---

## React empfiehlt "Fullstack-Framework"


<img src="slides/images/can-i-use-react-without-a-framework.png" style="height:900px">


(https://react.dev/learn/start-a-new-react-project#can-i-use-react-without-a-framework)

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

## Next.js

- https://nextjs.org/
- Features:
  - Unterstützung für React Server Components
  - SSR
  - Static Rendering
  - Datei-basiertes Routing
  - Caching und Preloading
- Wir konzentrieren uns heute auf die "Standard" React-Features, nicht die Next.js Erweiterungen
  - Mehr Informationen zu Next.js findest du aber in den Slides

---

### Der Next.js App-Router

- [App-Router](https://nextjs.org/docs/app/building-your-application/routing): neuer Router (seit Next.js 13.4), der RSC unterstützt
  - (der "alte" `pages`-Router unterstützt keine RSC)
---
### Der Next.js App-Router
<!-- .slide: class="with-fragments" -->
- Wir verwenden nun den Workspace `2_nextjs/nextjs_workspace`
- Ihr könnt dieses Verzeichnis nun in eurer IDE/Editor öffnen
  - Pakete installieren und starten machen wir später
- <!-- .slide: class="with-fragments" -->
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
<!-- .slide: class="with-fragments" -->
- **Idee:** Komponenten werden **nicht** im **Client** ausgeführt
- Sie stehen auf dem Client nur **fertig gerendert** zur Verfügung
- Der Server schickt lediglich _eine Repräsentation der UI_, aber _keinen JavaScript-Code_
- Das Format ist (im Gegensatz zu SSR) **nicht HTML**
- Kann aber mit SSR kombiniert werden
- React bzw. JavaScript muss also im Client laufen

---
### Arten von Komponenten
<!-- .slide: class="with-fragments" -->
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
<!-- .slide: class="with-fragments" -->
- **Neu: Server-Komponenten**

- werden auf dem **Server** gerendert
- oder im **Build** 🙄

- liefern UI (!) zum React-Client zurück (kein JavaScript-Code)
- Werden im Client nicht "ausgeführt"
- ...und können folglich nicht interaktiv sein (nur ohne JS)

---

### Arten von Komponenten
<!-- .slide: class="with-fragments" -->
- Die Komponenten gemischt werden:
- Server-Komponenten können Client-Komponenten einbinden
  - (umgekehrt geht es nicht)
- Dann wird alles bis zur ersten Client-Komponente gerendert an den Client gesendet
  - (Mit SSR auch die Client-Komponenten)

---
### Demo: Server Komponenten
<!-- .slide: class="with-fragments" -->
- <!-- .element: class="demo" -->`recipes`-Route anlegen (noch ohne Daten!)
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
<!-- .slide: class="with-fragments" -->
- Komponente, die Daten benötigen, können diese direkt _in der Komponente_ laden
- _Kann_ Latenz sparen und bessere Performance bringen

- "No Client-Server Waterfalls"

- Server Components können die Server-Infrastruktur nutzen (DB, Filesystem)

- 👉 Server-Komponenten können dazu _asynchron_ sein

---
<!-- .slide: class="with-fragments" -->
## Data Fetching

### Demo: Eine asynchrone Server-Komponente

1. `await fetchRecipe` in `recipes`-Route 
   - Daten an `RecipeList` übergeben

2. Zwei Komponenten, die die Daten brauchen: 
   - `RecipeList` und `RecipeListPaginationBar`
   - `RecipeList` auf Promise umstellen

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
<!-- .slide: class="with-fragments" -->
- Der Next.js-Workspace befindet sich in `2_nextjs/nextjs_workspace`
- ⚠️ Bitte dieses Verzeichnis in IDE/Editor öffnen
- In diesem Verzeichnis das Script `dev` ausführen
- Die Anwendung sollte dann auf http://localhost:8100 laufen
---
### Übung: Asynchrone Server Components
<!-- .slide: class="with-fragments" -->
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
<!-- .slide: class="with-fragments" -->
***Demo: Client-Komponenten***

* 🕵️‍♂️`IngredientsSection` durch `ConfigurableIngredientSection` ersetzen
* Klicken... warum geth das nicht? 🤔

---
### Server- und Client-Komponenten
<!-- .slide: class="with-fragments" -->
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
<!-- .slide: class="with-fragments" -->

* Eine Server-Komponente kann Client-Komponenten rendern
* Server-Komponenten können Properties an Client-Komponenten übergeben
  * Die Properties müssen serialiserbar sein
  * Promises gehen auch (!)

---
### Server Functions

* Mit der [`use server`](https://19.react.dev/reference/rsc/use-server)-Direktive können Module oder Funktionen als **Server Functions** gekennzeichnet werden
* Für diese Funktionen werden dann von Next.js automatisch HTTP Endpunkte zur Verfügung gestellt
* Die Funktionen können wir aus Server Components aufrufen
* Das ist dann eine Art Remote-Procedure-Call

---
### Demo: Server Function

* 🕵️‍♂️`ingredient-preferences`

---
### Server Actions und Progressive Enhancement

* **Server Actions** sind eine Spezialiserung einer Server Function
* Sie können genutzt werden, um Handler für Formular-Daten zu schreiben
* Auch sie laufen auf dem Server
* Bekommen das `FormData`-Objekt mit dem Inhalt des Formulars übergeben


* 🕵️‍♂️`LikesWidget` mit `form`