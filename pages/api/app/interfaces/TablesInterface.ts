import {Post} from "./PostInterface";
import {User} from "./UserInterface";
import {Token} from "./TokenInterface";
import {Comment} from "./CommentInterface";
import {Transaction} from "./TransactionInterface";

export type Tables = {
  posts?: Post[],
  users?: User[],
  tokens?: Token[],
  comments?: Comment[],
  transactions?: Transaction[]
}
