export default function Spinner() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-stone-300 border-t-emerald-800" />
    </div>
  );
}
