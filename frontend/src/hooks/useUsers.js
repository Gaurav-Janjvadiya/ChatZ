import { fetchUsers } from "../api/user.js";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../context/AuthContext.jsx";

const useUsers = () => {
  const { isLoading, data } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });
  const {
    user: { name },
  } = useAuth();
  const users = data?.users.filter((user) => user.name !== name);
  return { isLoading, users };
};

export default useUsers;
