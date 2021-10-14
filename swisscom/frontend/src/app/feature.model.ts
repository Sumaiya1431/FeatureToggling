export class Feature{

    constructor(public id:number,
        public  technicalName: string,
        public inverted: boolean,
        public customerIds: string[],
        public archive:boolean,
        public displayName?: string,
        public expiresOn?: Date,
        public description?: string){}

}