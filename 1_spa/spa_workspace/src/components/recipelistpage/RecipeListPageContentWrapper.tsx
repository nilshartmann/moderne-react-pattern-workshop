import { GlobalLoadingIndicator } from "../material/GlobalLoadingIndicator.tsx";
import RecipeListPageContent from "./RecipeListPageContent.tsx";
import React from "react";

// Diese Komponente existiert nur, weil in den Übungen erst später eine
//  globale Suspense-Komponente eingebaut wird, aber die RecipeList
//  schon Suspense-Queries verwendet wird.
// In einer echten Anwendung gibt es diese Komponente nicht:
//   - Suspense würde entweder in einer Route/Layout-Komponente gerendert werden
//   - oder direkt in der RecipeListPageContent oder RecipeList, je nach Anforderung
export default function RecipeListPageContentWrapper() {
  return (
    <React.Suspense fallback={<GlobalLoadingIndicator />}>
      <RecipeListPageContent />
    </React.Suspense>
  );
}
