import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";
import { NestExpressApplication } from '@nestjs/platform-express';
import {ConfigService} from "@nestjs/config";

const start = async () => {
  try {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    const configService = app.get(ConfigService);
    const PORT =  configService.get<string>('PORT') || 3000;

    app.enableCors();
    await app.listen(PORT, () => console.log(`server started on PORT ${PORT}`))
  } catch (e) {
    console.log(e);
  }
}

start();
