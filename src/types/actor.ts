export type Actor = {
    id: number;
    firstname: string;
    lastname: string;
    lastUpdate: Date;
}

export type RequestActorDto = {
    firstName: string;
    lastName: string;
}