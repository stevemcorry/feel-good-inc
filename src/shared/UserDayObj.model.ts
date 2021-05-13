export default class UserDayObj{
    constructor(
        private mood: number, 
        private tags: Array<[]>,
        private date:string = "", 
        private temperature: number = 0,
        private precipitation: string = "",
        private location: Array<[]> = [],
        private screenTime: number = 0,
        private healthFitness: string = ""
    ){}

}