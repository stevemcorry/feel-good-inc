export default class UserDayObj{
    constructor(
        private date:string, 
        private mood: number, 
        private tags: Array<[]>,
        private temperature: number,
        private precipitation: string,
        private location: Array<[]>,
        private screenTime: number,
        private healthFitness: string
    ){}

}