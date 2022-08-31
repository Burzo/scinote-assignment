import {
  Box,
  BoxProps,
  CircularProgress,
  CircularProgressProps,
} from "@mui/material";
import { styled } from "@mui/system";

export const AbsolutePosition = styled(Box)<BoxProps>(() => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
}));

export const NormalPosition = styled(Box)<BoxProps>(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

interface Props extends CircularProgressProps {
  absolute?: boolean;
}

export const Loading = ({ absolute = false, ...rest }: Props) => {
  if (absolute) {
    return (
      <AbsolutePosition>
        <CircularProgress {...rest} />
      </AbsolutePosition>
    );
  }
  return (
    <NormalPosition>
      <CircularProgress {...rest} />
    </NormalPosition>
  );
};
