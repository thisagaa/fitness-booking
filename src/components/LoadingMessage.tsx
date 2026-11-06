interface LoadingMessageProps{
  message: string
}

function LoadingMessage({message}: LoadingMessageProps) {
  return <p role="status">{message}</p>
}

export default LoadingMessage