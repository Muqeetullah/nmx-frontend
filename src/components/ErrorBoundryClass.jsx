import React from "react";

export class ErrorBoundary extends React.Component {
  // Constructor for initializing Variables etc in a state
  // Just similar to initial line of useState if you are familiar
  // with Functional Components
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  // This method is called if any error is encountered
  componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and
    // re-render with error message
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });

    // You can also log error messages to an error
    // reporting service here
  }

  // This will render this component wherever called
  render() {
    if (this.state.errorInfo) {
      // Error path
      return (
        <div className="flex items-center justify-center min-h-screen ">
          <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg shadow-lg max-w-2xl w-full">
            <strong className="font-bold text-xl">An Error Has Occurred</strong>
            <div className="mt-2">
              <p className="font-semibold">Error Message:</p>
              <p className="text-sm">{this.state.error?.toString()}</p>
            </div>
            <details className="mt-4 p-3 bg-gray-50 border border-gray-300 rounded-lg">
              <summary className="cursor-pointer font-medium">
                Technical Details
              </summary>
              <pre className="whitespace-pre-wrap text-xs text-gray-700">
                {this.state.errorInfo?.componentStack}
              </pre>
            </details>
          </div>
        </div>
      );
    }
    // Normally, just render children, i.e. in
    // case no error is Found
    return this.props.children;
  }
}
