
export type Location = {
    id: string;
    name: string;
    lat: number;
    lon: number;
}

export type Flow = {
    origin: string;
    dest: string;
    count: number;
}