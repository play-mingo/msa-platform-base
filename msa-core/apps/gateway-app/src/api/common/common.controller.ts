import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  Res,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import * as path from "path";
import { uploadOption } from "../../common/config/upload.option";
import { CommonService } from "./common.service";
import { FloristJwtAuthGuard } from "core/jwt/florist-jwt-auth.guard";
import { UserSessionLoginedAuthGuard } from "core/jwt/user-session-logined-auth.guard";
import { CheckVerifyNumDto, FileUploadDto, SendVerifyNumDto } from "./dto/common.dto";
import { ICheckVerifyNumResult, ISendVerifyNumResult } from "usecase/common/common.result";

@ApiTags("common")
@Controller("common")
export class CommonController {
  constructor(private readonly commonService: CommonService) {}

  /**
   * 인증번호 발송
   */
  @Post("sendVerifyNum")
  async sendVerifyNum(@Body() payload: SendVerifyNumDto): Promise<ISendVerifyNumResult> {
    return await this.commonService.sendVerifyNum(payload);
  }

  /**
   * 인증번호 확인
   */
  @Post("checkVerifyNum")
  async checkVerifyNum(@Body() payload: CheckVerifyNumDto): Promise<ICheckVerifyNumResult> {
    return await this.commonService.checkVerifyNum(payload);
  }

  /**
   * 꽃집 파일 업로드
   */
  @Post("uploads/florist")
  @UseGuards(FloristJwtAuthGuard)
  @UseInterceptors(FilesInterceptor("files", 5, uploadOption))
  @ApiBearerAuth()
  @ApiConsumes("multipart/form-data")
  @ApiBody({ type: FileUploadDto })
  floristUploadFiles(
    @UploadedFiles(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 100000000 }), new FileTypeValidator({ fileType: "image/*" })],
      }),
    )
    files: Express.Multer.File[],
  ): string[] {
    console.log(files);
    const filePaths: string[] = files.map((file) => file.filename);
    return filePaths;
  }

  /**
   * 유저 파일 업로드
   */
  @Post("uploads/user")
  @UseGuards(UserSessionLoginedAuthGuard)
  @UseInterceptors(FilesInterceptor("files", 5, uploadOption))
  @ApiConsumes("multipart/form-data")
  @ApiBody({ type: FileUploadDto })
  userUploadFiles(
    @UploadedFiles(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 100000000 }), new FileTypeValidator({ fileType: "image/*" })],
      }),
    )
    files: Express.Multer.File[],
  ): string[] {
    console.log(files);
    const filePaths: string[] = files.map((file) => file.filename);
    return filePaths;
  }

  /**
   * 이미지 파일 조회
   */
  @Get("file/:filename")
  async getFile(@Param("filename") filename: string, @Res() res: Response) {
    const filePath = path.join(__dirname, "..", "..", "..", "upload", filename);
    console.log(filePath);
    res.sendFile(filePath);
  }
}
