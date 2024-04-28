import { ReactNode } from "react";
import { Button, CheckLabel } from "../Button.tsx";
import { getRouteApi, Link } from "@tanstack/react-router";

const recipeListRoute = getRouteApi("/recipes/");

type OrderButtonProps = {
  children: ReactNode;
  orderBy?: "time" | "likes" | undefined;
};

export function OrderButton({ children, orderBy }: OrderButtonProps) {
  const currentOrderBy = recipeListRoute.useSearch({
    select: (s) => s.orderBy,
  });

  const checked = orderBy === currentOrderBy;
  return (
    <Button checked={checked}>
      <Link
        to={"/recipes"}
        search={(s) => ({ ...s, orderBy: orderBy })}
        disabled={checked}
      >
        <CheckLabel checked={checked}>{children}</CheckLabel>
      </Link>
    </Button>
  );
}
