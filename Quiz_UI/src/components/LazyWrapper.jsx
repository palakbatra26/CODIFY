import { Suspense } from "react";
import Loading from "./Loading";

const LazyWrapper = ({ children }) => {
  return (
    <Suspense fallback={<Loading />}>
      {children}
    </Suspense>
  );
};

export default LazyWrapper;
