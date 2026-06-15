import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ClaimRecordDocument = HydratedDocument<ClaimRecord>;

@Schema({ timestamps: { createdAt: 'submitted_at', updatedAt: false }, collection: 'claims' })
export class ClaimRecord {
  @Prop({ required: true, index: true })
  claim_id!: string;

  @Prop({ required: true, index: true })
  member_id!: string;

  @Prop({ required: true })
  policy_id!: string;

  @Prop({ required: true })
  claim_category!: string;

  @Prop({ required: true })
  treatment_date!: string;

  @Prop({ required: true })
  claimed_amount!: number;

  @Prop({ required: true, index: true })
  decision!: string;

  @Prop({ required: true })
  approved_amount!: number;

  @Prop({ required: true })
  reason!: string;

  @Prop({ required: true })
  confidence_score!: number;

  @Prop({ type: Object, required: true })
  submission!: Record<string, unknown>;

  @Prop({ type: [Object], default: [] })
  execution_trace!: Record<string, unknown>[];

  @Prop({ type: [String], default: [] })
  rejection_reasons!: string[];

  @Prop({ type: [Object], default: [] })
  line_item_decisions!: Record<string, unknown>[];

  @Prop({ type: Object, default: {} })
  financial_breakdown!: Record<string, unknown>;

  submitted_at?: Date;
}

export const ClaimRecordSchema = SchemaFactory.createForClass(ClaimRecord);

ClaimRecordSchema.index({ submitted_at: -1 });
ClaimRecordSchema.index({ decision: 1, submitted_at: -1 });
