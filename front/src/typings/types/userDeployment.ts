export type userDeployment = {
    id: number,
    date: string,
    time: string,
    location:string,
    gameMode: string,
    status: 'active' | 'cancelled'
}