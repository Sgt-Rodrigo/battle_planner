export type DeploymentValues = {
    id: number;
  date: string;
  time: string;
  location: string;
  gameMode: string;
  status: "active" | "cancelled";
}


export type DeploymentFormValues = Omit<DeploymentValues, 'id'| 'status'>