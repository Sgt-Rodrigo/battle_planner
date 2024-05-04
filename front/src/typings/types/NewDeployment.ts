export type NewDeployment = {
    date: string,
    time:string,
    location: string,
    gameMode: string,
    userId: number,
}

export type NewDeploymentInput = Omit<NewDeployment, 'userId'>





