import { NestFactory } from "@nestjs/core"
import { async } from "rxjs"
import { AppModule } from "./app.modules"


const start = async () => {
    try {
        const PORT = process.env.PORT || 5000
        const app = await NestFactory.create(AppModule)
        app.enableCors()
        await app.listen(PORT, ()=> console.log(`start server on ${PORT} port`))
    } catch (e) {
        console.log(e)
    }
}

start()