export class User{
    constructor(
        private id: string,
        private name: string,
        private nickname: string,
        private email: string,
        private password: string,
        private type: type,
        private description?: string,
        private band_approved?: string
    ){}

    getId():string{
        return this.id
    }
    getName():string{
        return this.name
    }
    getNickname(){
        return this.nickname
    }
    getEmail():string{
        return this.email
    }
    getPassword():string{
        return this.password
    }
    getType():string{
        return this.type
    }
    getdescription():string{
        return this.description
    }
    getBand_Approved():string{
        return this.band_approved
    }

    setId(id:string){
        this.id = id
    }
    setName(name:string){
        this.name = name
    }
    setNickname(nickname:string){
        this.nickname = nickname
    }
    setEmail(email:string){
        this.email = email
    }
    setPassword(password:string){
        this.password = password
    }
    setdescription(description:string){
        this.description = description
    }
    setBand_Approved(band_approved:string){
        this.band_approved = band_approved
    }

}

export enum type {
    band = "band",
    paying_listener = "paying_listener",
    not_paying_listener = "not_paying_listener",
    admin = "admin"
}