"use client";

type Props = {
  error: Error;
  reset: () => void;
};

const Error = ({ error, reset }: Props) => {
  return (
    <main>
      <div>
        <h2>
          <p>Oops.. Error!</p>
        </h2>
        <p>{error.message}</p>
        <button onClick={reset}>Try Again</button>
      </div>
    </main>
  );
};

export default Error;
