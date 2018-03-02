import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });
    console.error('error boundary triggered:', error, info);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <div className="row justify-content-center">
        <h1>Something went wrong.</h1>
      </div>;
    }
    return this.props.children;
  }
}
