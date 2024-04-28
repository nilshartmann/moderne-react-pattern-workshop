import ButtonBar from "../ButtonBar.tsx";
import { NavButtonBar } from "../NavButtonBar.tsx";
import { OrderButton } from "./OrderButton.tsx";

export default function RecipeListNavBar() {
  return (
    <NavButtonBar align={"right"}>
      <ButtonBar>
        <OrderButton orderBy={undefined}>Newest first</OrderButton>
        <OrderButton orderBy={"rating"}>Best rated</OrderButton>
        <OrderButton orderBy={"time"}>Shortest time</OrderButton>
      </ButtonBar>
    </NavButtonBar>
  );
}