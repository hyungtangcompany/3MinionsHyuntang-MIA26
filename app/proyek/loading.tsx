function CardSkeleton({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded-xl bg-stone-200 ${className}`} />;
}

export default function ProyekLoading() {
  return (
    <main className="min-h-screen bg-akar-bg px-4 pt-24 pb-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="space-y-3"><CardSkeleton className="h-5 w-52" /><CardSkeleton className="h-9 w-80 max-w-full" /><CardSkeleton className="h-5 w-full max-w-2xl" /></div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2].map((item) => <CardSkeleton key={item} className="h-80 w-full" />)}
        </div>
      </div>
    </main>
  );
}
