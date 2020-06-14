import { IImage } from './iimage';


export interface IProject {
    id: number,
    name: string,
    images: Array<IImage>,
    githubUrl: string,
    color: string,
    siteUrl?: string,
}
