import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ClaimsService } from './claims.service';
import { ClaimChatDto } from './dto/claim-chat.dto';
import { ClaimSubmissionDto } from './dto/claim-submission.dto';
import { RecordClaimDto } from './dto/record-claim.dto';

@Controller('claims')
export class ClaimsController {
  constructor(private readonly claimsService: ClaimsService) {}

  @Post('submit')
  submit(@Body() dto: ClaimSubmissionDto) {
    return this.claimsService.submitClaim(dto);
  }

  @Post('adjudicate')
  adjudicate(@Body() dto: ClaimSubmissionDto) {
    return this.claimsService.adjudicateClaim(dto);
  }

  @Post('record')
  record(@Body() dto: RecordClaimDto) {
    return this.claimsService.recordClaim(dto);
  }

  @Post('chat')
  chat(@Body() dto: ClaimChatDto) {
    return this.claimsService.askAboutClaim(dto);
  }

  @Get('history')
  history(@Query('decision') decision?: string, @Query('limit') limit?: string) {
    const parsedLimit = limit ? Number(limit) : undefined;
    return this.claimsService.getClaimHistory(decision, parsedLimit);
  }

  @Get(':claimId')
  getOne(@Param('claimId') claimId: string) {
    return this.claimsService.getClaimById(claimId);
  }
}
