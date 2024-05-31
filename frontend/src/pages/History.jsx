import React, { useEffect } from "react";
import Layout from './Layout';
import HistoryMeetings from '../components/HistoryMeetings'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";

const History = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isError } = useSelector((state) => state.auth);
  
    useEffect(() => {
      dispatch(getMe());
    }, [dispatch]);
  
    useEffect(() => {
      if (isError) {
        navigate("/login");
      }
    }, [isError, navigate]);
  return (
    <Layout>
        <HistoryMeetings/>
    </Layout>
  )
}

export default History