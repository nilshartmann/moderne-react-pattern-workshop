import * as React from "react"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/(a_und_b)/a")({
  component: RouteComponent,
})

function RouteComponent() {
  return "Hello /(a_und_b)/a!"
}
