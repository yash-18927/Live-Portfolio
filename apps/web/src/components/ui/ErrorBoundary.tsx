import { Component, type ReactNode, type ErrorInfo } from 'react';
import { WebGLErrorFallback } from './WebGLErrorFallback';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public override state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Unhandled UI/WebGL error:', error, errorInfo);
  }

  public override render() {
    if (this.state.hasError) {
      return <WebGLErrorFallback error={this.state.error} />;
    }
    return this.props.children;
  }
}
