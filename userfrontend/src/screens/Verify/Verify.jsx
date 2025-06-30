import React from 'react'
import { useSearchParams } from 'react-router-dom'
import './Verify.css'
import axios from "axios"
import { useContext,useEffect } from 'react'
import { StoreContext } from '../../context/StoreContext'
import Loader from '../../components/Loader/Loader'
import { useNavigate } from 'react-router-dom'
const Verify = () => {
    const [searchParams,setSearchParams] = useSearchParams()
    const success = searchParams.get("success")
    const orderId = searchParams.get("orderId")
    const navigate = useNavigate()
    console.log(success,orderId)
    const {url} = useContext(StoreContext)
    const verifyPayment = async()=>{
        try {
            const response = await axios.post(url+"/api/order/verify",{success,orderId})
            if(response.data.message==='Notpaid')
                navigate('/')
            else
                navigate('/myorders')
        } catch (error) {
            console.log(error);
        }
    }    
    useEffect(()=>{
        verifyPayment()
    },[])

  return (
   <Loader/>
  )
}

export default Verify