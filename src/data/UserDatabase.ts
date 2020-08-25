import { BaseDatabase } from "./BaseDatabase";
import {type} from "../model/User"


export class UserDatabase extends BaseDatabase{
    tableName: string ="Spotinu_Users"

    public async signupNotPayingListener(
        id: string, 
        name: string, 
        nickname: string, 
        email: string, 
        password: string,
        type: type
        ){
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
        type: type
    ){
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
        type: type,
        description: string,
        band_approved: number
    ){
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

    public async approveBand(id: string){
        await this.getConnection()
        .raw(`
            UPDATE ${this.tableName} 
            SET band_approved = 1
            WHERE id = "${id}";
        `)
    }

    public async allBands(){
        try {
            const results = await this.getConnection()
            .select("id", "name", "nickname", "email", "band_approved")
            .from(this.tableName)
            .where({type: "band"})

            return results[0]
        } catch (error) {
            throw new Error(error.message)
        }
    }

    public async getBandById(id: string){
        try {
            const result= await this.getConnection()
            .select("id", "name", "nickname", "email", "description", "band_approved")
            .from(this.tableName)
            .where({id})

            return result[0]
        } catch (error) {
            throw new Error (error)
        }
    }

    public async getUserByNameOrNickname(login: string): Promise<any> {
        try {
            const result = await this.getConnection()
            .select("*")
            .from(this.tableName)
            .where({name: login})
            .orWhere({nickname: login})

            return result[0]
        } catch (error) {
            throw new Error(error)
        }
    }
}