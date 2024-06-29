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

      const hashedPassword = await bcrypt.hash(credential.user_metadata.email.split('@')[0], 10);

      const { data } = await supabase
        .from("users")
        .select("*")
        .eq("username", credential.user_metadata.email.split('@')[0]);

      if(data?.length === 0){
        const { error } = await supabase.from("users").insert([
          {
            username: credential.user_metadata.email.split('@')[0],
            email: credential.user_metadata.email,
            password: hashedPassword,
            firstname: credential.user_metadata.full_name.split(' ')[0],
            lastname: credential.user_metadata.full_name.split(' ')[1],
            gender: "not-found",
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

      
      dispatch(login({ username: credential.user_metadata.email.split('@')[0] }))
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