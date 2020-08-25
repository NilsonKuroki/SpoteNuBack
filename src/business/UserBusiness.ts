import {UserDatabase} from "../data/UserDatabase"
import {type} from "../model/User"

export class UserBusiness {
    private userDatabase = new UserDatabase()

    public async signupNotPayingListener(
        id: string,
        name: string, 
        nickname: string, 
        email: string, 
        password: string,
        type: type
    ){
        await this.userDatabase.signupNotPayingListener(
            id, name, nickname, email, password, type
        )
        
    }

    public async signupAdmin (
        id: string,
        name: string, 
        nickname: string, 
        email: string, 
        password: string,
        type: type
    ){
        await this.userDatabase.signupAdmin(
            id, name, nickname, email, password, type
        )
    }

    public async signupBand(
        id:string,
        name: string,
        nickname: string,
        email: string,
        password: string,
        type: type,
        description: string,
        band_approved: number
    ){
        await this.userDatabase.signupBand(
            id, name, nickname, email, password, type, description, band_approved
        )
    }

    public async approveBand(id:string){
        await this.userDatabase.approveBand(id)
    }

    public async allBands(){
        return await this.userDatabase.allBands()
    }

    public async getBandById(
        id: string
    ){
        return await this.userDatabase.getBandById(id)
    }

    public async getUserByNameOrNickname(
        login:string
        ){
        return await this.userDatabase.getUserByNameOrNickname(login)
    }
}