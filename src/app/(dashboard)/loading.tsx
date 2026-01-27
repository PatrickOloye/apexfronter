import LoadingIndicator from '../../components/LoadingIndicator';

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <LoadingIndicator message="Loading dashboard..." />
    </div>
  );
}
