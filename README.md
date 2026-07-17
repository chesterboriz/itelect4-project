# Campus Lost & Found Tracker

This project demonstrates GT1 Part 2 TypeScript concepts through a simple campus lost-and-found app. The app models how students can report lost items, submit claims, and track claim status in a structured way.

## Project Concept
The system includes users, lost items, and claim records. It shows how TypeScript interfaces, generics, utility types, and enums can be used to build a small but realistic app structure.

## Interfaces and Types Defined
- User
- Course
- Submission
- ApiResponse<T>
- ID
- StringOrNumber
- StudentWithCourse
- MaybeUser
- UnknownValue
- UserSummary
- CourseUpdate
- UserMap
- Role (const enum)
- SubmissionStatus (enum)

## How to Install and Run
1. Install dependencies with `npm install`
2. Verify there are no TypeScript errors with `npx tsc --noEmit`
3. Run the app with `npx ts-node src/index.ts`
