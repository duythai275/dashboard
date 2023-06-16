const withPadding = (Component) => {
  const WrappedComponent = ({ ...props }) => {
    return (
      <div
        style={{
          padding: 5,
          height: "100%",
          display: "flex",
          alignItems: "flex-end",
        }}
      >
        <Component {...props} />
      </div>
    );
  };
  return WrappedComponent;
};

export default withPadding;
