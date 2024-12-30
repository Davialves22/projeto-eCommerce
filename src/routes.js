import { Router } from "express"

const routes = new Router()

routes.get("/", (request,response) =>{
    return response.json ({message: "Olá cidadão"})
})

export default routes