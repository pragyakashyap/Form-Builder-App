import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { handleSharedLink } from "../../services"; 
import { toast } from "react-hot-toast";

const SharedLinkPage = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");

    useEffect(() => {
        const processSharedLink = async () => {
            if (token) {
                const result = await handleSharedLink(token);
                toast(result.message); // Show a success or error message
            }
        };

        processSharedLink();
    }, [token]);

    return null; 
};

export default SharedLinkPage;
