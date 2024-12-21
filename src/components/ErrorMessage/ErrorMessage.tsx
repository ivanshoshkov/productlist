type ErrorMessageProps = { message: string };

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <div>
      <p className="error-message">{message}</p>
    </div>
  );
};

export default ErrorMessage;
