const NumberTicker = (props: any) => {
  const rn = Date.now();

  function handleChange(value: number) {
    if (isNaN(value)) {
      props.setQuantity(0);
      return null;
    }
    if (value < 1) {
      props.setQuantity(1);
      return null;
    }
    props.setQuantity(value);
  }

  if (props.endDate < (rn / 1000) || props.maxTokens?.toString() === props.tokenCount) {
    return null;
  }

  return (
    <div className="flex items-center gap-2">
      <input
        max={5}
        className="w-12 h-8 text-sm text-center text-gray-800 border rounded-l-lg"
        min="1"
        type="number"
        onChange={(e) => handleChange(Number(e.target.value))}
        value={props.quantity}
      />
      <div className="flex flex-col">
        <button
          className="w-6 h-4 border-b rounded-tr-lg border-gray-300 flex items-center justify-center"
          onClick={() => handleChange(props.quantity + 1)}
        >
          <svg className="w-3 h-3 text-black" viewBox="0 0 24 24">
            <path d="M12 8l-6 6h12z" />
          </svg>
        </button>
        <button
          className="w-6 h-4 border-t rounded-br-lg border-gray-300 flex items-center justify-center"
          onClick={() => handleChange(props.quantity - 1)}
        >
          <svg className="w-3 h-3 text-gray-400" viewBox="0 0 24 24">
            <path d="M12 16l6-6H6z" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default NumberTicker;
