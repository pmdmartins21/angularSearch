export class Photo {
    
    constructor(
        public id:string,
        public image_url : string,
        public title:string,
        public author:string,
        public date_added:string,
        public likes:number,
        public downloads:number,
        public tags: string[],
        public favorite:boolean
    ) {}

}