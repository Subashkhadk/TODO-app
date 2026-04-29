function Buttons({ setCount, label }) {
  return (
      <button onClick={() => setCount(prev => prev + 1)}>
        {label}
      </button>

  );
}

export default Buttons;