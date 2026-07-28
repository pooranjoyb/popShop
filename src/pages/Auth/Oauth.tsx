import { useEffect } from 'react'
import { useDispatch } from "react-redux";
import { login } from "../../utils/features/Auth/authSlice";
import { useNavigate } from 'react-router-dom'
import { Slide, toast, TypeOptions } from "react-toastify";
import { jwtDecode } from 'jwt-decode'
import Loader from '../../components/Loader/Loader';
import bcrypt from "bcryptjs";
import { supabase } from "../../utils/client";
 
function Oauth() {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  type ToastType = TypeOptions;

  const toastNotification = (message: string, type: ToastType) => {
    toast(message, {
      type: type,
      position: "top-right",
      autoClose: 5000,
      closeOnClick: true,
      pauseOnHover: false,
    transition: Slide,
    });
  }

  const handleOauth = async () => {
    try {
      const params = new URLSearchParams(location.hash.slice(1))
      const accessToken = params.get('access_token')

      if(!accessToken){
        navigate("/")
        toastNotification("Invalid access token!", "error")
        return
      }

      localStorage.setItem("oauth_access_token", accessToken)

      const credential: any = await jwtDecode(accessToken)
      
      if(!credential){
        navigate("/")
        toastNotification("Token not decoded!", "error")
        return
      }

      const email = credential.user_metadata?.email;
      if (!email) {
        navigate("/")
        toastNotification("Email not available from OAuth provider", "error")
        return
      }
      const username = email.split('@')[0];
      const hashedPassword = await bcrypt.hash(username, 10);

      const { data } = await supabase
        .from("users")
        .select("*")
        .eq("username", username);

      if(data?.length === 0){
        const fullName = credential.user_metadata?.full_name || "";
        const nameParts = fullName.split(' ');
        const { error } = await supabase.from("users").insert([
          {
            username,
            email,
            password: hashedPassword,
            firstname: nameParts[0] || "",
            lastname: nameParts.slice(1).join(' ') || "",
            gender: "Edit profile to set gender",
            phone: 0,
            createdAt: new Date().toISOString(),
          },
        ]);
  
        if (error) {
          navigate('/')
          toastNotification("User Already Exists !", "error");
          return;
        }
      }

      
      dispatch(login({ username }))
      navigate('/home')
      toastNotification('Logged in successfully!', 'success')
    } catch (err) {
      navigate("/")
      toastNotification(`${err}`, "error")
    }
  }
  
  useEffect(() => {
    handleOauth()
  }, [])
 
  return (
  <>
      <Loader />
  </>
  )
}

export default Oauth;