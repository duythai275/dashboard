import { LoadingButton } from "@mui/lab";

const ButtonLoading = (props) => {
  const { children, className, disabled, icon, loading, ...rest } = props;
  return (
    <LoadingButton
      className={`${className}`}
      disabled={disabled}
      loading={loading}
      loadingPosition="center"
      endIcon={icon}
      {...rest}
    >
      {children}
    </LoadingButton>
  );
};

export default ButtonLoading;
