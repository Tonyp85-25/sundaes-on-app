import { SetStateAction, Fu, FunctionComponent } from "react";

export enum OrderPhase {
  inProgress,
  review,
  completed,
}

export interface OrderProps {
  setOrderPhase: React.Dispatch<SetStateAction<OrderPhase>>;
}

export interface OrderComponent extends FunctionComponent<OrderProps> {}
