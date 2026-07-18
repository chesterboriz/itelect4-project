import type {
  User,
  Item,
  Claim,
  ID,
  StringOrNumber,
  UserWithItem,
  MaybeUser,
  UnknownValue,
  ApiResponse,
  UserSummary,
  ItemUpdate,
  UserMap,
} from "../types/app";
import { getById, Role, ClaimStatus } from "../types/app";
import sample = require("./sample");

const student: User = sample.getUser(1);
const admin: User = {
  id: 2,
  name: "Security Admin",
  email: "security@example.com",
  role: Role.SecurityAdmin,
  isActive: true,
  score: 0,
};

const item: Item = {
  id: "item-101",
  title: "Black Wallet",
  category: "Personal Item",
  locationFound: "Library Lobby",
  description: "Contains student ID and cash",
  status: "reported",
  isClaimed: false,
};

const claim: Claim = {
  id: "claim-001",
  userId: student.id,
  itemId: item.id,
  claimReason: "This wallet matches my description",
  claimedAt: new Date().toISOString(),
  status: ClaimStatus.Pending,
};

const userWithItem: UserWithItem = {
  ...student,
  reportedItem: item,
};

const response: ApiResponse<Item> = {
  success: true,
  data: item,
  message: "Lost item loaded successfully",
};

const userSummary: UserSummary = {
  id: student.id,
  name: student.name,
  email: student.email,
};

const itemUpdate: ItemUpdate = {
  status: "claimed",
  isClaimed: true,
};

const userMap: UserMap = {
  [student.id.toString()]: student,
  [admin.id.toString()]: admin,
};

const claimId: ID = claim.id;
const displayScore: StringOrNumber = student.score;
const maybeUser: MaybeUser = getById([student, admin], student.id) ?? null;
const unknownValue: UnknownValue = "Ready for verification";

function describeValue(value: UnknownValue): string {
  if (typeof value === "string") {
    return `Text: ${value}`;
  }
  if (typeof value === "number") {
    return `Number: ${value}`;
  }
  if (value instanceof Date) {
    return `Date: ${value.toISOString()}`;
  }
  return "Unknown value";
}

const roleLabel =
  student.role === Role.Student
    ? "Student"
    : student.role === Role.SecurityAdmin
      ? "Security Admin"
      : "Admin";

const statusLabel =
  claim.status === ClaimStatus.Pending
    ? "Pending"
    : claim.status === ClaimStatus.Verified
      ? "Verified"
      : "Rejected";

console.log("Student:", student);
console.log("Admin:", admin);
console.log("Lost item:", item);
console.log("Claim:", claim);
console.log("User with item:", userWithItem);
console.log("Response:", response);
console.log("User summary:", userSummary);
console.log("Item update:", itemUpdate);
console.log("User map:", userMap);
console.log("Claim ID:", claimId);
console.log("Display score:", displayScore);
console.log("Maybe user:", maybeUser);
console.log("Type narrowing:", describeValue(unknownValue));
console.log("Role:", roleLabel);
console.log("Status:", statusLabel);
console.log(sample.calculateGrade(85, 100));
console.log(sample.formatCourse("Campus Lost & Found", 1, "Current Semester"));
