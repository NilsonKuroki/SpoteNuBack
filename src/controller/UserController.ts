import {Request, Response} from 'express'
import {UserBusiness} from '../business/UserBusiness'
import { Authenticator } from '../services/Authenticator'
import {IdGenerator} from '../services/IdGenerator'
import { HashManager } from "../services/HashManager"
import {type} from '../model/User'


export class UserController{
    async signupNotPayingListener(req: Request, res: Response){
        try {
            const user = {
                name: req.body.name,
                nickname: req.body.nickname,
                email: req.body.email, 
                password: req.body.password, 
            }

            if(user.password.length < 6){
                throw new Error("Sua senha tem que possuir no minimo 6 caracteres")
            }

            if(user.email.indexOf("@") === -1 || user.email.indexOf(".com") === -1){
                throw new Error("email invalid")
            }

            if(user.name.length < 3){
                throw new Error("Seu nome deve ter no minímo, 3 caracteres")
            }

            const idGenerator = new IdGenerator()
            const id = idGenerator.generate()

            const hashManager = new HashManager()
            const passwordHash = await hashManager.hash(user.password) 

            const authenticator = new Authenticator()
            const token = authenticator.generateToken({id: id, type: type.not_paying_listener})

            const userBusiness = new UserBusiness()
            await userBusiness.signupNotPayingListener(
                id,
                user.name,  
                user.nickname,
                user.email,
                passwordHash,
                type.not_paying_listener
            )

            res.status(200).send({token: token})
        } catch (error) {
            res.status(400).send({
                message: error.message
            })
        }
    }

    async signupAdmin(req: Request, res: Response){
        try {
            const token = req.headers.authorization
            const authenticator = new Authenticator()

            const dataToken = authenticator.getData(token)

            if(dataToken.type !== type.admin){
                throw new Error("permission denied (need to be a admin to approve other)")
            }

            const idGenerator = new IdGenerator()
            const id = idGenerator.generate()

            const data = {
                id,
                name: req.body.name,
                nickname: req.body.nickname,
                email: req.body.email,
                password: req.body.password,
                type: type.admin
            }

            if(data.password.length < 10){
                throw new Error("Sua senha tem que possuir no minimo 10 caracteres")
            }

            if(data.email.indexOf("@") === -1 || data.email.indexOf(".com") === -1){
                throw new Error("email invalid")
            }

            if(data.name.length < 3){
                throw new Error("Seu nome deve ter no minímo, 3 caracteres")
            }

            const userBusiness = new UserBusiness()
            await userBusiness.signupAdmin(
                data.id,
                data.name,
                data.nickname,
                data.email,
                data.password,
                data.type
            )
            

            res.status(200).send("admin approved")
        } catch (error) {
            res.status(400).send({message: error.message})
        }
    }

    async signupBand(req: Request, res: Response){
        try {
            const idGenerator = new IdGenerator()
            const id = idGenerator.generate()

            
            const data = {
                id,
                name: req.body.name,
                nickname: req.body.nickname,
                email: req.body.email,
                password: req.body.password,
                type: type.band,
                description: req.body.description,
                band_approved: 0
            }

            if(data.password.length < 6){
                throw new Error ("Sua senha deve ter no minímo 6 caracteres")
            }

            if(data.email.indexOf("@") === -1 || data.email.indexOf(".com") === -1){
                throw new Error("Email invalid")
            }

            const hashManager = new HashManager()
            const password = await hashManager.hash(data.password)

            const userBusiness = new UserBusiness()
            await userBusiness.signupBand(
                id,
                data.name,
                data.nickname,
                data.email,
                password,
                data.type,
                data.description,
                data.band_approved
            )


            res.status(200).send("waiting approvation...")
        } catch (error) {
            res.status(400).send({error: error.message})
        }
    }

    async allBands(req: Request, res: Response){
        try {
            const token = req.headers.authorization
            
            const authenticator = new Authenticator()
            const dataToken = authenticator.getData(token)

            if(dataToken.type !== type.admin){
                throw new Error("É necessário ser um administrador!")
            }

            const userBusiness = new UserBusiness()
            const data = userBusiness.allBands()

            res.status(200).send({bands: data})
        } catch (error) {
            res.status(400).send({message: error.message})
        }
    }

    async approveBand(req:Request, res: Response){
        try {
            const token = req.headers.authorization

            const authenticator = new Authenticator()
            const dataToken = authenticator.getData(token)

            if(dataToken.type !== type.admin){
                throw new Error("É necessário sem administrador!")
            }

            const id = req.body.id

            const userBusiness = new UserBusiness
            const band = await userBusiness.getBandById(id)

            if(band.band_approved === 1){
                throw new Error("A banda ja tinha sido aprovado!")
            }

            await userBusiness.approveBand(id)

            res.status(200).send("usuario aprovado")
        } catch (error) {
            res.status(400).send({message: error.message})
        }
    }

    async login(req: Request, res: Response): Promise<any>{
        try {
            const data = {
                nameOrNickname: req.body.login,
                password: req.body.password
            }

            const userBusiness = new UserBusiness()
            const user = await userBusiness.getUserByNameOrNickname(data.nameOrNickname)

            if(!user){
                throw new Error("Este usuário, não existe")
            }

            const hashManager = new HashManager()
            const hashCompare = await hashManager.compare(data.password, user.password)

            if(!hashCompare){
                throw new Error("Combinação inválida")
            }

            const authenticator = new Authenticator()
            const token = authenticator.generateToken({id: user.id, type: user.type})

            res.status(200).send({token: token})
        } catch (error) {
            res.status(400).send(error.message)
        }
    }
}