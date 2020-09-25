export class User{
    constructor(
        private id: string,
        private name: string,
        private nickname: string,
        private email: string,
        private password: string,
        private type: UserType,
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

    getType(): string{
        return this.type
    }
    convertUserRoleToString(type: UserType):string{
        if(type === UserType.not_paying_listener){
            return "not_paying_listener"
        }else if(type === UserType.paying_listener){
            return "paying_listener"
        }else if(type === UserType.admin){
            return "admin"
        }else{
            return "band"
        }
    }
    convertStringToUserType(type: string): UserType{
        if(type === "not_paying_listener"){
            return UserType.not_paying_listener
        }else if(type === "paying_listener"){
            return UserType.paying_listener
        }else if(type === "admin"){
            return UserType.admin
        }else{
            return UserType.band
        }
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

export interface allBandsOutputDTO{
    id: string,
    name: string,
    nickname: string,
    email: string,
    type: UserType
}

export interface bandOutputDTO{
    id: string,
    name: string,
    nickname: string,
    email: string,
    description: string,
    band_approved: number
}

export interface userOnlineOutputDTO {
    id: string,
    name: string,
    nickname:string,
    email: string,
    type: string
}

export enum UserType {
    band = "band",
    paying_listener = "paying_listener",
    not_paying_listener = "not_paying_listener",
    admin = "admin"
}

