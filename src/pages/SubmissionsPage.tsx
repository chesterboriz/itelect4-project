import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  fetchSubmissions,
  createSubmission,
  fetchCourses,
} from "../api/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const submissionFormSchema = z.object({
  courseCode: z.string().min(1, "Please select a course"),
  repoUrl: z
    .string()
    .url("Must be a valid URL")
    .startsWith("https://github.com/", "repoUrl must start with https://github.com/"),
});

type SubmissionFormValues = z.infer<typeof submissionFormSchema>;

function SubmissionsPage() {
  const queryClient = useQueryClient();

  const { data: courses } = useQuery({
    queryKey: ["courses"],
    queryFn: fetchCourses,
  });

  const { data: submissions, isLoading, isError, error } = useQuery({
    queryKey: ["submissions"],
    queryFn: fetchSubmissions,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SubmissionFormValues>({
    resolver: zodResolver(submissionFormSchema),
    defaultValues: { courseCode: "", repoUrl: "" },
  });

  const addSubmission = useMutation({
    mutationFn: createSubmission,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["submissions"] });
      reset();
    },
  });

  // ===== SESSION 10: the two fields the form has, and nothing else =====
  const onSubmit = (values: SubmissionFormValues): void => {
    addSubmission.mutate(values);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Submissions
        </h1>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Submit your work and view your registered submissions.
        </p>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <h2 className="text-xl font-semibold mb-4">New Submission</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="courseCode">Course</Label>
            <select
              id="courseCode"
              {...register("courseCode")}
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              <option value="">-- Select a course from database --</option>
              {courses?.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.code} - {c.title}
                </option>
              ))}
            </select>
            {errors.courseCode && (
              <p className="text-sm text-red-600">{errors.courseCode.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="repoUrl">GitHub Repository URL</Label>
            <Input
              id="repoUrl"
              type="url"
              placeholder="https://github.com/username/repo"
              {...register("repoUrl")}
            />
            {errors.repoUrl && (
              <p className="text-sm text-red-600">{errors.repoUrl.message}</p>
            )}
          </div>

          <Button
            type="submit"
            disabled={addSubmission.isPending}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {addSubmission.isPending ? "Submitting..." : "Submit Project"}
          </Button>

          {addSubmission.isError && (
            <p className="text-sm text-red-600">{addSubmission.error.message}</p>
          )}
        </form>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Your Submissions</h2>
        {isLoading && <p>Loading submissions...</p>}
        {isError && (
          <p className="text-sm text-red-600">{error?.message ?? "Error loading submissions"}</p>
        )}
        {submissions && submissions.length === 0 && (
          <p className="text-sm text-gray-500">No submissions yet.</p>
        )}
        <div className="space-y-3">
          {submissions?.map((s) => (
            <div
              key={s.id}
              className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 flex justify-between items-center"
            >
              <div>
                <p className="font-bold text-gray-900 dark:text-white">
                  {s.courseCode}
                </p>
                <a
                  href={s.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-blue-600 hover:underline"
                >
                  {s.repoUrl}
                </a>
              </div>
              <span className="text-xs text-gray-500">
                {new Date(s.submittedAt).toLocaleDateString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SubmissionsPage;
