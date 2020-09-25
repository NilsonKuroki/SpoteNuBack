import { BaseDatabase } from "./BaseDatabase";
import {User, UserType, allBandsOutputDTO, bandOutputDTO} from "../model/User"
import { NotFoundError } from '../errors/notFoundError'

export class UserDatabase extends BaseDatabase{
    tableName: string ="Spotinu_Users"

    public async signupNotPayingListener(
        id: string, 
        name: string, 
        nickname: string, 
        email: string, 
        password: string,
        type: UserType
        ): Promise<void>{
        try {
            await super.getConnection().raw(`
                INSERT INTO ${this.tableName}(id, name, nickname, email, password, type)
                VALUES (
                    "${id}",
                    "${name}",
                    "${nickname}",
                    "${email}",
                    "${password}",
                    "${type}"
                )`
            )
        } catch (error) {
            throw new Error(error.message)
        }
    }

    public async signupAdmin(
        id:string,
        name: string,
        nickname: string,
        email:string,
        password: string,
        type: UserType
    ): Promise<void>{
        try {
            await this.getConnection().raw(`
                INSERT INTO ${this.tableName}(id, name, nickname, email, password, type)
                    VALUES (
                        "${id}",
                        "${name}",
                        "${nickname}",
                        "${email}",
                        "${password}",
                        "${type}"
                    )`
            )            
        } catch (error) {
            throw new Error(error.message)
        }
        
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
    ): Promise<void>{
        try {
            await this.getConnection().raw(`
                    INSERT INTO ${this.tableName}(id, name, nickname, email, password, type, description, band_approved)
                        VALUES (
                            "${id}",
                            "${name}",
                            "${nickname}",
                            "${email}",
                            "${password}",
                            "${type}",
                            "${description}",
                            ${band_approved}
                        )`
                )              
        } catch (error) {
            throw new Error(error.message)
        }
    }

    public async approveBand(id: string):Promise<void>{
        await this.getConnection()
        .raw(`
            UPDATE ${this.tableName} 
            SET band_approved = 1
            WHERE id = "${id}";
        `)
    }

    public async allBands(): Promise<allBandsOutputDTO[]>{
        try {
            const results = await this.getConnection()
            .select("id", "name", "nickname", "email", "band_approved")
            .from(this.tableName)
            .where({type: "band"})

            return results
        } catch (error) {
            throw new Error(error.message)
        }
    }

    public async getBandById(id: string):Promise<bandOutputDTO>{
        try {
            const result = await this.getConnection()
            .select("id", "name", "nickname", "email", "description", "band_approved")
            .from(this.tableName)
            .where({id})

            const data= result[0]
            const band: bandOutputDTO = {
                id: data.id,
                name: data.name,
                nickname: data.nickname,
                email: data.email,
                description: data.description,
                band_approved: data.band_approved
            }

            return band
        } catch (error) {
            throw new Error (error)
        }
    }

    public async getUserByEmailOrNickname(login: string): Promise<User> {
        try {
            const result = await this.getConnection()
            .select("*")
            .from(this.tableName)
            .where({email: login})
            .orWhere({nickname: login})
            
            const data = result[0]

            const user = new User(
                data.id, 
                data.name, 
                data.nickname, 
                data.email, 
                data.password, 
                data.type)

            return user

        } catch (error) {
            throw new Error(error)
        }
    }

    public async userOnline(id: string):Promise<User>{
        try {
            const result = await this.getConnection()
            .select("*")
            .from(this.tableName)
            .where({id: id})
            //gera um objeto do tipo user, com senha e tudo

            const data = result[0]
            const user = new User(
                data.id, 
                data.name, 
                data.nickname, 
                data.email, 
                data.password, 
                data.type)

            return user
        } catch (error) {
            throw new Error(error)
        }
    }
}

