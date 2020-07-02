import { useLocation, useParams } from "@reach/router";

const useRouter = () => {
  const location = useLocation();
  const params = useParams();
  return {
    ...location,
    //location contains pathname
    params,
  };
};
export default useRouter;
