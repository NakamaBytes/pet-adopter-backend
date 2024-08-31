import { catchAsync } from "../../../utils/catchAsync";

export const get = catchAsync(async (c) => {

  return c.json({ data: 'pet' });
});
