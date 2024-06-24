import { useEffect } from 'react'
import { useDispatch } from "react-redux";
import { login } from "../../utils/features/Auth/authSlice";
import { useNavigate } from 'react-router-dom'
import { Slide, toast, TypeOptions } from "react-toastify";
import { jwtDecode } from 'jwt-decode'
import Loader from '../../components/Loader/Loader';
 
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