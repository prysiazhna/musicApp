import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";
import { NestExpressApplication } from '@nestjs/platform-express';

const start = async () => {
  try {
    const PORT = process.env.PORT || 3000;
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    app.enableCors();
    await app.listen(PORT, () => console.log(`server started on PORT ${PORT}`))
  } catch (e) {
    console.log(e);
  }
}

start()

//tAqX892uyza39xhS
//admin