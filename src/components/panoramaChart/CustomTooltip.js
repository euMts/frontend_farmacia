function CustomTooltip({ payload }) {
  const { payload: internalPayload } = payload[1] || {};
  console.log(internalPayload?.original);
  return (
    <div>
      {Object.entries(internalPayload?.original || {}).map(([key, value]) => (
        <div>
          <span>{key}</span>
          <span>{value}</span>
        </div>
      ))}
    </div>
  );
}

export default CustomTooltip;
