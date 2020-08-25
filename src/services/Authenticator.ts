import * as jwt from 'jsonwebtoken'

export class Authenticator {
    public generateToken(
        input: authenticationData
    ):string{
        const token = jwt.sign(
            {
                id: input.id,
                type: input.type
            },
            process.env.JWT_KEY as string,
            {
                expiresIn: "10min",
            }
        )

        return token
    }

    public getData(token:string):authenticationData{
        const payload = jwt.verify(token, process.env.JWT_KEY as string) as any

        const result = {
            id: payload.id,
            type: payload.type
        }
        return result
    }
}

interface authenticationData {
    id:string,
    type:string 
}