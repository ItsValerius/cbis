import { postReceipt } from "./action";

export default async function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-900 text-slate-100">
      <form
        action={postReceipt}
        className="flex flex-col items-center justify-center gap-2"
      >
        <label
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          htmlFor="file_input"
        >
          Upload receipt
        </label>

        <input
          id="file_input"
          className="block w-full text-sm text-slate-500
        file:mr-4 file:rounded-md file:border-0 file:bg-pink-50
        file:px-4 file:py-2 file:text-sm
        file:font-semibold file:text-blue-700
        hover:file:bg-blue-100"
          type="file"
          name="receipt"
        ></input>
        <button
          type="submit"
          className="mb-2 me-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </main>
  );
}
