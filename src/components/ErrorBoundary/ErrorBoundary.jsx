import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('[SKM ErrorBoundary] Caught exception:', error, errorInfo);
  }

  handleReload = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  handleGoHome = () => {
    this.setState({ hasError: false, error: null });
    if (window.location.pathname !== '/') {
      window.location.href = '/';
    } else {
      window.location.reload();
    }
  };

  render() {
    if (this.state.hasError) {
      // If error occurs while user is offline, render custom fallback
      const isOffline = typeof navigator !== 'undefined' && !navigator.onLine;

      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center bg-page dark:bg-surface-950">
          <div className="w-16 h-16 rounded-full bg-brand-100 dark:bg-brand-950/60 border border-brand-200 dark:border-brand-800 flex items-center justify-center mb-6 text-brand-600 dark:text-brand-400">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="font-heading text-2xl font-bold text-surface-900 dark:text-surface-50 mb-3">
            {isOffline ? 'You appear to be offline' : 'Something went wrong'}
          </h2>
          <p className="text-surface-600 dark:text-surface-300 text-sm max-w-md mb-6 leading-relaxed">
            {isOffline
              ? 'Please check your internet connection and try refreshing the page.'
              : 'An unexpected application error occurred. You can reload the page or return to the homepage.'}
          </p>
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <button
              onClick={this.handleReload}
              className="btn-primary-red py-2.5 px-6 text-sm font-bold rounded-lg shadow-sm hover:shadow transition-all"
            >
              Reload Page
            </button>
            <button
              onClick={this.handleGoHome}
              className="btn-outline-red py-2.5 px-6 text-sm font-bold rounded-lg transition-all"
            >
              Back to Home
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
