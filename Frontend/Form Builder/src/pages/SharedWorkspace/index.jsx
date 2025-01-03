import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { handleSharedLink } from "../../services";
import { toast } from "react-hot-toast";
import { fetchWorkspacesById } from "../../services";


const SharedLinkPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    const processSharedLink = async () => {
      if (token) {
        try {
          const result = await handleSharedLink(token); 
          toast(result.message); 

          if (result.message === "Workspace added to your account!") {
            const authToken = localStorage.getItem("token"); 
            const userId = localStorage.getItem("userId");

            const workspacesResponse = await fetchWorkspacesById(userId, authToken); 
            console.log("Updated Workspaces:", workspacesResponse);
          }
        } catch (error) {
          console.error("Error processing shared link:", error);
        }
      }
    };

    processSharedLink();
  }, [token]);

  return null; 
};

export default SharedLinkPage;
