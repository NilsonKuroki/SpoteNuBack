import {Request, Response} from 'express'
import {UserBusiness} from '../business/UserBusiness'
import { Authenticator } from '../services/Authenticator'
import {IdGenerator} from '../services/IdGenerator'
import { HashManager } from "../services/HashManager"
import {UserType, userOnlineOutputDTO} from '../model/User'
import { GenericError } from '../errors/genericError'
import { NotFoundError } from '../errors/notFoundError'


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
                throw new GenericError("Sua senha tem que possuir no minimo 6 caracteres")
            }

            if(user.email.indexOf("@") === -1 || user.email.indexOf(".com") === -1){
                throw new GenericError("email invalido")
            }

            if(user.name.length < 3){
                throw new GenericError("Seu nome deve ter no minímo, 3 caracteres")
            }

            const idGenerator = new IdGenerator()
            const id = idGenerator.generate()

            const hashManager = new HashManager()
            const passwordHash = await hashManager.hash(user.password) 

            const authenticator = new Authenticator()
            const token = authenticator.generateToken({id: id, type: UserType.not_paying_listener})

            const userBusiness = new UserBusiness()
            await userBusiness.signupNotPayingListener(
                id,
                user.name,  
                user.nickname,
                user.email,
                passwordHash,
                UserType.not_paying_listener
            )

            res.status(200).send({token: token})
        } catch (error) {
            res.status(error.statusCode || 400).send({
                message: error.message
            })
        }
    }

    async signupAdmin(req: Request, res: Response){
        try {
            const token = req.headers.authorization
            const authenticator = new Authenticator()

            const dataToken = authenticator.getData(token)

            if(dataToken.type !== UserType.admin){
                throw new GenericError("permission denied (need to be a admin to approve other)")
            }

            const idGenerator = new IdGenerator()
            const id = idGenerator.generate()

            const data = {
                id,
                name: req.body.name,
                nickname: req.body.nickname,
                email: req.body.email,
                password: req.body.password,
                type: UserType.admin
            }

            if(data.password.length < 10){
                throw new GenericError("Sua senha tem que possuir no minimo 10 caracteres")
            }

            if(data.email.indexOf("@") === -1 || data.email.indexOf(".com") === -1){
                throw new GenericError("email invalid")
            }

            if(data.name.length < 3){
                throw new GenericError("Seu nome deve ter no minímo, 3 caracteres")
            }
        
            const hashManager = new HashManager()
            const hashPassword = await hashManager.hash(data.password)

            const userBusiness = new UserBusiness()
            await userBusiness.signupAdmin(
                data.id,
                data.name,
                data.nickname,
                data.email,
                hashPassword,
                data.type
            )
            

            res.status(200).send("admin approved")
        } catch (error) {
            res.status(error.statusCode || 400).send({message: error.message})
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
                type: UserType.band,
                description: req.body.description,
                band_approved: 0
            }

            if(data.password.length < 6){
                throw new GenericError ("Sua senha deve ter no minímo 6 caracteres")
            }

            if(data.email.indexOf("@") === -1 || data.email.indexOf(".com") === -1){
                throw new GenericError("Email invalid")
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
            res.status(error.statusCode || 400).send({error: error.message})
        }
    }

    async allBands(req: Request, res: Response){
        try {
            const token = req.headers.authorization
            
            const authenticator = new Authenticator()
            const dataToken = authenticator.getData(token)

            if(dataToken.type !== UserType.admin){
                throw new GenericError("É necessário ser um administrador!")
            }

            const userBusiness = new UserBusiness()
            const bands = await userBusiness.allBands()

            if(!bands){
                throw new NotFoundError("Bandas não encontradas")
            }

            res.status(200).send({bands: bands})
        } catch (error) {
            res.status(error.statusCode || 400).send({message: error.message})
        }
    }

    async approveBand(req:Request, res: Response){
        try {
            const token = req.headers.authorization

            const authenticator = new Authenticator()
            const dataToken = authenticator.getData(token)

            if(dataToken.type !== UserType.admin){
                throw new GenericError("É necessário ser administrador!")
            }

            const id = req.body.id

            const userBusiness = new UserBusiness
            const band = await userBusiness.getBandById(id)

            if(band.band_approved === 1){
                throw new GenericError("A banda ja tinha sido aprovado!")
            }

            await userBusiness.approveBand(id)

            res.status(200).send("usuario aprovado")
        } catch (error) {
            res.status(error.statusCode || 400).send({message: error.message})
        }
    }

    async login(req: Request, res: Response): Promise<any>{
        try {
            const data = {
                emailOrNickname: req.body.login,
                password: req.body.password
            }

            const userBusiness = new UserBusiness()
            const user = await userBusiness.getUserByEmailOrNickname(data.emailOrNickname)

            const hashManager = new HashManager()
            const hashCompare = await hashManager.compare(data.password, user.getPassword())

            if(!user || !hashCompare){
                throw new GenericError("Wrong credentials")
            }

            const authenticator = new Authenticator()
            const token = authenticator.generateToken({id: user.getId(), type: user.getType()})

            res.status(200).send({token: token})
        } catch (error) {
            res.status(error.statusCode || 400).send({message: error.message})
        }
    }

    async userOnline(req: Request, res: Response): Promise<any>{
        try {
            
            const token = req.headers.authorization

            const authenticator = new Authenticator()
            const tokenData = authenticator.getData(token)

            const userBusiness = new UserBusiness()
            const user = await userBusiness.userOnline(tokenData.id)

            if(!user){
                throw new GenericError("usuário não encontrado")
            }

            const UserFilter: userOnlineOutputDTO = {
                id: user.getId(),
                name: user.getName(),
                nickname: user.getNickname(),
                email: user.getEmail(),
                type: user.getType()
            }

            res.status(200).send(UserFilter)
        } catch (error) {
            res.status(error.statusCode || 400).send({message: error.messsage})
        }
    }
}