import { AlertCircle, RefreshCcw } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ErrorDisplayProps {
  error: unknown;
  onRetry: () => void;
  title?: string;
  className?: string;
}

export function ErrorDisplay({ 
  error, 
  onRetry, 
  title = "Error Loading Data",
  className 
}: ErrorDisplayProps) {
  const errorMessage = error instanceof Error 
    ? error.message 
    : 'An unexpected error occurred while loading data';

  return (
    <div 
      className={cn(
        "rounded-lg bg-red-50 p-4 border border-red-200 shadow-sm w-full",
        className
      )}
      role="alert"
      aria-live="polite"
    >
      <div className="flex items-start space-x-3">
        <AlertCircle 
          className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" 
          aria-hidden="true" 
        />
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-red-800 truncate">
            {title}
          </h3>
          <p className="mt-1 text-sm text-red-700 break-words">
            {errorMessage}
          </p>
          <button
            type="button"
            onClick={onRetry}
            className="mt-3 inline-flex cursor-pointer items-center px-3 py-1.5 text-sm font-medium text-red-800 bg-red-100 rounded-md hover:bg-red-200 hover:text-red-900 focus:outline-none transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Retry loading data"
          >
            <RefreshCcw className="h-4 w-4 mr-1.5" aria-hidden="true" />
            Retry
          </button>
        </div>
      </div>
    </div>
  );
}