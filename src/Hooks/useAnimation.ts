import { useSpring, animated } from "react-spring";

export const useAnimation = () => {
  const props = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 100,
  });

  return {
    props: props,
    a: animated,
  };
};
