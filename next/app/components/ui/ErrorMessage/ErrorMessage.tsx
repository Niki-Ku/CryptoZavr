interface ErrorMessageProps {
  error?: string;
  className?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ error, className }) => {
  if (!error) return null;

  return <span className={`text-sm text-feedback-error block ${className}`}>{error}</span>;
};

export default ErrorMessage;
