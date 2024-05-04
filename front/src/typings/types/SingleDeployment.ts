export type SingleDeploymentProps = {
  id: number;
  date: string;
  time: string;
  location: string;
  gameMode: string;
  status: "active" | "cancelled";
};
