import {UserDatabase} from "../data/UserDatabase"
import {User, UserType, allBandsOutputDTO, bandOutputDTO} from "../model/User"

export class UserBusiness {
    private userDatabase = new UserDatabase()

    public async signupNotPayingListener(
        id: string,
        name: string, 
        nickname: string, 
        email: string, 
        password: string,
        type: UserType
    ):Promise<void>{
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
        type: UserType
    ):Promise<void>{
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
        type: UserType,
        description: string,
        band_approved: number
    ):Promise<void>{
        await this.userDatabase.signupBand(
            id, name, nickname, email, password, type, description, band_approved
        )
    }

    public async approveBand(id:string):Promise<void>{
        await this.userDatabase.approveBand(id)
    }

    public async allBands():Promise<allBandsOutputDTO[]>{
        return await this.userDatabase.allBands()
    }

    public async getBandById(
        id: string
    ):Promise<bandOutputDTO>{
        return await this.userDatabase.getBandById(id)
    }

    public async getUserByEmailOrNickname(
        login:string
        ):Promise<User>{
        const user = await this.userDatabase.getUserByEmailOrNickname(login)
        return user
    }

    public async userOnline(
        id: string
        ): Promise<User>{
        return await this.userDatabase.userOnline(id)
    }
}