import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import expressBasicAuth from "express-basic-auth";

export const setupSwagger = (app: INestApplication): void => {
  app.use(
    [process.env.SWAGGER_PATH], // docs(swagger end point)에 진입시
    expressBasicAuth({
      challenge: true,
      users: {
        [process.env.SWAGGER_USER as string]: process.env.SWAGGER_PASSWORD as string, // 지정된 ID/비밀번호
      },
    }),
  );

  const documentBuilder = new DocumentBuilder()
    .setTitle("[Local] 플로링크 api")
    .setDescription("The 플로링크 API description")
    .setVersion("1.0")
    .addTag("플로링크")
    .addApiKey({ type: "apiKey", in: "header", name: "x-api-key" }, "x-api-key")
    .addBearerAuth({ type: "apiKey", in: "header", name: "authorization" })
    .addCookieAuth("connect.sid")
    .addServer(`https://${process.env.SERVER_DOMAIN}`)
    .addServer(`http://localhost:${process.env.PROJECT_MSA_GATEWAY_HTTP_PORT}`)
    .build();

  const document = SwaggerModule.createDocument(app, documentBuilder);
  const swaggerOption = {
    swaggerOptions: {
      persistAuthorization: true, // Swagger에서 저장된 Bearer Token이 날아가지 않게 해줌(편의성)
    },
  };
  SwaggerModule.setup(process.env.SWAGGER_PATH as string, app, document, swaggerOption);
};
