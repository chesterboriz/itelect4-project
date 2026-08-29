import { z } from 'zod';

export const claimSchema = z
  .object({
    itemTitle: z.string().min(3, 'Item title must be at least 3 characters.'),
    claimReason: z.string().min(10, 'Please provide at least 10 characters explaining your claim.'),
    followUp: z.string().min(5, 'Please provide at least 5 characters of identifying detail.'),
  })
  .refine(
    (data) => data.claimReason.toLowerCase().includes(data.itemTitle.toLowerCase()),
    {
      path: ['claimReason'],
      message: 'Your reason must mention the item title so staff can verify your claim.',
    },
  );

export type ClaimFormValues = z.infer<typeof claimSchema>;
