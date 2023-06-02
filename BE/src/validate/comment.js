import joi from "joi";
import { errorMessages } from "./component/function";

export const categorySchema = joi.object({
  content: joi.string().min(30).max(500).messages(errorMessages("Bình luận")),
});
